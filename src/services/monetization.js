/**
 * Monetization: AdMob (app-open, banner, occasional interstitial) + Aetheria Pro.
 *
 * - Aetheria Pro = one-time (non-consumable) purchase PRO_PRODUCT_ID that removes ALL ads.
 *   The product must exist on App Store Connect and Play Console.
 * - Real AdMob IDs come from the VITE_ADMOB_* variables (.env.production). Without them, or in
 *   development, Google's official test IDs are used: never publish with test ads.
 * - In the browser there are no ads and no purchases.
 * Same flow as FuelSaver (src/services/monetization.js in that project).
 */
import { Capacitor } from "@capacitor/core";
import { App as CapApp } from "@capacitor/app";
import {
  AdMob,
  AdmobConsentStatus,
  AppOpenAdPluginEvents,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize
} from "@capacitor-community/admob";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

export const PRO_PRODUCT_ID = "aetheria_pro";

const native = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();
const env = import.meta.env;

// Official Google test IDs (https://developers.google.com/admob/android/test-ads)
const TEST_IDS = {
  android: {
    banner: "ca-app-pub-3940256099942544/9214589741",
    appOpen: "ca-app-pub-3940256099942544/9257395921",
    interstitial: "ca-app-pub-3940256099942544/1033173712"
  },
  ios: {
    banner: "ca-app-pub-3940256099942544/2435281174",
    appOpen: "ca-app-pub-3940256099942544/5575463023",
    interstitial: "ca-app-pub-3940256099942544/4411468910"
  }
};

const P = platform === "ios" ? "IOS" : "ANDROID";
const REAL_IDS = {
  banner: env[`VITE_ADMOB_${P}_BANNER`],
  appOpen: env[`VITE_ADMOB_${P}_APP_OPEN`],
  interstitial: env[`VITE_ADMOB_${P}_INTERSTITIAL`]
};
// Development always uses test ads: clicking your own real ads violates AdMob policy
const USE_TEST_ADS = env.DEV || !REAL_IDS.banner;
const AD_IDS = USE_TEST_ADS ? TEST_IDS[platform] || TEST_IDS.android : REAL_IDS;

// Frequencies inside AdMob rules: no bursts and never during active use
const INTERSTITIAL_EVERY_N_ACTIONS = 4;
const MIN_GAP_BETWEEN_FULLSCREEN_MS = 90 * 1000;
const APP_OPEN_MIN_BACKGROUND_MS = 30 * 1000;
const APP_OPEN_LOAD_TIMEOUT_MS = 8000;

const PRO_KEY = "aetheria.pro";

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
}

// ---------- Observable state ----------
// Development only: ?storeshot shows the purchase UI as in the native app, for store screenshots
const previewNative = env.DEV && typeof location !== "undefined" && location.search.includes("storeshot");

let state = {
  native: native || previewNative,
  isPro: readStorage(PRO_KEY, false),
  proPrice: null,
  adsReady: false,
  bannerHeight: 0
};
const listeners = new Set();

function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach(l => l(state));
}

export function getMonetizationState() {
  return state;
}

export function subscribeMonetization(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ---------- Ads ----------
let lastFullscreenAt = 0;
let actionCount = 0;
let backgroundedAt = 0;
let interstitialLoaded = false;
let appOpenLoaded = false;
let fullscreenShowing = false;

function adsAllowed() {
  return native && state.adsReady && !state.isPro;
}

async function prepareInterstitial() {
  try {
    await AdMob.prepareInterstitial({ adId: AD_IDS.interstitial, isTesting: USE_TEST_ADS });
    interstitialLoaded = true;
  } catch {
    interstitialLoaded = false;
  }
}

async function loadAppOpen() {
  try {
    await AdMob.loadAppOpen({ adId: AD_IDS.appOpen });
    appOpenLoaded = true;
  } catch {
    appOpenLoaded = false;
  }
}

async function showAppOpen() {
  if (!adsAllowed() || fullscreenShowing) return;
  if (!appOpenLoaded) {
    // At launch wait a few seconds at most: better to lose the ad than block the user
    await Promise.race([loadAppOpen(), new Promise(r => setTimeout(r, APP_OPEN_LOAD_TIMEOUT_MS))]);
  }
  if (!appOpenLoaded) return;
  try {
    fullscreenShowing = true;
    appOpenLoaded = false;
    await AdMob.showAppOpen();
    lastFullscreenAt = Date.now();
  } catch {
    fullscreenShowing = false;
  }
}

async function showBanner() {
  if (!adsAllowed()) return;
  try {
    await AdMob.showBanner({
      adId: AD_IDS.banner,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: USE_TEST_ADS
    });
  } catch (err) {
    console.info("Banner unavailable", err);
  }
}

async function removeAllAds() {
  if (!native) return;
  try {
    await AdMob.removeBanner();
  } catch {
    // no banner shown
  }
  setState({ bannerHeight: 0 });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Resolves once the system prompts (ATT, GDPR consent) are done: location is requested only after,
// because iOS shows one prompt at a time and drops the others.
let resolveConsentDone;
export const consentDone = new Promise(r => {
  resolveConsentDone = r;
});

async function waitUntilActive() {
  const { isActive } = await CapApp.getState();
  if (isActive) return;
  await new Promise(resolve => {
    const handle = CapApp.addListener("appStateChange", ({ isActive: active }) => {
      if (active) {
        handle.then(h => h.remove());
        resolve();
      }
    });
  });
}

// App Tracking Transparency (iOS): the prompt is shown by native code (SceneDelegate.swift) as soon as
// the app is active. Here we wait for the answer before initializing AdMob, so no tracking data is
// collected before consent. After 6 s without a prompt we also ask from the plugin as a fallback.
async function requestTrackingPermission() {
  if (platform !== "ios") return;
  try {
    await waitUntilActive();
    for (let waited = 0; waited < 60000; waited += 1000) {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status !== "notDetermined") return;
      if (waited === 6000) AdMob.requestTrackingAuthorization().catch(() => {});
      await sleep(1000);
    }
  } catch (err) {
    console.info("ATT unavailable", err);
  }
}

// GDPR consent (UMP, required in the EU/UK for AdMob). A failure here must not block ATT or ads.
async function gatherConsent() {
  await requestTrackingPermission();
  try {
    let info = await Promise.race([
      AdMob.requestConsentInfo(),
      sleep(10000).then(() => {
        throw new Error("UMP timeout");
      })
    ]);
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
      info = await AdMob.showConsentForm();
    }
    return info.canRequestAds !== false;
  } catch (err) {
    console.info("UMP consent unavailable", err);
    return true;
  }
}

