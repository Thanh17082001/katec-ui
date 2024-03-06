<template>
  <div class="overlay">
    <form action="" class="form" @submit.prevent.stop="updateProduct">
        <div class="close-icon"> <font-awesome-icon @click="closeFormEdit" :icon="['fas', 'xmark']" /> </div>
        <h4 class="text-uppercase">Sửa thông tin</h4>
        <div class="form-G">
            <label for="">Tên sản phẩm</label>
            <input v-model="infoProduct.name" name="fullname" type="text" placeholder="Tên" required>
        </div>
        <div class="form-G">
            <label for="">Link hình ảnh</label>
            <input v-model="infoProduct.image" name="username" type="text" placeholder="Hình ảnh" required>
        </div>

        <div class="form-G">
            <label for="">Giá bán</label>
            <input v-model="infoProduct.price" name="price" type="text" placeholder="Giá bán sản phẩm" required>
        </div>
        <button class="btn btn-success w-100 mt-3">Thay đổi</button>
    </form>
  </div>
</template>

<script>
import productService from '@/service/product.service'
import priceService from '@/service/price.service'
export default {
    data(){
        return{
            infoProduct:{
                
            },
            user:{}
        }
    },
    emits:['closeFromEdit'],
    props:{
        id:Number
    },
    methods:{
        
        async updateProduct(){
            try {
                if(this.infoProduct.price==0){
                    this.infoProduct.price=undefined
                }
                const res = await productService.update(this.id,this.infoProduct)
                const price = await priceService.getPriceByidProduct(this.id,'Ban')
                if(res.data.status){
                    alert(res.data.message)
                    this.infoProduct={
                       ...res.data.data,
                       price:price.data?.price || 0
                    }
                }
                else{
                    this.infoProduct.price=price.data?.price || 0
                    alert(res.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getById(){
            try {
                const response = await productService.getByid(this.id)
                const price = await priceService.getPriceByidProduct(this.id,'Ban')
                console.log(price);
                this.infoProduct={
                    name:response.data[0].name,
                    image:response.data[0].image,
                    price:price.data?.price || 0
                }
                console.log(this.infoProduct);
            } catch (error) {
                console.log(error);
            }
        },
        closeFormEdit(){
            this.infoProduct={
                quantityImport:0,
                quantitySale:0
            }
            this.$emit('closeFromEdit')
        },
    },
    mounted(){
        this.getById()
    }
   }
</script>

<style>
    .form{
        width: 500px;
        min-height: 0px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        padding: 50px;
    }
    .close-icon{
        position: absolute;
        top: 10px;
        right: 30px;
        font-size: 30px;
        color: red;
        cursor: pointer;
    }
    .form-G{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
    }
    .form-G input, .form-G select{
        width: 100%;
        outline: none;
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 5px;
    }
    .form-G option{
        border-radius: 0;
    }
    .form-G input:focus{
        border-color: #111;
    }
</style>