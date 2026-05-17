class Service {
    constructor(repo) {
        this.repo = repo;
    }
    async getAll(query) {
        try {

            let result = await this.repo.getAll({});
            if (query.city) {
                result = await result.filter(h => h.location.city &&
                    h.location.city.trim().toLowerCase() === query.city.trim().toLowerCase());
            }
            if (query.roadName) {
                result = await result.filter(h => h.location.roadName &&
                    h.location.roadName.trim().toLowerCase() === query.roadName.trim().toLowerCase());
            }
            const priorityId = Number(query.priorityId);
            if (priorityId) {
                result = await result.filter(h => h.priorityId == priorityId);
            }
            const statusId = Number(query.statusId);
            if (statusId) {
                result = await result.filter(h => h.statusId == statusId);
            }

            return result;
        }
        catch (error) {
            console.log(error);
            throw Error('error getting the list of data');
        }
    }

    async getById(id) {
        try {
            const item = await this.repo.getById(id);

            if (!item) {
                const error = new Error("item not found")
                error.statusCode = 404;
                throw error;
            }
            return item;
        }
        catch (errors) {
            throw errors
        }
    }

    async update(id,data){
        try{
            const item=await this.repo.update(id,data,{'new':true});
            return item;
        }
           catch (errors) {
            throw errors
        }
    }

    async insert(data){
        try{
            const item = await this.repo.insert(data);
            if(item){
                return item;
            }
            throw new Error('Somthing wrong happend')
        }
        catch(errors){
            throw errors;
        }
    }
}
module.exports = Service;