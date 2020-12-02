/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
// import http from '@/utils/httpRequest'
// import {isURL} from '@/utils/validate'
import {clearLoginInfo} from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {path: '/404', component: _import('common/404'), name: '404', meta: {title: '404未找到'}},
  {path: '/login', component: _import('common/login'), name: 'login', meta: {title: '登录'}}
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: {name: 'home'},
  meta: {title: '主入口整体布局'},
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    {path: '/home', component: _import('common/home'), name: 'home', meta: {title: '首页'}},
    {path: '/create_club', component: _import('common/create_club'), name: 'create_club', meta: {'title': '创建社团'}},
    {
      path: '/show_club_list',
      component: _import('common/show_club_list'),
      name: 'show_club_list',
      meta: {'title': '社团总览'}
    },
    {
      path: '/create_message',
      component: _import('common/create_message'),
      name: 'create_message',
      meta: {title: '发送邮件'},
    },
    {
      path: '/show_club_list_me',
      component: _import('common/show_club_list_me'),
      name: 'show_club_list_me',
      meta: {title: '我的社团'}
    },
    {
      path: '/about_me',
      component: _import('common/about_me'),
      name: 'about_me',
    },
    {
      path: '/create_article',
      component: _import('common/create_article'),
      name: 'create_article',
      meta: {title: '发布文章'}
    },
    {
      path: '/show_article_list',
      component: _import('common/show_article_list'),
      name: 'show_article_list',
      meta: {title: '文章总览'}
    },
    {
      path: '/show_article_list_me',
      component: _import('common/show_article_list_me'),
      name: 'show_article_list_me',
      meta: {title: '我的文章'}
    },
    {
      path: '/my_message_receive',
      component: _import('common/my_message_receive'),
      name: 'my_message_receive',
      meta: {title: '接收的消息'}
    },
    {
      path: '/my_message_send',
      component: _import('common/my_message_send'),
      name: 'my_message_send',
      meta: {title: '发出的消息'}
    },
    {
      path: '/my_comment',
      component: _import('common/my_comment'),
      name: 'my_comment',
      meta: {title: '我的评论'}
    },
    {
      path: '/receive_comment',
      component: _import('common/receive_comment'),
      name: 'receive_comment',
      meta: {title: '回复我的'}
    },
    {
      path: '/empty',
      component: _import('common/empty'),
      name: 'empty',
      meta: {title: '空页面'}
    },
    {
      path: '/club_member/:id',
      component: _import('common/club_member'),
      name: 'club_member',
      meta: {title: '社团成员'}
    },
    {
      path: '/club_information/:id',
      component: _import('common/club_information'),
      name: 'club_information',
      meta: {title: '社团信息'}
    },
    {
      path: '/club_articles/:id',
      component: _import('common/club_articles'),
      name: 'club_information',
      meta: {title: '社团文章'}
    },
    {
      path: '/user',
      component: _import('modules/sys/user'),
      name: 'user',
      meta: {title: '用戶'}
    },
    {
      path: '/user-update',
      component: _import('modules/sys/user-add-or-update'),
      name: 'user-update',
      meta: {title: 'update user'}
    },
    {
      path: '/show_single_club/:id',
      component: _import('common/show_single_club'),
      name: 'show_single_club',
      meta: {title: 'show single club'}
    },
    {
      path: '/show_user/:id',
      component: _import('common/show_user'),
      name: 'show_user',
    },
    {
      path: '/show_message/:id',
      component: _import('common/show_message'),
      name: 'show_message'
    },
    {
      path: '/demo-echarts',
      component: _import('demo/echarts'),
      name: 'demo-echarts',
      meta: {title: 'demo-echarts', isTab: true}
    },
    {
      path: '/show_article/:id',
      component: _import('common/show_article'),
      name: 'show_article'
    },
    {
      path: '/add_member/:id',
      component: _import('common/add_member'),
      name: 'add_member'
    },
    {
      path: '/comments_zone/:id',
      component: _import('common/comments_zone'),
      name: 'comments_zone'
    },
    {
      path: '/comment_detail/:id',
      component: _import('common/comment_detail'),
      name: 'comment_detail'
    },
    {
      path: '/edit_club/:id',
      component: _import('common/edit_club'),
      name: 'edit_club'
    },
    {
      path: '/edit_me',
      component: _import('common/edit_me'),
      name: 'edit_me'
    },
    {
      path: '/edit_article/:id',
      component: _import('common/edit_article'),
      name: 'edit_article'
    },
    {
      path: '/demo-ueditor',
      component: _import('demo/ueditor'),
      name: 'demo-ueditor',
      meta: {title: 'demo-ueditor', isTab: true}
    }
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({name: 'login'})
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

