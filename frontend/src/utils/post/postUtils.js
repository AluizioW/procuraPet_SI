export const rotulosColunasUsuario = {
      nomeUsuario: "Nome",
      telefone: "Telefone",
      logradouro: "Logradouro",
      bairro: "Bairro",
  }

export const rotulosColunasPet = {
      nome: "Nome",
      raca: "Raça",
      especie: "Espécie",
      cor: "Cor",
      sexo: "Sexo",
      idade: "Idade",
  }

export function camposPet (post){
    if (!post) return {};
    const { nome, raca, especie, cor, sexo, idade } = post;
    return { nome, raca, especie, cor, sexo, idade }
}

export function camposUsuario (post){
    if (!post) return {};
    const { nomeUsuario, telefone, logradouro, bairro } = post;
    return { nomeUsuario, telefone, logradouro, bairro };
}

export function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export function formatarMoeda(valor) {
  const numero = parseFloat(valor);
  if (isNaN(numero)) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numero);
}

export function getLegendaCor(valor) {
  switch (valor) {
    case 'desaparecido':
      return '#A4CA8B'; // verde claro
    case 'encontrado':
      return '#5D896F'; // verde
    case 'adocao':
      return '#B7B789'; // bege
  }
}
