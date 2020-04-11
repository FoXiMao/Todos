<template>
    <div>
        <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    @back="() =>  this.$router.push({name:'index'})"
    title="回收站"
    subTitle="清除后台将清空回收站!"
  />  
  <a-list bordered :dataSource="infolist">
      <a-list-item slot="renderItem" slot-scope="item, index">
        
        {{ item }}
                <a slot="actions" >恢复</a>
        </a-list-item>
      
        <!-- 删除链接 -->

    </a-list>
    </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'

export default {
    data(){
        return {

        }
    },
    methods:{

    },
    computed:{
  ...mapGetters(['infolist'])
    },
    created(){

    }
}
</script>

<style>
.ant-page-header-heading-title{
  display: block;
    float: left;
    margin-bottom: 0;
    padding-right: 12px;
    color: rgba(48, 119, 227, 0.85);
     font-weight: 300; 
    font-size: 15px;
    line-height: 32px;
}
.ant-page-header-back-button{
      color: #1890ff;
    text-decoration: none;
    outline: none;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    /* color: #000; */
    cursor: pointer;
}
</style>