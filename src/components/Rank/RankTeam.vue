<template>
	<div class="board-rank-team">
		<div class="board-season flex mt-2 mb-2">
			<button @click="season -= 1">&lt;</button>
			<p style="padding-top: 2px">{{ season }} - {{ (season % 100) + 1 }}</p>
			<button @click="season += 1">&gt;</button>
		</div>

		<div class="board-team board-stand box pl-2 pr-2 flex">
			<p class="text-center" style="width: 15%">#</p>
			<p style="width: 55%">TEAM</p>
			<p class="text-center" style="width: 15%">G</p>
			<p class="text-center" style="width: 15%">PTS</p>
		</div>

		<div
			v-if="!loading"
			class="accordion accordion-flush board-team box"
			id="accordionFlushExample"
		>
			<div
				class="accordion-item"
				v-for="(result, index) in boardData"
				:key="index"
			>
				<h2 class="accordion-header" :id="`flush-heading-${result['rank']}`">
					<button
						class="accordion-button collapsed board-team-info"
						type="button"
						data-bs-toggle="collapse"
						:data-bs-target="`#flush-collapse-${result['rank']}`"
						aria-expanded="false"
						:aria-controls="`flush-collapse-${result['rank']}`"
					>
						<p class="text-center" style="width: 15%; font-weight: bold">
							{{ result['rank'] }}
						</p>
						<div class="flex" style="width: 55%">
							<img :src="result['team']['logo']" alt="" />
							<p style="font-weight: bold">{{ result['team']['name'] }}</p>
						</div>
						<p class="text-center" style="width: 15%">
							{{ result['all']['played'] }}
						</p>
						<p class="text-center" style="width: 15%; font-weight: bold">
							{{ result['points'] }}
							<span style="color: gray; font-size: 13px">pts</span>
						</p>
					</button>
				</h2>
				<div
					:id="`flush-collapse-${result['rank']}`"
					class="accordion-collapse collapse"
					:aria-labelledby="`flush-heading-${result['rank']}`"
					data-bs-parent="#accordionFlushExample"
				>
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
							<td>{{ result['all']['played'] }}</td>
							<td>{{ result['all']['win'] }}</td>
							<td>{{ result['all']['draw'] }}</td>
							<td>{{ result['all']['lose'] }}</td>
							<td>{{ result['all']['goals']['for'] }}</td>
							<td>{{ result['all']['goals']['against'] }}</td>
							<td>
								{{
									result['all']['goals']['for'] -
									result['all']['goals']['against']
								}}
							</td>
							<td class="recent-five flex">
								<p
									v-for="formation in result['form']"
									:key="formation"
									:style="`background:${wdl(formation)}`"
								>
									{{ formation }}
								</p>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<Loading v-else />
	</div>
</template>

<script>
import Loading from '../Loading.vue';
import { getTeamRanking } from '../../api/index';

export default {
	name: 'TeamRank',
	data() {
		return {
			boardData: [],
			season: 2021,
			loading: false,
		};
	},
	components: {
		Loading,
	},
	methods: {
		wdl(x) {
			if (x == 'W') {
				return '#13CF00';
			} else if (x == 'L') {
				return '#D81920';
			} else {
				return '#76766F';
			}
		},
		getRankingInfo() {
			this.loading = true;
			getTeamRanking(this.season).then(response => {
				this.boardData = response[0];
				this.loading = false;
			});
		},
	},
	created() {
		this.getRankingInfo();
	},
	watch: {
		season: function () {
			this.getRankingInfo();
		},
	},
};
</script>

<style>
p {
	margin: 0;
}
th {
	background: rgba(0, 0, 0, 0.05);
	width: 5%;
}
tr {
	font-size: 13px;
	text-align: center;
	width: 100%;
	height: 36px;
}
.board-rank-team {
	height: calc(100% - 50px);
}
.flex {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.board-season {
	justify-content: center;
}
.board-season * {
	margin: 0 10px;
	font-size: 20px;
	font-weight: bold;
}

.board-season button {
	background: none;
	border: none;
	color: rgb(230, 0, 91);
}

.borad-season p {
	padding-top: 1px;
}

.box {
	border-color: #00000030;
	border-width: 0 0 0.3px 0;
	border-style: solid;
}
.board-team {
	height: calc(100% - 77px);
	overflow: auto;
}

.board-team-info {
	font-size: 17px;
}

.board-team-info img {
	width: 45px;
	height: 45px;
	padding: 3px;
	margin-right: 10px;
}

.board-stand {
	height: 36px;
	background: #f2f2f2;
	padding-top: 6px;
	font-weight: bold;
}

.accordion-header,
.accordion-item,
.accordion-body {
	width: 100%;
}
.accordion-button {
	width: 100%;
	padding: 7px 5px;
}
.accordion-button::after,
.accordion-button:not(.collapsed)::after {
	display: none;
}

.recent-five {
	padding: 7px 10px 0 10px;
	justify-content: space-between;
}
.recent-five p {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	color: white;
	font-weight: bold;
	padding-top: 1px;
	font-size: 12px;
}
</style>
