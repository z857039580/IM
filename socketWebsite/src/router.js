import Vue from 'vue'
import Router from 'vue-router'

import loginAfter from './view/loginAfter.vue'
import main from './view/main/main.vue'
import message from './view/main/message.vue'
import contacts from './view/main/contacts.vue'
import friends from './view/main/friends.vue'
import me from './view/main/me.vue'

import personal from './view/personal.vue'

import chat from './view/chat.vue'

import loginORregister from './view/loginORregister.vue'

import addList from './view/addList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginAfter',
      component: loginAfter,
      children: [
        {
          path: '/',
          name: 'mainView',
          component: main,
          children: [
            {
              path: '/',
              name: 'mainMessage',
              component: message
            },
            {
              path: '/contacts',
              name: 'contacts',
              component: contacts
            },
            {
              path: '/friends',
              name: 'friends',
              component: friends
            },
            {
              path: '/me',
              name: 'me',
              component: me
            }
          ]
        },{
          path: '/personal/:userId',
          name: 'personal',
          component: personal
        },{
          path: '/chat/:userId',
          name: 'chat',
          component: chat,
        },{
          path: '/addList',
          name: 'addList',
          component: addList,
        },
      ]
    },{
      path: '/loginORregister',
      name: 'loginORregister',
      component: loginORregister,
    }
  ]
})
