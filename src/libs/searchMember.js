import axios from 'axios';

const SearchMember = async ({ memberNumber }) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/member?searchby=id_number&search=${memberNumber}&sortby=created_at&sort=ASC&limit=1&page=1`
    );
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default SearchMember;
