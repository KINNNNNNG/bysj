import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import dtsr from '@/components/Dtsr'

Vue.use(Router)

export default new Router({
 
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
      
    },{
      path:'/dtsr',
      name:'Dtsr',
      component:dtsr
      
    }
  ]
})
