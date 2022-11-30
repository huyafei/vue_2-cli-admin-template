<template>
  <div class="app-container">个人中心</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar,
      };
    },
  },
};
</script>
