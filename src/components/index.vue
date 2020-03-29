<template>
  <div>
    <a-affix :offsetTop="this.top">
    <a-menu v-model="current" mode="horizontal" class="header">
      <a-menu-item key="home"> My Todos </a-menu-item>
    </a-menu>
      </a-affix>
    <a-row type="flex" justify="center" class="my_ipt">
      <!-- 输入框区域 -->
      <a-col :span="15">  <a-input  placeholder="请输入任务..."  :value="inputValue" @change="handleImputChange"/></a-col>
      <a-col :span="1"></a-col>
      <!-- 提交 -->
      <a-col :span="4">  <a-button type="primary" @click="addItemtoList" >添加</a-button></a-col>
    </a-row>
 
   <a-divider>你好啊，树哥！</a-divider>
        <!-- footer区域 -->
      <!-- <div  class="footer"> -->
        <!-- 未完成的任务个数 -->
        <!-- <span>{{unDonwLength}}条剩余</span> -->
        <!-- 操作按钮 -->
          <a-affix :offsetTop="this.donetop">
       <a-row type="flex" justify="center">
        <a-button-group> 
          <a-button :type="viewKey ==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>   
          <a-button :type="viewKey ==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey ==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
            <!-- 把已经完成的任务清空 -->
          <a-button @click="clean">清除已完成</a-button>
        </a-button-group>

    </a-row>
          </a-affix>
      <!-- </div> -->
   <a-row type="flex"  justify="center">
    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- 只要触发change函数被触发就会运行箭头函数将复选框最新状态传过去 -->
        <a-checkbox :checked='item.done' @change="(e) => {cbStatusChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItembyId(item.id)">删除</a>
      </a-list-item>
    </a-list>
   </a-row>
   <div id="components-back-top-demo-custom">
    <a-back-top>
      <div class="ant-back-top-inner"><a-icon type="caret-up" /></div>
    </a-back-top>
  </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
      current: ['home'],
        top: 0,
        bottom: 0,
        donetop: 50,
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
     
      //只有在完成列表项小于等于0向时才弹出弹窗
      if(this.getDoneLength > 0){
         this.$store.commit('cleanDone')
      return this.$message.success("清除完成");
      }else{
        return this.$message.warning("嗷呜~~没有已完成的数据哦~~");
      }
      
    },
    //修改按钮高亮状态
    changeList(key){
      //console.log(key)
      this.$store.commit('changeViewKey',key)
    }

  },
  computed: {
  ...mapState(['inputValue','viewKey']),
  ...mapGetters(['unDonwLength','infolist','getDoneLength'])
  },
  created(){
    //执行异步操作getList
    this.$store.dispatch('getList');
  }
}
</script>


<style>
.dt_list {
  margin: 15px 5px;
  width: 100%;
}

.footer {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  padding-top: 15px;
}

.ant-divider-horizontal.ant-divider-with-text {
      font-weight: 100;
      color: rgba(74, 24, 24, .86);
}

.ant-divider{
  line-height: 2.5
}
.ant-list-bordered{
   border: 1px solid #d9d9d9; 
    border-radius: 4px;
}

.my_ipt{
  margin-top: 30px;
}
#components-back-top-demo-custom .ant-back-top {
    bottom: 100px;
    right: 0;
  }
  #components-back-top-demo-custom .ant-back-top-inner {
    height: 20px;
    width: 20px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, .6);
    color: #fff;
    text-align: center;
  }
  .header{

    top: 0;

  }
</style>
