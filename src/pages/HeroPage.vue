<template>
  <div class="q-pa-md example-row-equal-width">
    <div class="row">
      <div class="col">
        <div class="flex flex-center text-h5">{{ hero.name }}</div>
        <div class="flex flex-center">
          <img
            alt="Quasar logo"
            src="~assets/super-hero.png"
            style="width: 200px; height: 200px"
          />
        </div>
      </div>
    </div>

    <q-separator class="q-ma-md" color="orange" inset />

    <div class="row">
      <div class="col">
        <span class="text-h6"
          ><q-icon name="account_balance" class="text-orange" size="2em" />
          Накоплено: 100
        </span>
      </div>
      <div class="col">
        <span class="text-h6"
          ><q-icon name="diamond" color="blue" size="2em" />
          Кристаллы: 100
        </span>
      </div>
    </div>
    <q-separator class="q-ma-md" color="orange" inset />
    <div class="q-ma-md">
      <div class="row">
        <div class="col">
          <q-btn color="dark-grey" style="width: 100%">
            <q-icon left size="3em" name="menu_book" />
            <div>Мои квесты</div>
          </q-btn>
        </div>
        <div class="col"></div>
        <div class="col">
          <q-btn color="dark-grey" style="width: 100%">
            <q-icon left size="3em" name="settings_accessibility" />
            <div>Улучшить героя</div>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="flex flex-center">
          <q-btn color="black" style="width: 100%" no-caps>
            <img
              alt="Quasar logo"
              src="~assets/tavern_img.png"
              style="width: 50px; height: 50px; margin-right: 10px"
            />
            <div>
              <div class="text-h6">В таверну...</div>
              за новыми приключениями
            </div>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useQuestStore } from "stores/example-store";

export default defineComponent({
  setup() {
    const hero = ref();
    hero.value = { name: "" };

    function loadHero() {
      let urlParams = new URLSearchParams(window.location.search);
      api
        .get(
          "/hero/" + urlParams.get("familyId") + "/" + urlParams.get("heroId")
        )
        .then((response) => {
          hero.value = response.data;
          console.log(hero.value);
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

    loadHero();

    return { hero };
  },
});
</script>
