(function ($) {
  "use strict";

  function handlePreloader() {
    if ($(".preloader").length) {
      $("body").addClass("page-loaded");
      $(".preloader").fadeOut(300, function () {
        let elementsToAnimate = [
          { selector: ".cloud-left img", animation: "fadeInLeft 1s ease-out forwards" },
          { selector: ".cloud-right img", animation: "fadeInRight 1s ease-out forwards" },
          { selector: ".hero-city img", animation: "fadeInUp 1s ease-out 0.5s forwards" },
          { selector: ".hero-text h1", animation: "fadeInUp 1s ease-out 0.7s forwards" },
          { selector: ".hero-text button", animation: "fadeInUp 1s ease-out 0.9s forwards" },
          { selector: ".gtk h1", animation: "fadeInUp 1s ease-out 0.9s forwards" },
          { selector: ".gtk-city img", animation: "fadeInUp 1s ease-out 0.9s forwards" },
        ];

        elementsToAnimate.forEach((item) => {
          let element = document.querySelector(item.selector);
          if (element) {
            element.style.animation = item.animation;
          }
        });

        // Pastikan hero button tetap mengikuti logika scroll setelah animasi awal
        setTimeout(() => {
          checkHeroButtonVisibility();
        }, 1000); // Beri jeda agar animasi masuk selesai dulu
      });
    }
  }

  function checkHeroButtonVisibility() {
    const scrollPosition = window.scrollY;
    const heroButton = document.querySelector(".hero-text button");

    if (scrollPosition > 10) {
      heroButton.style.opacity = "0";
      heroButton.style.pointerEvents = "none";
    } else {
      heroButton.style.opacity = "1";
      heroButton.style.pointerEvents = "auto";
    }
  }

  $(window).on("load", function () {
    handlePreloader();
  });

  // Event listener untuk hamburger menu
  document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", function () {
      menu.classList.toggle("show-menu");
    });
  });

  /* ================= Section Parallax Hero ================= */
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const cloudLeft = document.querySelector(".cloud-left img");
    const cloudRight = document.querySelector(".cloud-right img");
    const heroText = document.querySelector(".hero-text");
    const heroButton = document.querySelector(".hero-text button");

    if (cloudLeft && cloudRight) {
      cloudLeft.style.transform = `translateX(-${scrollPosition * 0.2}px) translateY(${scrollPosition * 0.1}px)`;
      cloudRight.style.transform = `translateX(${scrollPosition * 0.2}px) translateY(${scrollPosition * 0.1}px)`;
    }

    heroText.style.transform = `translateY(${scrollPosition * 0.5}px)`;

    // Shrink hero text gradually
    const shrinkStart = 100;
    const maxShrink = 300;

    if (scrollPosition > shrinkStart) {
      let scaleFactor = 1 - ((scrollPosition - shrinkStart) / (maxShrink - shrinkStart)) * 0.3;
      scaleFactor = Math.max(scaleFactor, 0.7);
      heroText.style.transform += ` scale(${scaleFactor})`;
    }

    // Panggil fungsi untuk menyembunyikan hero button saat scroll
    checkHeroButtonVisibility();
  });

})(window.jQuery);

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY; // Get the current scroll position
    const windowHeight = window.innerHeight; // Height of the viewport
    const gtkSection = document.querySelector(".gtk");
    const gtkText = document.querySelector(".gtk-text h3");
    const gtkH1 = document.querySelector(".gtk-text h1");
  
    // GTK Section Scroll Effect: 30% visibility of the section triggers h3 appearance
    const gtkSectionTop = gtkSection.getBoundingClientRect().top;
    const gtkSectionHeight = gtkSection.offsetHeight;
  
    // Check if the section is at least 30% visible
    if (gtkSectionTop + gtkSectionHeight * 0.5 <= windowHeight) {
      // Show the h3 text when the section is 30% visible
      gtkText.style.opacity = "1"; // Fade in the h3 text
      gtkText.style.transform = "translateY(0)"; // Move the h3 into place
      
      // Move the h1 back to its original position when h3 is visible
      gtkH1.style.transform = "translateY(0)";
    } else {
      // Hide the h3 text when the section is not 30% visible
      gtkText.style.opacity = "0";
      gtkText.style.transform = "translateY(20px)"; // Keep the h3 hidden
      
      // Move h1 below the city when h3 is not visible
      gtkH1.style.transform = "translateY(100px)"; // Adjust the position of h1 when h3 is not visible
    }
  });
  

/* ================= Section FAQ ================= */
document.querySelectorAll("details").forEach((detail) => {
    let content = detail.querySelector(".faq-answer");
  
    detail.addEventListener("toggle", function () {
        if (detail.open) {
            content.style.height = content.scrollHeight + "px";
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
  
            content.addEventListener("transitionend", function resetHeight() {
                content.style.height = "auto";
                content.removeEventListener("transitionend", resetHeight);
            });
        } else {
            content.style.height = content.scrollHeight + "px";
            requestAnimationFrame(() => {
                content.style.height = "0px";
                content.style.opacity = "0";
                content.style.transform = "translateY(-5px)";
            });
        }
    });
  
    content.addEventListener("transitionend", function () {
        if (!detail.open) {
            content.style.height = "";
        }
    });
  });
  