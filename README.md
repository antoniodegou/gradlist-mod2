# Gradlist 

GradList is an App that is both a colour converter and generates a list of colours of the gradients between colours.

Visit the deployed site: [GradList](https://antoniodegou.github.io/gradlist-mod2/)



![Antonio de gou is responsive](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/reponsiveMockUP.png)

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

![Antonio de gou is responsive](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/reponsiveMockUP.png)



### Colours

Because of the nature of the App, the colour has to be based on black and white, with neutral tones to support the selection of colours.

Nowadays, black and white can feel a bit dated, jarring, and painful to the eye. So I decided to have off tones for dark mode and white mode. To have a sense of sophistication and modernity.

![Base Colours](/img01/baseColours.jpg)

Because of form validation, I decided to rely on green for valid and red for invalid; the respective tones are slightly adjusted when in dark or white mode. Therefore, I decided to rely on the traffic light system and used yellow as the accent colour for the rest of the website.

![Base Colours](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img//othercolours.jpg)

![Base Colours2](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img//othercolours2.jpg)

### Typography

I choose two types that are pretty contrasting with each other.
First, Clash is clean and impactful sans serif, while Sentient is more readable and it has serif.

ClashDisplay - For the Headings and general text
Sentient - for code text and warnings

Icomoon -  I used icomoon to produce a font with all the icons I needed.

![typography](/img01/types.jpg)

### Wireframes

Wireframes were made with adobe XD.

<details>
<summary>See Desktop</summary> 
![Desktop Mockup](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/mockup-laptop.jpeg) </details>

<details><summary>See Tablet</summary> 
![Tablet Mockup](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/mockup-mobile.jpeg) </details>

<details><summary>See Mobile</summary> 
![Mobile Mockup](https://raw.githubusercontent.com/antoniodegou/gradlist-mod2/main/img/mockup-tablet.jpeg) </details>

## Features

