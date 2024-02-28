<template>
    <div>
        <h3 class="text-uppercase">quản lý sản phẩm</h3>
        <div class=" text-start mb-3"><button @click="activeCreate=true" class="btn btn-info">Thêm sản phẩm</button></div>
        <table v-if="products.length>0" class="table table-striped table-bordered text-start">
          <thead>
            <tr>
              <th class="col-1">STT</th>
              <th class="col">Tên sản phẩm</th>
              <th class="col">Số lượng trong kho</th>
              <th class="col">Số lượng bán</th>
              <th class="col">Giá nhập</th>
              <th class="col">Giá bán</th>
              <th class="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.id">
              <td class="col-1">{{index+1}}</td>
              <td class="col">{{ product.name }}</td>
              <td class="col">{{ product.quantityImport }}</td>
              <td class="col">{{ product.quantitySale }}</td>
              <td class="col">{{ product.priceImport }}</td>
              <td class="col">{{ product.priceSale }}</td>
              <td class="col">
                <span class="btn btn-outline-warning" @click="openFormEdit(product.id)" >
                  <font-awesome-icon  :icon="['fas', 'pen-to-square']"  />
                </span>
                <span class="btn btn-outline-info ms-3" @click="openDetailTime(product.id)" >
                    <font-awesome-icon :icon="['fas', 'clock-rotate-left']" />
                  </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-uppercase"> Chưa có sản phẩm</div>
        <adminCreateProductVue v-if="activeCreate" @closeFrom="closeForm"></adminCreateProductVue>
        <adminEditProductVue v-if="activeEdit" @closeFromEdit="closeFormEdit" :id="id"></adminEditProductVue>
        <adminDetailProductVue :id="idDetail" v-if="activeDetail" @closeFormDetail="activeDetail=false"></adminDetailProductVue>
      </div>
</template>

<script>
import productService from '@/service/product.service'
import adminCreateProductVue from './adminCreateProduct.vue'
import adminEditProductVue from './adminEditProduct.vue'
import adminDetailProductVue from './adminDetailProduct.vue'
export default {
    components:{
        adminCreateProductVue,
        adminEditProductVue,
        adminDetailProductVue
    },
    data(){
        return{
            products:[],
            activeCreate:false,
            activeEdit:false,
            activeDetail:false,
            id:'',
            idDetail:''
        }
    },
    methods:{
        async getAll(){
            try {
                const response = await productService.getAll()
                this.products=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        closeForm(){
            this.getAll()
            this.activeCreate=false
        },
        closeFormEdit(){
            this.activeEdit=false
            this.getAll()
        },
        openFormEdit(id){
          this.id=id,
          this.activeEdit=true
        },
        openDetailTime(id){
          this.idDetail=id,
          this.activeDetail=true
        }
    },
    mounted(){
        this.getAll()
    }
}
</script>

<style>

</style>