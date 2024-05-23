'use client';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export function PrivateRoute({ children }) {
  const router = useRouter();
  const token = localStorage.getItem('token');
  try {
    let result = jwtDecode(token);
    const expirationTime = result.exp * 1000;
    const currentTime = Date.now();
    if (expirationTime < currentTime) {
      Swal.fire('Sesi login berakhir, silahkan login ulang!').then(() => {
        localStorage.clear();
        router.push('/signin');
        return false;
      });
    }
  } catch (error) {
    router.push('/signin');
  }

  return children;
}
