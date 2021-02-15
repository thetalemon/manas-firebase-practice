<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <Login />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="abs" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  components: {
    Login,
  },
  data() {
    return {
      title: '画像アップローダー',
      abs: true,
    }
  },
}
</script>
