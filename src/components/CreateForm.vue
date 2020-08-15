<template>
  <div class="create-form-overlay">
    <div class="create-form">
      <div class="create-form-title">create {{name}}</div>

      <div class="create-form-body">
        <input type="text" class="create-form-input" placeholder="Title" v-model="titleValue">

        <textarea class="create-form-description" placeholder="Description" v-model="descriptionValue" v-if="name === 'card'"></textarea>
      </div>

      <div class="create-form-action">
        <button
          class="btn"
          :class="{disabled: !titleValue}"
          @click.prevent="onCreate"
        >
          Create
        </button>
        
        <button class="btn" @click.prevent="onClose">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateForm",

  props: {
    name: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      titleValue: '',
      descriptionValue: ''
    }
  },

  methods: {
    onCreate() {
      this.$emit('create', {
        title: this.titleValue,
        description: this.descriptionValue,
        id: Date.now(),
        done: false
      })
    },

    onClose() {
      this.$emit('close', false)
    }
  } 
};
</script>