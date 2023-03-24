import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import * as cosmetic from "/assets/js/cosmetic.js";
import * as formValidation from "/assets/js/formvalidation.js";
import { Gradient } from "javascript-color-gradient";
import Color from "colorjs.io"
import * as convert from 'color-convert'

document.getElementById("currentYear").innerHTML = new Date().getFullYear();

let spotColList = [];
const submit = document.getElementById("submit");
const spotCols = document.getElementById("spotcols");
const spotPrev = document.getElementById("gradpreview");
let removeButtons = document.querySelectorAll(".remove");
 

submit.addEventListener("click", function (e) {
  e.preventDefault();
  let hex = document.getElementById("hex_code");
  //add to array
  spotColList.push(hex.value);
  //add to dom
  spotCols.innerHTML = domColList(spotColList);
  //add to preview
  colPreview();

  outputList() 

});

submit.addEventListener("click", function (e) {
  removeButtons = document.querySelectorAll(".remove");

  removeButtons.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
        e.preventDefault();

        // remove from col array
        let getElementDelete = e.target.parentNode.getAttribute("data-col");
        spotColList = spotColList.filter((e, i) => i.toString() != getElementDelete);

        //remove from dom
        elem.parentNode.remove();

        //reorder dom index number
        let updatedata = document.querySelectorAll("[data-col]");
        updatedata.forEach((el, i) => (el.dataset.col = i.toString()));

        // update preview  
        colPreview()

        outputList() 

        // use once:true to remove event listener from deleted colour
    },{ once: true });
  });
});



const domColList = (spotColList) => {
  let a = "";
  spotColList.forEach((item, i) => {
    a += `
        <div class="row spot-col mb-3  " data-col="${i}" >
            <div class="col-2 remove  d-flex align-items-center justify-content-center" data-icon="&#xe905;"></div>
            <div class="col-10  colour-demo" style="background-color:#${item}"></div>
        </div>
            `;
  });
  return a;
};

const colPreview = () => {
  let arr = spotColList.map((i) => "#" + i).join(" , ");
  let len = spotColList.length;
  spotPrev.style.transition = "all 1s";
  spotPrev.style.background = len === 1 ? "#" + spotColList[0] : `linear-gradient(to bottom, ${arr})`;
  spotPrev.style.height = `${spotColList.length * 38}px`;
};


// options


let listOptions = document.querySelectorAll(".list-options");

listOptions.forEach( elem => {
    elem.addEventListener('change', (e) =>{
        e.preventDefault();
        outputList() 
    })
})

const yourList = document.getElementById('my-list')
const yourPreview = document.getElementById('swatches-preview')

