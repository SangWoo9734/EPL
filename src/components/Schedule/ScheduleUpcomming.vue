<template>
	<div class="fixture-next-board">
		<div v-if="nextSchedule.length != 0">
			<div
				class="fixture-container"
				v-for="match in nextSchedule"
				:key="match.fixture.id"
			>
				<div class="fixture-list flex">
					<div class="fixture-team flex">
						<img
							:src="match['teams']['home']['logo']"
							alt="logo_default"
							class="team-logo"
						/>
						<p>{{ match['teams']['home']['name'] }}</p>
					</div>
					<div class="fixture-board fixture-board-info flex">
						<p class="fixture-board-date">
							{{ new Date(match['fixture']['date']).toDateString() }}
						</p>
						<p>{{ match['fixture']['venue']['city'] }}</p>
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
	name: 'ScheduleUpcomming',
	props: {
		nextSchedule: { type: Array, default: null },
	},
};
</script>

<style scoped></style>
