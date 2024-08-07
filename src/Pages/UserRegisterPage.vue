<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const username = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');

const onSubmit = async (values) => {
  const res = await myAxios.post("user/register", {
    username: username.value,
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  });
  if(res.data.code === 0){
    showSuccessToast("注册成功！");
    router.push('/user/login')
  }else {
    showFailToast(res.data?.description);
  }
};

const validatorMessage = (val) => {
  if(val !== userPassword.value){
    return '确认密码必须和密码相同';
  }
};
</script>

<template>
  <div class="logo">
    <van-image
        width="150"
        height="150"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        radius="10px"
        style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"
    />
  </div>
  <van-row justify="center">
    <h3>“智友-发现同好”</h3>
  </van-row>
  <div style="padding-top:20px"/>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />

      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码',validator: validatorMessage}]"
      />
    </van-cell-group>
    <div style="margin: 20px 80px 5px 80px;">
      <van-button round plain type="primary" native-type="submit" style="margin-right: 50px" size="large" block>
        <van-icon name="contact-o" style="padding-right: 5px"/>
        注册
      </van-button>
    </div>
    <van-cell to="/user/login"  value="已有帐号，点击登录" />
  </van-form>

</template>

<style scoped>
.logo{
  padding-top: 50px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}


</style>