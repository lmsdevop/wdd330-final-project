function toggleColors(img) {
    if (img.getAttribute('src') == 'img/star-yellow.png') {
        img.src = 'img/star-void.png';
        removeFav(img.id);
    }
    else {
        img.src = 'img/star-yellow.png';
        storeFav(img.id);
    }
}

function storeFav(id) {
    //products length
    if (typeof window.localStorage['productIndex'] !== 'undefined') {
        var index = window.localStorage['productIndex'];
        window.localStorage.setItem('productIndex', parseInt(index) + 1);
    } else {
        window.localStorage.setItem('productIndex', 1);
    }

    //creating objects by product info

    //---Product Img---
    var productImg = document.getElementById(`${id}img`);

    var img = {
        src: productImg.getAttribute('src'),
        alt: productImg.getAttribute('alt')
    };

    //---Product Name---
    var productName = document.getElementById(`${id}name`).textContent;

    //product object setting (index start at 1)
    var index = window.localStorage['productIndex'];

    var product = {
        index: parseInt(index),
        code: id,
        imgInfo: img,
        name: productName
    };

    window.localStorage.setItem('product[' + index + ']', JSON.stringify(product));

}

function removeFav(id) {
    //products length
    if (typeof window.localStorage['productIndex'] !== 'undefined') {
        var index = window.localStorage['productIndex'];
        window.localStorage.setItem('productIndex', parseInt(index) - 1);
    } else {
        window.localStorage.setItem('productIndex', 0);
    }

    var products = [];
    populateProductArray(products);

    //see if the actual product is actualy saved
    for (var i = 0; i < products.length; i++) {
        if (products[i].code == id) {
            window.localStorage.removeItem('product[' + products[i].index + ']');
            console.log(window.localStorage['product[' + i + ']']);
        }
    }
    console.log(window.localStorage);

    //
    //   window.localStorage.removeItem(codeNumb+'imgAlt');   
}
function getProdCode() {

    var url = window.location.href;
    var urlSplit;

    if (url.includes("?")) {
        urlSplit = url.split('?', 2);
    }
    var codeParam;
    var codeText;
    var codeNumb;

    if (urlSplit != undefined) {
        codeParam = urlSplit[1];
        codeText = codeParam.substr(0, 4);
        codeNumb = codeParam.substr(5);
    }
    return codeNumb;
}

function populateProductArray(products) {
    for (var product in window.localStorage) {
        if (product.substring(0, 8) == 'product[') {
            products.push(JSON.parse(window.localStorage[product]));
        }
    }
}
