<template>
  <div class="team-thumb pt-3 pb-3 flex box">
    <div
      v-for="t in team"
      :key="t"
      class="team-thumb-box"
      @click="detail = t['team']['id']"
    >
      <div class="team-thumb-image mb-1">
        <img :src="`${t['team']['logo']}`" alt="" class="" />
      </div>
      <p>{{ t['team']["name"] }}</p>
    </div>
  </div>

  <div class="team-info">
    <div class="team-detail flex">
      <div class="team-detail-image">
        <img :src="`${team[detail]['team']['logo']}`" alt="" class="" />
      </div>
      <div class="team-detail-text text-center">
        <p class="team-name">{{ team[detail]['team']["name"] }}</p>
        <p>Founded - {{ team[detail]['team']["founded"] }}</p>
        <br />
        <p>{{ team[detail]['team']["ven_name"] }} / {{ team[detail]['team']["ven_city"] }}</p>
        <p>Capacity - {{ team[detail]['team']["capacity"] }} seats</p>
      </div>
    </div>
    <div class="team-recent">
      <div class="team-recent-detail">
        <p class="team-desc box">Status</p>
        <div class="team-grade flex">
          <p>{{ fixtures[0] }} <span>G</span></p>
          <p>{{ fixtures[1] }} <span>W</span></p>
          <p>{{ fixtures[2] }} <span>D</span></p>
          <p>{{ fixtures[3] }} <span>L</span></p>
          <p>{{ goals[0] }} <span>GF</span></p>
          <p>{{ goals[1] }} <span>GA</span></p>
          <p>{{ cleanSheet }} <span>CS</span></p>
        </div>
      </div>
      <div class="team-recent-detail">
        <p class="team-desc box">Recent Games</p>
        <div class="team-recent-play flex">
          <p v-for="l in form" :key="l" :style="`background : ${wdl(l)}`">
            {{ l }}
          </p>
        </div>
      </div>
      <div class="team-recent-detail">
        <div class="team-desc box">Line Ups</div>
        <div v-for="l in lineups" :key="l" class="team-lineups flex">
          <p>{{ l.formation }}</p>
          <p>{{ l.played }}</p>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="team-recent-detail">
        <div class="team-desc box">Players</div>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item pl-3" v-for="(p, i) in Object.keys(team[detail]['squad'])" :key=i>
            <h2 class="accordion-header" :id="`flush-heading-${i}`">
              <button
                class="accordion-button collapsed team-position"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#flush-collapse-${i}`"
                aria-expanded="false"
                :aria-controls="`flush-collapse-${i}`"
                :style="`border-color : ${position(p)}`"
              >
              {{p}}
              </button>
            </h2>
            <div
              :id="`flush-collapse-${i}`"
              class="accordion-collapse collapse"
              :aria-labelledby="`flush-heading-${i}`"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body p-0">
                <div class="team-player-detail flex box" v-for="(player, j) in team[detail]['squad'][p]" :key=j>
                  <div class="team-player-number">{{player["number"] ? player["number"] : " "}}</div>
                  <img :src="player['photo']" alt="" class='team-player-image'>
                  <p class="team-player-name">{{player["name"]}}</p>
                  <div class='team-player-status'>
                    <p>{{player['nationality']}}</p>
                    <p><span style='font-weight:normal;'>appearences</span> : {{player['appearences'] ? player['appearences'] : 0}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import teamPlayer from "../assets/data/final.json";

export default {
  name: "Team",
  data() {
    return {
      detail: 33,
      form: [1, 2, 3, 4],
      lineups: {'a' : 1},
      fixtures: [0, 0, 0, 0],
      cleanSheet: 0,
      goals: [0, 0],
      team: teamPlayer
    };
  },
  methods: {
    setData() {
      var options = {
        method: "GET",
        url: "https://api-football-beta.p.rapidapi.com/teams/statistics",
        params: { team: this.detail, season: "2021", league: "39" },
        headers: {
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key":
            "b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e",
        },
      };

      axios
        .request(options)
        .then((response) => {
          let result = response.data.response;
          this.form = result.form.split("").reverse().slice(0, 10);
          this.lineups = result.lineups;
          this.fixtures = [
            result.fixtures.played.total,
            result.fixtures.wins.total,
            result.fixtures.draws.total,
            result.fixtures.loses.total,
          ];
          this.cleanSheet = result.clean_sheet.total;
          this.goals = [
            result.goals.for.total.total,
            result.goals.against.total.total,
          ];
        })
        .catch(function (error) {
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
    position(x) {
      if (x == 'Attacker') return '#F6425F'
      else if (x === 'Midfielder') return '#03D28C'
      else if (x === 'Defender') return '#2B7DEF'
      else if (x === 'Goalkeeper') return '#F2BE57'
    }
  },
  created() {
    // this.setData();
  },
  beforeUpdate(){
    // this.setData();
  },
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
.team-thumb {
  width: 100%;
  overflow-x: scroll;
}

.team-thumb-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.team-thumb-box p {
  text-align: center;
  font-size: 12px;
  width: 60px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.team-thumb-image {
  background: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255))
      padding-box,
    /*this is your grey background*/
      linear-gradient(270deg, rgba(56, 0, 61, 1) 0%, rgba(230, 0, 91, 1) 100%)
      border-box;
  border: 4px solid transparent;
  padding: 2px;
  border-radius: 50px;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
}
.team-thumb:hover {
  cursor: pointer;
}
.team-thumb-image img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.team-detail {
  width: 100%;
  height: 200px;
  align-items: center;
}

.team-detail-text {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.team-detail-text .team-name {
  font-size : 25px;
  font-weight: bold;
}

.team-detail * {
  height: fit-content;
}

.team-detail-image {
  width: 40%;
  padding-left: 15px;
}

.team-detail-image img {
  width: 100%;
}

.team-recent-detail {
  margin: 10px 0;
  width: 100%;
  margin-bottom: 20px;
}
.team-desc {
  padding-left: 15px;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: bold;
  color: rgba(56, 0, 61, 1);
  border-color: rgba(230, 0, 91, 1) !important;
}
.team-grade,
.team-recent-play {
  justify-content: space-between;
  padding: 0 20px;
  font-size: 18px;
}
.team-grade span {
  font-size: 14px;
  font-weight: bold;
  color: rgb(146, 146, 146);
}
.team-recent-play p {
  text-align: center;
  width: 20px;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  border-radius: 50%;
}
.team-lineups {
  margin: 0;
  padding: 0 15px;
  justify-content: space-between;
  width: 50%;
  float: left;
}

.team-position {
  height : 50px;
  padding : 0 15px !important;
  border-color: #00000030;
  border-width: 0 0 0 10px;
  border-style: solid;
}
.team-player-image {
  width : 13%;
  border-radius: 50%;
}
.team-player-detail {
  align-items: center;
  padding : 5px 10px;
  height : 70px;
}

.team-player-status {
  width : 37%;
}

.team-player-number {
  width : 10%;
  font-size : 30px;
  text-align: center;
}

.team-player-name {
  padding : 10px;
  width : 40%;
}

.team-player-status {
  text-align: right;
  font-weight: bold;
}
</style>