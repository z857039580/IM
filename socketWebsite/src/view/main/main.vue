<template>
  <div class="mainView">
    <header>微信
      <el-popover placement="bottom" trigger="click" popper-class="addPopover" v-model="plusIconPopover">
          <slot>
            <ul @click="plusIconPopover = false">
              <li><font-awesome-icon icon="comment" />创建群聊</li>
              <li @click="findFriendsEldialog = true"><font-awesome-icon icon="user-plus" />添加好友</li>
            </ul>
          </slot>
          <i slot="reference" class="addIcon"><font-awesome-icon :icon="['fas', 'plus']" /></i>
      </el-popover>
    </header>

    <div class="content">
      <router-view></router-view>
    </div>

    <footer>
      <ul>
        <li><router-link to="/"><i><font-awesome-icon :icon="['far', 'comment']" /></i><br><b>消息</b></router-link></li>
        <li><router-link to="/contacts"><i><font-awesome-icon :icon="['far', 'address-book']" /></i><br><b>通讯录</b></router-link></li>
        <li><router-link to="/friends"><i><font-awesome-icon :icon="['far', 'compass']" /></i><br><b>朋友圈</b></router-link></li>
        <li><router-link to="/me"><i><font-awesome-icon :icon="['far', 'user']" /></i><br><b>我</b></router-link></li>
      </ul>
    </footer>

    <el-dialog :visible.sync="findFriendsEldialog" width="94%" custom-class="searchBoxEldialog" center>
      <Slot class="dialogContent">
        <h2>添加联系人/群聊</h2>

        <el-input class="searchInput" placeholder="微信号/群号/群名称" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" @click="searchFriend"></el-button>
        </el-input>

        <div v-if="searchResult.data!=null">
          <ul>
            <li>
              <router-link :to="{name:'personal', params:{ 'userId':searchResult.data.userId}}">
                <div class="contactsInfo">
                  <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
                  <span class="contacts centerTop">
                    <h1><i v-if="searchResult.data.nickname!=null">{{searchResult.data.userId}}</i><i v-else>{{searchResult.data.userId}}</i></h1>
                    <p>{{searchResult.data.signature}}</p>
                  </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="searchResult.data==null && searchResult.code==0" class="unsearched"><i class="el-icon-info"></i>未搜索到用户</div>
      </Slot>
    </el-dialog>

  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
  export default {
  name: 'mainView',
  data () {
    return {
      plusIconPopover:false,
      avatarImgStyle: {
        'background-image': "url('static/images/header.jpg')"
      },
      findFriendsEldialog:false,
      searchValue:'',
      searchResult:{},
    }
  },
  computed:{
  },
  mounted: function () {/*渲染前执行*/
  },
  methods: {
    searchFriend (){
      let param = {
          userId: this.searchValue,
      };
      this.api_searchUser(param).then((res) => {
        this.searchResult = res;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  header{ z-index: 2; color: #fff; background-color: #38383d; height: $size44; font-size: $size18; line-height: $size44; position: fixed; top: 0; left: 0; width: 100%; text-align: center;}
  .content{ padding: $size44 0 $size50 0;}
  footer { color: $colorGray; background-color: #fff; position: fixed; bottom: 0; left: 0; width: 100%;border-top: 1px solid $borderGray; padding: $size5 0;
    ul{
      li{ float: left; width: 25%; font-size: $size12; text-align: center;
        i{ font-size: $size22;}
      }
    }
  }

</style>
