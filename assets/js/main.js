// Prevent zooming on mobile devices
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
}, { passive: false });

// Dynamic Navbar Load errors not found.
fetch("/components/nav.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    initializeNavbar();
  });

function initializeNavbar() {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".nav-links");

  function closeMenu() {
    if (navMenu && burger) {
      navMenu.classList.remove("active");
      burger.classList.remove("toggle");
    }
  }

  // Close menu on page load
  closeMenu();

  // Prevent duplicate listeners.
  if (burger && navMenu && !burger.dataset.listener) {
    burger.dataset.listener = "true";

    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("toggle");
    });

    // Close menu when a nav link is clicked in mobile.
    navMenu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        closeMenu();
      })
    );
  }

  // Highlight active page link in navbar.
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const hrefPath = new URL(link.href).pathname;
    if (
      currentPath === hrefPath ||
      (currentPath === "/index.html" && hrefPath === "/")
    ) {
      link.classList.add("active");
    }
  });
}

// Dynamic Footer Load
fetch("/components/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
    initializeFooter();
  });
function initializeFooter() {
  const footer = document.querySelector(".footer");

  // Don't proceed if footer isn't found
  if (!footer) return;

  const footerLinks = footer.querySelectorAll("footer-links a");

  if (footer && footerLinks && !footer.dataset.listener) {
    footer.dataset.listener = "true";

    footerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.location.href = href;
        }
      });
    });
  }
}
