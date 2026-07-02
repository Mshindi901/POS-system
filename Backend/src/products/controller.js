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
        const newProduct = await product_service.createProduct(req.body);
        if(!newProduct){
            return res.status(400).json({success:false,message:'Failed to add product'})
        };
        return res.status(201).json({success:true,message:'Added Product'});
    } catch (error) {
        console.error(`Error with adding a new_Product ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'})
    }
};

export const getProductByName = async(req, res) => {};

export const getProductById = async(req, res) => {};

export const updateProduct = async(req, res) => {};

export const deleteProduct = async(req, res) => {};