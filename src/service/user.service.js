import createApiClient from "./config.service";

class userService{
    constructor(baseUrl='http://localhost:5000/user'){
        this.api = createApiClient(baseUrl)
    }

    async signIn(data){
        return await this.api.post('/signin',data)
    }

    async signUp(data){
        return await this.api.post('/signup',data)
    }

    async getByManager(manager){
        return await this.api.get(`/find/?manager=${manager}`)
    }

    async getById(id){
        return await this.api.get(`/id/?id=${id}`)
    }

    async update(id,data){
        return await this.api.post(`/update/?id=${id}`,data)
    }
    async getAll(){
        return await this.api.get(`/`)
    }

    async logout(){
        return await this.api.get(`/logout`)
    }
}

export default new userService();