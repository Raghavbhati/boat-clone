document.addEventListener("DOMContentLoaded", function () {
    var showCart = document.querySelector("#showCartDetails");
    var CartDATA = JSON.parse(localStorage.getItem("cart")) || [];

    if (CartDATA.length === 0) {
        var noItems = document.createElement("h3");
        noItems.setAttribute("id", "noitem");
        noItems.innerText = "No Items in Cart";
        showCart.appendChild(noItems);
    } else {
        displayCart(CartDATA);
    }
});
var cartTotal = 0;
var orderValue = 0;
var ShowtotalPrice = document.querySelector("#totalPrice");
var totacartPrice = document.createElement("h3");

function displayCart(data) {
    var showcartProduct = document.querySelector("#showCartDetails");

    totacartPrice.innerText = "₹ " + cartTotal;
    ShowtotalPrice.appendChild(totacartPrice);

    data.forEach(element => {
        var ProductDiv = document.createElement("div");
        ProductDiv.setAttribute("class", "ProductDiv");

        var productfirst = document.createElement("div");
        productfirst.setAttribute("class", "productfirst");
        var productsecond = document.createElement("div");
        productsecond.setAttribute("class", "productsecond");
        var productThird = document.createElement("div");
        productThird.setAttribute("class", "productThird");

        //productfirst Div's content
        var productImage = document.createElement("div");
        productImage.setAttribute("class", "productImage")
        var productTitle = document.createElement("div");
        productTitle.setAttribute("class", "productTitle");
        var img = document.createElement("img");
        img.setAttribute("class", "SimgleProductImage");
        var title = document.createElement("h3");
        title.setAttribute("class", "singleProducttitle");
        var category = document.createElement("p");
        category.setAttribute("class", "showCatrgoryINCart");
        var pricing = document.createElement("p");
        pricing.setAttribute("class", "productPricing");
        var remove = document.createElement("p");
        remove.setAttribute("class", "productRemoveBTN")


        // Product div second content 
        var count = 1;
        var quantityDiv = document.createElement("div");
        quantityDiv.setAttribute("class", "quantityDiv")
        var incrementDIV = document.createElement("div");
        incrementDIV.setAttribute("class", "incrementDIV")
        var currentValue = document.createElement("div");
        currentValue.setAttribute("class", "currentValue")
        var decrementDiv = document.createElement("div");
        decrementDiv.setAttribute("class", "decrementDiv")
        var increment = document.createElement("p")
        var current = document.createElement("p")
        var decrement = document.createElement("p")

        //Product div third div content
        var PriceShow = document.createElement("h4");
        PriceShow.setAttribute("class", "PriceShow")
        var StrikerPrice = document.createElement("p");
        StrikerPrice.setAttribute("class", "StrikerPrice");
        var offShow = document.createElement("p");
        offShow.setAttribute("class", "offOnProduct")


        img.src = element.image_url;
        title.innerText = element.name;
        category.innerText = "Category : " + element.category;
        pricing.innerText = "Price " + element.price;
        remove.innerText = "Remove From Cart";

        increment.innerText = "+";
        current.innerText = count;
        decrement.innerText = "-"

        PriceShow.innerText = element.price;
        StrikerPrice.innerText = element.strikedoffprice;
        offShow.innerText = element.off;

        productImage.appendChild(img);
        productTitle.appendChild(title);
        productTitle.appendChild(category);
        productTitle.appendChild(pricing);
        productTitle.appendChild(remove);

        incrementDIV.appendChild(increment);
        currentValue.appendChild(current);
        decrementDiv.appendChild(decrement);
        quantityDiv.appendChild(incrementDIV);
        quantityDiv.appendChild(currentValue);
        quantityDiv.appendChild(decrementDiv);

        productThird.appendChild(PriceShow);
        productThird.appendChild(StrikerPrice);
        productThird.appendChild(offShow);
        productsecond.appendChild(quantityDiv);
        productfirst.appendChild(productImage);
        productfirst.appendChild(productTitle);

        ProductDiv.appendChild(productfirst);
        ProductDiv.appendChild(productsecond);
        ProductDiv.appendChild(productThird);

        showcartProduct.appendChild(ProductDiv);
        var priceString = element.price.replace(/[^0-9]/g, "");
        var productPrice = parseInt(priceString);
        cartTotal += productPrice;

        remove.addEventListener("click", function () {
            var selectProduct = this.parentElement.parentElement.parentElement;
            selectProduct.remove();
            var productName = element.name;
            removeFromLocalStorage(productName);
            updateTotal(-productPrice);
        })

        incrementDIV.addEventListener("click", function () {
            count++;
            current.innerText = count;
            updateTotal(+productPrice);
        })
        decrementDiv.addEventListener("click", function () {
            count--;
            current.innerText = count;
            updateTotal(-productPrice);
        })
        totacartPrice.innerText = "₹ " + cartTotal;
        orderValue = cartTotal;

        function updateTotal(itemPrice) {
            cartTotal += itemPrice;
            totacartPrice.innerText = "₹ " + cartTotal;
            orderValue = cartTotal;
        }
        function removeFromLocalStorage(productName) {
            var CartDATA = JSON.parse(localStorage.getItem("cart")) || [];
            var updatedCart = CartDATA.filter(item => item.name !== productName);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    });
}

var couponBtn = document.querySelector("#coupensubmitBtn");
var coupenOutput = document.querySelector("#coupenOutput");
var coupenSuccess = document.createElement("p");
coupenSuccess.setAttribute("id", "coupenSuccess");
var coupenWrong = document.createElement("p");
coupenWrong.setAttribute("id", "coupenWrong")

couponBtn.addEventListener("click", function () {
    var coupen = document.querySelector("#Entercoupen").value;
    var off = Math.floor(cartTotal * 0.5);
    coupenWrong.innerText = "";
    coupenSuccess.innerText = "";
    if (coupen === "Raghav") {
        var newCartValue = cartTotal - off;
        orderValue = newCartValue;
        totacartPrice.innerText = "₹ " + newCartValue;
        coupenSuccess.innerText = "You Saved " + off + "₹ With This Coupon"
        coupenOutput.appendChild(coupenSuccess)
    } else {
        coupenWrong.innerText = "Wrong Coupon";
        coupenOutput.appendChild(coupenWrong);
    }

})
var confirmOrderButtons = document.querySelectorAll(".ConfirmOrderBTN");

confirmOrderButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        localStorage.setItem("OrderValue", orderValue);
        window.location.href = "payment.html";
    });
});
var coll = document.getElementsByClassName("collapse-menu");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

document.querySelector(".button").addEventListener("click",
function (){
    // var target=event.target
    target=event.preventDefault()
    var val=document.querySelector(".searchBar").value
    if(val==="earbuds"){
        window.location.href="/products.html"
    }else if(val==="headphones"){
        window.location.href="/products.html"
    }
    console.log(val)
})