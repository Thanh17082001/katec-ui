<template>
  <div class="row main">
    <adminNabarVue></adminNabarVue>
    <adminContentVue></adminContentVue>
  </div>
</template>

<script>
import adminContentVue from '@/components/admin/adminContent.vue';
import adminNabarVue from '@/components/admin/adminNabar.vue';
export default {
 components:{
    adminContentVue,
    adminNabarVue
 }

}
</script>

<style>
.main {
    min-height: 100vh;
}
</style>