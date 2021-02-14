

let catalogSection = document.querySelector('.section-catalog'); //вся секция каталога
let catalogItems = document.querySelectorAll('.catalog-body__item'); //все карточки товоров

let catalogNav = catalogSection.querySelector('.catalog-nav__wrapper'); //область, где все кнопки, на которые мы кликаем
    

catalogNav.addEventListener('click', function(e) {
    let target = e.target;
    e.preventDefault();
        let filterValue = target.getAttribute('data-filter');
        console.log(filterValue)
       
        let previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');
        previousBtnActive.classList.remove('is-active');
        target.classList.add('is-active');

        for(let catalogItem of catalogItems) {
            if (catalogItem.dataset.category !== filterValue && filterValue!== 'all') {
                catalogItem.classList.add('hidden')
            } else {
                catalogItem.classList.remove('hidden')
            }
        }
}); 


    


