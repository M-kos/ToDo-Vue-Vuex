import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key = {
  groups: 'groups',
  cards: 'cards'
}

export default new Vuex.Store({
  state: {
    groups: [
      {
        id: 1,
        title: 'main',
        custom: false
      }
    ],

    cards: []
  },

  mutations: {
    setData(state, payload) {
      state[payload.name] = payload.value
    },

    saveData(state, name) {
      localStorage.setItem(key[name], JSON.stringify(state[name]))
    },

    changeCardStatus(state, id) {
      state.cards = state.cards.map((card) => {
        if (card.id === id) {
          card.done = !card.done
        }

        return card
      })
    },

    changeItemGroup(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card.id === payload.id) {
          card.groupId = payload.groupId
        }

        return card
      })
    }
  },

  actions: {
    getData({ commit }) {
      try {
        const groups = localStorage.getItem(key.groups)
        const cards = localStorage.getItem(key.cards)

        if (groups) {
          commit('setData', {
            value: JSON.parse(groups),
            name: 'groups'
          })
        }

        if (cards) {
          commit('setData', {
            value: JSON.parse(cards),
            name: 'cards'
          })
        }
      } catch (error) {
        console.error(error)
      }
    },

    deleteItem({ commit, state }, payload) {
      commit(
        'setData',
        {
          value: state[payload.name].filter((item) => item.id !== payload.id),
          name: payload.name
        }
      )
      commit('saveData', payload.name)
    },

    addItem({ commit, state }, payload) {
      commit('setData', {
        value: [...state[payload.name], payload.item],
        name: payload.name
      })
      commit('saveData', payload.name)
    },

    changeCardStatus({ commit }, id) {
      commit('changeCardStatus', id)
      commit('saveData', 'cards')
    },

    changeItemGroup({ commit }, payload) {
      commit('changeItemGroup', payload)
      commit('saveData', 'cards')
    }
  },

  getters: {
    groups: (state) => state.groups,
    cards: (state) => state.cards
  }
})