/** Call once at app start. */
export async function initMonetization() {
  if (!native) {
    resolveConsentDone();
    return;
  }
  // StoreKit may never answer (e.g. TestFlight before the product is approved):
  // the Pro check must not block the ATT prompt, so it has a time limit
  await Promise.race([refreshProStatus(), sleep(4000)]);
  if (state.isPro) {
    resolveConsentDone();
    return;
  }

  let canRequestAds = true;
  try {
    canRequestAds = await gatherConsent();
  } finally {
    resolveConsentDone();
  }
  if (!canRequestAds) return;

  await AdMob.initialize({ initializeForTesting: USE_TEST_ADS });
  setState({ adsReady: true });

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => setState({ bannerHeight: size.height || 0 }));
  AdMob.addListener(AppOpenAdPluginEvents.Closed, () => {
    fullscreenShowing = false;
    lastFullscreenAt = Date.now();
    loadAppOpen();
  });
  AdMob.addListener(AppOpenAdPluginEvents.FailedToShow, () => {
    fullscreenShowing = false;
    loadAppOpen();
  });

  // 1) ad when the app opens, 2) fixed banner, 3) preload the interstitial
  await showAppOpen();
  showBanner();
  prepareInterstitial();

  // App-open ad also when the user comes back after leaving the app in the background
  CapApp.addListener("appStateChange", ({ isActive }) => {
    if (!isActive) {
      backgroundedAt = Date.now();
      return;
    }
    const away = backgroundedAt ? Date.now() - backgroundedAt : 0;
    if (away >= APP_OPEN_MIN_BACKGROUND_MS && Date.now() - lastFullscreenAt >= MIN_GAP_BETWEEN_FULLSCREEN_MS) {
      showAppOpen();
    }
  });
}

/**
 * Call at natural transition points (switching view, choosing another place).
 * Shows an interstitial every N actions, with a minimum gap between full-screen ads.
 */
export async function trackAdAction() {
  if (!adsAllowed() || fullscreenShowing) return;
  actionCount += 1;
  if (actionCount % INTERSTITIAL_EVERY_N_ACTIONS !== 0) return;
  if (Date.now() - lastFullscreenAt < MIN_GAP_BETWEEN_FULLSCREEN_MS) return;
  if (!interstitialLoaded) {
    prepareInterstitial();
    return;
  }
  try {
    fullscreenShowing = true;
    interstitialLoaded = false;
    await AdMob.showInterstitial();
    lastFullscreenAt = Date.now();
  } catch {
    // no ad available
  } finally {
    fullscreenShowing = false;
    prepareInterstitial();
  }
}

// ---------- Aetheria Pro (one-time purchase) ----------
function setPro(isPro) {
  writeStorage(PRO_KEY, isPro);
  setState({ isPro });
  if (isPro) removeAllAds();
}

function ownsPro(purchases) {
  return (purchases || []).some(p =>
    p.productIdentifier === PRO_PRODUCT_ID && (platform !== "android" || p.purchaseState === "1" || p.purchaseState == null)
  );
}

export async function refreshProStatus() {
  if (!native) return;
  try {
    const { purchases } = await NativePurchases.getPurchases({ productType: PURCHASE_TYPE.INAPP });
    setPro(ownsPro(purchases));
  } catch (err) {
    // offline: keep the last known state
    console.info("Pro check failed", err);
  }
  // The localized price is only needed by the Pro screen: load it without waiting
  NativePurchases.getProduct({ productIdentifier: PRO_PRODUCT_ID, productType: PURCHASE_TYPE.INAPP })
    .then(({ product }) => setState({ proPrice: product?.priceString || null }))
    .catch(() => {
      // product not configured in the stores yet
    });
}

export async function buyPro() {
  if (!native) throw new Error("Purchase available only in the app");
  const tx = await NativePurchases.purchaseProduct({
    productIdentifier: PRO_PRODUCT_ID,
    productType: PURCHASE_TYPE.INAPP,
    quantity: 1
  });
  if (tx?.productIdentifier === PRO_PRODUCT_ID) setPro(true);
  return state.isPro;
}

export async function restorePro() {
  if (!native) return false;
  try {
    await NativePurchases.restorePurchases();
  } catch {
    // continue with reading the purchases anyway
  }
  await refreshProStatus();
  return state.isPro;
}
