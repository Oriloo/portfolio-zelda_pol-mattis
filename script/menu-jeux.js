$('.menu-navigation a li').on('mouseenter', function() {
	var $this = $(this);

	// Proceed only if the item is not already active
	if (!$this.hasClass('active')) {
		// Remove 'active' from all, add to the current item
		$('.menu-navigation a li').removeClass('active');
		$this.addClass('active');

		// Get the index and set the image as before
		var index = $('.menu-navigation a li').index(this);
		var images = [
			'images/heros-link1.png',
			'images/heros-mipha1.png',
			'images/heros-ravali1.png',
			'images/heros-urbosa1.png',
			'images/heros-daruk1.png',
			'images/heros-zelda1.png'
		];
		var image = images[index] || 'images/heros-zelda1.png';

		// Change the background image and restart the animation
		$('#image-perso').css('background-image', 'url(' + image + ')');
		$('#image-perso').removeClass('animate-arriver-droite');
		void $('#image-perso')[0].offsetWidth;
		$('#image-perso').addClass('animate-arriver-droite');

		// Jouer le son de clic (créer une nouvelle instance à chaque fois)
		var clickSound = new Audio('bruitages/click-button-140881.mp3');
		clickSound.play();
	}
});
