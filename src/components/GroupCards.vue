<template>
  <div class="group group-cards">
    <div class="group-header">
      <h2 class="group-title">{{title}}</h2>
      <button class="btn group-btn-delete">
        <i class="material-icons group-icon-delete" v-if="custom">delete</i>
      </button>
    </div>
    <CardItem
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :description="card.description"
      :done="card.done"
    />
    <button class="btn group-btn-add">
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

  components: {
    CardItem
  }
}
</script>