<template>
  <div class="overlay">
    <div class="product-detail">
        <div class="close-icon"> <font-awesome-icon @click="closeFormDetail" :icon="['fas', 'xmark']" /> </div>
      <div class="row">
        <div class="col-lg-5 info">
          <img :src="product.image" alt="" />
          <div class="info-detail">
            <div class="ms-3 mt-3">
              <span class="text-uppercase text-info">{{ product.name }}</span>
            </div>
            <div class="ms-3 mt-3">
              <span class=" me-2">Giá bán hiện tại: </span>
              <span>{{ product.priceSale }}</span>
            </div>
            <div class="ms-3 mt-3">
                <span class=" me-2">Số lượng đá bán: </span>
                <span>{{ product.quantitySale }}</span>
              </div>
            <div class="ms-3 mt-3">
              <span class=" me-2">Giá nhập mới nhất: </span>
              <span>{{ product.priceImport }}</span>
            </div>
            <div class="ms-3 mt-3">
                <span class=" me-2">Số lượng trong kho: </span>
                <span>{{ product.quantityImport }}</span>
              </div>
          </div>
        </div>

        <div class="col-lg-7">
            <div class="row">
                <div class="col-lg-6">
                    <h6 class="text-uppercase text-info">Danh sách ngày thay đổi giá bán</h6>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th class="col">Ngày thay đổi giá bán</th>
                                <th class="col">Giá bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="price in pricesSale" :key="price.id">
                                <td>{{ price.dateChange }}</td>
                                <td>{{ price.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-6">
                    <h6 class="text-uppercase text-info">Danh sách ngày thay đổi giá nhập</h6>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th class="col">Ngày thay đổi giá nhập</th>
                                <th class="col">Giá bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="price in pricesImport" :key="price.id">
                                <td>{{ price.dateChange }}</td>
                                <td>{{ price.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from "@/service/product.service";
import priceService from "@/service/price.service";
export default {
  data() {
    return {
      product: {},
      pricesSale: [],
      pricesImport: [],
    };
  },
  props: {
    id: Number,
  },
  emits:['closeFormDetail'],
  methods: {
    async getProductById() {
      try {
        const response = await productService.getByid(this.id);
        const price1 = await priceService.getPriceByidProduct(this.id, "Ban");
        const price2 = await priceService.getPriceByidProduct(this.id, "Nhap");
        this.product = {
          ...response.data[0],
          priceSale: price1.data.price || 0,
          priceImport: price2.data.price || 0,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getPricesProduct(){
        try {
            const resPricesSale = await priceService.getPricesProduct(this.id,'Ban')
            const resPricesImport = await priceService.getPricesProduct(this.id,'Nhap')
            this.pricesSale=resPricesSale.data;
            this.pricesImport=resPricesImport.data;
            this.pricesSale.forEach(item => item.dateChange=this.formatDate(item.dateChange))
            this.pricesImport.forEach(item => item.dateChange=this.formatDate(item.dateChange))
        } catch (error) {
            console.log(error);
        }
    },
    formatDate( dateString){
        const date = new Date(dateString);
        const utcDate = new Date(date.toISOString('en-US', { timeZone: 'UTC',setZone:'Asia/Ho_Chi_Minh' }));
        return new Intl.DateTimeFormat('default', { dateStyle: 'medium' }).format(utcDate);
    },
    closeFormDetail(){
        this.$emit('closeFormDetail')
    }
  },
  mounted() {
    this.getProductById();
    this.getPricesProduct()
  },
};
</script>

<style scoped>
.product-detail {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1400px;
  height: 600px;
  background: #fff;
  padding: 50px;
}
.info {
  display: flex;
  height: 100%;
}
.info img {
  width: 290px;
  height: 400px;
}
.info-detail {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}

.info-detail span{
    font-size: 16px;
}
</style>
