<script setup>
import { ref } from 'vue'
import YodaIntro from './components/YodaIntro.vue'
import YodaMessages from './components/YodaMessages.vue'
import Quiz from './components/Quiz.vue'

const currentStep = ref('intro') // 'intro', 'messages', 'quiz'

const handleStepComplete = (step) => {
  switch (step) {
    case 'intro':
      currentStep.value = 'messages'
      break
    case 'messages':
      currentStep.value = 'quiz'
      break
    case 'quiz':
      // Handle quiz completion
      break
  }
}
</script>

<template>
  <div>
    <Transition name="fade">
      <YodaIntro 
        v-if="currentStep === 'intro'"
        @complete="handleStepComplete('intro')"
      />
      <YodaMessages
        v-else-if="currentStep === 'messages'"
        @complete="handleStepComplete('messages')"
      />
      <Quiz
        v-else-if="currentStep === 'quiz'"
        @complete="handleStepComplete('quiz')"
      />
    </Transition>
  </div>
</template>
