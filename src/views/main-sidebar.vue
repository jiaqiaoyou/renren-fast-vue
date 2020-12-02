<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="club">
          <template slot="title">
            <span>社团</span>
          </template>
          <el-menu-item index="club-create" @click="$router.push({ name: 'create_club' })">
            <span>创建社团</span>
          </el-menu-item>
          <el-menu-item index="club-check" @click="$router.push({ name: 'show_club_list'})">
            <span>社团总览</span>
          </el-menu-item>
          <el-menu-item index="club-mine" @click="$router.push({name:'show_club_list_me'})">
            <span>我的社团</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="article">
          <template slot="title">
            <span>文章</span>
          </template>
          <el-menu-item index="article-create" @click="$router.push({name:'create_article'})">
            <span>编写文章</span>
          </el-menu-item>
          <el-menu-item index="article-check" @click="$router.push({name:'show_article_list'})">
            <span>文章总览</span>
          </el-menu-item>
          <el-menu-item index="article-mine" @click="$router.push({name:'show_article_list_me'})">
            <span>我的文章</span>
          </el-menu-item>
        </el-submenu>


        <el-submenu index="msg">
          <template slot="title">
            <span>邮箱</span>
          </template>
          <el-menu-item index="msg-mine" @click="$router.push({name:'create_message'})">
            <span>写邮件</span>
          </el-menu-item>
          <el-menu-item index="msg-mine" @click="$router.push({name:'my_message_receive'})">
            <span>已接收</span>
          </el-menu-item>
          <el-menu-item index="msg-mine" @click="$router.push({name:'my_message_send'})">
            <span>已发送</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu>
          <template slot="title">
            <span>个人</span>
          </template>
          <el-menu-item @click="$router.push('/about_me')">
            <span>关于我</span>
          </el-menu-item>
          <el-menu-item @click="$router.push('/edit_me')">
            <span>修改个人信息</span>
          </el-menu-item>
          <el-menu-item @click="logoutHandle">
            <span>登出</span>
          </el-menu-item>
        </el-submenu>
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>

      </el-menu>
    </div>
  </aside>
</template>

<script>
import SubMenu from './main-sidebar-sub-menu'
import {isURL} from '@/utils/validate'
import {clearLoginInfo} from '../utils'

export default {
  data () {
    return {
      dynamicMenuRoutes: []
    }
  },
  components: {
    SubMenu
  },
  computed: {
    sidebarLayoutSkin: {
      get () {
        return this.$store.state.common.sidebarLayoutSkin
      }
    },
    sidebarFold: {
      get () {
        return this.$store.state.common.sidebarFold
      }
    },
    menuList: {
      get () {
        return this.$store.state.common.menuList
      },
      set (val) {
        this.$store.commit('common/updateMenuList', val)
      }
    },
    menuActiveName: {
      get () {
        return this.$store.state.common.menuActiveName
      },
      set (val) {
        this.$store.commit('common/updateMenuActiveName', val)
      }
    },
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    },
    mainTabsActiveName: {
      get () {
        return this.$store.state.common.mainTabsActiveName
      },
      set (val) {
        this.$store.commit('common/updateMainTabsActiveName', val)
      }
    }
  },
  watch: {
    $route: 'routeHandle'
  },
  created () {
    this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
    this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
    this.routeHandle(this.$route)
  },
  methods: {
    logoutHandle () {
      this.$confirm(`确定进行[退出]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/user/logout'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({data}) => {
          if (data && data.code === 200) {
            clearLoginInfo()
            this.$router.push({name: 'login'})
          }
        })
      }).catch(() => {
      })
    },
    // 路由操作
    routeHandle (route) {
      if (route.meta.isTab) {
        // tab选中, 不存在先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0]
        if (!tab) {
          if (route.meta.isDynamic) {
            route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
            if (!route) {
              return console.error('未能找到可用标签页!')
            }
          }
          tab = {
            menuId: route.meta.menuId || route.name,
            name: route.name,
            title: route.meta.title,
            type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
            iframeUrl: route.meta.iframeUrl || '',
            params: route.params,
            query: route.query
          }
          this.mainTabs = this.mainTabs.concat(tab)
        }
        this.menuActiveName = tab.menuId + ''
        this.mainTabsActiveName = tab.name
      }
    }
  }
}
</script>
