const logos = ['win11','html5','apache','office','css3','powerpoint','edge','aftereffects','excel','firefox',
	'discord','android','php','nodejs','visual-studio','pinterest','api','mariadb','phpmyadmin', 'sublime-text',
	'java','linkedin','raspberry','cplusplus','win10','blender','chrome','photoshop','python','skype','teams',
	'sketchup','acrobat','database','illustrator','dotnet','premierepro','github','adobe','mysql','word',
	'duckduckgo','arduino','cisco','js','docker','notion','bash','csharp','ubuntu','googledrive','git',
	'unrealengine','c','safari','outlook']

// Fonction pour mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Sélectionne tous les carrousels
const carousels = document.querySelectorAll('.carousel-logos');

// Fonction pour ajouter les logos à un élément "group"
const populateGroup = (group, logos_aleatoire) => {
	logos_aleatoire.forEach(logo => {
		const card = document.createElement('div');
		card.classList.add('card-logo');

		const img = document.createElement('img');
		img.src = `images/logos/${logo}.svg`;
		img.alt = `logo ${logo}`;

		card.appendChild(img);
		group.appendChild(card);
	});
};

// Pour chaque carrousel, on génère un ordre aléatoire distinct
carousels.forEach(carousel => {
	const groups_logos = carousel.querySelectorAll('.group-logos');
	const logos_aleatoire = shuffleArray([...logos]); // Clone le tableau et le mélange

	// On ajoute les logos au même ordre pour les deux groupes du carrousel
	groups_logos.forEach(group => {
		populateGroup(group, logos_aleatoire);
	});
});
