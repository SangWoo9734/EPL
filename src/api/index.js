import axios from 'axios';

const ORIGINAL_HEADERS = {
	'x-RapidAPI-host': 'api-football-v1.p.rapidapi.com',
	'x-RapidAPI-key': process.env.VUE_APP_API_KEY,
};

const BETA_HEADERS = {
	'x-RapidAPI-host': 'api-football-beta.p.rapidapi.com',
	'x-RapidAPI-key': process.env.VUE_APP_API_KEY,
};

// 다음 경기 일정 데이터 요청
const getNextFixture = async () => {
	if (sessionStorage.getItem('matchScheduleData')) {
		const savedData = JSON.parse(sessionStorage.getItem('matchScheduleData'));
		return savedData;
	}
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/fixtures', {
			params: { league: '39', next: '10' },
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			const matchScheduleData = response.data.response;
			sessionStorage.setItem(
				'matchScheduleData',
				JSON.stringify(matchScheduleData),
			);
			return response.data.response;
		})
		.catch(error => {
			console.log(error);
		});
};

// 기간(1달)내 경기 결과 데이터 요청
const getMatchDuringFixture = async (day, month, year) => {
	if (
		JSON.parse(sessionStorage.getItem('matchResultData'))?.date ==
		`${year}-${month}-${day}`
	) {
		const savedData = JSON.parse(sessionStorage.getItem('matchResultData'));
		return savedData.data;
	}
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/fixtures', {
			params: {
				league: '39',
				season: month <= 6 ? year - 1 : year,
				from:
					month > 10 ? year + '-' + month + '-01' : year + '-0' + month + '-01',
				to:
					month > 10
						? year + '-' + month + '-01'
						: year + '-0' + month + '-' + day,
			},
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			const matchResultData = response.data.response;
			sessionStorage.setItem(
				'matchResultData',
				JSON.stringify({
					date: `${year}-${month}-${day}`,
					data: matchResultData,
				}),
			);
			return response.data.response;
		})
		.catch(error => {
			console.log(error);
		});
};

// 시즌 중 팀 데이터 요청
const getTeamInfo = async teamId => {
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL_BETA + '/teams/statistics', {
			params: { team: teamId, season: '2021', league: '39' },
			headers: BETA_HEADERS,
		})
		.then(response => {
			return response.data.response;
		})
		.catch(error => {
			console.log(error);
		});
};

// 도움 순위 데이터 요청
const getAssistRank = async season => {
	if (JSON.parse(sessionStorage.getItem('assistRank'))?.season == season) {
		const savedData = JSON.parse(sessionStorage.getItem('assistRank'));
		return savedData.data;
	}

	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/players/topassists', {
			params: { league: '39', season: season },
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			const assistRankData = response.data.response.slice(0, 15);
			sessionStorage.setItem(
				'assistRank',
				JSON.stringify({
					season: season,
					data: assistRankData,
				}),
			);
			return assistRankData;
		})
		.catch(error => {
			console.log(error);
		});
};

// 득점 순위 데이터 요청
const getGoalRank = async season => {
	if (JSON.parse(sessionStorage.getItem('scoreRank'))?.season == season) {
		const savedData = JSON.parse(sessionStorage.getItem('scoreRank'));
		return savedData.data;
	}

	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/players/topscorers', {
			params: { league: '39', season: season },
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			const scoreRankData = response.data.response.slice(0, 15);
			sessionStorage.setItem(
				'scoreRank',
				JSON.stringify({
					season: season,
					data: scoreRankData,
				}),
			);
			return scoreRankData;
		})
		.catch(error => {
			console.log(error);
		});
};

// 시즌 중 리그 순위 테이블 데이터 요청
const getTeamRanking = async season => {
	if (JSON.parse(sessionStorage.getItem('teamRank'))?.season == season) {
		const savedData = JSON.parse(sessionStorage.getItem('teamRank'));
		return savedData.data;
	}

	return await axios
		.get(process.env.VUE_APP_API_BASE_URL_BETA + '/standings', {
			params: { league: '39', season: season },
			headers: BETA_HEADERS,
		})
		.then(response => {
			const teamRankData = response.data.response[0].league.standings;
			sessionStorage.setItem(
				'teamRank',
				JSON.stringify({
					season: season,
					data: teamRankData,
				}),
			);
			return teamRankData;
		})
		.catch(error => {
			console.log(error);
		});
};

export {
	getNextFixture,
	getMatchDuringFixture,
	getTeamInfo,
	getAssistRank,
	getGoalRank,
	getTeamRanking,
};
