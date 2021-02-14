/* ibg */
function ibg(){

    let ibg=document.querySelectorAll(".ibg");
            for (var i = 0; i < ibg.length; i++) {
            if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}
    
    ibg();


/********  MENU BURGER ***********/

document.querySelector('.menu-icon-wrapper').onclick = function(){
    document.querySelector('.menu-icon').classList.toggle('menu-icon-active');
    document.querySelector('.popup-menu').classList.toggle('is-active');
    document.querySelector('body').classList.toggle('no-scroll');
    


}

/******************/

/**********  QUANTITY **************/

const formatNumber = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
let subTotal = 0;
const ACTION ={
    PLUS: 'plus',
    MINUS: 'minus'
};

const calculateSeparateItem = (cartItem, action) => {
    const input = cartItem.querySelector('.input-field');
   

    switch (action) {
        case ACTION.PLUS:
            input.value++;
            break;
        case ACTION.MINUS:
            input.value--;
            break;
    }
    
    subTotal =  Number(input.value) * Number(input.dataset.price);
    cartItem.querySelector('.subtotal').textContent = subTotal
    

};

let quantityButtons = document.querySelectorAll('.quantity__button')

if (quantityButtons.length > 0) {
    for (let index = 0; index < quantityButtons.length; index++) {
        const quantityButton = quantityButtons[index];
        quantityButton.addEventListener("click", (e) => {
           
            if (quantityButton.classList.contains('quantity__button-minus')) {
                const input = e.target.closest('.item-product').querySelector('.input-field');
                if (Number(input.value) > 1) {
                    calculateSeparateItem(
                        e.target.closest('.item-product'),
                        ACTION.MINUS
                        );
                }
            } 
            if (quantityButton.classList.contains('quantity__button-plus')) {
                calculateSeparateItem(
                    e.target.closest('.item-product'),
                    ACTION.PLUS
                    );
            } 
        })
    }
}

/******POPUP CLOSE *****************/

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__btn-close');


popupClose.addEventListener('click', function(e) {
    popup.classList.remove('is-active');
})
 

/*****************Промотка страницы */

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}