import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: [],
    currentUser: '',
    isYeray: false,
    ranking: []
  }),
  
  actions: {
    setUser(name, isYeray) {
      this.currentUser = name
      this.isYeray = isYeray
    },

    setUserName(name) {
      this.currentUser = name
    },
    
    addAnswer(questionId, answer) {
      this.answers.push({
        questionId,
        answer,
        isYeray: this.isYeray
      })
    },
    
    async saveAnswers() {
      const sheetName = this.isYeray ? 'YerasAnswers' : 'TeamAnswers';
    
      try {
        // Crear el payload con las respuestas
        const payload = {
          sheetName, // Nombre de la hoja
          name: this.currentUser, // Usuario actual
          answers: this.answers.map(answer => ({
            questionId: answer.questionId,
            answer: answer.answer
          }))
        };
    
        // Enviar datos al Web App
        const response = await fetch('https://script.google.com/macros/s/AKfycbwlDN-3ejrSH4DzdXXxaSpoLJYS0Cf4HYKoqPsB01PM9R25fMKrFHRiS4bvi1Zy3ev3/exec', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
    
        if (response.ok) {
          const result = await response.json(); // Parsear respuesta del servidor
        } else {
          console.error('Error al guardar las respuestas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al conectar con el Web App:', error);
      }
    },

    async compareAnswers() {
      if (!this.isYeray) return;
    
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyR18tXGDjd2Z_c5lrGLM8UDdqwamutvWnFT8Oy66ZhGt8cr0Angl4jfakyfibdzWhO/exec'
        );
        const result = await response.json();
    
        if (result.status === 'success') {
          const { teamAnswers, yerayAnswers } = result.data;
    
          // Asegúrate de que hay respuestas de Yeray
          if (!yerayAnswers || yerayAnswers.length === 0) {
            console.error('No se encontraron respuestas de Yeray.');
            return;
          }
    
          const yerayCorrectAnswers = yerayAnswers[0]; // Respuestas correctas de Yeray
    
          // Calcular el ranking basado en las respuestas correctas
          this.ranking = teamAnswers.map(entry => {
            const totalQuestions = Object.keys(entry).filter(key => key.startsWith('Question')).length;
            const correctAnswers = Object.keys(entry).filter(key => {
              // Compara las respuestas del equipo con las de Yeray
              return key.startsWith('Question') && entry[key] === yerayCorrectAnswers[key];
            }).length;
    
            const score = Math.round((correctAnswers / totalQuestions) * 100);
    
            return {
              name: entry.Name,
              score,
              avatar: entry.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.Name}`,
            };
          });
    
          // Ordenar por puntaje descendente
          this.ranking.sort((a, b) => b.score - a.score);
        } else {
          console.error('Error al obtener respuestas:', result.message);
        }
      } catch (error) {
        console.error('Error al conectar con el App Script:', error);
      }
    }
  }
})
