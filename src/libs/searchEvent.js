import axios from 'axios';

const SearchEvent = async ({ searchTitle, onPage }) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/article?searchby=title&search=${searchTitle}&sortby=created_at&sort=DESC&limit=6&page=${onPage}`
    );
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default SearchEvent;
