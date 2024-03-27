<template>
  <div class="login">
    <div class="person">
      <User style="width: 16px; height: 16px" />
    </div>
    <span class="personName">{{personName}}</span>
    <img class="vip" src="@/assets/Header/vip开通.png" alt="" />
    <Message class="activeSearch"/>
    <Setting class="activeSearch" />
    <Notification class="activeSearch" />
  </div>
</template>
<script>
export default {
    data(){
        return{
            personName:'未登录',
        }
    }
};
</script>
<style lang="less" scoped>
.login {
  width: 250px;
  height: 100%;
//   background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .person{
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eaedf1;
    color: #777c8c;
    border-radius: 50%;
  }
  .personName{
    width: 40px;
    font-size: 12px;
    margin-right: 5px;
  }
  .vip{
    height: 16px;
  }
  .activeSearch {
    width: 20px;
    height: 20px;
    color: #9fa4b3;
    z-index: 2;
    margin: 0 10px;
  }
  .activeSearch:hover {
    color: #67697c;
  }
}
</style>
