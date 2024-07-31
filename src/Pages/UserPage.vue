<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {UserType} from "../model/user";

const router = useRouter();

const user:UserType = ref('')

onMounted(async () => {
  user.value =  await getCurrentUser()
})



</script>

<template>

  <van-cell-group>
    <van-cell center title="当前用户"  :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/created" />
    <van-cell title="我加入的队伍" is-link to="/user/joined" />
  </van-cell-group>

</template>

<style scoped>

</style>