<template>
  <div id="app">
    <div class="groups main-groups">
      <GroupCards
        v-for="group in mainGroup"
        :key="group.id"
        :group="group"
      />
    </div>
    <div class="groups created-groups">
      <div class="created-groups-header">
        <button class="btn" type="button" @click="toggleShowForm">Add Group</button>
      </div>
      <GroupCards 
        v-for="group in customGroups"
        :key="group.id"
        :group="group"
      />
    </div>
    <CreateForm
      name="group"
      v-if="showCreateForm"
      @close="toggleShowForm"
      @create="createGroup"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GroupCards from './components/GroupCards.vue'
import CreateForm from './components/CreateForm.vue'

export default {
  name: 'App',

  data() {
    return {
      showCreateForm: false
    }
  },

  computed: {
    mainGroup() {
      return this.groups.filter((group) => !group.custom)
    },

    customGroups() {
      return this.groups.filter((group) => group.custom)
    },

    ...mapGetters([
      'groups'
    ])
  },

  methods: {
    toggleShowForm() {
      this.showCreateForm = !this.showCreateForm
    },

    createGroup(event) {
      this.addItem({
        item: {...event, custom: true},
        name: 'groups'
      })

      this.toggleShowForm()
    },

    ...mapActions([
      'addItem'
    ])
  },

  components: {
    GroupCards,
    CreateForm
  }
}
</script>
