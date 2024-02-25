<template>
  <!-- <div>Quest page {{ qst.familyId }}</div> -->
  <div class="q-gutter-sm q-ma-md">
    <!-- <q-badge color="secondary" multi-line>
      qmModel: "{{ qmModel.id }}"
    </q-badge>
    <q-badge color="secondary" multi-line>
      qmModel: "{{ heroModel.id }}"
    </q-badge>
    <q-badge color="secondary" multi-line>
      qmModel: "{{ quest.title }}"
    </q-badge> -->
    <q-select
      filled
      v-model="qmModel"
      :options="questMasters"
      label="Квест от..."
    />
    <q-select
      filled
      v-model="heroModel"
      :options="heroes"
      label="Выберите героя..."
    />
    <q-separator color="orange" inset />
    <q-input filled v-model="quest.title" label="Квест" />
    <q-input
      filled
      v-model="quest.description"
      type="textarea"
      label="Подробный рассказ о квесте"
    />
    <q-input filled v-model="quest.cost" label="Награда" />
    <q-input filled v-model="quest.diamonds" label="Кристалы" />
    <q-separator color="orange" inset />
    <q-btn color="primary" label="Сохранить" icon="save" @click="saveQuest" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuestStore } from "stores/example-store";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "QuestPage",
  setup() {
    const $q = useQuasar();
    const qst = useQuestStore();
    const router = useRouter();

    const questMasters = ref([]);
    const qmModel = ref("");

    const heroes = ref([]);
    const heroModel = ref("");

    const quest = ref();
    quest.value = { title: "", description: "", cost: 0, diamonds: 0 };

    function loadQuest() {
      console.log(qst.questId);
      if (qst.questId === undefined) return;
      if (qst.questId === 0) return;
      api
        .get("/quest/" + qst.questId)
        .then((response) => {
          quest.value = response.data;
          heroModel.value = {
            ...quest.value.hero,
            label: quest.value.hero.name,
            value: quest.value.hero.id,
          };
          qmModel.value = {
            ...quest.value.questMaster,
            label: quest.value.questMaster.name,
            value: quest.value.questMaster.id,
          };
          console.log(quest.value);
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }

    function loadQuestMasters(familyId) {
      api
        .get("/qms/" + familyId)
        .then((response) => {
          questMasters.value = response.data.map((qm) => ({
            ...qm,
            label: qm.name,
            value: qm.id,
          }));
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }

    function loadHeroes(familyId) {
      api
        .get("/heroes/" + familyId)
        .then((response) => {
          heroes.value = response.data.map((hero) => ({
            ...hero,
            label: hero.name,
            value: hero.id,
          }));
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }

    function saveQuest() {
      if (qst.questId === undefined || qst.questId === 0) {
        console.log("save new quest");
        api
          .post("quests/save", {
            title: quest.value.title,
            description: quest.value.description,
            cost: quest.value.cost,
            diamonds: quest.value.diamonds,
            status: "NEW",
            tavern: { id: 1 },
            questMaster: { id: qmModel.value.id },
            hero: { id: heroModel.value.id },
            family: { id: qst.familyId },
          })
          .then((response) => {
            router.push("tavernquests");
          })
          .catch(() => {
            $q.notify({
              color: "negative",
              position: "top",
              message: "Save tavern failed",
              icon: "report_problem",
            });
          });
      } else {
        console.log("update quest");
        api
          .post("quests/save", {
            id: qst.questId,
            title: quest.value.title,
            description: quest.value.description,
            cost: quest.value.cost,
            diamonds: quest.value.diamonds,
            status: "NEW",
            tavern: { id: 1 },
            questMaster: { id: qmModel.value.id },
            hero: { id: heroModel.value.id },
            family: { id: qst.familyId },
          })
          .then((response) => {
            router.push("tavernquests");
          })
          .catch(() => {
            $q.notify({
              color: "negative",
              position: "top",
              message: "Save tavern failed",
              icon: "report_problem",
            });
          });
      }
      qst.questId = 0;
    }

    loadQuest();
    loadQuestMasters(qst.familyId);
    loadHeroes(qst.familyId);

    return { qst, questMasters, qmModel, heroes, heroModel, quest, saveQuest };
  },
});
</script>
