<script setup>
import { ref, onMounted } from 'vue'
import { useQuizStore } from '../stores/quiz'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'

const store = useQuizStore()
const showRanking = ref(false)

onMounted(() => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })

  gsap.to('.ranking-container', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5
  })

  gsap.to('.ranking-item', {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.2,
    delay: 1
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 to-black flex items-center justify-center p-4">
    <div class="ranking-container bg-black/50 p-8 rounded-lg backdrop-blur text-white max-w-2xl w-full opacity-0 transform translate-y-10">
      <h2 class="text-3xl font-bold mb-8 text-center">¡Ranking de Amigos!</h2>
      
      <div class="space-y-6">
        <div v-for="(item, index) in store.ranking" 
             :key="item.name"
             class="ranking-item opacity-0 transform translate-x-10 flex items-center gap-4 p-4 bg-white/10 rounded-lg">
          <div class="relative">
            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
              <img :src="item.avatar" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
              #{{ index + 1 }}
            </div>
          </div>
          
          <div class="flex-1">
            <h3 class="text-xl font-semibold">{{ item.name }}</h3>
            <div class="w-full bg-white/20 rounded-full h-2 mt-2">
              <div class="bg-blue-500 h-full rounded-full" :style="{ width: `${item.score}%` }"></div>
            </div>
          </div>
          
          <div class="text-2xl font-bold">
            {{ item.score }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>