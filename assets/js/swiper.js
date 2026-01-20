const modelsSwiper = new Swiper(".payment-models-swiper", {
  slidesPerView: 3,
  spaceBetween: 20,

  pagination: {
    el: ".payment-model-pagination",
    clickable: true,
  },

  breakpoints: {
    320: { slidesPerView: 1 },
    576: { slidesPerView: 1.5 },
    626: { slidesPerView: 1.6 },
    700: { slidesPerView: 2 },
    830: { slidesPerView: 2.2 },
    1000: { slidesPerView: 2.7 },
    1200: { slidesPerView: 3 },
  },
});

function initSplide() {
  let direction = window.innerWidth < 992 ? "ltr" : "ttb";

  const splide = new Splide(".splide", {
    type: "loop",
    direction: direction,
    height: direction === "ttb" ? "325px" : "",
    focus: "center",
    wheel: false,
    speed: 1200,
    perPage: 1,
    gap: "100px",
    pagination: true,
    start: 1,

    breakpoints: {
      1200: {
        gap: "50px",
      },
      1150: {
        gap: "20px",
      },

      1000: {
        gap: "10px",
      },

      992: {
        perPage: 1,
        start: 1,
      },
    
      0: {
        perPage: 1,
      },
    },
  });

  splide.mount();

  let interval = setInterval(() => {
    if (direction === "ttb") {
      splide.go(">");
    }
  }, 3500);
}

initSplide();

const reviewsSwiper = new Swiper(".reviews-swiper", {
  spaceBetween: 10,
  slidesPerView: 2,
  loop: true,
  centeredSlides: true,
  autoheight:true,

  pagination: {
    el: ".reviews-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".reviews-button-next",
    prevEl: ".reviews-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    576: {
      slidesPerView: 1.3,
    },
    768: {
      slidesPerView: 1.7,
    },
    992: {
      slidesPerView: 2,
    },
  },
});

const buttons = document.querySelectorAll(".reviews-button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");

    setTimeout(() => {
      btn.classList.remove("active");
    }, 150);
  });
});
