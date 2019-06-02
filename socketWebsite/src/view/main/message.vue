<template>
  <div class="message">
    <ul>
      <li v-for="item in listOfFriends">

        <router-link :to="{name: 'chat', params: { 'userId':item.friendUserId }}">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts centerTop">
              <h1>{{item.friendUserId}}</h1>
              <p>信息文本</p>
            </span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex';
export default {
  name: 'message',
  data () {
    return {
      avatarImgStyle: {
        'background-image': "url('static/images/header.jpg')"
      }
    }
  },
  computed:{
    ...mapState(['listOfFriends']),
  },
}
</script>





<style lang="scss" scoped>
  .message{
    ul{
      li{ padding: $size10 0 $size10 $size10; border-bottom: $borderGray solid 1px;
        .contactsInfo{ height: $size50; position: relative;
          span{ display: block;}
          .avatarImg{ height: $size50; width: $size50; position: absolute; top: 0; left: 0; border-radius: $size4}
          .contacts{ padding-left: $size60;
            h1{ font-size: $size15; margin-bottom: $size8;}
            p{ font-size: $size14; color: $colorGray2;}
          }
        }
      }
    }
  }
</style>
