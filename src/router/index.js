import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import backup from '@/components/backup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/backup',
      name: 'backup',
      component: backup
    }

  ]
})
