const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
//объект корзины
const cart = {
    items: 0,
    sum: 0,
    update(qty, price){
        this.items += qty;
        this.sum += price*qty;
        totalItems.innerText = cart.items;
        totalPrice.innerText = cart.sum;
        return true;
    }   
}
//addListener on addItems buttons
document.addEventListener("click", addItemToCart);
//handler function for addItems buttons
function addItemToCart(e){
    e.preventDefault();
    const {target} = e;
    if (target.classList.value !== "product-box__btn"){
        return;
    }
    const priceObj = target.parentNode.firstElementChild;
    const price = parseInt(priceObj.innerText);    
    const qtyObj = priceObj.nextElementSibling.firstElementChild;
    // Regular expr. 
    const re = /^[0-9]$/;
    //input validation
    if(!re.test(qtyObj.value)) { 
        alert("В поле введены неправильные данные!!!");        
        return false
    }
    const qty = parseInt(qtyObj.value);
    qtyObj.value = "";
    cart.update(qty, price);    
    // console.log(qtyObj);
}

