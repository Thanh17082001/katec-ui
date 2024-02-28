<template>
 <div>
  <h3 class="text-uppercase mb-4">Quản lý doanh thu theo tài khoản</h3>
  <div>
    <table v-if="staffs?.length>0" class="table table-striped table-bordered text-start">
      <thead>
        <tr>
          <th class="col-1">STT</th>
          <th class="col">Tên Nhân viên</th>
          <th class="col">Username</th>
          <th class="col">Người quản lý</th>
          <th class="col">Tổng số đơn hàng đã bán</th>
          <th class="col">Doanh thu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(staff, index) in staffs" :key="staff.id">
          <td class="col-1">{{index+1}}</td>
          <td class="col">{{ staff.fullName  }}</td>
          <td class="col">{{ staff.username}}</td>
          <td class="col">{{ staff.managerFullName}}</td>
          <td class="col">{{ staff?.orders.length}}</td>
          <td class="col">{{ staff?.revenue }}</td>
          <!-- <td class="col">
            <span class="btn btn-outline-info" @click="openFormEdit(product.id)" >
                <font-awesome-icon :icon="['fas', 'circle-info']"/>
            </span>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div v-else>Tài khoản không có nhân viên cấp dưới</div>
    <div class="text-start fs-5">
      <div class="mt-2">
        <span class="text-black">Doanh thu cá nhân: </span>
        <span class="text-info">{{  revenueManager}}</span>
      </div>
      <div class="mt-2">
        <span class="text-black">Doanh thu Tổng các nhân viên cấp dưới: </span>
        <span class="text-info">{{  revenueStasff}}</span>
      </div>
      <div class="mt-2">
        <span class="text-black">Tổng cộng: </span>
        <span class="text-info">{{  revenueManager+ revenueStasff}}</span>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import orderService from '@/service/order.service';
import userService from '@/service/user.service';
export default {
  data(){
    return{
      orders:[],
      staffs:[],
      revenueManager:0,
      user:{},
      revenueStasffs:0
    }
  },
  computed:{
    revenueStasff(){
      let total=0
      if(this.staffs.length>0){
        this.staffs.forEach(item=>{
          total+=this.revenue(item.orders)
        })
        return total
      }
      else{
        return 0
      }
    }
  },
  methods:{
    async getOrderByCreateBy(idUser){
      try {
          const response = await orderService.getByCreateBy(idUser)
          this.revenueManager =this.revenue(response.data)
      } catch (error) {
        console.log(error);
      }
    },
    revenue(orders){
      let sum=0;
      orders.forEach((item)=>{
        if(item.status=='Đã giao'){
          sum+=item.totalAmount
        }
      })
      return sum;
    },
    
    async getUserByManager(manager){
      try {
        const response = await userService.getByManager(manager)
        let i=0;
        while(i<response.data.length){
          const res = await orderService.getByCreateBy(response.data[i].id)
          const orders = res.data.filter(item => {
              if(item.status=='Đã giao') {
                return item
              }
            
            })
          this.staffs.push({
            ...response.data[i],
            orders,
            revenue:this.revenue(res.data)
          })
          i++
        }
        console.log(this.staffs);
      } catch (error) {
        console.log(error);
      }
    },
    async getAllUser(){
      try {
        const response = await userService.getAll()
        this.staffs = response.data
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    const user = JSON.parse(sessionStorage.getItem('auth'))
    this.user=user
    // if(user.manager ==null){
    //   this.getAllUser()
    // }
      this.getUserByManager(user.id)
    
   this.getOrderByCreateBy(user.id)
  }
}
</script>

<style>

</style>