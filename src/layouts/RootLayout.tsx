import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/NavBar/NavBar.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs.tsx';

export const RootLayout = function () {
  return (
    <>
      <div className="">
        <Navbar />
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  );
};
