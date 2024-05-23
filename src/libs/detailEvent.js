import axios from 'axios';

const GetDetailEvent = async (idEvent) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/article/${idEvent}`
    );
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default GetDetailEvent;
