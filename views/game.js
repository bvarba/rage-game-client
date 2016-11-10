'use strict';


const html = require('choo/html')


module.exports = (state, prev, send) => {
	return html`
<section class="page page-game">
	<h1>${state.game.title}</h1>

	<div class="aim">
		<div class="aim-clutch-1" onclick=${e => send('game:clutch')}></div>
		<div class="aim-clutch-2" onclick=${e => send('game:clutch')}></div>
		<div class="aim-5" onclick=${e => send('game:hit', 5)}></div>
		<div class="aim-2" onclick=${e => send('game:hit', 2)}></div>
		<div class="aim-1" onclick=${e => send('game:hit', 1)}></div>
	</div>

	<div class="turn">
		${state.game.turn} / ${state.game.maxTurns}
	</div>

	<ul class="game-players">
	${state.game.players.map(playerSpot)}
	</ul>
</section>
`

//TODO: reflect turns in URL
	function playerSpot (player) {
		return html`
		<li class="player-spot ${state.game.currentPlayer === player ? 'player-active' : ''}">
			<img src="./images/${player.avatar}.png"/>
			${player.name}
		</li>
		`
	}
}
