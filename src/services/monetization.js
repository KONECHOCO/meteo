/**
 * Monetization: AdMob (app-open, banner, occasional interstitial) + Aetheria Pro.
 *
 * - Aetheria Pro = one-time (non-consumable) purchase PRO_PRODUCT_ID that removes ALL ads.
 *   The product must exist on App Store Connect and Play Console.
 * - Real AdMob IDs come from the VITE_ADMOB_* variables (.env.production). Without them, or in
 *   development, Google's official test IDs are used: never publish with test ads.
 * - In the browser there are no ads and no purchases.
 * Same flow as OmniTransit (TRASPORTO/src/services/monetization.js), the latest Ikonet reference.
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
// Frequencies of the Ikonet standard: more full-screen ads, but only at transition points and never
// in bursts (AdMob interstitial policy). Do not go below these values.
const INTERSTITIAL_EVERY_N_ACTIONS = 2;
const MIN_GAP_BETWEEN_FULLSCREEN_MS = 45 * 1000;
const APP_OPEN_MIN_BACKGROUND_MS = 20 * 1000;
const APP_OPEN_LOAD_TIMEOUT_MS = 8000;

const PRO_KEY = "aetheria.pro";
const TEST_ADS_KEY = "aetheria.testAds";

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

// Development always uses test ads: clicking your own real ads violates AdMob policy.
// In test builds (TestFlight / internal testing) they are switched on with 7 taps on the logo: see toggleTestAds().
const USE_TEST_ADS = env.DEV || !REAL_IDS.banner || readStorage(TEST_ADS_KEY, false);
const AD_IDS = USE_TEST_ADS ? TEST_IDS[platform] || TEST_IDS.android : REAL_IDS;

// ---------- Observable state ----------
// Development only: ?storeshot shows the purchase UI as in the native app, for store screenshots
const previewNative = env.DEV && typeof location !== "undefined" && location.search.includes("storeshot");

let state = {
  native: native || previewNative,
  isPro: readStorage(PRO_KEY, false),
  proPrice: null,
  adsReady: false,
  bannerHeight: 0,
  testAds: USE_TEST_ADS,
  diag: []
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

// Diagnostic log (visible in the app when test ads are on): what happens on the phone, step by step
export function diag(msg) {
  const line = `${new Date().toLocaleTimeString()} ${msg}`;
  console.info("[ads]", line);
  setState({ diag: [...(state.diag || []).slice(-30), line] });
}

async function prepareInterstitial() {
  try {
    await AdMob.prepareInterstitial({ adId: AD_IDS.interstitial, isTesting: USE_TEST_ADS });
    interstitialLoaded = true;
    diag("interstitial loaded");
  } catch (err) {
    interstitialLoaded = false;
    diag(`interstitial unavailable: ${err?.message || err}`);
  }
}

async function loadAppOpen() {
  try {
    await AdMob.loadAppOpen({ adId: AD_IDS.appOpen });
    appOpenLoaded = true;
    diag("app open loaded");
  } catch (err) {
    appOpenLoaded = false;
    diag(`app open unavailable: ${err?.message || err}`);
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
    diag("banner requested");
  } catch (err) {
    diag(`banner error: ${err?.message || err}`);
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
// the app is active; after 3 s we also ask from the plugin as a fallback. We wait at most 10 s: if the
// prompt never appears (e.g. tracking disabled in Settings) we go on with non-personalised ads instead
// of blocking everything.
async function requestTrackingPermission() {
  if (platform !== "ios") return;
  try {
    await waitUntilActive();
    for (let waited = 0; waited <= 10000; waited += 1000) {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status !== "notDetermined") {
        diag(`ATT: ${status}`);
        return;
      }
      if (waited === 3000) AdMob.requestTrackingAuthorization().catch(() => {});
      await sleep(1000);
    }
    diag("ATT: no answer in 10 s, continuing");
  } catch (err) {
    diag(`ATT error: ${err?.message || err}`);
  }
}

// GDPR consent (UMP, required in the EU/UK for AdMob), BEFORE the ATT prompt as Google recommends.
// Returns whether ads may be requested. A failure must not block the app.
async function gatherConsent() {
  let canRequestAds = true;
  try {
    let info = await Promise.race([
      AdMob.requestConsentInfo(),
      sleep(10000).then(() => {
        throw new Error("UMP timeout");
      })
    ]);
    diag(`UMP: status=${info.status} form=${info.isConsentFormAvailable} canRequestAds=${info.canRequestAds}`);
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
      info = await AdMob.showConsentForm();
      diag(`UMP after form: status=${info.status} canRequestAds=${info.canRequestAds}`);
    }
    canRequestAds = info.canRequestAds !== false;
  } catch (err) {
    diag(`UMP error: ${err?.message || err}`);
  }
  await requestTrackingPermission();
  return canRequestAds;
}

/** Call once at app start. */
export async function initMonetization() {
  if (!native) {
    resolveConsentDone();
    return;
  }
  // StoreKit may never answer (e.g. TestFlight before the product is approved):
  // the Pro check must not block the consent prompts, so it has a time limit
  await Promise.race([refreshProStatus(), sleep(4000)]);
  if (state.isPro) {
    resolveConsentDone();
    return;
  }

  diag(`start: test=${USE_TEST_ADS} platform=${platform}`);
  let canRequestAds = true;
  try {
    canRequestAds = await gatherConsent();
  } finally {
    resolveConsentDone();
  }
  // Without consent Google does not allow real ads; test ads still show for testing
  if (!canRequestAds && !USE_TEST_ADS) {
    diag("ads not allowed (no GDPR consent)");
    return;
  }

  try {
    await AdMob.initialize({ initializeForTesting: USE_TEST_ADS });
  } catch (err) {
    diag(`AdMob initialize error: ${err?.message || err}`);
    return;
  }
  setState({ adsReady: true });
  diag("AdMob ready");

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => setState({ bannerHeight: size.height || 0 }));
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => diag("banner loaded"));
  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, err => diag(`banner failed: ${err?.message || err?.code || JSON.stringify(err)}`));
  AdMob.addListener(AppOpenAdPluginEvents.Closed, () => {
    fullscreenShowing = false;
    lastFullscreenAt = Date.now();
    loadAppOpen();
  });
  AdMob.addListener(AppOpenAdPluginEvents.FailedToShow, () => {
    fullscreenShowing = false;
    loadAppOpen();
  });

  // 1) full-screen ad at launch (app open; if unavailable, an interstitial), 2) fixed banner,
  // 3) preload the interstitial
  showBanner();
  await prepareInterstitial();
  await showAppOpen();
  if (!fullscreenShowing && Date.now() - lastFullscreenAt > MIN_GAP_BETWEEN_FULLSCREEN_MS && interstitialLoaded) {
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

/** Hidden switch for test builds: turns test ads on/off (the app must be restarted). */
export function toggleTestAds() {
  const next = !readStorage(TEST_ADS_KEY, false);
  writeStorage(TEST_ADS_KEY, next);
  return next;
}
