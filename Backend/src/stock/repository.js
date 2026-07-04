class stockRepository{
    constructor(model){
        this.model = model
    };

    async newRecord(stockData){
        try {
            const newRecord = await this.model.create(stockData);
            return newRecord
        } catch (error) {
            console.error(`Error with creating a new inventory movement record ${error}`);
            return null;
        }
    };

    async getRecordById(recordId){
        try {
            const record = await this.model.findByPk(recordId);
            return record;
        } catch (error) {
            console.error(`Error with getting a record by ID ${error}`);
            return null;
        }
    };

    async getRecordsByUserId(userid){
        try {
            const records = await this.model.findAll({where: {user_id:userid}});
            return records;
        } catch (error) {
            console.error(`Error with getting invontery movement records by userId ${error}`);
            return null;
        }
    };

    async getAllRecords(){
        try {
            const records = await this.model.findAll();
            return records;
        } catch (error) {
            console.error(`Error with geting all reocrds ${error}`);
            return null;
        }
    };

    async updateREcordById(record_id, updateData){
        try {
            const updated_record = await this.model.update(updateData, {where:{id:record_id}});
            return updated_record;
        } catch (error) {
            console.error(`Error with updating record ${error}`);
            return null;
        }
    };

    async deleteRecordById(id){
        try {
            const deleted_record = await this.model.destroy(id);
            return deleted_record;
        } catch (error) {
            console.error(`Error with deleting a record by Id ${error}`);
            return null;
        }
    };
};

export default stockRepository;