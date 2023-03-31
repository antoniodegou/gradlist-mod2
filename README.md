# Gradlist 

GradList is an App that is both a colour converter and generates a list of colours of the gradients between colours.

Visit the deployed site: [GradList](https://antoniodegou.github.io/gradlist-mod2/)



![Antonio de gou is responsive](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/reponsiveMockUP.jpg)

---

## CONTENTS



* [User Experience](#user-experience-ux)
  * [Initial discussion](#initial-discussion)
  * [User Stories](#user-stories)

* [Design](#design)
  * [Colour Scheme](#colours)
  * [Typography](#typography)
  * [Wireframes](#wireframes)

* [Features](#features)
  * [General](#general)
  * [Future Implementations](#future-implementations)
  * [Accessibility](#accessibility)

* [Technologies Used](#technologies-used)

* [Deployment & Local Development](#deployment--local-development)
  * [Deployment](#deployment)
  * [Local Development](#local-development)


* [Testing](#testing)
  * [Automated testing](#Automated-testing)
  * [Manual testing](#Manual-testing)

* [Credits](#credits)

- - - 

## User Experience (UX)

### Initial Discussion

GradList came from several necessities I've found as a generative artist.
First, I want a colour converter to generate lists of gradients between a list of chosen spot colours.

This makes it easier to prototype artwork colours quickly by just iterating over the list/array rather than wasting time building an algorithm for a secondary feature.

There are a lot of converters over the web and gradient list generators, but as far as I am aware, GradList is the only one that lets you make a list with more than just 2 Spot colours. 

Grad List also has an extensive options list format that lets you customise lists to be usable for several systems, from JAVA to CSS, from P5.js to OPENNRDR.

The primary audience is generative artists or people who must work with colour lists.

#### Essential information about the website

* Colour converter section
 	* between HEX, RGB, HSL and CSS colour names and a Colour picker
* Spot Colours section
	* Colours selected by the user plus a preview of the gradient of those colours
* List Options Section
	* Options on list formatting, colour format and colour formatting.
* Output List Section
	* Generated list plus colour swatch section


### User Stories

#### Client goals, first-time and returning visitors 

* Intuitive feel for how the website works
* Convert colours to the wanted format.
* Get a list of colours in whatever formatting is needed.
* Preview colours if you are doing colour studies.
* Test colour schemes with light and dark modes. 


## Design

Because this app works with colours, the design must be functional. The Aesthetics can't overpower the function or, more specifically, the view of the colours.
The Shapes are simple and intuitive so that it informs the performance.

I implemented the dark and light mode, where with the switch the user can test their colours agaisnt a light or dark background. All styles change with it in a very pleasing off white and off black.




### Colours

Because of the nature of the App, the colour has to be based on black and white, with neutral tones to support the selection of colours.

Nowadays, black and white can feel a bit dated, jarring, and painful to the eye. So I decided to have off tones for dark mode and white mode. To have a sense of sophistication and modernity.

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/baseColours.jpg" width="60%" alt="Base Colours">


Because of form validation, I decided to rely on green for valid and red for invalid; the respective tones are slightly adjusted when in dark or white mode. Therefore, I decided to rely on the traffic light system and used yellow as the accent colour for the rest of the website.

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/othercolours1.jpg" width="60%" alt="valid invalid dark mode">

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/othercolours2.jpg" width="60%" alt="valid invalid light mode">



### Typography

I choose two types that are pretty contrasting with each other.
First, Clash is clean and impactful sans serif, while Sentient is more readable and it has serif.

ClashDisplay - For the Headings and general text
Sentient - for code text and warnings

Icomoon -  I used icomoon to produce a font with all the icons I needed.

![typography](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/types.jpg)

### Wireframes

Wireframes were made with adobe XD.

<details>
<summary>See Desktop</summary>

![Desktop Mockup](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/mockup-laptop.jpg) 
</details>

<details><summary>See Tablet</summary> 

![Tablet Mockup](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/mockup-mobile.jpg) 
</details>

<details><summary>See Mobile</summary> 

![Mobile Mockup](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/mockup-tablet.jpg) 
</details>

## Features

### General

* A favicon and title in the browser tab.
* Web page title app
* input type switch for dark and light mode

### Sections


#### Converter:

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/feat_converter.jpg" width="60%" alt="Converter">

Five input options exist for Hex, RGB, HSL, CSS colours and a colour picker.
All fields have form validation so they can say if the format is accepted or not.
All fields have field validation; if the format is correct, there with be a green tick symbol; if wrong, there will be a red cross.
Hex and RGB fields use regex patterns to screen for validation
HSL has a custom function to filter for Field Validation.
CSS keyWords checks if colours are a part of the list and are prepopulated via Color-Convert API.

The event listener connects all fields, and a lot is valid; all the other field change to the correct format.

The button to add colours to the list is only active if all fields are valid.

The list is updated automatically once you unfocus from the field or press enter. 

#### Spot Colours:

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/feat_spot.jpg" width="60%" alt="Spot Colours">

Spot colour shows the colours added from the "add colour" button.
Each colour swatch is generated with a minus button to let you delete the colour.
There is a div where you can preview the gradient of chosen colours.
The preview gradient is updated as you add or subtract spot colours.

#### Options:

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/feat_options.jpg" width="60%" alt="Options">


The options on the list are pretty extensive without being overwhelming.

* gradient interpolation mode

Concerns with how the colour travels on the RGB or HSL spectrum.

* before and after list

Concert with the final list and the type of text you want at the beginning and end of the list.

* list colour format

The final format of all colours of the list.
You can choose the text before and after each element of colour.
The options are HEX, RGB and HSL.

The list is updated automatically once you unfocus from the field or press enter. 
 


#### Output:

<img src="https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/feat_output.jpg" width="60%" alt="Output">
 

It shows a window with the user's final list output.

A copy button that copies the text to the clipboard so the user can paste it into their work.

The user output list is formatted with the `<pre> HTML` element to account for spaces and is easy to preview.

A circle swatch collection demonstrates all the colours of the list separately.

#### Footer

Also, an "all right reserved" text and symbol.
With the help of javascript, the year is continuously updated without the need to hardcode.

### Future Implementations

1. Have more colour formats to convert.
2. Have more colour formats in the output list.
3. Add an extra option of the user's output for the list to be Inline or Block.
4. On the spot colours section, I would like to implement a drag option where you could alter the order of the list instead of just deleting colours.


### Accessibility

* Accessibility has been considered since the inception of this project.
* I used semantic HTML.
* The buttons have a hover and disabled/abled state. 
* All the links have an Aria label.
* The colours passed the contrast test on Wave.
* I analysed with Wave and got Zero errors.
* The Form has labels.


---

## Technologies Used

### Languages

* HTML CSS and JavaScript

### libraries

* Bootstrap 5.2
* SASS 1.58

### front end tools

* ViteJS
* Visual studio code
* iTerm (terminal tool)
* Git
* GitHub
* Google Dev Tools (To troubleshoot and test features and solve issues with responsiveness and styling)
* Hoverify (responsiveness testing on several devices)
* freeformatter.com - to prettify HTML CSS and javascript files
* WAVE (accessibility testing)


### Design tools

* Adobe XD (for the wireframes)
* Adobe Illustrator (for graphic design and favicon)
* Fontshare (Fonts for the APP)
* ImageOptim (OSX app to compress images for README files)

### APIs

* Color-convert

I `Color-convert` to populate the CSS keyword with all existing css colour names.
I also used it to handle the conversion on my converter section.

[npm color-convert](https://www.npmjs.com/package/color-convert)

* Colorjs.io

I used `Colorjs.io` to calculate my gradient steps and output a list.

[ColorJS.io](https://colorjs.io/)



### Local Development
#### How to Fork
To fork the repository:

1. Login (or sign up) to Github.
2. Go to the repository for this project, antoniodegou/web-portfolio-mod1.
3. Click the Fork button in the top right corner.

#### How to Clone
To clone the repository:

1. Login (or sign up) to GitHub.
2. Go to the repository for this project, antoniodegou/web-portfolio-mod1.
3. Click the code button, select whether you want to clone with HTTPS, SSH or GitHub CLI and copy the link shown.
4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
5. Type 'git clone' into the terminal and paste the link you copied in step 3. Press enter.

#### When developing with ViteJS when cloned

##### Installing all dependencies

```
cd "folder of the project."
npm install
```

##### Getting started with live reloading
```
npm run dev
```
A link with the localhost will appear in the command line. Just click it, and you will be directed.

##### Install new dependencies

```
npm add -D "dependency"
```

##### Deploying

This will build all deployed files to the docs folder.

```
npm run build
```
You can have a preview of the website in the docs folder.
```
npm run preview
```

The deployment settings are in the "vite.config.js" file at the project's root.

## Testing & Bugs
See TESTING.md for the full breakdown of testing & bugs
[here](TESTING.md)
