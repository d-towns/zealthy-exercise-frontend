import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import CreateTicketPage from './pages/CreateTicketPage';
import TicketPage from './pages/TicketPage';
import LoginPage from './pages/Login';
import { AuthProvider } from './context/AuthContext';

const Root = () => (
  <React.Fragment>
    <Navbar />
    <Outlet />
  </React.Fragment>
)

const routes = (
  <React.Fragment>
    <Route path='/' element={<Root />}>
      <Route index element={<LoginPage />} />
      <Route path='/admin' element={<Dashboard />} />
      <Route path='ticket'>
        <Route path='create' element={<CreateTicketPage />} />
        <Route path=':slug' element={<TicketPage />} />
      </Route>
    </Route>
  </React.Fragment>
);

const routeArray = createRoutesFromElements(routes);
const router = createBrowserRouter(routeArray);

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
