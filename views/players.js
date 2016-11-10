'use strict';


const html = require('choo/html')
const avatars = require('../avatars')


module.exports = (state, prev, send) => {
	return html`
	<section class="page page-players">
		<h1>Players</h1>

		<ul class="players-list">
		${ state.players.map(playerItem) }
		</ul>

		${ state.pickingAvatar ? avatarPopup() : '' }

		<a href="/game">Start game!</a>
	</section>
	`;

	function playerItem (player) {
		return html`
		<li class="player">
			<div onclick=${e => send('showPopup', player)}><img src="${player.avatar}"/></a>
			<input placeholder="Name" type="text" value="${player.name}" oninput=${e => send('updatePlayer', {player:player, data: {name: e.target.value} })}/>
			<input placeholder="Email" type="email" value="${player.email}" oninput=${e => send('updatePlayer', {player:player, data: {email: e.target.value} })}/>
		</li>
		`;
	}


	function avatarPopup () {
		return html`
		<div class="popup popup-avatar" id="popup-1">
		<ul class="avatar-list">
		${ avatars.map(avatarItem) }
		</ul>
		</div>
		`;
	}

	function avatarItem (url) {
		return html`
		<li class="avatar-item"><img src="${url}"/></li>
		`;
	}
}
