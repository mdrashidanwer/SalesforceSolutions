/* =========================================================
   PORTFOLIO WEBSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const cursorGlow = document.getElementById("cursorGlow");
const heroVisual = document.getElementById("heroVisual");

const journeyWindow =
  heroVisual?.querySelector(".journey-window");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

navToggle?.addEventListener("click", () => {

  const open =
    mainNav?.classList.toggle("open");

  navToggle.setAttribute(
    "aria-expanded",
    String(open)
  );

});


mainNav
  ?.querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      navToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  /* Fallback for browsers without
     IntersectionObserver support */

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================================
   CURSOR GLOW
   Desktop / fine pointer devices only
========================================================= */

if (
  cursorGlow &&
  window.matchMedia("(pointer: fine)").matches
) {

  document.addEventListener(
    "mousemove",
    (event) => {

      cursorGlow.style.left =
        `${event.clientX}px`;

      cursorGlow.style.top =
        `${event.clientY}px`;

    }
  );

}


/* =========================================================
   HERO 3D MOVEMENT
========================================================= */

if (
  heroVisual &&
  journeyWindow &&
  window.matchMedia("(pointer: fine)").matches
) {

  heroVisual.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;


      const rotateX =
        (0.5 - y) * 5;

      const rotateY =
        (x - 0.5) * 6;


      journeyWindow.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      journeyWindow.style.transform = "";

    }
  );

}


/* =========================================================
   TILT CARDS
========================================================= */

