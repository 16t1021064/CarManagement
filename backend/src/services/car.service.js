const { Car } = require('../models');
const ApiError = require('../utils/ApiError');

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

const getAllRelate = async (cate) => {
    console.log(cate);
    if (cate !== '*') {
        const categories = await Car.find({}).distinct('category');
        const suppliers = await Car.find({}).where('category', cate).distinct('supplier');
        if (!categories || !suppliers)
            throw ApiError(500, 'category khong ton tai!');
        return { categories, suppliers };
    }
    const categories = await Car.find({}).distinct('category');
    const suppliers = await Car.find({}).distinct('supplier');
    if (!categories || !suppliers)
        throw ApiError(500, 'category khong ton tai!');
    return { categories, suppliers };
}

// phan trang cho supplier, category, searchvalue
const paginate = async (pageLimit, pageCurrent, supplier, category, searchValue) => {
    let query = Car.find({});
    if (category !== '') {
        query = query.where('category', category);
    }
    if (supplier !== '') {
        query = query.where('supplier', supplier);
    }
    if (searchValue !== '') {
        query = query.where({ 'name': { $regex: '.*' + searchValue + '.*' } });
    }
    const carList = await Car.find(query).select().sort([['createdAt', 'descending']]).limit(parseInt(pageLimit)).skip((parseInt(pageCurrent) - 1) * parseInt(pageLimit));
    const total = await Car.find(query).select().countDocuments();

    return { carList, total };
}

const getCarById = async (id) => {
    const car = await Car.findById(id);
    const { category } = car;
    const relateCar = await Car.find({}).where('category', category).sort([['createdAt', 'descending']]).limit(4);
    const relate = relateCar.filter((car) => car.id !== id);
    if (relate.length === 4) {
        relate.pop();
    }
    if (!car) {
        throw new ApiError(400, "San pham ko ton tai");
    }
    return { car, relate };
}

const updateCar = async (id, car) => {
    const carUpdated = await Car.findByIdAndUpdate(id, car);
    if (!carUpdated) {
        throw new ApiError(500, 'xe khong ton tai!!!');
    }
    return carUpdated;
}

const deleteCar = async (id) => {
    const car = await Car.findByIdAndRemove(id);
    return car;
}

module.exports = {
    getAllCar,
    createCar,
    getAllCategory,
    getAllSupplier,
    paginate,
    getCarById,
    updateCar,
    deleteCar,
    getAllRelate,
}