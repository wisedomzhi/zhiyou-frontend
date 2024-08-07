<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {UserType} from "../model/user";
import {getCurrentUser} from "../services/user.ts";


const route = useRoute();
const router = useRouter();
const editTeam = ref({
  teamId:route.query.teamId,
  editKey:route.query.editKey,
  editValue:route.query.editValue,
  editTitle:route.query.editTitle,
})


const onSubmit = async (values) => {
  const res = await myAxios.post("/team/update", {
    "id": editTeam.value.teamId,
    [editTeam.value.editKey]:editTeam.value.editValue,
  })
  if(res.data.code === 0){
    showSuccessToast("修改成功");
    router.back();
  }else{
    showFailToast("修改失败");
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editTeam.editValue"
          :name="editTeam.editKey"
          :label="editTeam.editTitle"
          placeholder="请填写"
          :rules="[{ required: true, message: `请填写${editTeam.editTitle}` }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>