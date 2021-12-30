<template>
    <div class="board-season flex mt-2 mb-2">
        <button @click="this.season = this.season - 1">&lt;</button>
        <p style="padding-top: 2px;">{{ this.season }} - {{this.season % 100 + 1}}</p>
        <button @click="this.season = this.season + 1">&gt;</button>
    </div>

    <div class="menu">
        <div @click="state = 'topscorers'" class="board-menu" :style="state == 'topscorers' ? btnDesign : null">Top Scorers</div>
        <div @click="state = 'topassists'" class="board-menu" :style="state == 'topassists' ? btnDesign : null">Top Assists</div>
    </div>

    <div>
      <table style='width : 100%'>
        <tr style='font-size : 17px;'>
            <th style="width:15%">#</th>
            <th style="width:67%; text-align:left;">PLAYER</th>
            <th style="width:18%">{{state == 'topscorers' ? 'GOALS' : 'ASSISTS'}}</th>
        </tr>
        <tr class='board-personal' v-for="(p, i) in (state == 'topscorers' ?  topscorers : topassists)" :key=i>
          <td class='board-personal-rs'>{{i + 1}}</td>
          <td class='board-personal-info flex'>
              <img :src="`${p['statistics'][0]['team']['logo']}`" alt="">
              <img :src="`${p['player']['photo']}`" alt="">
              <div>
                  <p class='board-personal-name'>{{p['player']['name']}}</p>
                  <p>{{p['statistics'][0]['team']['name']}}</p>
              </div>
          </td>
          <td class='board-personal-rs'>{{p['statistics'][0]['goals'][state == 'topscorers' ? 'total' : 'assists']}}</td>
        </tr>
      </table>

    </div>
    



</template>

<script>
import axios from 'axios'

export default {
    name : 'personalrank',
    data() {
      return {
        topics : ['topscorers', 'topassists'],
        state : 'topscorers',
        topscorers : [],
        topassists : [],
        btnDesign : 'font-weight:Bold; border-bottom:3px; border-bottom-style:solid; border-bottom-color:rgb(230, 0, 91);border-radius: 5px;',
        season : 2021
      }
    },
    methods: {
      getRank() {
        this.topics.forEach((topic) => {
          var options = {
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/players/' + topic,
            params: {league: '39', season: this.season},
            headers: {
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
              'x-rapidapi-key': 'b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e'
            }
          };


          axios.request(options).then((response) => {
            if (topic == "topscorers") {
              this.topscorers = response.data.response.slice(0, 10);
            } else {
              this.topassists = response.data.response.slice(0, 10);
            }
            }).catch(function (error) {
              console.error(error);
            });

          })
      }
    },
    
    created() {
      // this.getRank();
    },
    updated() {
      // this.getRank();
    },

}
</script>

<style>
tr th {
  padding : 5px 15px;
}
.board-personal {
  font-size : 15px;
}

.board-personal-rs {
    width : 15%;
}

.board-personal-info {
    padding : 5px;
    justify-content: center;
    align-self: center
}

.board-personal-info div{
    width : 100%;
    padding : 5px 10px;
    text-align: left;
}
.board-personal-info img{
    border-radius: 50%;
    width : 60px;
    padding : 5px;
}
.board-personal-name {
  font-size: 17px;
  font-weight : bold;
}

</style>