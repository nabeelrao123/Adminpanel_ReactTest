// api.js
const API_URL = 'https://reqres.in/api/users?page=1';

export const fetchDataFromApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
