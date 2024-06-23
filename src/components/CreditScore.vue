<script setup>
import { onMounted, ref } from 'vue';
import { mockScoreApi } from '../js/api';
import TargetTimeframe from './TargetTimeframe.vue';

// design: https://excalidraw.com/#room=4425ea03b874cbef6114,tXqmo7E41kXBKd9iypblRw
// notes: https://docs.google.com/document/d/1_WZe22VOc2-PCG_yrLuUguk4hjXAYLsKziwSGO1aMXY/edit?usp=sharing

const MAX_SCORE = 850;
const MIN_SCORE = 300;

const props = defineProps({
  userToken: {
    type: String,
    default: '',
  },
});

const score = ref(0);
const circleStyle = ref({ display: 'none' });

onMounted(async () => {
  score.value = await mockScoreApi(props.userToken);
  const scorePercent = Math.round(
    ((score.value - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100
  );
  circleStyle.value = { left: `${scorePercent}%` };
});
</script>

<template>
  <div class="component">
    <div>
      <h3>Current Credit Score</h3>
      <p class="component__subtitle">VantageScore(R) 3.0</p>
      <div>
        <p class="component__score">{{ score }}</p>
      </div>
      <div class="component__bar">
        <div class="component__circle" :style="circleStyle"></div>
      </div>
      <small class="component__numbers"
        ><span>300</span> <span>490</span><span>670</span><span>850</span>
      </small>
    </div>
    <TargetTimeframe :score="score" />
  </div>
</template>

<style scoped>
.component {
  display: flex;
  gap: 32px;
  border: 1px solid darkgray;
  border-radius: 12px;
  padding: 16px 32px;

  --bar-width: 350px;
  --bar-height: 20px;
}

.component__subtitle {
  border-bottom: 1px solid lightgray;
}

.component__score {
  margin-bottom: 16px;
  font-size: larger;
  font-weight: 700;
}

.component__bar {
  position: relative;
  width: var(--bar-width);
  height: var(--bar-height);
  background: linear-gradient(to right, darkred, red, orange, yellow, green);
  border-radius: 4px;
}

.component__circle {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: calc(var(--bar-height) - 5px);
  height: calc(var(--bar-height) - 5px);
  border: 4px solid white;
  border-radius: 50%;
}
.component__numbers {
  display: inline-flex;
  justify-content: space-between;
  width: var(--bar-width);
}
</style>
