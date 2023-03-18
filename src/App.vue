<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { T } from './store/module-example/types';
import { getAuth,   onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, child, get } from 'firebase/database';
export default {
  name: "App",
  mounted(){
    const thisObj = this;
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('change!');
      if (user) {
        console.log('login완료!');
        console.log(user);
        const uid = user.uid;

        console.log(`uid is ${uid}`);
        const dbRef = ref(getDatabase());
        let nickname = ""
        setTimeout(() => {
          
          get(child(dbRef, `users/${uid}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                // console.log(snapshot.val());
                const data = snapshot.val();
                nickname = data.nickname;
                thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                  email: user.email,
                  nickname,
                  uid: user.uid,
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }, 1000);
      } else {

        thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
          nickname: null,
          email: null,
          uid: null,
        });
      }
    });
  }
};
</script>
