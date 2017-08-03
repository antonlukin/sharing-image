jQuery(document).ready(function($) {  
 	if (typeof wp.media === 'undefined') return;  

	var frame;
	var box = $('#meta-image-generate');

	var notice = function(text) {
		var el = box.find('.meta-image-error');

		if(typeof text !== 'undefined')
			return el.html(text).addClass('is-active');

		return el.removeClass('is-active');
	}    

	var wait = function(stop) {
		box.find('.button').toggleClass('disabled');
		box.find('.spinner').toggleClass('is-active');

		return notice();
	}

	box.on('click', '.meta-image-fullsize', function(e) {
		e.preventDefault();

		var url = $(this).find('.meta-image-preview').attr('src');

		if(url.length > 0)
			return window.open(url, '_blank');
	});
 
	box.on('click', '.meta-image-run', function(e) {
		e.preventDefault();

		var data = {
			action: 'meta_image_generate',
			post: box.data('post'),
			text: box.find('.meta-image-text').val(),
			contrast: box.find('.meta-image-contrast').val(),
 			brightness: box.find('.meta-image-brightness').val()
		}

		var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json');

		xhr.done(function(answer) {
			wait(true);

			if(answer.success === false)
				return notice(answer.data);

 			box.find('.meta-image-delete').addClass('is-active'); 

			return box.find('.meta-image-preview').attr('src', answer.data);
		});    

		return wait();
	});


	box.on('click', '.meta-image-library', function(e) {
		e.preventDefault();

		if(frame)
			return frame.open();

		frame = wp.media({
			title: meta_image_options.choose,
			multiple: false
		});

		frame.on('select', function() {
			var attachment = frame.state().get('selection').first().toJSON();

			var data = {
				action: 'meta_image_library',
				post: box.data('post'),
				url: attachment.url
			}                   

			var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json'); 

			xhr.done(function(answer) {
				wait(true);

				if(answer.success === false)
					return notice(answer.data); 

				box.find('.meta-image-delete').addClass('is-active');

				return box.find('.meta-image-preview').attr('src', answer.data);             
			});

			return wait();
		});

		return frame.open();
	});


	box.on('click' , '.meta-image-delete', function(e) {
		e.preventDefault();

		var data = {
			action: 'meta_image_delete',
			post: box.data('post')
		}                   

 		var xhr = $.ajax({method: 'POST', url: box.data('ajaxurl'), data: data}, 'json');

		xhr.done(function(answer) {
			wait(true);

			if(answer.success === false)
				return notice(answer.data);  

			box.find('.meta-image-delete').removeClass('is-active'); 

			return box.find('.meta-image-preview').attr('src', '');   
		});

		return wait();
	});
});
