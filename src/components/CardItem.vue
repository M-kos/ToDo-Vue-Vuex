<template>
  <div
    class="card-item"
    :class="{'drag-start': isDrag}"
    draggable="true"
    @dragstart="dragHandler"
    @dragend="dragHandler"
  >
    <div class="card-item-header">
      <label
        class="check"
        :class="{ checked: card.done }"
        @click.prevent="changeCardStatus(card.id)"
      >
        <input class="check-input" type="checkbox">
        <i class="material-icons check-icon" v-if="card.done">done</i>
      </label>

      <h3 class="card-item-title text-overflow" :class="{ 'line-through': card.done }">
        {{card.title}}
      </h3> 

      <div class="flex-fill"></div>

      <button class="btn card-item-btn-delete" @click.prevent="toggleShowModal">
        <i class="material-icons">delete</i>
      </button>
    </div>

    <div class="card-item-desctiption">
      <span ref="textCotainer" :class="{ 'line-through': card.done }">
        {{card.description}}
      </span>

      <div class="flex-fill"></div>

      <button class="btn" @click="handlerTextContainer" v-if="isLongString">
        <i class="material-icons">
          {{isExpand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
        </i>
      </button>
    </div>

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
      showConfirmModal: false,
      isDrag: false,
      isExpand: false,
      isLongString: false
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

    dragHandler(event) {
      event.dataTransfer.setData('text/plain', this.card.id)
      this.isDrag = !this.isDrag
    },

    handlerTextContainer() {
      this.isExpand = !this.isExpand

      this.$refs.textCotainer.classList.toggle('expand')
    },

    ...mapActions([
      'changeCardStatus',
      'deleteItem'
    ])
  },

  mounted() {
    if (this.$refs && this.$refs.textCotainer && this.$refs.textCotainer.offsetWidth > 600) {
      this.$refs.textCotainer.style.display = 'block'
      this.$refs.textCotainer.style.width = '90%'
      this.isLongString = true
    }
  },

  components: {
    ConfirmModal
  }
};
</script>