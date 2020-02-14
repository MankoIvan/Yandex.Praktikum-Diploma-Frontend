export default class Header {
    constructor(page) {
        this.page = page;
        this.theme = page === "saved";
        this.menu = document.querySelector(".menu");
    }
    render(isLoggedIn, name) {
        this.menu.innerHTML = "";
        if(this.theme) {
            this.menu.classList.add("menu_theme");
        }

        this.menu.appendChild(this.renderLogo());

        const menuItems = document.createElement("div");
        menuItems.classList.add("menu__items");
        menuItems.appendChild(this.renderIndex());
        if (isLoggedIn) {
            menuItems.appendChild(this.renderSaved());
        }
        if(isLoggedIn) {
            menuItems.appendChild(this.renderExitButton(name));
        } else {
            menuItems.appendChild(this.renderAuthButton());
        }

        this.menu.appendChild(menuItems);


    }

    renderLogo() {
        const menuLogo = document.createElement("a");
        menuLogo.setAttribute('href', "http://newsexplorer-manko.site");
        menuLogo.classList.add("menu__logo");
        if (this.theme) {
            menuLogo.classList.add("menu__logo_theme");
        }
        menuLogo.innerText = "NewsExplorer";
        return menuLogo;
    }
    renderIndex() {
        const menuItemMain = document.createElement("div");
        menuItemMain.classList.add("menu__item");
        const menuItemMainText = document.createElement("a");
        menuItemMainText.setAttribute('href', "index.html");
        menuItemMainText.classList.add("menu__item-text");
        menuItemMainText.innerText = "Главная";

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
    renderSaved() {
        const menuItemSaved = document.createElement("div");
        menuItemSaved.classList.add("menu__item");
        const menuItemSavedText = document.createElement("a");
        menuItemSavedText.setAttribute('href', "saved.html");
        menuItemSavedText.classList.add("menu__item-text");
        menuItemSavedText.innerText = "Сохранённые статьи";

        if (this.page === "saved") {
            if (this.theme) {
                menuItemSaved.classList.add("menu__item_active-theme");
                menuItemSavedText.classList.add("menu__item-text_active-theme");                
            }
            menuItemSaved.classList.add("menu__item_active");
            menuItemSavedText.classList.add("menu__item-text_active");
        }
        if (this.theme) {
            menuItemSavedText.classList.add("menu__item-text_theme");
        }
        menuItemSaved.appendChild(menuItemSavedText);
        return menuItemSaved;
    }
    renderAuthButton() {
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
    renderExitButton(name) {
        const button = document.createElement("button");
        button.classList.add("menu__button");
        if (this.theme) {
            button.classList.add("menu__button_theme");
        }
        button.id = "unauthorize";
        //button.setAttribute('id', "unauthorize");
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