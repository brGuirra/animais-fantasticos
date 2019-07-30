export default class ScrollAnima {
  constructor(sections) {
    // Importa todas as Sections que o site tiver.
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.7;

    this.checkDistance = this.checkDistance.bind(this);
  }

  // Esse método pega a distância em relação ao topo
  // de cada section da página. Esses valores são
  // armazenados em um objeto. Para conseguir correr
  // o método map() foi preciso desestruturar a
  // propriedade "this.sections" da classe.
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offsetTopElement = section.offsetTop;
      return {
        element: section,
        // O valor dessa propriedade é subtraído de
        // "this.windowMetade" para que o elemento
        // não seja animado somente quando o scroll
        // estiver em seu topo.
        offsetTopElement: Math.floor(offsetTopElement - this.windowMetade),
      };
    });

    // O valor quando chegava na última section do site era muito
    // baixo, por isso ela não animava direito. Especificamente
    // para esse caso é preciso setar um valor especial.
    this.distance[3].offsetTopElement = this.distance[3].offsetTopElement
     + (this.windowMetade * 1.2);
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
