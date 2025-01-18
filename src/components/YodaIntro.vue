<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useQuizStore } from '../stores/quiz'


const store = useQuizStore()
const showYoda = ref(false)
const showQuestion = ref(true)
const showButtons = ref(false)

const emit = defineEmits(['complete'])

onMounted(() => {
  gsap.to('.yoda-image', {
    opacity: 1,
    duration: 2,
    delay: 1,
    onComplete: () => {
      showQuestion.value = true
      gsap.to('.question', {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          showButtons.value = true
        }
      })
    }
  })
})

const handleChoice = (isYeray) => {
  store.setUser(isYeray ? 'Yeray' : 'Guest', isYeray)
  emit('complete')
}
</script>

<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center">
    <img src="../assets/yoda.webp" alt="Yoda"
      class="yoda-image w-64 opacity-0" />

    <div v-if="showQuestion" class="question mt-8 text-2xl opacity-0 font-bold font-star-wars text-yellow-400">
      ¿Yeray eres, hmm?
    </div>

    <div class="mt-8 space-x-4 h-12">
      <button v-show="showButtons" @click="handleChoice(true)"
        class="px-6 py-2 bg-green-600 rounded hover:bg-green-700 text-white">
        Sí
      </button>
      <button v-show="showButtons" @click="handleChoice(false)"
        class="px-6 py-2 bg-red-600 rounded hover:bg-red-700 text-white">
        No
      </button>
    </div>
  </div>
</template>