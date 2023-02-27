import * as bootstrap from 'bootstrap'
import cssKeyword from "color-name";
/* __________
-- activate tooltips --
__________ */ 


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/* __________
-- DARK MODE --
__________ */ 

const body = document.body;
const btn = document.getElementById("my_switch");
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");

const addDarkMode = () => {
  body.classList.remove("light-mode");
  body.classList.add("dark-mode");
};

const addLightMode = () => {
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
};

const toggleTheme = () =>
  !body.classList.contains("dark-mode") ? addDarkMode() : addLightMode();

const checkPreference = () =>
  preferenceQuery.matches ? addDarkMode() : addLightMode();

btn.addEventListener("change", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);

(() => checkPreference())();

/* __________
-- POPULATE CSS COLOURS KEYWORDS --
__________ */ 

let keys = Object.keys(cssKeyword);
var select = document.getElementById("datalistOptions");

for(let i = 0; i < keys.length; i++) {
   var el = document.createElement("option");
   el.textContent = keys[i];
   el.value = keys[i];
   el.id = keys[i]
   select.appendChild(el);
}



export {
    tooltipList,addDarkMode,addLightMode,toggleTheme ,checkPreference,btn
}