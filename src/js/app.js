jQuery(document).ready(function($) {  
	var box = $('#meta-image-generate');

	box.on('click', '.meta-image-run', function(e) {
		e.preventDefault();

		var wait = function() {
			box.find('.button').toggleClass('disabled');
			box.find('.spinner').toggleClass('is-active');
		}

		var data = {
			action: 'meta_image_generate',
			post: box.data('post'),
			text: box.find('.meta-image-text').val()
		}

		var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json');

		xhr.done(function(answer) {
			wait();

			if(answer.success === false)
				return console.log(answer.data);

			return box.find(".meta-image-preview").attr('src', answer.data);
		});    

		return wait();
	});
});
