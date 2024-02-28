<template>
    <div>
        <h3 class="text-uppercase">quản lý nhập kho</h3>
        <div class=" text-start mb-3"><button @click="activeCreate=true" class="btn btn-info">Tạo phiếu nhập</button></div>
        <table v-if="entrys?.length>0" class="table table-striped table-bordered text-start">
          <thead>
            <tr>
              <th class="col-1">STT</th>
              <th class="col">Tên người lập</th>
              <th class="col">Ngày lập</th>
              <th class="col">Tổng số tiền</th>
              <th class="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in entrys" :key="entry.id">
              <td class="col-1">{{index+1}}</td>
              <td class="col">{{ entry.fullName +" ("+ entry.username +")" }}</td>
              <td class="col">{{ entry.createdAt }}</td>
              <td class="col">{{ entry.totalAmout }}</td>
              <td class="col">
                <span class="btn btn-outline-info" @click="openFormEdit(product.id)" >
                    <font-awesome-icon :icon="['fas', 'circle-info']"/>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-uppercase"> Chưa có sản phẩm</div>
        <admin-create-entry-vue v-if="activeCreate" @closeFrom="closeForm"></admin-create-entry-vue>
      </div>
</template>

<script>
import entryReceiptService from '@/service/entryReceipt.service'
import adminCreateEntryVue from './adminCreateEntry.vue'
export default {
    components:{
        adminCreateEntryVue
    },
    data(){
        return{
            entrys:[],
            activeCreate:false
        }
    },
    methods:{
        closeForm(){
            this.activeCreate=false
            this.getAll()
        },
        async getAll(){
            try {
                const response = await entryReceiptService.getAll()
                this.entrys=[...response.data]
                this.entrys.forEach(item => item.createdAt=this.formatDate(item.createdAt))
            } catch (error) {
                console.log(error);
            }
        },
        formatDate( dateString){
            const date = new Date(dateString);
            const utcDate = new Date(date.toISOString('en-US', { timeZone: 'UTC',setZone:'Asia/Ho_Chi_Minh' }));
            return new Intl.DateTimeFormat('default', { dateStyle: 'medium' }).format(utcDate);
        },
    },
    mounted(){
        this.getAll()
    }
}
</script>

<style>

</style>