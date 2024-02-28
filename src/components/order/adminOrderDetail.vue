<template>
  <div class="overlay">
    <div class="order-detail">
        <div class="close-icon"> <font-awesome-icon @click="closeFormDeatail" :icon="['fas', 'xmark']" /> </div>
        <h2 class="text-uppercase">Chi tiết đơn hàng</h2>
        <div class="row">
            <div class="col-6 text-start">
                <h4 class="text-uppercase text-info">THông tin khách hàng</h4>
                <div class="text-start">
                    <span>Họ và tên: </span>
                    <span>{{ order?.customer }}</span>
                </div>
                <div class="text-start">
                    <span>Số điện thoại: </span>
                    <span>{{ order?.phone }}</span>
                </div>
                <div class="text-start">
                    <span>Địa chỉ: </span>
                    <span>{{ order?.address }}</span>
                </div>
            </div>
            <div class="col-6 text-start">
                <h4 class="text-uppercase text-info">THông đơn hàng</h4>
                <div class="text-start">
                    <span>Mã đơn hàng: </span>
                    <span>{{ order?.id }}</span>
                </div>
                <div class="text-start">
                    <span>Được tạo bởi: </span>
                    <span>{{ order?.createBy?.fullName || 'Mua online' }}</span>
                </div>
                <div class="text-start">
                    <span>Ngày đặt hàng: </span>
                    <span>{{ order?.order_date }}</span>
                </div>
            </div>
        </div>
        <div>
            <h4 class="text-uppercase mt-3">Trạng thái đơn hàng</h4>
            <div class="progress mt-3">
                <div class="progress-bar" role="progressbar" :style="{width: width}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ order?.status }}</div>
            </div>
            <button class="btn btn-info mt-3" @click="updateStatus(order?.status)" :disabled="order?.status =='Đã giao'">Cập nhật</button>
        </div>

        <div>
            <h4 class="text-uppercase mt-3">Sản phẩm đã mua</h4>
            <table v-if="order?.products?.length>0" class="table table-striped table-bordered text-start">
                <thead>
                  <tr>
                    <th class="col-1">STT</th>
                    <th class="col">tên sản phẩm</th>
                    <th class="col">Giá bán</th>
                    <th class="col">Số lượng</th>
                    <th class="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in order.products" :key="product.id">
                    <td class="col-1">{{index+1}}</td>
                    <td class="col">{{ product?.name  }}</td>
                    <td class="col">{{ product?.price }}</td>
                    <td class="col">{{ product?.quantity }}</td>
                    <td class="col">{{ product?.quantity * product?.price}}</td>
                  </tr>
                </tbody>
              </table>
        </div>
          <div class="text-start">
            <span>Tổng tiền: {{ order?.totalAmount }}</span>
          </div>
    </div>
  </div>
</template>

<script>
import orderService from '@/service/order.service';
export default {
    data(){
        return{
            order:{},
            width:'25%',
        }
    },
    emits:['closeFormDeatail'],
    props:{
        id:Number
    },
    methods:{
        async getOrderById(){
            try {
                const response = await orderService.getByid(this.id)
                this.order = response.data
                console.log(this.order)
                this.order.order_date = this.formatDate(this.order.order_date)
                if(this.order.status == 'Đã đóng gói'){
                    this.width='50%'
                }
                else if(this.order.status == 'Đang vận chuyển'){
                    this.width='75%'
                }
                else if(this.order.status == 'Đã giao'){
                    this.width='100%'
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateStatus(status){
            try {
                let newStatus
                if(status=='Đang xử lý'){
                    newStatus='Đã đóng gói'
                }
                else if(status == 'Đã đóng gói'){
                    newStatus='Đang vận chuyển'
                }
                else if(status == 'Đang vận chuyển'){
                    newStatus='Đã giao'
                }
                
                const response = await orderService.update(this.id, {status:newStatus})
                if(response.data.status){
                    await this.getOrderById()
                    alert('cập nhật thành công')
                }
            } catch (error) {
                console.log(error);
            }
        },
        formatDate( dateString){
            const date = new Date(dateString);
            const utcDate = new Date(date.toISOString('en-US', { timeZone: 'UTC',setZone:'Asia/Ho_Chi_Minh' }));
            return new Intl.DateTimeFormat('default', { dateStyle: 'medium' }).format(utcDate);
        },
        closeFormDeatail(){
            this.$emit('closeFormDeatail')
        }
    },
    mounted(){
        this.getOrderById()
    }
}
</script>

<style scoped>
    .order-detail{
        position: relative;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        background: #fff;
        width: 1000px;
        height: 600px;
        padding: 20px 50px;
    }
</style>