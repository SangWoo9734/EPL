<template>
	<div>
		<div class="board-season flex mt-2 mb-2">
			<button @click="setMonth(this.month - 1)">&lt;</button>
			<p style="padding-top: 2px">{{ this.year + '-' + this.month }}</p>
			<button @click="setMonth(this.month + 1)">&gt;</button>
		</div>

		<div class="fixture-menu">UPCOMMING MATCHES</div>
		<div class="fixture-next-board">
			<div class="fixture-container" v-for="(m, i) in next" :key="i">
				<div class="fixture-list flex">
					<div class="fixture-team flex">
						<img :src="m['teams']['home']['logo']" alt="" class="team-logo" />
						<p>{{ m['teams']['home']['name'] }}</p>
					</div>
					<div class="fixture-board fixture-board-info flex">
						<p class="fixture-board-date">
							{{ new Date(m['fixture']['date']).toDateString() }}
						</p>
						<p>{{ m['fixture']['venue']['city'] }}</p>
						<p class="fixture-board-venue">
							{{ m['fixture']['venue']['name'] }}
						</p>
					</div>
					<div class="fixture-team flex">
						<img :src="m['teams']['away']['logo']" alt="" class="team-logo" />
						<p>{{ m['teams']['away']['name'] }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="fixture-menu mt-2">RESULTS</div>
		<div class="fixture-result-board">
			<div class="fixture-container" v-for="m in schedule" :key="m.fixture.id">
				<div
					v-if="
						checkSameDate(new Date(m['fixture']['date']).toDateString()) &&
						m['fixture']['status']['short'] === 'FT'
					"
					class="fixture-date box"
				>
					{{ new Date(m['fixture']['date']).toDateString() }}
				</div>
				<div class="fixture-list flex">
					<div class="fixture-team flex">
						<img :src="m['teams']['home']['logo']" alt="" class="team-logo" />
						<p>{{ m['teams']['home']['name'] }}</p>
					</div>
					<div class="fixture-board fixture-board-info flex">
						<p>{{ m['fixture']['status']['short'] }}</p>
						<div class="flex p-1">
							<p class="fixture-score">{{ m['score']['fulltime']['home'] }}</p>
							<p>:</p>
							<p class="fixture-score">{{ m['score']['fulltime']['away'] }}</p>
						</div>
						<p class="fixture-board-venue">
							{{ m['fixture']['venue']['name'] }}
						</p>
					</div>
					<div class="fixture-team flex">
						<img :src="m['teams']['away']['logo']" alt="" class="team-logo" />
						<p>{{ m['teams']['away']['name'] }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getNextFixture, getMatchDuringFixture } from '../api/index';

export default {
	name: 'ScheduleInfo',
	data() {
		return {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			day: 31,
			resultDate: '',
			schedule: [],
			next: [],
		};
	},
	methods: {
		setMonth(x) {
			if (x == 0) {
				this.year -= 1;
				this.month = 12;
			} else if (x == 13) {
				this.year += 1;
				this.month = 1;
			} else {
				this.month = x;
			}
		},
		setSchedule() {
			if ([1, 3, 5, 7, 8, 10, 12].includes(this.month)) this.day = 31;
			else if (this.month == 2)
				if (this.year % 4) this.day = 29;
				else this.day = 28;
			else this.day = 30;

			getMatchDuringFixture(this.day, this.month, this.year).then(response => {
				this.schedule = response.map(item => {
					if (item.fixture.status.short == 'FT') {
						return item;
					}
				});

				this.sortSchedule();
			});
		},
		sortSchedule() {
			this.schedule.sort(function (a, b) {
				if (a.fixture.date < b.fixture.date) {
					return 1;
				}
				if (a.fixture.date > b.fixture.date) {
					return -1;
				}
				return 0;
			});
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
		getNextFixture().then(response => {
			this.next = response;
		});

		this.setSchedule();
	},

	watch: {
		month: function () {
			this.setSchedule();
		},
	},
};
</script>

<style>
.fixture-container {
	border-color: #00000030;
	border-width: 0.3px 0 0 0;
	border-style: solid;
}
.fixture-date {
	height: 30px;
	width: 100%;
	padding: 3px 15px;
	font-weight: bold;
	background: rgba(0, 0, 0, 0.055);
}
.fixture-list {
	padding: 5px;
	border-color: #00000030;
	border-width: 0 0 0.3px 0;
	border-style: solid;
}

.fixture-board {
	width: 40%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 10px;
}

.fixture-board > div p {
	text-align: center;
	font-weight: bold;
	font-size: 18px;
}

.fixture-board .fixture-board-venue {
	text-align: center;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.fixture-board-info {
	font-size: 13px;
}

.fixture-board-date {
	font-weight: 800;
}

.fixture-team {
	width: 30%;
	font-size: 13px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.fixture-score {
	background: rgb(56, 0, 61);
	width: 30px;
	height: 30px;
	border-radius: 5px;
	color: white;
	margin: 0 5px;
}
.fixture-menu {
	height: 40px;
	padding: 10px;
	font-weight: bold;
	background: rgb(0 0 0 / 5%);
}

.fixture-next-board {
	max-height: 30%;
	height: fit-content;
	overflow: scroll;
}

.fixture-result-board {
	max-height: 60%;
	height: fit-content;

	overflow: scroll;
}
</style>
