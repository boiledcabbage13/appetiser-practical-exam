import {
    SHOW_SNACKBAR,
    // RESET_STATE
} from "../../../store/mutations.type"

const getDefaultState = () => {
    return {
        showSnackBar: true
    }
}

const state = getDefaultState()

const mutations = {
    [SHOW_SNACKBAR](state, payload) {
        state.showSnackBar = payload
        console.log({ state })
    },
}

const actions = {}

const getters = {
    showSnackBar: state => state.showSnackBar,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};