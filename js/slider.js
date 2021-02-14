let mainSwiper = new Swiper('.banner-inner', {
    // Optional parameters
    //direction: 'horisontal',
    loop: true,
  
    // If we need pagination
    
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      
    },
    
  
    // Navigation arrows
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    
    slidesPerView: 1,
  })


//Слайдер меню на мобильном 

let x = window.matchMedia("(max-width: 992px)")
myFunction(x) // Вызов функции прослушивателя во время выполнения
function myFunction(x) {
  if (x.matches) { // Если медиа запрос совпадает
    let mobileSlider = new Swiper ('.mobile-menu-container', {
      //loop: true,
      //slidesPerView: 1,
      //slidesPerGroup: 1,


      pagination: {
        //el: '.news-swiper__dotts',
        //clickable: true,
      },
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
        
      }
    })
  } 
}


  