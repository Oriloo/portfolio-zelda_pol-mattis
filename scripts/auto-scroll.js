$(document).ready(function(){
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();  // Empêche le comportement par défaut du lien

		var target = this.hash;  // Récupère l'ID de la cible
		var $target = $(target);

		// Désactiver les interactions en ajoutant la classe no-interaction au body
		$('body').addClass('no-interaction');

		// Scroll automatique
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 1000, 'swing', function () {
			window.location.hash = target;  // Change l'URL pour correspondre à l'ID
				
			// Réactiver les interactions après le scroll
			$('body').removeClass('no-interaction');
		});
	});
});
