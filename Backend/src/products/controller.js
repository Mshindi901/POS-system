import Product from "./product-schema.js";
import Unit from "./unit-schema.js";
import productRepo from "./repository.js";
import productService from "./service.js";

const product_repo = new productRepo(Product, Unit);
const product_service = new productService(product_repo);

export const addProduct = async(req, res) => {
    try {
        const {unit_id, sku, barcode, name, description, buying_price, selling_price, tax_id, image_path} = req.body;
        if(!unit_id || !name || !buying_price || !selling_price || !image_path){
            return res.status(400).json({success:false,message: 'Provide all the necessary info'});
        };
        const newProduct = await product_service.createProduct({unit_id, sku, barcode, name, description, buying_price, selling_price, tax_id, image_path});
        if(!newProduct){
            return res.status(400).json({success:false,message:'Failed to add product'})
        };
        return res.status(201).json({success:true,message:'Added Product'});
    } catch (error) {
        console.error(`Error with adding a new_Product ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'})
    }
};

export const getProductByName = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const name = req.body;
        if(!name){
            return res.status(400).json({success:false,message:'Provide product name'})
        };
        const product = await product_service.getProdcutByName(name);
        if(!product){
            return res.status(200).json({success:true,message:'Fetched Product',data:product});
        }
    } catch (error) {
        console.error(`Error with searching a product by name ${error}`);
        return null;
    }
};

export const getProductById = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const product_id = req.params;
        if(!product_id){
            return res.status(400).json({success:false,message:'Provide Product ID'})
        };
        const product = await product_service.getProductById(product_id);
        if(!product){
            return res.status(400).json({success:false,message:'Failed to fetch product'})
        };
        return res.status(200).json({success:true,message:'Fetched Product',data:product})
    } catch (error) {
        console.error(`Error with getting a product by Id ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
};

export const updateProduct = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const {unit_id, sku, barcode, name, description, buying_price, selling_price, tax_id, image_path} = req.body;
        if(!unit_id || !name || !buying_price || !selling_price || !image_path){
            return res.status(400).json({success:false,message: 'Provide all the necessary info'});
        };
        const product_id = req.params;
        if(!product_id){
            return res.status(400).json({success:false,message:'Provide Product ID'})
        };
        const update = await product_service.updateProduct(product_id, {unit_id, sku, barcode, name, description, buying_price, selling_price, tax_id, image_path});
        if(!update){
            return res.status(400).json({success:false,message:'Failed to update the product'})
        };
        return res.status(200).json({success:true,message:'Product detail updated'});
    } catch (error) {
        console.error(`Error with updating the product ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
};

export const deleteProduct = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const product_id = req.params;
        if(!product_id){
            return res.status(400).json({success:false,message:'Provide Product ID'})
        };
        const deleted = await product_service.deleteProduct(product_id);
        if(!deleted){
            return res.status(400).json({success:false,message:'Failed to delete Product'});
        };
        return res.status(200).json({success:true,message:'Product deleted'})
    } catch (error) {
        console.error(`Error with deleting the product ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const getALlProducts = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const products = await product_service.getALlproducts();
        if(!products){
            return res.status(400).json({success:false,message:'Failed to fetch all products'});
        };
        return res.status(200).json({success:true,message:'Products Found',data:products});
    } catch (error) {
        console.error(`Error with fetching all product records ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const filterByUnitName = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const unit_name = req.body;
        if(!unit_name){
            return res.status(400).json({success:false,message:'Provide the units name'});
        };
        const products = await product_service.categorizeProductByUnit(unit_name);
        if(!products){
            return res.status(400).json({success:false,message:'Failed to fetch products by unit'});
        };
        return res.status(200).json({success:true,message:'Fetched Products',data:products});
    } catch (error) {
        console.error(`Error with filtering product by unit namem ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

export const newUnit = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const {name, symbol} = req.body;
        if(!name){
            return res.status(400).json({success:false,message:'Provide the name for the unit'});
        };
        const unit = await product_service.createUnit({name, symbol});
        if(!unit){
            return res.status(400).json({success:false,message:'Failed To create new unit'});
        };
        return res.status(201).json({success:true,message:'Unit created'});
    } catch (error) {
        console.error(`Error with creating a new unit record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const getAllUnits = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const units = await product_service.getAllUnits();
        if(!units){
            return res.status(400).json({success:false,message:'API failed or No Units yet'});
        };
        return res.status(200).json({success:true,message:'Units Fetched',data:units});
    } catch (error) {
        console.error(`Error with getting all unit records ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const updateUnit = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const {name, symbol} = req.body;
        if(!name){
            return res.status(400).json({success:false,message:'Provide the name for the unit'});
        };
        const unit_id = req.params;
        if(!unit_id){
            return res.status(400).json({success:false,message:'Provide unit id'});
        };
        const update_unit = await product_service.updateUnit(unit_id, {name, symbol});
        if(!update_unit){
            return res.status(400).json({success: false,message:'Failed to update unit details'});
        };
        return res.status(200).json({success:true,message:'Unit Info updated'});
    } catch (error) {
        console.error(`Error with updating unit record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const deletedUnit = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please login'});
        };
        const unit_id = req.params;
        if(!unit_id){
            return res.status(400).json({success:false,message:'Provide unit id'});
        };
        const delete_unit = await product_service.deleteUnit(unit_id);
        if(!delete_unit){
            return res.status(400).json({success:false,message:'Failed to delete unit'});
        };
        return res.status(200).json({success:true,message:'Unit deleted'})
    } catch (error) {
        console.error(`Error with deleting unit ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};
