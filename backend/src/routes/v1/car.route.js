const express = require('express');
const carController = require('../../controllers/car.controller');
const carValidation = require('../../validations/car.validation')
const validate = require('../../middlewares/validate');
const router = express.Router();



router
    .route('/')
    .get(validate(carValidation.getCar) ,carController.getCar);

router
    .route('/')
    .post(carController.uploadThumnail, validate(carValidation.createCar), carController.createCar);

router
    .route('/category')
    .get(carController.getAllCategory);

router
    .route('/supplier')
    .get(carController.getAllSupplier);

router
    .route('/relate/:cate')
    .get(carController.getRelate);

router
    .route('/:id')
    .get(validate(carValidation.getCarById), carController.getCarById) 
    .put(carController.uploadUpdate,validate(carValidation.updateCar), carController.updateCar)
    .delete(validate(carValidation.deleteCar) ,carController.deleteCar);

router
    .route('/testUpload')
    .post(carController.uploadThumnail, carController.testUpload);

module.exports = router;