

let productsSlider = new Swiper('.products-slider-container', {
    
   

    spaceBetween: 10,
    autoHeight: true,
    speed: 800,
    
    pagination: {
      el: '.products-slider__info',
      type: 'fraction',
    },
    
   navigation: {
       nextEl: '.products-slider__arrow_next',
       prevEl: '.products-slider__arrow_prev',
   },
   slidesPerView: 4,
    slidesPerGroup: 4,
    watchOverflow: true,
    initialSlide: 0,

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      480: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1201: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    }
 })