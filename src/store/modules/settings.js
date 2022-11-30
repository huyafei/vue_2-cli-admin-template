import variables from "@/assets/styles/element-variables.module.scss";
import defaultSettings from "@/settings";

const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  isSearch,
  supportPinyinSearch,
  isScreenFull,
  isSizeSelect,
  isLangSelect,
} = defaultSettings;

const state = {
  theme: variables.theme,
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  isSearch,
  supportPinyinSearch,
  isScreenFull,
  isSizeSelect,
  isLangSelect,
};

const mutations = {
  /**
   * 修改配置
   * @param state
   * @param key
   * @param value
   * @constructor
   */
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
