export default class Header {
    constructor(page) {
        this.page = page;
        this.theme = page === "saved";
        this.menu = document.querySelector(".menu");
    }
    render(isLoggedIn, name) {
        while (this.menu.firstChild) this.menu.removeChild(this.menu.firstChild);
        if(this.theme) {
            this.menu.classList.add("menu_theme");
        }

        this.menu.appendChild(this._renderDarkener());
        this.menu.appendChild(this._renderLogo());

        const menuItems = document.createElement("div");
        menuItems.classList.add("menu__items");
        menuItems.appendChild(this._renderIndex());
        if (isLoggedIn) {
            menuItems.appendChild(this._renderSaved());
        }
        if(isLoggedIn) {
            menuItems.appendChild(this._renderExitButton(name));
        } else {
            menuItems.appendChild(this._renderAuthButton());
        }
        this.menu.appendChild(menuItems);
        this.menu.appendChild(this._renderMenuOpenButton());
    }
    
    _renderDarkener() {
        const darkener = document.createElement("div");
        darkener.classList.add("menu__darkener");
        return darkener;
    }
    toggleMenu(menu, theme) {
        menu.classList.toggle("menu_opened");
        menu.querySelector(".menu__items").classList.toggle("menu__items_opened");
        menu.querySelector(".menu__darkener").classList.toggle("menu__darkener_opened");
        menu.querySelector(".menu__button").classList.toggle("menu__button_menu");
        if (theme) {
            menu.querySelector("#savedItemText").classList.toggle("menu__item-text_active-theme");
            menu.querySelector("#savedItemText").classList.toggle("menu__item-text_active");
            menu.querySelector("#savedItemText").classList.toggle("menu__item-text_theme");
            menu.querySelector("#indexItemText").classList.toggle("menu__item-text_theme");
            menu.querySelector(".menu__button").classList.toggle("menu__button_theme");
            menu.querySelector(".menu__button-text").classList.toggle("menu__button-text_theme");
            menu.querySelector(".menu__button-image").classList.toggle("menu__button-image_theme");
        }
    }
    _renderMenuOpenButton() {
        const menuOpen = document.createElement("button");
        menuOpen.classList.add("menu__open");
        const menuOpenImage = document.createElement("div");
        menuOpenImage.classList.add("menu__open-image");
        if (this.theme) {
            menuOpenImage.classList.add("menu__open-image_theme");
        }
        const toggleMenu = this.toggleMenu
        const menu = this.menu;
        const theme = this.theme;
        menuOpen.addEventListener('click', function() {
            toggleMenu(menu, theme);
        })


        menuOpen.appendChild(menuOpenImage);


        return menuOpen;
    }
    _renderLogo() {
        const menuLogo = document.createElement("a");
        menuLogo.setAttribute('href', "http://newsexplorer-manko.site");
        menuLogo.classList.add("menu__logo");
        if (this.theme) {
            menuLogo.classList.add("menu__logo_theme");
        }
        menuLogo.innerText = "NewsExplorer";
        return menuLogo;
    }
    _renderIndex() {
        const menuItemMain = document.createElement("div");
        menuItemMain.classList.add("menu__item");
        const menuItemMainText = document.createElement("a");
        menuItemMainText.setAttribute('href', "index.html");
        menuItemMainText.classList.add("menu__item-text");
        menuItemMainText.innerText = "Главная";
        menuItemMainText.id = "indexItemText";

        if (this.page === "index") {
            menuItemMain.classList.add("menu__item_active");
            menuItemMainText.classList.add("menu__item-text_active");
        }
        if (this.theme) {
            menuItemMainText.classList.add("menu__item-text_theme");
        }
        menuItemMain.appendChild(menuItemMainText);
        return menuItemMain;

    }
    _renderSaved() {
        const menuItemSaved = document.createElement("div");
        menuItemSaved.classList.add("menu__item");
        const menuItemSavedText = document.createElement("a");
        menuItemSavedText.setAttribute('href', "saved.html");
        menuItemSavedText.classList.add("menu__item-text");
        menuItemSavedText.innerText = "Сохранённые статьи";
        menuItemSavedText.id = "savedItemText";

        if (this.page === "saved") {
            if (this.theme) {
                menuItemSaved.classList.add("menu__item_active-theme");
                menuItemSavedText.classList.add("menu__item-text_active-theme");                
            } else {
                menuItemSaved.classList.add("menu__item_active");
                menuItemSavedText.classList.add("menu__item-text_active");
            }
        }
        if (this.theme) {
            menuItemSavedText.classList.add("menu__item-text_theme");
        }
        menuItemSaved.appendChild(menuItemSavedText);
        return menuItemSaved;
    }
    _renderAuthButton() {
        const button = document.createElement("button");
        button.classList.add("menu__button");
        if (this.theme) {
            button.classList.add("menu__button_theme");
        }
        button.setAttribute('id', "authorize");
        const buttonText = document.createElement("span");
        buttonText.classList.add("menu__button-text");
        if (this.theme) {
            buttonText.classList.add("menu__button-text_theme");
        }
        buttonText.innerText = "Авторизоваться";
        button.appendChild(buttonText);
        return button;
    }
    _renderExitButton(name) {
        const button = document.createElement("button");
        button.classList.add("menu__button");
        if (this.theme) {
            button.classList.add("menu__button_theme");
        }
        button.id = "unauthorize";
        const buttonText = document.createElement("span");
        buttonText.classList.add("menu__button-text");
        if (this.theme) {
            buttonText.classList.add("menu__button-text_theme");
        }
        buttonText.innerText = name;
        button.appendChild(buttonText);

        const buttonImage = document.createElement("div");
        buttonImage.classList.add("menu__button-image");
        if (this.theme) {
            buttonImage.classList.add("menu__button-image_theme");
        }
        button.appendChild(buttonImage);

        return button

    }


}