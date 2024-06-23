<script setup>
const props = defineProps({
  recs: {
    type: Array,
    default: () => [],
  },
});

const model = defineModel();
const goBack = () => (model.value = false);
</script>
<template>
  <div class="recs" @click.right="goBack">
    <div class="recs__buttons">
      <button @click="goBack">Go Back</button>
      <button @click="goBack">X</button>
    </div>
    <ul class="recs__list">
      <strong>Recommendations</strong>
      <li v-for="rec in recs" :key="rec">
        {{ rec }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.recs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
}

.recs__list {
  position: relative;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid gray;
  border-radius: 12px;
  width: max-content;
  text-align: left;
  padding: 32px 48px;
}

.recs__buttons {
  display: flex;
  justify-content: space-between;
}
</style>
