import debounce from './debounce.js';

export default class ScrollAnima {
  constructor(sections) {
    // Importa todas as Sections que o site tiver.
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.8;

    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  // Esse método pega a distância em relação ao topo
  // de cada section da página. Esses valores são
  // armazenados em um objeto. Para conseguir correr
  // o método map() foi preciso desestruturar a
  // propriedade "this.sections" da classe.
  getDistance() {
    this.distance = [...this.sections].map((section, index) => {
      let offsetTopElement = section.offsetTop;
      if (index > 2) {
        offsetTopElement += this.windowMetade;
      } else {
        offsetTopElement -= this.windowMetade;
      }
      return {
        element: section,
        // O valor dessa propriedade é subtraído de
        // "this.windowMetade" para que o elemento
        // não seja animado somente quando o scroll
        // estiver em seu topo.
        offsetTopElement,
      };
    });
  }

  // Essa função adiciona e remove a classe
  // "ativo" conforme a distância do elemento
  // na tela.
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offsetTopElement) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
