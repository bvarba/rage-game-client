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


//current game model
app.model({
	namespace: 'game',
	state: {
		title: 'Throw-o-ling',
		players: [],
		turn: 1,
		maxTurns: 10,
		currentPlayerId: 0,
		isClutch: false,
		clutchTurns: new Set([5, 10]),
		clutchScore: 7,
		maxPlayers: 3,
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
				send('game:hit', {
					score: state.clutchScore,
					clutch: true
				}, done);
			}
			else {
				send('game:hit', 0, done);
			}
		},
		hit: (data, state, send, done) => {
			if (state.turn >= state.maxTurns) {
				send('game:end', null, () => {});
				send('location:setLocation', {location: 'stats'}, done);
			}
			else {
				send('game:nextTurn', data, done);
			}
		},
		//send stats to server
		save: () => {

		}
	},
	reducers: {
		nextTurn: (data, state) => {
			if (state.isEnded) return state;

			if (typeof data === 'number') data = {score: data};

			data = data || {};
			data.score = data.score || 0;
			state.players[state.currentPlayerId].score.push(data.score);

			if (data.clutch) {
				state.players[state.currentPlayerId].clutches++;
			}

			state.currentPlayerId++;
			if (state.currentPlayerId >= state.players.length) {
				state.currentPlayerId = 0;
				state.turn++;
			};

			if (state.clutchTurns.has(state.turn)) {
				state.isClutch = true;
			}
			else {
				state.isClutch = false;
			}

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
				clutches: 0
			});
			return state;
		}
	}
})


//session model
app.model({
	state: {
		title: 'Rage Academy',
		language: 'en',
		users: []
	},
	reducers: {
		setLanguage: (data, state) => {
			state.language = data;
			return state;
		},
		setUsers: (count, state) => {
			state.users.length = 3;
			return state;
		},
		updateUser: (data, state) => {
			extend(state.users[data.player.id], data.data)
			return state;
		},
		//create empty users list
		initPlayers: (data, state) => {
			for (let i = 0; i < state.users.length; i++) {
				state.users[i] = {
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
			state.users[player.id] = player;

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


