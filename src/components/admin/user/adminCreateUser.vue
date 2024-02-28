<template>
  <div class="overlay">
    <form action="" class="form" @submit.prevent.stop="signup">
        <div class="close-icon"> <font-awesome-icon @click="closeFormCreate" :icon="['fas', 'xmark']" /> </div>
        <h4 class="text-uppercase">Đăng ký nhân viên mới </h4>
        <div class="form-G">
            <label for="">Full name</label>
            <input v-model="infoUser.fullName" name="fullname" type="text" placeholder="Họ và tên" required>
        </div>
        <div class="form-G">
            <label for="">Username</label>
            <input v-model="infoUser.username" name="username" type="text" placeholder="Tên tài khoản" required>
        </div>
        <div class="form-G">
            <label for="">password</label>
            <input v-model="infoUser.password" name="username" type="text" placeholder="Mật khẩu" required>
        </div>
        <div class="form-G">
            <label for="">Người quản lý</label>
           <select name="" id="" v-model="infoUser.manager" required>
                <option value="0">---CHỌN---</option>
                <option v-for="user in users" :key="user.id" :value="user.id" >{{ user.fullName + " ("+user.username+")" }}</option>
           </select>
        </div>
        <button class="btn btn-success w-100 mt-3">ĐĂNG KÝ</button>
    </form>
  </div>
</template>

<script>
import userService from '@/service/user.service'
export default {
    data(){
        return{
            users:[],
            infoUser:{
                manager:0
            },
            user:{}
        }
    },
    emits:['closeFrom'],
    methods:{
        async getAll(){
            try {
                // const response = await userService.getAll()
                let response 
                if(this.user.manager==null){
                    response = await userService.getAll()
                }
                else{
                    response = await userService.getByManager(this.user.id)
                }
                this.users=[...response.data, this.user]

                // response.data.forEach((item )=>{
                //     if(item.manager!=null){
                //         this.users.push(item)
                //     }
                    
                // })
            } catch (error) {
                console.log(error);
            }
        },
        async signup(){
            try {
                const res = await userService.signUp(this.infoUser)
                if(res.data.status){
                    alert(res.data.message)
                    this.infoUser={
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
            this.users={
                manager:0
            }
            this.$emit('closeFrom')
        }
    },
    mounted(){
        this.user = JSON.parse(sessionStorage.getItem('auth'))
        this.getAll()

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