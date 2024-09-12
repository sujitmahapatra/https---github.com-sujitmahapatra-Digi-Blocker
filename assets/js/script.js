'use strict';



/**
 * navbar toggle
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const elemArr = [navCloseBtn, overlay, navOpenBtn];

for (let i = 0; i < elemArr.length; i++) {
  elemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

/**
 * toggle navbar & overlay when click any navbar-link
 */

const navbarLinks = document.querySelectorAll("[data-navbar-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}





/**
 * header & go-top-btn active
 * when window scroll down to 400px
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 400) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.getElementById('about');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('animate');
      } else {
        aboutSection.classList.remove('animate'); // Remove the class when the section is out of view
      }
    });
  }, { threshold: 0.1 });

  observer.observe(aboutSection);
});

// ANIMATION

document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.getElementById('about');
  const statsTitles = document.querySelectorAll('.stats-title');

  let lastScrollTop = 0; // To store the last scroll position
  let hasAnimated = false; // Flag to track if animation has already happened in the desired direction

  // Intersection Observer to add/remove the 'animate' class when the section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('animate');

        // Get current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Check scroll direction
        if (scrollTop < lastScrollTop) {
          // Scrolling up
          if (!hasAnimated) {
            startNumberAnimation(); // Start the number animation when scrolling up
            hasAnimated = true; // Set the flag to true to prevent reanimation
          }
        } else {
          // Scrolling down
          hasAnimated = false; // Reset the flag when scrolling down
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Update last scroll position
      } else {
        aboutSection.classList.remove('animate'); // Remove the class when the section is out of view
      }
    });
  }, { threshold: 0.1 });

  observer.observe(aboutSection);

  // Function to animate the numbers
  function animateNumber(element, target) {
    let current = 0;
    const step = Math.ceil(target / 100); // Increase the step size for faster counting
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
        element.textContent = `${current.toLocaleString()}+`;
      } else {
        element.textContent = current.toLocaleString();
      }
    }, 8); // Decrease the interval time for faster updates
  }

  // Function to start the number animation
  function startNumberAnimation() {
    statsTitles.forEach(statsTitle => {
      const target = parseInt(statsTitle.getAttribute('data-count'), 10);
      if (!isNaN(target)) {
        animateNumber(statsTitle, target);
      }
    });
  }
});


// HOW IT WORKS

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.part');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.step').forEach((step, index) => {
          setTimeout(() => {
            step.classList.add('animate');
          }, index * 200); // Stagger the animation
        });
      } else {
        entry.target.querySelectorAll('.step').forEach((step) => {
          step.classList.remove('animate');
        });
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});
