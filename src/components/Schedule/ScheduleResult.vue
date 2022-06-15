<template>
	<div class="fixture-result-board">
		<div v-if="schedule.length != 0">
			<div
				class="fixture-container"
				v-for="match in schedule"
				:key="match.fixture.id"
			>
				<div
					v-if="
						checkSameDate(new Date(match['fixture']['date']).toDateString()) &&
						match['fixture']['status']['short'] === 'FT'
					"
					class="fixture-date box"
				>
					{{ new Date(match['fixture']['date']).toDateString() }}
				</div>
				<div class="fixture-list flex">
					<div class="fixture-team flex">
						<img
							:src="match['teams']['home']['logo']"
							alt=""
							class="team-logo"
						/>
						<p>{{ match['teams']['home']['name'] }}</p>
					</div>
					<div class="fixture-board fixture-board-info flex">
						<p>{{ match['fixture']['status']['short'] }}</p>
						<div class="flex p-1">
							<p class="fixture-score">
								{{ match['score']['fulltime']['home'] }}
							</p>
							<p>:</p>
							<p class="fixture-score">
								{{ match['score']['fulltime']['away'] }}
							</p>
						</div>
						<p class="fixture-board-venue">
							{{ match['fixture']['venue']['name'] }}
						</p>
					</div>
					<div class="fixture-team flex">
						<img
							:src="match['teams']['away']['logo']"
							alt="team_logo"
							class="team-logo"
						/>
						<p>{{ match['teams']['away']['name'] }}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="fixture-noschedule">
			<p>No Schedule.</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ScheduleResult',
	props: {
		schedule: { type: Array, default: null },
	},
	data() {
		return {
			resultDate: '',
		};
	},
	methods: {
		checkSameDate(x) {
			if (this.resultDate == x) {
				return false;
			} else {
				this.resultDate = x;
				return true;
			}
		},
	},
};
</script>

<style scoped></style>
