<template>
  <div class="signup-form-container">
    <el-form
      ref="signupRef"
      :model="signUpForm"
      :rules="signUpRules"
      status-icon
      label-width="120px"
      class="signup-form"
    >
      <el-form-item prop="email">
        <el-input v-model="signUpForm.email" :prefix-icon="Message" placeholder="email">
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="signUpForm.username" :prefix-icon="User" placeholder="username">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="signUpForm.password" type="password" :prefix-icon="Lock" placeholder="passaword">
        </el-input>
      </el-form-item>
      <el-form-item prop="checkedPassword">
        <el-input v-model="signUpForm.checkedPassword" type="password" :prefix-icon="Lock" placeholder="confirm passaword">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitSignUp()">创建账号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { register } from '@/script/api';
import { ElMessage } from 'element-plus';
import { Lock, User, Message } from '@element-plus/icons'
import { reactive, ref } from 'vue';


const signupRef = ref()

interface SignUpForm {
  email: string,
  username: string,
  password: string,
  checkedPassword: string
}

const signUpForm = reactive<SignUpForm>({
  email: '',
  username: '',
  password: '',
  checkedPassword: ''
})

const signUpRules = reactive<any>({
  email: [
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
  ],
  username: [{
    required: true,
    message: '用户名不能为空',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '密码不能为空',
    trigger: 'blur'
  }],
  checkedPassword: [{
    validator: (rule: any, value: string, callback: Function) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== signUpForm.password) {
        callback(new Error("两次输入的密码不匹配"))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }]
})

const emit = defineEmits(['on-success'])
const submitSignUp = () => {
  signupRef.value.validate((valid: boolean) => {
    console.log(valid)
    if (valid) {
      register(signUpForm).then(res => {
        console.log(1123, res)
        ElMessage.success('注册成功')
        emit('on-success', true)
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
  .signup-form-container {
    :deep(.el-form-item__content) {
      margin-left: 0px !important;
    }
  }
</style>

<style lang="scss" scoped>
.signup-form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .signup-form {
    width: 450px;
  }
}


</style>