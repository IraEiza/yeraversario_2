<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useQuizStore } from '../stores/quiz'

const store = useQuizStore()
const userName = ref('')

const emit = defineEmits(['complete'])

onMounted(() => {
  gsap.to('.identify', {
    opacity: 1,
    duration: 2,
    delay: 1,
  })
})

const handleNameSubmit = () => {
  if (userName.value.trim()) {
    store.setUserName(userName.value)
    gsap.to('.question-container', {
      opacity: 1,
      y: 0,
      duration: 0.5
    })
    emit('complete')
  }
}
</script>

<template>
  <div class="question-container identify min-h-screen bg-black flex flex-col items-center justify-center">
    <div class="question-content p-8 rounded-lg text-white max-w-2xl w-full">
        <h2 class="text-2xl mb-6 font-star-wars text-yellow-400">Identifícate, joven Padawan</h2>
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 w-full max-w-2xl mx-auto">
          <input 
            v-model="userName"
            type="text"
            class="flex-1 px-4 py-2 rounded bg-gray-800/80 text-yellow-400 border border-yellow-400 focus:border-blue-500 outline-none placeholder-yellow-600"
            placeholder="Tu nombre, escribe"
            @keyup.enter="handleNameSubmit"
          />
          <button
            @click="handleNameSubmit"
            class="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-bold transition-colors duration-300"
          >
            Continuar
          </button>
        </div>
      </div>
  </div>
</template>