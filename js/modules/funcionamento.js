export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    // Armazena o elemento que vai conster o
    // funcionamento da empresa.
    this.funcionamento = document.querySelector(funcionamento);

    // Armazena a classe que ativa o CCS.
    this.activeClass = activeClass;
  }

  // Função que pega os dias e horários de
  // funcionamento da empresa.
  dadosFuncionamento() {
    // Armazena os dias da semana que a emprea funciona.
    this.diasSemana = this.funcionamento.dataset.semana.split(',').map(Number);

    // Armazena o horário que a empresa está aberta.
    this.horarioSemana = this.funcionamento.dataset.horario.split(',').map(Number);
  }

  // Função que pega o horário e dia da semana
  // do usuário, com base no horário de Brasília.
  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();

    // Horário de Brasíla = UTC -3;
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;
  }

  // Funão que verifica se a empresa está
  // aberta ou não, retorna true ou false.
  estaAberto() {
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;
    const horarioAberto = (this.horarioAgora >= this.horarioSemana[0]
      && this.horarioAgora < this.horarioSemana[1]);

    return semanaAberto && horarioAberto;
  }

  // Função que adiciona a classe ativo ao elemento
  // quando a empresa estiver aberta.
  ativaAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.activeClass);
    }
  }

  // Funão que inicia os métodos da classe
  // Funcionamento.
  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaAberto();
    }
    return this;
  }
}
