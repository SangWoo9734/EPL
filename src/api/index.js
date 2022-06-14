import axios from 'axios';

const ORIGINAL_HEADERS = {
	'x-RapidAPI-host': 'api-football-v1.p.rapidapi.com',
	'x-RapidAPI-key': process.env.VUE_APP_API_KEY,
};

const BETA_HEADERS = {
	'x-RapidAPI-host': 'api-football-beta.p.rapidapi.com',
	'x-RapidAPI-key': 'b23476661dmsh02ee8d31c01bd7fp1b63acjsn46e7e2914a5e',
};

// 다음 경기 일정 데이터 요청
const getNextFixture = async () => {
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/fixtures', {
			params: { league: '39', next: '10' },
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			return response.data.response;
		})
		.catch(error => {
			console.log(error);
		});
};

// 기간(1달)내 경기 결과 데이터 요청
const getMatchDuringFixture = async (day, month, year) => {
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
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/players/topassists', {
			params: { league: '39', season: season },
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			return response.data.response.slice(0, 15);
		})
		.catch(error => {
			console.log(error);
		});
};

// 득점 순위 데이터 요청
const getGoalRank = async season => {
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL + '/players/topscorers', {
			params: { league: '39', season: season },
			headers: ORIGINAL_HEADERS,
		})
		.then(response => {
			return response.data.response.slice(0, 15);
		})
		.catch(error => {
			console.log(error);
		});
};

// 시즌 중 리그 순위 테이블 데이터 요청
const getTeamRanking = async season => {
	return await axios
		.get(process.env.VUE_APP_API_BASE_URL_BETA + '/standings', {
			params: { season: season, league: '39' },
			headers: BETA_HEADERS,
		})
		.then(response => {
			return response.data.response[0].league.standings;
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
