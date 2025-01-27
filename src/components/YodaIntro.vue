<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useQuizStore } from '../stores/quiz'


const store = useQuizStore()
const showQuestion = ref(true)
const showButtons = ref(false)

const showTemporaryMessage = ref(false);

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

    <!-- Pregunta -->
    <div v-show="showQuestion" class="question mt-8 text-2xl opacity-0 font-bold font-star-wars text-yellow-400">
      ¿Yeray eres, hmm?
    </div>

    <!-- Mensaje temporal -->
    <div v-show="showTemporaryMessage" class="temp-message mt-8 text-2xl opacity-0 font-bold font-star-wars text-yellow-400">
      (No mientas, aún no ha recibido el link)
    </div>

    <!-- Botones -->
    <div class="mt-8 space-x-8 h-12">
      <button v-show="showButtons" @click="handleChoice(true)"
        class="px-6 py-2 bg-black border-2 border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-black font-bold tracking-wider shadow-lg glow-green">
        Sí
      </button>
      <button v-show="showButtons" @click="handleChoice(false)"
        class="px-6 py-2 bg-black border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-black font-bold tracking-wider shadow-lg glow-red">
        No
      </button>
    </div>

  </div>
</template>

<style>
  .glow-green {
    box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
  }

  .glow-red {
    box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
  }

  button {
    transition: all 0.3s ease-in-out;
    font-family: 'Star Jedi', sans-serif; /* Requiere fuente Star Jedi */
  }
  

</style>