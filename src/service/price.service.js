import createApiClient from "./config.service";

class priceService{
    constructor(baseUrl='http://localhost:5000/price'){
        this.api = createApiClient(baseUrl)
    }

    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(){
        return await this.api.get('/')
    }
    async getPriceByidProduct(idProduct,typePrice){
        return await this.api.get(`/product/?idProduct=${idProduct}&typePrice=${typePrice}`)
    }
    async getPricesProduct(idProduct,typePrice){
        return await this.api.get(`/find/?idProduct=${idProduct}&typePrice=${typePrice}`)
    }

}

export default new priceService();