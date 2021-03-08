"use strict";

(function () {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', ajaxurl);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    var blob = window.URL.createObjectURL(xhr.response);
    document.querySelector('.sharing-image-poster > img').src = blob;
  };

  var formData = new window.FormData();
  formData.append('action', 'test');
  xhr.send(formData);
})();