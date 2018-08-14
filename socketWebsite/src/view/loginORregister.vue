<template>
  <div class="login">
    <div class="bgImg loginBg" :style="avatarImgStyle"></div>
    <div class="loginContent centerMid">
      <div class="bgImg loginHeader" :style="avatarImgStyle"></div>

      <h1>名字</h1>

      <div class="inputBox">
        <div class="loginInput">
          <font-awesome-icon class="icon" :icon="['fab', 'weixin']" />
          <input type="text" placeholder="帐号" v-model="userId">
        </div>
        <div class="loginInput">
          <font-awesome-icon class="icon" :icon="['fas', 'unlock-alt']" />
          <input type="password" placeholder="密码" v-model="password">
        </div>
      </div>

      <button class="loginBtn" @click="loginORregisterBtn"><i v-if="loginRegister==1">登录</i><i v-else>注册</i></button>

      <h2><i>忘记密码</i><b @click="loginORregister"><a v-if="loginRegister==2">登录</a><a v-else>注册</a></b></h2>

    </div>

  </div>
</template>

<script>
  import store from '../store';

  export default {
  name: 'login',
  data () {
    return {
      userId: '',
      password: '',
      avatarImgStyle: {
        'background-image': "url('static/images/bannerBg.jpg')"
      },
      loginRegister:1,/*1=登录  2=注册*/
    }
  },
  methods: {
    loginORregister(){
      this.loginRegister == 1? this.loginRegister=2:this.loginRegister=1;
    },
    loginORregisterBtn(){

      if(!this.regExp0(this.userId)) return this.$message({ message: '帐号只能为3-20位中文、英文、数字、下划线', center: true });
      if(!this.regExp0(this.password)) return this.$message({ message: '密码只能为3-20位的字母、数字、下划线', center: true });

      let param = {
        userId: this.userId,
        password: this.cryptoMd5(this.password)
      }
      if(this.loginRegister==1){
        this.api_login(param).then((res) => {
          if(res.code==-1) return this.$message({ message: '账号未注册', center: true });
          if(res.code==-2) return this.$message({ message: '帐号密码不匹配', center: true });
          if(res.code==0) {
            this.setUser({data:res.data,token:res.token});
            this.$router.push({path: '/'});
          };
        });
      }

      if(this.loginRegister==2){
        this.api_register(param).then((res) => {
          if(res.code==-3) return this.$message({ message: '帐号已被占用', center: true });
          if(res.code==0) {
            this.$message({ message: '注册成功', center: true })
            this.loginRegister=1
            this.password=''
          };
        });
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login{ height: 100vh; position: relative;
    .loginBg{filter: blur($size20); width: 100%; height: 100vh; position: absolute; z-index: -1}
    .loginContent{ width: 80%;
      .loginHeader{ width: $size80; height: $size80; border-radius: 50%; border: $size2 solid #fff; margin: 0 auto;}
      h1{ text-align: center; margin: $size14 0 $size80 0; color: #fff;}
      .inputBox{ background-color: rgba(255,255,255,0.2); border-radius: $size4; min-width: 60%;
        input{ background-color: transparent; border: none; width: 85%; line-height: 1; color: #fff;}
        .icon{width: 13%; color: #fff}
        .loginInput{ padding: $size16 $size10;
          &:nth-child(1) {border-bottom: 1px solid #fff;}
        }
      }
      .loginBtn{ color: #fff; border-radius: $size2; width: 100%; border: none; height: $size40; background-color: rgba(255,255,255,0.3); margin: $size30 auto $size15 auto; display: block;}
      h2{ font-size: $size14; color: #fff;
        i{ width: 50%; display: inline-block}
        b{ width: 50%; display: inline-block; text-align: right;}
      }
    }

  }
</style>
