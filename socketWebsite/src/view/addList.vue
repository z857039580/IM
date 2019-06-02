<template>
  <div class="addList">
    <div>
      <p class="addTime">近三天</p>
      <ul class="friendList">
          <li v-for="addList in getAddMsg">
            <router-link :to="{name:'personal', params:{ 'userId':addList.fromUser}}">
              <div class="contactsInfo">
                <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
                <span class="contacts">
                  <h1>addList.fromUser</h1>
                  <p>11111111111</p>
                </span>
                <button class="lookOver">查看</button>
                <!--<b class="otherStatus">已添加</b>-->
                <!--<b class="otherStatus">已过期</b>-->
              </div>
            </router-link>
          </li>
      </ul>
    </div>

    <div>
      <p class="addTime">三天前</p>
      <ul class="friendList">
        <li>
          <router-link to="/material">
            <div class="contactsInfo">
              <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
              <span class="contacts">
              <h1>名字</h1>
              <p>11111111111</p>
            </span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
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
  },
  computed: {
    ...mapGetters(['getAddMsg']),
  },
  methods: {}
}
</script>


<style lang="scss" scoped>
  .addList{
    .addTime{ background-color: $colorBg; line-height: 1;padding: $size8 $size10 $size5 $size10; font-size: $size12}
    ul.friendList{
      li{ padding: $size10 0  $size10 $size10; border-bottom: $borderGray solid 1px;
        .contactsInfo{ height: $size38; position: relative;
          span{ display: block;
            &.avatarImg{ height: $size38; width: $size38; position: absolute; top: 0; left: 0; border-radius: $size2}
            &.contacts{ padding-left: $size48;
              h1{ font-size: $size15; margin-bottom: $size6}
              p{ font-size: $size12; color: $colorGray2}
            }
          }
          .lookOver{ position: absolute; right: $size10; top: $size5; border: 1px solid $borderGray;background-color: #f8f8f8; color: $colorBlack; height: $size28; border-radius: $size4; width: 3.5em;}
          .otherStatus{ position: absolute; right: $size10; top: 0; line-height: $size38; color: $colorGray2}
        }
      }

    }
  }
</style>
