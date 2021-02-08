<template>
  <div class="site-wrapper site-page--login" v-loading.fullscreen.lock="loading" element-loading-text="加载中">
    <template v-if="!loading">
      <el-dialog title="请输入新密码"
                 :visible.sync="step3"
                 width="30%">
        <el-tag>请输入密码</el-tag>
        <el-input v-model="forget_pass" aria-placeholder="请输入新密码" type="password"></el-input>
        <el-tag>请确认新密码</el-tag>
        <el-input v-model="forget_pass_confirm" aria-placeholder="请确认新密码" type="password"></el-input>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="step3 = false;forget_school_number=''">取 消</el-button>
                  <el-button type="primary" @click="handle_enter_pass">确 定</el-button>
      </span>
      </el-dialog>
      <el-dialog title="验证码已发到邮箱，请输入验证码"
                 :visible.sync="step2"
                 width="30%">
        <el-input v-model="forget_code"></el-input>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="step2 = false;forget_school_number=''">取 消</el-button>
                  <el-button type="primary" @click="handle_enter_code">确 定</el-button>
      </span>
      </el-dialog>
      <el-dialog title="请输入学号"
                 :visible.sync="step1"
                 width="30%">
        <el-input v-model="forget_school_number"></el-input>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="step1 = false;forget_school_number=''">取 消</el-button>
                  <el-button type="primary" @click="handle_forget">下 一 步</el-button>
      </span>
      </el-dialog>
      <div class="site-content__wrapper">
        <div class="site-content">
          <div class="brand-info">
            <h2 class="brand-info__text">校园社团管理系统</h2>
          </div>
          <div class="login-main">
            <h3 class="login-title">登陆</h3>
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                     status-icon>
              <el-form-item prop="userName">
                <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
              </el-form-item>
              <el-button type="text" @click="step1=true">忘记密码</el-button>
              <el-form-item>
                <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      step1: false,
      step2: false,
      step3: false,
      forget_school_number: '',
      forget_code: '',
      forget_pass: '',
      forget_pass_confirm: '',
      dataForm: {
        userName: '',
        password: '',
        uuid: '',
        captcha: ''
      },
      dataRule: {
        userName: [
          {required: true, message: '帐号不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      },
      captchaPath: ''
    }
  },
  created () {
  },
  methods: {
    handle_enter_pass () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/forget'),
        method: 'post',
        data: this.$http.adornData({
          'school_number': this.forget_school_number,
          'pass': this.forget_pass,
        })
      }).then(({data}) => {
        if (data.code === 200) {
          this.step3 = false
          this.forget_pass_confirm = ''
          this.forget_pass = ''
          this.loading = false
          this.$notify.success('密码重置成功')
        }
      })
    },
    handle_enter_code () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/verification'),
        method: 'post',
        data: this.$http.adornData({
          'code': this.forget_code,
          'school_number': this.forget_school_number
        })
      }).then(({data}) => {
        if (data.code === 200) {
          this.step2 = false
          this.step3 = true
          this.forget_code = ''
          this.loading = false
        }
      })
    },
    handle_forget () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/verification'),
        method: 'get',
        params: this.$http.adornParams({
          'school_number': this.forget_school_number
        })
      }).then(({data}) => {
        this.step1 = false
        this.step2 = true
        console.log(this.step1)
        this.loading = false
      })
    },
    // 提交表单
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/user/login'),
            method: 'post',
            data: this.$http.adornData({
              'school_number': this.dataForm.userName,
              'password': this.dataForm.password,
              'uuid': this.dataForm.uuid
            })
          }).then(({data}) => {
            console.log(data)
            console.log(data.code)
            if (data && data.code === 200) {
              this.$cookie.set('token', data.token)
              this.$router.replace({name: 'home'})
            } else {
              // this.$message.error(data.msg)
              this.$notify.error('账号或密码错误')
            }
          })
        }
      })
    },
  }
}
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, .6);
  overflow: hidden;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/login_bg.jpg);
    background-size: cover;
  }

  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }

  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }

  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }

  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }

  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: .6;
  }

  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }

  .login-title {
    font-size: 16px;
  }

  .login-captcha {
    overflow: hidden;

    > img {
      width: 100%;
      cursor: pointer;
    }
  }

  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
</style>
