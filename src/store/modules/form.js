import router from "../../router";
import request from "../../utils/request";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  step: {
    payAccount: "123456"
  }
};

const actions = {
  async submitStepForm({ commit }, payload) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payload.payload
    });
    commit("saveStepFormData", payload);
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
