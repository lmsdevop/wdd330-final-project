
export function getFav() {
   var favElements = '';
   var products = [];
   var favList = document.querySelector('#divFavority ul');

   for (var product in window.localStorage) {
      if (product.substring(0, 8) == 'product[') {
         products.push(JSON.parse(window.localStorage[product]));
      }
   }

   for (var i = 0; i < products.length; i++) {
      favElements += '<li><a href="#page_product?code=' + products[i].code + '" onclick="requestJSON(this)"><img src="' + products[i].imgInfo.src + '" alt="' + products[i].imgInfo.alt + '"> ' + products[i].name + '</a></li>'
      favList.innerHTML = favElements;
   }
   //if no item is found
   if (products.length < 1) {
      favList.innerHTML = '<li>No item found as favority</li>';
   }
}