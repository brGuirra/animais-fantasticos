import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    // Armazena os elementos que são dropdown menus.
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    // Armazena os eventos que vão adicionados,
    // se o valor não for passado a propriedade
    // vai ter um valor padrão.
    if (events === undefined) this.events = ['click', 'touchstart'];
    else this.events = events;

    // Classe que ativa o CSS.
    this.activeClass = 'ativo';

    // Bind no callback do objeto.
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // Função que ativa o dropdown menu e
  // adiciona um função que observa o
  // clique fora dele.
  activeDropdownMenu(event) {
    event.preventDefault();

    // Variável que armazena o elemento que
    // foi selecionado para que o método
    // outsideClick() seja aplicado com referência
    // nele.
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // Função que adiciona o evento aos
  // dropdown menus do site.
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  // Função que inicia os métodos de
  // dropdown menu.
  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
