import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => (
  <>
    <Header />
    <main className="px-4">
      <Outlet />
    </main>
  </>
);
