<template>
  <div class="overlay">
    <form action="" class="form" @submit.prevent.stop="createProduct">
        <div class="close-icon"> <font-awesome-icon @click="closeFormCreate" :icon="['fas', 'xmark']" /> </div>
        <h4 class="text-uppercase">Thêm sản phẩm mới </h4>
        <div class="form-G">
            <label for="">Tên sản phẩm</label>
            <input v-model="infoProduct.name" name="fullname" type="text" placeholder="Tên" required>
        </div>
        <div class="form-G">
            <label for="">Link hình ảnh</label>
            <input v-model="infoProduct.image" name="username" type="text" placeholder="Hình ảnh" required>
        </div>
        <button class="btn btn-success w-100 mt-3">Thêm mới</button>
    </form>
  </div>
</template>

<script>
import productService from '@/service/product.service'
export default {
    data(){
        return{
            infoProduct:{
                quantityImport:0,
                quantitySale:0
            },
            user:{}
        }
    },
    emits:['closeFrom'],
    methods:{
        
        async createProduct(){
            try {
                const res = await productService.create(this.infoProduct)
                if(res.data.status){
                    alert(res.data.message)
                    this.infoProduct={
                        manager:0
                    }
                }
                else{
                    alert(res.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        closeFormCreate(){
            this.infoProduct={
                quantityImport:0,
                quantitySale:0
            }
            this.$emit('closeFrom')
        }
    },
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