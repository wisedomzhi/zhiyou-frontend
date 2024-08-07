<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCard from "../components/TeamCard.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

const router = useRouter();

const teamList = ref([]);

const listTeams = async (val = '', status = 0) => {
  const res = await myAxios.get('/team/list', {
    params : {
      page:1,
      pageSize:100,
      searchText:val,
      teamStatus:status
    }
  });
  if(res.data.code === 0){
    teamList.value = res.data.data;
  }
}

const searchText = ref("");
onMounted( () => {
  listTeams();
})

const onSearch = () => {
  listTeams(searchText.value);
}
const doAddTeam = () => {
  router.push({
    path:'/team/add'
  })
}

const active = ref("public")

const onClickTab = (() => {
  if(active.value === 'public'){
    listTeams(searchText.value, 0);
  }else{
    listTeams(searchText.value, 2);
  }
})

const offset = ref({ x: 300, y: 560 });
</script>

<template>
  <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch" />
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab title="公开" name="public"/>
    <van-tab title="加密" name="secret"/>
  </van-tabs>
  <TeamCard :team-list="teamList" @update-data="onClickTab"/>
  <van-floating-bubble
      :offset="offset"
      axis="xy"
      icon="plus"
      magnetic="x"
      @click="doAddTeam"
  />
</template>

<style scoped>

</style>