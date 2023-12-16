import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { userLoggedIn } from '../redux/auth/authSlice';

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authStateCheck, setAuthStateCheck] = useState(false);

  useEffect(() => {
    const authLocal = localStorage.getItem('auth');
    if (authLocal) {
      const auth = JSON.parse(authLocal);
      if (auth.token) {
        dispatch(userLoggedIn(auth));
      }
    }
    setTimeout(() => {
      setAuthStateCheck(true);
    }, 2000);
  }, [dispatch]);

  return authStateCheck;
};

export default useAuthCheck;
