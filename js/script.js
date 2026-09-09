const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//Make Mobile Navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// SMOOTH SCROLLING ANIMATION

//a:link will select all the links with href attribute as similar to css
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // It will stop the default behavoir of the anchor navigation
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to the top
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      // Remainder href contains the id selector name to select an element so we can aslo select it by thi way.
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// STICKY NAVIGATION

const sectionheroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // This means we observing the herosection inside the viewport and always here we need to specify what element need to be observer inside of what element/section
    root: null,
    //It works , when hero section 0% inside of the viewport
    threshold: 0,
    rootMargin: "-80px",
  },
);
obs.observe(sectionheroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
