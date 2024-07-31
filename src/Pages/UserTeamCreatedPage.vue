TeamPage.vue<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCard from "../components/TeamCard.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter();

const teamList = ref([]);

const listTeams = async (val = '') => {
  const res = await myAxios.get('/team/list/create', {
    params : {
      page:1,
      pageSize:10,
      searchText:val
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

const offset = ref({ x: 300, y: 560 });
</script>

<template>
  <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch" />
  <TeamCard :team-list="teamList" @update-data="listTeams"/>
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