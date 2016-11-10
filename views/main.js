'use strict';


const html = require('choo/html')


module.exports = (state, prev, send) => html`
<section class="page page-main">
	<h1>${ state.title }</h1>
	<h2>Language</h2>
	<input type="radio" class="lang-input" ${ state.language === 'en' ? 'checked' : '' } id="lang-1" name="lang" onclick=${e => send('setLanguage', 'en')}/><label for="lang-1" class="lang-label">English</label>
	<input type="radio" class="lang-input" ${ state.language === 'fr' ? 'checked' : '' } id="lang-2" name="lang" onclick=${e => send('setLanguage', 'fr')}/><label for="lang-2" class="lang-label">Français</label>

	<h2 class="title">Number of players</h2>
	<input type="radio" class="players-input" ${ state.maxPlayers === 1 ? 'checked' : '' } id="players-1" name="players" onclick=${e => send('setPlayers', 1)}/><label for="players-1" class="players-label">1</label>
	<input type="radio" class="players-input" ${ state.maxPlayers === 2 ? 'checked' : '' } id="players-2" name="players" onclick=${e => send('setPlayers', 2)}/><label for="players-2" class="players-label">2</label>
	<input type="radio" class="players-input" ${ state.maxPlayers === 3 ? 'checked' : '' } id="players-3" name="players" onclick=${e => send('setPlayers', 3)}/><label for="players-3" class="players-label">3</label>

	<br>

	<a href="/players" onclick=${e => send('initPlayers')}>Go!</a>
</section>
`;
