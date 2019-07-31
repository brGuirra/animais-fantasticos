// Função de Debounce para que o evento
// de scroll não seja ativado muitas
// vezes em sequeência.
export default function debounce(callback, delay) {
  // Variável que vai armazenar o
  // método de setTimeOut().
  let timer;

  // Foi usado "...args" para permitir
  // que sejam passados argumentos em
  // debouncedScroll logo abaixo.
  return (...args) => {
    // Se já houver valor em "timer"
    // ele vai ser limpado para que
    // não ocorra a função de scroll
    // múltiplas vezes. Como a primeira
    // execução já está na callstack
    // uma nova só pode ser adicionada
    // depois que a anterior for executada.
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      // Depois que o callback é executado
      // o valor de "timer" é limpo.
      timer = null;
    }, delay);
  };
}
