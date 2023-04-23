<template>
  <div>
    <div v-if="!gameStarted">
      <h1>Welcome to the Quiz Game!</h1>
      <button @click="startGame">Start</button>
    </div>
    <div v-else-if="gameOver">
      <h1>Game Over</h1>
      <p v-if="isGameWon">Congratulations, you won the game!</p>
      <p v-else>Sorry, you lost the game.</p>
    </div>
    <div v-else>
      <h1>Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h1>
      <p>{{ currentQuestion.question }}</p>
      <input v-model="selectedAnswer" type="text" />
      <button @click="submitAnswer">Submit</button>
      <p v-if="lives > 0">{{ lives }} lives left</p>
      <p v-else>Game Over</p>
    </div>
  </div>
</template>

<script>
import { startGame, submitAnswer } from "@/api/game";

export default {
  data() {
    return {
      gameStarted: false,
      gameOver: false,
      isGameWon: false,
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: "",
      lives: 5,
    };
  },
  methods: {
    async startGame() {
      this.gameStarted = true;
      this.questions = await startGame();
    },
    async submitAnswer() {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const isAnswerCorrect = await submitAnswer(
        currentQuestion.name,
        this.selectedAnswer
      );
      if (isAnswerCorrect) {
        if (this.currentQuestionIndex === this.questions.length - 1) {
          this.gameOver = true;
          this.isGameWon = true;
        } else {
          this.currentQuestionIndex++;
        }
      } else {
        this.lives--;
        if (this.lives === 0) {
          this.gameOver = true;
        }
      }
      this.selectedAnswer = "";
    },
  },
};
</script>
