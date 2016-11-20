'use strict';


const html = require('choo/html')
const avatars = require('../avatars')
const t = require('../i18n')

module.exports = (state, prev, send) => {
	return html`
	<section class="page page--players">
		<h1 class="page-title">${ t('Players', state.lang)}</h1>

		<main class="page-main">
			<ul class="players-list">
			${ state.users.map(playerItem) }
			</ul>

			<p>
				${t('Enter unique user name and email to create a profile at rage.')}
			</p>
			<p>
				${t('After your session you will get an email with your score and improvements.')}
			</p>

			<div class="popup-avatars popup" ${state.selectAvatar ? '' : 'hidden' }>
				${ state.avatars.map(avatarItem) }
			</div>
		</main>

		<footer class="page-footer">
			<a class="button" href="/">${ t('Exit', state.lang)}</a>
			<button class="button" ${ state.users.every(user => user.signedIn) ? '' : 'disabled'} onclick=${e => {
				if (state.users.every(user => user.signedIn)) {
					send('game:create', state.users)
					send('location:setLocation', { location: '/game' })
				} else {
					e.preventDefault()
				}
			}}>${ t('Start game!', state.lang)}</button>
		</footer>
	</section>
	`;

	function avatarItem (avatar) {
		return html`
			<div class="popup-item avatar" onclick=${e => send('setAvatar', avatar)}><img class="avatar-image" src="${state.baseUrl}/images/${avatar}"/></div>
		`;
	}

	function playerItem (user) {
		return html`
		<li class="player">
			<div class="player-avatar avatar" onclick=${e => {
				send('randomizeAvatar', user)
				send('saveUser', user)
			}}><img class="avatar-image" src="${state.baseUrl}/images/${user.avatar}"/></div>
			<div class="player-credentials">
				<input class="text-input player-name" placeholder="Name" type="text" value="${user.name}" oninput=${e => send('updateUser', {id: user.id, name: e.target.value })} onblur=${e => {
					setTimeout(() => {
						if (document.activeElement !== e.target.parentNode.querySelector('.player-email')) {
							send('saveUser', user)
						}
					}, 5)
				}}/>
				<input class="text-input player-email" placeholder="Email" type="email" value="${user.email}" oninput=${e => send('updateUser', {id: user.id, email: e.target.value })} onblur=${e => send('saveUser', user)}/>
				<div class="player-status">
					<i ${ user.error ? '' : 'hidden'} class="material-icons player-status-error">highlight_off</i>
					<i ${ user.signedIn ? '' : 'hidden'} class="material-icons player-status-success">done</i>
				</div>
			</div>
			<div class="player-message">${user.error || ''}</div>
		</li>
		`;
	}
}
