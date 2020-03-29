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
                inputValue: '',
                //下一个Id
                nextId: 5,
                viewKey: 'all'
            },
            //变更数据
            mutations: {
                initList(state,list){
                    state.list = list
                },
                //为 store 中的 inputValue 赋值
                setInputValue(state,val){
                    state.inputValue = val
                },
                //添加列表项目
                addItem(state){
                    const obj = {
                        id: state.nextId,
                        info: state.inputValue.trim(),
                        done: false
                    }
                    //向list数组中追加obj
                    state.list.push(obj)
                    //由于没写后端则将id写死，自增
                    state.nextId++
                    //清空输入框
                    state.inputValue = ''
                },
                //删除列表项
                remonvItem(state,id) {
                    //根据id查找对应项的索引
                    const i =state.list.findIndex(x => x.id === id)
                    //根据索引，删除对应的元素
                    if(i !== -1){
                        state.list.splice(i,1)
                    }

                },
                //修改列表选中状态
                changeStatus(state,param) {
                    const i =state.list.findIndex(x => x.id === param.id)
                    if(i !== -1){
                      state.list[i].done = param.status  
                    }
                },
                 //清除已完成列表项
                cleanDone(state){
                   state.list = state.list.filter(x => x.done === false)
                },
                //修改视图的关键字
                changeViewKey(state,key) {
                    state.viewKey = key
                }
            },
            //异步操作任务
            actions: {
                //获取list
                getList(context) {
                    axios.get('./static/list.json').then((data) =>{
                        //console.log(data.data)
                        context.commit('initList',data.data)
                        
                    })
                }
            },
            getters: {
                //统计未完成项目的条数
                unDonwLength(state){
                    //查询list数组中 done 为 false 的条数
                   return state.list.filter(x => x.done === false).length

                },
                infolist(state){
                    if(state.viewKey === 'all'){
                        return state.list
                    }
                     if(state.viewKey === 'undone'){
                        return state.list.filter(x => x.done === false)
                    }
                     if(state.viewKey === 'done'){
                        return state.list.filter(x => x.done === true)
                    }
                    
                        return state.list
                
                },
                //统计完成项目的条数
                getDoneLength(state){
                    return state.list.filter(x => x.done === true).length
                }
            }
  
      }
   )