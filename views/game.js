'use strict';


const html = require('choo/html')


module.exports = (state, prev, send) => {
	return html`
<section class="page page--game">
	<h1 class="page-title">${state.game.title}</h1>

	<div class="aim">
		<div class="aim-clutch aim-clutch--left ${state.game.isClutch ? 'aim-clutch--active' : ''}" onclick=${e => state.game.isClutch ? send('game:clutch') : null}></div>
		<div class="aim-clutch aim-clutch--right ${state.game.isClutch ? 'aim-clutch--active' : ''}" onclick=${e => state.game.isClutch ? send('game:clutch') : null}></div>
		<div class="aim-1" onclick=${e => send('game:hit', 1)}></div>
		<div class="aim-2" onclick=${e => send('game:hit', 2)}></div>
		<div class="aim-5" onclick=${e => send('game:hit', 5)}></div>
	</div>

	<h3 class="game-turn">
		Turn ${state.game.turn} / ${state.game.maxTurns}
	</h3>

	<ul class="game-players">
	${state.game.players.map(playerSpot)}
	</ul>
</section>
`

//TODO: reflect turns in URL
	function playerSpot (player) {
		return html`
		<li class="game-player ${state.game.currentPlayerId === player.id ? 'game-player--active' : ''}">
			<img class="game-player-image" src="./images/${player.user.avatar}"/>
			<h4 class="game-player-name">${player.user.name}</h4>
			<span class="game-player-score">${player.score.reduce((c,p) => c+p, 0) || 0}</span>
		</li>
		`
	}
}
