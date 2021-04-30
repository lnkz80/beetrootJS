/* 
=============> "Условная" база данных
*/
const DB = {
  catDB: [
    { id: 1, name: "Завтраки" },
    { id: 2, name: "Первые блюда" },
    { id: 3, name: "Гарниры" },
  ],
  itemDB: [
    { id: 1, name: "Овсяная каша с фруктами", price: 25, catId: 1 },
    {
      id: 2,
      name: "Яичница глазунья с овощами на сковородке",
      price: 25,
      catId: 1,
    },
    { id: 3, name: "Сет азербайджанский завтрак", price: 30, catId: 1 },
    { id: 4, name: "Яичница с помидорами по-бакински", price: 45, catId: 1 },
    { id: 5, name: "Сырники со сметаной", price: 45, catId: 1 },
    { id: 6, name: "Шпинатный крем-суп", price: 50, catId: 2 },
    { id: 7, name: "Суп Пити", price: 85, catId: 2 },
    { id: 8, name: "Борщ украинский", price: 95, catId: 2 },
    { id: 9, name: "Суп Кюфта Бозбаш", price: 100, catId: 2 },
    { id: 10, name: "Картофель фри", price: 125, catId: 3 },
    { id: 11, name: "Картофель по-домашнему", price: 135, catId: 3 },
    { id: 12, name: "Рис с овощами", price: 155, catId: 3 },
  ],
};

const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const prodBox = document.getElementById("products");
const catSel = document.getElementById("catSel");
const priceSel = document.getElementById("priceSel");
const sbmtOrderBtn = document.getElementById("sbmtOrder");

//addListener on Order submit
sbmtOrderBtn.addEventListener("click", makeOrder);
//addListener on addItems buttons
document.addEventListener("click", addItemToCart);
//addListener on filter change
document.addEventListener("change", changeFilterBtn);


/* 
=============> Фильтрация товара по выбранным категориям и цене
*/
function renderProd(data) {
  prodBox.innerHTML = data
    .map(
      (item) => `<div class="product-box__item">
        <h3 class="product-box__title">${item.name}</h3>
        <div class="product-box__img">
            <img class="img-fluid" src="i/im${item.id}.jpg">
        </div>
        <div class="product-box__meta">
            <p>${item.price} грн.</p>
            <div class="qty">
                <input class="qty__item" type="number"> Кол
            </div>
            <button class="product-box__btn">Добавить</button>
        </div>
    </div>`
    )
    .join("");
}

function changeFilterBtn(e) {
  const t = e.target;
  if (t.classList.value != "select-control") {
    return;
  }
  const sCat = parseInt(catSel.value);
  const sPrice = parseInt(priceSel.value);

  const filterDB = DB.itemDB.filter((item) => {
    return (
      (sCat === 0 || item.catId === sCat) &&
      (sPrice === 0 || item.price <= sPrice)
    );
  });
  renderProd(filterDB);
}
/* 
=============> Работа с корзиной (изменение кол-ва и суммы при добавлении товара)
*/
//объект корзины
const cart = {
  items: 0,
  sum: 0,
  update(qty, price) {
    this.items += qty;
    this.sum += price * qty;
    totalItems.innerText = cart.items;
    totalPrice.innerText = cart.sum;
    return true;
  },
};

//handler function for addItems buttons
function addItemToCart(e) {
  e.preventDefault();
  const { target } = e;
  if (target.classList.value !== "product-box__btn") {
    return;
  }
  const priceObj = target.parentNode.firstElementChild;
  const price = parseInt(priceObj.innerText);
  const qtyObj = priceObj.nextElementSibling.firstElementChild;
  // Regular expr.
  const re = /\d+/gm;
  //input validation
  if (!re.test(qtyObj.value) || qtyObj.value <= 0) {
    alert("В поле введены некорректные данные!");
    return false;
  }
  const qty = parseInt(qtyObj.value);
  qtyObj.value = "";
  cart.update(qty, price);
}

/*
=============> Потверждение заказа
*/
const wrapper = document.getElementById("app-container");

const userInfo = document.createElement("div");
userInfo.style.position = "absolute";
userInfo.style.top = "200px";
userInfo.style.padding = "50px";
userInfo.style.margin = "0 auto";
userInfo.style.zIndex = "1000";
userInfo.style.backgroundColor = "blue";
userInfo.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.5)";
document.body.appendChild(userInfo);


userInfo.innerHTML = `<input type='text' placeholder='Введите Ваше имя'>
<br />
<input type='email' placeholder='Введите Вашу почту'>
<br />
<input type='button' value='Сделать заказ'>`;

function makeOrder (e){
e.preventDefault();
wrapper.style.filter="blur(5px)";
wrapper.style.transition="filter 500ms ease-in";



}