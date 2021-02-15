<template>
  <div>
    <button v-if="!isLogin" @click="onClickLogin">googleでログイン</button>
    <div v-if="isLogin" class="d-flex">
      <v-chip pill>
        <v-avatar size="30" class="mr-3">
          <v-img :src="photoURL" contain max-width="30" />
        </v-avatar>
        <span justify="center" align-content="center">
          {{ displayName }}さん
        </span>
      </v-chip>
      <button class="mx-5" @click="onClickLogout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'Vuex'

export default {
  data() {
    return {
      uploading: false,
      uploaded: false,
    }
  },
  computed: mapState({
    isLogin: (state) => state.user.isLogin,
    displayName: (state) => state.user.displayName,
    photoURL: (state) => state.user.photoURL,
  }),
  mounted: function () {
    this.statusCheck()
  },
  methods: {
    ...mapActions({
      statusCheck: 'user/statusCheck',
      login: 'user/login',
      logout: 'user/logout',
    }),
    onUploadEnd() {
      this.uploading = false
      this.uploaded = true
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
