import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
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
import {
  getCar,
  getAllCategory,
  getAllSupplier,
  getTotalCar,
} from './api';

const routes = [
  {
    path: ['/quan-ly-sp', '/'],
    exact: true,
    component: ManageProduct,
  },
  {
    path: ['/danh-sach-sp'],
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
  const [suppliers, setSuppliers] = useState([]);
  const [total, setTotal] = useState([]);
  const [paginateInfo, setPaginateInfo] = useState({
    pageCurrent: 1,
    pageLimit: 3,
  });
  const initialCars = async () => {
    const carList = await getCar(paginateInfo);
    setCars(carList);
  };
  const initialCategories = async () => {
    const categoryList = await getAllCategory();
    setCategories(categoryList);
  };
  const initialSuppliers = async () => {
    const supplierList = await getAllSupplier();
    setSuppliers(supplierList);
  };
  const totalCar = async () => {
    setTotal(await getTotalCar());
  };
  useEffect(() => {
    totalCar();
    initialCategories();
    initialSuppliers();
    initialCars();
  }, []);
  useEffect(() => {
    initialCars();
  }, [paginateInfo]);
  return (
    // eslint-disable-next-line no-sequences
    // eslint-disable-next-line object-shorthand
    <AppContext.Provider
      value={{
        cars,
        categories,
        suppliers,
        total,
        setPaginateInfo,
        paginateInfo,
      }}
    >
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
