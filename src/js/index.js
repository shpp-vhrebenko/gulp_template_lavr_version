import { divide } from "./lib.js";
/* import $ from "jquery"; */

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
