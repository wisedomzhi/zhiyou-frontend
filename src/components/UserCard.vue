<script setup lang="ts">
import {UserType} from "../model/user";

interface userCardProps {
  userList: UserType[]
}
const props = withDefaults(defineProps<userCardProps>(), {
  userList: []
})
</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.userProfile"
      :title="user.username"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 5px; margin-top: 5px">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-button  size="normal">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList||userList.length==0" description="无数据" />
</template>

<style scoped>

</style>