<template>
  <div>
    <h3 class="text-uppercase">quản lý nhân viên cấp dưới</h3>
    <div class=" text-start mb-3"><button @click="activeCreate=true" class="btn btn-info">Thêm nhân viên</button></div>
    <table v-if="users.length>0" class="table table-striped table-bordered text-start">
      <thead>
        <tr>
          <th class="col-1">STT</th>
          <th class="col">Tên tài khoản</th>
          <th class="col">Họ và tên</th>
          <th class="col">Người quản lý</th>
          <th class="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td class="col-1">{{index+1}}</td>
          <td class="col">{{ user.username }}</td>
          <td class="col">{{ user.fullName }}</td>
          <td class="col">{{ user.managerFullName }}</td>
          <td class="col">
            <span class="btn btn-outline-warning" @click="openFormEdit(user)" >
              <font-awesome-icon  :icon="['fas', 'pen-to-square']"  />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-uppercase"> Chưa có Nhân viên cấp dưới</div>
    <adminCreateUserVue v-if="activeCreate" @close-from="activeCreate=false"></adminCreateUserVue>
    <adminEditUserVue v-if="activeEdit && id!=''" :id="id" @close-from="closeEdit"></adminEditUserVue>
  </div>
</template>

<script>
import userService from '@/service/user.service';
import adminCreateUserVue from './adminCreateUser.vue';
import adminEditUserVue from './adminEditUser.vue';
export default {
  components:{
    adminCreateUserVue,
    adminEditUserVue
  },
  data(){
    return {
      users:[],
      activeCreate:false,
      activeEdit:false,
      id:''
    }
  },
  methods:{
    async getUserByManager(){
      this.users=[  ]
      const user = JSON.parse(sessionStorage.getItem('auth'))
      let response 
      if(user.manager==null){
        response = await userService.getAll()
        
      }
      else{
        response = await userService.getByManager(user.id)
      }
      // this.users=[...response.data]
      response.data.forEach((item)=>{
        if(item.manager!=null){
          this.users.push(item)
        }
      })
      console.log(this.users);
    },
    openFormEdit(user){
      this.activeEdit=true
      this.id=user.id
    },
    closeEdit(){
      this.activeEdit=false
      this.getUserByManager()
    }
  },
  mounted(){
    this.getUserByManager()
  }
}
</script>

<style>

</style>