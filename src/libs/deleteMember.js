import axios from 'axios';

const DeleteMember = async (idToDelete) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/delete/member/${idToDelete}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default DeleteMember;
