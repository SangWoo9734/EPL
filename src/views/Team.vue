<template>
	<div class="view-wrapper">
		<TeamList @setTeamId="setTeamId" />

		<div class="team-info">
			<TeamInfo :teamDetail="team[teamId].team" />
			<div class="team-recent">
				<TeamStatus
					:fixtures="fixtures"
					:goals="goals"
					:cleanSheet="cleanSheet"
				/>
				<TeamRecent :recentResult="recentResult" />
				<TeamFormation :formationInfo="formationInfo" />
				<TeamPlayer :teamPlayer="team[teamId]" />
			</div>
		</div>
	</div>
</template>

<script>
import TeamList from '../components/Team/TeamList.vue';
import TeamInfo from '../components/Team/TeamInfo.vue';
import TeamStatus from '../components/Team/TeamStatus.vue';
import TeamFormation from '../components/Team/TeamFormation.vue';
import TeamRecent from '../components/Team/TeamRecent.vue';
import TeamPlayer from '../components/Team/TeamPlayer.vue';

import teamStatic from '../assets/data/team_data.json';
import { getTeamInfo } from '../api/index';

export default {
	name: 'TeamPage',
	data() {
		return {
			teamId: 33,
			recentResult: '',
			formationInfo: null,
			fixtures: [0, 0, 0, 0],
			cleanSheet: 0,
			goals: [0, 0],
			team: teamStatic,
		};
	},
	components: {
		TeamList,
		TeamInfo,
		TeamStatus,
		TeamFormation,
		TeamRecent,
		TeamPlayer,
	},
	methods: {
		setTeamId(teamId) {
			this.teamId = teamId;
		},
		requestTeamInfo() {
			getTeamInfo(this.teamId).then(response => {
				this.recentResult = response.form
					.split('')
					.reverse()
					.slice(0, 10)
					.join('');
				this.formationInfo = response.lineups;
				this.fixtures = [
					response.fixtures.played.total,
					response.fixtures.wins.total,
					response.fixtures.draws.total,
					response.fixtures.loses.total,
				];
				this.cleanSheet = response.clean_sheet.total;
				this.goals = [
					response.goals.for.total.total,
					response.goals.against.total.total,
				];
			});
		},
	},
	created() {
		this.requestTeamInfo();
	},
	watch: {
		teamId: function () {
			this.requestTeamInfo();
		},
	},
};
</script>

<style>
.view-wrapper {
	height: calc(100% - 45px);
	overflow: auto;
}
::-webkit-scrollbar {
	display: none;
}
.team-thumb {
	width: 100%;
	overflow: scroll;
}

.team-thumb-box {
	display: flex;
	width: 300%;
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
	background-position: center center;
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
	font-size: 25px;
	font-weight: bold;
}

.team-detail * {
	height: fit-content;
}

.team-detail-blur {
	height: 100%;
	align-items: center;
	background: #ffffff5c;
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
	margin-bottom: 10px;
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
	font-weight: bold;
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
	width: 25px;
	height: 25px;
	padding: 1px;
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
	height: 50px;
	padding: 0 15px !important;
	border-color: #00000030;
	border-width: 0 0 0 10px;
	border-style: solid;
}
.team-player-image {
	width: 13%;
	border-radius: 50%;
	padding: 3px;
}
.team-player-detail {
	align-items: center;
	padding: 5px 10px;
	height: 70px;
}

.team-player-status {
	width: 37%;
}

.team-player-number {
	width: 10%;
	font-size: 30px;
	text-align: center;
}

.team-player-name {
	padding: 10px;
	width: 40%;
}

.team-player-status {
	text-align: right;
	font-weight: bold;
}

.team-info {
	height: 720px;
	overflow: scroll;
}
</style>
