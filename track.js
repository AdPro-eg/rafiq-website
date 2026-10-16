/* ===== قياس الزوار (Google Analytics 4 + Meta Pixel) =====
   حطي الأكواد هنا وبس — كل حاجة تانية بتشتغل لوحدها:
   ga4:   كود Google Analytics، شكله  G-XXXXXXXXXX
   pixel: رقم Meta Pixel، أرقام بس زي 123456789012345
   طول ما الاتنين فاضيين: مفيش أي تتبّع ومفيش شريط كوكيز.            */
window.RAFIQ_TRACK = { ga4: "", pixel: "" };

(function () {
  var C = window.RAFIQ_TRACK, KEY = "rafiq_consent", loaded = false, queue = [];
  window.track = function (name, params) { if (loaded) send(name, params || {}); else queue.push([name, params || {}]); };
  if (!C.ga4 && !C.pixel) return;

  var EVENTS = {
    lead:    { ga: "generate_lead", fb: "Lead" },
    contact: { ga: "contact",       fb: "Contact" },
    quiz:    { ga: "quiz_complete", fb: "CompleteRegistration" }
  };
  function send(name, p) {
    var e = EVENTS[name] || { ga: name, fb: null };
    try { if (window.gtag) gtag("event", e.ga, p); } catch (x) {}
    try { if (window.fbq) { if (e.fb) fbq("track", e.fb, p); else fbq("trackCustom", name, p); } } catch (x) {}
  }
  function getC() { try { return localStorage.getItem(KEY); } catch (x) { return null; } }
  function setC(v) { try { localStorage.setItem(KEY, v); } catch (x) {} }

  function load() {
    if (loaded) return; loaded = true;
    if (C.ga4) {
      var s = document.createElement("script"); s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(C.ga4);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag("js", new Date());
      gtag("consent", "default", { ad_storage: "granted", analytics_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
      gtag("config", C.ga4, { page_path: pagePath(), page_title: pageTitle() });
    }
    if (C.pixel) {
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", C.pixel); fbq("track", "PageView");
    }
    queue.splice(0).forEach(function (q) { send(q[0], q[1]); });
    // صفحات الخدمات والمشاريع جوه الموقع (#s-… و #p-…) بتتسجل كصفحات مستقلة
    var last = pagePath();
    window.addEventListener("hashchange", function () {
      var p = pagePath(); if (p === last) return; last = p;
      (function () {
        try { if (window.gtag) gtag("event", "page_view", { page_path: p, page_location: location.origin + p, page_title: pageTitle() }); } catch (x) {}
        try { if (window.fbq) fbq("track", "PageView"); } catch (x) {}
      })();
    });
  }
  function pagePath() {
    var h = (location.hash || "").slice(1);
    if (/^(s-|p-)/.test(h) || h === "portfolio") return location.pathname.replace(/\/$/, "") + "/" + h;
    return location.pathname;
  }
  var NAMES = { branding: "الهوية والبراندينج", social: "إدارة السوشيال ميديا", content: "صناعة المحتوى", video: "الفيديو والموشن",
    ads: "الإعلانات الممولة", web: "المواقع وصفحات الهبوط", seo: "الظهور على جوجل (SEO)",
    appetite: "ريل يفتح النفس", grill: "من الصاج للطبق", morning: "بنكهة الصبح", slow: "اللحظة على مهلها" };
  function pageTitle() {
    var h = (location.hash || "").slice(1);
    if (h === "portfolio") return "أعمالنا | RAFIQ";
    if (h.indexOf("s-") === 0) return "خدمة: " + (NAMES[h.slice(2)] || h.slice(2)) + " | RAFIQ";
    if (h.indexOf("p-") === 0) return "مشروع: " + (NAMES[h.slice(2)] || h.slice(2)) + " | RAFIQ";
    return location.pathname.indexOf("thanks") > -1 ? "تم الحجز | RAFIQ" : "الصفحة الرئيسية | RAFIQ";
  }


  // كل ضغطة واتساب أو اتصال = "تواصل"
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("a[href]"); if (!a) return;
    var h = a.getAttribute("href") || "";
    if (h.indexOf("wa.me") > -1) track("contact", { method: "whatsapp" });
    else if (h.indexOf("tel:") === 0) track("contact", { method: "phone" });
    else if (h.indexOf("mailto:") === 0) track("contact", { method: "email" });
  }, true);

  function banner() {
    var ar = (document.documentElement.lang || "ar") !== "en";
    var css = document.createElement("style");
    css.textContent = ".rq-ck{position:fixed;inset-inline:16px;bottom:16px;z-index:9998;max-width:520px;margin-inline:auto;background:#13301a;color:#eef3e8;border:1px solid rgba(160,190,122,.35);border-radius:18px;padding:16px 18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;box-shadow:0 18px 40px rgba(0,0,0,.28);font:400 .9rem/1.7 'Readex Pro',system-ui,sans-serif}" +
      ".rq-ck p{margin:0;flex:1 1 240px}.rq-ck div{display:flex;gap:8px}.rq-ck button{font:600 .88rem 'Readex Pro',system-ui,sans-serif;border-radius:999px;padding:10px 18px;min-height:44px;cursor:pointer;border:1px solid rgba(160,190,122,.5);background:transparent;color:#eef3e8}" +
      ".rq-ck button.y{background:#a0be7a;color:#13301a;border-color:#a0be7a}.rq-ck button:focus-visible{outline:3px solid #a0be7a;outline-offset:2px}";
    document.head.appendChild(css);
    var d = document.createElement("div"); d.className = "rq-ck"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", ar ? "الكوكيز" : "Cookies");
    d.dir = ar ? "rtl" : "ltr";
    d.innerHTML = "<p>" + (ar ? "بنستخدم كوكيز عشان نفهم إزاي الزوار بيستخدموا الموقع ونحسّن إعلاناتنا. موافق؟" : "We use cookies to understand how visitors use the site and to improve our ads. OK?") + "</p>" +
      "<div><button type='button' class='y'>" + (ar ? "موافق" : "Accept") + "</button><button type='button' class='n'>" + (ar ? "لا شكرًا" : "No thanks") + "</button></div>";
    document.body.appendChild(d);
    d.querySelector(".y").onclick = function () { setC("yes"); d.remove(); load(); };
    d.querySelector(".n").onclick = function () { setC("no"); d.remove(); };
  }

  var c = getC();
  if (c === "yes") load();
  else if (c !== "no") { if (document.body) banner(); else document.addEventListener("DOMContentLoaded", banner); }
})();
