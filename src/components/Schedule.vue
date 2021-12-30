<template>
  <div class="board-season flex mt-2 mb-2">
    <button @click="setMonth(this.month - 1)">&lt;</button>
    <p style="padding-top: 2px;">{{ this.year + '-' + this.month }}</p>
    <button @click="setMonth(this.month + 1)">&gt;</button>
  </div>
  
  <div class="fixture-menu">UPCOMMING MATCHES</div>
  <div class="fixture-next-board">
    <div class="fixture-container" v-for='(m, i) in next' :key='i'>
      <div class="fixture-list flex">
        <div class="fixture-team flex">
          <img :src="m['teams']['home']['logo']" alt="" class="team-logo">
          <p>{{m['teams']['home']['name']}}</p>
        </div>
        <div class="fixture-board fixture-board-info flex">
          <p class='fixture-board-date'>{{new Date(m['fixture']['date']).toDateString()}}</p>
          <p>{{m['fixture']['venue']['city']}}</p>
          <p class='fixture-board-venue'>{{m['fixture']['venue']['name']}}</p>
        </div>
        <div class="fixture-team flex">
          <img :src="m['teams']['away']['logo']" alt="" class="team-logo">
          <p>{{m['teams']['away']['name']}}</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="fixture-menu mt-2">RESULTS</div>
  <div class="fixture-result-board">
    <div class="fixture-container" v-for="(m,i) in schedule" :key="i">
      <div v-if="checkSameDate(new Date(m['fixture']['date']).toDateString())" class="fixture-date box">{{new Date(m['fixture']['date']).toDateString()}}</div>
      <div class="fixture-list flex">
        <div class="fixture-team flex">
          <img :src="m['teams']['home']['logo']" alt="" class="team-logo">
          <p>{{m['teams']['home']['name']}}</p>
        </div>
        <div class="fixture-board fixture-board-info flex">
          <p>{{m['fixture']['status']['short']}}</p>
          <div class="flex p-1">
            <p class="fixture-score">{{m['score']['fulltime']['home']}}</p>
            <p> : </p>
            <p class="fixture-score">{{m['score']['fulltime']['away']}}</p>
          </div>
          <p class='fixture-board-venue'>{{m['fixture']['venue']['name']}}</p>
        </div>
        <div class="fixture-team flex">
          <img :src="m['teams']['away']['logo']" alt="" class="team-logo">
          <p>{{m['teams']['away']['name']}}</p>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    name : 'Schedule',
    data() {
      return {
        year : new Date().getFullYear(),
        month : new Date().getMonth() + 1,
        day : 31,
        resultDate : '',
        schedule : [],
        next : []
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
      },
      setSchedule() {
        if ([1, 3, 5, 7, 8, 10, 12].includes( this.month ))
          this.day = 31;
        else if (this.month == 2)
          if (this.year % 4) this.day = 29;
          else this.day = 28;
        else this.day = 30

        var options = {
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
          params: {
            league: '39',
            season: this.month <= 6 ? this.year-1 : this.year,
            from: this.year + '-' + this.month + '-01',
            to: this.year + '-' + this.month + '-' + this.day
            },
          headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': 'b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e'
          }
        };

        axios.request(options).then((response) => {
          this.schedule = response.data.response
          this.sortSchedule();
        }).catch(function (error) {
          console.error(error);
        });
      },
      setNextMatch() {
        var options = {
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
          params: { league: '39', next: '10' },
          headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': 'b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e'
          }
        };

        axios.request(options).then((response) => {
          this.next = response.data.response;
        }).catch(function (error) {
          console.error(error);
        });
      },
      sortSchedule() {
        this.schedule.sort(function(a, b){
          if (a.fixture.date < b.fixture.date) {
            return 1
          }
          if (a.fixture.date > b.fixture.date) {
            return -1
          }
          return 0
        })
      },

      checkSameDate(x) {
        if (this.resultDate == x) {
          return false;
        } else {
          this.resultDate = x;
          return true;
        }
      },
    },

    created() {
      this.setSchedule();
      this.setNextMatch();
    },
    updated() {
      this.setSchedule();
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
  font-weight: bold;
  background: rgba(0, 0, 0, 0.055);
}
.fixture-list {
  padding :5px;
  border-color: #00000030;
  border-width: 0 0 0.3px 0;
  border-style: solid;
}

.fixture-board {
  width : 40%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding : 0 10px;
}

.fixture-board>div p {
  text-align: center;
  font-weight : bold;
}

.fixture-board .fixture-board-venue {
  text-align: center;
  width : 100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.fixture-board-info {
  font-size : 13px;
}

.fixture-board-date {
  font-weight : 800;
}

.fixture-team {
  width: 30%;
  font-size : 13px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fixture-score {
  background : rgb(56, 0, 61);
  width : 30px;
  height : 30px;
  font-size: 20px;
  color : white;
  margin : 0 5px;
}
.fixture-menu {
  height : 40px;
  padding : 10px;
  font-weight: bold;
  background: rgb(0 0 0 / 5%);
}

.fixture-next-board {
  height : 250px;
  overflow : scroll;
}

.fixture-result-board {
  height : 465px;
  overflow : scroll;
}


</style>