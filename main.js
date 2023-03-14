import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// import * as bootstrap from 'bootstrap'
// import * as convert from 'color-convert'
// import cssKeyword from "color-name";
import * as cosmetic from '/assets/js/cosmetic.js'
import * as formValidation from '/assets/js/formvalidation.js'
import { Gradient } from "javascript-color-gradient";

document.getElementById("currentYear").innerHTML = new Date().getFullYear();


let spotColList = []
const submit = document.getElementById("submit")
const spotCols = document.getElementById('spotcols')
const spotPrev = document.getElementById('gradpreview')

submit.addEventListener('click', function(e){
  e.preventDefault()
  let hex = document.getElementById('hex_code');
  spotColList.push(hex.value)
 let a = ''
 let b= ''
  spotColList.forEach(item => {
    a += `
    <div class="row spot-col mb-3">
      <div class="col-2 remove d-flex align-items-center justify-content-center">
        <span class="icon-document-delete"></span>
      </div>
      <div class="col-8 spot-1 " style="background-color:#${item}"data-col="${item}"></div>
      <div class="col-2 draggin d-flex align-items-center justify-content-center">
        <span class="icon-drag_indicator"></span>
      </div>
    </div>
    `
    // console.log(typeof item)
      b+=`#${item},`
  })


  spotCols.innerHTML = a
  const spotPrev = document.getElementById('gradpreview')

  let arr = spotColList.map(i => '#' + i ).join(' , ');

  let len =  spotColList.length
  spotPrev.style.transition =  'all 1s'
  spotPrev.style.background = len === 1 ? "#"+spotColList[0] : `linear-gradient(to bottom, ${arr})`
  spotPrev.style.height = `${spotColList.length * 38}px`

  
})


