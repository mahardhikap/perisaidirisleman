import axios from 'axios';
import Swal from 'sweetalert2';

const EditDetailMember = async (idMember, data) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/edit/member/${idMember}`,
      data,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    Swal.fire({
      icon: 'success',
      title: response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    return response.data; // Mengembalikan data yang diterima dari panggilan API
  } catch (error) {
    console.error('Error fetching data:', error);
    Swal.fire({
      icon: 'error',
      title: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    throw error; // Melemparkan error untuk menangani di tempat lain jika perlu
  }
};

export default EditDetailMember;
