import axios, { AxiosError } from 'axios';
import { CustomError } from '../utils/customerError';

interface FetchDataOptions {
  url: string;
  path?: string;
  httpMethod: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
  query?: Record<string, any>;
}

export const fetchData = async (options: FetchDataOptions) => {
  const { url, path = '', headers = {}, body = {}, params = {}, query = {}, httpMethod } = options;
  
  try {
    const fullUrl = `${url}${path}`;

    const response = await axios({
      method: httpMethod,
      url: fullUrl,
      headers,
      params,
      data: body,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new CustomError(
          `Erro ao buscar dados da API externa: ${error.response.status} - ${error.response.statusText}`,
          502
        );
      } else if (error.request) {
        throw new CustomError('Nenhuma resposta recebida da API externa.', 504);
      } else {
        throw new CustomError('Erro ao configurar a requisição para a API externa.', 500);
      }
    }
    throw new CustomError('Erro desconhecido ao tentar acessar a API externa.', 500);
  }
};
