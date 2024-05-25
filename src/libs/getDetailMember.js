import axios from 'axios';

const GetDetailMember = async (idMember) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/member/${idMember}`
    );
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default GetDetailMember;