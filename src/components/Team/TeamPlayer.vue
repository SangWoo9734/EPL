<template>
	<div class="team-recent-detail">
		<div class="team-desc box">Players</div>
		<div class="accordion accordion-flush" id="accordionFlushExample">
			<div
				class="accordion-item pl-3"
				v-for="(position, index) in Object.keys(teamData.squad)"
				:key="position"
			>
				<h2 class="accordion-header" :id="`flush-heading-${index}`">
					<button
						class="accordion-button collapsed team-position"
						type="button"
						data-bs-toggle="collapse"
						:data-bs-target="`#flush-collapse-${index}`"
						aria-expanded="false"
						:aria-controls="`flush-collapse-${index}`"
						:style="`border-color : ${positionColor(position)}`"
					>
						{{ position }}
					</button>
				</h2>
				<div
					:id="`flush-collapse-${index}`"
					class="accordion-collapse collapse"
					:aria-labelledby="`flush-heading-${index}`"
					data-bs-parent="#accordionFlushExample"
				>
					<div class="accordion-body p-0">
						<div
							class="team-player-detail flex box"
							v-for="(player, j) in teamData.squad[position]"
							:key="j"
						>
							<div class="team-player-number">
								{{ player['number'] ? player['number'] : ' ' }}
							</div>
							<img :src="player['photo']" alt="" class="team-player-image" />
							<p class="team-player-name">{{ player['name'] }}</p>
							<div class="team-player-status">
								<p>{{ player['nationality'] }}</p>
								<p>
									<span style="font-weight: normal">appearences</span> :
									{{ player['appearences'] ? player['appearences'] : 0 }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import teamStatic from '../../assets/data/team_data.json';

export default {
	name: 'TeamPlayer',
	props: {
		teamId: { type: Number, default: 0 },
	},
	data() {
		return {
			teamData: teamStatic[this.teamId],
		};
	},
	methods: {
		positionColor(x) {
			if (x == 'Attacker') return '#F6425F';
			else if (x === 'Midfielder') return '#03D28C';
			else if (x === 'Defender') return '#2B7DEF';
			else if (x === 'Goalkeeper') return '#F2BE57';
		},
	},
};
</script>

<style scoped></style>
