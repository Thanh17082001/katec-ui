<template>
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="login-wrap p-4 p-md-5">
            <div class="icon d-flex align-items-center justify-content-center">
              <span class="fa fa-user-o"></span>
            </div>
            <h3 class="text-center mb-4">Sign In</h3>
            <form action="#" class="login-form" @submit.prevent.stop="signIn">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control rounded-left"
                  placeholder="Username"
                  required=""
                  name="username"
                  v-model="infoUser.username"
                />
              </div>
              <div class="form-group d-flex">
                <input
                  type="password"
                  class="form-control rounded-left"
                  placeholder="Password"
                  required=""
                  v-model="infoUser.password"

                />
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="form-control btn btn-primary rounded submit px-3"
                >
                  Login
                </button>
              </div>
              <div class="form-group d-md-flex">
                <div class="w-50">
                  <label class="checkbox-wrap checkbox-primary"
                    >Remember Me
                    <input type="checkbox" checked="" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="w-50 text-md-right">
                  <a href="#">Forgot Password</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
</template>

<script>
import userService from '@/service/user.service'
export default {
    data(){
        return {
            infoUser:{}
        }
    },
    methods:{
        async signIn(){
            try {
               const response = await userService.signIn(this.infoUser) 
               console.log(response.data.status);
               if(response.data.status){
                sessionStorage.setItem('auth', JSON.stringify(response.data.auth) )
                alert('Đăng nhập thành công')
                this.$router.push('/admin')
               }
               else{
                alert(response.data.message)
               }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>