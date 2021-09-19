/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/scripts/helpers/param.js
/**
 * Get current location search parameter.
 *
 * @param {string} key URL parameter key.
 */
function getSearchParam(key) {
  var params = new URL(document.location.href);
  return params.searchParams.get(key);
}

/* harmony default export */ var param = (getSearchParam);
// CONCATENATED MODULE: ./src/scripts/helpers/attachment.js
/**
 * Upload media frame.
 *
 * @param {string} header Frame header text.
 * @param {Function} callback Callback function.
 */
function uploadMedia(header, callback) {
  var frame = wp.media({
    title: header,
    multiple: false
  });
  frame.on('select', function () {
    var selection = frame.state().get('selection').first().toJSON();

    if (selection.id) {
      callback(selection.id);
    }
  });
  frame.open();
}

/* harmony default export */ var attachment = (uploadMedia);
// CONCATENATED MODULE: ./src/scripts/helpers/defaults.js
/**
 * Append empty default properties to object if not exist.
 *
 * @param {Object} object Source object.
 * @param {Array} defaults Required defaults properties.
 */
function intersectDefaults(object, defaults) {
  defaults.forEach(function (item) {
    if (undefined === object[item]) {
      object[item] = {};
    }
  });
  return object;
}

/* harmony default export */ var defaults = (intersectDefaults);
// CONCATENATED MODULE: ./src/scripts/helpers/index.js



var Helper = {
  param: param,
  attachment: attachment,
  defaults: defaults
};
/* harmony default export */ var helpers = __webpack_exports__["a"] = (Helper);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/scripts/builders/element.js
/**
 * Helper to create new DOM element.
 *
 * @param {string} tag Element tagname.
 * @param {Object} args List of element options.
 */
function buildElement(tag, args) {
  var element = document.createElement(tag); // Set class list

  if (args.hasOwnProperty('classes')) {
    args.classes.forEach(function (cl) {
      element.classList.add(cl);
    });
  } // Set textContent


  if (args.hasOwnProperty('text')) {
    element.textContent = args.text;
  } // Set innerHTML


  if (args.hasOwnProperty('html')) {
    element.innerHTML = args.html;
  } // Set attributes


  if (args.hasOwnProperty('attributes')) {
    for (var key in args.attributes) {
      var value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      element.setAttribute(key, value);
    }
  } // Set data attributes


  if (args.hasOwnProperty('dataset')) {
    for (var _key in args.dataset) {
      element.setAttribute('data-' + _key, args.dataset[_key]);
    }
  } // Append child


  if (args.hasOwnProperty('append')) {
    args.append.appendChild(element);
  } // Prepend child


  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(element, args.prepend.firstChild);
  }

  return element;
}

/* harmony default export */ var builders_element = (buildElement);
// CONCATENATED MODULE: ./src/scripts/builders/input.js


/**
 * Helper to create input field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildInput(args, parent) {
  var field = builders_element('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    var label = builders_element('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  var input = builders_element('input', {
    attributes: {
      type: 'text'
    },
    dataset: args.dataset || {},
    append: field
  }); // Set attributes.

  if (args.hasOwnProperty('attributes')) {
    for (var key in args.attributes) {
      var value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      input.setAttribute(key, value);
    }
  }

  if ('range' === input.type) {
    var counter = builders.element('em', {
      text: input.value,
      append: field
    });
    input.addEventListener('change', function () {
      counter.textContent = input.value;
    });
    input.addEventListener('input', function () {
      counter.textContent = input.value;
    });
  }

  return input;
}

/* harmony default export */ var builders_input = (buildInput);
// CONCATENATED MODULE: ./src/scripts/builders/checkbox.js

/**
 * Helper to create radio field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildCheckbox(args, parent) {
  var field = builders_element('label', {
    classes: args.classes || [],
    append: parent
  });
  var checkbox = builders_element('input', {
    attributes: {
      type: 'checkbox'
    },
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (var key in args.attributes) {
      var value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      checkbox.setAttribute(key, value);
    }
  }

  if (args.hasOwnProperty('checked')) {
    var checked = args.checked;

    if (checked && checked === checkbox.value) {
      checkbox.setAttribute('checked', 'checked');
    }
  }

  if (args.hasOwnProperty('label')) {
    var label = builders_element('span', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  return checkbox;
}

/* harmony default export */ var builders_checkbox = (buildCheckbox);
// CONCATENATED MODULE: ./src/scripts/builders/radio.js

/**
 * Helper to create radio field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildRadio(args, parent) {
  var field = builders_element('label', {
    classes: args.classes || [],
    append: parent
  });
  var radio = builders_element('input', {
    attributes: {
      type: 'radio'
    },
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (var key in args.attributes) {
      var value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      radio.setAttribute(key, value);
    }
  }

  if (args.hasOwnProperty('checked')) {
    var checked = args.checked;

    if (checked && checked === radio.value) {
      radio.setAttribute('checked', 'checked');
    }
  }

  if (args.hasOwnProperty('label')) {
    var label = builders_element('span', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  return radio;
}

/* harmony default export */ var builders_radio = (buildRadio);
// CONCATENATED MODULE: ./src/scripts/builders/select.js

/**
 * Helper to create select field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildSelect(args, parent) {
  var field = builders_element('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    var label = builders_element('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  var select = builders_element('select', {
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (var key in args.attributes) {
      var value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      select.setAttribute(key, value);
    }
  }

  var options = args.options || {};

  for (var _key in options) {
    var option = builders_element('option', {
      text: options[_key],
      attributes: {
        value: _key
      },
      append: select
    });

    if (args.hasOwnProperty('selected')) {
      var selected = args.selected;

      if (selected && selected === option.value) {
        option.setAttribute('selected', 'selected');
      }
    }
  }

  return select;
}

/* harmony default export */ var builders_select = (buildSelect);
// CONCATENATED MODULE: ./src/scripts/builders/textarea.js

/**
 * Helper to create input field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildTextarea(args, parent) {
  var field = builders_element('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    var label = builders_element('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  var textarea = builders_element('textarea', {
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (var key in args.attributes) {
      var value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      textarea.setAttribute(key, value);
    }
  } // Set content


  if (args.hasOwnProperty('content')) {
    var content = args.content;

    if (undefined !== content) {
      textarea.innerHTML = content;
    }
  }

  return textarea;
}

/* harmony default export */ var builders_textarea = (buildTextarea);
// CONCATENATED MODULE: ./src/scripts/builders/control.js






/**
 * Helper to create control.
 *
 * @param {Object} args List of control options.
 */

