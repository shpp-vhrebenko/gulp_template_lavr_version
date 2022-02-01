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
if(navButton) {
  const navList = document.querySelector(".header-nav__list");
  navButton.addEventListener("click", function(e) {
    document.body.classList.toggle('lock');
    navButton.classList.toggle("active");
    navList.classList.toggle("active");
  })
}