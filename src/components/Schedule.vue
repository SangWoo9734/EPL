<template>
  <div class="board-season flex mt-3 mb-3">
    <button @click="setMonth(this.month - 1)">&lt;</button>
    <p>{{ this.year + '-' + this.month }}</p>
    <button @click="setMonth(this.month + 1)">&gt;</button>
  </div>

  <div class="fixture-container">
    <div class="fixture-date box">2021-12-01 (수)</div>
    <div class="fixture-list flex">
      <div class="fixture-team flex">
        <img src="https://media.api-sports.io/football/teams/66.png" alt="" class="team-logo">
        <p>Aston Villa</p>
      </div>
      <div class="fixture-board flex">
        <div class="flex mb-1 text-primary">
          <p class="fixture-score">1</p>
          <p> : </p>
          <p class="fixture-score">2</p>
        </div>
        <p>Villa Park</p>
      </div>
      <div class="fixture-team flex">
        <img src="https://media.api-sports.io/football/teams/50.png" alt="" class="team-logo">
        <p>Manchester City</p>
      </div>
    </div>

  </div>
  
</template>

<script>
export default {
    name : 'Schedule',
    data() {
      return {
        year : new Date().getFullYear(),
        month : new Date().getMonth()
      }
    },
    methods : {
      setMonth(x) {
        if (x == 0) {
          this.year -= 1;
          this.month = 12;
        }
        else if (x == 13) {
          this.year += 1;
          this.month = 1;
        }
        else {
          this.month = x;
        }
      }
    }
}
</script>

<style>
.fixture-container {
  border-color: #00000030;
  border-width: 0.3px 0 0 0;
  border-style: solid;
}
.fixture-date {
  height : 30px;
  width : 100%;
  padding : 3px 15px;
  background: rgba(0, 0, 0, 0.055);
}
.fixture-list {
  padding :5px;
  border-color: #00000030;
  border-width: 0 0 0.3px 0;
  border-style: solid;
}

.fixture-board {
  width : 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fixture-board>div p {
  text-align: center;
  font-size: 20px;
  font-weight : bold;
  padding : 1px;
}

.fixture-team {
  width: 35%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fixture-score {
  background : rgb(56, 0, 61);
  width : 30px;
  height : 30px;
  color : white;
  margin : 0 5px;
}
</style>