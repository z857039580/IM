<template>
  <div class="addList">
    <ul class="friendList">
      <li>
        <router-link to="/material">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
            <h1>名字</h1>
          </span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/material">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
            <h1>名字</h1>
          </span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/material">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
            <h1>名字</h1>
          </span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/material">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
            <h1>名字</h1>
          </span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/material">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
            <h1>名字</h1>
          </span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/material">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
            <h1>名字</h1>
          </span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '../store';
export default {
  name: 'addList',
  data () {
    return {
      avatarImgStyle: {
        'background-image': "url('static/images/header.jpg')"
      }
    }
  },
  mounted: function () {
    let param = {userId: store.user.data.userId};
    this.api_listOfFriends(param).then((res) => {
      console.log("-----------添加好友列表")
      console.log(res)
    });

  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .addList{
    ul.friendList{
      li{ padding: $size10 0  $size10 $size10; border-bottom: $borderGray solid 1px;
        .contactsInfo{ height: $size38; position: relative;
          span{ display: block;}
          .avatarImg{ height: $size38; width: $size38; position: absolute; top: 0; left: 0; border-radius: $size2}
          .contacts{ padding-left: $size48;
            h1{ font-size: $size15; line-height: $size38}
          }
        }
      }

    }

  }
</style>
