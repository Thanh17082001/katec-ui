import createApiClient from "./config.service";

class orderService{
    constructor(baseUrl='http://localhost:5000/order'){
        this.api = createApiClient(baseUrl)
    }

    async create(data){
        return await this.api.post('/create',data)
    }
    async update(id,data){
        return await this.api.post(`/update/?id=${id}`,data)
    }
    async getAll(){
        return await this.api.get('/')
    }
    async getByid(id){
        return await this.api.get(`/id/?id=${id}`)
    }
    async getByCreateBy(idUser){
        return await this.api.get(`/id-user/?idUser=${idUser}`)
    }

}

export default new orderService();