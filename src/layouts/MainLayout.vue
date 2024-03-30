<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Geo Vet Care </q-toolbar-title>

        <div class="q-pr-md">Hi, {{ name }}</div>
        <q-btn round flat color="white" icon="logout" @click="logout">
          <q-tooltip
            content-class="primary"
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            Logout
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      show-if-above
      bordered
      behavior="desktop"
      class="bg-aside"
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-main">
      <router-view :key="route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "Customer",
    icon: "person",
    link: "/customer",
  },
  {
    title: "Pets",
    icon: "pets",
    link: "/pets",
  },
  {
    title: "Groceries",
    icon: "storefront",
    link: "/groceries",
  },
  {
    title: "Medicine",
    icon: "medication",
    link: "/medicine",
  },
  {
    title: "Grooming",
    icon: "shower",
    link: "/grooming",
  },
  {
    title: "Clinic",
    icon: "local_hospital",
    link: "/clinic",
  },
  {
    title: "Store",
    icon: "storefront",
    link: "/store",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    // const user = computed(() => store.state.global.userProfile.username);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const name = ref("");
    const user = computed(() => store.getters["global/getUser"]);
    // const [header, data, signature] = sessionStorage.getItem("authUser").split(".");
    // const name = JSON.parse(atob(data)).name;

    onMounted(() => {
      // if (sessionStorage.getItem("authUser")) {
      //   // console.log("ada");
      // } else {
      //   // console.log("ga ada");
      //   router.push("/login");
      // }
      // console.log("user value", name);
      console.log("user value", user);
      if (!user.value.name) {
        router.push("/login");
      } else {
        name.value = user.value.name;
      }
    });

    const logout = () => {
      localStorage.removeItem("authUser");
      localStorage.clear();
      router.push("/login");
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      name,
      route,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
