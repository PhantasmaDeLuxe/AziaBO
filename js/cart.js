const productsBtn = document.querySelectorAll('.item-product__button-add');
const cartProductsList = document.querySelector('.cart-content__list'); //класс нашего списка товаров в корзине
const cart = document.querySelector('.cart'); //сама иконка корзины, чтобы задавать корзине класс active когда там что-нибудь есть
const cartQuantity = document.querySelector('.cart-quantity'); //здесь будет отображаться количество товаров в корзине
const fullPrice = document.querySelector('.fullprice'); // общая сумма
let price = 0; //итоговое число, которое будет добавляться в fullPrice после пересчетов

//Добавляем рандомный Id товару
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

//убираем в цене ненужные пробелы и знак рубля
const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

//возвращаем цену в нормальный вид - с пробелами
const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}



//функция суммирует цены товаров в корзине
const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
    
};

//если убрать товар их корзины, общая сумма уменьшается
const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

//выводим итоговую цену 
const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₽`;
};

//вывод количества товаров в корзинe
//обращаемся к контейнеру, в котором лежат все li
const printQuantity = () => {
    let length = cartProductsList.querySelector('.simplebar-content').children.length;
    cartQuantity.textContent = length;
    //если в корзине есть хотя бы один товар, ей добавляется класс active
    length > 0 ? cart.classList.add('active') :  cart.classList.remove('active') 
    
};

//создаем новый шаблон для размещения товара в корзине
const generateCartProduct = (img, title, qtyNumber, price, productCost, id) => {
    return `
        <li class="cart-content__item">
            <article class="cart-content__product cart-product" data-id="${id}">
                <img src="${img}" alt="macbook" class="cart-product__img" width="100">
                <div class="cart-product__options">
                    <div class="cart-product__text">
                        <h3 class="cart-product__title">${title}</h3>
                        <span class="cart-product__cost">цена ${productCost} ₽</span> 
                    </div>
                
                    <div class="cart-product__quantity">
                        <div class="cart-product__button cart-product__button-minus">-</div>
                        <div class="cart-product__input">
                            <input class="cart-product-field" data-price="${productCost}" type="text"  value="${qtyNumber}">
                        </div>
                        <div class="cart-product__button cart-product__button-plus">+</div>
                    </div>
                    <span class="cart-product__price">${normalPrice(price)} ₽</span>
                </div>
                <div class="cart-product__delete" aria-label="Удалить товар"></div>
            </article>
        </li>
    `;

}
const  deleteProducts = (productParent) => {
    let id = productParent.querySelector('.cart-product').dataset.id;
    document.querySelector(`.item-product[data-id="${id}"]`).querySelector('.item-product__button-add').disabled = false;

    let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
    printQuantity();

};

// нажимаем на кнопку Добавить в корзину
productsBtn.forEach(el => {
    el.closest('.item-product').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.item-product');
        let id = parent.dataset.id;
        let img = parent.querySelector('.item-product__image img').getAttribute('src');
        let title =  parent.querySelector('.item-product__title').textContent;
        let qtyNumber = Number(parent.querySelector('.input-field').value);
        let productCost = Number(parent.querySelector('.input-field').dataset.price);
        console.log(productCost);
   
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.item-product__price').textContent));
        
        plusFullPrice(priceNumber);
        printFullPrice();
        cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, qtyNumber, priceNumber, productCost, id));
        printQuantity();
        self.disabled = true; //отключаем кнопку добавления в корзину когда товар в корзину уже добавлен
    });
});
cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product__delete')) {
        deleteProducts(e.target.closest('.cart-content__item'));
    }

});

/******************Кнопки + - в строке товара */


const calculateSeparateProduct = (cartItem, action) => {
    const input = cartItem.querySelector('.cart-product-field');
    
    switch (action) {
        case ACTION.PLUS:
            input.value++;
            break;
        case ACTION.MINUS:
            input.value--;
            break;
    }
    currentPrice =  Number(input.value) * Number(input.dataset.price);
    cartItem.querySelector('.cart-product__price').textContent = `${normalPrice(currentPrice)} ₽`;
    

}



cartProductsList.addEventListener('click', (e) => {
    const input = e.target.closest('.cart-content__item').querySelector('.cart-product-field'); 
    let productCost = Number(input.dataset.price);
    if (e.target.classList.contains('cart-product__button-minus')) {
        
        if (Number(input.value) > 1) {
            calculateSeparateProduct(
                e.target.closest('.cart-content__product'),
                ACTION.MINUS
                );
                minusFullPrice(productCost);
                printFullPrice();
        }
        

    }
    if (e.target.classList.contains('cart-product__button-plus')) {
            calculateSeparateProduct(
                e.target.closest('.cart-content__product'),
                ACTION.PLUS
                ); 
        plusFullPrice(productCost);
        printFullPrice();
        

    }

});


/*************Модальное окно оформления заказа */
const modal = new Modal ({
    isOpen: (modal) => {
        let array = cartProductsList.querySelector('.simplebar-content').children;
        let fullprice = fullPrice.textContent;
        let length = array.length;
        
        document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
		document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
        for (item of array) {
            let img = item.querySelector('.cart-product__img').getAttribute('src');
			let title = item.querySelector('.cart-product__title').textContent;
			let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
			let id = item.querySelector('.cart-product').dataset.id;

			//orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));

            let obj = {};
			obj.title = title;
			obj.price = priceString;
			//productArray.push(obj);
        }
       
    },
    isClose: () => {

    },

});
document.querySelector('.order').addEventListener('submit', (e) => {
	e.preventDefault();
	let self = e.currentTarget;

	let formData = new FormData(self);
	let name = self.querySelector('[name="Имя"]').value;
	let tel = self.querySelector('[name="Телефон"]').value;
	let mail = self.querySelector('[name="Email"]').value;
	formData.append('Товары', JSON.stringify(productArray));
	formData.append('Имя', name);
	formData.append('Телефон', tel);
	formData.append('Email', mail);

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Отправлено');
			}
		}
	}

	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);

	self.reset();
});

