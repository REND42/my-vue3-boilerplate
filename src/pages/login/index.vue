<template>
  <div class="login-container">
    <div class="inner-container">
      <login v-if="status"></login>
      <signup v-else @on-success="onSignUpSucceed"></signup>

      <div class="tip-msg">
        <template v-if="status">
          <span>没有账号？ <a @click="switchStatus">点我注册</a></span>
          <!-- <span>忘记密码？ <a @click="switchStatus">点我找回密码</a></span> -->
        </template>
        <template v-else>
          <span>已有账号？ <a @click="switchStatus">点我登录</a></span>
        </template>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Login from "./components/login.vue";
  import Signup from "./components/signup.vue";

  const status = ref(true)

  const switchStatus = () => {
    status.value = !status.value
  }

  const onSignUpSucceed = () => {
    status.value = true
  }

</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inner-container {
    padding: 56px 24px 12px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 5px;
    // box-shadow: 2px 2px 6px 0px rgba(102,107,119,0.10);
    background-color: #eff0f3;

    .tip-msg {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: #0d0d0d;
      font-size: 12px;

      a {
        color: #ff8e3c;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}


</style>