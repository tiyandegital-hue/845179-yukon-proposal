/* main.js — nav state machine, scroll reveals, service-rail spy, demo form */
(function () {
  "use strict";

  /* --- mobile nav: closed | open --- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* --- scroll reveal: plays on trigger, to completion --- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --- services rail scroll-spy --- */
  var railLinks = document.querySelectorAll(".svc-rail a");
  var blocks = [];
  railLinks.forEach(function (a) {
    var t = document.querySelector(a.getAttribute("href"));
    if (t) blocks.push({ a: a, t: t });
  });
  if (blocks.length && "IntersectionObserver" in window && !reduce) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          blocks.forEach(function (b) { b.a.classList.toggle("active", b.t === en.target); });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    blocks.forEach(function (b) { spy.observe(b.t); });
  } else if (blocks.length) {
    blocks[0].a.classList.add("active");
  }

  /* --- contact form: SIMULATED. Concept demo — nothing is sent anywhere. --- */
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.getElementById("form-ok");
      if (ok) {
        ok.classList.add("show");
        ok.focus();
      }
      form.querySelectorAll("input, select, textarea, button").forEach(function (f) { f.disabled = true; });
    });
  }

  /* --- footer year --- */
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
