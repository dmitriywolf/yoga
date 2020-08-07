import headerFixed from './modules/headerFixed';
import modals from "./modules/modals";
import scrolling from "./modules/scrolling";
import carousel from "./modules/carousel";
import forms from "./modules/forms";


document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  /* Header Fixed*/
  headerFixed();
  /* Modals */
  modals();
  /* Scrolling */
  scrolling();
  /* Carousel */
  carousel();
  /* Popup Form */
  forms();

});