function buildControl(args) {
  var control = builders_element('div', {
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(control);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(control, args.prepend.firstChild);
  }

  if (args.hasOwnProperty('label')) {
    builders_element('h3', {
      text: args.label,
      append: control
    });
  }

  if (args.hasOwnProperty('description')) {
    builders_element('p', {
      text: args.description,
      append: control
    });
  }

  if (args.hasOwnProperty('fields')) {
    args.fields.forEach(function (field) {
      switch (field.group) {
        case 'input':
          builders_input(field, control);
          break;

        case 'textarea':
          builders_textarea(field, control);
          break;

        case 'radio':
          builders_radio(field, control);
          break;

        case 'select':
          builders_select(field, control);
          break;

        case 'checkbox':
          builders_checkbox(field, control);
          break;
      }
    });
  }

  if (args.hasOwnProperty('help')) {
    builders_element('small', {
      text: args.help,
      append: control
    });
  }

  return control;
}

/* harmony default export */ var builders_control = (buildControl);
// CONCATENATED MODULE: ./src/scripts/builders/layer.js

/**
 * Helper to create layer.
 *
 * @param {Object} args List of layer options.
 */

function buildLayer(args) {
  var layer = builders_element('div', {
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(layer);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(layer, args.prepend.firstChild);
  }

  if (args.hasOwnProperty('label')) {
    builders_element('h2', {
      text: args.label,
      append: layer
    });
  }

  if (args.hasOwnProperty('description')) {
    builders_element('h5', {
      text: args.description,
      append: layer
    });
  }

  return layer;
}

/* harmony default export */ var builders_layer = (buildLayer);
// EXTERNAL MODULE: ./src/scripts/helpers/index.js + 3 modules
var helpers = __webpack_require__(0);

// CONCATENATED MODULE: ./src/scripts/builders/media.js



/**
 * Helper to create media block.
 *
 * @param {Object} args List of media options.
 */

function buildMedia(args) {
  var media = builders_control({
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(media);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(media, args.prepend.firstChild);
  } // Labels are required.


  args.labels = args.labels || {};
  var attachment = builders_element('input', {
    attributes: {
      type: 'hidden',
      name: args.name
    },
    append: media
  });
  var upload = builders_element('button', {
    classes: ['button'],
    text: args.labels.button,
    attributes: {
      type: 'button'
    },
    append: media
  });
  var details = builders_element('a', {
    classes: ['hidden'],
    text: args.labels.details,
    attributes: {
      target: '_blank'
    }
  });

  if (args.hasOwnProperty('link')) {
    media.appendChild(details);
  } // Helper function to update attachment value.


  var setAttachment = function setAttachment(id) {
    attachment.setAttribute('value', id);
    attachment.dispatchEvent(new Event('change', {
      bubbles: true
    }));
    var link = null;

    if (args.hasOwnProperty('link')) {
      link = new URL(args.link);
      link.searchParams.set('item', id);
      details.setAttribute('href', link.href);
    }

    if (args.remove) {
      upload.textContent = args.labels.remove;
    }

    details.classList.remove('hidden');
  }; // Helper function to remove attachment value.


  var removeAttachment = function removeAttachment() {
    attachment.setAttribute('value', '');
    attachment.dispatchEvent(new Event('change', {
      bubbles: true
    })); // Set default button title.

    upload.textContent = args.labels.button;
    details.classList.add('hidden');
  }; // Update fields if this layer has attachment.


  if (args.value) {
    setAttachment(args.value);
  }

  upload.addEventListener('click', function () {
    if (args.remove && attachment.value) {
      return removeAttachment();
    }

    helpers["a" /* default */].attachment(args.labels.heading, function (id) {
      setAttachment(id);
    });
  });
  return media;
}

/* harmony default export */ var builders_media = (buildMedia);
// CONCATENATED MODULE: ./src/scripts/builders/index.js









var Build = {
  element: builders_element,
  control: builders_control,
  layer: builders_layer,
  checkbox: builders_checkbox,
  media: builders_media,
  input: builders_input,
  textarea: builders_textarea,
  radio: builders_radio,
  select: builders_select
};
/* harmony default export */ var builders = (Build);
// CONCATENATED MODULE: ./src/scripts/sections/catalog.js

var __ = wp.i18n.__; // Store global scriot object for settings page.

var params = null;
/**
 * Create template card in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {number} index Current card index.
 * @param {Object} option List of template options.
 */

function createCard(catalog, index, option) {
  var card = builders.element('div', {
    classes: ['sharing-image-catalog-card'],
    append: catalog
  });
  var preview = builders.element('figure', {
    classes: ['sharing-image-catalog-preview'],
    append: card
  });

  if (option.preview) {
    builders.element('img', {
      attributes: {
        src: option.preview,
        alt: ''
      },
      append: preview
    });
  }

  var footer = builders.element('footer', {
    classes: ['sharing-image-catalog-footer'],
    append: card
  });
  builders.element('h2', {
    text: option.title || __('Untitled', 'sharing-image'),
    append: footer
  });
  var link = new URL(document.location.href);
  link.searchParams.set('template', index);
  builders.element('a', {
    classes: ['button'],
    text: __('Edit template', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: footer
  });
}
/**
 * Create new template button in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {number} index New card index.
 */


function createNewButton(catalog, index) {
  var link = new URL(document.location.href);
  link.searchParams.set('template', index);
  var button = builders.element('a', {
    classes: ['sharing-image-catalog-new'],
    attributes: {
      href: link.href
    },
    append: catalog
  });
  var title = builders.element('h2', {
    append: button
  });
  builders.element('strong', {
    text: __('Add new template', 'sharing-image'),
    append: title
  }); // Restrict new template creation for not Premium users.

  if (params.templates.length === 0) {
    return;
  }

  var license = params.license || {};

  if (license.premium || license.develop) {
    return;
  }

  builders.element('span', {
    text: __('(Availible for Premium only)', 'sharing-image'),
    append: title
  });

  if (params.links.premium) {
    button.href = params.links.premium;
  }
}
/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings field.
 */


function createCatalog(content, settings) {
  params = settings;
  var catalog = builders.element('div', {
    classes: ['sharing-image-catalog'],
    append: content
  });
  var index = 1;
  settings.templates.forEach(function (template) {
    createCard(catalog, index++, template);
  });
  createNewButton(catalog, index);
}

/* harmony default export */ var sections_catalog = (createCatalog);
// CONCATENATED MODULE: ./src/scripts/sections/editor.js
/**
 * Editor settings.
 */

/* global ajaxurl:true */

var editor_ = wp.i18n.__; // Store global scriot object for settings page.

var editor_params = null; // Preview element.

var editor_preview = null; // Root editor element.

var editor = null;
/**
 * Show template warning message.
 *
 * @param {string} message Warning message.
 */

function showTemplateError(message) {
  var viewport = editor_preview.parentNode; // Try to find warning element.

  var warning = viewport.querySelector('.sharing-image-editor-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || editor_('Unknown generation error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hideTemplateError() {
  var viewport = editor_preview.parentNode; // Try to find warning element.

  var warning = viewport.querySelector('.sharing-image-editor-warning');

  if (null === warning) {
    return;
  }

  warning.classList.remove('warning-visible');
}
/**
 * Geneate template using editor data.
 */


function generateTemplate() {
  editor_preview.classList.add('preview-loader');
  var request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'blob'; // Create data bundle using form data.

  var bundle = new window.FormData(editor);
  bundle.set('action', 'sharing_image_show');
  hideTemplateError(); // Set blob for success response.

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 2) {
      request.responseType = 'json';

      if (request.status === 200) {
        request.responseType = 'blob';
      }
    }
  });
  request.addEventListener('load', function () {
    var response = request.response || {}; // Hide preview loader on request complete.

    editor_preview.classList.remove('preview-blank', 'preview-loader');

    if (200 !== request.status) {
      return showTemplateError(response.data);
    }

    var image = editor_preview.querySelector('img');

    if (null === image) {
      image = builders.element('img', {
        append: editor_preview
      });
    } // Set new blob image source.


    image.src = window.URL.createObjectURL(response);
  });
  request.addEventListener('error', function () {
    showTemplateError(); // Hide preview loader on request complete.

    editor_preview.classList.remove('preview-blank', 'preview-loader');
  });
  request.send(bundle);
}
/**
 * Save template while editor submiting.
 */


function saveTemplate() {
  var request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json';
  editor_preview.classList.add('preview-loader'); // Create data bundle using editor data.

  var bundle = new window.FormData(editor);
  bundle.set('action', 'sharing_image_save');
  request.addEventListener('load', function () {
    var response = request.response || {};

    if (!response.data) {
      return showTemplateError();
    }

    if (!response.success) {
      // Hide preview loader on request complete.
      editor_preview.classList.remove('preview-loader');
      return showTemplateError(response.data);
    }

    var input = editor_preview.querySelector('input');

    if (null !== input) {
      input.value = response.data;
    }

    editor.submit();
  });
  request.addEventListener('error', function () {
    // Hide preview loader on request complete.
    editor_preview.classList.remove('preview-loader');
    showTemplateError();
  });
  request.send(bundle);
}
/**
 * Update form fields name attributes for layers
 *
 * @param {HTMLElement} designer Layouts designer element.
 */


function reorderLayers(designer) {
  var layers = designer.children;

  var _loop = function _loop(index) {
    var fields = layers[index].querySelectorAll('[name]');
    fields.forEach(function (field) {
      var name = field.getAttribute('name'); // Try to find layer index.

      var match = name.match(/(.+?\[layers\])\[(\d+)\](\[.+?\])$/);

      if (null !== match) {
        name = match[1] + "[".concat(index, "]") + match[3];
      }

      field.name = name;
    });
  };

  for (var index = 0; index < layers.length; index++) {
    _loop(index);
  }
}
/**
 * Update template background settings with custom logic.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object} data Current template data.
 */


function createPermanentAttachment(fieldset, data) {
  data.background = data.background || null; // Create background settings control.

  var control = builders.control({
    classes: ['sharing-image-editor-control', 'control-reduced'],
    label: editor_('Template background settings', 'sharing-image'),
    fields: [{
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: editor_params.name + '[background]',
        value: 'blank'
      },
      label: editor_('Do not use background image', 'sharing-image'),
      checked: data.background
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: editor_params.name + '[background]',
        value: 'dynamic'
      },
      label: editor_('Select for each post separately', 'sharing-image'),
      checked: data.background
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: editor_params.name + '[background]',
        value: 'permanent'
      },
      label: editor_('Upload permanent background', 'sharing-image'),
      checked: data.background
    }],
    append: fieldset
  });
  var media = builders.media({
    name: editor_params.name + '[attachment]',
    classes: ['sharing-image-editor-control', 'control-media'],
    value: data.attachment,
    link: editor_params.links.uploads,
    labels: {
      button: editor_('Upload image', 'sharing-image'),
      heading: editor_('Select background image', 'sharing-image'),
      details: editor_('Attachment details', 'sharing-image')
    },
    append: fieldset
  });
  var upload = media.querySelector('button');
  upload.disabled = true;
  builders.control({
    classes: ['sharing-image-editor-control'],
    label: editor_('Fill color', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        name: editor_params.name + '[fill]',
        type: 'color',
        value: data.fill
      }
    }],
    append: fieldset
  });
  control.querySelectorAll('input').forEach(function (radio) {
    if ('radio' !== radio.type) {
      return;
    } // Show upload button for checked permanent radio.


    if (radio.checked && 'permanent' === radio.value) {
      upload.disabled = false;
    }

    radio.addEventListener('change', function () {
      upload.disabled = true;

      if ('permanent' === radio.value) {
        upload.disabled = false;
      }
    });
  });
}
/**
 * Text layer dynamic/static fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string} name Fields name attribute prefix.
 * @param {Object} data Layer data object.
 */


