///////////////////////////////////////////////////////////
// Setting year in footer
const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

///////////////////////////////////////////////////////////
// Mobile Navigation
const btnNavigationEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavigationEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
/** This only works for Safari (before 15.4) if we include the smoothscroll polyfill script in our html. Keeping this for reference */
// Smooth scrolling
// const allLinks = document.querySelectorAll("a:link");
// allLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault(); //prevent the default scrolling behavior
//     const href = link.getAttribute("href");

//     //Scrolling to the top
//     if (href === "#") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }

//     if (href !== "#" && href.startsWith("#")) {
//       document.querySelector(href).scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });

///////////////////////////////////////////////////////////
// Close mobile navigation after we scroll to the section
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.remove("nav-open");
    }
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation (Intersection observer to add the sticky class only when a certain section is scrolled to)
const sectionHero = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  ([firstEntry]) => {
    if (!firstEntry.isIntersecting) document.body.classList.add("sticky");
    if (firstEntry.isIntersecting) document.body.classList.remove("sticky");
  },
  {
    root: null, //observe through viewport
    threshold: 0, // Fire the event as soon as the section hero is in the viewport
    rootMargin: "-80px", // height of the sticky div
  }
);
observer.observe(sectionHero);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
// We will be adding a no-flexbox-gap to the body of the html
// This class will then need to be styled with all our components who need gap using margins
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

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
