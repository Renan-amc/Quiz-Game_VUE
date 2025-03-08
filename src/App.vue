<template>

  <div></div>

  <div>
      
      <ScoreBoard :winCount="this.winCount" :loseCount="this.loseCount" />

      <h1 v-html="this.question">
      </h1>

      <template v-for="(answer, index) in this.answers" v-bind:key="index">

        <input 
        :disabled="this.answerSubmitted"
        type="radio" 
        name="options" 
        :value="answer"
        v-model="this.chosen_answer"
        >
        <label v-html="answer"></label><br>
        

      </template>
      
      <p class="time" v-if="!isDelayed">Minimum waiting time: ({{ this.elapsedTime }})</p>

      <button 
        v-if="!this.answerSubmitted" 
        @click="this.submitAnswer()"
        :class="{ 'disabled-button' : !isDelayed }"
        class="send" type="button">Send</button>
     

      <section v-if="this.answerSubmitted" class="result">
        <h4 v-if="this.chosen_answer == this.correctAnswers"

        v-html="'&#9989; Congratulations, the answer: ' + this.correctAnswers + ' is correct.'">
          
        </h4>
        <h4 v-else
        
        v-html="'&#10060; I`m sorry, you picked the wrong answer. The correct is: ' +  this.correctAnswers + '.'">
          
        </h4>
        <button @click="this.getNewQuestion(), this.refresh()"  class="send" type="button">Next question</button>
      </section>

  </div>

</template>

<script>


import ScoreBoard from './components/ScoreBoard.vue';
export default {

  name: 'App',
  componenets: {
    ScoreBoard
  },
  
  data() {
    return{
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswers: undefined,
      chosen_answer: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0,

      isDelayed: false,
      elapsedTime: 5
    }
  },

  computed: {
    answers() {
      var answers = [...this.incorrectAnswers];
      answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswers);
      return answers;
    }
  },

  methods: {

    refresh() {
      this.isDelayed = false
      this.elapsedTime = 5;

      const interval = setInterval(() => {
      this.elapsedTime -= 1; 

      if (this.elapsedTime == 0) {
        clearInterval(interval);
        this.isDelayed = true; 
      }
      }, 1000); 

    },

    submitAnswer() {
      if(!this.chosen_answer) {
        alert("Pick one of the options");
      } else  {
        this.answerSubmitted = true;
        if(this.chosen_answer == this.correctAnswers) {
          this.winCount++
        } else {
          this.loseCount++
        }
      }
    },

    getNewQuestion() {
      this.axios
      .get('https://opentdb.com/api.php?amount=1&category=18')
      .then((response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswers = response.data.results[0].correct_answer;
      })
      this.answerSubmitted = false
    }
  },

  created() {
    this.getNewQuestion()
  },

  mounted() {
    const interval = setInterval(() => {
      this.elapsedTime -= 1; 

      if (this.elapsedTime == 0) {
        clearInterval(interval);
        this.isDelayed = true; 
      }
    }, 1000); 
  }
}

//https://opentdb.com/api.php?amount=1&category=18
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type=radio] {
    margin: 12px 4px;
  }
  

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
    z-index: 0;
  }

  button.disabled-button {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  .time {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  background-color: #f1f1f1; 
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 

  }

}
</style>
