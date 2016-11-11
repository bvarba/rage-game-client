'use strict';

require('enable-mobile')
const choo = require('choo')
const html = require('choo/html')
const extend = require('just-extend')
const insertCSS = require('insert-styles')
const config = require('./config')
const fs = require('fs')


insertCSS(fs.readFileSync(__dirname + '/index.css', 'utf-8'));


const app = choo()


app.model({
	namespace: 'game',
	state: {
		title: 'Throw-o-ling',
		players: [],
		turn: 1,
		maxTurns: 10,
		currentPlayer: 0,
		isClutch: false,
		clutchTurns: new Set([5, 10]),
		clutchHit: 7,
		isEnded: false
	},
	subscriptions: [
		(send, done) => {
			//init players
			send('game:addPlayer', {name: 'Alex'}, done);
			send('game:addPlayer', {name: 'Yummi'}, done);
			// send('game:addPlayer', {name: 'Leo'}, done);
		}
	],
	effects: {
		clutch: (score, state, send, done) => {
			if (state.clutchTurns.has(state.turn)) {
				send('game:hit', state.clutchHit, done);
			}
			else {
				send('game:hit', 0, done);
			}
		},
		hit: (score, state, send, done) => {
			if (state.turn >= state.maxTurns) {
				send('game:end', null, () => {});
				send('location:setLocation', {location: 'stats'}, done);
			}
			else {
				send('game:nextTurn', score, done);
			}
		},
		//send stats to server
		save: () => {

		}
	},
	reducers: {
		nextTurn: (score, state) => {
			if (state.isEnded) return state;

			score = score || 0;
			state.players[state.currentPlayer].score.push(score);
			state.currentPlayer ++;
			if (state.currentPlayer >= state.players.length) {
				state.currentPlayer = 0;
				state.turn++;
			};
			return state;
		},
		undoTurn: (_, state) => {

		},
		end: (_, state) => {
			state.isEnded = true;
			return state;
		},
		addPlayer: (user, state) => {
			state.players.push({
				id: state.players.length,
				user: user,
				score: [],
			});
			return state;
		}
	}
})


app.model({
	state: {
		//app state
		title: 'Rage Academy',
		language: 'en',
		maxPlayers: 3,
		players: [],

		//UI state
		currentPlayer: null
	},
	reducers: {
		// addPlayer: (data, state) => {
		// 	if (state.players.length >= state.maxPlayers) return state;

		// 	state.players.push(data);
		// 	return state;
		// },
		setLanguage: (data, state) => {
			state.language = data;
			return state;
		},
		setPlayers: (count, state) => {
			state.maxPlayers = count;
			state.players.length = count;
			return state;
		},
		updatePlayer: (data, state) => {
			extend(state.players[data.player.id], data.data)
			return state;
		},
		//create empty players list
		initPlayers: (data, state) => {
			for (let i = 0; i < state.maxPlayers; i++) {
				state.players[i] = {
					id: i,
					name: '',
					email: '',
					avatar: config.avatars[Math.floor(Math.random() * config.avatars.length)]
				}
			}

			return state;
		},
		randomizeAvatar: (player, state) => {
			let avatar = player.avatar;

			while (avatar == player.avatar) {
				avatar = config.avatars[Math.floor(Math.random() * config.avatars.length)];
			}

			player.avatar = avatar;
			state.players[player.id] = player;

			return state;
		}
	}
})





app.router(route => [
	// route('/', require('./views/main')),
	// route('players', require('./views/players')),
	route('/', require('./views/game')),
	// route('stats', require('./views/stats'))
])

const tree = app.start();

document.body.classList.add('game');
document.body.appendChild(tree);


