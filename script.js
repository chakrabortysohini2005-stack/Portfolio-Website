/* ============================================================
   Sohini Chakraborty — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".nav");
  var navList = document.getElementById("navList");

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  /* Close menu when a link is tapped (mobile) */
  if (navList) {
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
  }

  /* Close on Escape */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Header shadow on scroll ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      // tiny stagger for cards inside the same grid
      el.style.transitionDelay = (i % 3) * 60 + "ms";
      revObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- Active nav link via section observer ---- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = navList ? navList.querySelectorAll("a") : [];

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var secObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { secObserver.observe(s); });
  }

  /* ------------------------------------------------------------
     Button customizer (viewer-adjustable button style)
     ------------------------------------------------------------ */
  (function () {
    var DEFAULTS = { style: "glass", blur: 7 };
    var STORE_KEY = "sc-btn-prefs";

    var wrap = document.getElementById("customizer");
    var toggle = document.getElementById("czToggle");
    var panel = document.getElementById("czPanel");
    var closeBtn = document.getElementById("czClose");
    var styleBtns = wrap ? wrap.querySelectorAll(".cz-seg button") : [];
    var blurGroup = document.getElementById("czBlurGroup");
    var blurInput = document.getElementById("czBlur");
    var blurVal = document.getElementById("czBlurVal");
    var resetBtn = document.getElementById("czReset");
    var root = document.documentElement;

    if (!wrap || !toggle || !panel) return;

    function load() {
      try {
        var raw = localStorage.getItem(STORE_KEY);
        if (raw) return Object.assign({}, DEFAULTS, JSON.parse(raw));
      } catch (e) {}
      return Object.assign({}, DEFAULTS);
    }
    function save(prefs) {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(prefs)); } catch (e) {}
    }

    var prefs = load();

    function applyStyle(style) {
      if (style === "glass") root.removeAttribute("data-btn-style");
      else root.setAttribute("data-btn-style", style);
      styleBtns.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-style") === style));
      });
      // blur only matters for glass
      if (blurGroup) blurGroup.classList.toggle("is-disabled", style !== "glass");
    }
    function applyBlur(px) {
      root.style.setProperty("--glass-blur", px + "px");
      if (blurInput) blurInput.value = px;
      if (blurVal) blurVal.textContent = px + "px";
    }

    // initial apply
    applyStyle(prefs.style);
    applyBlur(prefs.blur);

    // panel open/close
    function openPanel() {
      wrap.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      panel.setAttribute("aria-hidden", "false");
    }
    function closePanel() {
      wrap.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
    }
    toggle.addEventListener("click", function () {
      wrap.classList.contains("open") ? closePanel() : openPanel();
    });
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePanel(); });
    document.addEventListener("click", function (e) {
      if (wrap.classList.contains("open") && !wrap.contains(e.target)) closePanel();
    });

    // style choice
    styleBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        prefs.style = b.getAttribute("data-style");
        applyStyle(prefs.style);
        save(prefs);
      });
    });

    // blur slider
    if (blurInput) {
      blurInput.addEventListener("input", function () {
        prefs.blur = parseInt(blurInput.value, 10);
        applyBlur(prefs.blur);
        save(prefs);
      });
    }

    // reset
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        prefs = Object.assign({}, DEFAULTS);
        applyStyle(prefs.style);
        applyBlur(prefs.blur);
        save(prefs);
      });
    }
  })();
})();
