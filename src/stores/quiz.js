import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: [],
    currentUser: '',
    isYeray: false
  }),
  
  actions: {
    setUser(name, isYeray) {
      this.currentUser = name
      this.isYeray = isYeray
    },
    
    addAnswer(questionId, answer) {
      this.answers.push({
        questionId,
        answer,
        isYeray: this.isYeray
      })
    },
    
    getResults() {
      // Filtrar las respuestas de Yeray y otros usuarios
      const yerayAnswers = this.answers.filter(a => a.isYeray)
      const otherAnswers = this.answers.filter(a => !a.isYeray)
      
      return {
        yerayAnswers,
        otherAnswers
      }
    }
  }
})
