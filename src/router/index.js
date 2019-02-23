import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import dtsr from '@/components/Dtsr'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
 
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
      
    },{
      path:'/dtsr',
      name:'Dtsr',
      component:dtsr
    },{
      path:'/test',
      name:'test',
      component:test
    }
  ]
})
