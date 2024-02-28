<template>
    <div class="overlay">
        <form action="" class="form-order" @submit.prevent.stop="createOrder">
            <div class="close-icon"> <font-awesome-icon @click="cancel" :icon="['fas', 'xmark']" /> </div>
            <h4 class="text-uppercase text-info">Tạo đơn hàng</h4>
            <div :class="{ 'entry-info': true, 'entry-scroll': products.length > 1 }">
                <div v-for="(product,index) in products" :key="index" class="row">
                    <div class="form-G col-4">
                        <label for="">Tên sản phẩm</label>
                        <select v-model="product.id" required @change="seclectProduct(product.id, index)">
                            <option value="">---Chọn tên sản phẩm</option>
                            <option v-for="item in productInfo" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="form-G col-4">
                        <label for="">Số lượng</label>
                        <input v-model="product.quantity" name="quantity" type="number" placeholder="Số lượng nhập" required min="1" @input="validate(product.quantity, product, index)">
                        <span class="text-danger" v-if="mes && indexMes==index">{{ mes }}</span>
                    </div>
                    <div class="form-G col-4">
                        <label for="">Giá</label>
                        <input v-model="product.priceSale" name="price" type="number" placeholder="Giá" required min="0">
                    </div>
                </div>
            </div>
            <div class="mt-1"> 
                <span class="btn btn-danger me-3" @click="removeinput">Bớt dòng</span>
                <span class="btn btn-warning" @click="addinput">Thêm dòng</span>
                <span class="d-flex justify-content-end">Thành tiền: {{ totalAmount }}</span>
            </div>
            <div class="order-info-user">
                <h5 class="text-uppercase text-start mt-3 ">Thông tin người nhận</h5>
                <div class="form-G">
                    <label for="">Họ và tên</label>
                    <input v-model="user.customer" name="fullname" type="text" placeholder="Tên" required>
                </div>
                <div class="form-G">
                    <label for="">Số điện thoại</label>
                    <input v-model="user.phone" name="phone" type="text" placeholder="Số điện thoại" required>
                </div>
                <div class="form-G">
                    <label for="">Địa chỉ</label>
                    <input v-model="user.address" name="address" type="text" placeholder="Địa chỉ" required>
                </div>
            </div>
            <div class="mt-2">
                <button class="btn btn-success">Đặt hàng</button>
            </div>
        </form>
      </div>
</template>

<script>
import orderService from '@/service/order.service'
import productService from '@/service/product.service';
export default {
    data(){
        return{
            mes:'',
            indexMes:'',
            totalAmount:0,
            user:{},
            products:[{id:''}],
            productInfo:[]
        }
    },
    emits:['cancel'],
    methods:{
        addinput() {
            this.products.push({ id: ''});
        },
        removeinput() {
            if (this.products.length > 1) {
                this.products.pop();
            }
        },
        async getAllProduct(){
            try {
                const response = await productService.getAll()

                response.data.forEach(item =>{
                    if(item.quantityImport>0){
                        this.productInfo.push(item)
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
        validate(quantity, product, index){
            this.mes=''
            this.totalAmount=0
            if(quantity> product.quantityImport){
                this.mes='Thiếu số lượng hàng'
                this.totalAmount=0
                this.indexMes=index
            }
            if(quantity==''){
                this.mes='Nhập vào số lượng'
                this.totalAmount=0
                this.indexMes=index
            }
            else{
                this.products.forEach(item => {
                    this.totalAmount+=item.price*item.quantity
                })
            }
            
        },
        seclectProduct(id,index){
            this.totalAmount=0
            this.productInfo.forEach(item =>{
                if(item.id==id){
                    this.products[index]  ={
                        ...item,
                        price:item.priceSale,
                        quantity:1
                    }
                }
            })
            this.products.forEach(item => {
                this.totalAmount+=item.price*item.quantity
            })
        },
        cancel(){
            this.$emit('cancel')
        },
        async createOrder(){
            try {
                const user = JSON.parse(sessionStorage.getItem('auth'))
                const data={
                    createBy:user.id,
                    ...this.user,
                    totalAmount:this.totalAmount,
                    products:this.products
                }
                if(this.totalAmount>0&& !this.mes){
                    const response = await orderService.create(data)
                    if(response.data.status){
                        alert(response.data.message)
                        this.user={}
                        this.products=[{ id: ''}];
                        this.$socket.emit('order', response.data.idOrder)
                    }
                    else{
                        alert(response.data.message)
                    }
                }
                else{
                    alert('Số lượng chưa hợp lệ')
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.getAllProduct()
    }
}
</script>

<style scoped>
.form-order{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 750px;
    height: 680px;
    background: #fff;
    padding:10px 50px 0 50px;
}
.order-product{
    display: flex;
    text-align: left;
}
.order-product img{
    width: 150px;
    height: 150px;
    margin-right: 20px;
}

.order-product .info{
    display: flex;
    flex-direction: column;
}
.info span:nth-child(1){
    text-transform: capitalize;
    font-size: 20px;
    margin-bottom: 15px;
}
.info input{
    outline: none;
    border: 1px solid #111;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
}

</style>