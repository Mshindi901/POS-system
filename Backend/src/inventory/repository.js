import { Op, col } from "sequelize";
class inventoryRepo {
    constructor(model){
        this.model = model
    };

    async addInventory(inventoryData){
        try {
            const inventory =  await this.model.create(inventoryData);
            return inventory;
        } catch (error) {
            console.error(`Error with adding new inventory ${error}`);
            return null;
        }
    };

    async getInventoryById(id){
        try {
            const inventory = await this.model.findByPk(id);
            return inventory;
        } catch (error) {
            console.error(`Error with getting inventory by Id ${error}`);
            return null;
        }
    };

    async getInventoryByProductId(id){
        try {
            const product = await this.model.findOne({where:{product_id:id}});
            return product;
        } catch (error) {
            console.error(`Error with getting inventory by a product id ${error}`);
            return null;
        }
    };

    async getAllInventory(){
        try {
            const inventory = await this.model.findAll();
            return inventory; 
        } catch (error) {
            console.error(`Error with getting all the inventory items ${error}`);
            return null;
        }
    };

    async updateInventory(id, inventoryData){
        try {
            const inventory = await this.model.update(inventoryData, {where:{id}});
            return inventory;
        } catch (error) {
           console.error(`Errror with updating inventory info ${error}`);
           return null 
        }
    };

    async deleteInventory(id){
        try {
            const inventory = await this.model.destroy(id);
            return inventory;
        } catch (error) {
            console.error(`Error with deleting the inventory ${error}`);
            return null;
        }
    };

    async getMinimumStockInventory(){
        try {
            const inventory = await this.model.findAll({where: {maximum_stock: {[Op.lt]: col('minimum_stock')}}})
            return inventory;
        } catch (error) {
            console.error(`Error with getting minimum stock inventory ${error}`);
            return null;
        }
    };
};

export default inventoryRepo;