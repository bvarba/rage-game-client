'use strict';


const html = require('choo/html')
const t = require('../i18n')

module.exports = (state, prev, send) => html`
<section class="page page--stats">
	<h1 class="page-title">${t('Results', state.lang)}</h1>

	<table class="stats-table">
		<thead>
			<tr><th>${t('Player', state.lang)}</th><th>${t('Score', state.lang)}</th><th>${t('Clutches', state.lang)}</th></tr>
		</thead>
		<tbody>
			${state.game.players.map(playerStats)}
		</tbody>
	</table>

	<a href="/" class="button">${t('Exit', state.lang)}</div>
	<a href="/game" class="button stats-again" onclick=${e => send('game:create', state.users)}>${t('New game', state.lang)}</div>
	<button class="button stats-save" ${state.game.saved ? 'disabled' : ''} onclick=${e => send('game:save', state)}>${t(state.game.saved ? 'Saved' : 'Save', state.lang)}</button>
</section>
`;

function playerStats(player) {
	return html`
	<tr>
		<td>${player.user.name}</td>
		<td>${player.score.reduce((c, p) => c+p, 0)}</td>
		<td>${player.clutches}</td>
	</tr>
	`;
}
