<template>
    <div class="team-thumb pt-3 pb-3 flex box">
        <div v-for="t in team" :key = t class="team-thumb-box" @click="detail = t['id']">
            <div class="team-thumb-image mb-1">
                <img :src="`${t['logo']}`" alt="" class="">
            </div>
            <p>{{t['name']}}</p>
        </div>
    </div>

    <div class="team-info">
        <div class="team-detail flex">
            <div class="team-detail-image">
                <img :src="`${team[detail]['logo']}`" alt="" class="">
            </div>
            <div class='team-detail-text text-center'>
                <h3>{{team[detail]['name']}}</h3>
                <p>Founded - {{team[detail]['founded']}}</p>
                <br />
                <p>{{team[detail]['ven_name']}} / {{team[detail]['ven_city']}}</p>
                <p>Capacity - {{team[detail]['capacity']}} seats</p>
            </div>
        </div>
        <div class="team-recent">
            <div>
                <p>Status</p>
                <div>
                    <p>{{fixtrues.played.total}} <span>G</span></p>
                    <p>{{fixtrues.wins.total}} <span>W</span></p>
                    <p>{{fixtrues.draws.total}} <span>D</span></p>
                    <p>{{fixtrues.loses.total}} <span>L</span></p>
                    <p>{{fixtrues.wins.total}} <span>GF</span></p>
                    <p>{{fixtrues.wins.total}} <span>GA</span></p>
                    <p>{{fixtrues.wins.total}} <span>CS</span></p>
                    
                </div>
            </div>
            <div>
                <p>최근 경기</p>
                <div v-if="detailInfo">{{detailInfo['form']}}</div>
            </div>
            <div>
                <div>Line Ups</div>
                <!-- <div v-for="l in lineups" :key="l">{{l.formation}} - {{l.played}}</div> -->
            </div>
            <div>
                <div>Players</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import team from '../assets/data/team_data.json'
import player from '../assets/data/player_data.json'

export default {
    name : 'Team',
    data() {
        return {
            season : 2021,
            detail : 33,
            detailInfo : { form : ''},
            lineups : {played : {}},
            fixtures : {},
            cleanSheet : 0,
            goals : [],
            team : team,
            player : player,
        }
    },
    created() {
        var options = {
        method: 'GET',
        url: 'https://api-football-beta.p.rapidapi.com/teams/statistics',
        params: {team: this.detail, season: '2021', league: '39'},
        headers: {
            'x-rapidapi-host': 'api-football-beta.p.rapidapi.com',
            'x-rapidapi-key': 'b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e'
        }
        };

        axios.request(options).then(function (response) {
            let result = response.data.response;
            console.log(1)
            // this.detailInfo = response.data.response;
            // this.lineups = result.lineups;
            //this.fixtures = result.fixtrues
            // this.cleanSheet = result.clean_sheet.total
            // this.goals = [result.goals.for.total.total, result.goals.against.total.total]
            console.log(1)
            console.log(result);
        }).catch(function (error) {
            console.error(error);
        });
    }
}
</script>

<style>
::-webkit-scrollbar { display: none; }
.team-thumb {
    width : 100%;
    overflow-x : scroll;
}

.team-thumb-box {
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.team-thumb-box p{
    text-align: center;
    font-size : 12px;
    width : 60px;
    padding:0 5px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.team-thumb-image {
    background: 
     linear-gradient(rgb(255, 255, 255),rgb(255, 255, 255)) padding-box, /*this is your grey background*/
     linear-gradient(270deg, rgba(56,0,61,1) 0%, rgba(230,0,91,1) 100%) border-box;
    border: 4px solid transparent;
    padding : 2px;
    border-radius:50px;
    margin : 0 5px;
    justify-content: center;
    align-items: center;
    
}
.team-thumb:hover {
    cursor : pointer;
}
.team-thumb-image img{
    width : 60px;
    height : 60px;
    border-radius: 50%;
}

.team-detail {
    width : 100%;
    height : 200px;
    align-items: center;
}

.team-detail-text {
    width : 60%;
    height : 100%;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding : 10px;
}

.team-detail-text h3{
    font-weight : bold;
}

.team-detail * {
    height : fit-content;
}

.team-detail-image {
    width : 40%;
    padding-left : 15px;
}

.team-detail-image img {
    width : 100%;
}
</style>