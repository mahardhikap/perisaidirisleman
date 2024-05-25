'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export function PrivateRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        redirectToSignIn();
        return;
      }

      try {
        const result = jwtDecode(token);
        const expirationTime = result.exp * 1000;
        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          Swal.fire('Sesi login berakhir, silahkan login ulang!').then(() => {
            clearLocalStorageAndRedirectToSignIn();
          });
        }
      } catch (error) {
        clearLocalStorageAndRedirectToSignIn();
      }
    };

    checkAuth();
  }, [router]);

  const redirectToSignIn = () => {
    router.push('/signin');
  };

  const clearLocalStorageAndRedirectToSignIn = () => {
    localStorage.clear();
    redirectToSignIn();
  };

  return children;
}
