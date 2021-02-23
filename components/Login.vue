<template>
  <div>
    <button v-if="!isLogin" @click="onClickLogin">googleでログイン</button>
    <div v-if="isLogin" class="d-flex">
      <v-dialog v-model="dialog" width="500">
        <template #activator="{ on, attrs }">
          <v-chip pill v-bind="attrs" v-on="on">
            <v-avatar size="30" class="mr-3">
              <v-img :src="photoURL" contain max-width="30" />
            </v-avatar>
            <span justify="center" align-content="center">
              {{ displayName }}さん
            </span>
          </v-chip>
        </template>

        <v-card>
          <v-text-field
            v-model="nickname"
            label="nickname"
            single-line
            :append-outer-icon="'mdi-floppy'"
            @click:append-outer="saveNickname"
          />
        </v-card>
      </v-dialog>

      <button class="mx-5" @click="onClickLogout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      nickname: '',
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      displayName: (state) => state.user.displayName,
      photoURL: (state) => state.user.photoURL,
    }),
    reversedMessage() {
      return this.nickname !== ''
    },
  },
  mounted: function () {
    this.statusCheck()
  },
  methods: {
    ...mapActions({
      statusCheck: 'user/statusCheck',
      login: 'user/login',
      logout: 'user/logout',
      saveNewNickName: 'user/saveNewNickName',
    }),
    saveNickname() {
      this.saveNewNickName(this.nickname)
      this.dialog = false
    },
    onClickLogin() {
      this.login()
    },
    onClickLogout: function () {
      this.logout()
    },
  },
}
</script>
