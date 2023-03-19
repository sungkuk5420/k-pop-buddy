import { mapGetters } from "vuex";
let ComputedMixin = {
    computed: {
        ...mapGetters({
            loginUser: "getLoginUser",
        }),
    },
    watch: {
    }
};
export default ComputedMixin;
