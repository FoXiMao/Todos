import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
          //存储共享数据
            state: {
                //列表数据
                list: [], 
                //输入框默认显示文字
                inputValue: '请输入内容...',
            },
            //变更数据
            mutations: {
                initList(state,list){
                    state.list = list
                }
            },
            //异步操作任务
            actions:{
                //获取list
                getList(context) {
                    axios.get('./static/list.json').then((data) =>{
                        console.log(data)
                        context.commit('initList',data)
                    })
                }
            }
  
      }
   )