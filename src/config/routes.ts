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
    { path: '/', component: Index },
    { path: '/search', component: SearchPage },
    { path: '/team', component: TeamPage },
    { path: '/team/add', component: TeamAddPage },
    { path: '/team/update', component: TeamUpdatePage },
    { path: '/user', component: UserPage },
    { path: '/user/edit', component: UserEditPage },
    { path: '/user/list', component: SearchResult },
    { path: '/user/login', component: UserLoginPage },
    { path: '/user/update', component: UserUpdatePage },
    { path: '/user/joined', component: UserTeamJoinedPage },
    { path: '/user/created', component: UserTeamCreatedPage },
]

export default routes;