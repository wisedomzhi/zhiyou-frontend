import myAxios from "../plugins/myAxios.ts";

export const getCurrentUser = async () => {
    //TODO 可以在此处设置缓存，避免每次都去请求后端
    const res = await myAxios.get('/user/current');
    if(res.data.code === 0){
        return res.data.data;
    }
    return null;
}




