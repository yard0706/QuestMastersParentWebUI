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
              >{{ props.row.name }} [{{ props.row.description }}] [{{
                props.row.money
              }}]
            </span>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="q-gutter-sm text-left">
              <q-input filled v-model="props.row.name" label="Имя" />

              <q-input
                filled
                v-model="props.row.description"
                label="Примечение"
              />
              <q-input filled v-model="props.row.money" label="ВВ" />
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
      label="Добавить нового Героя!"
      icon="person_add"
      @click="addNewHero(302)"
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
        .get("/heroes/302")
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
      api.post("heroes/save", data.value).catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Save failed",
          icon: "report_problem",
        });
      });
    }

    function addNewHero(familyId) {
      data.value.push({
        name: "",
        description: "",
        money: 0,
        family: { id: familyId },
      });
    }

    loadData();

    return { data, loadData, saveData, addNewHero };
  },
});
</script>
