import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import Avatar from '../../assets/Avatar.png';
import BellImg from '../../assets/bell.svg';
import SearchImg from '../../assets/search.svg';
import SettingsImg from '../../assets/settings.svg';
import { userLoggedOut } from '../../redux/auth/authSlice';
import BrandLogo from '../SVG/BrandLogo';
import Door from '../SVG/Door';
const NavBar = () => {
  const styles = {
    className:
      'block px-3 py-2  hover:text-white drop-shadow-xl hover:underline transition',
    activeClassName:
      'block px-3 py-2 backdrop-saturate-125 bg-white/30 rounded-[6px] ease-in',
  };
  const navItems = [
    { name: `Home`, path: `/` },
    { name: `Users`, path: `/users` },
    { name: `Project`, path: `/project` },
    { name: `Task`, path: `/task` },
    { name: `Reporting`, path: `/reporting` },
  ];

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <nav className="bg-primary w-full  !z-40">
      <div className="max-w-screen-2xl h-[72px] flex gap-5 items-center mx-auto ">
        <div className="flex items-center gap-5">
          <BrandLogo />
          <h1 className="text-white text-xl font-extrabold">Stack</h1>
        </div>
        <div className="ml-12 flex flex-1 justify-between">
          <ul className="text-soft flex gap-1 text-base">
            {navItems.map((link) => (
              <NavLink
                key={link.name}
                className={({
                  isActive,
                  isPending,
                  isTransitioning,
                }) =>
                  [
                    isPending ? 'pending' : '',
                    isActive
                      ? styles.activeClassName
                      : styles.className,
                    isTransitioning ? 'transitioning' : '',
                  ].join(' ')
                }
                to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </ul>
          <div className="group flex gap-2 items-center">
            <div className="flex gap-0 cursor-pointer">
              <img className="p-2.5" src={SearchImg} alt="" />
              <div className='dropdown inline-block relative"'>
                <img className="p-2.5 " src={SettingsImg} alt="" />
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-50">
                  <li className="">
                    <div className="py-1 ">
                      <div aria-label="footer" className="pt-3 ">
                        <button
                          type="button"
                          className="backdrop-opacity-90 bg-gray-50 flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-purple-500 focus:outline-none hover:bg-gray-100">
                          <div className="invisible">
                            <Door />
                          </div>
                          <span>Profile</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          type="button"
                          className="backdrop-opacity-90 bg-gray-50 flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-purple-500 focus:outline-none hover:bg-gray-100 rounded-b-md">
                          <Door />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <img className="p-2.5" src={BellImg} alt="" />
            </div>
            <img className="dropdown" src={Avatar} alt="User Image" />
          </div>
        </div>
        {/* <div className="">
          <div className="p-10">
            <div className="dropdown inline-block relative">
              <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1">Dropdown</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
                </svg>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
