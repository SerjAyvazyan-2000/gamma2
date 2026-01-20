const header = document.querySelector("header");
if (header) {
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 0) {
      header.classList.add("muved");
    } else {
      header.classList.remove("muved");
    }

    lastScroll = currentScroll;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".animate-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = [...items].indexOf(entry.target);
        entry.target.style.transitionDelay = `${0.15}s`;
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }),
    { threshold: 0.1 },
  );

  items.forEach((item) => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const fadeAnimations = [
    { selector: ".fade-left", from: { x: -40 } },
    { selector: ".fade-right", from: { x: 40 } },
    { selector: ".fade-top", from: { y: -40 } },
    { selector: ".fade-bottom", from: { y: 40 } },
  ];

  fadeAnimations.forEach(({ selector, from }) => {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.fromTo(
        el,
        { ...from, opacity: 0, visibility: "visible" },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            once: true,
          },
        },
      );
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const headerNav = document.querySelector(".header-menu");
  const body = document.body;

  if (!burger || !headerNav) return;

  const openMenu = () => {
    burger.classList.add("active");
    headerNav.classList.add("active");
    body.classList.add("overflow-hidden");
  };

  const closeMenu = () => {
    burger.classList.remove("active");
    headerNav.classList.remove("active");
    body.classList.remove("overflow-hidden");
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    burger.classList.contains("active") ? closeMenu() : openMenu();
  };

  burger.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
    if (!headerNav.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });

  headerNav.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const headerMenu = document.querySelector(".header-menu");
  const menuList = document.querySelector(".header-menu-list");
  const mobileActions = document.querySelector(".header-mobile-actions");

  if (!headerMenu) return;

  document.addEventListener("click", (e) => {
    const insideMenu =
      e.target.closest(".header-menu-list") ||
      e.target.closest(".header-mobile-actions") ||
      e.target.closest(".burger");

    if (!insideMenu) {
      headerMenu.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
      document.querySelector(".burger")?.classList.remove("active");
    }
  });

  headerMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    if (!link.classList.contains("sub-block-link")) {
      headerMenu.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
      document.querySelector(".burger")?.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".header-menu-list > li");
  const hasHover = window.matchMedia("(hover: hover)").matches;

  if (hasHover) {
    menuItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.classList.add("show");
      });

      item.addEventListener("mouseleave", () => {
        item.classList.remove("show");
      });
    });

    return;
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.closest(".header-sub-menu")) {
        item.classList.remove("active");
        return;
      }

      e.preventDefault();

      const isActive = item.classList.contains("active");

      menuItems.forEach((i) => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-menu-list")) {
      menuItems.forEach((i) => i.classList.remove("active"));
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".header-languages");
  const modal = document.querySelector(".languages-modal-wrapper");
  const modalMain = document.querySelector(".languages-modal-main");
  const closeBtn = document.querySelector(".languages-modal-close");
  const items = document.querySelectorAll(".languages-modal-item");
  const headerLangText = document.querySelector(".header-languages p");
  const body = document.body;

  if (!openBtn || !modal) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    closeModal();
  });

  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".languages-modal-main")) {
      closeModal();
    }
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      headerLangText.textContent = item.textContent;

      closeModal();
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    body.style.overflow = "";
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".hero-see-video");
  const modal = document.querySelector(".video-modal-wrapper");
  const modalMain = document.querySelector(".video-modal-main");
  const body = document.body;

  if (!openBtn || !modal || !modalMain) return;

  const videoSrc =
    "https://www.youtube-nocookie.com/embed/-CU5DdGZdC8?loop=1&modestbranding=1&autoplay=1&cc_load_policy=0&mute=0&rel=0&playlist=-CU5DdGZdC8";

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    body.style.overflow = "hidden";

    if (!modalMain.querySelector("iframe")) {
      const iframe = document.createElement("iframe");

      iframe.src = videoSrc;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      modalMain.appendChild(iframe);
    }
  });

  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".video-modal-main")) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("active");
    body.style.overflow = "";

    modalMain.innerHTML = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-sction");
  const mobileBtn = document.querySelector(".mobile-btn-fixed");

  if (!hero || !mobileBtn) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        mobileBtn.classList.add("active");
      } else {
        mobileBtn.classList.remove("active");
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observer.observe(hero);
});