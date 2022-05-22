import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
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
import { getAllCar, getAllCategory } from './api';

const routes = [
  {
    path: ['/quan-ly-sp'],
    exact: true,
    component: ManageProduct,
  },
  {
    path: ['/danh-sach-sp', '/'],
    component: ProductListView,
  },
  {
    path: '/chi-tiet-sp',
    component: ProductDetail,
  },
  {
    path: '/cap-nhat-sp',
    component: ProductUpdate,
  },
  {
    path: '/example',
    component: ExamplePage,
  },
];

export const AppContext = createContext();

function App() {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const initialCategories = async () => {
    const categoryList = await getAllCategory();
    setCategories(categoryList);
  };
  const initialCars = async () => {
    const carList = await getAllCar();
    setCars(carList);
  };
  useEffect(() => {
    initialCategories();
    initialCars();
  }, []);
  return (
    // eslint-disable-next-line no-sequences
    // eslint-disable-next-line object-shorthand
    <AppContext.Provider value={{ cars, categories }}>
      <Container>
        <Grid container spacing={0}>
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
    </AppContext.Provider>
  );
}

export default App;
