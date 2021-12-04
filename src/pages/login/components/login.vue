<template>
  <div class="login-form-container">
    <el-form
      ref="loginRef"
      :model="loginForm"
      status-icon
      label-width="120px"
      class="login-form"
    >
      <el-form-item prop="email"
        :rules="[
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
            trigger: ['blur', 'change']
          }
        ]">
        <el-input v-model="loginForm.email" :prefix-icon="Message" placeholder="email">
        </el-input>
      </el-form-item>

      <el-form-item prop="password"
        :rules="[
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]">
        <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock" placeholder="passaword">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script lang="ts" setup>
import { login, getUserInfo } from '@/script/api';
import { ElMessage } from 'element-plus';
import { Lock, User, Message } from '@element-plus/icons'
import { reactive, ref } from 'vue';
import { useStore } from "@/store"
import { useRouter } from 'vue-router'


const store = useStore()
const router = useRouter()

const loginRef = ref()

interface LoginForm {
  email: string,
  password: string,
}

const loginForm = reactive<LoginForm>({
  email: '',
  password: ''
})

const submitLogin = () => {
  loginRef.value.validate(async (valid: boolean) => {
    console.log(valid)
    if (valid) {
      // login(loginForm).then(res => {
      //   console.log(1123, res)
      // })
      let res = await login(loginForm)
      let token = res['access_token']
      store.commit('LOGIN', token)
      console.log(1123, res['access_token'])
      ElMessage.success('登录成功')
      router.push('/')

      let userInfo = await getUserInfo()
      console.log(8888, userInfo)
      store.commit('SET_USERINFO', userInfo)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
  .login-form-container {
    :deep(.el-form-item__content) {
      margin-left: 0px !important;
    }
  }
</style>

<style lang="scss" scoped>
.login-form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 450px;
  }
}


</style>