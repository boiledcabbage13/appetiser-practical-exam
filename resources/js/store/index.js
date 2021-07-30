import Vue from "vue";
import Vuex from "vuex";

import {
  RESET_STATE
} from "./mutations.type";

import event from "../modules/event/utils/event.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    MODULE_RESET_STATE(context, payload) {
      let module = payload.module;
      let resetStatePath = `${module}/${RESET_STATE}`;

      /**
       * NOTE: 
       * This is for validation of payload.
       * payload.resetAll must be false and
       * have value for payload.resetKey
       */
      if (!payload.resetAll && payload.resetKey) {
        context.commit(resetStatePath, payload.resetKey);

        return;
      }

      if (payload.resetAll) {
        context.commit(resetStatePath, null);

        return;
      }
    }
  },
  modules: {
    event
  }
});
