/* ============================================
   STREAMIFY — script.js (homepage)
   ============================================ */

// FAQ accordion — only one answer open at a time.
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-q");
  const answer = item.querySelector(".faq-a");
  if (!question || !answer) return;

  question.addEventListener("click", () => {
    const isOpen = question.classList.contains("open");

    // Collapse every other item first.
    faqItems.forEach((other) => {
      other.querySelector(".faq-q")?.classList.remove("open");
      other.querySelector(".faq-a")?.classList.remove("open");
    });

    // Re-open this one if it wasn't already open.
    if (!isOpen) {
      question.classList.add("open");
      answer.classList.add("open");
    }
  });
});

// Navbar background fades in once the page is scrolled.
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}
