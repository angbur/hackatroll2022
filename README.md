<img src="src/assets/img/troll128.png" width="64"/>

# Troll Images Hunter - an extension simplifying the fact-checking process

Made by **Team 8**:

**Mentor**: [Łukasz Powązka](https://github.com/lukiq)

- [Agnieszka Bury](https://github.com/angbury)
- [Jakub Czerwiński](https://github.com/kubaczerwinski77)
- [Paweł Stępień](https://github.com/pastepi)

## What does it accomplish?

Ever feel like the process of fact-checking an image found on the web gets tedious? Each and every photo you doubt you have to manually copy, try to perform google reverse-image search and hope to find the original image you were looking for.

With our extension you don't have to go all through these steps for every image on the site. It will automatically grab the desired photo and select the few images that have a chance to be original versions. While it utilizes DeepAI to perform a basic image similarity check, the final decision to decide whether the image was fake is left up to the user's discretion.
Troll Images Hunter isn't armed with tons of cutting-edge algorithms - it's just a simple tool to guide and warn user of potential fakes.

**Ease of use is the essence** - user can install the extension once and every time the mouse cursor hovers over an image a quick check can be made.

## How to Use

Install dependencies:

`npm install`

Build the Extension with Hot Loader:

`npm start`

While the extension is only available internally (and during review process in Chrome Web Store) you can add the extension to Chrome by going into Manage Extensions -> Enabling Developer Mode -> Load unpacked -> and selecting the 'build' folder.

## Tech Stack

- React
- a pinch of Typescript
- Webpack
- React Hot Loader

## Resources:

- [Chrome Extension Boilerplate](https://github.com/lxieyang/chrome-extension-boilerplate-react)
  made by:
  Michael Xieyang Liu | [Website](https://lxieyang.github.io)

- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)
