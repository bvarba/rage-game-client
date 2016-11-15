'use strict';


const html = require('choo/html')
const avatars = require('../avatars')
const t = require('../i18n')

module.exports = (state, prev, send) => {
	return html`
	<section class="page page--players">
		<h1>${ t('Players', state.lang)}</h1>

		<ul class="players-list">
		${ state.users.map(playerItem) }
		</ul>

		<a class="button" href="/game" onclick=${e => send('game:create', state.users)}>${ t('Start game!', state.lang)}</a>
	</section>
	`;

	function playerItem (player) {
		return html`
		<li class="player">
			<div class="player-avatar avatar" onclick=${e => send('randomizeAvatar', player)}><img class="avatar-image" src="${state.baseUrl}/images/${player.avatar}"/></div>
			<div class="player-credentials">
				<input class="text-input player-name" placeholder="Name" type="text" value="${player.name}" oninput=${e => send('updateUser', {player:player, data: {name: e.target.value} })}/>
				<input class="text-input player-email" placeholder="Email" type="email" value="${player.email}" oninput=${e => send('updateUser', {player:player, data: {email: e.target.value} })}/>
			</div>
		</li>
		`;
	}
}
