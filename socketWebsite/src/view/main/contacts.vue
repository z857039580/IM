<template>
  <div class="contacts">
    <ul class="otherList">
      <li>
        <router-link to="/addList">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
              新的朋友
              <i v-if="getAddMsg.length>0">{{getAddMsg.length}}</i>
            </span>
          </div>
        </router-link>
      </li>
    </ul>

    <ul class="friendList">
      <li v-for="item in listOfFriends">
        <router-link :to="{name:'personal', params:{ 'userId':item.friendUserId }}">
          <div class="contactsInfo">
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
              <h1>{{item.friendUserId}}</h1>
            </span>
          </div>
        </router-link>

      </li>
    </ul>

  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
  export default {
    name: 'contacts',
    data () {
      return {
        avatarImgStyle: {
          'background-image': "url('static/images/header.jpg')"
        }
      }
    },
    computed:{
      ...mapState(['listOfFriends']),
      ...mapGetters(['getAddMsg']),
    },
    mounted: function () {
    },
    methods: {}
  }
</script>





<style lang="scss" scoped>
  .contacts{
    ul.otherList{ border-top:$size15 solid $colorBg2; border-bottom:$size15 solid $colorBg2;
      li{ padding: $size10 0  $size10 $size10; border-bottom: $borderGray solid 1px;
        .contactsInfo{ height: $size38; position: relative;
          span{ display: block;}
          .avatarImg{ height: $size38; width: $size38; position: absolute; top: 0; left: 0; border-radius: $size2}
          .contacts{ padding-left: $size48; line-height: $size38;
            i{ display: inline-block; color: #fff; min-width: $size12; min-height: $size12; float: right; line-height: 1; text-align: center; font-size: $size12; width: auto; border-radius: 50%; background-color: #ff0000; padding: $size2; margin: $size10 $size10 0 0;}
            &:after{ display: block; content: ''; clear: both;}
          }
        }
      }

    }
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
