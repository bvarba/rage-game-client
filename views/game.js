'use strict';


const html = require('choo/html')
const t = require('../i18n')

module.exports = (state, prev, send) => {
	return html`
<section class="page page--game">
	<h1 class="page-title">
	</h1>

	<main class="page-main">
		<ul class="game-players">
		${state.game.players.map(playerSpot)}
		<span class="game-turn">${state.game.turn} / ${state.game.maxTurns}</span>
		</ul>

		<div class="aim-container">
			<div class="aim-0" onclick=${e => send('game:hit', 0)}></div>
			<div class="aim-clutch aim-clutch--left ${state.game.isClutch ? 'aim-clutch--active' : ''}" onclick=${e => state.game.isClutch ? send('game:clutch') : null}></div>
			<div class="aim-clutch aim-clutch--right ${state.game.isClutch ? 'aim-clutch--active' : ''}" onclick=${e => state.game.isClutch ? send('game:clutch') : null}></div>
			<div class="aim">
				<div class="aim-1" onclick=${e => send('game:hit', 1)}></div>
				<div class="aim-2" onclick=${e => send('game:hit', 2)}></div>
				<div class="aim-5" onclick=${e => send('game:hit', 5)}></div>
			</div>
		</div>
	</main>

	<footer class="page-footer">
		<span class="game-undo button-outline" title="Undo" ${!state.game.prevState ? 'hidden' : ''} onclick=${(e) => send('game:undoTurn')}>${t('Undo', state.lang)}</span>
		<a class="button" href="/">${ t('Exit', state.lang)}</a>
	</footer>
</section>

`

	function playerSpot (player) {
		return html`
		<li class="game-player ${state.game.currentPlayerId === player.id ? 'game-player--active' : ''}">
			<img class="game-player-image" src="${state.baseUrl}/images/${player.user.avatar}"/>
			<h4 class="game-player-name">${player.user.name}</h4>
			<span class="game-player-score">${player.score.reduce((c,p) => c+p, 0) || 0}</span>
		</li>
		`
	}
}
