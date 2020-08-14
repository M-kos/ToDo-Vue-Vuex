<template>
  <div class="card-item" draggable="true">
    <div class="card-item-header">
      <label
        class="check"
        :class="{ checked: card.done }"
        @click.prevent="changeCardStatus(card.id)"
      >
        <input class="check-input" type="checkbox">
        <i class="material-icons check-icon" v-if="card.done">done</i>
      </label>
      <h3 class="card-item-title" :class="{ 'line-through': card.done }">{{card.title}}</h3> 
      <div class="flex-fill"></div>
      <button class="btn card-item-btn-delete" @click.prevent="toggleShowModal">
        <i class="material-icons">delete</i>
      </button>
    </div>
    <div class="card-item-desctiption" :class="{ 'line-through': card.done }">{{card.description}}</div>
    <ConfirmModal
      v-if="showConfirmModal"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import ConfirmModal from './ConfirmModal.vue'
import { mapActions } from 'vuex'

export default {
  name: "CardItem",

  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      showConfirmModal: false
    }
  },

  methods: {
    toggleShowModal() {
      this.showConfirmModal = !this.showConfirmModal
    },

    onConfirm(event) {
      if(event) {
        this.deleteItem({
          id: this.card.id,
          name: 'cards'
        })
      }
      
      this.toggleShowModal()
    },

    ...mapActions([
      'changeCardStatus',
      'deleteItem'
    ])
  },

  components: {
    ConfirmModal
  }
};
</script>