<script setup>
import { ref, onMounted } from 'vue'
import { useQuizStore } from '../stores/quiz'
import { gsap } from 'gsap'
import { questions } from '../assets/questions.js'

const store = useQuizStore()
const currentQuestion = ref(0)
const showNameInput = ref(true)
const formSubmitted = ref(false)
const textInput = ref('');
const isLoading = ref(false);

const handleTextAnswer = (answer) => {
  store.addAnswer(questions[currentQuestion.value].id, answer);
  textInput.value = '';
  nextQuestion();
};

const handleMultipleChoice = (answer) => {
  store.addAnswer(questions[currentQuestion.value].id, answer)
  nextQuestion()
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.length - 1) {
    gsap.to('.question-container', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        currentQuestion.value++
        gsap.to('.question-container', {
          opacity: 1,
          y: 0,
          duration: 0.5
        })
      }
    })
  } else {
    submitForm()
  }
}

const showSpinner = () => {
  gsap.fromTo('.spinner', { opacity: 0 }, { opacity: 1, duration: 2 });
};

const hideSpinner = () => {
  gsap.to('.spinner', { opacity: 0, duration: 2, onComplete: () => isLoading.value = false });
};

const submitForm = async () => {
  formSubmitted.value = true;
  isLoading.value = true; // Mostrar el spinner
  showSpinner(); // Animar entrada del spinner

  try {
    await store.saveAnswers(); // Guardar las respuestas en Google Sheets
    if (store.isYeray) {
      await store.compareAnswers();
    }
  } catch (error) {
    console.error('Error al enviar respuestas:', error);
  } finally {
    isLoading.value = false; // Ocultar el spinner
    hideSpinner(); // Animar salida del spinner
  }

  emit('complete');
};

onMounted(() => {
  gsap.to('.stars', {
    rotation: 360,
    duration: 200,
    repeat: -1,
    ease: 'none'
  })
})

const emit = defineEmits(['complete'])
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Fondo animado de Star Wars -->
    <div class="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div class="stars w-[200%] h-[200%] rounded-full">
        <!-- Estrellas -->
        <div v-for="i in 200" :key="i" class="star absolute w-1 h-1 bg-white rounded-full" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${1 + Math.random() * 4}s infinite`
        }">
        </div>
      </div>
    </div>



    <div v-show="isLoading" class="spinner fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <!-- Spinner -->
      <div class="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Content -->
    <div class="question-container relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
      <div v-if="!formSubmitted" class="question-content p-8 rounded-lg backdrop-blur text-white max-w-2xl w-full">
        <h2 class="text-2xl mb-6 font-star-wars text-yellow-400">{{ questions[currentQuestion].question }}</h2>

        <template v-if="questions[currentQuestion].type === 'multiple'">
          <div class="grid grid-cols-1 gap-4">
            <button v-for="option in questions[currentQuestion].options" :key="option"
              @click="handleMultipleChoice(option)"
              class="px-6 py-3 bg-gray-800/80 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black text-left transition-colors duration-300 text-yellow-400 hover:font-bold">
              {{ option }}
            </button>
          </div>
        </template>

        <template v-else-if="questions[currentQuestion].type === 'text'">
          <div class="flex flex-col gap-4">
            <input type="text" v-model="textInput"
              class="px-4 py-2 rounded bg-gray-800/80 text-yellow-400 border border-yellow-400 focus:border-blue-500 outline-none placeholder-yellow-600"
              placeholder="Tu respuesta, escribe" @keyup.enter="textInput && handleTextAnswer($event.target.value)" />
            <button
              @click="$event.target.previousElementSibling.value && handleTextAnswer($event.target.previousElementSibling.value)"
              class="px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-bold transition-colors duration-300">
              Siguiente
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes twinkle {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}
</style>