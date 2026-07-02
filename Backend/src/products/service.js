class productService{
    constructor(repo){
        this.repo = repo
    };

    async createProduct(unitName, productData){
        try {
            const isUnit = await this.repo.etUnitByName(unitName);
            if(!isUnit){
                throw new Error('Unit given not saved, save unit.');
                return null;
            };
            const newProduct = await this.repo.createProduct({...productData, unit_id:isUnit.id});
            if(!newProduct){
                throw new Error('Failed to create a new product');
                return null;
            };
            return newProduct;
        } catch (error) {
            console.error(`Error with creating product ${error}`);
            return null;
        }
    };

    async createUnit(unitdata){
        try {
            const newUnit = await this.repo.newUnit(unitdata);
            if(!newUnit){
                throw new Error('Failed to create unit');
                return null
            };
            return newUnit;
        } catch (error) {
            console.error(`Error with creating a unit ${error}`);
            return null;
        }
    };

    async getProdcutByName(name){
        try {
            const product = await this.repo.getProductByName(name);
            if(!product){
                throw new Error('failed to fetch the product by name');
                return null;
            };
            return product;
        } catch (error) {
            console.error(`Error with getting the prodcut by name ${error}`);
            return null;
        }
    };

    async getProductByBarcode(barcode){
        try {
            const product = await this.repo.getProductByBarcode(barcode);
            if(!product){
                throw new Error('Failed to fetch the product by barcode');
                return null;
            };
            return product;
        } catch (error) {
            console.error(`Error with getting the product by barcode ${error}`);
            return null;
        }
    };

    async getProductById(id){
        try {
            const product = await this.repo.getProductById(id);
            if(!product){
                throw new Error('Failed to fetch product by Id');
                return null;
            };
            return product;
        } catch (error) {
            console.error(`Error with getting the product by Id ${error}`);
            return null;
        }
    };

    async updateProduct(id, productData){
        try {
            const product = await this.repo.updateProduct(id, productData);
            if(!product){
                throw new Error('Failed to update the product');
                return null;
            };
            return product;
        } catch (error) {
            console.error(`Error with updating the product ${error}`);
            return null
        }
    };

    async updateUnit(id, unitData){
        try {
            const unit = await this.repo.updateUnit(id, unitData);
            if(!unit){
                throw new Error('Failed to update the unit info');
                return null;
            };
            return unit;
        } catch (error) {
            console.error(`Error with updating the unit info ${error}`);
            return null;
        }
    };

    async getALlproducts(){
        try {
            const products = await this.repo.getAllProducts();
            if(!products){
                throw new Error('No products or API failed to fetch products');
                return null;
            };
            return products;
        } catch (error) {
            console.error(`Error with getting all the procuts ${error}`);
            return null;
        }
    };

    async getAllUnits(){
        try {
            const units = await this.repo.getAllUnits();
            if(!units){
                throw new Error('Failed to fetch units or No units yet');
                return null;
            };
            return units;
        } catch (error) {
            console.error(`Error failed to fetch all units ${error}`);
            return null;
        }
    };

    async deleteProduct(id){
        try {
            const deleted_product = await this.repo.deleteProduct(id);
            if(!deleted_product){
                throw new Error('failed to delete product');
                return null;
            };
            return deleted_product;
        } catch (error) {
            console.error(`Error with deleting the products by Id ${error}`);
            return null;
        }
    };

    async deleteUnit(id){
        try {
            const deleted_unit = await this.repo.deleteUnit(id);
            if(!deleted_unit){
                throw new Error('failed to delete product');
                return null;
            };
            return deleted_unit;
        } catch (error) {
            console.error(`Error with deleting the units by Id ${error}`);
            return null;
        }
    };

    async categorizeProductByUnit(unit_name){
        try {
            const unit = await this.repo.getUnitByName(unit_name);
            if(!unit){
                throw new Error('Failed to find unit of such name');
                return null;
            };
            const products =  await this.role.getProductsByUnitId(unit.id);
            if(!products){
                throw new Error('Failed to get Products of unit');
                return null;
            };
            return products;
        } catch (error) {
            console.error(`Error with getting products of the same unit ${error}`);
            return null;
        }
    };

    async categorizeProductByActive(active){
        try {
            if(active){
                const products = await this.repo.getActiveProducts();
                return products;
            }
            const products = await this.repo.getInActiveProducts();
            return products;
        } catch (error) {
           console.error(`Error with getting product by activenesss ${error}`);
           return null; 
        }
    };
};

export default productService;