import { loadHeaderFooter } from "./utils.mjs";
import { sideBarShow, closeSideMenu, showFavority, backMenu } from "./SideMenu.mjs";
import { getFav } from "./Favority.mjs";
import { requestJSON } from "./Search.mjs";

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
    const btnHamburger = document.getElementById('btnHamburger');
    const closeSideMenuBtn = document.getElementById('closeSideMenu');
    const homeLink = document.getElementById('homeLink');
    const favorityLink = document.getElementById('favorityLink');
    const aboutLink = document.getElementById('aboutLink');
    const btnSearch = document.getElementById('btnSearch');
    const closeAsideMenu = document.getElementById('closeSideMenu');
    const backButton = document.getElementById('backButton');
    const backFavorityButton = document.getElementById('backFavorityButton');

    if (btnHamburger) {
        btnHamburger.addEventListener('click', sideBarShow);
    }

    if (closeSideMenuBtn) {
        closeSideMenuBtn.addEventListener('click', closeSideMenu);
    }

    if (homeLink) {
        homeLink.addEventListener('click', closeSideMenu);
    }

    if (favorityLink) {
        favorityLink.addEventListener('click', function () {
            showFavority();
            closeSideMenu();
            getFav();
        });
    }

    if (aboutLink) {
        aboutLink.addEventListener('click', function () {
            showAbout();
            closeSideMenu();
        });
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            requestJSON();
            closeSideMenu();
        });
    }

    if (closeAsideMenu) {
        closeAsideMenu.addEventListener('click', closeSideMenu);
    }

    if (backButton) {
        backButton.addEventListener('click', backMenu);
    }

    if (backFavorityButton) {
        backFavorityButton.addEventListener('click', backMenu);
    }


});
