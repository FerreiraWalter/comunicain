import axios from 'axios';

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
      params: params,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching external API:', error);
    throw error;
  }
};
