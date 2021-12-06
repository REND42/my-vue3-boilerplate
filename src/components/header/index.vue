<template>
  <div class="common-header-container">
    <div class="logo">内容管理系统后台</div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="user-msg">
            <el-icon :size="20"><bell /></el-icon>
        </div>
        <div class="user-avatar">
          <img src="@/assets/images/avatar.jpg" alt="">
        </div>
        <el-dropdown class="user-name" size="small" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- admin -->
            {{ userinfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useStore } from "@/store";
import { ref } from "vue"


const router = useRouter()
const store = useStore()

const handleCommand = (command: string) => {
  if(command == 'logout') {
    store.commit('LOGIN', '')
    router.push('/login')
  } else if(command == 'user') {
    
  }
}

const userinfo = store.getters.getUserInfo
console.log(999, userinfo)

</script>


<style lang="scss" scoped>
  .common-header-container {
    position: relative;
    height: 70px;
    background-color: #242f42;
    font-size: 22px;
    color: $color-cccc;

    .logo {
      float: left;
      width: 250px;
      line-height: 70px;
    }

    .header-right {
      float: right;
      padding-right: 50px;

      .header-user-con {
        height: 70px;
        line-height: 70px;
        font-size: 14px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .user-msg {
          display: flex;
        }

        .user-avatar {
          padding-left: 20px;

          img {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }

        .user-name {
          padding-left: 16px;
          cursor: pointer;

          .el-dropdown-link {
            color: #ffffff;
          }
        }
      }
    }
  }
</style>