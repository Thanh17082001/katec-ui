<template>
  <h1>Home Page</h1>
  <h4 @click="orderNew=false">{{ orderNew }}</h4>
</template>

<script>
export default {
  data(){
    return {
      orderNew:false, 
      quantityOrder:0
    }
  },
  watch:{
    orderNews(){
      console.log('thiên thanh');
    }
  },
  mounted(){
    this.$socket.on('order-alert', () => {
      this.orderNew=true
        this.quantityOrder++
        this.$swal('Có đơn hàng mới');
      });
    }
};
</script>

<style>

</style>
