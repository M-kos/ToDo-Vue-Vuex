<template>
  <div class="group group-cards">
    <div class="group-header">
      <h2 class="group-title">{{group.title}}</h2>
      <button class="btn group-btn-delete" @click="toggleShow('modal')">
        <i class="material-icons" v-if="group.custom">delete</i>
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
      v-for="card in displayedCards"
      :key="card.id"
      :card="card"
    />
    <button class="btn group-btn-add" @click="toggleShow('form')">
      <i class="large material-icons group-icon-add">add</i>
    </button>
    <CreateForm
      name="card"
      v-if="show.form"
      @close="toggleShow('form')"
      @create="createCard"
    />
    <ConfirmModal
      v-if="show.modal"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardItem from './CardItem.vue'
import CreateForm from './CreateForm.vue'
import ConfirmModal from './ConfirmModal.vue'

export default {
  name: 'GroupCards',

  props: {
    group: {
      type: Object,
      default: () => ({})
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

      show: {
        form: false,
        modal: false
      },

      activeFilter: 'all',
      searchValue: ''
    }
  },

  computed: {
    displayedCards() {
      return this.cards
        .filter(card => {
          return (
            card.groupId === this.group.id &&
            card.title.toLowerCase().includes(this.searchValue.toLowerCase())
          )
        })
    },

    ...mapGetters([
      'cards'
    ])
  },

  methods: {
    onClickFilterButton(event) {
      this.activeFilter = event.target.name
    },

    toggleShow(name) {
      this.show[name] = !this.show[name]
    },

    createCard(event) {
      this.addItem({
        item: {...event, groupId: this.group.id},
        name: 'cards'
      })

      this.toggleShow('form')
    },

    onConfirm(event) {
      if(event) {
        this.deleteItem({
          id: this.group.id,
          name: 'groups'
        })
      }
      
      this.toggleShow('modal')
    },

    ...mapActions([
      'addItem',
      'deleteItem'
    ])
  },

  components: {
    CardItem,
    CreateForm,
    ConfirmModal
  }
}
</script>