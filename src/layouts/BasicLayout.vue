<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import { showToast } from 'vant';
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const active = ref(0);

const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push('/search');
};

const DEFAULT_TITLE = "智友伙伴匹配"
const title = ref(DEFAULT_TITLE)
router.beforeEach((to, from) => {
  title.value = to.meta.title ?? DEFAULT_TITLE;
})

const path = ref("/")
watchEffect(() => {
  path.value = route.path;
})
</script>

<template>
<div>
  <van-nav-bar
      v-show="!(path === '/user/login' || path === '/user/register')"
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      标签
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route v-show="!(path === '/user/login' || path === '/user/register' || path === '/team/chat')">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<style scoped>
#content{
  padding-bottom: 60px;
}
</style>