<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {UserType} from "../model/user";
import myAxios from "../plugins/myAxios.ts";
import {showSuccessToast} from "vant";

const router = useRouter();

const user:UserType = ref('')

onMounted(async () => {
  user.value =  await getCurrentUser()
})

const loginOut = async () => {
  const loginOut = await myAxios.post("/user/logout", {})
  sessionStorage.clear()
  if (loginOut) {
    showSuccessToast("退出成功")
    router.replace("/user/login").catch(e => console.log(e))
  }
}

</script>

<template>

  <van-cell-group>
    <van-cell center title="当前用户"  :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/created" />
    <van-cell title="我加入的队伍" is-link to="/user/joined" />
    <van-space style="margin: 13px" direction="vertical" fill>
      <van-button type="primary" @click="loginOut" block>退出登录</van-button>
    </van-space>
  </van-cell-group>

</template>

<style scoped>

</style>