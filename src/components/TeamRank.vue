<template>
  <div class="board-season flex mt-2 mb-2">
    <button @click="this.season = changeSeason(this.season - 1)">&lt;</button>
    <p style="padding-top: 2px;">{{ this.season }} - {{this.season % 100 + 1}}</p>
    <button @click="this.season = changeSeason(this.season + 1)">&gt;</button>
  </div>

  <div class="board-team board-stand box pl-2 pr-2 flex">
    <p class="text-center" style="width:15%">#</p>
    <p style="width:70%">TEAM</p>
    <p class="text-center" style="width:15%">PTS</p>
  </div>
  
  
  <div class="accordion accordion-flush board-team box" id="accordionFlushExample">
    <div class="accordion-item" v-for='(r, i) in data' :key="i">
      <h2 class="accordion-header" :id="`flush-heading-${r['rank']}`">
        <button class="accordion-button collapsed board-team-info" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse-${r['rank']}`" aria-expanded="false" :aria-controls="`flush-collapse-${r['rank']}`">
          <p class="text-center" style="width:15%">{{r['rank']}}</p>
          <p style="width:70%"><img :src="r['team']['logo']" alt="" style="height:40px; width:40px;">{{r['team']['name']}}</p>
          <p class="text-center" style="width:15%">{{r['points']}} <span style="color:gray; font-size: 13px;">pts</span></p>
        </button>
      </h2>
      <div :id="`flush-collapse-${r['rank']}`" class="accordion-collapse collapse" :aria-labelledby="`flush-heading-${r['rank']}`" data-bs-parent="#accordionFlushExample">
        <table class="accordion-body">
          <tr>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Recent 5</th>
          </tr>
          <tr>
            <td>{{r['all']['played']}}</td>
            <td>{{r['all']['win']}}</td>
            <td>{{r['all']['draw']}}</td>
            <td>{{r['all']['lose']}}</td>
            <td>{{r['all']['goals']['for']}}</td>
            <td>{{r['all']['goals']['against']}}</td>
            <td>{{r['all']['goalsDiff']}}</td>
            <td class="recent-five flex">
              <p v-for="i in r['form']" :key=i :style="`background:${wdl(i)}`">{{i}}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name : 'Rank',
    data() {
      return {
        data : [],
        season : 2021
      }
    },
    methods : {
      changeSeason(x) {
        let recent = new Date();
        let recentYear = recent.getMonth() < 7 ? recent.getFullYear() - 1 : recent.getFullYear();
        
        return x > recentYear ? recentYear : x;
      },
      getBoard() {
        let options = {
          method: 'GET',
          url: 'https://api-football-beta.p.rapidapi.com/standings',
          params: {season: this.season, league: '39'},
          headers: {
            'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
            'x-rapidapi-key': 'b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e'
          }
        };

        axios.request(options).then((response) => {
          this.data = response.data.response[0].league.standings[0]
        }).catch(function (error) {
          console.error(error);
        });
      },
      wdl(x) {
      if (x == "W") {
        return "#13CF00";
      } else if (x == "L") {
        return "#D81920";
      } else {
        return "#76766F";
      }
    },
    },
    created() {
      // this.getBoard();
    },
    updated() {
      // this.getBorad();
    }
}
</script>

<style>
p {
  margin : 0;
}
th{
  background : rgba(0, 0, 0, 0.05);
  width : 5%;
}
tr {
  font-size : 13px;
  text-align : center;
  width : 100%;
  height : 36px;
}
.flex {
  display : flex;
  flex-direction: row;
}
.board-season {
  justify-content: center;
}
.board-season * {
  margin : 0 10px;
  font-size : 20px;
  font-weight : bolder;
}

.board-season button {
  background : none;
  border: none;
  color : rgb(230, 0, 91);
}

.borad-season p {
  padding-top : 1px;
}

.box {
  border-color: #00000030;
  border-width: 0 0 0.3px 0;
  border-style: solid;
}
.board-team {
  width : 100%;
  padding : 0 5px;
}
.board-team-info {
  width : 100%;
  font-size : 17px;
  font-weight : bold;
}

.board-team-info img{
  width : 40px;
  height : 40px;
  padding : 5px;
  margin-right : 10px;
}

.board-stand {
  height : 36px;
  background : #F2F2F2;
  padding-top : 6px;
  font-weight : bold;
}

.accordion-header, .accordion-item, .accordion-body {
  width : 100%;
}
.accordion-button{
  width : 100%;
  padding : 7px 5px;
}
.accordion-button::after, .accordion-button:not(.collapsed)::after{
  display : none;
}

.recent-five {
  padding : 7px 10px 0 10px;
  justify-content : space-between;
}
.recent-five p {
  width : 20px;
  height : 20px;
  border-radius : 50%;
  color : white;
  font-weight : bold;
  padding-top : 1px;
  font-size : 12px;
}
</style>