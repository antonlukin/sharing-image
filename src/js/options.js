(function($) {

	var Options = {
		root: null,

		breadcrumbs: function(item) {
			var nav = Options.root.find('.social-image__breadcrumbs');

			if(typeof item === 'undefined' || !item)
				return nav.find('li:first-child').nextAll().hide();

			nav.find('li:eq(1)').show();
			nav.find('li:eq(2)').text(item).show();
		},

		init: function(_root) {
			Options.root = _root;

			Options.breadcrumbs();
		}
	}

	$(document).ready(function() {
		var _root = $('#social-image-options');

		if(_root.length < 1)
			return false;


       $( ".social-image__catalog" ).sortable({
				 cancel: ".social-image__item--new"
			 });
    $( ".social-image__catalog" ).disableSelection();

		return Options.init(_root);
	});

})(jQuery);
