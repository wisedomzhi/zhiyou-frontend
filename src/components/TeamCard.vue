<script setup lang="ts">

import {TeamType} from "../model/team";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {UserType} from "../model/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface teamCardProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<teamCardProps>(), {
  teamList: []
})

const router = useRouter();

const doJoinTeam = async (teamId) => {
  const res = await myAxios.post("/team/join",{
    teamId:teamId
  })
  if(res.data.code === 0){
    showToast("加入成功")
  }else{
    showToast("加入失败" + (res.data.description ? `,${res.data.description}` : ''));
  }
}

const doUpdateTeam =  (teamId) => {
  router.push({
    path:"/team/update",
    query:{
      id:teamId
    }
  })
}

const doQuitTeam =  (teamId) => {
  router.push({
    path:"/team/quit",
    query:{
      id:teamId
    }
  })
}

const doDeleteTeam =  (teamId) => {
  router.push({
    path:"/team/delete",
    query:{
      id:teamId
    }
  })
}

const user:UserType = ref([])

onMounted(async () => {
  user.value =  await getCurrentUser()
})
</script>

<template>
  <van-card
      v-for="team in teamList"
      :desc="team.teamDescription"
      :title="team.teamName"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  >

    <template #bottom>
      <div v-if="team.expireTime">
        {{ team.expireTime.split(" ")[0] }}
      </div>
    </template>
    <template #footer>
      <van-button  type="primary" size="small" @click="doJoinTeam(team.id)">加入队伍</van-button>
      <van-button v-if="user.id === team.userId" type="primary" size="small" @click="doUpdateTeam(team.id)">更新队伍</van-button>
      <van-button type="primary" size="small" @click="doQuitTeam(team.id)">退出队伍</van-button>
      <van-button v-if="user.id === team.userId" type="primary" size="small" @click="doDeleteTeam(team.id)">解散队伍</van-button>
    </template>
  </van-card>
  <van-empty v-if="!teamList||teamList.length==0" description="无数据"/>
</template>

<style scoped>

</style>