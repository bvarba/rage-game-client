'use strict';


const html = require('choo/html')
const t = require('../i18n')

module.exports = (state, prev, send) => {
	return html`
	<section class="page page--stats">
		<h1 class="page-title">${t('Results', state.lang)}</h1>

		<main class="page-main">
			${state.game.players.sort((a, b) => a.score - b.score).map(playerStats)}
		</main>

		<footer class="page-footer">
			<a href="/" class="button">${t('Exit', state.lang)}</div>
			<a href="/game" class="button stats-again" onclick=${e => send('game:create', state.users)}>${t('New game', state.lang)}</div>
			<button class="button stats-save" ${state.game.saved ? 'disabled' : ''} onclick=${e => send('game:save', state)}>${t(state.game.saved ? 'Saved' : 'Save', state.lang)}</button>
		</footer>
	</section>
	`;

	function playerStats(player, i) {
		// return html`
		// <tr>
		// 	<td>${i+1}. ${user.name}</td>
		// 	<td>${player.score.reduce((c, p) => c+p, 0)}</td>
		// 	<td>${player.clutches}</td>
		// </tr>
		// `;
		let user = state.users[player.id];
		return html`
		<div class="player-stats">
			<img class="player-image avatar" src="${state.baseUrl}/images/${user.avatar}"/>
			<h2 class="player-name">${i+1}. ${user.name}</h2>

			<strong>${t('Score', state.lang)}: <span class="number">${player.score.reduce( (prev, curr) => prev + curr, 0) }</strong></span>
			<strong class="player-clutches">${t('Clutches', state.lang)}: <span class="number">${player.clutches}</strong></span>

			<ul class="player-scores">
				<li>${t('№ games', state.lang)}: <span class="number">${user.numGames != null ? user.numGames : '...'}</span></li>
				<li>${t('Total score', state.lang)}: <span class="number">${user.totalScore != null ? user.totalScore : '...'}</span></li>
				<li>${t('Average score', state.lang)}: <span class="number">${user.averageScore != null ? user.averageScore : '...'}</span></li>
				<li>${t('Best score', state.lang)}: <span class="number">${user.bestScore != null ? user.bestScore : '...'}</span></li>
		</div>
		`;
	}
}

