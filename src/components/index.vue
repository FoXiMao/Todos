<template>
  <div class="post">
    <a-input placeholder="请输入任务..."  class="my_ipt" :value="inputValue" @change="handleImputChange"/>
    <a-button type="primary" @click="addItemtoList" >添加事项</a-button>

    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- 只要触发change函数被触发就会运行箭头函数将复选框最新状态传过去 -->
        <a-checkbox :checked='item.done' @change="(e) => {cbStatusChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItembyId(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDonwLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey ==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey ==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey ==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    //监听文本框变化
    handleImputChange(e){
   
    this.$store.commit('setInputValue',e.target.value)
    },
    //向列表中添加item项
    addItemtoList() {
      //判断输入框是否为空
      if(this.inputValue.trim().length <= 0){
        return this.$message.warning("新增项不能为空");
      }
      this.$store.commit('addItem')
    },
    //根据id删除列表项
    removeItembyId(id){
       // console.log(id);
       this.$store.commit('remonvItem',id)
    },
    //监听复选框状态变化的事件
    cbStatusChange(e,id){
      //通过e.target.checked可以接收到最新的选中状态
      // console.log(e.target.checked)
      //  console.log(id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus',param)
    },
    //清除已完成列表项
    clean(){
      this.$store.commit('cleanDone')
    },
    //修改按钮高亮状态
    changeList(key){
      //console.log(key)
      this.$store.commit('changeViewKey',key)
    }

  },
  computed: {
  ...mapState(['inputValue','viewKey']),
  ...mapGetters(['unDonwLength','infolist'])
  },
  created(){
    //执行异步操作getList
    this.$store.dispatch('getList');
  }
}
</script>


<style>
.post{
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
