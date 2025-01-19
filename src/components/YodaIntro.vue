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
  // Quitar todo el if cuando lo vaya a hacer Yera
  if (isYeray) {
    // Ocultar botones inmediatamente
    showButtons.value = false;

    // Ocultar pregunta con animación
    gsap.to('.question', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        showQuestion.value = false;

        // Mostrar mensaje temporal con animación
        const tempMessage = document.querySelector('.temp-message');
        tempMessage.style.display = 'block';
        gsap.fromTo(
          '.temp-message',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => {
              setTimeout(() => {
                // Ocultar mensaje temporal con animación
                gsap.to('.temp-message', {
                  opacity: 0,
                  y: 20,
                  duration: 0.5,
                  onComplete: () => {
                    tempMessage.style.display = 'none';

                    // Mostrar pregunta y botones nuevamente
                    showQuestion.value = true;
                    showButtons.value = true;
                    gsap.to(['.question', '.buttons'], {
                      opacity: 1,
                      y: 0,
                      duration: 0.5,
                    });
                  },
                });
              }, 2000); // Tiempo antes de ocultar el mensaje
            },
          }
        );
      },
    });

  } else {
    store.setUser(isYeray ? 'Yeray' : 'Guest', isYeray)
    emit('complete')
  }

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