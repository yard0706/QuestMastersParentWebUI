<template>
  <!-- <q-page class="flex flex-center"> -->
  <div class="q-ma-md column">
    <q-input v-model="dbFamily.name" label="Семья" stack-label />
    <q-input
      v-model="dbFamily.description"
      label="Примечение"
      type="textarea"
      autogrow
    />
    <q-btn color="primary" label="Сохранить" icon="save" @click="saveData" />
  </div>
  <!-- </q-page> -->
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useQuestStore } from "stores/example-store";

export default defineComponent({
  name: "FamilyPage",
  setup() {
    const $q = useQuasar();
    const data = ref(null);
    const dbFamily = ref("");
    const qst = useQuestStore();

    function loadData() {
      api
        .get("/family/" + qst.familyId + "/552")
        .then((response) => {
          data.value = response.data;
          console.log(data.value);
          dbFamily.value = data.value;
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

    function saveData() {
      api.post("family/save", dbFamily.value).catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Save failed",
          icon: "report_problem",
        });
      });
    }

    loadData();

    return { data, loadData, dbFamily, saveData };
  },
});
</script>
