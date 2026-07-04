import inventoryMovement from "./schema.js";
import stockRepository from "./repository.js";
import stockService from "./service.js";


const stock_repo = new stockRepository(inventoryMovement);
const stock_service = new stockService(stock_repo);

export const addRecord = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please Login'});
        };
        const {product_id, user_id, movement, quantity} = req.body;
        if(!product_id || !user_id || !movement || !quantity){
            return res.status(400).json({success:false,message:'Provide all info'})
        };
        const record = await stock_service.createNewRecord({product_id, user_id, movement, quantity});
        if(!record){
            return res.status(400).json({success:false,message:'Failed to create new record'});
        };
        return res.status(201).json({success:true,message:'Record added'})
    } catch (error) {
        console.error(`Error in adding new Record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const getUserRecords = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please Login'});
        };
        const records = await stock_service.getUserRecords(id);
        if(!records){
            return res.status(400).json({success:false,message:'Failed to fetch user records'});
        };
        return res.status(200).json({success:true,message:'Records Fetched',data:records});
    } catch (error) {
        console.error(`Error with getting records belonging to the user ${error}`);
        return res.status(500).json({success:false,messsage:'Internal Server Error'});
    }
};

export const getAllRecords = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please Login'});
        };
        const records = await stock_service.getAllRecords();
        if(!records){
            return res.status(400).json({success:false,message:'Failed to fetch all records'});
        } ;
        return res.status(200).json({success:true,message:'Records Fetched',data:records});
    } catch (error) {
        console.error(`Error with getting all the records ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const getRecordById = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please Login'});
        };
        const record_id = req.params;
        if(!record_id){
            return res.status(400).json({success:false,message:'Send Record ID'});
        };
        const record = await stock_service.getRecordsById(record_id);
        if(!record){
            return res.status(400).json({success:false,message:'Failed to fetch record by ID'});
        };
        return res.status(200).json({success:true,message:'Fetched Record',data:record});
    } catch (error) {
        console.error(`Error with getting a record by Id ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const updateRecord = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please Login'});
        };
        const record_id = req.params;
        if(!record_id){
            return res.status(400).json({success:false,message:'Send Record ID'});
        };
        const {product_id, user_id, movement, quantity} = req.body;
        if(!product_id || !user_id || !movement || !quantity){
            return res.status(400).json({success:false,message:'Provide all info'})
        };
        const updated_record = await stock_service.updateRecord(record_id, {product_id, user_id, movement, quantity});
        if(!updated_record){
            return res.status(400).json({success:false,message:'Failed to update the record'});
        };
        return res.status(200).json({success:true,message:'Record updated'})
    } catch (error) {
        console.error(`Error with updating record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({success:false,message:'Not authenticated, please Login'});
        };
        const record_id = req.params;
        if(!record_id){
            return res.status(400).json({success:false,message:'Send Record ID'});
        };
        const deleted_record = await stock_service.deleteRecord(record_id);
        if(!deleted_record){
            return res.status(400).json({success:false,message:'Failed to delete record'});
        };
        return res.status(200).json({success:true,message:'Record deleted'});
    } catch (error) {
        console.error(`Error with deleting a record ${error}`);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
};