<script setup>
import { ref, onMounted } from 'vue';
import { useQuizStore } from '../stores/quiz';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';

const store = useQuizStore();

onMounted(async () => {
  try {
    await store.compareAnswers();
  } catch (error) {
    console.log('Miedo: ', error)
  }

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  gsap.to('.ranking-container', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
  });

  gsap.to('.ranking-item', {
    opacity: 1,
    x: 0,
    duration: 0.5,
    stagger: 0.2,
    delay: 1,
  });
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
    <div class="ranking-container bg-black/70 border border-yellow-500 p-8 rounded-lg shadow-lg text-yellow-400 max-w-2xl w-full opacity-0 transform translate-y-10 my-10">
      <h2 class="text-4xl font-star-wars mb-8 text-center tracking-widest">¡El Yera-Ranking!</h2>

      <div class="space-y-6">
        <div
          v-for="(item, index) in store.ranking"
          :key="item.name"
          class="ranking-item opacity-0 transform translate-x-10 flex items-center gap-4 p-4 bg-black/50 border border-yellow-500 rounded-lg shadow-md"
        >
          <div class="relative">
            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500">
              <img :src="item.avatar" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
              #{{ index + 1 }}
            </div>
          </div>

          <div class="flex-1">
            <h3 class="text-xl font-star-wars tracking-widest">{{ item.name }}</h3>
            <div class="w-full bg-gray-800 rounded-full h-2 mt-2">
              <div
                class="bg-yellow-500 h-full rounded-full"
                :style="{ width: `${item.score}%` }"
              ></div>
            </div>
          </div>

          <div class="text-2xl font-star-wars">
            {{ item.score }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fuente Star Wars */
@font-face {
  font-family: 'SF Distant Galaxy';
  src: url('https://db.onlinewebfonts.com/t/0c724f6aa457310440cf8949c615cbd7.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.font-star-wars {
  font-family: 'SF Distant Galaxy', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Glow effect */
.ranking-container {
  box-shadow: 0 0 20px rgba(255, 223, 0, 0.8), 0 0 40px rgba(255, 223, 0, 0.6);
}

.ranking-item:hover {
  background: rgba(255, 223, 0, 0.1);
  box-shadow: 0 0 10px rgba(255, 223, 0, 0.7);
}
</style>
