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



converterInputs.forEach(function(elem) {
 
    elem.addEventListener('change', function(e){
      // e.preventDefault();
      let input =  e.target;
      submit.setAttribute("disabled", "");

      if(input.id == 'hex_code'){

       let a =  validateColours([input])
       if(a){
        converterColours([input, 'rgb', 'hsl', 'CSScolours', 'myPick'])
        validateColours([rgb, hsl, cssOption])
       } else{
        rgb.value = rgb == input ? document.getElementById('rgb').value : 'no!'
        hsl.value = hsl == input ? document.getElementById('hsl').value  : 'no!'
        cssOption.value = cssOption == input ? document.getElementById('CSScolours').value : 'no!'
        validateColours([rgb, hsl, cssOption])
        input.focus({ focusVisible: true })
       }
      }
      if(input.id == 'rgb'){
        let a =  validateColours([input])
        if(a){
          converterColours([input,'hex_code', 'hsl', 'CSScolours', 'myPick' ])
          validateColours([  hex, hsl, cssOption])
        }else{
          hex.value = hex == input ? document.getElementById('hex_code').value : 'no!'
          hsl.value = hsl == input ? document.getElementById('hsl').value  : 'no!'
          cssOption.value = cssOption == input ? document.getElementById('CSScolours').value : 'no!'
          validateColours([hex, hsl, cssOption])
          input.focus({ focusVisible: true })
        }
      }
      if(input.id == 'hsl'){
        let a =  validateColours([input])
        if(a){
          converterColours([input,'hex_code', 'rgb', 'CSScolours', 'myPick' ])
          validateColours([hex_code, rgb, cssOption ])
        }else{
          hex.value = hex == input ? document.getElementById('hex_code').value : 'no!'
          rgb.value = rgb == input ? document.getElementById('rgb').value  : 'no!'
          cssOption.value = cssOption == input ? document.getElementById('CSScolours').value : 'no!'
          validateColours([hex_code, rgb, cssOption ])
          input.focus({ focusVisible: true })
        }
      }
    
      if(input.id == 'CSScolours'){
        let a =  validateColours([input])
        if(a){
          converterColours(['hex_code', 'rgb', 'hsl', 'myPick' ])
          validateColours([hex_code, rgb, hsl])
        }else{
          hex.value = hex == input ? document.getElementById('hex_code').value : 'no'
          rgb.value = hsl == input ? document.getElementById('rgb').value  : 'no'
          hsl.value = hsl == input ? document.getElementById('hsl').value  : 'no'
          validateColours([hex_code, rgb, hsl])
          input.focus({ focusVisible: true })
        }
      }
      if(input.id == 'mypick'){
        converterColours([input])
        validateColours([hex_code, rgb, hsl, cssOption ])
      }
  })
})



const converterColours = (inputs) => {

  inputs.forEach((input) => {
    
    if(input.id == 'hex_code'){
      // Take spaces away
      hex.value = input.value.replace(/\s+/g, '')
      rgb.value = convert.hex.rgb(input.value).toString()
      hsl.value = convert.hex.hsl(input.value).toString()
      // double convert in case of short form yet, correct, so the colour picker can be valid
      colorPicker.value =  "#"+ convert.rgb.hex(document.getElementById('rgb').value.split(',').map(Number)).toString()
      cssOption.value = convert.hex.keyword(input.value)
    }
    if(input.id == 'rgb'){
      // Parse and Take spaces away
      let parseInput = input.value.replace(/\s+/g, '').split(',').map(Number)
      rgb.value = input.value.replace(/\s+/g, '')
      hex.value = convert.rgb.hex(parseInput)
      hsl.value = convert.rgb.hsl(parseInput)
      colorPicker.value = "#"+hex.value
      cssOption.value = convert.rgb.keyword(parseInput)
    }

    if(input.id == 'hsl'){
      let parseInput = input.value.replace(/\s+/g, '').split(',').map(Number)
      hsl.value = input.value.replace(/\s+/g, '')
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
  let isValid;
  validateArray.forEach((ele)=>{
   
    if(ele.id == 'hex_code' ){
      isValid =  ele.validity.valid
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
  return isValid
}

const eventFunc = (isValid, input, invalidMessage) =>{

    if(!isValid) {
      input.reportValidity()
      submit.setAttribute("disabled", "");
      input.classList.add('invalid');
      input.classList.remove('valid'); 
      if(input.id == 'hsl'){
        input.setCustomValidity(invalidMessage);
        input.setAttribute("isvalid", "false")
      }

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