function createDynamicFields(layer, name, data) {
  var control = builders.control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  var checkbox = builders.checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[dynamic]',
      value: 'dynamic'
    },
    label: editor_('Dynamic field. Filled in the post editing screen.', 'sharing-image'),
    checked: data.dynamic
  }, control);
  var fields = [];
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: editor_('Displayed only in the metabox.', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[title]',
        value: data.title
      },
      label: editor_('Field name', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: editor_('This field is used for example only, to see how the editor will look.', 'sharing-image'),
    fields: [{
      group: 'textarea',
      classes: ['sharing-image-editor-control-textarea'],
      content: data.sample || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      attributes: {
        name: name + '[sample]',
        rows: 2
      },
      label: editor_('Text sample', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-hidden'],
    label: editor_('Preset text field', 'sharing-image'),
    fields: [{
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[preset]',
        value: 'none'
      },
      dataset: {
        persistent: true
      },
      label: editor_('Fill in manually', 'sharing-image'),
      checked: data.preset || 'none'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[preset]',
        value: 'title'
      },
      dataset: {
        persistent: true
      },
      label: editor_('Take from post title', 'sharing-image'),
      checked: data.preset || 'none'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[preset]',
        value: 'excerpt'
      },
      dataset: {
        persistent: true
      },
      label: editor_('Use post excerpt text', 'sharing-image'),
      checked: data.preset || 'none'
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-extend'],
    help: editor_('You can use non-breaking spaces to manage your string position.', 'sharing-image'),
    fields: [{
      group: 'textarea',
      classes: ['sharing-image-editor-control-textarea'],
      content: data.content,
      attributes: {
        name: name + '[content]',
        rows: 2
      },
      label: editor_('Content', 'sharing-image')
    }],
    append: layer
  }); // Helper function to toggle contols visibility.

  var toggleClasses = function toggleClasses() {
    fields.forEach(function (field) {
      field.classList.toggle('control-hidden');
    });
  };

  if (checkbox.checked) {
    toggleClasses();
  }

  checkbox.addEventListener('change', function () {
    toggleClasses();
  });
}
/**
 * Text layer more options fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string} name Fields name attribute prefix.
 * @param {Object} data Layer data object.
 */


function createMoreFields(layer, name, data) {
  var fields = [];
  fields[fields.length] = createFontField(layer, name, data);
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-hidden'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        type: 'color',
        name: name + '[color]',
        value: data.color || '#ffffff'
      },
      label: editor_('Text color', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-series', 'control-hidden'],
    fields: [{
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        left: editor_('Left', 'sharing-image'),
        center: editor_('Center', 'sharing-image'),
        right: editor_('Right', 'sharing-image')
      },
      attributes: {
        name: name + '[horizontal]'
      },
      label: editor_('Horizontal alignment', 'sharing-image'),
      selected: data.horizontal
    }, {
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        top: editor_('Top', 'sharing-image'),
        center: editor_('Center', 'sharing-image'),
        bottom: editor_('Bottom', 'sharing-image')
      },
      attributes: {
        name: name + '[vertical]'
      },
      label: editor_('Vertical alignment', 'sharing-image'),
      selected: data.vertical
    }],
    append: layer
  });
  var control = builders.control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  var button = builders.element('button', {
    classes: ['sharing-image-editor-more'],
    text: editor_('More options', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', function () {
    fields.forEach(function (field) {
      field.classList.remove('control-hidden');
    }); // Remove button on expand.

    layer.removeChild(control);
  }); // Open more fields for existing layers.

  if (Object.keys(data).length > 0) {
    button.click();
  }
}
/**
 * Create font field in text layer.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string} name Fields name attribute prefix.
 * @param {Object} data Layer data object.
 */


function createFontField(layer, name, data) {
  var control = builders.control({
    classes: ['sharing-image-editor-control', 'control-upload', 'control-hidden'],
    append: layer
  });
  var select = builders.select({
    classes: ['sharing-image-editor-control-select'],
    options: editor_params.fonts,
    attributes: {
      name: name + '[fontname]'
    },
    label: editor_('Font family', 'sharing-image'),
    selected: data.fontname
  }, control);
  var media = builders.media({
    name: name + '[fontfile]',
    classes: ['sharing-image-editor-control-media'],
    value: data.fontfile,
    link: editor_params.links.uploads,
    labels: {
      button: editor_('Upload custom font', 'sharing-image'),
      heading: editor_('Upload custom font', 'sharing-image'),
      details: editor_('Font attachment', 'sharing-image'),
      remove: editor_('Remove font', 'sharing-image')
    },
    remove: true,
    append: control
  });
  builders.element('small', {
    text: editor_('Custom font can only be in .ttf format.'),
    append: control
  });

  if (data.fontfile) {
    select.disabled = true;
  } // Find media attachment input.


  var input = media.querySelector('input');
  input.addEventListener('change', function () {
    select.disabled = false;

    if (input.value) {
      select.disabled = true;
    }
  });
  return control;
}
/**
 * Rectangle layer outline option.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string} name Fields name attribute prefix.
 * @param {Object} data Layer data object.
 */


