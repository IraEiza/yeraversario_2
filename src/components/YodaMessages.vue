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
  "Un invitado tenemos, hmm...",
  "Conocer a Yeray deseas tú...",
  "Prueba superar deberás...",
  "Preparado estás..."
]

const messages = computed(() => store.isYeray ? yerayMessages : guestMessages)

const emit = defineEmits(['complete'])

const showNextMessage = () => {
  if (currentMessageIndex.value < messages.value.length - 1) {
    gsap.to('.message', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        currentMessageIndex.value++
        gsap.to('.message', {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            // Programar el próximo mensaje después de 2 segundos
            setTimeout(showNextMessage, 2000)
          }
        })
      }
    })
  } else {
    emit('complete')
  }
}

onMounted(() => {
  gsap.to('.message', {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      // Iniciar el ciclo automático
      setTimeout(showNextMessage, 2000)
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-black flex flex-col items-center justify-center white">
    <div class="message text-3xl opacity-0 text-center px-4">
      {{ messages[currentMessageIndex] }}
    </div>
  </div>
</template>
