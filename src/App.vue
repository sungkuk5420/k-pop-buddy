<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { T } from './store/module-example/types';
import { getAuth,   onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { getMessaging, getToken } from "firebase/messaging";

export default {
  name: "App",
  mounted(){
    const thisObj = this;
    
    // Add the public key generated from the console here.
    const API_KEY = "BEkLeCBn1jUgDPAk60474y_hw8PW9IC6Z6xghUzqzM7Hfu5rtnKt21plInAM0SNhPVAHHGbklKOpYU0KjcqOCCo";
    // const API_KEY = "6fd58f198bf0fc7891f36d2099380b29dab2b8e8";
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: API_KEY }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log('currentToken')
        console.log(currentToken)
        debugger
      } else {
        debugger
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      debugger
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
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
                thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                  ...data,
                  email: user.email,
                  uid: uid,
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }, 200);
      } else {

        thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, null);
      }
    });
  }
};
</script>
<style lang="scss">
#q-app{
  height: 100%;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ddd;
  &__left{
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__center{
    display: flex;
    align-items: center;
    height: 56px;
    &__text{
      font-family: Spoqa Han Sans Neo;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: center;
    }

  }
  &__right{
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .is-desktop-show{
    display: none !important;
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
  .is-mobile-show{
    display: none !important;
  }
}

</style>

<style>
@font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.ttf') format("truetype");
    font-display: swap;
}
@font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.ttf') format("truetype");
    font-display: swap;
}

</style>