// router.beforeEach((to, from, next) => {
//   // 添加动态(菜单)路由
//   // 1. 已经添加 or 全局路由, 直接访问
//   // 2. 获取菜单列表, 添加并保存本地存储
//   if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
//     next()
//   } else {
//     http({
//       url: http.adornUrl('/article'),
//       method: 'get',
//       params: http.adornParams()
//     }).then(({data}) => {
//       if (data && data.code === 0) {
//         fnAddDynamicMenuRoutes(data.menuList)
//         router.options.isAddDynamicMenuRoutes = true
//         sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
//         sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
//         next({...to, replace: true})
//       } else {
//         sessionStorage.setItem('menuList', '[]')
//         sessionStorage.setItem('permissions', '[]')
//         next()
//       }
//     }).catch((e) => {
//       console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
//       router.push({name: 'login'})
//     })
//   }
// })

// /**
//  * 判断当前路由类型, global: 全局路由, main: 主入口路由
//  * @param {*} route 当前路由
//  */
// function fnCurrentRouteType (route, globalRoutes = []) {
//   var temp = []
//   for (var i = 0; i < globalRoutes.length; i++) {
//     if (route.path === globalRoutes[i].path) {
//       return 'global'
//     } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
//       temp = temp.concat(globalRoutes[i].children)
//     }
//   }
//   return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
// }
//
// /**
//  * 添加动态(菜单)路由
//  * @param {*} menuList 菜单列表
//  * @param {*} routes 递归创建的动态(菜单)路由
//  */
// function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
//   var temp = []
//   for (var i = 0; i < menuList.length; i++) {
//     if (menuList[i].list && menuList[i].list.length >= 1) {
//       temp = temp.concat(menuList[i].list)
//     } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
//       menuList[i].url = menuList[i].url.replace(/^\//, '')
//       var route = {
//         path: menuList[i].url.replace('/', '-'),
//         component: null,
//         name: menuList[i].url.replace('/', '-'),
//         meta: {
//           menuId: menuList[i].menuId,
//           title: menuList[i].name,
//           isDynamic: true,
//           isTab: true,
//           iframeUrl: ''
//         }
//       }
//       // url以http[s]://开头, 通过iframe展示
//       if (isURL(menuList[i].url)) {
//         route['path'] = `i-${menuList[i].menuId}`
//         route['name'] = `i-${menuList[i].menuId}`
//         route['meta']['iframeUrl'] = menuList[i].url
//       } else {
//         try {
//           route['component'] = _import(`modules/${menuList[i].url}`) || null
//         } catch (e) {
//         }
//       }
//       routes.push(route)
//     }
//   }
//   if (temp.length >= 1) {
//     fnAddDynamicMenuRoutes(temp, routes)
//   } else {
//     mainRoutes.name = 'main-dynamic'
//     mainRoutes.children = routes
//     router.addRoutes([
//       mainRoutes,
//       {path: '*', redirect: {name: '404'}}
//     ])
//     sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
//     console.log('\n')
//     console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
//     console.log(mainRoutes.children)
//     console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
//   }
// }

export default router
