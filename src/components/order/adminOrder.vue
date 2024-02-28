<template>
    <div>
        <h3 class="text-uppercase">quản lý đơn hàng</h3>
        <div class=" text-start mb-3"><button @click="activeCreate=true" class="btn btn-info">Tạo đơn hàng</button></div>
        <table v-if="orders?.length>0" class="table table-striped table-bordered text-start">
          <thead>
            <tr>
              <th class="col-1">STT</th>
              <th class="col-1">Mã số</th>
              <th class="col">Tên người lập</th>
              <th class="col">Khách hàng</th>
              <th class="col">Trạng thái</th>
              <th class="col">Ngày lập</th>
              <th class="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order.id" :class="{'new-order': newId !==order.id && newId}">
              <td class="col-1">{{index+1}}</td>
              <td class="col-1">{{order?.id}}</td>
              <td class="col">{{ order?.createBy?.fullName || 'Mua online' }}</td>
              <td class="col">{{ order?.customer }}</td>
              <td class="col">{{ order?.status }}</td>
              <td class="col">{{ order?.order_date }}</td>
              <td class="col">
                <span class="btn btn-outline-info" @click="openFormDetail(order?.id)" >
                    <font-awesome-icon :icon="['fas', 'circle-info']"/>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-uppercase"> Chưa có đơn hàng</div>
      </div>
      <adminOrderDetail :id="id" v-if="activeDetail" @closeFormDeatail="closeFormDeatail"></adminOrderDetail>
      <adminOrderCreateVue v-if="activeCreate" @cancel="activeCreate=false"></adminOrderCreateVue>
</template>

<script>
import orderService from '@/service/order.service'
import adminOrderDetail from './adminOrderDetail.vue'
import adminOrderCreateVue from './adminOrderCreate.vue'
export default {
    components:{
      adminOrderDetail,
      adminOrderCreateVue
    },
    data(){
        return {
            orders:[],
            newId:'',
            id:'',
            activeDetail:false,
            activeCreate:false
        }
    },
    methods:{
        async getAll(){
            try {
                const response = await orderService.getAll()
                this.orders=[...response.data]
                this.orders.forEach(item => item.order_date=this.formatDate(item.order_date))
                console.log(this.orders[0].id);
            } catch (error) {
                console.log(error);
            }
        },
        formatDate( dateString){
            const date = new Date(dateString);
            const utcDate = new Date(date.toISOString('en-US', { timeZone: 'UTC',setZone:'Asia/Ho_Chi_Minh' }));
            return new Intl.DateTimeFormat('default', { dateStyle: 'medium' }).format(utcDate);
        },
        openFormDetail(id){
          this.newId=''
          this.id=id
          this.activeDetail=true
        },
        closeFormDeatail(){
          this.getAll()
          this.id=''
          this.activeDetail=false
        }
    },
    mounted(){
        this.getAll()
        this.$socket.on('order-alert', (data) =>{
          this.newId=data.idOder
          this.getAll()
        })
    }
}
</script>

<style>
.new-order{
  opacity: 0.6;
}
</style>