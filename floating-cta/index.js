function addComputedToInline(element, styles) {
  /* Adds computed styles of element that match a given styles object */
  let concerns = Object.keys(styles);

  let compStyles = window.getComputedStyle(element);
  concerns.forEach(concern => (element.style[concern] = compStyles[concern]));

  let compBox = element.getBoundingClientRect().toJSON();
  console.log(compBox);
  concerns.forEach(concern => {
    element.style[concern] = `${compBox[concern]}px`;
  });
  console.log(element.style);
}

function transitionToStyle(element, styles) {
  // Get the current computed style of element
  // add the relevant styles from current styles to the element
  // to use as a base point for animation
  addComputedToInline(element, styles);
  element.style.position = "fixed";
  let styleNames = Object.keys(styles);
  let transitions = styleNames.reduce((accum, current) => {}, "");
}

// function transitionFromStyle(element) {}

let brand = document.querySelector("h1");
let styles = { top: "0", left: "0", "font-size": "1.2rem" };

addComputedToInline(brand, styles);
