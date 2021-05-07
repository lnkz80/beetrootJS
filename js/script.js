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

//TODO change to top: -50%
userInfo.style.cssText = `
position: absolute;
top: 50%;
left: 50%;
padding: 50px 0;
width: 400px;
text-align: center;
transform: translate(-50%, -50%);
z-index: 1000;
background-color: darkorange;
box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
border-radius: 10px;
`;

userInfo.innerHTML = `
<p>Заполните форму</p>
<input type='text' placeholder='Ваше имя'>
<br />
<input type='email' placeholder='Ваш e-mail'>
<br />
<input type='button' value='Сделать заказ'>
`;

document.body.appendChild(userInfo);
const usrName = userInfo.getElementsByTagName("input")[0];
const usrEmail = userInfo.getElementsByTagName("input")[1];
const confirmOrderBtn = userInfo.getElementsByTagName("input")[2];

//addListener on Order confirm
confirmOrderBtn.addEventListener("click", confirmOrder);

userInfo.getElementsByTagName("p")[0].style.cssText = `
padding: 15px 0 5px;
color: snow;
font-size: 22px;
font-family: Verdana, sans-serif;
margin-bottom: 10px;
`;

const cssInput = `
outline: none;
padding: 7px;
margin-bottom: 10px;
font-size: 14px;
font-family: Verdana, sans-serif;
`;

const cssBtn = `
padding: 7px;
margin-bottom: 15px;
font-size: 14px;
font-family: Verdana, sans-serif;
font-weight: 700;
color: darkorange;
`;

usrName.style.cssText = cssInput;
usrEmail.style.cssText = cssInput;
confirmOrderBtn.style.cssText = cssBtn;

function makeOrder(e) {
  e.preventDefault();
  // if (totalItems.innerText === "XXX") {
  //   alert("Вы не выбрали ни одного товара в корзину!");
  //   return;
  // }
  wrapper.style.pointerEvents = "none";
  userInfo.style.top = "50%";
  userInfo.style.transition = "top 500ms ease-out";
  setTimeout(() => {
    wrapper.style.filter = "blur(20px)";
    wrapper.style.transition = "filter 300ms";
  }, 500);
  // console.log();
}

//TODO: Переделать функцию валидации на более универсальную

function chkForm(field) {
  // empty str  match("^s*$")
  //email check regexp: /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/
  if (field.value.trim() == "") {
    alert("Заполните все поля формы!");
    return false;
  } else {
    // console.log(field.value);
    return true;
  }
}

function confirmOrder(e) {
  e.preventDefault();
  if (!(chkForm(usrName) && chkForm(usrEmail))) {
    return;
  } else {
    alert("Ваш заказ принят, ожидайте выполнения :)");
  }
}
