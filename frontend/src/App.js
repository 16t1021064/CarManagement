/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createContext } from 'react';
import ManageProduct from './pages/ManageProduct';
import ProductListView from './pages/ProductListView';
// eslint-disable-next-line import/order
import ProductDetail from './pages/ProductDetail';
import ProductUpdate from './pages/ProductUpdate';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import OverLayProvider from './components/OverLay/provider';
import ModalSuccessProvider from './components/ModalSuccessProvider';
// eslint-disable-next-line import/order
import Grid from '@mui/material/Grid';
import NotFound from './pages/NotFound';
import ErrorServer from './pages/ErrorServer';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';

const routes = [
  {
    path: ['/quan-ly-sp', '/'],
    exact: true,
    component: ManageProduct,
  },
  {
    path: '/danh-sach-sp',
    component: ProductListView,
  },
  {
    path: ['/chi-tiet-sp/:id', '/chi-tiet-sp/'],
    component: ProductDetail,
  },
  {
    path: ['/cap-nhat-sp/:id', '/cap-nhat-sp'],
    component: ProductUpdate,
  },
  {
    path: '/not-found',
    component: NotFound,
  },
  {
    path: '/server-error',
    component: ErrorServer,
  },
  {
    path: '/login',
    component: Login,
  },
];

export const AppContext = createContext();

function App() {
  return (
    <Grid container>
      <OverLayProvider>
        <ModalSuccessProvider>
          <Router>
            <Header />
            <SideBar />
            <Switch>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </Router>
          <ToastContainer />
        </ModalSuccessProvider>
      </OverLayProvider>
    </Grid>
  );
}

export default App;
