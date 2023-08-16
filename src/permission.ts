//路由鉴权：就是路由能不能被访问的权限配置
import router from './router';
import Nprogress from 'nprogress';
import "nprogress/nprogress.css";
import pinia from '@/store';
import useUserStore from './store/modules/user';
let userStore = useUserStore(pinia);

//进度条的加载小圆球不要
Nprogress.configure({showSpinner: false});

//存储用户未登录可以访问的路由
let whiteList = ["/home", "/hospital/register", "/hospital/detail", "/hospital/notice", "/hospital/close", "/hospital/search"];
//添加相应的全局守卫
//前置守卫
router.beforeEach((to,from,next) => {
    //在访问路由组件进入之前，进度条开始动
    Nprogress.start();
    //动态设置网页左上角的标题
    document.title=`尚医通-${to.meta.title}`

    //判断用户是否登录-token
    let token = userStore.userInfo.token;
    if(token){
        //用户登录了
        next();
    } else {
        //用户未登录
        if(whiteList.includes(to.path)){
            next();
        } else {
            //显示登录组件
            userStore.visible = true;
            next({path: '/home', query:{redirect: to.fullPath}})
        }
    }
});

//后置路由
router.afterEach((to, from) => {
    //访问路由组件成功进度条消失
    Nprogress.done();
});