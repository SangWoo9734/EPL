<template>
	<div class="view-wrapper">
		<div class="board-season flex pt-2 pb-2">
			<button @click="setMonth(this.month - 1)">&lt;</button>
			<p style="padding-top: 2px">{{ this.year + '-' + this.month }}</p>
			<button @click="setMonth(this.month + 1)">&gt;</button>
		</div>
		<div class="fixture-menu">UPCOMMING MATCHES</div>
		<ScheduleUpcomming :nextSchedule="next" />

		<div class="fixture-menu">RESULTS</div>
		<ScheduleResult :schedule="schedule" />
	</div>
</template>

<script>
import ScheduleUpcomming from '../components/Schedule/ScheduleUpcomming.vue';
import ScheduleResult from '../components/Schedule/ScheduleResult.vue';
import { getNextFixture, getMatchDuringFixture } from '../api/index';

export default {
	name: 'SchedulePage',
	data() {
		return {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			day: 31,
			schedule: [],
			next: [],
		};
	},
	components: {
		ScheduleUpcomming,
		ScheduleResult,
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
.view-wrapper {
	height: calc(100% - 45px);
	overflow: auto;
}
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
	background: #ebebeb;
	padding: 5px;
	border-radius: 10px;
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
	line-height: 33px;
}
.fixture-menu {
	height: 40px;
	padding: 10px;
	font-weight: bold;
	background: rgb(0 0 0 / 5%);
}

.fixture-next-board {
	height: calc(30% - 40px);
	overflow: scroll;
}

.fixture-result-board {
	height: calc(70% - 93px);
	overflow: scroll;
}

.fixture-noschedule {
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100% - 10px);
	margin: 5px;
	border: 3px dashed #38003d;
	border-radius: 5px;
	text-align: center;
	font-size: 30px;
	font-weight: bold;
}
</style>
