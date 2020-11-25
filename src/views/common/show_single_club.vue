<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">
      <el-dialog
        title="提示"
        :visible.sync="this.out_confirm"
        width="30%">
        <span>确定退出？</span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="_handleOut_">取消</el-button>
                <el-button type="primary" @click="handleOut">确定</el-button>
          </span>
      </el-dialog>

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

        <el-form-item>
          <el-tag>其他信息</el-tag>
          <span><br></span>
          <el-button type="primary"
                     size="medium"
                     @click="handleMember()">
            查看社团成员
          </el-button>
          <el-button type="primary"
                     size="medium"
                     @click="handleArticle()">
            查看社团历史文章
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-tag>其他操作</el-tag>
          <span><br></span>
          <el-button type="primary"
                     size="medium"
                     v-if="inClub"
                     @click="handleOut_()">
            退出社团
          </el-button>

          <el-button type="primary"
                     size="medium"
                     v-if="!inClub"
                     @click="handleIn()">
            申请加入
          </el-button>
        </el-form-item>

      </el-form>
    </template>
  </div>

</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getInClub()
      vm.getDataList()
    })
  },
  created () {
    this.getDataList()
  },
  data () {
    return {
      out_confirm: false,
      inClub: false,
      access: false,
      loading: false,
      id: undefined,
      club_name: this.$route.params.club_name,
      update: false,
      success_visible: false,
      dataForm: {
        name: '',
        description: ''
      },
      dataRule: {
        name: [
          {required: true, message: '社团名称不能为空', trigger: blur}
        ]
      }
    }
  },
  methods: {
    getInClub () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        params: this.$http.adornParams({
          'inclub': 1
        }),
        method: 'get'
      }).then(({data}) => {
        this.inClub = !!(data && data.code === 200)
      })
    },
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
    handleInformation () {
      this.id = this.$route.params.id
      this.$router.push('/club_information/' + this.id)
    },
    handleMember () {
      this.id = this.$route.params.id

      this.$router.push('/club_member/' + this.id)
    },
    handleArticle () {
      this.id = this.$route.params.id

      this.$router.push('/show_article_list')
    },
    handleOut () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        params: this.$http.adornParams({
          'outclub': 1
        }),
        method: 'get'
      }).then(({data}) => {
        this.getInClub()
        this.getDataList()
      })
    },
    handleOut_ () {
      this.out_confirm = true
    },
    _handleOut_ () {
      this.out_confirm = false
    },
    handleIn () {

    }
  }
}</script>

<style scoped>

</style>
