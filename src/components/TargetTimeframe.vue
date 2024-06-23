<script setup>
import { ref, computed } from 'vue';
import { mockRecommendationsApi } from '../js/api';
import Recommendations from './Recommendations.vue';

const props = defineProps({
  score: {
    type: Number,
    default: 0,
  },
});

const scoreRange = computed(() =>
  props.score < 580 ? 'poor' : props.score < 670 ? 'medium' : 'fair'
);

const showRecs = ref(false);
const selectedOption = ref(18);
const selectOption = (ev) => {
  console.log('option', ev.target.value);
  selectedOption.value = ev.target.value;
};
const selectedRecommendations = ref([]);
const submit = async () => {
  const recommendations = await mockRecommendationsApi();
  selectedRecommendations.value =
    recommendations[`${selectedOption.value}_months`][scoreRange.value];
  if (
    !!selectedRecommendations.value &&
    Array.isArray(selectedRecommendations.value) &&
    selectedRecommendations.value.length > 0
  ) {
    showRecs.value = true;
  }
};
</script>
<template>
  <div class="target">
    <div>Target Timeframe</div>
    <p>
      Within how many months would you like to reach your target credit score?
    </p>
    <form action="" method="get" @submit.prevent="submit">
      <select @change="selectOption">
        <option value="18">18 months</option>
        <option value="12">12 months</option>
        <option value="6">6 months</option>
      </select>
      <div>
        <button>Submit</button>
      </div>
    </form>
  </div>
  <Recommendations
    v-if="showRecs"
    v-model="showRecs"
    :recs="selectedRecommendations"
  />
</template>
