var loadmorelinkHref = '';
var loadBool = true;
var findLoadInter = setInterval(getLoadHref, 300);

function getLoadHref() {

   if (loadBool || loadmorelinkHref.search('index.html#') > -1) {
      loadmorelinkHref = document.getElementById('loadmorelink');

      document.getElementById('loadmorelink');
      loadBool = false;
      clearInterval(findLoadInter);
   }
}

export async function requestJSON() {
   // Fechar a aba de favoritos, se estiver aberta
   const fav = document.querySelector('#divFavority');
   if (fav) {
      fav.style.transform = 'translateX(1024px)';
   }

   const loading = document.getElementById('loading');
   if (loading) {
      loading.style.display = 'block';
   }

   // Obter o valor do input
   const txtFood = document.getElementById('txtSearch').value;

   // Fazer o request POST
   try {
      const response = await fetch('https://world.openfoodfacts.org/cgi/search.pl?', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: new URLSearchParams({
            search_terms: txtFood,
            search_simple: 1,
            action: "process",
            json: 1
         })
      });
      const responseJson = await response.json()

      createProductList(responseJson)

   } catch (error) {
      console.error('Fetch error:', error);
   } finally {
      if (loading) {
         loading.style.display = 'none';
      }
   }
}
//print search
function createProductList(jsonData) {
   const products = jsonData.products
   const resultDiv = document.getElementById('result');

   // Cria a div com a classe 'product_table'
   const productTableDiv = document.createElement('div');
   productTableDiv.className = 'product_table';

   // Cria a ul com a classe 'product_list'
   const productListUl = document.createElement('ul');
   productListUl.className = 'product_list';

   // Itera sobre os itens do JSON e cria os elementos
   products.forEach(product => {
      // Cria o li
      const productCode = product.code;
      const productLi = document.createElement('li');

      // Cria o a com o href dinâmico
      const productLink = document.createElement('a');
      productLink.href = product.url;

      // Cria a div com a classe 'product_content'
      const productContentDiv = document.createElement('div');
      productContentDiv.className = 'product_content';

      // Cria a div com a classe 'product_image'
      const productImageDiv = document.createElement('div');
      productImageDiv.className = 'product_image';
      const productImage = document.createElement('img');
      productImage.id = productCode + 'img';
      productImage.src = product.image_front_small_url;
      productImageDiv.appendChild(productImage);

      // Cria a div com a classe 'product_name'
      const productNameDiv = document.createElement('div');
      productNameDiv.className = 'product_name';
      productNameDiv.id = productCode + 'name';
      productNameDiv.textContent = product.product_name + ' ' + product.product_quantity + product.product_quantity_unit;

      const productFavStar = document.createElement('div');
      productFavStar.className = 'star';
      const productStar = document.createElement('img');
      productStar.src = './img/star-void.png';
      productStar.id = productCode;
      productStar.setAttribute('onclick', 'toggleColors(this);')
      productFavStar.appendChild(productStar)

      // Adiciona as divs à div 'product_content'
      productContentDiv.appendChild(productImageDiv);
      productContentDiv.appendChild(productNameDiv);

      // Adiciona a div 'product_content' ao link
      productLink.appendChild(productContentDiv);

      // Adiciona o link ao li
      productLi.appendChild(productFavStar);
      productLi.appendChild(productLink);

      // Adiciona o li à ul
      productListUl.appendChild(productLi);
   });

   // Adiciona a ul à div 'product_table'
   productTableDiv.appendChild(productListUl);

   // Adiciona a div 'product_table' à div 'result'
   resultDiv.appendChild(productTableDiv);

   // Adiciona a tag script dinamicamente
   const script = document.createElement('script');
   script.src = './js/favorite.js';
   document.body.appendChild(script);
}

