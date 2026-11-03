/* ONE swappable constant: the business name. Change here, every visible
   instance updates (each carries data-brand). */
window.SITE = window.SITE || {};
window.SITE.brand = "845179 Yukon Inc.";
window.SITE.phone = "867-335-6866";
window.SITE.phoneHref = "tel:+18673356866";
window.SITE.email = "845179yukoninc@gmail.com";
window.SITE.address = "Box 148, Dawson City, YT Y0B 1G0";
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = window.SITE.brand; });
  document.querySelectorAll("[data-phone]").forEach(function (el) { el.textContent = window.SITE.phone; });
  document.querySelectorAll("[data-phone-href]").forEach(function (el) { el.setAttribute("href", window.SITE.phoneHref); });
  document.querySelectorAll("[data-email]").forEach(function (el) { el.textContent = window.SITE.email; });
  document.querySelectorAll("[data-email-href]").forEach(function (el) { el.setAttribute("href", "mailto:" + window.SITE.email); });
});
