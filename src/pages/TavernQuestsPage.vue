<template>
  <div class="q-pa-md text-h6">Имя таверны:</div>
  <div class="q-gutter-sm text-left text-h5">
    <q-input class="text-h5" filled v-model="tavern.description" />
    <q-btn
      class="q-ml-md"
      color="primary"
      label="Сохранить"
      icon="save"
      @click="saveTavern"
    />
  </div>

  <q-separator class="q-ma-md" color="orange" inset />
  <div class="q-pa-md text-h6">Квесты:</div>

  <div class="q-pl-md">
    <q-table
      flat
      bordered
      :rows="data"
      no-data-label="I didn't find anything for you"
      hide-header
      hide-bottom
      class="q-mr-md"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'meeting_room' : 'door_front'"
            />
          </q-td>
          <q-td>
            <span style="font-size: larger"
              >{{ props.row.title }} [Награда: {{ props.row.cost }}]</span
            >
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="q-gutter-sm text-left">
              <p>
                {{ props.row.description }}
              </p>
              <p>Герой: {{ props.row.hero.name }}</p>
              <div class="q-gutter-md">
                <q-btn
                  color="secondary"
                  label="Изменить"
                  to="quest"
                  icon="edit"
                  @click="editQuest(props.row.id)"
                  >{{ props.row.id }}</q-btn
                >
                <q-btn
                  color="red"
                  label="Удалить"
                  icon="delete"
                  @click="deleteQuest(props.row.id)"
                />
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <div class="q-pa-md">
    <q-btn
      color="primary"
      label="Новый Квест!"
      icon="add"
      to="quest"
      @click="newQuest"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useQuestStore } from "stores/example-store";

export default defineComponent({
  name: "QMPage",
  setup() {
    const $q = useQuasar();
    const data = ref([]);
    const tavern = ref({ description: "loading..." });

    const qst = useQuestStore();
    function newQuest() {
      qst.familyId = 302;
    }

    function editQuest(questId) {
      qst.familyId = 302;
      qst.questId = questId;
    }

    function deleteQuest(questId) {
      api
        .get("/quest/delete/" + questId)
        .then((response) => {
          loadData();
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading tavern failed",
            icon: "report_problem",
          });
        });
    }

    function loadTavernData() {
      api
        .get("/tavern/302")
        .then((response) => {
          tavern.value = response.data;
          console.log(tavern.value);
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading tavern failed",
            icon: "report_problem",
          });
        });
    }

    function loadData() {
      api
        .get("/quests/302")
        .then((response) => {
          data.value = response.data;
          console.log("update quests data");
          console.log(data.value);
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

    function saveTavern() {
      api.post("tavern/save", tavern.value).catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Save tavern failed",
          icon: "report_problem",
        });
      });
    }

    function saveData() {
      api.post("qms/save", data.value).catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Save failed",
          icon: "report_problem",
        });
      });
    }

    loadTavernData();
    loadData();

    return {
      data,
      tavern,
      loadData,
      loadTavernData,
      saveData,
      saveTavern,
      newQuest,
      editQuest,
      deleteQuest,
    };
  },
});
</script>
