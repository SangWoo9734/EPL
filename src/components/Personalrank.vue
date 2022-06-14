<template>
	<div>
		<div class="board-season flex mt-2 mb-2">
			<button @click="this.season = this.season - 1">&lt;</button>
			<p style="padding-top: 2px">
				{{ this.season }} - {{ (this.season % 100) + 1 }}
			</p>
			<button @click="this.season = this.season + 1">&gt;</button>
		</div>

		<div class="menu">
			<div
				@click="state = 'topscorers'"
				class="board-menu"
				:style="state == 'topscorers' ? btnDesign : null"
			>
				Top Scorers
			</div>
			<div
				@click="state = 'topassists'"
				class="board-menu"
				:style="state == 'topassists' ? btnDesign : null"
			>
				Top Assists
			</div>
		</div>

		<div>
			<table style="width: 100%">
				<tr style="font-size: 17px">
					<th style="width: 15%">#</th>
					<th style="width: 67%; text-align: left">PLAYER</th>
					<th style="width: 18%">
						{{ state == 'topscorers' ? 'GOAL' : 'ASSIST' }}
					</th>
				</tr>
				<tr
					:class="`board-personal rank-${index}`"
					v-for="(p, index) in state == 'topscorers' ? topscorers : topassists"
					:key="index"
				>
					<td class="board-personal-rs">{{ index + 1 }}</td>
					<td class="board-personal-info flex">
						<img :src="`${p['player']['photo']}`" alt="" />
						<div>
							<p class="board-personal-name">{{ p['player']['name'] }}</p>
							<p>{{ p['statistics'][0]['team']['name'] }}</p>
						</div>
					</td>
					<td class="board-personal-rs">
						{{
							p['statistics'][0]['goals'][
								state == 'topscorers' ? 'total' : 'assists'
							]
						}}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import { getAssistRank, getGoalRank } from '../api/index';

export default {
	name: 'PersonalRanking',
	data() {
		return {
			topics: ['topscorers', 'topassists'],
			state: 'topscorers',
			topscorers: [],
			topassists: [],
			btnDesign:
				'font-weight:Bold; border-bottom:3px; border-bottom-style:solid; border-bottom-color:rgb(230, 0, 91);border-radius: 5px;',
			season: 2021,
		};
	},
	methods: {
		getRank() {
			getAssistRank(this.season).then(response => {
				this.topassists = response;
			});
			getGoalRank(this.season).then(response => {
				this.topscorers = response;
			});
		},
	},
	created() {
		this.getRank();
	},
	watch: {
		season: function () {
			this.getRank();
		},
	},
};
</script>

<style>
tr th {
	padding: 5px 15px;
}
.board-personal {
	font-size: 15px;
}

.board-personal-rs {
	width: 10%;
}

.board-personal-info {
	margin: 0px;
	padding: 5px;
	justify-content: center;
	align-items: center;
}

.board-personal-info div {
	width: 100%;
	padding: 5px 10px;
	text-align: left;
}
.board-personal-info img {
	border-radius: 50%;
	width: 55px;
	height: 55px;
	padding: 3px;
}
.board-personal-name {
	font-size: 17px;
	font-weight: bold;
}

.rank-0 {
	background: rgb(253 96 136);
}
.rank-1 {
	background: rgb(255 134 165);
}
.rank-2 {
	background: lightgray;
}
</style>
