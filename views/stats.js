'use strict';


const html = require('choo/html')


module.exports = (state, prev, send) => html`
<section class="page page--stats">
	<h1 class="page-title">Results</h1>

	<table class="stats-table">
		<thead>
			<tr><th></th><th>Score</th><th>Clutches</th></tr>
		</thead>
		<tbody>
			${state.game.players.map(playerStats)}
		</tbody>
	</table>

	<div class="button stats-save" onclick=${e => send('game:save', state)}>Save results</div>
	<a href="/players" class="button stats-again" onclick=${e => send('game:create', state.users)}>New game</div>
	<a href="/" class="button stats-again">Exit</div>
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
