jQuery(document).ready(function($) {
 	if (typeof wp.media === 'undefined') return;

	var frame;
	var box = $('#social-image-metabox');

	var notice = function(text) {
		var el = box.find('#social-image-error');

		if(typeof text !== 'undefined')
			return el.html(text).addClass('is-active');

		return el.removeClass('is-active');
	}

	var wait = function(stop) {
		box.find('.button').toggleClass('disabled');
		box.find('.spinner').toggleClass('is-active');

		return notice();
	}

	box.on('click', '#social-image-preview', function(e) {
		e.preventDefault();

		var url = box.find('#social-image-src').attr('src');

		if(url.length > 0)
			return window.open(url, '_blank');
	});

	box.on('click', '#social-image-run', function(e) {
		e.preventDefault();

		var data = {
			action: 'social_image_generate',
			post: box.data('post'),
			text: box.find('#social-image-text').val(),
			contrast: box.find('#social-image-contrast').val(),
 			brightness: box.find('#social-image-brightness').val()
		}

		var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json');

		xhr.done(function(answer) {
			wait(true);

			if(answer.success === false)
				return notice(answer.data);

 			box.find('#social-image-delete').addClass('is-active');

			return box.find('#social-image-src').attr('src', answer.data);
		});

		return wait();
	});


	box.on('click', '#social-image-library', function(e) {
		e.preventDefault();

		if(frame)
			return frame.open();

		frame = wp.media({
			title: social_image_options.choose,
			multiple: false
		});

		frame.on('select', function() {
			var attachment = frame.state().get('selection').first().toJSON();

			var data = {
				action: 'social_image_library',
				post: box.data('post'),
				url: attachment.url
			}

			var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json');

			xhr.done(function(answer) {
				wait(true);

				if(answer.success === false)
					return notice(answer.data);

				box.find('#social-image-delete').addClass('is-active');

				return box.find('#social-image-src').attr('src', answer.data);
			});

			return wait();
		});

		return frame.open();
	});


	box.on('click' , '#social-image-delete', function(e) {
		e.preventDefault();

		var data = {
			action: 'social_image_delete',
			post: box.data('post')
		}

 		var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json');

		xhr.done(function(answer) {
			wait(true);

			if(answer.success === false)
				return notice(answer.data);

			box.find('#social-image-delete').removeClass('is-active');

			return box.find('#social-image-src').attr('src', '');
		});

		return wait();
	});
});
