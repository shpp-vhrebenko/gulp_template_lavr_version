/* import { divide } from "./lib.js";
import $ from "jquery";

console.log(divide(4, 2));
console.log(divide(10, 2));
console.log(divide(8, 2));
console.log(divide(7, 2));
console.log(divide(9, 2));

let current = divide(3, 4);
let curItem = current + 2;
console.log(curItem);

(new Promise(function(resolve, reject){
  setTimeout(resolve, 500);
})). then(() => {
  console.log("promise resolved");
});
 */

const navButton = document.querySelector(".header-nav__button");
const navList = document.querySelector(".header-nav__list");

if(navButton) {
  navButton.addEventListener("click", function(e) {
    document.body.classList.toggle('lock');
    navButton.classList.toggle("active");
    navList.classList.toggle("active");
  })
}

const menuLinks = document.querySelectorAll('.nav-list__link[data-goto]');
if(menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);  
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;

      if(navButton.classList.contains('active')) {
        document.body.classList.remove('lock');
        navButton.classList.remove("active");
        navList.classList.remove("active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}