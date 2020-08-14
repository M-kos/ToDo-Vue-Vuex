<template>
  <div class="confirm-modal-overlay">
    <div class="confirm-modal">
      <div class="confirm-modal-title">are you sure?</div>
      <div class="confirm-modal-action">
        <button class="btn" @click.prevent="onConfirm(true)">Ok</button>
        <button class="btn" @click.prevent="onConfirm(false)">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",

  methods: {
    onConfirm(value) {
      this.$emit('confirm', value)
    }
  } 
};
</script>