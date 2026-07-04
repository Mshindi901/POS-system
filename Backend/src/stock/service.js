class stockService{
    constructor(repo){
        this.repo = repo
    };

    async createNewRecord(recordData){
        try {
            const newRecord = await this.repo.newRecord(recordData);
            if(!newRecord){
                throw new Error('Failed to create a new record');
                return null;
            };
            return newRecord
        } catch (error) {
            console.error(`Error with creating a new record ${error}`);
            return null;
        }
    };

    async getAllRecords(){
        try {
            const records = await this.repo.getAllRecords();
            if(!records){
                throw new Error('Failed to fetch all records');
                return null;
            };
            return records;
        } catch (error) {
            console.error(`Error with getting all records ${error}`);
            return null;
        }
    };

    async getUserRecords(userId){
        try {
            const records = await this.repo.getRecordsByUserId(userId);
            if(!records){
                throw new Error('Failed to fetch user records');
                return null;
            };
            return records;
        } catch (error) {
            console.error(`Error with getting all the records for a user ${error}`);
            return null;
        }
    };

    async getRecordsById(record_id){
        try {
            const record = await this.repo.getRecordById(record_id);
            if(!record){
                throw new Error('Failed to fetch record by Id');
                return null;
            };
            return record;
        } catch (error) {
            console.error(`Error with getting the reocrd by ID ${error}`);
            return null;
        }
    };

    async updateRecord(id, data){
        try {
            const update_record = await this.repo.updateREcordById(id, data);
            if(!update_record){
                throw new Error('Failed to update the record');
                return null;
            };
            return update_record;
        } catch (error) {
            console.error(`Error with updating the record ${error}`);
            return null;
        }
    };

    async deleteRecord(id){
        try {
            const deleted_record = await this.repo.deleteRecordById(id);
            if(!deleted_record){
                throw new Error('Failed to delete record');
                return null;
            };
            return deleted_record;
        } catch (error) {
            console.error(`Error with deleting the record ${error}`);
            return null;
        }
    };
};

export default stockService;