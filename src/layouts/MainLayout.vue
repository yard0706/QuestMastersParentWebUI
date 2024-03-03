<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> QM </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuestStore } from "stores/example-store";

const linksList = [
  {
    title: "Семья",
    caption: "Информация и настройки",
    icon: "groups",
    link: "family",
  },
  {
    title: "Квестмастера",
    caption: "Создание, редактирование и удаление",
    icon: "account_circle",
    link: "qm",
  },
  {
    title: "Герои",
    caption: "Создание, редактирование и удаление",
    icon: "face_retouching_natural",
    link: "heros",
  },
  {
    title: "Таверна",
    caption: "Добавление квестов, просмотр состояния",
    icon: "home",
    link: "tavernquests",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const qst = useQuestStore();
    qst.familyId = 302;

    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
