import { createRouter, createWebHistory } from 'vue-router';
import homepage from '../pages/homePage.vue';
import product from '../pages/productPage.vue';
import loginPage from '../pages/loginPage.vue';
import adminPage from '../pages/adminPage.vue'
import headerUser from '../components/layout/headerUser.vue'
import adminUser from '../components/admin/user/adminUser.vue'
import adminProduct from '../components/admin/product/adminProduct.vue'
import adminEntry from '../components/admin/entry-receipt/adminEntry.vue'
import adminOrder from '../components/order/adminOrder.vue'
import adminRevenue from '../components/admin/revenue/adminRevenue.vue'
const routes =[
    {
        path:'/',
        components: {
            default: homepage,
            headerUser,
        },
    },
    {
        path:'/product',
        components: {
            default: product,
            headerUser,
        },
    },
    {
        path:'/signIn',
        component:loginPage
    },
    {
        path:'/admin',
        name: 'admin',
        component:adminPage,
        children:[
            {path:'user', component:adminUser},
            {path:'product', component:adminProduct},
            {path:'entry', component:adminEntry},
            {path:'order', component:adminOrder},
            {path:'revenue', component:adminRevenue},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router