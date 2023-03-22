import { T } from "./types";

export const mutations = {
  [T.SET_LOGIN_USER_INFO](state, loginUser) {
    console.log("mutation SET_LOGIN_USER_INFO")
    console.log(loginUser)
    state.loginUser = loginUser
  },
};
