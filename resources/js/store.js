import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        onboarding:{
            creator: null,
            verified: false,
        },
        user: {
            token: null,
            role: null,
        },
        isLoggedIn: false,
    },

    mutations:{
        setUserProperties(state, user){
            state.isLoggedIn = true;
            state.user = user;
            // let token = "Bearer " + user.token;
            //save user data to localStorage
            localStorage.setItem('user', JSON.stringify(user))
            // axios.defaults.headers.common['Authorization'] = token;
        },

        /**
         * 
         * @param {Vue store} state 
         * @param {The user creating the organization} creator 
         */
        setCreator(state, creator){
            state.onboarding.creator = creator.data;
        },


        setVerifiedStatus(state, response){
            state.onboarding.verified = response.verified;
        },

        clearUserData () {
            localStorage.removeItem('user')
            location.href = "/login"; //redirect to login
        }
    },

    actions: {
        init ({ commit }, form) {
          return form.post('/api/users')
            .then(response => {
                commit('setCreator', response);
            })
            .catch(err => {
                console.log(err);
            });
        },

        verifyUser({commit}, form) {
            return form.put('/api/users/verify')
            .then(response => {
                commit('setVerifiedStatus', response)
                return response;
            })
            .catch(err => {
                console.log(err);
            })
        },

        createOrg({commit}, form){
            return form.post('/api/organizations')
            .then(response => {
                // commit('')
                return response;
            })
            .catch(err => {
                console.log(err);
            })
        },
        
        logout ({ commit }) {
            commit('clearUserData')
        }
    },

    getters: {
        role: state => {
          return state.user.role;
        },

        creatorEmail: state => {
            return state.onboarding.creator.email;
        },

        creator: state => {
            return state.onboarding.creator;
        },

        token: state => {
            return state.user.token;
        }
    }
    
});