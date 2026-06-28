/* ============================================
   STREAMIFY — motion.js
   Shared motion utilities used on both the homepage and
   the dashboard: scroll-triggered reveals and a subtle
   3D tilt on card hover. Kept in one place so the two
   pages don't drift out of sync with each other.
   ============================================ */

const Motion = (() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fades/rises elements with `.reveal` or `.reveal-stagger` into view
  // the first time they cross into the viewport.
  function initScrollReveal(root = document) {
    if (prefersReducedMotion) {
      root.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const targets = root.querySelectorAll(".reveal, .reveal-stagger");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  // Subtle perspective tilt that follows the cursor across a card,
  // applied via CSS custom properties (--rx/--ry) the stylesheet reads.
  function initCardTilt(selector, root = document) {
    if (prefersReducedMotion) return;

    root.addEventListener("mousemove", (e) => {
      const card = e.target.closest(selector);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      const maxTilt = 8; // degrees
      card.style.setProperty("--ry", `${(px * maxTilt * 2).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-py * maxTilt * 2).toFixed(2)}deg`);
    });

    root.addEventListener(
      "mouseleave",
      (e) => {
        const card = e.target.closest?.(selector);
        if (!card) return;
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      },
      true
    );
  }

  // Small celebratory burst of dots from a point on screen — used when
  // a title is added to My List. Cheap, short-lived, no extra libraries.
  function burst(x, y, color = "var(--lime)") {
    if (prefersReducedMotion) return;

    const container = document.createElement("div");
    container.className = "motion-burst";
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    document.body.appendChild(container);

    const count = 10;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "motion-burst-dot";
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 36 + Math.random() * 24;
      dot.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      dot.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      dot.style.background = i % 3 === 0 ? "var(--pink)" : i % 3 === 1 ? color : "var(--violet)";
      container.appendChild(dot);
    }

    setTimeout(() => container.remove(), 700);
  }

  return { initScrollReveal, initCardTilt, burst, prefersReducedMotion };
})();