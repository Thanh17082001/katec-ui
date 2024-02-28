<template>
  <div class="container mt-3">
    <div class="row">
        <div class="col-lg-3" v-for="product in products" :key="product.id">
            <div class="product">
                <img :src="product.image" alt="">
                <div class="info-product">
                <span class="mt-3">{{ product.name }}</span>
                <button class="btn btn-info text-white text-uppercase" @click="openOrder(product)">Mua ngay</button>
            </div>
        </div>
        </div>
    </div>
  </div>
  <orderUserVue :product="productOrder" v-if="activeOrder" @cancel="cancel"></orderUserVue>
</template>

<script>
import productService from '@/service/product.service';
import orderUserVue from '@/components/order/orderUser.vue';
// import orderService from '@/service/order.service'
export default {
    components:{
        orderUserVue
    },
    data(){
        return{
            products:[],
            productOrder:{},
            activeOrder:false
        }
    },
    methods:{
        async order(){
            // await orderService.getAll()
            this.$socket.emit('order'); 
        },
        async getAllProduct(){
            try {
                const resposse = await productService.getAll()
                resposse.data.forEach(item => {
                    if(item.quantityImport>0){
                        this.products.push(item)
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
        openOrder(product){
            this.productOrder=product
            this.activeOrder=true
        },
        cancel(){
            this.activeOrder=false
            this.productOrder={}
        }   

    },
    mounted(){
        this.getAllProduct()
    }
    
}
</script>

<style>
 .product{
    width: 100%;
    height: 500px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
 }
 .product img{
    height: 80%;
    width: 100%;
 }
 .product .info-product{
    height: 20%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 }
 
</style>