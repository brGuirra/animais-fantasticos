import outsideClick from './outsideclick.js';

export default class MenuMobile {
  constructor(menuButton, menuList, events) {
    // Armazena o elemento do menu mobile.
    this.menuButton = document.querySelector(menuButton);

    // Armazena a lista que vai ser apresentada para
    // esse elemento que foi armazenado.
    this.menuList = document.querySelector(menuList);

    // Bind do callback de addMenuMobileEvents();
    this.openMenu = this.openMenu.bind(this);

    // Classe que ativa o CCS.
    this.activeClass = 'active';

    // Armazena os eventos que vão adicionados,
    // se o valor não for passado a propriedade
    // vai ter um valor padrão.
    if (events === undefined) this.events = ['touchstart', 'click'];
    else this.events = events;
  }

  // Abre o menu mobile do elemento
  // adiconando e removendo a classe "active".
  openMenu(event) {
    // Previne que ocorra um bug no menu-mobile
    // já que o elemento tem os eventos de click
    // e touchstart.
    event.preventDefault();

    this.menuList.classList.add(this.activeClass);
    this.menuButton.classList.add(this.activeClass);
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove(this.activeClass);
      this.menuButton.classList.remove(this.activeClass);
    });
  }

  // Adiciona os eventos ao menu mobile.
  addMenuMobileEvents() {
    this.events.forEach(evento => this.menuButton.addEventListener(evento, this.openMenu));
  }

  // Inicia os métodos da classe.
  init() {
    if (this.menuButton && this.menuList) {
      this.addMenuMobileEvents();
    }
    return this;
  }
}
