<template>
  <div>
    <div class="overlay">
        <form action="" class="form-entry" @submit.prevent.stop="createEntry">
            <div class="close-icon"> <font-awesome-icon @click="closeFormCreate" :icon="['fas', 'xmark']" /> </div>
            <h4 class="text-uppercase">Thêm sản phẩm mới </h4>
            <div :class="{ 'entry-info': true, 'entry-scroll': products.length > 1 }">
                <div v-for="(product,index) in products" :key="index" class="row">
                    <div class="form-G col-4">
                        <label for="">Tên sản phẩm</label>
                        <select v-model="product.idProduct" required>
                            <option value="">---Chọn tên sản phẩm</option>
                            <option v-for="item in productsId" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="form-G col-4">
                        <label for="">Số lượng</label>
                        <input v-model="product.quantityImport" name="quantity" type="number" placeholder="Số lượng nhập" required min="0">
                    </div>
                    <div class="form-G col-4">
                        <label for="">Giá nhập</label>
                        <input v-model="product.priceImport" name="price" type="number" placeholder="Giá" required min="0">
                    </div>
                </div>
            </div>
            <div class="mt-3"> 
                <span class="btn btn-danger me-3" @click="removeinput">Bớt dòng</span>
                <span class="btn btn-warning" @click="addinput">Thêm dòng</span>
            </div>
            <button class="btn btn-success w-100 mt-3">Thêm mới</button>
        </form>
      </div>
  </div>
</template>

<script>
import productService from '@/service/product.service'
import entryReceiptService from '@/service/entryReceipt.service'
export default {
    data(){
        return{
            products:[{idProduct:''}],
            productsId:[]
        }
    },
    emits:['closeFrom'],
    methods:{
        async getAllProduct(){
            try {
                const response = await productService.getAll()
                this.productsId=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        addinput() {
            this.products.push({ idProduct: ''});
        },
        removeinput() {
            if (this.products.length > 1) {
                this.products.pop();
            }
        },
        async createEntry(){
            try {
                const user = JSON.parse(sessionStorage.getItem('auth'))
                let totalAmout=0
                this.products.forEach(item =>{totalAmout+=item.priceImport*item.quantityImport} )
                const data={
                    createBy:user.id,
                    totalAmout,
                    products:this.products
                }
                const response = await entryReceiptService.create(data)
                if(response.data.status){
                    alert(response.data.message)
                    this.products=[{idProduct:''}]
                }
                else{
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        closeFormCreate(){
            this.products=[{idProduct:''}]
            this.$emit('closeFrom')
        }
    },
    mounted(){
        this.getAllProduct()
    }
}
</script>

<style>
.form-entry{
        width: 1000px;
        min-height: 0px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        padding: 50px;
}
.entry-info{
    max-height: 200px;
    min-height: 200px;
    width: 100%;
}
.entry-scroll{
    overflow-y: scroll;
    scroll-behavior: smooth;
    overflow-x: hidden;
    padding-right: 10px;
}
</style>