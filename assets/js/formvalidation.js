import * as convert from 'color-convert'
import cssKeyword from "color-name";

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

// console.log(keys.includes('blue'))

/* __________
-- COLOUR CONVERTER FORM VALIDATION and CONVERTER AS TYPED --
__________ */ 




// handles and validates all input fom converter section 
let converterInputs = document.querySelectorAll(".converter");

const submit = document.getElementById("submit")
const hex = document.getElementById('hex_code');
const rgb = document.getElementById('rgb');
const hsl = document.getElementById('hsl');
const cssOption = document.getElementById('CSScolours');
const colorPicker = document.getElementById('mypick');

// converterInputs.forEach(function(elem) {

//   if(elem.id == 'hex_code' || elem.id == 'rgb' || elem.id == 'hsl' ){

//     elem.addEventListener('keyup', function(e){
//       e.preventDefault();
//       let input =  e.target;
//       let parseInput = input.value.split(',').map(Number)

//       if(input.id == 'hex_code'){
//         const isValid =  input.validity.valid
//         eventFunc(isValid, input, "Use valid Hex colour")
//         rgb.value = convert.hex.rgb(input.value).toString()
//         hsl.value = convert.hex.hsl(input.value).toString()
//         colorPicker.value = "#"+input.value
//         cssOption.value = convert.hex.keyword(input.value)
//         validate([rgb,hsl,cssOption])
//       }
//       if(input.id == 'rgb'){
//         let isValid = e.target.validity.valid
//         eventFunc(isValid, input, "0-255, 0-255, 0-255")

//         hex.value = convert.rgb.hex(parseInput)
//         hsl.value = convert.rgb.hsl(parseInput)
//         colorPicker.value = "#"+hex.value
//         cssOption.value = convert.rgb.keyword(parseInput)
//         validate([hex,hsl,cssOption])
//       }
//       if(input.id == 'hsl'){
//         const isValid =  checkHSL(parseInput)
//         eventFunc(isValid, input, "0-360, 0-100, 0-100")

//         hex.value = convert.hsl.hex(parseInput)
//         rgb.value = convert.hsl.rgb(parseInput)
//         colorPicker.value = "#"+hex.value
//         cssOption.value = convert.hsl.keyword(parseInput)
//         validate([hex,rgb,cssOption])
//       }
//     });
//   } 
//   if(elem.id == 'CSScolours' || elem.id == 'mypick'  ){
//     elem.addEventListener('input', function(e){
//       e.preventDefault();
//       let input =  e.target;
//       if(input.id == 'CSScolours'){

//         const isValid =  keys.includes(input.value)
//         eventFunc(isValid, input, "not a css colour")
//         if(isValid){
//           hex.value = convert.keyword.hex(input.value.toString()) 
//           rgb.value = convert.keyword.rgb(input.value.toString()) 
//           hsl.value = convert.keyword.hsl(input.value.toString()) 
//           colorPicker.value = "#"+hex.value

//           validate([hsl,hex,rgb])
//         }
//       }
//       if(input.id == 'mypick'){

//           hex.value = input.value.replace('#', '');
//           rgb.value = convert.hex.rgb(hex.value).toString()
//           hsl.value = convert.hex.hsl(hex.value).toString()
//           cssOption.value = convert.hex.keyword(hex.value)
//           submit.removeAttribute('disabled')
//           validate([hsl,hex,rgb,cssOption])
//       }

//     })
//   }

// });

// console.log(converterInputs)

converterInputs.forEach(function(elem) {
  if(elem.id == 'hex_code' || elem.id == 'rgb' || elem.id == 'hsl' ){
    elem.addEventListener('keyup', function(e){
      e.preventDefault();
      let input =  e.target;
      submit.setAttribute("disabled", "");
      if(input.id == 'hex_code'){
        
        converterColours([input])
        validateColours([input])
        converterColours(['rgb', 'hsl','CSScolours', 'myPick' ])
      
        // validateColours([rgb , hsl , cssOption ])
      
      }
      if(input.id == 'rgb'){
        converterColours([input])
        validateColours([input])
        converterColours(['hex_code', 'hsl', 'CSScolours', 'myPick' ])
        validateColours([hex_code, hsl, cssOption ])
      }
      if(input.id == 'hsl'){
        converterColours([input])
        validateColours([input])
        converterColours(['hex_code', 'rgb','CSScolours', 'myPick' ])
        validateColours([hex_code, rgb, cssOption ])
      }
    })
  }
  if(elem.id == 'CSScolours' || elem.id == 'mypick'  ){
    elem.addEventListener('change', function(e){
      e.preventDefault();
      let input =  e.target;

      if(input.id == 'CSScolours'){
        converterColours([input])
        validateColours([input])
        converterColours(['hex_code', 'rgb', 'hsl', 'myPick' ])
        validateColours([hex_code, rgb, hsl])
      }
      if(input.id == 'mypick'){
        converterColours([input])
        converterColours(['hex_code', 'rgb', 'hsl', 'CSScolours' ])
        validateColours([hex_code, rgb, hsl, cssOption ])
      }
    })
  }

})



