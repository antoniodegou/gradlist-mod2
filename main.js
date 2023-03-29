import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import * as cosmetic from "/assets/js/cosmetic.js";
import * as formValidation from "/assets/js/formvalidation.js";
import { Gradient } from "javascript-color-gradient";
import Color from "colorjs.io"
import * as convert from 'color-convert'


let spotColList = []
const submit = document.getElementById("submit")
const spotCols = document.getElementById("spotcols")
const spotPrev = document.getElementById("gradpreview")
let removeButtons = document.querySelectorAll(".remove")

/*
// add event listener for "add colour" bottom
*/
submit.addEventListener("click", function (e) {
    e.preventDefault()
    let hex = document.getElementById("hex_code")
    spotColList.push(hex.value) //add to array
    spotCols.innerHTML = domColList(spotColList) //add to dom
    colPreview() //add to preview
    outputList()  // output gradient list
});

/*
// Add and refresh event listeners for new "remove" bottons
*/
submit.addEventListener("click", function (e) {
  removeButtons = document.querySelectorAll(".remove");

  removeButtons.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
        e.preventDefault();
        // remove from col array
        let getElementDelete = e.target.parentNode.getAttribute("data-col")
        spotColList = spotColList.filter((e, i) => i.toString() != getElementDelete)
        //remove from dom
        elem.parentNode.remove()
        //reorder dom index number
        let updatedata = document.querySelectorAll("[data-col]")
        updatedata.forEach((el, i) => (el.dataset.col = i.toString()))
        // update preview  
        colPreview()
        outputList() 
        // use once:true to remove event listener from deleted colour
    },{ once: true });
  });
});
/*
// Add new Spot colours to the DOM
*/
const domColList = (spotColList) => {
  let a = "";
  spotColList.forEach((item, i) => {
    a += `<div class="row spot-col mb-4  " data-col="${i}" >
            <div class="col-2 remove  d-flex align-items-center justify-content-center" data-icon="&#xe905;"></div>
            <div class="col-10  colour-demo" style="background-color:#${item}"></div>
        </div>`
  });
  return a;
};
/*
// Add colours to the preview
*/
const colPreview = () => {
    let arr = spotColList.map((i) => "#" + i).join(" , ")
    let len = spotColList.length
    spotPrev.style.transition = "all 1s";
    spotPrev.style.background = len === 1 ? "#" + spotColList[0] : `linear-gradient(to bottom, ${arr})`
    //compute color-spots  height and match for the preview
    let height = 0
    let heights = document.querySelectorAll(".spot-col")
    heights.forEach((a, i )=>{
        // Get values of height and margin bottom
        let iHeight = a.offsetHeight
        let mBottom = parseInt(window.getComputedStyle(a).getPropertyValue('margin-bottom'))
        // dont compute the last on the list
        if(heights.length -1   == i){ mBottom = 0}
        height += (iHeight + mBottom)
    })
    spotPrev.style.height = `${height}px`
    // don't show element while there is no height
    if(height == 0){
        spotPrev.classList.remove('opacity-100')
        spotPrev.classList.add('opacity-0')
    }else{
        spotPrev.classList.add('opacity-100')
        spotPrev.classList.remove('opacity-0')
    }

};

/*
// List Options
*/
let listOptions = document.querySelectorAll(".list-options")
const yourList = document.getElementById('my-list')
const yourPreview = document.getElementById('swatches-preview')

listOptions.forEach( elem => {
    elem.addEventListener('change', (e) =>{
        e.preventDefault();
        outputList() 
    })
})