const outputList = ()=> {

    const intRGB = document.getElementById('rgbInterpolation').checked
    const intHSL = document.getElementById('hslInterpolation').checked

    let mySpace = ''

    if(intRGB){ mySpace = 'srgb'}
    if(intHSL){ mySpace = 'hsl'}


    const beforeList = document.getElementById('beforeList').value
    const afterList = document.getElementById('afterList').value
    const intSteps = document.getElementById('intSteps').value

    const formatRGB = document.getElementById('rgbformat-input').checked
    const formatHSL = document.getElementById('hslformat-input').checked
    const formatHEX = document.getElementById('hexformat-input').checked

    let finallist;
    let last = '';
    let thelist =[];

    if(formatHEX){
   
        const beforeHEX = document.getElementById('beforeHEX').value
        const afterHEX = document.getElementById('afterHEX').value
        yourPreview.innerHTML = ''

        if(spotColList.length == 1){
            finallist = document.getElementById('hex_code').value;
            yourPreview.innerHTML += ` 
            <div class="swatch d-inline-block" style="background-color:#${finallist}">
            </div>
            `
            yourList.innerHTML = `<pre>${beforeList}<br>#${finallist}<br>${afterList}</pre>` 
        }

        if(spotColList.length > 1){

            for(let x = 0; x < spotColList.length; x++){
               
                let getGradient = ''  // make it accessable
                let c1 = new Color(`#${spotColList[x]}`) // choose current colour

                // check that it doesnt search for the next colour on the last item of array
                if(x < spotColList.length - 1){
                    //get gradient values with options 
                    getGradient =  c1.steps(`#${spotColList[x+1]}`, {
                            space: mySpace,
                            outputSpace: "hsl",
                            steps: parseInt(intSteps) + 2 // need to add 2 to account for the spot colours
                    });
                }
                
                let gradArray = Object.entries(getGradient) // convert to array
                //take the last one and the first one so there is no repeats in all arrays
                gradArray.pop()
                gradArray.shift()
                // parse colours and convert them to hex
                let trans = gradArray.map(col =>{
                    let convHex = convert.hsl.hex(parseInt(col[1].coords[0]), parseInt(col[1].coords[1]), parseInt(col[1].coords[2]))
                    return    beforeHEX + convHex + afterHEX  
                })
                //add spot colour and add gradient colours
                thelist.push(`${beforeHEX}${spotColList[x]}${afterHEX}`)
                thelist.push(...trans)
            }

            // take the afterHEX out of the last element, 
            thelist[ thelist.length-1] = thelist[thelist.length-1].replace(afterHEX,'')
            // add to swatches 
            thelist.forEach(hey =>{
                yourPreview.innerHTML += ` 
                <div class="swatch d-inline-block" style="background-color:${hey.replace(afterHEX,'')}"></div>`
            })
            //add to preview
            yourList.innerHTML = `<pre>${beforeList}<br>${thelist.join('') }<br>${afterList}</pre>`
        }
    
    }else if(formatRGB){


        const beforeRed= document.getElementById('beforeRed').value
        const beforeGreen= document.getElementById('beforeGreen').value
        const beforeBlue = document.getElementById('beforeBlue').value
        const afterRed= document.getElementById('afterRed').value
        const afterGreen= document.getElementById('afterGreen').value
        const afterBlue = document.getElementById('afterBlue').value

 
        yourPreview.innerHTML = ''

        if(spotColList.length == 1){
            finallist = document.getElementById('hex_code').value;
            yourPreview.innerHTML += ` 
            <div class="swatch d-inline-block" style="background-color:#${finallist}">
            </div>
            `
            yourList.innerHTML = `<pre>${beforeList}<br>#${finallist}<br>${afterList}</pre>` 
        }

        if(spotColList.length > 1){
            let hexforSwatches = []
            for(let x = 0; x < spotColList.length; x++){
               
                let getGradient = ''  // make it accessable
                let c1 = new Color(`#${spotColList[x]}`) // choose current colour

                // check that it doesnt search for the next colour on the last item of array
                if(x < spotColList.length - 1){
                    //get gradient values with options 
                    getGradient =  c1.steps(`#${spotColList[x+1]}`, {
                            space: mySpace,
                            outputSpace: "hsl",
                            steps: parseInt(intSteps) + 2 // need to add 2 to account for the spot colours
                    });
                }
                
                let gradArray = Object.entries(getGradient) // convert to array
                //take the last one and the first one so there is no repeats in all arrays
                gradArray.pop()
                gradArray.shift()
                // parse colours and convert them to hex
                hexforSwatches.push(spotColList[x])
                let trans = gradArray.map(col =>{
                    let convHex = convert.hsl.hex(parseInt(col[1].coords[0]), parseInt(col[1].coords[1]), parseInt(col[1].coords[2]))
                    let convRGB = convert.hsl.rgb(parseInt(col[1].coords[0]), parseInt(col[1].coords[1]), parseInt(col[1].coords[2]))
                    hexforSwatches.push(convHex)
                    return    beforeRed + convRGB[0] + afterRed + beforeGreen + convRGB[1] + afterGreen + beforeBlue + convRGB[2] + afterBlue
                })
                //add spot colour and add gradient colours

                let convRGB = convert.hex.rgb(spotColList[x])

                thelist.push(beforeRed + convRGB[0] + afterRed + beforeGreen + convRGB[1] + afterGreen + beforeBlue + convRGB[2] + afterBlue)
                thelist.push(...trans)
            }

            // take the afterHEX out of the last element, 
            // thelist[ thelist.length-1] = thelist[thelist.length-1].replace(afterHEX,'')
            // add to swatches 
            hexforSwatches.forEach(hey =>{
                yourPreview.innerHTML += ` 
                <div class="swatch d-inline-block" style="background-color:#${hey.replace(afterBlue,'')}"></div>`
            })
            //add to preview
            yourList.innerHTML = `<pre>${beforeList}<br>${thelist.join('') }<br>${afterList}</pre>`
        }



    }else if(formatHSL){
        const beforeH = document.getElementById('beforeH').value
        const beforeS = document.getElementById('beforeS').value
        const beforeL = document.getElementById('beforeL').value
        const afterH = document.getElementById('afterH').value
        const afterS = document.getElementById('afterS').value
        const afterL = document.getElementById('afterL').value

 
        yourPreview.innerHTML = ''

        if(spotColList.length == 1){
            finallist = document.getElementById('hex_code').value;
            yourPreview.innerHTML += ` 
            <div class="swatch d-inline-block" style="background-color:#${finallist}">
            </div>
            `
            yourList.innerHTML = `<pre>${beforeList}<br>#${finallist}<br>${afterList}</pre>` 
        }

        if(spotColList.length > 1){

            let hexforSwatches = []

            for(let x = 0; x < spotColList.length; x++){
               
                let getGradient = ''  // make it accessable
                let c1 = new Color(`#${spotColList[x]}`) // choose current colour

                // check that it doesnt search for the next colour on the last item of array
                if(x < spotColList.length - 1){
                    //get gradient values with options 
                    getGradient =  c1.steps(`#${spotColList[x+1]}`, {
                            space: mySpace,
                            outputSpace: "hsl",
                            steps: parseInt(intSteps) + 2 // need to add 2 to account for the spot colours
                    });
                }
                
                let gradArray = Object.entries(getGradient) // convert to array
                //take the last one and the first one so there is no repeats in all arrays
                gradArray.pop()
                gradArray.shift()
                // parse colours and convert them to hex
                hexforSwatches.push(spotColList[x])
                let trans = gradArray.map(col =>{
                    let convHex = convert.hsl.hex(parseInt(col[1].coords[0]), parseInt(col[1].coords[1]), parseInt(col[1].coords[2]))
                    hexforSwatches.push(convHex)
                    // let convRGB = convert.hsl.rgb(parseInt(col[1].coords[0]), parseInt(col[1].coords[1]), parseInt(col[1].coords[2]))
                    return    beforeH + parseInt(col[1].coords[0]) + afterH + beforeS + parseInt(col[1].coords[1]) + afterS + beforeL + parseInt(col[1].coords[2]) + afterL
                })
                //add spot colour and add gradient colours

                let convRGB = convert.hex.hsl(spotColList[x])

                thelist.push(beforeH + convRGB[0] + afterH + beforeS + convRGB[1] + afterS + beforeL + convRGB[2] + afterL)
                thelist.push(...trans)

 
            }

 
            // add to swatches 
            hexforSwatches.forEach(hey =>{
                yourPreview.innerHTML += ` 
                <div class="swatch d-inline-block" style="background-color: #${hey.replace(afterL,'')}"></div>`
            })
            //add to preview
            yourList.innerHTML = `<pre>${beforeList}<br>${thelist.join('') }<br>${afterList}</pre>`
        }
    }
    

 
}



const copyButton = document.getElementById('copy')

copyButton.addEventListener('click', e => {
    e.preventDefault()
    // ref https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    var copyText = document.getElementById("my-list") ;
    navigator.clipboard.writeText(copyText.innerText);
})

 