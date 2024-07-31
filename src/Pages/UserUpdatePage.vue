<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {UserType} from "../model/user";

const router = useRouter();
const currentDate = new Date();
const formatLocalDate = (date) => {
  return (
      date.getFullYear() + '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
      date.getDate().toString().padStart(2, '0')
  );
}

function renderTime(date) {
  var formatedDate = new Date(date).toJSON();
  return new Date(+new Date(formatedDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}


const user:UserType = ref('')




onMounted(async () => {
  user.value =  await getCurrentUser()
})
const toEdit = (editKey:string, editValue:string, editTitle:string) => {
  router.push({
    path:'/user/edit',
    query:{
      editKey:editKey,
      editValue:editValue,
      editTitle:editTitle
    }
  })
}


</script>

<template>

  <van-cell-group>
    <van-cell center  title="头像" is-link>
      <van-image

          width="5rem"
          height="5rem"
          fit="cover"
          position="center"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </van-cell>
    <van-cell center title="用户名" is-link @click="toEdit('username', user.username, '用户名')" :value="user.username" />
    <van-cell center title="账号" is-link @click="toEdit('userAccount', user.userAccount, '账号')" :value="user.userAccount" />
    <van-cell center title="性别" :value="user.gender === 0 ? '男' : '女'" />
    <van-cell center title="电话" is-link @click="toEdit('phone', user.phone, '电话')" :value="user.phone" />
    <van-cell center title="邮箱" is-link @click="toEdit('email', user.email, '邮箱')" :value="user.email" />
    <van-cell center title="创建时间"  :value="renderTime(user.createTime)" />
  </van-cell-group>

</template>

<style scoped>

</style>