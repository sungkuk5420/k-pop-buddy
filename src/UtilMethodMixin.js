import { mapGetters } from "vuex";
let UtilMethodMixin = {
    methods: {
        showLoading () {
            this.$q.loading.show();
        },
        hideLoading () {
            this.$q.loading.hide();
        },
        successMessage (message) {
            this.$q.notify({
                position: "top",
                timeout: 1000,
                message,
                icon: "announcement"
            });
        },
        errorMessage (message) {
            this.$q.notify({
                position: "top",
                timeout: 1000,
                message,
                icon: "announcement"
            });
        },
        createNowTime () {
            var today = new Date().valueOf(); // -> 정렬을 위해 타임스탬프로 저장.
            return today
        },
    }
};
export default UtilMethodMixin;
