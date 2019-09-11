function addComputedToInline(element, styles) {
  // Get the current computed style of element
  // add the relevant styles from current styles to the element
  // to use as a base point for animation

  /* Adds computed styles of element that match a given styles object */
  let concerns = Object.keys(styles);
  // get relavent styles from computed styles
  let compStyles = window.getComputedStyle(element);
  concerns.forEach(concern => (element.style[concern] = compStyles[concern]));

  // get relevant location data from bounding rect
  let compBox = element.getBoundingClientRect().toJSON();
  console.log(compBox);
  concerns.forEach(concern => {
    element.style[concern] = `${compBox[concern]}px`;
  });
}

function setTransitionDetails(element, styles) {
  // build a string for the transition property.
  // all the attributes we want to control
  // format. attr time, attr2 time, attr3 time, etc...
  let styleNames = Object.keys(styles);
  let transitions = styleNames.reduce((accum, style, idx) => {
    let base = `${style} .35s ease-out`;
    if (idx !== 0) return (accum += `, ${base}`);
    else return (accum += base);
  }, "");
  element.style.transition = transitions;
}

function updateToNewStyles(element, styles) {
  element.style.zIndex = "2";
  for (style in styles) element.style[style] = styles[style];
}

// function transitionFromStyle(element) {}

let header = document.querySelector("h1");
let styles = { top: "15px", left: "20px", "font-size": "2rem" };

let nav = document.querySelector("nav");
let navStyles = { top: "0px", left: "500px" };

let tog = document.querySelector(".toggle");

const toNav = () => {
  // have to add styles before i can transition
  addComputedToInline(header, styles);
  addComputedToInline(nav, navStyles);

  header.style.position = "fixed";
  nav.style.position = "fixed";

  setTransitionDetails(header, styles);
  setTransitionDetails(nav, navStyles);

  updateToNewStyles(header, styles);
  updateToNewStyles(nav, navStyles);
};

const toCTA = () => {
  header.style = {};
  nav.style = {};
  tog.removeEventListener("click", toCTA);
};

tog.addEventListener("click", toNav);
