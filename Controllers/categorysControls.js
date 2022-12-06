const Category = require('../Models/CategoryModel');
const subCategory = require('../Models/SubCategoryModel');
const factory = require('./factoryHandller');

exports.craeteCategory= factory.craeteModel(Category);
exports.getAllCategory= factory.findAllModels(Category);
exports.updateCategory= factory.findModelByIdAndUpdate(Category);
exports.deleteCategory= factory.deleteModelById(Category);

exports.craeteSubCategory= factory.craeteModel(subCategory);
exports.getAllSubCategory= factory.findAllModels(subCategory);
exports.updateSubCategory= factory.findModelByIdAndUpdate(subCategory);
exports.deleteSubCategory= factory.deleteModelById(subCategory);