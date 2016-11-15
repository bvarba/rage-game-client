'use strict';


const html = require('choo/html')
const t = require('../i18n')

module.exports = (state, prev, send) => html`
<section class="page page--main">
	<div class="main-content">
	<h1 class="page-title">${ t('Rage Academy', state.lang) }</h1>

	<br>
	<br>
	<h2>${ t('Language', state.lang)}</h2>
	<div class="switch switch--lang">
		<input type="radio" class="switch-input" ${ state.lang === 'en' ? 'checked' : '' } id="lang-1" name="lang" onclick=${e => send('setLanguage', 'en')}/><label for="lang-1" class="switch-label">English</label>
		<input type="radio" class="switch-input" ${ state.lang === 'fr' ? 'checked' : '' } id="lang-2" name="lang" onclick=${e => send('setLanguage', 'fr')}/><label for="lang-2" class="switch-label">Français</label>
	</div>

	<br>
	<br>

	<h2 class="title">${ t('Number of players', state.lang)}</h2>
	<div class="switch switch--players">
		<input type="radio" class="switch-input" ${ state.users.length === 1 ? 'checked' : '' } id="players-1" name="players" onclick=${e => send('setUsers', 1)}/><label for="players-1" class="switch-label">1</label>
		<input type="radio" class="switch-input" ${ state.users.length === 2 ? 'checked' : '' } id="players-2" name="players" onclick=${e => send('setUsers', 2)}/><label for="players-2" class="switch-label">2</label>
		<input type="radio" class="switch-input" ${ state.users.length === 3 ? 'checked' : '' } id="players-3" name="players" onclick=${e => send('setUsers', 3)}/><label for="players-3" class="switch-label">3</label>
	</div>

	<br>
	<br>

	<a href="/players" class="button" onclick=${e => send('initUsers')}>${ t('Go!', state.lang)}</a>

	</div<
</section>
`;
