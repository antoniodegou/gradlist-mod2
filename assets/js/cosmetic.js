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

/* __________
-- Colour OUTPUT format options --
__________ */ 

const  getSelectedValue = document.querySelectorAll( 'input[name="inlineRadioOptions"] ');   
 
getSelectedValue.forEach(function(elem){
  elem.addEventListener('click', function(e){
    //handles the hide-block classes for the clicked element
    const val = e.target.value
    document.getElementById(val).checked = true
    document.getElementById(val).classList.remove('d-none')
    document.getElementById(val).classList.add('d-block')
  
    //handles the hide-block classes for the elements not clicked
    getSelectedValue.forEach(function(elem2){
      if(elem !== elem2){
        document.getElementById(elem2.id).check = false
        document.getElementById(elem2.value).classList.remove('d-block')
        document.getElementById(elem2.value).classList.add('d-none')
      }
    })

  })
})
 
/*
/ Get current year for footer
*/
document.getElementById("currentYear").innerHTML = new Date().getFullYear()

/*
/ copy preview colours to clipboard
*/
const copyButton = document.getElementById('copy')

copyButton.addEventListener('click', e => {
    e.preventDefault()
    // ref https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    var copyText = document.getElementById("my-list") 
    navigator.clipboard.writeText(copyText.innerText)
})


export {
    tooltipList,addDarkMode,addLightMode,toggleTheme ,checkPreference,btn,copyButton
}

