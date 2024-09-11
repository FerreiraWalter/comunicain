import axios from 'axios';

const API_URL = 'https://api.example.com/data';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from third party');
  }
};