/*
// Handle Options for the final list
*/
const outputList = ()=> {

    const intRGB = document.getElementById('rgbInterpolation').checked
    const intHSL = document.getElementById('hslInterpolation').checked

    let mySpace = ''

    if(intRGB){ mySpace = 'srgb'}
    if(intHSL){ mySpace = 'hsl'}

    const beforeList = document.getElementById('beforeList').value
    const afterList = document.getElementById('afterList').value
    const intSteps  = document.getElementById('intSteps').value

    const formatRGB = document.getElementById('rgbformat-input').checked
    const formatHSL = document.getElementById('hslformat-input').checked
    const formatHEX = document.getElementById('hexformat-input').checked

    let finallist;
    let thelist =[];

    if(formatHEX){
        //get the value of hex that from the user
        const beforeHEX = document.getElementById('beforeHEX').value
        const afterHEX = document.getElementById('afterHEX').value
        // re init the preview HTML
        yourPreview.innerHTML = ''
        // if the list only has one element chose that one colour for preview and colour list
        if(spotColList.length == 1){
            finallist = document.getElementById('hex_code').value;
            yourPreview.innerHTML += `<div class="swatch d-inline-block" style="background-color:#${finallist}"></div>`
            yourList.innerHTML = `<pre>${beforeList}<br>#${finallist}<br>${afterList}</pre>` 
        }
        // If if larger than 1 compute the gradients
        if(spotColList.length > 1){

            for(let x = 0; x < spotColList.length; x++){
                let getGradient = ''  // Make it accessable
                let c1 = new Color(`#${spotColList[x]}`) // choose current colour
                // Check that it doesnt search for the next colour on the last item of array
                if(x < spotColList.length - 1){
                    // Get gradient values with options 
                    getGradient =  c1.steps(`#${spotColList[x+1]}`, {
                            space: mySpace,
                            outputSpace: "hsl",
                            steps: parseInt(intSteps) + 2 // Need to add 2 to account for the spot colours
                    });
                }
                let gradArray = Object.entries(getGradient) // convert to array
                // Take the last one and the first one so there is no repeats in all arrays
                gradArray.pop()
                gradArray.shift()
                // Parse colours and convert them to hex
                let trans = gradArray.map(col =>{
                    let convHex = convert.hsl.hex(parseInt(col[1].coords[0]), parseInt(col[1].coords[1]), parseInt(col[1].coords[2]))
                    return    beforeHEX + convHex + afterHEX  
                })
                // Add spot colour and add gradient colours
                thelist.push(`${beforeHEX}${spotColList[x]}${afterHEX}`)
                thelist.push(...trans)
            }

            // Take the afterHEX out of the last element, 
            thelist[ thelist.length-1] = thelist[thelist.length-1].replace(afterHEX,'')
            // Add to swatches 
            thelist.forEach(hey =>{
                yourPreview.innerHTML += `<div class="swatch d-inline-block" style="background-color:${hey.replace(afterHEX,'')}"></div>`
            })
            // Add to preview
            yourList.innerHTML = `<pre>${beforeList}<br>${thelist.join('') }<br>${afterList}</pre>`
        }
    
    }else if(formatRGB){
        // Get the options for RGB
        const beforeRed= document.getElementById('beforeRed').value
        const beforeGreen= document.getElementById('beforeGreen').value
        const beforeBlue = document.getElementById('beforeBlue').value
        const afterRed= document.getElementById('afterRed').value
        const afterGreen= document.getElementById('afterGreen').value
        const afterBlue = document.getElementById('afterBlue').value
        // reset HTML preview
        yourPreview.innerHTML = ''
        // Check if the list had only 1 element
        if(spotColList.length == 1){
            finallist = document.getElementById('hex_code').value;
            yourPreview.innerHTML += ` <div class="swatch d-inline-block" style="background-color:#${finallist}"></div>`
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
                //convert to rgb
                let convRGB = convert.hex.rgb(spotColList[x])
                //push in the right order to the final list
                thelist.push(beforeRed + convRGB[0] + afterRed + beforeGreen + convRGB[1] + afterGreen + beforeBlue + convRGB[2] + afterBlue)
                thelist.push(...trans)
            }

            // add to swatches 
            hexforSwatches.forEach(hey =>{
                yourPreview.innerHTML += `<div class="swatch d-inline-block" style="background-color:#${hey.replace(afterBlue,'')}"></div>`
            })
            //add to preview
            yourList.innerHTML = `<pre>${beforeList}<br>${thelist.join('') }<br>${afterList}</pre>`
        }



    }else if(formatHSL){
        // Get the options for HSL values
        const beforeH = document.getElementById('beforeH').value
        const beforeS = document.getElementById('beforeS').value
        const beforeL = document.getElementById('beforeL').value
        const afterH = document.getElementById('afterH').value
        const afterS = document.getElementById('afterS').value
        const afterL = document.getElementById('afterL').value
        
        yourPreview.innerHTML = '' // Reset preview HTML
        // Check if list only has one element
        if(spotColList.length == 1){
            finallist = document.getElementById('hex_code').value;
            yourPreview.innerHTML += ` <div class="swatch d-inline-block" style="background-color:#${finallist}"></div>`
            yourList.innerHTML = `<pre>${beforeList}<br>#${finallist}<br>${afterList}</pre>` 
        }

        if(spotColList.length > 1){

            let hexforSwatches = [] // Array to collect hex colours for swatches

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
                // add colours in the right order
                thelist.push(beforeH + convRGB[0] + afterH + beforeS + convRGB[1] + afterS + beforeL + convRGB[2] + afterL)
                thelist.push(...trans)
            }

            // add to swatches 
            hexforSwatches.forEach(hey =>{
                yourPreview.innerHTML += ` <div class="swatch d-inline-block" style="background-color: #${hey.replace(afterL,'')}"></div>`
            })
            //add to preview
            yourList.innerHTML = `<pre>${beforeList}<br>${thelist.join('') }<br>${afterList}</pre>`
        }
    }
 
}




 