function createRectangleOutline(layer, name, data) {
  var control = builders.control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  var checkbox = builders.checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[outline]',
      value: 'outline'
    },
    label: editor_('Outline rectangle.', 'sharing-image'),
    checked: data.outline
  }, control);
  var range = builders.control({
    classes: ['sharing-image-editor-control', 'control-hidden'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[thickness]',
        min: 0,
        max: 50,
        step: 1,
        value: data.thickness || '0'
      },
      label: editor_('Border width', 'sharing-image')
    }],
    append: layer
  });

  if (data.outline) {
    range.classList.remove('control-hidden');
  }

  checkbox.addEventListener('change', function () {
    range.classList.add('control-hidden');

    if (checkbox.checked) {
      range.classList.remove('control-hidden');
    }
  });
}
/**
 * Create catalog button in footer.
 *
 * @param {HTMLElement} footer Footer HTML element.
 */


function createCatalogButton(footer) {
  var link = new URL(document.location.href);
  link.searchParams.delete('template');
  builders.element('a', {
    classes: ['button'],
    text: editor_('← Back to Catalog', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: footer
  });
}
/**
 * Create template deletion button in footer.
 *
 * @param {HTMLElement} footer Footer HTML element.
 */


function createDeleteButton(footer) {
  var href = new URL(document.location.href); // Get template index from current link.

  var index = href.searchParams.get('template'); // Set template index to delete link.

  var link = new URL(editor.getAttribute('action'));
  link.searchParams.set('action', 'sharing_image_delete');
  link.searchParams.set('template', index);
  link.searchParams.set('nonce', editor_params.nonce);
  builders.element('a', {
    classes: ['sharing-image-editor-delete'],
    text: editor_('Delete template', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: footer
  });
}
/**
 * Create preview element.
 *
 * @param {HTMLElement} viewport Monitor viewport element.
 * @param {Object} data Template data object.
 */


function createPreview(viewport, data) {
  editor_preview = builders.element('div', {
    classes: ['sharing-image-editor-preview', 'preview-blank'],
    append: viewport
  });

  if (data.preview) {
    builders.element('img', {
      attributes: {
        src: data.preview,
        alt: ''
      },
      append: editor_preview
    });
    editor_preview.classList.remove('preview-blank');
  }

  builders.element('span', {
    classes: ['sharing-image-editor-loader'],
    append: editor_preview
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: editor_params.name + '[preview]',
      value: data.preview
    },
    append: editor_preview
  });
  return editor_preview;
}
/**
 * Create button inside layer box to change order.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer Current layer HTML emelemt.
 */


function createOrderLayersButton(designer, layer) {
  var button = builders.element('button', {
    classes: ['sharing-image-editor-order'],
    attributes: {
      type: 'button',
      title: editor_('Raise higher', 'sharing-image')
    },
    append: layer
  });
  button.addEventListener('click', function () {
    if (layer.previousSibling) {
      designer.insertBefore(layer, layer.previousSibling);
    } // Update fields name attributes.


    reorderLayers(designer);

    if (editor.classList.contains('editor-suspend')) {
      return;
    }

    generateTemplate();
  });
}
/**
 * Create button to delete layer.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer Current layer HTML emelemt.
 */


function createDeleteLayerButton(designer, layer) {
  var control = builders.control({
    classes: ['sharing-image-editor-control', 'control-footer'],
    append: layer
  });
  var button = builders.element('button', {
    classes: ['sharing-image-editor-delete'],
    text: editor_('Delete layer', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', function () {
    designer.removeChild(layer); // Update fields name attributes.

    reorderLayers(designer);

    if (editor.classList.contains('editor-suspend')) {
      return;
    }

    generateTemplate();
  });
}
/**
 * Create image layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current template layer data.
 */


function createLayerImage(index, data) {
  var description = [];
  description.push(editor_('Use jpg, gif or png image formats.', 'sharing-image'));
  description.push(editor_('Leave width and height fields blank to use the original image size.', 'sharing-image'));
  description.push(editor_('Sizes are calculated proportionally if not filled.', 'sharing-image'));
  var layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-image'],
    label: editor_('Image', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  var name = editor_params.name + "[layers][".concat(index, "]");
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'image'
    },
    append: layer
  });
  builders.media({
    name: name + '[attachment]',
    classes: ['sharing-image-editor-control', 'control-media'],
    value: data.attachment,
    link: editor_params.links.uploads,
    labels: {
      button: editor_('Upload image', 'sharing-image'),
      heading: editor_('Select layer image', 'sharing-image'),
      details: editor_('Attachment details', 'sharing-image')
    },
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[x]',
        value: data.x,
        placeholder: '10'
      },
      label: editor_('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[y]',
        value: data.y,
        placeholder: '10'
      },
      label: editor_('Y', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[width]',
        value: data.width
      },
      label: editor_('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[height]',
        value: data.height
      },
      label: editor_('Height', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create text layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current template data.
 */


function createLayerText(index, data) {
  var description = [];
  description.push(editor_('Write a text to the current image.', 'sharing-image'));
  description.push(editor_('If the font does not fit within your limits, its size will decrease.', 'sharing-image'));
  description.push(editor_('Avoid using large font sizes for long text – this affects performance.', 'sharing-image'));
  var layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: editor_('Text', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  var name = editor_params.name + "[layers][".concat(index, "]");
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'text'
    },
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[x]',
        value: data.x,
        placeholder: '10'
      },
      label: editor_('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[y]',
        value: data.y,
        placeholder: '10'
      },
      label: editor_('Y', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[width]',
        value: data.width,
        placeholder: '1000'
      },
      label: editor_('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[height]',
        value: data.height
      },
      label: editor_('Height', 'sharing-image')
    }],
    append: layer
  }); // Create static/dynamic text fields.

  createDynamicFields(layer, name, data); // Create more options.

  createMoreFields(layer, name, data);
  builders.control({
    classes: ['sharing-image-editor-control', 'control-series'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[fontsize]',
        min: 10,
        max: 200,
        step: 1,
        value: data.fontsize || '48'
      },
      label: editor_('Font size', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[lineheight]',
        min: 0,
        max: 4,
        step: 0.125,
        value: data.lineheight || '1.5'
      },
      label: editor_('Line height', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create filter layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current template data.
 */


function createLayerFilter(index, data) {
  var description = [];
  description.push(editor_('Filters are applied one after another to the entire editor image.', 'sharing-image'));
  description.push(editor_('If you want to control their order, create multiple layers.', 'sharing-image'));
  var layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: editor_('Filter', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  var name = editor_params.name + "[layers][".concat(index, "]");
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'filter'
    },
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-editor-control-checkbox'],
      attributes: {
        name: name + '[grayscale]',
        value: 'grayscale'
      },
      label: editor_('Turns image into a grayscale version', 'sharing-image'),
      checked: data.grayscale
    }],
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-editor-control-checkbox'],
      attributes: {
        name: name + '[blur]',
        value: 'blur'
      },
      label: editor_('Blur image by Gaussian effect', 'sharing-image'),
      checked: data.blur
    }],
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[contrast]',
        min: -50,
        max: 50,
        step: 5,
        value: data.contrast || '0'
      },
      label: editor_('Contrast', 'sharing-image')
    }],
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[brightness]',
        min: -50,
        max: 50,
        step: 5,
        value: data.brightness || '0'
      },
      label: editor_('Brightness', 'sharing-image')
    }],
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[blackout]',
        min: 0,
        max: 100,
        step: 5,
        value: data.blackout || '0'
      },
      label: editor_('Blackout', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create rectangle layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current template data.
 */


function createLayerRectangle(index, data) {
  var description = [];
  description.push(editor_('Draw a colored rectangle on current image.', 'sharing-image'));
  description.push(editor_('You can get filled or outlined figure with custom color and opacity.', 'sharing-image'));
  description.push(editor_('Use small height to draw the line.', 'sharing-image'));
  var layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: editor_('Rectangle', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  var name = editor_params.name + "[layers][".concat(index, "]");
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'rectangle'
    },
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        type: 'color',
        name: name + '[color]',
        value: data.color || '#ffffff'
      },
      label: editor_('Rectangle color', 'sharing-image')
    }],
    append: layer
  });
  builders.control({
    classes: ['sharing-image-editor-control', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[x]' || false,
        value: data.x
      },
      label: editor_('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[y]' || false,
        value: data.y
      },
      label: editor_('Y', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[width]',
        value: data.width
      },
      label: editor_('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[height]',
        value: data.height
      },
      label: editor_('Height', 'sharing-image')
    }],
    append: layer
  });
  createRectangleOutline(layer, name, data);
  builders.control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-range'],
      attributes: {
        type: 'range',
        name: name + '[opacity]',
        min: 0,
        max: 100,
        step: 5,
        value: data.opacity || '0'
      },
      label: editor_('Opacity', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create new layer.
 *
 * @param {HTMLElement} designer Designer HTML element.
 * @param {string} type New layer type.
 * @param {number} index Layer index.
 * @param {Object} data New layer data.
 */


function createLayer(designer, type, index) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var layer = null;

  switch (type) {
    case 'image':
      layer = createLayerImage(index, data);
      break;

    case 'text':
      layer = createLayerText(index, data);
      break;

    case 'filter':
      layer = createLayerFilter(index, data);
      break;

    case 'rectangle':
      layer = createLayerRectangle(index, data);
      break;
  }

  if (null === layer) {
    return;
  }

  designer.insertBefore(layer, designer.firstChild);
  reorderLayers(designer); // Delete this layer button.

  createDeleteLayerButton(designer, layer); // Reorder layers button.

  createOrderLayersButton(designer, layer);
}
/**
 * Create layers designer control.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object} data Current template data.
 */


