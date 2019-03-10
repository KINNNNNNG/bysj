import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import dtsr from '@/components/Dtsr'
import test from '@/components/test'
import plsr from '@/components/plsr'
import gx from '@/components/gx'
import mhcx from '@/components/mhcx'
import plgl from '@/components/plgl'
import sh from '@/components/sh'
import tjfx from '@/components/tjfx'

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
    },{
      path:'/plsr',
      name:'plsr',
      component:plsr
    },{
      path:'/gx',
      name:'gx',
      component:gx
    },{
      path:'/mhcx',
      name:'mhcx',
      component:mhcx
    },{
      path:'/plgl',
      name:'plgl',
      component:plgl
    },{
      path:'/sh',
      name:'sh',
      component:sh
    },{
      path:'/tjfx',
      name:'tjfx',
      component:tjfx
    }
  ]
})
