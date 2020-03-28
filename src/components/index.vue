<template>
  <div class="post">
    <a-input placeholder="请输入任务" class="my_ipt"/>
    <a-button type="primary" >添加事项</a-button>

    <a-list bordered class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox>{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions">删除</a>
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
export default {
  data () {
    return {
      
    }
  },
  methods: {

  },
  computer: {

  },
  created(){

  }
}
</script>


<style>
.post{
  padding: 10px;
}
</style>
