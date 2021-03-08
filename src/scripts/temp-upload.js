(function() {
  const xhr = new XMLHttpRequest();
	xhr.open( 'POST', ajaxurl );
  xhr.responseType = 'blob';

  xhr.onload = () => {
    var blob = window.URL.createObjectURL( xhr.response );

    document.querySelector( '.sharing-image-poster > img' ).src = blob;
  };

  const formData = new window.FormData();
  formData.append( 'action', 'test' );

  xhr.send( formData );
})();