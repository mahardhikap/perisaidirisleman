import axios from 'axios';

const LoginUser = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3001/login`, data);
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default LoginUser;
