<template>
  <div class="col-lg-2 admin__menu">
    <div>
      <h4>{{user.fullName}}</h4>
    <p @click="logout">Đăng xuất</p>
    </div>
    <span class="text-start d-block text-uppercase">Tùy chọn</span>
    <div class="mx-3">
      <router-link active-class="active" to="/admin/user">Nhân viên</router-link>
      <router-link active-class="active" to="/admin/product">Sản Phẩm</router-link>
      <router-link active-class="active" to="/admin/entry">Nhập Kho</router-link>
      <router-link active-class="active" to="/admin/order" @click="orderNew=false; quantityOrder=0">Đơn hàng 
        <span class="alert" >
          <font-awesome-icon :icon="['fas', 'bell']" />
          <span v-if="orderNew" class="quantity">{{ quantityOrder }}</span>
        </span>
      </router-link>
      <router-link active-class="active" to="/admin/revenue">Doanh thu</router-link>
    </div>
  </div>
</template>

<script>
import userService from '@/service/user.service'
export default {
  data(){
    return {
      user:{},
      quantityOrder:0,
      orderNew:false
    }
  },
  methods:{
    async logout(){
      sessionStorage.clear()
      const res = await userService.logout()
      if(res.data.status){
        this.$router.push('/')
      }
      else{
        alert(res.data.message)
          this.$router.push('/signin')
      }
    }
  },
  mounted() {
    this.user= JSON.parse(sessionStorage.getItem('auth') || {})
    this.$socket.on('order-alert', () => {
        this.orderNew=true
        this.quantityOrder++
        const path = window.location.pathname;
        if(path == '/admin/order'){
          this.$swal('Có đơn hàng mới')
          setTimeout(()=>{
            this.orderNew=false
            this.quantityOrder=0
          }, 3000)
        }
      });
  },
}
</script>

<style scoped>
 .admin__menu{
  background: var(--primary-color);
  color:#fff;
  text-decoration: none;
  padding: 20px 0;
  padding-left: 20px;
 }
 a{
  margin: 0;
  color:#fff;
  text-decoration: none;
  display: block;
  text-align: left;
  font-size: 20px;
  transition: all linear 0.2s;
  padding: 5px 0px;
  position: relative;
 }
 a:hover{
  transform: translateX(5px);
  color: red;
 }
 
 span{
  color: #ccc;
  font-size: 13px;
  margin-bottom: 6px;
 }
 .active{
  color: red;
  font-size: 23px;
  border-bottom: 2px solid red;
 }
 p{
  cursor: pointer;
 }
 .alert{
  position: absolute;
  top: -3px;
  left: 86px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #777;
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
 }
 .alert .quantity{
  position: absolute;
  top: -8px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
 }
 .alert svg{
  font-size: 18px;
  color: #fff;
 }
</style>