import api from './api';

/*
export async function getPosts() {
  const response = await api.get('/post');
  return response.data;
}
*/

export async function getPostagem(id) {
  console.log("Chamando API com ID:", id);
  try {
    const response = await api.get(`/post/${id}`);
    //console.log("Resposta recebida:", response.data);
    return response.data;
  
  } catch (error) {
    //console.error("Erro na chamada da API:", error);
    throw error;
  }
}
