const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "family", component: () => import("pages/FamilyPage.vue") },
      { path: "qm", component: () => import("pages/QuestMasterPage.vue") },
      { path: "hero", component: () => import("pages/HeroesPage.vue") },
      { path: "quest", component: () => import("pages/QuestPage.vue") },
      {
        path: "tavernquests",
        component: () => import("pages/TavernQuestsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
