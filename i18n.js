module.exports = t;

const locale = {
	"fr": {
		"Results": "Résultats",
		"Save": "Enregistrer",
		"New game": "Jouer à nouveau",
		"Exit": "Sortie",
		"Score": "Score",
		"Clutches": "Prise"
	}
}

function t (key, lang) {
	if (!locale[lang]) return key;
	return locale[lang][key] || key;
}