const converterColours = (inputs) => {

  inputs.forEach((input) => {
    
    if(input.id == 'hex_code'){
      rgb.value = convert.hex.rgb(input.value).toString()
      hsl.value = convert.hex.hsl(input.value).toString()
      // colorPicker.value = "#"+input.value
      cssOption.value = convert.hex.keyword(input.value)
    }
    if(input.id == 'rgb'){
      let parseInput = input.value.split(',').map(Number)
      hex.value = convert.rgb.hex(parseInput)
      hsl.value = convert.rgb.hsl(parseInput)
      colorPicker.value = "#"+hex.value
      cssOption.value = convert.rgb.keyword(parseInput)
    }

    if(input.id == 'hsl'){
      let parseInput = input.value.split(',').map(Number)
      hex.value = convert.hsl.hex(parseInput)
      rgb.value = convert.hsl.rgb(parseInput)
      colorPicker.value = "#"+hex.value
      cssOption.value = convert.hsl.keyword(parseInput)
    }
    if(input.id == 'CSScolours'){
      hex.value = convert.keyword.hex(input.value.toString()) 
      rgb.value = convert.keyword.rgb(input.value.toString()) 
      hsl.value = convert.keyword.hsl(input.value.toString()) 
      colorPicker.value = "#"+hex.value
    }
    if(input.id == 'mypick'){
      hex.value = input.value.replace('#', '');
      rgb.value = convert.hex.rgb(hex.value).toString()
      hsl.value = convert.hex.hsl(hex.value).toString()
      cssOption.value = convert.hex.keyword(hex.value)
    }
  })
}

const validateColours = (validateArray) => {
  validateArray.forEach((ele)=>{
    let isValid;
    if(ele.id == 'hex_code' ){
      isValid =  ele.validity.valid
      // console.log(ele.validity )
      eventFunc(isValid, ele , "Use valid Hex colour")
    }
    if(ele.id == 'rgb'){
      isValid =  ele.validity.valid
      eventFunc(isValid, ele, "0-255, 0-255, 0-255")
    }
    if(ele.id == 'hsl'){
      let parseInput = ele.value.split(',').map(Number)
      isValid = checkHSL(parseInput)
      eventFunc(isValid, ele, "0-360, 0-100, 0-100")
    }
    if(ele.id == 'CSScolours'){
      isValid =  keys.includes(ele.value)
      eventFunc(isValid, ele, "not a css colour")
    }

  })
}

const eventFunc = (isValid, input, invalidMessage) =>{
  // console.log("a " + isValid)
  if(!isValid) {
    // if(input.id == 'hex_code'){
    //  submit.setAttribute("disabled", "")   
    // }
    // input.setCustomValidity(invalidMessage);
    input.reportValidity()
    submit.setAttribute("disabled", "");
    input.classList.add('invalid');
    input.classList.remove('valid'); 
    if(input.id == 'hsl'){
      input.setCustomValidity(invalidMessage);
      input.setAttribute("isvalid", "false")
    }
    input.reportValidity()

  
  }else{
    input.setCustomValidity("");
    input.classList.remove('invalid');
    input.classList.add('valid');
    if(input.id == 'hsl'){
      input.setCustomValidity("");
    }
    input.reportValidity()
    submit.removeAttribute('disabled')
  }
}

const checkHSL = (input) => { 
  if (input[0] >= 0 & 
    input[0] <= 360 & 
    input[1] >= 0 & 
    input[1] <= 100 & 
    input[2] >= 0 & 
    input[2] <= 100 & 
    input.length == 3)  return true
}

export {
    converterInputs 
}