export function sideBarShow() {
   const sideBar = document.getElementById('menu');
   sideBar.style.transform = 'translateX(0px)';
}

export function closeSideMenu() {
   const sideBar = document.getElementById('menu');
   sideBar.style.transform = 'translateX(-1024px)';
}

export function backMenu() {
   const searchResults = document.getElementById('searchResults');
   searchResults.style.transform = 'translateX(1024px)';

   const favority = document.querySelector('#divFavority');
   favority.style.transform = 'translateX(1024px)';

   const footer = document.querySelector('footer');
   footer.style.transform = 'translateX(1024px)';

   setTimeout(function () {
      footer.style.display = 'none';
      searchResults.style.display = 'none';
      favority.style.display = 'none';
   }, 300);

   const winUrl = window.location.href;
   const prodPos = winUrl.search("age_product");
   if (prodPos == -1) {
      prodPos = winUrl.search("#");
   }
   window.location.href = winUrl.substr(0, prodPos + 1);
   document.getElementById('loading').style.display = 'none';
}

export function showAbout() {
   const footer = document.querySelector('footer');
   footer.style.display = 'block';
   setTimeout(function () {
      footer.style.transform = 'translateX(0px)';
   }, 300);
}

export function showFavority() {
   const favority = document.querySelector('#divFavority');
   favority.style.display = 'block';
   setTimeout(function () {
      favority.style.transform = 'translateX(0px)';
   }, 300);
}

const body = document.body;
const html = body.parentNode;
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const searchContainer = document.querySelector('#search');

nav.addEventListener('touchstart', closeSideMenu, false);
header.addEventListener('touchstart', closeSideMenu, false);
searchContainer.addEventListener('touchstart', closeSideMenu, false);