function createDesigner(fieldset, data) {
  var control = builders.control({
    classes: ['sharing-image-editor-control', 'control-select', 'control-compact'],
    fields: [{
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        text: editor_('Text', 'sharing-image'),
        image: editor_('Image', 'sharing-image'),
        filter: editor_('Filter', 'sharing-image'),
        rectangle: editor_('Rectangle', 'sharing-image')
      }
    }],
    append: fieldset
  });
  var button = builders.element('button', {
    classes: ['button'],
    text: editor_('Add new', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  var designer = builders.element('div', {
    classes: ['sharing-image-editor-designer'],
    append: fieldset
  }); // Set default layers set.

  var layers = data.layers || [];
  layers = layers.reverse();
  layers.forEach(function (layer, index) {
    if (layer.hasOwnProperty('type')) {
      createLayer(designer, layer.type, index++, layer);
    }
  });
  button.addEventListener('click', function () {
    var select = control.querySelector('select');

    if (null === select) {
      return;
    }

    createLayer(designer, select.value, designer.children.length);
  });
}
/**
 * Create common settings on template editor screen.
 *
 * @param {Object} data Current template data.
 */


function createFieldset(data) {
  var fieldset = builders.element('div', {
    classes: ['sharing-image-editor-fieldset'],
    append: editor
  }); // Create template title control.

  builders.control({
    classes: ['sharing-image-editor-control', 'control-compact', 'control-extend'],
    help: editor_('Used only in the admin panel', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: editor_params.name + '[title]',
        value: data.title
      },
      dataset: {
        persistent: true
      },
      label: editor_('Template title', 'sharing-image')
    }],
    append: fieldset
  }); // Create background settings with custom logic.

  createPermanentAttachment(fieldset, data); // Create width/height settings control.

  builders.control({
    classes: ['sharing-image-editor-control', 'control-compact', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: editor_params.name + '[width]',
        value: data.width || '1200',
        placeholder: '1200'
      },
      label: editor_('Editor width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: editor_params.name + '[height]',
        value: data.height || '630',
        placeholder: '630'
      },
      label: editor_('Editor height', 'sharing-image')
    }],
    append: fieldset
  });
  var description = [];
  description.push(editor_('You can add multiple layers on your editor.', 'sharing-image'));
  description.push(editor_('Note that the stacking order of the layers is important.', 'sharing-image'));
  description.push(editor_('You can change the order using the arrows in the corner of each box.', 'sharing-image'));
  builders.control({
    classes: ['sharing-image-editor-control', 'control-reduced'],
    label: editor_('Add layers', 'sharing-image'),
    description: description.join(' '),
    append: fieldset
  }); // Create layers designer block.

  createDesigner(fieldset, data);
  var footer = builders.control({
    classes: ['sharing-image-editor-control', 'control-footer'],
    append: fieldset
  }); // Create back to catalog button.

  createCatalogButton(footer); // Create template deletion button.

  createDeleteButton(footer);
  fieldset.addEventListener('change', function (e) {
    if (editor.classList.contains('editor-suspend')) {
      return;
    }

    var target = e.target; // Skip fields that don't affect the poster.

    if (target.hasAttribute('data-persistent')) {
      return;
    }

    if (!target.hasAttribute('name')) {
      return;
    }

    generateTemplate();
  });
}
/**
 * Create button to submit editor form.
 *
 * @param {HTMLElement} manager Manager element.
 */


function createSubmitButton(manager) {
  builders.element('button', {
    text: editor_('Save changes', 'sharing-image'),
    classes: ['button', 'button-primary'],
    attributes: {
      type: 'submit'
    },
    append: manager
  });
}
/**
 * Create button to generate new template manually.
 *
 * @param {HTMLElement} manager Manager element.
 */


function createGenerateButton(manager) {
  var button = builders.element('button', {
    text: editor_('Generate preview', 'sharing-image'),
    classes: ['button'],
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', function () {
    generateTemplate();
  });
}
/**
 * Create disable live-reloading checkbox.
 *
 * @param {HTMLElement} manager Manager element.
 * @param {Object} data Template data.
 */


function createSuspendCheckbox(manager, data) {
  var checkbox = builders.checkbox({
    classes: ['sharing-image-editor-suspend'],
    attributes: {
      name: editor_params.name + '[suspend]',
      value: 'suspend'
    },
    label: editor_('Disable live-reload', 'sharing-image'),
    checked: data.suspend
  }, manager);

  if (data.suspend) {
    editor.classList.add('editor-suspend');
  }

  checkbox.addEventListener('change', function () {
    editor.classList.remove('editor-suspend');

    if (checkbox.checked) {
      editor.classList.add('editor-suspend');
    }
  });
}
/**
 * Create template settings preview.
 *
 * @param {Object} data Current template data.
 */


function createMonitor(data) {
  var monitor = builders.element('div', {
    classes: ['sharing-image-editor-monitor'],
    append: editor
  });
  var viewport = builders.element('div', {
    classes: ['sharing-image-editor-viewport'],
    append: monitor
  });
  createPreview(viewport, data);
  builders.element('div', {
    classes: ['sharing-image-editor-warning'],
    append: viewport
  });
  var manager = builders.element('div', {
    classes: ['sharing-image-editor-manager'],
    append: viewport
  }); // Create live-reload manager checkbox.

  createSuspendCheckbox(manager, data); // Create submit form button.

  createSubmitButton(manager); // Create template generator button.

  createGenerateButton(manager);
}
/**
 * Create form hidden settings fields.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {number} index Current option index.
 */


function prepareEditor(content, index) {
  editor_params.name = 'sharing_image_editor';
  var form = builders.element('form', {
    classes: ['sharing-image-editor'],
    attributes: {
      action: editor_params.links.action,
      method: 'POST'
    },
    append: content
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: editor_params.name
    },
    append: form
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_index',
      value: index
    },
    append: form
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: editor_params.nonce
    },
    append: form
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveTemplate();
  });
  return form;
}
/**
 * Create template editor page.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings object.
 * @param {number} index Current option index.
 * @param {Object} data Template data.
 */


function createEditor(content, settings, index) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  editor_params = settings; // Prepare form with hidden fields and events.

  editor = prepareEditor(content, index); // Create monitor section part.

  createMonitor(data); // Create fieldset section part.

  createFieldset(data);
}

/* harmony default export */ var sections_editor = (createEditor);
// CONCATENATED MODULE: ./src/scripts/sections/config.js
/**
 * Config settings tab.
 */

