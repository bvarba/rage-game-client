'use strict';

require('enable-mobile')
const choo = require('choo')
const html = require('choo/html')
const extend = require('just-extend')
const insertCSS = require('insert-styles')
const config = require('./config')
const fs = require('fs')
const clone = require('deep-copy')
const http = require('choo/http')


insertCSS(fs.readFileSync(__dirname + '/index.css', 'utf-8'));


const app = choo()


//current game model
app.model({
	namespace: 'game',
	state: {
		type: 1,
		players: [],
		turn: 1,
		maxTurns: 10,
		currentPlayerId: 0,
		isClutch: false,
		clutchTurns: [5, 10],
		clutchScore: 7,
		maxPlayers: 3,
		isEnded: false,
		prevState: null
	},
	subscriptions: [
		(send, done) => {
			//fake init players
			send('game:create', [
				{name: 'Alex', avatar: config.avatars[0]},
				{name: 'Yummi', avatar: config.avatars[1]}
			], done);
		}
	],
	effects: {
		clutch: (score, state, send, done) => {
			if (state.clutchTurns.indexOf(state.turn) >= 0) {
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
			send('game:nextTurn', data, (_, state) => {
				if (state.game.turn > state.game.maxTurns) {
					//end game
					send('location:setLocation', {location: 'stats'}, done);
				}
				else {
					done();
				}
			});
		},
		//create new game with users
		create: (users, state, send, done) => {
			send('game:clear', null, () => {});
			if (!Array.isArray(users)) {
				users = [users];
			};
			users.forEach(user => {
				send('game:addPlayer', user, () => {});
			});
			send('game:update', {ts: Math.floor(Date.now()/1000)}, () => {done()});

		},
		//send stats to server
		save: (data, state, send, done) => {
			console.log('Save game results:', data);

			http({
				url: config.url + '/api/games',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					"type": data.game.type,
					"ts": data.game.ts,
					"scores": data.game.players.map(player => {
						return {
							username: player.user.name,
							score: player.score.reduce((prev, curr) => prev + curr, 0),
							clutches: player.clutches
						}
					})
				})
			}, (err, res, body) => {
				if (err) return alert('Whoa, some error happened, please show that to administrator');
				console.log('Saved as', body)

				send('game:update', {saved: true}, () => {
					done()
				});
			})
		}
	},
	reducers: {
		nextTurn: (data, state) => {
			if (state.isEnded) return state;

			let oldState = state;
			state = clone(state);

			state.prevState = oldState;

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

			if (state.clutchTurns.indexOf(state.turn) >= 0) {
				state.isClutch = true;
			}
			else {
				state.isClutch = false;
			}

			return state;
		},
		undoTurn: (_, state) => {
			if (!state.prevState) return state;
			return state.prevState;
		},
		clear: (_, state) => {
			state.players.length = 0;
			state.turn = 1;
			state.currentPlayerId = 0;
			state.isClutch = false;
			state.isEnded = false;
			state.prevState = null;
			state.saved = false;
			state.ts = null;

			return state;
		},
		update: (obj, state) => {
			return extend(state, obj);
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
		type: config.games[0].type,
		lang: 'fr',
		users: Array(3),
		// baseUrl: 'https://amazemontreal.github.io/rage-game-client'
		baseUrl: config.url,
		saved: false,
		ts: null,
		avatars: config.avatars
		// baseUrl: '.'
	},
	effects: {
		//save user to server
		saveUser: (user, state, send, done) => {
			http({
				url: config.url + '/api/users',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					"username": user.name,
					"email": user.email,
					"avatar": config.avatars.indexOf(user.avatar)
				})
			}, (err, res, body) => {
				if (err) {
					alert('Whoa, some error happened, please show that to administrator');
					console.error(err);
					return done();
				}

				console.log('Saved as', res)

				done();
			})
		},

		//check whether user/email combination is allowable
		// validateUser: (user, state, send, done) => {

		// }
	},
	reducers: {
		setLanguage: (data, state) => {
			state.lang = data;
			return state;
		},
		setUsers: (count, state) => {
			state.users.length = count;
			return state;
		},
		updateUser: (data, state) => {
			extend(state.users[data.player.id], data.data)
			return state;
		},
		//create empty users list
		initUsers: (data, state) => {
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
	route('/', require('./views/main')),
	route('players', require('./views/players')),
	route('game', require('./views/game')),
	route('stats', require('./views/stats'))
])

const tree = app.start();

document.body.classList.add('game');
document.body.appendChild(tree);


