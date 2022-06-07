const { Car } = require('../models');

/**
 * 
 * @returns all car
 */
const getAllCar = async () => {
    const cars = Car.find();
    return cars;
}

/**
 * 
 * @param {*} carBody car information
 * @returns car
 */
const createCar = async (carBody) => {
    const car = await Car.create(carBody);
    return car;
}

const getAllCategory = async () => {
    const categories = await Car.find({}).distinct('category');
    return categories;
}

const getAllSupplier = async () => {
    const suppliers = await Car.find({}).distinct('supplier');
    return suppliers;
}

// phan trang cho supplier, category, searchvalue
const paginate = async (pageLimit, pageCurrent, supplier, category, searchValue) => {
    let query = Car.find({});
    if(category !== ''){
        query = query.where('category', category);
    }
    if(supplier !== ''){
        query = query.where('supplier', supplier);
    }
    if(searchValue !== ''){
        query = query.where({'name': { $regex: '.*' + searchValue + '.*' } });
    }
    const carList = await Car.find(query).select().sort([['createdAt', 'descending']]).limit(parseInt(pageLimit)).skip((parseInt(pageCurrent)-1)*parseInt(pageLimit));
    const total = await Car.find(query).select().countDocuments();

    return {carList , total};
}

const getCarById = async (id) => {
    const relateCar = await Car.find({}).limit(4);
    const relate = relateCar.filter((car)=> car.id !== id);
    if(relate.length === 4) {
        relate.pop();
    }
    const car = await Car.findById(id);
    return { car, relate };
}

const updateCar = async (id , car) => {
    const carUpdated = await Car.findByIdAndUpdate(id , car);
    return carUpdated;
}

module.exports = {
    getAllCar,
    createCar,
    getAllCategory,
    getAllSupplier,
    paginate,
    getCarById,
    updateCar
}