<template>
  <div class="group group-cards">
    <div class="group-header">
      <h2 class="group-title">{{title}}</h2>
      <button class="btn group-btn-delete" @click="onDeleteGroup">
        <i class="material-icons group-icon-delete" v-if="custom">delete</i>
      </button>
    </div>
    <div class="group-filters">
      <input class="group-filters-input" type="text" placeholder="Search..." v-model="searchValue">
      <div class="flex-fill"></div>
      <button
        v-for="button in filterButtons"
        :key="button.name"
        class="btn"
        :class="{active: button.name === activeFilter}"
        :name="button.name"
        @click="onClickFilterButton"
      >
        {{button.label}}
      </button>
    </div>
    <CardItem
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :description="card.description"
      :done="card.done"
    />
    <button class="btn group-btn-add" @click="onAddCard">
      <i class="large material-icons group-icon-add">add</i>
    </button>
  </div>
</template>

<script>
import CardItem from './CardItem.vue'

export default {
  name: 'GroupCards',

  props: {
    title: {
      type: String,
      default: ''
    },

    cards: {
      type: Array,
      default: () => ([])
    },

    custom: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      filterButtons: [
        {
          name: 'all',
          label: 'All'
        },
        {
          name: 'active',
          label: 'Active'
        },
        {
          name: 'done',
          label: 'Done'
        }
      ],

      activeFilter: 'all',

      searchValue: ''
    }
  },

  methods: {
    onClickFilterButton(event) {
      this.activeFilter = event.target.name
    },

    onAddCard() {},

    onDeleteGroup() {}
  },

  components: {
    CardItem
  }
}
</script>