(() => {
  // Back-to-top chevron appears once the page has moved
  const totop = document.querySelector(".totop");
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:400px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => {
    if (totop) totop.toggleAttribute("data-show", !e.isIntersecting);
  }).observe(sentinel);

  // Keep in-page jumps clear of the fixed header
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = id === "#top" ? 0 : el.getBoundingClientRect().top + scrollY - 45;
      scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  });
})();
