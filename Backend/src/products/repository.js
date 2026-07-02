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
}