var config_ = wp.i18n.__; // Store global scriot object for settings page.

var config_params = null;
/**
 * Create default poster option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object} data Config data object.
 */

function createDefaultOptions(options, data) {
  var control = builders.control({
    classes: ['sharing-image-config-control'],
    label: config_('Default poster', 'sharing-image'),
    append: options
  });
  builders.media({
    name: config_params.name + '[default]',
    classes: ['sharing-image-config-control-media'],
    label: config_('Default poster', 'sharing-image'),
    value: data.default,
    link: config_params.links.uploads,
    labels: {
      button: config_('Upload image', 'sharing-image'),
      heading: config_('Select default poster', 'sharing-image'),
      details: config_('Attachment details', 'sharing-image'),
      remove: config_('Remove image', 'sharing-image')
    },
    remove: true,
    append: control
  });
  var description = [];
  description.push(config_('The default poster is used on pages where there is no generated.', 'sharing-image'));
  description.push(config_('Best image size: 1200×630 pixels.', 'sharing-image'));
  builders.element('small', {
    text: description.join(' '),
    append: control
  });
}
/**
 * Create uploads directory option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object} data Config data object.
 */


function createUploadsOptions(options, data) {
  var control = builders.control({
    classes: ['sharing-image-config-control'],
    label: config_('Upload directory', 'sharing-image'),
    append: options
  });
  var fieldset = builders.element('div', {
    classes: ['sharing-image-config-control-fieldset'],
    append: control
  });
  builders.radio({
    classes: ['sharing-image-config-control-radio'],
    attributes: {
      name: config_params.name + '[uploads]',
      value: 'default'
    },
    label: config_('Use default uploads directory', 'sharing-image'),
    checked: data.uploads || 'default'
  }, fieldset);
  builders.radio({
    classes: ['sharing-image-config-control-radio'],
    attributes: {
      name: config_params.name + '[uploads]',
      value: 'custom'
    },
    label: config_('Choose custom storage for posters', 'sharing-image'),
    checked: data.uploads || 'default'
  }, fieldset);
  var input = builders.input({
    classes: ['sharing-image-config-control-input'],
    attributes: {
      name: config_params.name + '[storage]',
      value: data.storage || config_params.links.storage,
      disabled: 'disabled'
    }
  }, control);
  builders.element('small', {
    text: config_('Use relative path from site root. Directory should be writeable.', 'sharing-image'),
    append: control
  });
  control.querySelectorAll('input').forEach(function (radio) {
    if ('radio' !== radio.type) {
      return;
    } // Show storage input for checked custom radio.


    if (radio.checked && 'custom' === radio.value) {
      input.disabled = false;
    }

    radio.addEventListener('change', function () {
      input.disabled = true;

      if ('custom' === radio.value) {
        input.disabled = false;
      }
    });
  });
}
/**
 * Create format and quality poster options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object} data Config data object.
 */


function createImageOptions(options, data) {
  var control = builders.control({
    classes: ['sharing-image-config-control', 'control-extra'],
    label: config_('Poster image format', 'sharing-image'),
    help: config_('The higher the value, the less compression. Availible for JPEG only.', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-config-control-select'],
      options: {
        jpg: config_('JPEG', 'sharing-image'),
        png: config_('PNG', 'sharing-image')
      },
      attributes: {
        name: config_params.name + '[format]'
      },
      selected: data.format || 'jpg'
    }, {
      group: 'input',
      classes: ['sharing-image-config-control-range'],
      attributes: {
        type: 'range',
        name: config_params.name + '[quality]',
        min: 10,
        max: 100,
        step: 5,
        value: data.quality || '90',
        disabled: 'disabled'
      },
      label: config_('Image quality', 'sharing-image')
    }],
    append: options
  }); // Find control format select.

  var format = control.querySelector('select'); // Find control quiality input.

  var quality = control.querySelector('input');

  if ('jpg' === format.value) {
    quality.disabled = false;
  }

  format.addEventListener('change', function () {
    quality.disabled = true;

    if ('jpg' === format.value) {
      quality.disabled = false;
    }
  });
}
/**
 * Create required form meta fields.
 *
 * @param {HTMLElement} options Options form element.
 */


function createMetaFields(options) {
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: config_params.name
    },
    append: options
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: config_params.nonce
    },
    append: options
  });
  builders.element('button', {
    text: config_('Save changes', 'sharing-image'),
    classes: ['button', 'button-primary'],
    attributes: {
      type: 'submit'
    },
    append: options
  });
}
/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings field.
 */


function createConfig(content, settings) {
  config_params = settings; // Set params name for template form fields.

  config_params.name = 'sharing_image_config'; // Find config element

  var config = content.querySelector('.sharing-image-config');

  if (null === config) {
    return;
  }

  var options = builders.element('form', {
    classes: ['sharing-image-config-options'],
    attributes: {
      action: config_params.links.action,
      method: 'POST'
    },
    append: config
  });
  var data = config_params.config || {}; // Poster image options.

  createImageOptions(options, data); // Uploads directory options.

  createUploadsOptions(options, data); // Default poster.

  createDefaultOptions(options, data); // Create required form fields

  createMetaFields(options);
}

/* harmony default export */ var sections_config = (createConfig);
// CONCATENATED MODULE: ./src/scripts/sections/premium.js
/**
 * Premium settings tab.
 */

/* global ajaxurl:true */

var premium_ = wp.i18n.__; // Store global scriot object for settings page.

var premium_params = null; // Premium HTML emelent.

var premium = null;
/**
 * Parse error code from settings or AJAX response.
 *
 * @param {string} code Error code from settings or AJAX response.
 * @param {string} title Prepended error title. Optional.
 */

function parseErrorCode(code, title) {
  var message = [];

  if (undefined === title) {
    title = premium_('Verification failed.', 'sharing-image');
  }

  message.push(title);

  switch (code) {
    case 'LIMIT_EXCEEDED':
      message.push(premium_('The number of valid licenses for this key has been exceeded.', 'sharing-image'));
      break;

    case 'KEY_NOT_FOUND':
      message.push(premium_('Premium key is invalid or expired.', 'sharing-image'));
      break;

    case 'SERVER_ERROR':
      message.push(premium_('Unable to get a response from the verification server.', 'sharing-image'));
      break;

    default:
      message.push(premium_('Unknown error.', 'sharing-image'));
  }

  return message.join(' ');
}
/**
 * Show premium warning message.
 *
 * @param {string} message Warning message.
 */


