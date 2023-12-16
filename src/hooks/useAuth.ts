import { useAppSelector } from '../app/hooks';

const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);

  if (auth?.token) {
    return true;
  } else return false;
};

export default useAuth;
