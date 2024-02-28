<template>
    <div class="overlay">
        <form action="" class="form-order" @submit.prevent.stop="createOrder">
            <h4 class="text-uppercase text-info">Thông tin đơn hàng</h4>
            <div class="order-product">
                <img :src="product?.image" alt="">
                <div class="info">
                    <span>{{product?.name}}</span>
    <div class="info-price">
                        <span class="fs-5">{{ product?.priceSale }}</span>
                        <span class="ms-2">x</span>
                        <input type="number" v-model="order.quantity" name="" id="" placeholder="Số lượng" required min="1" @input="validate(order.quantity)">
                    </div>
                    <span class="text-danger text-italic mt-2" v-if="mes">{{mes}}</span>
                    <span class="mt-3">Tổng cộng: {{totalAmount}}</span>
                </div>
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
            <div class="mt-3">
                <div class="btn btn-danger me-2" @click="cancel">Hủy bỏ</div>
                <button class="btn btn-success">Đặt hàng</button>
            </div>
        </form>
      </div>
</template>

<script>
import orderService from '@/service/order.service'
// import productService from '@/service/product.service';
// import priceService from '@/service/price.service';
export default {
    data(){
        return{
            order:{quantity:1},
            mes:'',
            totalAmount:0,
            user:{}
        }
    },
    props:{
        product:{},
        
    },
    emits:['cancel'],
    methods:{
        validate(quantity){
            this.mes=''
            if(quantity> this.product.quantityImport){
                this.mes='Số lượng sản phẩm không đủ'
                this.totalAmount=0
            }
            if(quantity==''){
                this.mes='Nhập vào số lượng'
                this.totalAmount=0
            }
            else{
                this.totalAmount= quantity*this.product.priceSale
            }
        },
        cancel(){
            this.$emit('cancel')
        },
        async createOrder(){
            try {
                const data={
                    ...this.user,
                    totalAmount:this.totalAmount,
                    products:[
                        {
                            ...this.product,
                            quantity:this.order.quantity,
                        }
                    ]
                }
                if(this.totalAmount>0 && !this.mes){
                    const response = await orderService.create(data)
                    if(response.data.status){
                        this.user={}
                        this.quantity=1
                        alert(response.data.message)
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
        this.totalAmount=this.product.priceSale*1
    }
}
</script>

<style scoped>
.form-order{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 640px;
    background: #fff;
    padding: 50px;
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