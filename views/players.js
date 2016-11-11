'use strict';


const html = require('choo/html')
const avatars = require('../avatars')


module.exports = (state, prev, send) => {
	return html`
	<section class="page page--players">
		<h1>Players</h1>

		<ul class="players-list">
		${ state.users.map(playerItem) }
		</ul>

		<a class="button" href="/game">Start game!</a>
	</section>
	`;

	function playerItem (player) {
		return html`
		<li class="player">
			<div class="player-avatar avatar" onclick=${e => send('randomizeAvatar', player)}><img class="avatar-image" src="./images/${player.avatar}"/></div>
			<div class="player-credentials">
				<input class="text-input player-name" placeholder="Name" type="text" value="${player.name}" oninput=${e => send('updatePlayer', {player:player, data: {name: e.target.value} })}/>
				<input class="text-input player-email" placeholder="Email" type="email" value="${player.email}" oninput=${e => send('updatePlayer', {player:player, data: {email: e.target.value} })}/>
			</div>
		</li>
		`;
	}
}
