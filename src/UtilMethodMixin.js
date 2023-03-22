import { mapGetters } from "vuex";
import { getDatabase, ref, set, child, get } from 'firebase/database';
let UtilMethodMixin = {
    methods: {
        getAvatarIsDefault() {
            console.log(this.nickname)
            return this.nickname.slice(0, 1)
        },
        showLoading(message) {
            if (message) {
                this.$q.loading.show({
                    message
                });
            } else {
                this.$q.loading.show();
            }
        },
        hideLoading() {
            this.$q.loading.hide();
        },
        successMessage(message) {
            this.$q.notify({
                position: "top",
                timeout: 1000,
                message,
                icon: "announcement"
            });
        },
        errorMessage(message) {
            this.$q.notify({
                position: "top",
                timeout: 1000,
                message,
                icon: "announcement"
            });
        },
        createNowTime() {
            var today = new Date().valueOf(); // -> 정렬을 위해 타임스탬프로 저장.
            return today
        },
        convertedDateFormat(timestamp) {
            var today = new Date(timestamp) // -> 타임스탬프를 넣어주면 날짜로 변환
            today.setHours(today.getHours() + 9);
            return today.toISOString().replace('T', ' ').substring(0, 19)
        },

        getUserProfile(uid) {
            return new Promise(resolve => {
                setTimeout(async () => {
                    if (!window.users) {
                        window.users = [];
                    }
                    const currentUser = window.users.filter(user => user.uid === uid)[0]
                    if (!currentUser) {
                        const dbRef = ref(getDatabase());
                        await get(child(dbRef, `users/${uid}`))
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    // console.log(snapshot.val());
                                    const data2 = snapshot.val();
                                    window.users.push({
                                        ...data2,
                                        uid
                                    })
                                    resolve({
                                        ...data2,
                                        uid
                                    })
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    } else {
                        resolve(currentUser)
                    }
                }, 0);
            })
        }
    }
};
export default UtilMethodMixin;
