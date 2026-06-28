/* ============================================
   STREAMIFY — auth.js
   Centralized localStorage-backed auth.
   NOTE: this is a front-end demo only. Passwords are
   stored in plain text in the browser's localStorage,
   which is fine for learning/prototyping but is not how
   a real app should handle credentials (use a backend
   with hashed passwords instead).
   ============================================ */

const Auth = (() => {
  const USERS_KEY = "streamify_users";
  const SESSION_KEY = "streamify_current_user";

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function signUp({ name, email, password }) {
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();

    if (!name.trim()) return { ok: false, error: "Enter your full name." };
    if (!cleanEmail) return { ok: false, error: "Enter your email address." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    if (users[cleanEmail]) return { ok: false, error: "An account with this email already exists." };

    users[cleanEmail] = { name: name.trim(), password, myList: [] };
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, cleanEmail);
    return { ok: true };
  }

  function logIn({ email, password }) {
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users[cleanEmail];

    if (!user || user.password !== password) {
      return { ok: false, error: "Incorrect email or password." };
    }

    localStorage.setItem(SESSION_KEY, cleanEmail);
    return { ok: true };
  }

  function logOut() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const users = getUsers();
    const user = users[email];
    if (!user) return null;
    return { email, name: user.name };
  }

  // Call at the top of any page that requires login.
  // Redirects to login.html if no one is signed in.
  function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = "login.html";
      return null;
    }
    return user;
  }

  // ---- My List (per-user favorites, stored alongside the account) ----

  function getMyList() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return [];
    const users = getUsers();
    return users[email]?.myList || [];
  }

  function isInMyList(titleId) {
    return getMyList().includes(titleId);
  }

  // Adds or removes a title from the signed-in user's list.
  // Returns the new "is it in the list now" state, or null if no one is signed in.
  function toggleMyList(titleId) {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;

    const users = getUsers();
    const user = users[email];
    if (!user) return null;

    const list = user.myList || [];
    const idx = list.indexOf(titleId);
    let nowInList;

    if (idx === -1) {
      list.push(titleId);
      nowInList = true;
    } else {
      list.splice(idx, 1);
      nowInList = false;
    }

    user.myList = list;
    saveUsers(users);
    return nowInList;
  }

  return {
    signUp,
    logIn,
    logOut,
    getCurrentUser,
    requireAuth,
    getMyList,
    isInMyList,
    toggleMyList,
  };
})();