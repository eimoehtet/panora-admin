import React from 'react';
import { useRoutes } from 'react-router';
import {BookDetails, BookRequests, Books,CreateBook} from '../features/books';
import { Login } from '../features/auth';
import { MainMenu } from '../hoc';
import { Authors, CreateAuthor } from '../features/author';
import { GenresList } from '../features/genres';
import {OrderDetails, Orders} from '../features/orders';
import './App.css'
import PrivateRoute from '../utility/PrivateRoute';
import { Dashboard } from '../features/dashboard';


function App() {
  const routes = [
    {path:'/login',element:<Login/>},
   
    {path:'/',element:<PrivateRoute><MainMenu/></PrivateRoute>,
    children:[
      {path:'/',element:<Dashboard/>},
      {path:'orders',element:<Orders/>},
      {path:'orders/:id/orderDetails',element:<OrderDetails/>},
      {path:'requests',element:<BookRequests/>},
      {path:'books/new',element:<CreateBook/>},
      {path:'books',element:<Books/>},
      {path:'books/:id',element:<BookDetails/>},
      {path:'authors',element:<Authors/>},
      {path:'authors/new',element:<CreateAuthor/>},
      {path:'genres',element:<GenresList/>}
    ]
  },
  
  ]
  const element=useRoutes(routes)
  return (
    <div>
        {element}
    </div>
  );
}

export default App;