function showPremiumError(message) {
  // Try to find warning element.
  var warning = premium.querySelector('.sharing-image-premium-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || premium_('Unknown request error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hidePremiumError() {
  // Try to find warning element.
  var warning = premium.querySelector('.sharing-image-premium-warning');

  if (null === warning) {
    return;
  }

  warning.classList.remove('warning-visible');
}
/**
 * Revoke Premium key.
 *
 * @param {HTMLElement} access Access form element.
 */


function revokePremium(access) {
  access.classList.add('access-loader');
  var request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json'; // Create data bundle using form data.

  var bundle = new window.FormData(access);
  bundle.set('action', 'sharing_image_revoke');
  hidePremiumError();
  request.addEventListener('load', function () {
    var response = request.response || {}; // Hide form loader class.

    access.classList.remove('access-loader');

    if (!response.data) {
      return showPremiumError();
    }

    if (!response.success) {
      return showPremiumError(response.data);
    }

    premium_params.license = response.data; // Refresh premium fields.

    preparePremiumFields();
  });
  request.addEventListener('error', function () {
    showPremiumError(); // Hide form loader class.

    access.classList.remove('access-loader');
  });
  request.send(bundle);
}
/**
 * Verify Premium key.
 *
 * @param {HTMLElement} access Access form element.
 */


function verifyPremium(access) {
  access.classList.add('access-loader');
  var request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json'; // Create data bundle using form data.

  var bundle = new window.FormData(access);
  bundle.set('action', 'sharing_image_verify');
  hidePremiumError();
  request.addEventListener('load', function () {
    var response = request.response || {}; // Hide form loader class.

    access.classList.remove('access-loader');

    if (!response.data) {
      return showPremiumError();
    }

    if (!response.success) {
      return showPremiumError(parseErrorCode(response.code, response.data));
    }

    premium_params.license = response.data; // Refresh premium fields.

    preparePremiumFields();
  });
  request.addEventListener('error', function () {
    showPremiumError(); // Hide form loader class.

    access.classList.remove('access-loader');
  });
  request.send(bundle);
}
/**
 * Show verify form if stil not premium.
 *
 * @param {HTMLElement} access Access HTML element.
 * @param {Object} license License data.
 */


function showVerifyForm(access, license) {
  if (license.error) {
    showPremiumError(parseErrorCode(license.error));
  }

  builders.element('strong', {
    text: premium_('Do you already have a key? Enter it here', 'sharing-image'),
    append: access
  });
  var verify = builders.element('div', {
    classes: ['sharing-image-premium-verify'],
    append: access
  });
  builders.element('input', {
    label: premium_('Your Premium key', 'sharing-image'),
    attributes: {
      type: 'text',
      name: 'sharing_image_key',
      value: license.key
    },
    append: verify
  });
  builders.element('button', {
    classes: ['button'],
    text: premium_('Submit', 'sharing-image'),
    attributes: {
      type: 'submit'
    },
    append: verify
  });
  builders.element('span', {
    classes: ['spinner'],
    append: verify
  });
  access.addEventListener('submit', function (e) {
    e.preventDefault();
    verifyPremium(access);
  });
}
/**
 * Show alert for develop license mode.
 */


function showDevelopAlert() {
  showPremiumError(premium_('Using plugin with a development license is prohibited in production.', 'sharing-image'));
}
/**
 * Show revoke Premium button.
 *
 * @param {HTMLElement} access Access HTML element.
 */


function showRevokeButton(access) {
  var revoke = builders.element('div', {
    classes: ['sharing-image-premium-revoke'],
    append: access
  });
  var description = [];
  description.push(premium_('Disabling premium mode will not remove the license for this domain.', 'sharing-image'));
  description.push(premium_('Your current key will also be saved in the plugin settings.', 'sharing-image'));
  description.push(premium_('Use key management tool to delete the license for the site.', 'sharing-image'));
  builders.element('p', {
    text: description.join(' '),
    append: revoke
  });
  builders.element('button', {
    classes: ['button'],
    text: premium_('Disable Premium'),
    attributes: {
      type: 'submit'
    },
    append: revoke
  });
  builders.element('span', {
    classes: ['spinner'],
    append: revoke
  });
  access.addEventListener('submit', function (e) {
    e.preventDefault();
    revokePremium(access);
  });
}
/**
 * Show permit information.
 *
 * @param {HTMLElement} access Access HTML element.
 * @param {string} key License key from settings.
 */


function showLicenseInfo(access, key) {
  var permit = builders.element('div', {
    classes: ['sharing-image-premium-permit'],
    append: access
  });
  var button = builders.element('button', {
    classes: ['sharing-image-premium-show', 'button'],
    text: premium_('Show License key'),
    attributes: {
      type: 'button'
    },
    append: permit
  });
  button.addEventListener('click', function () {
    permit.classList.toggle('permit-visible');
  });
  builders.element('strong', {
    text: key,
    append: permit
  });
  return permit;
}
/**
 * Show fields if user has the license.
 *
 * @param {HTMLElement} access Access HTML element.
 * @param {Object} license License data.
 */


function showPremiumData(access, license) {
  premium.classList.add('premium-enabled');

  if (license.develop) {
    return showDevelopAlert();
  }

  if (license.key) {
    showLicenseInfo(access, license.key);
  }

  showRevokeButton(access);
}
/**
 * Set premium fields according settings.
 */


function preparePremiumFields() {
  var access = premium.querySelector('.sharing-image-premium-access');

  if (null !== access) {
    premium.removeChild(access);
  }

  access = builders.element('form', {
    classes: ['sharing-image-premium-access'],
    attributes: {
      action: '',
      method: 'POST'
    },
    append: premium
  });
  premium.classList.remove('premium-enabled');
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: premium_params.nonce
    },
    append: access
  });
  var license = premium_params.license || {}; // Show fields if user has the license.

  if (license.premium || license.develop) {
    return showPremiumData(access, license);
  }

  return showVerifyForm(access, license);
}
/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings field.
 */


function createPremium(content, settings) {
  premium_params = settings; // Find premium element

  premium = content.querySelector('.sharing-image-premium');

  if (null === premium) {
    return;
  }

  builders.element('div', {
    classes: ['sharing-image-premium-warning'],
    append: premium
  });
  preparePremiumFields();
}

/* harmony default export */ var sections_premium = (createPremium);
// CONCATENATED MODULE: ./src/scripts/sections/picker.js
/**
 * Metabox handler.
 */

/* global ajaxurl:true */

var picker_ = wp.i18n.__; // Store global script object for metabox.

var picker_params = null; // Poster HTML element.

var poster = null;
/**
 * Show picker warning message.
 *
 * @param {string} message Warning message.
 */

function showPickerError(message) {
  var picker = poster.parentNode; // Try to find warning element.

  var warning = picker.querySelector('.sharing-image-picker-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || picker_('Unknown generation error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hidePickerError() {
  var picker = poster.parentNode; // Try to find warning element.

  var warning = picker.querySelector('.sharing-image-picker-warning');

  if (null === warning) {
    return;
  }

  warning.classList.remove('warning-visible');
}
/**
 * Handle poster generation action.
 *
 * @param {HTMLElement} picker Picker element.
 */


function generatePoster(picker) {
  var request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json';
  poster.classList.add('poster-loader'); // Create data form data bundle.

  var bundle = new window.FormData();
  bundle.set('action', 'sharing_image_generate');
  picker.querySelectorAll('[name]').forEach(function (field) {
    bundle.append(field.name, field.value);
  });
  hidePickerError();
  request.addEventListener('load', function () {
    var response = request.response || {}; // Hide preview loader on request complete.

    poster.classList.remove('poster-loader');

    if (!response.data) {
      return showPickerError();
    }

    if (!response.success) {
      return showPickerError(response.data);
    }

    var _loop = function _loop(key) {
      // Find all poster input fields and set response data value.
      poster.querySelectorAll('input').forEach(function (input) {
        var name = picker_params.name + '[' + key + ']';

        if (name === input.name) {
          input.value = response.data[key];
        }
      });
    };

    for (var key in response.data) {
      _loop(key);
    }

    var image = poster.querySelector('img');

    if (null === image) {
      image = builders.element('img', {
        append: poster
      });
    }

    image.src = response.data.poster; // Show the poster.

    poster.classList.add('poster-visible');
  });
  request.addEventListener('error', function () {
    showPickerError(); // Hide preview loader on request complete.

    poster.classList.remove('poster-loader');
  });
  request.send(bundle);
}
/**
 * Create designer template selector.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {HTMLElement} designer Designer element.
 * @param {Object} selected Seleted template.
 */


function createTemplate(picker, designer, selected) {
  var fields = {};
  picker_params.templates.forEach(function (template, i) {
    fields[i] = template.title || picker_('Untitled', 'sharing-image');
  });
  var template = builders.select({
    classes: ['sharing-image-picker-template'],
    options: fields,
    attributes: {
      name: picker_params.name + '[template]'
    },
    selected: String(selected)
  }, picker);
  template.addEventListener('change', function () {
    var fieldset = designer.childNodes;

    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].classList.remove('fieldset-visible');

      if (i === parseInt(template.value)) {
        fieldset[i].classList.add('fieldset-visible');
      }
    }
  });
  return template;
}
/**
 * Prefill caption fields for classic editor.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string} preset Preset field.
 */


