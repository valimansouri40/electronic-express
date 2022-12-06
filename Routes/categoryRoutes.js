const express = require('express');
const Category = require('../Controllers/categorysControls');
const { Protected, ResterictTo } = require('../Controllers/UserControls');
const categoryRouter = express.Router();


categoryRouter.route('/category').post(Protected,Category.craeteCategory)
.get(Category.getAllCategory);

categoryRouter.route('/subcategory').post(Protected,Category.craeteCategory)
.get(Category.getAllCategory);


categoryRouter.use(Protected, ResterictTo('admin'));

categoryRouter.route('/category/:id').patch(Category.updateCategory)
.delete(Category.deleteCategory);

categoryRouter.route('/subcategory/:id').patch(Category.updateSubCategory)
.delete(Category.deleteSubCategory);

module.exports = categoryRouter;