const catchAsync = require('../utils/catchAsync');
const { carService } = require('../services');
const httpStatus = require('http-status');
const multer = require('multer');

//get all category
const getAllCategory = catchAsync(async (req, res) => {
    const categories = await carService.getAllCategory();
    res.status(httpStatus.OK).send(categories);
})

//get all supplier
const getAllSupplier = catchAsync(async (req, res) => {
    const suppliers = await carService.getAllSupplier();
    res.status(httpStatus.OK).send(suppliers);
})

const getCar = catchAsync(async (req, res) => {
    const { pageLimit, pageCurrent, supplier, category, searchValue } = req.query;
    const { carList, total } = await carService.paginate(pageLimit, pageCurrent, supplier, category, searchValue);
    res.status(httpStatus.OK).send({ carList, total });
})

const getCarById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const carDetail = await carService.getCarById(id);
    res.status(httpStatus.OK).send(carDetail);
})

const DIR = 'public';


let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, DIR);
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    },
  });

const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    } else{
        callback(new Error('only Image Allowed...'));
    }
}

const upload = multer({storage: storage, fileFilter: isImage});

const uploadThumnail = upload.single('thumnail');

const uploadUpdate = upload.fields([{ name: 'thumnail', maxCount: 1 }, { name: 'gallery', maxCount: 4 }]);

const testUpload = async (req, res) => {
    console.log(req.file);
    res.json({
        success: 'success'
    })
}

const createCar = catchAsync(async (req, res) => {
      const url = req.protocol + '://' + req.get('host');
      console.log(req.body);
      console.log(req.file);
        const car = {
            name: req.body.name,
            category: req.body.category,
            supplier: req.body.supplier,
            cost: req.body.cost,
            thumnail: url + '/' + req.file?.filename,
            description: req.body.description,
            gallery: [],
        }
        const returnCar = await carService.createCar(car);
        res.send(returnCar).status(httpStatus.CREATED);
})

module.exports = {
    getCar,
    createCar,
    getAllCategory,
    getAllSupplier,
    getCarById,
    uploadThumnail,
    testUpload,
}