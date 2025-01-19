<script setup>
import { ref } from 'vue'
import YodaIntro from './components/YodaIntro.vue'
import YodaMessages from './components/YodaMessages.vue'
import Identify from './components/Identify.vue'
import Quiz from './components/Quiz.vue'
import Thanks from './components/Thanks.vue'
import Ranking from './components/Ranking.vue'
import { useQuizStore } from './stores/quiz'

const store = useQuizStore()
const currentStep = ref('quiz') // 'intro', 'messages', 'identify', 'quiz', 'ranking', 'thanks'

const handleStepComplete = (step) => {
  switch (step) {
    case 'intro':
      currentStep.value = 'messages'
      break
    case 'messages':
      currentStep.value = store.isYeray ? 'quiz' : 'identify'
      break
    case 'identify':
      currentStep.value = 'quiz'
      break
    case 'quiz':
      currentStep.value = store.isYeray ? 'ranking' : 'thanks'
      break
  }
}
</script>

<template>
  <div class="bg-black">
    <Transition name="fade" mode="out-in">
      <YodaIntro 
        v-if="currentStep === 'intro'"
        @complete="handleStepComplete('intro')"
      />
      <YodaMessages
        v-else-if="currentStep === 'messages'"
        @complete="handleStepComplete('messages')"
      />
      <Identify
        v-else-if="currentStep === 'identify'"
        @complete="handleStepComplete('identify')"
      />
      <Quiz
        v-else-if="currentStep === 'quiz'"
        @complete="handleStepComplete('quiz')"
      />
      <Thanks
        v-else-if="currentStep === 'thanks'"
      />
      <Ranking
        v-else-if="currentStep === 'ranking'"
      />
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>