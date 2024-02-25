<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="data"
      no-data-label="I didn't find anything for you"
      hide-header
      hide-bottom
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
              >{{ props.row.name }} [{{ props.row.familyMemberKind }}]</span
            >
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="q-gutter-sm text-left">
              <q-input filled v-model="props.row.name" label="Имя" />
              <q-input
                filled
                v-model="props.row.familyMemberKind"
                label="Член семьи"
              />
              <q-input
                filled
                v-model="props.row.description"
                label="Примечение"
              />
              <q-input filled v-model="props.row.treasury" label="ВВ" />
              <q-checkbox v-model="props.row.boss" label="Главный КМ" />
              <q-space />
              <q-btn
                color="primary"
                label="Сохранить"
                icon="save"
                @click="saveData"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <div class="q-pa-md">
    <q-btn
      color="primary"
      label="Добавить нового КМ"
      icon="person_add"
      @click="addNewQM(302)"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "QMPage",
  setup() {
    const $q = useQuasar();
    const data = ref([]);

    function loadData() {
      api
        .get("/qms/302")
        .then((response) => {
          data.value = response.data;
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

    function addNewQM(familyId) {
      data.value.push({
        name: "",
        familyMemberKind: "",
        description: "",
        treasury: 0,
        family: { id: familyId },
        boss: true,
      });
    }

    loadData();

    return { data, loadData, saveData, addNewQM };
  },
});
</script>
