import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import CreateOrder from './CreateOrder';
import ClientView from './create_client';
import UserView from './create_user';
import FullView from './full_clients';
import Update from './update_clients';
import Login  from './login';
import Services from './crud_of_services';
import Garments from './crud_of_garments';


const router = createBrowserRouter([
{
    path: '/create-client',
    element: <ClientView />,
  },
  {
    path: '/create-user',
    element: <UserView />,
  },
  {
    path: '/full-client',
    element: <FullView />,
  },
  {
    path: '/update-client',
    element: <Update/>
  },
  
   {
    path: '/login',
    element: <Login />,
  },
{
    path: '/orden',
    element: <CreateOrder />,
  },
   {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/garments',
    element: <Garments />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();