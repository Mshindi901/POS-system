class productRepo {
    constructor(productModel, unitModel){
        this.productModel = productModel;
        this.unitModel = unitModel
    };

    //UNIT CRUD operations start from here
    async newUnit(unitData){
        try {
            const unit = await this.unitModel.create(unitData);
            return unit
        } catch (error) {
            console.error(`Error with creating new unit ${error}`);
            return null;
        }
    };

    async getUnitByName(name){
        try {
            const unit = await this.unitModel.findOne({where: {name}});
            return unit;
        } catch (error) {
            console.error(`Error with getting a unit by name: ${error}`);
            return null;
        }
    };

    async getAllUnits(){
        try {
            const units = await this.unitModel.findAll();
            return units;
        } catch (error) {
            console.error(`Error with getting all units ${error}`);
            return null;
        }
    };

    async getUnitById(id){
        try {
            const unit =  await this.unitModel.findByPk(id);
            return unit;
        } catch (error) {
            console.error(`Error with getting the unit by Id ${error}`);
            return null;
        }
    };

    async updateUnit(id, updatedData){
        try {
            const updatedUnit = await this.unitModel.update(updatedData, {where: {id}});
            return updatedUnit;
        } catch(error){
            console.error(`Error with updating unit record: ${error}`);
            return null;
        }
    };

    async deleteUnit(id){
        try {
            const deleted = await this.unitModel.destroy(id);
            return deleted;
        } catch (error) {
            console.error(`Error with deleting unit: ${error}`);
            return null;
        }
    };

    //Product CRUD operations, From here

    async createProduct(productData){
        try {
            const product = await this.productModel.create(productData);
            return product;
        } catch(error) {
            console.error(`Error with creating new product record: ${error}`);
            return null;
        }
    };

    async getAllProducts(){
        try {
            const products = await this.productModel.findAll();
            return products;
        } catch (error) {
            console.error(`Error with getting all products ${error}`);
            return null;
        }
    };

    async getProductById(id){
        try {
            const product =  await this.productModel.findByPk(id);
            return product;
        } catch (error) {
            console.error(`Error with getting the product by Id ${error}`);
            return null;
        }
    };
    async getActiveProducts(){
        try {
            const products = await this.productModel.findAll({where:{is_active: true}});
            return products;
        } catch (error) {
            console.error(`Error with getting active products ${error}`);
            return null;
        }
    };
    async getInActiveProducts(){
        try {
            const products = await this.productModel.findAll({where:{is_active: false}});
            return products;
        } catch (error) {
            console.error(`Error with getting inactive products ${error}`);
            return null;
        }
    };
    async getProductByUnit(unit_id){
        try {
            const products = await this.productModel.findAll({where: {unit_id}});
            return products
        } catch (error) {
            console.error(`Error with fetching a product by unit ${error}`);
            return null
        }
    };

    async getProductByBarcode(barcode){
        try {
            const product = await this.productModel.findOne({where: {barcode}});
            return null
        } catch (error) {
            console.error(`Error with getting product by barcode ${error}`);
            return null;
        }
    };

    async getProductByName(name){
        try {
            const product = await this.productModel.findOne({where:{name}});
            return product;
        } catch (error) {
            console.error(`Error with getting product by name ${error}`);
            return null;
        }
    };
    async getProductsByUnitId(unitid){
        try {
            const products = await this.productModel.findAll({where:{unit_id:unitid}});
            return products;
        } catch (error) {
            console.error(`Error with getting products by unit id ${error}`);
            return null;
        }
    };
    async updateProduct(id, updatedData){
        try {
            const product = await this.productModel.update(updatedData, {where:{id}, returning:true});
            return product;
        } catch (error) {
            console.error(`Error with updating product ${error}`);
            return null;
        }
    };
    async deleteProduct(id){
        try {
            const deleted_product = await this.productModel.destroy(id);
            return deleted_product;
        } catch (error) {
            console.error(`Error with deleting product ${error}`)
        }
    }

};

export default productRepo;