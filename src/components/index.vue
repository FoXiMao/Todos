<template>
  <div class="post">
    <a-input placeholder="请输入任务..."  class="my_ipt" :value="inputValue" @change="handleImputChange"/>
    <a-button type="primary" @click="addItemtoList" >添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done'>{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItembyId(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>1条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button >全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
    }

  },
  computed: {
  ...mapState(['list','inputValue'])
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
