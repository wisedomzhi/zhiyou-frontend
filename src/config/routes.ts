import Index from "../Pages/Index.vue";
import SearchPage from "../Pages/SearchPage.vue";
import TeamPage from "../Pages/TeamPage.vue";
import UserPage from "../Pages/UserPage.vue";
import UserEditPage from "../Pages/UserEditPage.vue";
import SearchResult from "../Pages/SearchResult.vue";
import UserLoginPage from "../Pages/UserLoginPage.vue";
import TeamAddPage from "../Pages/TeamAddPage.vue";
import TeamUpdatePage from "../Pages/TeamUpdatePage.vue";
import UserUpdatePage from "../Pages/UserUpdatePage.vue";
import UserTeamJoinedPage from "../Pages/UserTeamJoinedPage.vue";
import UserTeamCreatedPage from "../Pages/UserTeamCreatedPage.vue";



const routes = [
    { path: '/', component: Index , meta:{title:"智友伙伴匹配"}},
    { path: '/search', component: SearchPage,  meta:{title:"搜索用户"} },
    { path: '/team', component: TeamPage,  meta:{title:"队伍"}},
    { path: '/team/add', component: TeamAddPage,  meta:{title:"添加队伍"} },
    { path: '/team/update', component: TeamUpdatePage ,  meta:{title:"修改队伍"}},
    { path: '/user', component: UserPage,  meta:{title:"个人"} },
    { path: '/user/edit', component: UserEditPage,  meta:{title:"编辑个人信息"} },
    { path: '/user/list', component: SearchResult,  meta:{title:"搜索结果"} },
    { path: '/user/login', component: UserLoginPage ,  meta:{title:"登录"}},
    { path: '/user/update', component: UserUpdatePage ,  meta:{title:"个人"}},
    { path: '/user/joined', component: UserTeamJoinedPage ,  meta:{title:"已加入队伍"}},
    { path: '/user/created', component: UserTeamCreatedPage ,  meta:{title:"已创建队伍"}},
]

export default routes;