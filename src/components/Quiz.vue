<script setup>
import { ref } from 'vue'
import { useQuizStore } from '../stores/quiz'

const store = useQuizStore()
const currentQuestion = ref(0)

const questions = [
  {
    id: 1,
    question: "¿Cuál es la comida favorita de Yeray?",
    options: ["Pizza", "Sushi", "Hamburguesa", "Paella"]
  },
  {
    id: 2,
    question: "¿Qué hace Yeray en su tiempo libre?",
    options: ["Leer", "Jugar videojuegos", "Ver películas", "Hacer deporte"]
  },
]

const emit = defineEmits(['complete'])

const handleAnswer = (answer) => {
  store.addAnswer(questions[currentQuestion.value].id, answer)

  if (currentQuestion.value < questions.length - 1) {
    setTimeout(() => {
      currentQuestion.value++
    }, 1000) // Añadimos un retraso para mostrar la animación
  } else {
    emit('complete')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-800 text-white flex flex-col items-center justify-center p-4">
    <div class="max-w-2xl w-full bg-black/60 p-8 rounded-xl shadow-lg text-center border-2 border-purple-600">
      <!-- Título de la pregunta -->
      <h2 class="text-3xl mb-8 font-bold">{{ questions[currentQuestion].question }}</h2>
      
      <!-- Opciones de respuesta -->
      <div class="grid grid-cols-1 gap-4">
        <button
          v-for="option in questions[currentQuestion].options"
          :key="option"
          @click="handleAnswer(option)"
          class="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg text-lg font-semibold border-2 border-purple-500 transition-all duration-300"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- Progreso o marcador -->
    <div class="mt-6 text-lg">
      Pregunta {{ currentQuestion + 1 }} de {{ questions.length }}
    </div>
  </div>
</template>
