import { T } from "./types";
import { ajaxActions } from "./ajaxActions";

export const actions = {
  [T.AJAX_ACTION]({ commit }, { data, cb }) {
    console.log(`store action [T.AJAX_ACTION] joinUser = ${data}`);
    ajaxActions.joinUser(
      data,
      results => {
        console.log(`action / AJAX_ACTION / success`);
        console.log(" reults=", results);
        if (cb) {
          cb(results);
        }
      },
      res => {
        console.log(`action / AJAX_ACTION / error`, res);
        commit(T.AJAX_ACTION);
      }
    );
  },
  [T.SET_LOGIN_USER_INFO]({ commit }, loginUser) {
    console.log(`store action [T.SET_LOGIN_USER_INFO] loginUser`);
    console.log(loginUser);
    commit(T.SET_LOGIN_USER_INFO, loginUser);
  },
};
