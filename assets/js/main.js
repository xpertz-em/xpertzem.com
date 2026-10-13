/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license
	(html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ null,      '480px'  ]
	});

	// Hack: Enable IE flexbox workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.
	$('form').on('click', '.submit', function(event) {
		event.stopPropagation();
		event.preventDefault();

		$(this).parents('form').submit();
	});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function(event) {

				var $this = $(this),
					href = $this.attr('href');

				// Ignore external links.
				if (!href || href.charAt(0) != '#')
					return;

				var $section = $(href);

				// Ignore links without a matching section.
				if (!$section.length)
					return;

				// Activate the clicked navigation item immediately.
				$sidebar_a.removeClass('active active-locked');

				$this
					.addClass('active')
					.addClass('active-locked');

				// Start the target section's reveal immediately.
				$section.removeClass('inactive');

				// If the target contains spotlight sections,
				// reveal the relevant spotlight content immediately.
				var $spotlights = $section.find('.spotlights > section');

				if ($spotlights.length) {
					$spotlights.removeClass('inactive');
				}

			})
			.each(function() {

				var $this = $(this),
					id = $this.attr('href'),
					$section;

				// Ignore external links or missing targets.
				if (!id || id.charAt(0) != '#')
					return;

				$section = $(id);

				if (!$section.length)
					return;

				// Scrollex: sidebar sections.
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',

					initialize: function() {
						$section.addClass('inactive');
					},

					enter: function() {

						$section.removeClass('inactive');

						// Update the active navigation item only when
						// no click-triggered navigation is locked.
						if ($sidebar_a.filter('.active-locked').length == 0) {

							$sidebar_a.removeClass('active');
							$this.addClass('active');

						}
						else if ($this.hasClass('active-locked')) {
							$this.removeClass('active-locked');
						}

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 200,

		offset: function() {

			// On medium-to-large layouts, offset by the sidebar height.
			if (breakpoints.active('<=large')
			&& !breakpoints.active('<=small')
			&& $sidebar.length > 0)
				return $sidebar.height();

			return 0;

		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',

			initialize: function() {
				$(this).addClass('inactive');
			},

			enter: function() {
				$(this).removeClass('inactive');
			}
		})
		.each(function() {

			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// Assign image.
			if ($img.length && $img.attr('src'))
				$image.css('background-image', 'url(' + $img.attr('src') + ')');

			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide the original image.
			$img.hide();

		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',

			initialize: function() {
				$(this).addClass('inactive');
			},

			enter: function() {
				$(this).removeClass('inactive');
			}
		});

})(jQuery);