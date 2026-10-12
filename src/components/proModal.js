// "Aetheria Pro" dialog: one-time purchase that removes all ads, plus "Restore purchases".
import { getIconSvg } from "../utils/icons.js";
import { buyPro, restorePro, getMonetizationState, subscribeMonetization } from "../services/monetization.js";

export const PRIVACY_URL = "https://aetheria.ikonetsolutions.com/privacy.html";

let overlay = null;

// Shown only until the store returns the localized price (and in store screenshots)
function fallbackPrice() {
  try {
    return new Intl.NumberFormat(document.documentElement.lang || "en", { style: "currency", currency: "EUR" }).format(2.99);
  } catch {
    return "€2.99";
  }
}
let unsubscribe = null;

export function closeProModal() {
  if (unsubscribe) unsubscribe();
  unsubscribe = null;
  if (overlay) overlay.remove();
  overlay = null;
}

export function openProModal(t) {
  closeProModal();
  overlay = document.createElement("div");
  overlay.className = "pro-modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  document.body.appendChild(overlay);

  let busy = false;
  let message = "";

  const render = () => {
    const { native, isPro, proPrice } = getMonetizationState();
    const benefits = [t.pro.noAds, t.pro.oneTime, t.pro.allDevices, t.pro.support];
    let actions;
    if (isPro) {
      actions = `<p class="pro-status pro-status-ok">${t.pro.owned}</p>`;
    } else if (!native) {
      actions = `<p class="pro-status">${t.pro.webOnly}</p>`;
    } else {
      actions = `
        <button class="pro-buy-btn" id="proBuyBtn" ${busy ? "disabled" : ""}>
          ${getIconSvg("crown", 18)} ${t.pro.buy.replace("{price}", proPrice || fallbackPrice())}
        </button>
        <button class="pro-restore-btn" id="proRestoreBtn" ${busy ? "disabled" : ""}>
          ${getIconSvg("rotate", 14)} ${t.pro.restore}
        </button>
      `;
    }

    overlay.innerHTML = `
      <div class="pro-modal">
        <div class="pro-modal-header">
          <div class="pro-modal-badge">${getIconSvg("crown", 24)}</div>
          <div>
            <h2>${t.pro.title}</h2>
            <p>${t.pro.subtitle}</p>
          </div>
          <button class="pro-close-btn" id="proCloseBtn" aria-label="${t.pro.close}">✕</button>
        </div>
        <div class="pro-modal-body">
          <ul class="pro-benefits">
            ${benefits.map(b => `<li>${getIconSvg("check", 16)}<span>${b}</span></li>`).join("")}
          </ul>
          ${actions}
          ${message ? `<p class="pro-message">${message}</p>` : ""}
          <a class="pro-privacy-link" href="${PRIVACY_URL}" target="_blank" rel="noopener">${t.pro.privacy}</a>
        </div>
      </div>
    `;

    overlay.querySelector("#proCloseBtn").addEventListener("click", closeProModal);
    const run = async (fn, okMsg, failMsg) => {
      busy = true;
      message = "";
      render();
      try {
        message = (await fn()) ? okMsg : failMsg;
      } catch (err) {
        console.warn("Pro purchase error", err);
        message = t.pro.error;
      } finally {
        busy = false;
        if (overlay) render();
      }
    };
    const buy = overlay.querySelector("#proBuyBtn");
    if (buy) buy.addEventListener("click", () => run(buyPro, t.pro.owned, t.pro.error));
    const restore = overlay.querySelector("#proRestoreBtn");
    if (restore) restore.addEventListener("click", () => run(restorePro, t.pro.restored, t.pro.notFound));
  };

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProModal();
  });
  unsubscribe = subscribeMonetization(() => {
    if (!busy && overlay) render();
  });
  render();
}
