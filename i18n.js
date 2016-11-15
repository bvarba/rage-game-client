module.exports = t;

const locale = {
	"fr": {
		"Results": "Résultats",
		"Save": "Enregistrer",
		"Saved": "Enregistré",
		"New game": "Jouer à nouveau",
		"Exit": "Sortie",
		"Score": "Score",
		"Clutches": "Prise",
		"Language": "Langue",
		"Number of players": "Nombre de joueurs",
		"Go!": "Aller!",
		"Players": "Joueurs",
		"Start game!": "Commencer le jeu!",
		"Back": "Arrière"
	}
}

function t (key, lang) {
	if (!locale[lang]) return key;
	return locale[lang][key] || key;
}

