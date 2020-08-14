<template>
  <div id="app">
    <div class="groups main-groups">
      <GroupCards
        v-for="group in mainGroup"
        :key="group.id"
        :title="group.title"
        :cards="group.cards"
      />
    </div>
    <div class="groups created-groups">
      <div class="created-groups-header">
        <button class="btn" type="button">Add Group</button>
      </div>
      <GroupCards 
        v-for="group in customGroups"
        :key="group.id"
        :title="group.title"
        :cards="group.cards"
        :custom="group.custom"
      />
    </div>
  </div>
</template>

<script>
import GroupCards from './components/GroupCards.vue'

export default {
  name: 'App',

  data() {
    return {
      groupsCard: [
        {
          id: 1,
          title: 'main',
          custom: false,
          cards: [
            {
              id: 1,
              title: 'Test',
              description: 'test test test test test',
              done: false
            },
            {
              id: 2,
              title: 'Test',
              description: 'test test test test test',
              done: false
            },
            {
              id: 3,
              title: 'Test',
              description: 'test test test test test',
              done: false
            }
          ]
        },
        {
          id: 2,
          title: 'custom',
          custom: true,
          cards: [
            {
              id: 1,
              title: 'Test',
              description: 'test test test test test',
              done: false
            },
            {
              id: 2,
              title: 'Test',
              description: 'test test test test test',
              done: false
            },
            {
              id: 3,
              title: 'Test',
              description: 'test test test test test',
              done: false
            }
          ]
        },
        {
          id: 3,
          title: 'custom',
          custom: true,
          cards: []
        }
      ]
    }
  },

  computed: {
    mainGroup() {
      return this.groupsCard.filter((group) => !group.custom)
    },

    customGroups() {
      return this.groupsCard.filter((group) => group.custom)
    }
  },

  components: {
    GroupCards
  }
}
</script>
