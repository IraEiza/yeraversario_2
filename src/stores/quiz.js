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
      const sheetName = this.isYeray ? 'YerayAnswers' : 'UserAnswers';

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
        const response = await fetch('https://script.google.com/macros/s/AKfycbxwqCLuHxNUUAxM9MmYLit3zjagKwZuYn5ivDrUGpwYMtQzrZPeumeAZ3CET5UNu30d/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          console.log(`Respuestas guardadas en ${sheetName}`);
        } else {
          console.error('Error al guardar las respuestas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al conectar con el Web App:', error);
      }
    },

    async compareAnswers() {
      if (!this.isYeray) return

      this.ranking = [
        { name: 'Ana', score: 95, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
        { name: 'Carlos', score: 85, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
        { name: 'María', score: 75, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' }
      ]
    }
  }
})
