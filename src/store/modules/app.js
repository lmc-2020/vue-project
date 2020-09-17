const state = {
  isOpenMenu:
    (document.documentElement.clientWidth || window.innerWidth) < 901
      ? false
      : true
};

const mutations = {
  UPDATE_ISOPENMENU(state) {
    state.isOpenMenu = !state.isOpenMenu;
  }
};

const actions = {
  updateIsOpenMenu({ commit }) {
    commit("UPDATE_ISOPENMENU");
  }
};

export default {
  state,
  mutations,
  actions
};
