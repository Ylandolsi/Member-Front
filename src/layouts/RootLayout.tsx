import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/NavBar/NavBar.tsx';

export const RootLayout = function () {
  return (
    <>
      <div className="">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};
