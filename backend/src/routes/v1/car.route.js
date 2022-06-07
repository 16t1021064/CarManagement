const express = require('express');
const carController = require('../../controllers/car.controller');

const router = express.Router();

router
    .route('/')
    .get(carController.getCar); 

router
    .route('/')
    .post(carController.uploadThumnail, carController.createCar);

router
    .route('/category')
    .get(carController.getAllCategory);

router
    .route('/supplier')
    .get(carController.getAllSupplier);

router
    .route('/:id')
    .get(carController.getCarById) 
    .put(carController.uploadUpdate, carController.updateCar)
    .delete(carController.deleteCar);

router
    .route('/testUpload')
    .post(carController.uploadThumnail, carController.testUpload);


module.exports = router;