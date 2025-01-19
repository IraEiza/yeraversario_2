<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useQuizStore } from '../stores/quiz'

const store = useQuizStore()
const currentMessageIndex = ref(0)

const yerayMessages = [
  "Pasado tiempo ha, hmm...",
  "Un año exactamente, sí...",
  "Muchas cosas ocurrido han...",
  "A estas alturas, conocerte la gente debe...",
  "¿Cierto es...?",
  "Comprobarlo debemos..."
]

const guestMessages = [
  "¡Por supuesto, no es!",
  "Hoy... Yera... hmm...",
  "2 años en Reboot cumple, sí...",
  "¿Sabías tú esto?",
  "Cómo el tiempo vuela... hmm...",
  "¿Bien suficiente lo conoces, hmm?",
  "¿O tal vez no...? Hmm...",
  "Comprobarlo deseas, ¿verdad?",
  "Prepararte debes, ¡Empezamos!"
];

const messages = computed(() => store.isYeray ? yerayMessages : guestMessages)

const showNextMessage = () => {
  if (currentMessageIndex.value < messages.value.length - 1) {
    gsap.to('.message', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        currentMessageIndex.value++
        gsap.to('.message', {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            setTimeout(showNextMessage, 2000)
          }
        })
      }
    })
  } else {
    setTimeout(() => {
      emit('complete')
    }, 2000)
  }
}

const emit = defineEmits(['complete'])

onMounted(() => {
  gsap.to('.message', {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      setTimeout(showNextMessage, 2000)
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center text-white">
    <div class="message text-3xl opacity-0 text-center px-4 font-star-wars text-yellow-400">
      {{ messages[currentMessageIndex] }}
    </div>
  </div>
</template>

<style scoped>
.font-star-wars {
  font-family: "SF Distant Galaxy", system-ui, -apple-system, sans-serif;
  letter-spacing: 2px;
}

</style>