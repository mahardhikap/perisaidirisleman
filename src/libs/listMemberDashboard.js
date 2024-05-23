import axios from 'axios';

const ListMemberDashboard = async (onFullName, onPage) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/member?searchby=fullname&search=${onFullName}&sortby=created_at&sort=DESC&limit=5&page=${onPage}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default ListMemberDashboard;
