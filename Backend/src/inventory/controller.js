import Inventory from "./schema.js";
import inventoryRepo from "./repository.js";
import inventoryService from "./service.js";

import Product from "../products/product-schema.js";
import productRepo from "../products/repository.js";
import productService from "../products/service.js";

const product_repo = new productRepo(Product);
const product_service = new productService(product_repo);

const inventory_repo = new inventoryRepo(Inventory);
const inventory_service = new inventoryService(inventory_repo);

export const createInventory = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        }
        const {product_id, quantity, maximum_stock, minimum_stock} = req.body;
        if(!product_id || !quantity || !maximum_stock || !minimum_stock){
            return res.status(400).json({success:false,message:'Provide all info'});
        };
        const inventory = await inventory_service.addingInventory({product_id, quantity, maximum_stock, minimum_stock});
        if(!inventory){
            return res.status(400).json({success:false,message:'Failed to create new inventory record'})
        };
        return res.status(201).json({success:true,message:'Inventory added'});
    } catch (error) {
        console.error(`Error with creating a new inventory record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
};

export const getInventoryById = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        };
        const inventory_id = req.params;
        if(!inventory_id){
            return res.status(400).json({success:false,message:'Please Provide the Inventory ID'})
        };
        const inventory = await inventory_service.getInventoryById(inventory_id);
        if(!inventory){
            return res.status(400).json({success:false,messsage:'Failed to fetch inventory record by Id'});
        };
        return res.status(200).json({success:true,message:'Fetched Inventory record',data:inventory});
    } catch (error) {
        console.error(`Error with getting inventory record by Id ${error}`);
        return res.status(500).json({success:false, message:'Internal Server Error'});
    }
};

export const getInventoryByProduct = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        };
        const product_name = req.body;
        if(!product_name){
            return res.status(400).json({success:false,message:'Provide product name'});
        };
        const is_product = await product_service.getProdcutByName(product_name);
        if(!is_product){
            return res.status(400).json({success:false,message:'No Product Found, add it'})
        };
        const inventory = await inventory_service.getInventoryByProduct(is_product.id);
        if(!inventory){
            return res.status(400).json({success:false,message:'Failed to fetch inventory record'})
        };
        return res.status(200).json({success:true,message:'Record Fetched',data:inventory})
    } catch (error) {
        console.error(`Error with getting inventory record for a product ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'})
    }
};

export const getAllInventory = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        };
        const inventory = await inventory_service.getAllInnventory();
        if(!inventory){
            return res.status(400).json({success:false,message:'Failed to fetch all inventory records'});
        };
        return res.status(200).json({success:true,message:'Fetched all records',data:inventory})
    } catch (error) {
        console.error(`Error with getting all inventory records ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const updateInventory = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        };
        const {product_id, quantity, maximum_stock, minimum_stock} = req.body;
        if(!product_id || !quantity || !maximum_stock || !minimum_stock){
            return res.status(400).json({success:false,message:'Provide all info'});
        };
        const inventory_id = req.params;
        if(!inventory_id){
            return res.status(400).json({success:false,message:'Please Provide the Inventory ID'})
        };
        const updated_record = await inventory_service.updateInventory(inventory_id, {product_id, quantity, maximum_stock, minimum_stock})
        if(!updated_record){
            return res.status(400).json({success:false,message:'Failed to update record'});
        };
        return res.status(200).json({success:true,message:'Record updated'});
    } catch (error) {
        console.error(`Error with updating inventory records ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const deleteInventory = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        };
        const inventory_id = req.params;
        if(!inventory_id){
            return res.status(400).json({success:false,message:'Please Provide the Inventory ID'})
        };
        const deleted_record = await inventory_service.deleteInventory(inventory_id);
        if(!deleted_record){
            return res.status(400).json({success:false,message:'Failed to delete record'});
        };
        return res.status(200).json({success:true,message:'Record deleted'})
    } catch (error) {
        console.error(`Error with deleting inventory record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    };
};

export const getMinimumStockInventory = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated'});
        };
        const inventory_records = await inventory_service.getMinimumStockedInventory();
        if(inventory_records){
            return res.status(400).json({success:false,message:'Failed to fetch records'});
        };
        return res.status(200).json({success:true,message:'Records Fetched',data:inventory_records})
    } catch (error) {
        console.error(`Error with getting minimum stock inventory records ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