function fillClassicEditorPreset(textarea, preset) {
  var source = document.getElementById(preset);

  if (null === source) {
    return;
  }

  var updateCaption = function updateCaption() {
    textarea.value = source.value;
  };

  source.addEventListener('change', updateCaption); // Stop textarea update after first user input.

  textarea.addEventListener('change', function () {
    source.removeEventListener('change', updateCaption);
  });
  updateCaption();
}
/**
 * Prefill caption fields for block editor.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string} preset Preset field.
 */


function fillBlockEditorPreset(textarea, preset) {
  var getAttribute = function getAttribute() {
    return wp.data.select('core/editor').getEditedPostAttribute(preset);
  };

  var attribute = getAttribute();
  wp.data.subscribe(function () {
    var updated = getAttribute();

    if (attribute !== updated) {
      textarea.textContent = updated;
    }

    attribute = updated;
  });
}
/**
 * Try to prefill caption field.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string} preset Preset field.
 */


function fillCaptionPreset(textarea, preset) {
  if (wp.data) {
    return fillBlockEditorPreset(textarea, preset);
  }

  fillClassicEditorPreset(textarea, preset);
}
/**
 * Create designer attachment field for dynamic background.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object} template Template data.
 * @param {Array} values Template fieldset values.
 * @param {string} name Field name attribute.
 */


function createDesignerAttachment(fieldset, template, values, name) {
  if ('dynamic' !== template.background) {
    return;
  }

  builders.media({
    name: name + '[attachment]',
    classes: ['sharing-image-picker-media'],
    value: values.attachment,
    link: picker_params.links.uploads,
    labels: {
      button: picker_('Upload background', 'sharing-image'),
      heading: picker_('Select background image', 'sharing-image'),
      details: picker_('Attachment', 'sharing-image')
    },
    append: fieldset
  });
}
/**
 * Create designer captions for text layers.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object} template Template data.
 * @param {Array} values Template fieldset values.
 * @param {string} name Field name attribute.
 */


function createDesignerCaptions(fieldset, template, values, name) {
  var captions = values.captions || []; // Set default layers list.

  template.layers = template.layers || [];
  template.layers.forEach(function (layer, n) {
    if ('text' !== layer.type || !layer.dynamic) {
      return;
    }

    var textarea = builders.textarea({
      classes: ['sharing-image-picker-caption'],
      label: layer.title || null,
      attributes: {
        name: name + "[captions][".concat(n, "]")
      }
    }, fieldset);

    if (!captions[n]) {
      fillCaptionPreset(textarea, layer.preset);
    }

    textarea.textContent = captions[n];
  });
}
/**
 * Create fields designer.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {Object} data Picker data object.
 */


function picker_createDesigner(picker, data) {
  var designer = builders.element('div', {
    classes: ['sharing-image-picker-designer']
  });
  var selected = data.template || 0; // Reset selected template if index undefined.

  if (!picker_params.templates[selected]) {
    selected = 0;
  } // Create designer fields


  picker_params.templates.forEach(function (template, i) {
    // Set default layers list.
    template.layers = template.layers || [];
    var fieldset = builders.element('div', {
      classes: ['sharing-image-picker-fieldset'],
      append: designer
    });

    if (i === parseInt(selected)) {
      fieldset.classList.add('fieldset-visible');
    }

    var values = {};

    if (data.fieldset && data.fieldset[i]) {
      values = data.fieldset[i];
    }

    var name = picker_params.name + "[fieldset][".concat(i, "]");
    builders.element('input', {
      attributes: {
        type: 'hidden',
        name: name
      },
      append: fieldset
    }); // Create attachment field.

    createDesignerAttachment(fieldset, template, values, name); // Create all caption fields.

    createDesignerCaptions(fieldset, template, values, name);
  }); // Create template selector.

  if (picker_params.templates.length > 1) {
    createTemplate(picker, designer, selected);
  }

  picker.appendChild(designer);
}
/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {HTMLElement} manager Manager element.
 */


function picker_createGenerateButton(picker, manager) {
  var button = builders.element('button', {
    classes: ['sharing-image-picker-generate', 'button'],
    text: picker_('Generate', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', function () {
    generatePoster(picker);
  });
}
/**
 * Create button to delete current metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */


function picker_createDeleteButton(manager) {
  var button = builders.element('button', {
    classes: ['sharing-image-picker-delete', 'button', 'button-delete'],
    text: picker_('Remove', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', function () {
    var image = poster.querySelector('img');

    if (null !== image) {
      poster.removeChild(image);
    }

    poster.querySelectorAll('input').forEach(function (input) {
      input.value = '';
    });
    poster.classList.remove('poster-visible');
  });
}
/**
 * Create picker manager.
 *
 * @param {HTMLElement} picker Picker element.
 */


function createManager(picker) {
  var manager = builders.element('div', {
    classes: ['sharing-image-picker-manager'],
    append: picker
  }); // Create poster generation button.

  picker_createGenerateButton(picker, manager); // Create poster removing button.

  picker_createDeleteButton(manager);
  builders.element('span', {
    classes: ['sharing-image-picker-spinner', 'spinner'],
    append: manager
  });
}
/**
 * Create poster block.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {Object} data Picker data object.
 */


function createPoster(picker, data) {
  poster = builders.element('div', {
    classes: ['sharing-image-picker-poster'],
    append: picker
  });

  if (data.poster) {
    builders.element('img', {
      attributes: {
        src: data.poster,
        alt: ''
      },
      append: poster
    });
    poster.classList.add('poster-visible');
  }

  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: picker_params.name + '[poster]',
      value: data.poster
    },
    append: poster
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: picker_params.name + '[width]',
      value: data.width
    },
    append: poster
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: picker_params.name + '[height]',
      value: data.height
    },
    append: poster
  });
  return poster;
}
/**
 * Check that the poster sizes are set or show an error message.
 *
 * @param {Object} data Picker data object.
 */


function showSizesWarning(data) {
  if (!data.poster) {
    return;
  }

  if (!data.width || !data.height) {
    showPickerError(picker_('Image sizes are not set. Regenerate the poster.', 'sharing-image'));
  }
}
/**
 * Create metabox generator picker.
 *
 * @param {HTMLElement} widget Widget element.
 * @param {Object} settings Global settings object.
 */


function createPicker(widget, settings) {
  picker_params = settings; // Set params name for template form fields.

  picker_params.name = 'sharing_image_picker';

  if ('taxonomy' === picker_params.context) {
    var title = builders.element('div', {
      classes: ['sharing-image-title'],
      append: widget
    });
    builders.element('strong', {
      text: picker_('Sharing Image', 'sharing-image'),
      append: title
    });
  }

  var picker = builders.element('div', {
    classes: ['sharing-image-picker'],
    append: widget
  });
  var data = picker_params.meta || {}; // Create poster block.

  createPoster(picker, data); // Create fields designer.

  picker_createDesigner(picker, data);
  builders.element('div', {
    classes: ['sharing-image-picker-warning'],
    append: picker
  }); // Show unset poster sizes warning.

  showSizesWarning(data); // Create metabox manager block.

  createManager(picker);
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: picker_params.nonce
    },
    append: picker
  });
}

/* harmony default export */ var sections_picker = (createPicker);
// CONCATENATED MODULE: ./src/scripts/sections/index.js





var Section = {
  catalog: sections_catalog,
  editor: sections_editor,
  config: sections_config,
  premium: sections_premium,
  picker: sections_picker
};
/* harmony default export */ var sections = __webpack_exports__["a"] = (Section);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


/**
 * Init metabox handler.
 */

(function () {
  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()('undefined') === wp) {
    return;
  }

  var object = window.sharingImageWidget || {}; // Set default templates empty list.

  object.templates = object.templates || []; // Find metabox element.

  var widgets = document.querySelectorAll('.sharing-image-widget');
  widgets.forEach(function (widget) {
    if (object.context) {
      widget.classList.add("widget-".concat(object.context));
    }

    _sections__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].picker(widget, object);
  });
})();

/***/ })
/******/ ]);