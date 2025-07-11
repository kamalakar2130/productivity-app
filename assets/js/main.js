// 🌐 Dynamic Navbar Load
fetch("/components/nav.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    initializeNavbar(); // run setup AFTER nav is injected
  });

function initializeNavbar() {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".nav-links");

  // ✅ Prevent duplicate listeners
  if (burger && navMenu && !burger.dataset.listener) {
    burger.dataset.listener = "true";

    burger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      burger.classList.toggle("toggle");
    });

    // Close menu when a nav link is clicked (mobile)
    navMenu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        burger.classList.remove("toggle");
      })
    );
  }

  // 🌟 Highlight active link
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

// 🌐 Dynamic Footer Load
fetch("/components/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((err) => {
    console.error("Error loading footer:", err);
  });
