class inventoryService{
    constructor(repo){
        this.repo  = repo;
    };

    async addingInventory(data){
        try {
            const inventory = await this.repo.addInventory(data);
            if(!inventory){
                throw new Error('Failed to create a new record of inventory');
                return null;
            };
            return inventory;
        } catch (error) {
           console.error(`Error with adding inventory ${error}`);
           return null; 
        }
    };

    async getInventoryById(id){
        try {
            const inventory = await this.repo.getInventoryById(id);
            if(!inventory){
                throw new Error('Failed to fetch inventory by Id');
                return null;
            };
            return inventory;
        } catch (error) {
           console.error(`Error with getting inventory info by id ${error}`);
           return null; 
        }
    };

    async getInventoryByProduct(product_id){
        try {
            const inventory = await this.repo.getInventoryByProductId(product_id);
            if(!inventory){
                throw new Error('Failed to fetch product by Id');
                return null
            };
            return inventory;
        } catch (error) {
            console.error(`Error with getting the inventory info by Id ${error}`);
            return null;
        }
    };

    async getMinimumStockedInventory(){
        try {
            const inventory = await this.repo.getMinimumStockInventory();
            if(!inventory){
                throw new Error('Failed to fetch minimum stock');
                return null;
            };
            return inventory;
        } catch (error) {
            console.error(`Error with getting minimum stock inventory ${error}`);
            return null;
        }
    };

    async getAllInnventory(){
        try {
            const inventory = await this.repo.getAllInventory();
            if(!inventory){
                throw new Error('Failed to fetch all inventory');
                return null;
            };
            return inventory;
        } catch (error) {
            console.error(`Error with getting all the inventory ${error}`);
            return null;
        }
    }

    async updateInventory(id, data){
        try {
            const inventory = await this.repo.updateInventory(id, data);
            if(!inventory){
                throw new Error('Failed to update inventory record');
                return null;
            };
            return inventory;
        } catch (error) {
            console.error(`Error with updating the inventory ${error}`);
            return null;
        }
    };

    async deleteInventory(id){
        try {
            const inventory = await this.repo.deleteInventory(id);
            if(!inventory){
                throw new Error('Failed to delete inventory record');
                return null;
            };
            return inventory
        } catch (error) {
            console.error(`Error with deleting the inventory record ${error}`);
            return null;
        }
    };
}
export default inventoryService