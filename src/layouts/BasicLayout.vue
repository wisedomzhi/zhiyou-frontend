<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();
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
</script>

<template>
<div>
  <van-nav-bar
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
  <van-tabbar route>
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