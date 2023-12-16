import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';

const DefaultLayout = () => {
  const currentLocation = useLocation();

  const isDefault =
    currentLocation.pathname.includes('login') ||
    currentLocation.pathname.includes('signup');

  return (
    <div>
      {isDefault || <NavBar></NavBar>}
      <Outlet></Outlet>
      {isDefault || <Footer></Footer>}
    </div>
  );
};

export default DefaultLayout;
