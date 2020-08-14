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
      },
      {
        id: 2,
        title: 'custom',
        custom: true
      },
      {
        id: 3,
        title: 'custom',
        custom: true
      }
    ],

    cards: [
      {
        id: 1,
        groupId: 1,
        title: 'Test',
        description: 'test test test test test',
        done: false
      },
      {
        id: 2,
        groupId: 2,
        title: 'Test',
        description: 'test test test test test',
        done: true
      },
      {
        id: 3,
        groupId: 2,
        title: 'Test',
        description: 'test test test test test',
        done: false
      }
    ]
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
      })
    }
  },

  actions: {
    getData({ commit }) {
      try {
        const groups = localStorage.getItem(key.groups)
        const cards = localStorage.getItem(key.cards)

        if (groups) {
          commit('setData', JSON.parse(groups), 'groups')
        }

        if (cards) {
          commit('setData', JSON.parse(cards), 'cards')
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
      // commit('saveData', payload.name)
    },

    addItem({ commit, state }, payload) {
      commit('setData', {
        value: [...state[payload.name], payload.item],
        name: payload.name
      })
      // commit('saveData', payload.name)
    },

    changeCardStatus({ commit }, id) {
      commit('changeCardStatus', id)
    },

    changeItemGroup({ commit }, payload) {
      commit('changeItemGroup', payload)
    }
  },

  getters: {
    groups: (state) => state.groups,
    cards: (state) => state.cards
  }
})
