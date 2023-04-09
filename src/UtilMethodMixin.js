import { mapGetters } from "vuex";
import { getDatabase, ref, set, child, get, } from 'firebase/database';
import { getAuth, signOut, } from "firebase/auth";
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
            const date = new Date();
            const timezone = -date.getTimezoneOffset() / 60

            var today = new Date(timestamp) // -> 타임스탬프를 넣어주면 날짜로 변환
            today.setHours(today.getHours() + timezone);
            return today.toISOString().replace('T', ' ').substring(0, 16)
        },
        convertedDateFormatEnglish(timestamp) {
            const date = new Date();
            const timezone = -date.getTimezoneOffset() / 60

            var today = new Date(timestamp) // -> 타임스탬프를 넣어주면 날짜로 변환
            today.setHours(today.getHours() + timezone);
            let yyyy = today.toISOString().replace('T', ' ').substring(0, 4)
            let mm = today.toISOString().replace('T', ' ').substring(5, 7)
            let dd = today.toISOString().replace('T', ' ').substring(8, 10)
            return dd + " " + this.convertedMonthsEnglish(mm) + " " + yyyy
        },
        convertedMonthsEnglish(month) {
            const currentMonth = parseInt(month);

            let returnValue = currentMonth;

            switch (currentMonth) {
                case 1:
                    returnValue = "January"
                    break;
                case 2:
                    returnValue = "February"
                    break;
                case 3:
                    returnValue = "March"
                    break;
                case 4:
                    returnValue = "April"
                    break;
                case 5:
                    returnValue = "May"
                    break;
                case 6:
                    returnValue = "June"
                    break;
                case 7:
                    returnValue = "July"
                    break;
                case 8:
                    returnValue = "August"
                    break;
                case 9:
                    returnValue = "September"
                    break;
                case 10:
                    returnValue = "October"
                    break;
                case 11:
                    returnValue = "November"
                    break;
                case 12:
                    returnValue = "December"
                    break;

                default:
                    break;
            }
            return returnValue
        },
        timeSince(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
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
        },
        logout() {
            const auth = getAuth();
            const thisObj = this;
            signOut(auth)
                .then(() => {
                    thisObj.$q.notify({
                        position: 'top',
                        timeout: 500,
                        message: 'logout',
                        icon: 'announcement',
                    });
                })
                .catch((error) => {
                    // An error happened.
                });
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    }
};
export default UtilMethodMixin;
