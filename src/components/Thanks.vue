<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  // Animación para las estrellas
  gsap.to('.stars', {
    rotation: 360,
    duration: 200,
    repeat: -1,
    ease: 'none'
  })
})

const closeWindow = () => {
  window.close()
}

</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Fondo animado de Star Wars -->
    <div class="absolute inset-0 bg-black">
      <div class="stars absolute inset-0">
        <div v-for="i in 200" :key="i"
          class="star absolute w-1 h-1 bg-white rounded-full"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${1 + Math.random() * 4}s infinite`
          }"
        ></div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 class="text-4xl font-star-wars text-yellow-400 mb-6">
        ¡Gracias por participar, joven Padawan!
      </h1>
      <p class="text-xl text-yellow-300 my-8">
        Que la fuerza te acompañe <img src="../assets/laser.png" class="w-8 mx-4 inline"> ¡Nos vemos mañana, >:) !
      </p>
      <img 
        src="../assets/darth_vader.avif" alt="Yoda"
        class="yoda-image w-64 opacity-1 my-8" 
        />
      <button
        @click="closeWindow"
        class="px-6 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-bold transition-colors duration-300 mt-6"
      >
        Cerrar cuestionario
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

.font-star-wars {
  font-family: "SF Distant Galaxy", system-ui, -apple-system, sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
}
</style>
