# TESTING

* [Testing](#testing)
  * [Automated testing](#Automated-testing)
  * [Manual testing](#Manual-testing)
  * [Bugs](#bugs)

## automated testing

### W3C validator

I used [W3C](https://validator.w3.org/) to validator the HTML. 
I got one warning for having two values on the attribute `data-icon`. But because it works, I left it as it is because I needed two icons for these input fields.

[HTML validation](https://validator.w3.org/nu/?doc=https%3A%2F%2Fantoniodegou.github.io%2Fgradlist-mod2%2F)


The CSS error is all related to bootstrap, not my code.

[CSS validation](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fantoniodegou.github.io%2Fgradlist-mod2%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=pt-BR)



### Lighthouse 

I got max scores in google chrome's lighthouse.

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/lighthouse.jpg" width="60%" alt="Lighthouse">

### WAVE

The accessibility check passed with no errors.

![Wave](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/wave.jpg)



### ViteJS

Due to its nature, it will not live-reload as soon as there is any error on CSS or javascript, and it also says where it found the error.

## Manual Testing

### Tools for testing

1. Macbook pro m1 2021
2. Google Chrome
3. firefox
4. Safari
5. Hoverify (emulates an Extensive Mobile devices list)
6. Google Dev Tools
7. Huawei Mate 20
8. iMac 2019

### Converter section

On the converter section, I did some extensive testing. I went field by field and tested the impact on the input and the effect on the other Inputs.

Changing the Input field affects all the others, making the testing extensive and complex.
Things to consider are:
* valid/invalid input marks on the input itself
* valid/invalid on the other inputs affected by the input in focus
* muted/active "add colour" button



|               | put new value (right value)  | put new value (wrong value) | put on top of wrong value<br>(Right) | put on top of wrong value<br>(Wrong) | put on top of right value<br>(Right) | put on top of right value<br>(Wrong) |
| ------------- | ---------------------------- | --------------------------- | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| Hex           | Right tick                   | Wrong cross                 | Right tick                           | Wrong cross                          | Right tick                           | Wrong cross                          |
| Hex           | Right tick on others         | Wrong cross on others       | Right tick on others                 | Wrong cross on others                | Right tick on others                 | Wrong cross on others                |
| Hex           | Conversion on others success | “No!” on others             | Conversion on others success         | “No!” on others                      | Conversion on others success         | “No!” on others                      |
| Hex           | Valid submit button          | Dimmed button               | Valid submit button                  | Dimmed button                        | Valid submit button                  | Dimmed button                        |
|               |                              |                             |                                      |                                      |                                      |                                      |
| RGB           | Right tick                   | Wrong cross                 | Right tick                           | Wrong cross                          | Right tick                           | Wrong cross                          |
| RGB           | Right tick on others         | Wrong cross on others       | Right tick on others                 | Wrong cross on others                | Right tick on others                 | Wrong cross on others                |
| RGB           | Conversion on others success | “No!” on others             | Conversion on others success         | “No!” on others                      | Conversion on others success         | “No!” on others                      |
| RGB           | Valid submit button          | Dimmed button               | Valid submit button                  | Dimmed button                        | Valid submit button                  | Dimmed button                        |
|               |                              |                             |                                      |                                      |                                      |                                      |
| HSL           | Right tick                   | Wrong cross                 | Right tick                           | Wrong cross                          | Right tick                           | Wrong cross                          |
| HSL           | Right tick on others         | Wrong cross on others       | Right tick on others                 | Wrong cross on others                | Right tick on others                 | Wrong cross on others                |
| HSL           | Conversion on others success | “No!” on others             | Conversion on others success         | “No!” on others                      | Conversion on others success         | “No!” on others                      |
| HSL           | Valid submit button          | Dimmed button               | Valid submit button                  | Dimmed button                        | Valid submit button                  | Dimmed button                        |
|               |                              |                             |                                      |                                      |                                      |                                      |
| CSS COLOURS   | Right tick                   | Wrong cross                 | Right tick                           | Wrong cross                          | Right tick                           | Wrong cross                          |
| CSS COLOURS   | Right tick on others         | Wrong cross on others       | Right tick on others                 | Wrong cross on others                | Right tick on others                 | Wrong cross on others                |
| CSS COLOURS   | Conversion on others success | “No!” on others             | Conversion on others success         | “No!” on others                      | Conversion on others success         | “No!” on others                      |
| CSS COLOURS   | Valid submit button          | Dimmed button               | Valid submit button                  | Dimmed button                        | Valid submit button                  | Dimmed button                        |
|               |                              |                             |                                      |                                      |                                      |                                      |
| COLOUR PICKER | N/A                          | N/A                         | N/A                                  | N/A                                    | N/A                                  | N/A                                  |


The Colour picker will be the default of whatever browser you use. It works very well with one exception:

On firefox, you can only add the colour once you turn off the colour picker; it still works but makes the process less streamlined. 


### Spot Colours Section

This section depends solely on the "Add Colour" button.

Once you add a colour, a few things need to happen:

1. add colour to the dom with a "remove" button
2. add colour to the general array of colours
3. update the "remove" event listener list (making sure the event is used only once)
4. update the gradient preview
5. update the output list with the existing list options

Every time the "add button" colour is hit, these things happen as long as all Input fields are valid.

Once any of the "remove" buttons are clicked, a few things need to happen:

1. remove the colour from the array
2. remove the colour from DOM
3. reorder IDs on the remaining DOM elements
4. update Colour preview
5. Update the output list with the existing list options
	

These things happen every time the "remove button" colour is hit.

### List options

All inputs here are transformed into String type and are used to format the output list.

I ensured the field on gradient steps has a regex so it only accepts integers because the App couldn't compute the gradient with any other number type.

When you try to put a value that values that is not an integer, it just won't accept it.

### Output List

The copy button always copies the text to the clipboard.

## Responsiveness

### Hoverify and google dev tools

I used Hoverify, which allows me to test several devices simultaneously in live time. 

![Lighhouse](https://raw.githubusercontent.com/antoniodegou/web-portfolio-mod1/main/readme-images/hoverify.jpg)


## Bugs

* The icon on the colour picker doesn't appear on Firefox. 

* On the converter section, I need to have two icons, but I get a warning that I have an attribute with two elements, but regardless it works.

* I have some repeated CSS code for dark and light modes, and I wonder if there is a way of making the code cleaner.


