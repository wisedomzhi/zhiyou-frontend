<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showToast} from "vant";
import {UserType} from "../model/user";
import {getCurrentUser} from "../services/user.ts";

const router = useRouter();

const initTeamData = {
  "teamName": "",
  "teamDescription": "",
  "teamPassword": "",
  "maxNum": 5,
  "expireTime": "",
  "userId": "",
  "teamStatus": 0
}

const addTeamData = ref({...initTeamData})

const showPicker = ref(false);

const minDate = new Date();
minDate.setDate(minDate.getDate()+1)
const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};

const onSubmit = async (values) => {
  const postData = {
    ...addTeamData.value,
    teamStatus: Number(addTeamData.value.teamStatus),
    expireTime: addTeamData.value.expireTime + " 00:00:00"
  }
  const res = await myAxios.post("team/add", postData);
  if(res.data.code === 0){
    showToast("添加成功！");
    router.replace("/team");
  }else {
    showToast("添加失败！");
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.teamName"
          name="teamName"
          label="队伍名"
          placeholder="队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
          v-model="addTeamData.teamDescription"
          rows="2"
          autosize
          label="队伍描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入队伍描述"
          show-word-limit
      />
      <van-field name="stepper" label="队伍人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="5" />
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私密</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-if="Number(addTeamData.teamStatus) === 2"
          v-model="addTeamData.teamPassword"
          type="password"
          name="teamPassword"
          label="队伍密码"
          placeholder="队伍密码"
          :rules="[{ required: true, message: '请填写队伍密码' }]"
      />
      <van-field
          v-model="addTeamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" :min-date="minDate"/>
      </van-popup>

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  {{
    addTeamData
  }}
</template>

<style scoped>

</style>