if (
  window.matchMedia("(pointer: fine)").matches
) {

  document
    .querySelectorAll(".tilt")
    .forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width;

          const y =
            (event.clientY - rect.top) /
            rect.height;


          const rotateX =
            (0.5 - y) * 5;

          const rotateY =
            (x - 0.5) * 5;


          card.style.transform =
            `perspective(700px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

}


/* =========================================================
   HERO CODE TABS
   AMPscript / SQL
========================================================= */

const codeTabs =
  document.querySelectorAll(".code-tab");

const codeContents =
  document.querySelectorAll(".code-content");


codeTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    const target =
      tab.dataset.code;


    /* Remove current active states */

    codeTabs.forEach((item) => {
      item.classList.remove("active");
    });


    codeContents.forEach((content) => {
      content.classList.remove("active");
    });


    /* Activate selected tab */

    tab.classList.add("active");


    const targetContent =
      document.getElementById(target);


    if (targetContent) {

      targetContent.classList.add(
        "active"
      );

    }

  });

});


/* =========================================================
   TESTIMONIAL CAROUSEL
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const carousel =
      document.querySelector(
        ".testimonial-carousel"
      );

    const track =
      document.querySelector(
        ".testimonial-track"
      );

    const cards =
      document.querySelectorAll(
        ".testimonial-card"
      );

    const prevButton =
      document.querySelector(
        ".testimonial-prev"
      );

    const nextButton =
      document.querySelector(
        ".testimonial-next"
      );

    const dotsContainer =
      document.querySelector(
        ".testimonial-dots"
      );


    /* Stop if carousel doesn't exist */

    if (
      !carousel ||
      !track ||
      !cards.length ||
      !dotsContainer
    ) {
      return;
    }


    let currentIndex = 0;

    let touchStartX = 0;
    let touchEndX = 0;


    /* -----------------------------------------------------
       NUMBER OF VISIBLE CARDS
    ----------------------------------------------------- */

    function getVisibleCards() {

      if (window.innerWidth <= 650) {
        return 1;
      }


      if (window.innerWidth <= 950) {
        return 2;
      }


      return 3;

    }


    /* -----------------------------------------------------
       MAXIMUM SLIDE INDEX
    ----------------------------------------------------- */

    function getMaxIndex() {

      return Math.max(
        0,
        cards.length -
        getVisibleCards()
      );

    }


    /* -----------------------------------------------------
       CREATE CAROUSEL DOTS
    ----------------------------------------------------- */

    function createDots() {

      dotsContainer.innerHTML = "";


      const totalPositions =
        getMaxIndex() + 1;


      for (
        let i = 0;
        i < totalPositions;
        i++
      ) {

        const dot =
          document.createElement(
            "button"
          );


        dot.classList.add(
          "testimonial-dot"
        );


        dot.setAttribute(
          "type",
          "button"
        );


        dot.setAttribute(
          "aria-label",
          `Go to testimonial ${i + 1}`
        );


        dot.addEventListener(
          "click",
          () => {

            currentIndex = i;

            updateCarousel();

          }
        );


        dotsContainer.appendChild(dot);

      }

    }


    /* -----------------------------------------------------
       UPDATE CAROUSEL POSITION
    ----------------------------------------------------- */

    function updateCarousel() {

      const firstCard =
        cards[0];


      if (!firstCard) {
        return;
      }


      const trackStyles =
        window.getComputedStyle(track);


      const gap =
        parseFloat(
          trackStyles.columnGap ||
          trackStyles.gap
        ) || 0;


      const cardWidth =
        firstCard
          .getBoundingClientRect()
          .width;


      const moveAmount =
        (cardWidth + gap) *
        currentIndex;


      track.style.transform =
        `translateX(-${moveAmount}px)`;


      /* Update active dot */

      const dots =
        dotsContainer.querySelectorAll(
          ".testimonial-dot"
        );


      dots.forEach(
        (dot, index) => {

          dot.classList.toggle(
            "active",
            index === currentIndex
          );

        }
      );

    }


    /* -----------------------------------------------------
       NEXT SLIDE
    ----------------------------------------------------- */

    function nextSlide() {

      const maxIndex =
        getMaxIndex();


      currentIndex =
        currentIndex >= maxIndex
          ? 0
          : currentIndex + 1;


      updateCarousel();

    }


    /* -----------------------------------------------------
       PREVIOUS SLIDE
    ----------------------------------------------------- */

    function previousSlide() {

      const maxIndex =
        getMaxIndex();


      currentIndex =
        currentIndex <= 0
          ? maxIndex
          : currentIndex - 1;


      updateCarousel();

    }


    /* -----------------------------------------------------
       BUTTON CONTROLS
    ----------------------------------------------------- */

    nextButton?.addEventListener(
      "click",
      nextSlide
    );


    prevButton?.addEventListener(
      "click",
      previousSlide
    );


    /* -----------------------------------------------------
       MOBILE SWIPE
    ----------------------------------------------------- */

    carousel.addEventListener(
      "touchstart",
      (event) => {

        touchStartX =
          event.changedTouches[0]
            .screenX;

      },
      {
        passive: true
      }
    );


    carousel.addEventListener(
      "touchend",
      (event) => {

        touchEndX =
          event.changedTouches[0]
            .screenX;


        const difference =
          touchStartX -
          touchEndX;


        /* Ignore very small swipes */

        if (
          Math.abs(difference) < 45
        ) {
          return;
        }


        if (difference > 0) {

          nextSlide();

        } else {

          previousSlide();

        }

      },
      {
        passive: true
      }
    );


    /* -----------------------------------------------------
       WINDOW RESIZE
    ----------------------------------------------------- */

    let resizeTimer;


    window.addEventListener(
      "resize",
      () => {

        clearTimeout(
          resizeTimer
        );


        resizeTimer =
          setTimeout(
            () => {

              const maxIndex =
                getMaxIndex();


              if (
                currentIndex >
                maxIndex
              ) {

                currentIndex =
                  maxIndex;

              }


              createDots();
              updateCarousel();

            },
            150
          );

      }
    );


    /* -----------------------------------------------------
       INITIALIZE CAROUSEL
    ----------------------------------------------------- */

    createDots();
    updateCarousel();

  }
);


/* =========================================================
   AUTOMATIC FOOTER YEAR
========================================================= */

const currentYear =
  document.getElementById(
    "currentYear"
  );


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =========================================================
   BASIC SOURCE-INSPECTION DETERRENTS

   IMPORTANT:
   These only discourage casual inspection.
   Client-side HTML, CSS and JavaScript cannot be
   genuinely hidden from someone who receives the page.
========================================================= */


/* Disable right-click */

document.addEventListener(
  "contextmenu",
  (event) => {

    event.preventDefault();

  }
);


/* Block common inspection shortcuts 

document.addEventListener(
  "keydown",
  (event) => {

    const key =
      event.key.toLowerCase();


    const isF12 =
      event.key === "F12";


    const isDevToolsShortcut =
      event.ctrlKey &&
      event.shiftKey &&
      ["i", "j", "c"].includes(key);


    const isViewSourceShortcut =
      event.ctrlKey &&
      key === "u";


    if (
      isF12 ||
      isDevToolsShortcut ||
      isViewSourceShortcut
    ) {

      event.preventDefault();

    }

  }
);*/