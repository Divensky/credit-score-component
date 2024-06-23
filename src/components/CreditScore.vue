<script setup>
import { onMounted, ref } from 'vue';
import { mockScoreApi } from '../js/api';
import TargetTimeframe from './TargetTimeframe.vue';

// https://excalidraw.com/#room=4425ea03b874cbef6114,tXqmo7E41kXBKd9iypblRw
// https://docs.google.com/document/d/1_WZe22VOc2-PCG_yrLuUguk4hjXAYLsKziwSGO1aMXY/edit?usp=sharing

const props = defineProps({
  userToken: {
    type: String,
    default: '',
  },
});

const score = ref(0);

onMounted(async () => {
  score.value = await mockScoreApi(props.userToken);
});
</script>

<template>
  <div class="component">
    <div>
      <div>Current Credit Score</div>
      <small>VantageScore(R) 3.0</small>
      <div>
        <strong>{{ score }}</strong>
      </div>
      <div class="component__bar"><div></div></div>
      <small class="component__numbers"
        ><span>300</span> <span>560</span><span>750</span><span>850</span>
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
  padding: 16px;

  --bar-width: 300px;
}

.component__bar {
  width: var(--bar-width);
  height: 16px;
  background: linear-gradient(to right, darkred, red, orange, yellow, green);
}

.component__numbers {
  display: inline-flex;
  justify-content: space-between;
  width: var(--bar-width);
}
</style>
