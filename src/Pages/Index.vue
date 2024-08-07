<script setup lang="ts">
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import UserCard from "../components/UserCard.vue";
import {closeToast, Loading, showLoadingToast, showToast} from "vant";
import process from "process";

const mode = ref<boolean>(false)

const userList = ref([])

const pageSize = ref(100);

const loadData = async (num = 10) => {
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '加载中',
  });
  let userListData;
  if (mode.value) {
    userListData = await myAxios({
      method: 'get',
      params: {
        page: 1,
        pageSize: pageSize.value,
        num: num
      },
      url: '/user/match',
    }).then((res) => {
      if (res.data.data !== null && res.data.data != "")
        return res.data?.data;
    });
  } else {
    userListData = await myAxios({
      method: 'get',
      params: {
        page: 1,
        pageSize: pageSize.value
      },
      url: '/user/recommend',
    }).then((res) => {
      if (res.data.data !== null && res.data.data != "")
        return res.data?.data;
    });
  }
  if (userListData) {
    userListData.forEach((user) => {
      user.tags = JSON.parse(user.tags)
    })
    userList.value = userListData;
  }
  closeToast();
}

watchEffect(() => {
  loadData();
})


</script>

<template>
  <van-cell center title="推荐用户">
    <template #right-icon>
      <van-switch v-model="mode"/>
    </template>
  </van-cell>

  <user-card :user-list="userList"/>


</template>

<style scoped>

</style>