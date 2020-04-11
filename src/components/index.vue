<template>
  <div>
     <a-row type="flex" justify="center">
      <a-col :span="4"> </a-col>
      <a-col :span="16">
         <a-menu v-model="current" mode="horizontal" class="header">
      <a-menu-item @click="() => modal2Visible = true" key="home"> My Todos </a-menu-item>
    </a-menu>
    </a-col>
      <a-col :span="4">
        <div class="menu-list">
       <a-badge :dot="show">
        <a-icon @click="goBackup" type="inbox" :style="{ fontSize: '26px', color: '#08c' }"  />
       </a-badge>
       </div>
      </a-col>
    </a-row>
   
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
          <a-affix :offsetTop="this.top">
       <a-row type="flex" justify="center">
        <a-button-group> 
          <a-button :type="viewKey ==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>  
          <a-button :type="viewKey ==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey ==='done'?'primary':'default'" @click="changeList('done')">已完成</a-button>
            <!-- 把已经完成的任务清空 -->
          <a-button @click="showCleanModel">清除已完成</a-button>
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

   <!-- 点击标题弹出框 -->
      <a-modal
      title="About My Todos"
      centered
      v-model="modal2Visible"
      @ok="() => modal2Visible = false"
    >
       <a-card hoverable style="width: 300px">
         <!-- 头图 -->
          <img
            alt="Todo"
            src="../assets/about.png"
            slot="cover"
          />
          <!-- 卡片描述 -->
          <a-card-meta title="My Todos" description="论堕落的自我修养">
          </a-card-meta>
       </a-card>
       <a-card hoverable style="width: 300px">
          <a-card-meta title="软件作者" description="Citrons">
          </a-card-meta>
       </a-card>
       <a-card hoverable style="width: 300px">
          <a-card-meta title="当前版本" description="V1.0.1">
          </a-card-meta>
       </a-card>
       <a-card hoverable style="width: 300px">
              我爱你只有风知道
       </a-card>
       <a-card hoverable style="width: 300px">
             你好，我是My Todos的开发者。非常高兴您的使用,My Todos只是一个初生的软件，它的成长还需要大家来共同出谋划策，才能使它变得更好，如果您有什么建议或者发现了Bug，请及时联系我，谢谢！
       </a-card>
       <a-card hoverable style="width: 300px">
           <a href="https://jq.qq.com/?_wv=1027&k=5NdSS4g">加入群聊</a>
       </a-card>
     <!-- 点击删除已完成弹出框 -->
    </a-modal>
      <a-modal
      title="确认操作"
      :visible="visible"
      @ok="clean"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
//这是节流参数
function throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 2000;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }

}
//这是防抖参数
function debounce(func, wait=1000) {
   let timeout;  // 定时器变量
    return function(event) {
        clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
        timeout = setTimeout(()=>{
            func.call(this,event)
        }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
    };
}
export default {
  
  data () {
    return {
      current: ['home'],
        top:0,//按钮组在下滑后距离顶部的距离
        bottom: 0,
        modal2Visible: false,//About对话框的状态
        ModalText: '确认清除已完成的事项？',//清除已完成任务的提示文字
        visible: false,//对话框的状态
        confirmLoading: false,//清除已完成任务确认弹窗的确定按钮 loading
        show: true,//小红点是否显示
    }
  },
  methods: {
    //监听文本框变化
    handleImputChange(e){
   
    this.$store.commit('setInputValue',e.target.value)
    },
    //向列表中添加item项(这里用了防抖，限制用户频繁点击)
    addItemtoList:throttle(function(){
      //判断输入框是否为空
      if(this.inputValue.trim().length <= 0){
        return this.$message.warning("新增项不能为空");
      }
      this.$store.commit('getLocalStore')
      this.$store.commit('addItem')
      this.$store.commit('intoLocalStore')
      
    },700) ,
    //根据id删除列表项
    removeItembyId(id){
       // console.log(id);
       this.$store.commit('remonvItem',id)
        this.$store.commit('intoLocalStore')
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
           this.$store.commit('intoLocalStore')
    },
    //清除已完成列表项（这里调用了节流来限制操作次数）
    clean:throttle(function()
    {
      //将confirmLoading状态改变成true
       this.confirmLoading = true;
       //这是应该定时器，在0.7秒后执行任务
         setTimeout(() => {
           //将visible状态改为false
          this.visible = false;
          //将confirmLoading状态改为false
          this.confirmLoading = false;
          //只有在完成列表项小于等于0向时才弹出弹窗
          if(this.getDoneLength > 0){
         this.$store.commit('cleanDone')
        this.$store.commit('intoLocalStore')
      return this.$message.success("清除完成");
      }else{
         return this.$message.warning("嗷呜~~没有已完成的数据哦~~");  
      }
        },700);
      
      
    }),
    //修改按钮高亮状态
    changeList(key){
      //console.log(key)
      this.$store.commit('changeViewKey',key)
    },
    //点击删除已完成弹出确认对话框
    showCleanModel(){
      this.visible = true;
    },
    //上面对话框的确定按钮默认操作
     handleOk(e) {
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
       //上面对话框的返回按钮默认操作
     handleCancel(e) {
        this.visible = false;
      },
      //点击回收站跳转路由
      goBackup(){
        this.show=false,
        this.$router.push({name:'backup'})
      }

  },
  computed: {
  ...mapState(['inputValue','viewKey']),
  ...mapGetters(['unDonwLength','infolist','getDoneLength'])
  },
  created(){
    //执行异步操作getList
    //this.$store.dispatch('getList');
     this.$store.commit('onceAdd');
     this.$store.commit('getLocalStore');
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
  .menu-list{
    transform: translate(-24%,79%);
    padding-left:15px ;
    /* size: 25px; */
  }
</style>
