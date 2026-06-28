/* ============================================
   STREAMIFY — dashboard.js
   ============================================ */

// Guard this page: redirect to login if no one is signed in.
// requireAuth() already starts the redirect; stop here so we don't
// waste time rendering content the visitor is about to navigate away from.
const currentUser = Auth.requireAuth();

if (currentUser) {
  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("userEmail").textContent = currentUser.email;
  initDashboard();
}

function initDashboard() {
  renderAllRows();
  setupSearch();
  setupLogout();
  setupScrollNav();
  setupMobileDrawer();
  setupModal();
  setupBannerButtons();
}

// ---- Rendering ----

function cardMarkup(m) {
  const inList = Auth.isInMyList(m.id);
  return `
    <div class="dash-card" data-id="${m.id}" data-title="${m.title.toLowerCase()}" tabindex="0" role="button" aria-label="${m.title}">
      <img src="${m.img}" alt="${m.title}" loading="lazy"/>
      <div class="dash-card-info">
        <p class="dash-card-name">${m.title}</p>
        <div class="dash-card-actions">
          <button class="dash-card-icon-btn dash-card-play" data-action="play" aria-label="Play ${m.title}">▶</button>
          <button class="dash-card-icon-btn add-list${inList ? " in-list" : ""}" data-action="list" aria-label="${inList ? "Remove from My List" : "Add to My List"}">${inList ? "✓" : "+"}</button>
          <button class="dash-card-icon-btn" data-action="info" aria-label="More info about ${m.title}">ⓘ</button>
        </div>
      </div>
    </div>`;
}

function renderRow({ title, slug, items, emptyMessage }) {
  const body = items.length
    ? `<div class="dash-row">${items.map(cardMarkup).join("")}</div>`
    : `<div class="dash-empty"><p>${emptyMessage || "Nothing here yet."}</p></div>`;

  return `
    <section class="dash-section" id="row-${slug}">
      <h2 class="dash-section-title">${title}</h2>
      ${body}
    </section>`;
}

function renderAllRows() {
  const container = document.getElementById("dashContent");

  const myListItems = Auth.getMyList()
    .map((id) => CATALOG.find((m) => m.id === id))
    .filter(Boolean);

  const myListRow = renderRow({
    title: "My List",
    slug: "my-list",
    items: myListItems,
    emptyMessage: "Tap the + on any title to add it to your list.",
  });

  const otherRows = DASHBOARD_ROWS.map((row) => {
    const slug = row.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return renderRow({ title: row.title, slug, items: CATALOG.filter(row.filter) });
  }).join("");

  container.innerHTML = myListRow + otherRows;
  attachCardListeners(container);
}

function attachCardListeners(container) {
  container.querySelectorAll(".dash-card").forEach((card) => {
    const id = card.dataset.id;

    const open = () => openModal(id);

    card.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-action]");
      if (!actionBtn) {
        open();
        return;
      }
      e.stopPropagation();
      handleCardAction(actionBtn.dataset.action, id, card);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function handleCardAction(action, id, card) {
  const item = CATALOG.find((m) => m.id === id);
  if (!item) return;

  if (action === "play") {
    alert(`${item.title} — playback isn't wired up in this demo yet.`);
    return;
  }
  if (action === "info") {
    openModal(id);
    return;
  }
  if (action === "list") {
    const nowInList = Auth.toggleMyList(id);
    syncListButtons(id, nowInList);
    // Re-render so the My List row picks up the change immediately.
    renderAllRows();
  }
}

// Updates every add-to-list button for a given title (a title can appear
// in more than one row), keeping them all in sync without a full re-render.
function syncListButtons(id, inList) {
  document.querySelectorAll(`.dash-card[data-id="${id}"] .add-list`).forEach((btn) => {
    btn.classList.toggle("in-list", !!inList);
    btn.textContent = inList ? "✓" : "+";
    btn.setAttribute("aria-label", inList ? "Remove from My List" : "Add to My List");
  });
}

// ---- Search ----

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    const sections = document.querySelectorAll("#dashContent .dash-section");

    sections.forEach((section) => {
      const cards = section.querySelectorAll(".dash-card");
      let visibleCount = 0;

      cards.forEach((card) => {
        const matches = !term || card.dataset.title.includes(term);
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount += 1;
      });

      // Rows with an empty-state message (like My List with nothing added)
      // have no cards at all, so don't hide them just because count is 0
      // when there's no search term active.
      const hasEmptyState = !!section.querySelector(".dash-empty");
      section.style.display = visibleCount > 0 || (!term && hasEmptyState) ? "" : "none";
    });
  });
}

// ---- Detail modal ----

function setupModal() {
  const overlay = document.getElementById("detailModal");
  const closeBtn = document.getElementById("modalCloseBtn");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });
}

function openModal(id) {
  const item = CATALOG.find((m) => m.id === id);
  if (!item) return;

  document.getElementById("modalImg").src = item.img;
  document.getElementById("modalImg").alt = item.title;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalDesc").textContent = item.desc;

  document.getElementById("modalMeta").innerHTML = `
    <span>${item.year}</span>
    <span class="tag-pill">${item.maturity}</span>
    <span>${item.seasons}</span>
    <span class="tag-pill">${item.tag}</span>
  `;

  const listBtn = document.getElementById("modalListBtn");
  const inList = Auth.isInMyList(id);
  listBtn.textContent = inList ? "✓ In My List" : "+ My List";
  listBtn.classList.toggle("in-list", inList);
  listBtn.onclick = () => {
    const nowInList = Auth.toggleMyList(id);
    listBtn.textContent = nowInList ? "✓ In My List" : "+ My List";
    listBtn.classList.toggle("in-list", nowInList);
    syncListButtons(id, nowInList);
    renderAllRows();
  };

  document.getElementById("modalPlayBtn").onclick = () => {
    alert(`${item.title} — playback isn't wired up in this demo yet.`);
  };

  document.getElementById("detailModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("detailModal").classList.remove("open");
  document.body.style.overflow = "";
}

// ---- Hero banner buttons ----

function setupBannerButtons() {
  document.getElementById("bannerPlayBtn").addEventListener("click", () => {
    alert("Squid Game — playback isn't wired up in this demo yet.");
  });
  document.getElementById("bannerInfoBtn").addEventListener("click", (e) => {
    openModal(e.currentTarget.dataset.id);
  });
}

// ---- Logout ----

function setupLogout() {
  const doLogout = (e) => {
    e.preventDefault();
    Auth.logOut();
    window.location.href = "index.html";
  };
  document.getElementById("logoutBtn").addEventListener("click", doLogout);
  document.getElementById("drawerLogoutBtn").addEventListener("click", doLogout);
}

// ---- Navbar scroll state ----

function setupScrollNav() {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ---- Mobile nav drawer ----

function setupMobileDrawer() {
  const hamburger = document.getElementById("hamburgerBtn");
  const drawer = document.getElementById("navDrawer");
  const backdrop = document.getElementById("drawerBackdrop");

  const openDrawer = () => {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
  };
  const closeDrawer = () => {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    isOpen ? closeDrawer() : openDrawer();
  });
  backdrop.addEventListener("click", closeDrawer);
  drawer.querySelectorAll(".nav-drawer-link").forEach((link) => {
    if (link.id === "drawerLogoutBtn") return; // handled in setupLogout
    link.addEventListener("click", closeDrawer);
  });
}