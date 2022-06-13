/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createContext } from 'react';
// eslint-disable-next-line import/no-cycle
import ManageProduct from './pages/ManageProduct';
// eslint-disable-next-line import/no-cycle
import ProductListView from './pages/ProductListView';
import ProductDetail from './pages/ProductDetail';
import ProductUpdate from './pages/ProductUpdate';
import ExamplePage from './pages/Example';
import Header from './components/Header';
// eslint-disable-next-line import/no-cycle
import SideBar from './components/Sidebar';
import OverLayProvider from './components/OverLay/provider';
import { Container } from './pages/Example/styles';
// eslint-disable-next-line import/order
import Grid from '@mui/material/Grid';
import NotFound from './pages/NotFound';
import ErrorServer from './pages/ErrorServer';

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
    path: '/example',
    component: ExamplePage,
  },
  {
    path: '/not-found',
    component: NotFound,
  },
  {
    path: '/server-error',
    component: ErrorServer,
  },
];

export const AppContext = createContext();

function App() {
  return (
    // eslint-disable-next-line no-sequences
    // eslint-disable-next-line object-shorthand
    <Container>
      <Grid container>
        <OverLayProvider>
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
        </OverLayProvider>
      </Grid>
    </Container>
  );
}

export default App;
