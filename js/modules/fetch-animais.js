import AnimaNumeros from './anima-numeros.js';

export default function fecthAnimais(url, target) {
  // Essa função cria o elemento no HTML contendo os valores
  // de cada de animal vindos de um arquivo externo.
  function createAnimal(animal) {
    // Criando a div que vai abrigar os elementos que
    // vão conter o nome e a quantidade de cada animal.
    const div = document.createElement('div');
    div.classList.add('numero-animal');

    // Após a div (container do conteúdo) ser criada, o que vai
    // dentro é adicionado com innerHTML, inclusive as classes e
    // data atributtes.
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;

    // Retorna o elemento que foi criado para ser utilizado na
    // função fecthAnimais().
    return div;
  }

  // Variável usada para adicionar os novos elementos que
  // vão ser criados ao HTML do site.
  const numerosGrid = document.querySelector(target);

  // Preenche cada animal no DOM.
  function preencherAnimais(animal) {
    // Novo elemento com valores de animal é criado.
    const divAnimal = createAnimal(animal);

    // O elemento é adicionado ao HTML do site.
    numerosGrid.appendChild(divAnimal);
  }

  function animaAnimaisNumeros() {
    // A class AnimaNumeros() vai ser ativada apenas
    // após os novos elementos contendo os valores de cada
    // animal serem criados. Isso evita um erro onde a
    // animação não acontecia porque a promessa que gera
    // os elementos de cada animal ainda não tinha sido
    // finalizada.
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // Função criada para buscar os valores do arquivo animaisapi.json
  // através de um fetch() e cria cada animal usando createAnimal().
  async function criarAnimais() {
    try {
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      // O retorno do arquivo é um Array com 3 objetos,
      // é feita uma iteração por ele aplicar a função
      // preencherAnimais().
      animaisJSON.forEach(animal => preencherAnimais(animal));

      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
