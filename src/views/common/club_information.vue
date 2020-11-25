<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm">
        <el-form-item prop="name">
          <el-tag>社团名称</el-tag>
          <el-input placeholder="请输入社团名称"
                    v-model="dataForm.name"
                    disabled="this.access"
                    clearable/>
          <el-button type="primary"
                     v-if="access"
                     @click="submit()">
            修改
          </el-button>
        </el-form-item>

        <el-form-item prop="description">
          <el-tag>社团描述</el-tag>
          <el-input placeholder="请输入社团描述"
                    v-model="dataForm.description"
                    type="textarea"
                    :autosize="{minRows:15,maxRows:15}"
                    disabled="this.access"
                    clearable/>
          <el-button type="primary"
                     v-if="access"
                     @click="submit()">
            修改
          </el-button>
        </el-form-item>

        <el-form-item prop="owner">
          <el-tag>所有者</el-tag>
          <span><br></span>
          <span>{{ this.dataForm.owner.name }}</span>
        </el-form-item>


        <el-form-item prop="created">
          <el-tag>创建时间</el-tag>
          <span><br></span>
          <span>{{ this.dataForm.created }}</span>
        </el-form-item>

      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getDataList()
    })
  },
  created () {
    this.getDataList()
  },
  data () {
    return {
      loading: true,
      id: undefined,
      access: false,
      update: false,
      dataForm: {},
      dataRule: {}
    }
  },
  methods: {
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.loading = false
        }
      })
    },
    submit () {
    },
    click_success () {
      this.success_visible = false
      this.$router.push({name: 'show_club_list_me'})
      this.reload()
    },
    valid () {
      this.$http({
        url: this.$http.adornUrl('/club/validate'),
        method: 'post',
        data: this.$http.adornData({
          'name': this.dataForm.name,
          'description': this.dataForm.description
        })
      }).then(({data}) => {
        if (data && data.code === 200 && data.exist === true) {
          this.$notify.error('社团名称重复')
        }
      })
    }
  }
}
</script>

<style>

</style>
