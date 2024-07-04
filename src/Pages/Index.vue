<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import UserCard from "../components/UserCard.vue";



const userList = ref([])
onMounted(async () => {
  const userListData = await myAxios({
    method: 'get',
    params:{
      page:1,
      pageSize:5
    },
    url: '/user/recommend',
  }).then((res) => {
    if(res.data.data !== null && res.data.data != "")
      return res.data?.data;
  });
  if(userListData){
    userListData.forEach((user) => {
      user.tags = JSON.parse(user.tags)
    })
    userList.value = userListData;
  }
})
</script>

<template>
  <user-card :user-list="userList"/>
  <van-empty v-if="!userList||userList.length==0" description="无数据" />
</template>

<style scoped>

</style>