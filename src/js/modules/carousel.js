import Glide from './../../../node_modules/@glidejs/glide';

const carousel = () => {

  const configCarousel = {
    type: 'carousel',
    startAt: 1,
    perView: 1
  };

  const configFeatures = {
    type: 'carousel',
    startAt: 1,
    perView: 1,
    focusAt: 'center'
  };

  new Glide('.glide-reviews', configCarousel).mount();
  new Glide('.glide-instructors--first', configCarousel).mount();
  new Glide('.glide-instructors--second', configCarousel).mount();
  new Glide('.glide-features', configFeatures).mount();
  new Glide('.glide-program', configFeatures).mount();
};

export default carousel;