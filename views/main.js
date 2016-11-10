'use strict';


const html = require('choo/html')


module.exports = (state, prev, send) => html`
<section class="page page--main">
	<h1 class="page-title">${ state.title }</h1>

	<br>

	<h2>Language</h2>
	<div class="switch switch--lang">
		<input type="radio" class="switch-input" ${ state.language === 'en' ? 'checked' : '' } id="lang-1" name="lang" onclick=${e => send('setLanguage', 'en')}/><label for="lang-1" class="switch-label">English</label>
		<input type="radio" class="switch-input" ${ state.language === 'fr' ? 'checked' : '' } id="lang-2" name="lang" onclick=${e => send('setLanguage', 'fr')}/><label for="lang-2" class="switch-label">Français</label>
	</div>

	<br>

	<h2 class="title">Number of players</h2>
	<div class="switch switch--players">
		<input type="radio" class="switch-input" ${ state.maxPlayers === 1 ? 'checked' : '' } id="players-1" name="players" onclick=${e => send('setPlayers', 1)}/><label for="players-1" class="switch-label">1</label>
		<input type="radio" class="switch-input" ${ state.maxPlayers === 2 ? 'checked' : '' } id="players-2" name="players" onclick=${e => send('setPlayers', 2)}/><label for="players-2" class="switch-label">2</label>
		<input type="radio" class="switch-input" ${ state.maxPlayers === 3 ? 'checked' : '' } id="players-3" name="players" onclick=${e => send('setPlayers', 3)}/><label for="players-3" class="switch-label">3</label>
	</div>

	<br>
	<br>

	<a href="/players" class="button" onclick=${e => send('initPlayers')}>Start game</a>
</section>
`;
