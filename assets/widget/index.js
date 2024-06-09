/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/widget/styles.scss":
/*!********************************!*\
  !*** ./src/widget/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builders/checkbox.js":
/*!**********************************!*\
  !*** ./src/builders/checkbox.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./src/builders/element.js");

/**
 * Helper to create radio field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildCheckbox(args, parent) {
  const field = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('label', {
    classes: args.classes || [],
    append: parent
  });
  const checkbox = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('input', {
    attributes: {
      type: 'checkbox'
    },
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (const key in args.attributes) {
      const value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      checkbox.setAttribute(key, value);
    }
  }

  if (args.hasOwnProperty('checked')) {
    const checked = args.checked;

    if (checked && checked === checkbox.value) {
      checkbox.setAttribute('checked', 'checked');
    }
  }

  if (args.hasOwnProperty('label')) {
    const label = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  return checkbox;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildCheckbox);

/***/ }),

/***/ "./src/builders/control.js":
/*!*********************************!*\
  !*** ./src/builders/control.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/builders/element.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ "./src/builders/input.js");
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkbox */ "./src/builders/checkbox.js");
/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./radio */ "./src/builders/radio.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./select */ "./src/builders/select.js");
/* harmony import */ var _textarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./textarea */ "./src/builders/textarea.js");






/**
 * Helper to create control.
 *
 * @param {Object} args List of control options.
 */

function buildControl(args) {
  const control = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('div', {
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(control);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(control, args.prepend.firstChild);
  }

  if (args.hasOwnProperty('label')) {
    (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('h3', {
      text: args.label,
      append: control
    });
  }

  if (args.hasOwnProperty('description')) {
    (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('p', {
      text: args.description,
      append: control
    });
  }

  if (args.hasOwnProperty('fields')) {
    args.fields.forEach(field => {
      switch (field.group) {
        case 'input':
          (0,_input__WEBPACK_IMPORTED_MODULE_1__["default"])(field, control);
          break;

        case 'textarea':
          (0,_textarea__WEBPACK_IMPORTED_MODULE_5__["default"])(field, control);
          break;

        case 'radio':
          (0,_radio__WEBPACK_IMPORTED_MODULE_3__["default"])(field, control);
          break;

        case 'select':
          (0,_select__WEBPACK_IMPORTED_MODULE_4__["default"])(field, control);
          break;

        case 'checkbox':
          (0,_checkbox__WEBPACK_IMPORTED_MODULE_2__["default"])(field, control);
          break;
      }
    });
  }

  if (args.hasOwnProperty('help')) {
    (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('small', {
      text: args.help,
      append: control
    });
  }

  return control;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildControl);

/***/ }),

/***/ "./src/builders/element.js":
/*!*********************************!*\
  !*** ./src/builders/element.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Helper to create new DOM element.
 *
 * @param {string} tag  Element tagname.
 * @param {Object} args List of element options.
 */
function buildElement(tag, args = {}) {
  const element = document.createElement(tag); // Set class list

  if (args.hasOwnProperty('classes')) {
    args.classes.forEach(cl => {
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
    for (const key in args.attributes) {
      const value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      element.setAttribute(key, value);
    }
  } // Set data attributes


  if (args.hasOwnProperty('dataset')) {
    for (const key in args.dataset) {
      element.setAttribute('data-' + key, args.dataset[key]);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildElement);

/***/ }),

/***/ "./src/builders/index.js":
/*!*******************************!*\
  !*** ./src/builders/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./src/builders/element.js");
/* harmony import */ var _control_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control.js */ "./src/builders/control.js");
/* harmony import */ var _layer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer.js */ "./src/builders/layer.js");
/* harmony import */ var _media_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media.js */ "./src/builders/media.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input.js */ "./src/builders/input.js");
/* harmony import */ var _textarea_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./textarea.js */ "./src/builders/textarea.js");
/* harmony import */ var _checkbox_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checkbox.js */ "./src/builders/checkbox.js");
/* harmony import */ var _radio_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./radio.js */ "./src/builders/radio.js");
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./select.js */ "./src/builders/select.js");









const Build = {
  element: _element_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  control: _control_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  layer: _layer_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  checkbox: _checkbox_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  media: _media_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  input: _input_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  textarea: _textarea_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  radio: _radio_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  select: _select_js__WEBPACK_IMPORTED_MODULE_8__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Build);

/***/ }),

/***/ "./src/builders/input.js":
/*!*******************************!*\
  !*** ./src/builders/input.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./src/builders/element.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/builders/index.js");


/**
 * Helper to create input field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildInput(args, parent) {
  const field = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    const label = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  const input = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('input', {
    attributes: {
      type: 'text'
    },
    dataset: args.dataset || {},
    append: field
  }); // Set attributes.

  if (args.hasOwnProperty('attributes')) {
    for (const key in args.attributes) {
      const value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      input.setAttribute(key, value);
    }
  }

  if (input.type === 'range') {
    const counter = _index_js__WEBPACK_IMPORTED_MODULE_1__["default"].element('em', {
      text: input.value,
      attributes: {
        title: wp.i18n.__('Click to change the input view.', 'sharing-image')
      },
      append: field
    });
    input.addEventListener('change', () => {
      counter.textContent = input.value;
    });
    input.addEventListener('input', () => {
      counter.textContent = input.value;
    });
    counter.addEventListener('click', () => {
      input.type = input.type === 'text' ? 'range' : 'text';
    });
  }

  return input;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildInput);

/***/ }),

/***/ "./src/builders/layer.js":
/*!*******************************!*\
  !*** ./src/builders/layer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/builders/element.js");

/**
 * Helper to create layer.
 *
 * @param {Object} args List of layer options.
 */

function buildLayer(args) {
  const layer = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('div', {
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(layer);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(layer, args.prepend.firstChild);
  }

  if (!args.hasOwnProperty('label')) {
    args.label = '';
  }

  const title = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('h2', {
    text: args.label,
    append: layer
  });
  (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
    append: title
  });

  if (args.hasOwnProperty('description')) {
    (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('h5', {
      text: args.description,
      append: layer
    });
  }

  return layer;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildLayer);

/***/ }),

/***/ "./src/builders/media.js":
/*!*******************************!*\
  !*** ./src/builders/media.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/builders/element.js");
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control */ "./src/builders/control.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");



/**
 * Display image by it ID in figure tag.
 *
 * @param {HTMLElement} media Media element.
 * @param {number}      value Image attachment value.
 */

function displayImage(media, value) {
  let figure = media.querySelector('figure');

  if (figure) {
    media.removeChild(figure);
  }

  if (!wp.media) {
    return;
  }

  figure = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('figure', {
    prepend: media
  });

  if (media.querySelector('h4')) {
    media.insertBefore(figure, media.querySelector('h4').nextSibling);
  }

  if (!value) {
    return;
  }

  let image = figure.querySelector('img');

  if (image) {
    figure.removeChild(image);
  }

  image = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('img', {
    append: figure
  });
  const frame = wp.media.attachment(value).fetch();
  frame.then(data => {
    image.src = data.sizes?.thumbnail?.url || data.url;
  });
}
/**
 * Helper to create media block.
 *
 * @param {Object} args List of media options.
 */


function buildMedia(args) {
  const media = (0,_control__WEBPACK_IMPORTED_MODULE_1__["default"])({
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(media);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(media, args.prepend.firstChild);
  }

  if (args.hasOwnProperty('label')) {
    const label = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('h4', {
      text: args.label
    });

    if (null !== args.label) {
      media.appendChild(label);
    }
  } // Labels are required.


  args.labels = args.labels || {};
  const attachment = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('input', {
    attributes: {
      type: 'hidden',
      name: args.name
    },
    append: media
  });
  const button = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('button', {
    classes: ['button'],
    text: args.labels.button,
    attributes: {
      type: 'button'
    },
    append: media
  });
  const details = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('a', {
    classes: ['hidden'],
    text: args.labels.details,
    attributes: {
      target: '_blank'
    }
  });

  if (args.hasOwnProperty('link')) {
    media.appendChild(details);
  }

  if (args.hasOwnProperty('help')) {
    (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('small', {
      text: args.help,
      append: media
    });
  } // Helper function to update attachment value.


  const setAttachment = id => {
    attachment.setAttribute('value', id);
    attachment.dispatchEvent(new Event('change', {
      bubbles: true
    }));
    let link = null;

    if (args.hasOwnProperty('link')) {
      link = new URL(args.link);
      link.searchParams.set('item', id);
      details.setAttribute('href', link.href);
    }

    if (args.remove) {
      button.textContent = args.labels.remove;
    }

    if (args.image) {
      displayImage(media, id);
    }

    details.classList.remove('hidden');
  }; // Helper function to remove attachment value.


  const removeAttachment = () => {
    attachment.setAttribute('value', '');
    attachment.dispatchEvent(new Event('change', {
      bubbles: true
    })); // Set default button title.

    button.textContent = args.labels.button;

    if (args.image) {
      displayImage(media, 0);
    }

    details.classList.add('hidden');
  };

  if (args.image) {
    displayImage(media, 0);
  } // Update fields if this layer has attachment.


  if (args.value) {
    setAttachment(args.value);
  } // Handle upload button.


  button.addEventListener('click', () => {
    if (args.remove && attachment.value) {
      return removeAttachment();
    }

    const options = {
      title: args.labels.heading
    };

    if (args.hasOwnProperty('mime')) {
      options.library = {};
      options.library.type = args.mime;
    }

    _helpers__WEBPACK_IMPORTED_MODULE_2__["default"].attachment(options, id => {
      setAttachment(id);
    });
  }); // Create custom event to set attachment.

  media.addEventListener('set_attachment', e => {
    if (e.detail) {
      setAttachment(e.detail);
    }
  }); // Create custom event to remove attachment.

  media.addEventListener('remove_attachment', () => {
    removeAttachment();
  });
  return media;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildMedia);

/***/ }),

/***/ "./src/builders/radio.js":
/*!*******************************!*\
  !*** ./src/builders/radio.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./src/builders/element.js");

/**
 * Helper to create radio field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildRadio(args, parent) {
  const field = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('label', {
    classes: args.classes || [],
    append: parent
  });
  const radio = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('input', {
    attributes: {
      type: 'radio'
    },
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (const key in args.attributes) {
      const value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      radio.setAttribute(key, value);
    }
  }

  if (args.hasOwnProperty('checked')) {
    const checked = args.checked;

    if (checked && checked === radio.value) {
      radio.setAttribute('checked', 'checked');
    }
  }

  if (args.hasOwnProperty('label')) {
    const label = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('span', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  if (args.hasOwnProperty('help')) {
    (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('small', {
      text: args.help,
      append: field
    });
  }

  return radio;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildRadio);

/***/ }),

/***/ "./src/builders/select.js":
/*!********************************!*\
  !*** ./src/builders/select.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./src/builders/element.js");

/**
 * Helper to create select field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildSelect(args, parent) {
  const field = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    const label = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  const select = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('select', {
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (const key in args.attributes) {
      const value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      select.setAttribute(key, value);
    }
  }

  const options = args.options || {};

  for (const key in options) {
    const option = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('option', {
      text: options[key],
      attributes: {
        value: key
      },
      append: select
    });

    if (args.hasOwnProperty('selected')) {
      const selected = args.selected;

      if (selected && selected === option.value) {
        option.setAttribute('selected', 'selected');
      }
    }
  }

  return select;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildSelect);

/***/ }),

/***/ "./src/builders/textarea.js":
/*!**********************************!*\
  !*** ./src/builders/textarea.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./src/builders/element.js");

/**
 * Helper to create input field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildTextarea(args, parent) {
  const field = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    const label = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  const textarea = (0,_element_js__WEBPACK_IMPORTED_MODULE_0__["default"])('textarea', {
    dataset: args.dataset || {},
    append: field
  }); // Set attributes

  if (args.hasOwnProperty('attributes')) {
    for (const key in args.attributes) {
      const value = args.attributes[key];

      if (undefined === value) {
        continue;
      }

      textarea.setAttribute(key, value);
    }
  } // Set content


  if (args.hasOwnProperty('content')) {
    const content = args.content;

    if (undefined !== content) {
      textarea.innerHTML = content;
    }
  }

  return textarea;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildTextarea);

/***/ }),

/***/ "./src/helpers/attachment.js":
/*!***********************************!*\
  !*** ./src/helpers/attachment.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Upload media frame.
 *
 * @param {Object}   options  wp.media options.
 * @param {Function} callback Callback function.
 */
function uploadMedia(options, callback) {
  if (!options.hasOwnProperty('multiple')) {
    options.multiple = false;
  }

  if (!wp.media) {
    return;
  }

  const frame = wp.media(options);
  frame.on('select', () => {
    const selection = frame.state().get('selection').first().toJSON();

    if (selection.id) {
      callback(selection.id);
    }
  });
  frame.open();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uploadMedia);

/***/ }),

/***/ "./src/helpers/dataget.js":
/*!********************************!*\
  !*** ./src/helpers/dataget.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Get element by data attribute.
 *
 * @param {HTMLElement} node  Parent node.
 * @param {string}      key   Data key param.
 * @param {string}      value Data value param.
 */
function getElement(node, key, value) {
  const element = node.querySelector(`[data-${key}="${value}"]`);

  if (element) {
    return element.value;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getElement);

/***/ }),

/***/ "./src/helpers/defaults.js":
/*!*********************************!*\
  !*** ./src/helpers/defaults.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Append empty default properties to object if not exist.
 *
 * @param {Object} object   Source object.
 * @param {Array}  defaults Required defaults properties.
 */
function intersectDefaults(object, defaults) {
  defaults.forEach(item => {
    if (undefined === object[item]) {
      object[item] = {};
    }
  });
  return object;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (intersectDefaults);

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _param_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./param.js */ "./src/helpers/param.js");
/* harmony import */ var _attachment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attachment.js */ "./src/helpers/attachment.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults.js */ "./src/helpers/defaults.js");
/* harmony import */ var _uniqid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uniqid.js */ "./src/helpers/uniqid.js");
/* harmony import */ var _dataget_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataget.js */ "./src/helpers/dataget.js");





const Helper = {
  param: _param_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  attachment: _attachment_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  defaults: _defaults_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  uniqid: _uniqid_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  dataget: _dataget_js__WEBPACK_IMPORTED_MODULE_4__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Helper);

/***/ }),

/***/ "./src/helpers/param.js":
/*!******************************!*\
  !*** ./src/helpers/param.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Get current location search parameter.
 *
 * @param {string} key URL parameter key.
 */
function getSearchParam(key) {
  const params = new URL(document.location.href);
  return params.searchParams.get(key);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSearchParam);

/***/ }),

/***/ "./src/helpers/uniqid.js":
/*!*******************************!*\
  !*** ./src/helpers/uniqid.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");

/**
 * Get unique param on custom alhpabeth.
 */

function getUniqueId() {
  const nanoid = (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);
  return nanoid();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getUniqueId);

/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");


let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    id += _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet[bytes[size] & 63]
  }
  return id
}


/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/widget/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/widget/styles.scss");
/* global ajaxurl:true */

 // Store global script object for metabox.

let params = null; // Widget HTML element.

let widget = null;
/**
 * Show widget warning message.
 *
 * @param {string} message Warning message.
 */

function showWidgetError(message) {
  const warning = widget.querySelector('.sharing-image-widget-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || wp.i18n.__('Unknown generation error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hideWidgetError() {
  const warning = widget.querySelector('.sharing-image-widget-warning');

  if (null === warning) {
    return;
  }

  warning.classList.remove('warning-visible');
}
/**
 * Handle poster generation action.
 */


function generatePoster() {
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json';
  widget.classList.add('widget-loader'); // Create data form data bundle.

  const bundle = new window.FormData();
  bundle.set('action', 'sharing_image_generate');
  widget.querySelectorAll('[name]').forEach(field => {
    bundle.append(field.name, field.value);
  });
  hideWidgetError();
  const poster = widget.querySelector('.sharing-image-widget-poster');
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide preview loader on request complete.

    widget.classList.remove('widget-loader', 'widget-auto');

    if (!response.data) {
      return showWidgetError();
    }

    if (!response.success) {
      return showWidgetError(response.data);
    }

    params.meta.source = response.data;

    for (const key in response.data) {
      poster.querySelectorAll('input').forEach(input => {
        const name = params.name.source + '[' + key + ']';

        if (name === input.name) {
          input.value = response.data[key];
        }
      });
    }

    let image = poster.querySelector('img');

    if (null === image) {
      image = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('img', {
        append: poster
      });
    }

    image.src = response.data.poster;

    if (response.data.mode === 'auto') {
      widget.classList.add('widget-auto');
    } // Show the poster.


    widget.classList.add('widget-visible');
  });
  request.addEventListener('error', () => {
    showWidgetError(); // Hide preview loader on request complete.

    widget.classList.remove('widget-loader');
  });
  request.send(bundle);
}
/**
 * Create designer template selector.
 *
 * @param {HTMLElement} designer Designer element.
 * @param {Object}      selected Seleted template.
 */


function createTemplateSelector(designer, selected) {
  const fields = {};

  for (const key in params.templates) {
    fields[key] = params.templates[key]?.title || wp.i18n.__('Untitled', 'sharing-image');
  }

  const template = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].select({
    classes: ['sharing-image-widget-template'],
    options: fields,
    attributes: {
      name: params.name.source + '[template]'
    },
    selected: String(selected)
  }, designer);
  template.addEventListener('change', () => {
    const fieldset = designer.querySelectorAll('.sharing-image-widget-fieldset');

    for (let i = 0; i < fieldset.length; i++) {
      const item = fieldset[i];
      item.classList.remove('fieldset-visible');

      if (item.dataset.index === template.value) {
        item.classList.add('fieldset-visible');
      }
    }
  });
  return template;
}
/**
 * Try to prefill text layer field.
 *
 * @param {HTMLElement} textarea Textarea field.
 * @param {string}      preset   Preset field.
 * @param {Array}       data     Widget data object.
 */


function presetTextLayer(textarea, preset, data) {
  const source = document.getElementById(preset);

  if (null === source) {
    return;
  }

  const updateField = () => {
    if (data.source.mode === 'manual') {
      return;
    }

    textarea.value = source.value;
  };

  source.addEventListener('input', updateField); // Stop textarea update after first user input.

  textarea.addEventListener('input', () => {
    source.removeEventListener('input', updateField);
  });
  updateField();
}
/**
 * Try to prefill text layer field with categories.
 *
 * @param {HTMLElement} textarea Textarea field.
 * @param {Array}       data     Widget data object.
 */


function presetTextLayerCategories(textarea, data) {
  const metabox = document.getElementById('categorychecklist');

  if (!metabox) {
    return;
  }

  const separator = params.separator || ', '; // Helper function to get checked categories.

  const updateField = () => {
    const content = [];

    if (data.source.mode === 'manual') {
      return;
    }

    metabox.querySelectorAll('input:checked').forEach(el => {
      if (el.parentNode?.textContent) {
        content.push(el.parentNode.textContent.trim());
      }
    });
    textarea.value = content.join(separator);
  };

  updateField();
  metabox.addEventListener('change', updateField);
}
/**
 * Try to prefill text layer field with tags.
 *
 * @param {HTMLElement} textarea Textarea field.
 * @param {Array}       data     Widget data object.
 */


function presetTextLayerTags(textarea, data) {
  const checklist = document.querySelector('#post_tag .tagchecklist');

  if (!checklist || !MutationObserver) {
    return;
  }

  const separator = params.separator || ', '; // Update textarea field.

  const updateField = () => {
    const tags = document.getElementById('tax-input-post_tag');

    if (!tags) {
      return;
    }

    if (data.source.mode === 'manual') {
      return;
    }

    const content = tags.value.split(',');
    textarea.value = content.join(separator);
  };

  updateField();
  const observer = new MutationObserver(updateField);
  observer.observe(checklist, {
    childList: true
  });
}
/**
 * Try to prefill image layer field.
 *
 * @param {HTMLElement} media Media element.
 * @param {Array}       data  Widget data object.
 */


function presetImageLayer(media, data) {
  const frame = wp.media?.featuredImage?.frame();

  if (frame) {
    frame.on('select', () => {
      if (data.source.mode === 'manual') {
        return;
      }

      const selection = frame.state().get('selection').first().toJSON();

      if (selection.id) {
        media.dispatchEvent(new CustomEvent('set_attachment', {
          detail: selection.id
        }));
      }
    });
  } // Find featured image metabox.


  const metabox = document.getElementById('postimagediv');

  if (!metabox) {
    return;
  }

  metabox.addEventListener('click', e => {
    if (data.source.mode === 'manual') {
      return;
    }

    if (e.target.id === 'remove-post-thumbnail') {
      media.dispatchEvent(new CustomEvent('remove_attachment'));
    }
  });

  if (data.source.mode === 'manual') {
    return;
  }

  const thumbnail = metabox.querySelector('#_thumbnail_id');

  if (!thumbnail) {
    return;
  }

  const attachment = parseInt(thumbnail.value);

  if (attachment > 0) {
    media.dispatchEvent(new CustomEvent('set_attachment', {
      detail: attachment
    }));
  }
}
/**
 * Create designer text layer.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      layer    Layer data.
 * @param {string}      key      Layer key.
 * @param {Array}       data     Widget data object.
 */


function createLayerText(fieldset, layer, key, data) {
  const textarea = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].textarea({
    classes: ['sharing-image-widget-text'],
    label: layer.title || null,
    attributes: {
      name: params.name.fieldset + `[${key}]`
    }
  }, fieldset);
  textarea.value = data.fieldset[key] || ''; // Skip presets for terms.

  if (params.context !== 'post') {
    return;
  } // Preset title.


  if (layer.preset === 'title') {
    presetTextLayer(textarea, 'title', data);
  } // Preset excerpt.


  if (layer.preset === 'excerpt') {
    presetTextLayer(textarea, 'excerpt', data);
  } // Preset categories.


  if (layer.preset === 'categories') {
    presetTextLayerCategories(textarea, data);
  } // Preset tags.


  if (layer.preset === 'tags') {
    presetTextLayerTags(textarea, data);
  }
}
/**
 * Create designer image layer.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      layer    Layer data.
 * @param {string}      key      Layer key.
 * @param {Array}       data     Widget data object.
 */


function createLayerImage(fieldset, layer, key, data) {
  const media = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].media({
    name: params.name.fieldset + `[${key}]`,
    classes: ['sharing-image-widget-image'],
    label: layer.title || null,
    value: data.fieldset[key] || '',
    labels: {
      button: wp.i18n.__('Set layer image', 'sharing-image'),
      heading: wp.i18n.__('Select image', 'sharing-image'),
      details: wp.i18n.__('Attachment', 'sharing-image'),
      remove: wp.i18n.__('Remove image', 'sharing-image')
    },
    mime: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    image: true,
    remove: true,
    append: fieldset
  });

  if (params.context === 'post' && layer.preset === 'featured') {
    presetImageLayer(media, data);
  }
}
/**
 * Create fields designer.
 *
 * @param {Object} data Widget data object.
 */


function createDesigner(data) {
  if (Object.keys(params.templates).length < 1) {
    return;
  }

  const designer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-widget-designer']
  });
  let selected = data.source.template || null; // Reset selected template if index undefined.

  if (!params.templates[selected]) {
    selected = Object.keys(params.templates)[0];
  }

  createTemplateSelector(designer, selected);

  for (const index in params.templates) {
    const template = params.templates[index];
    const fieldset = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
      classes: ['sharing-image-widget-fieldset'],
      dataset: {
        index: index
      },
      append: designer
    });

    if (index === selected) {
      fieldset.classList.add('fieldset-visible');
    }

    const layers = template.layers || {};

    for (const key in layers) {
      const layer = layers[key];

      if (!layer.dynamic) {
        continue;
      }

      switch (layer.type) {
        case 'text':
          createLayerText(fieldset, layer, key, data);
          break;

        case 'image':
          createLayerImage(fieldset, layer, key, data);
          break;
      }
    }
  }

  widget.appendChild(designer);
  return designer;
}
/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */


function createGenerateButton(manager) {
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-widget-generate', 'button'],
    text: wp.i18n.__('Generate', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', () => {
    generatePoster();
  });
}
/**
 * Create button to delete current metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */


function createDeleteButton(manager) {
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-widget-delete', 'button', 'button-delete'],
    text: wp.i18n.__('Remove', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', () => {
    const image = widget.querySelector('.sharing-image-widget-poster img');

    if (null === image) {
      return;
    }

    const poster = image.parentNode;
    poster.removeChild(image);
    poster.querySelectorAll('input').forEach(input => {
      input.value = '';

      if (input.name === params.name.source + '[mode]') {
        input.value = 'manual';
      }
    });
    widget.classList.remove('widget-visible');
  });
}
/**
 * Create widget manager.
 *
 * @param {HTMLElement} designer Designer element.
 */


function createManager(designer) {
  const manager = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-widget-manager'],
    append: designer
  });
  createGenerateButton(manager);
  createDeleteButton(manager);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    classes: ['sharing-image-widget-spinner', 'spinner'],
    append: manager
  });
}
/**
 * Create poster block.
 *
 * @param {Object} data Widget data object.
 */


function createPoster(data) {
  const poster = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-widget-poster'],
    append: widget
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    classes: ['sharing-image-widget-mode'],
    attributes: {
      title: wp.i18n.__('Poster was generated automatically and will update on post saving.', 'sharing-image')
    },
    append: poster
  });

  if (data.source.mode === 'auto') {
    widget.classList.add('widget-auto');
  }

  if (data.source.poster) {
    _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('img', {
      attributes: {
        src: data.source.poster,
        alt: ''
      },
      append: poster
    });
    widget.classList.add('widget-visible');
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name.source + '[poster]',
      value: data.source.poster || ''
    },
    append: poster
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name.source + '[width]',
      value: data.source.width
    },
    append: poster
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name.source + '[height]',
      value: data.source.height
    },
    append: poster
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name.source + '[mode]',
      value: data.source.mode
    },
    append: poster
  });
}
/**
 * Check that the poster sizes are set or show an error message.
 *
 * @param {Object} data Widget data object.
 */


function showSizesWarning(data) {
  if (!data.poster) {
    return;
  }

  if (!data.width || !data.height) {
    showWidgetError(wp.i18n.__('Image sizes are not set. Regenerate the poster.', 'sharing-image'));
  }
}
/**
 * Build metabox fields.
 */


function buildWidget() {
  while (widget.firstChild) {
    widget.removeChild(widget.lastChild);
  }

  if (params.context) {
    widget.classList.add(`widget-${params.context}`);
  }

  const data = params.meta || {};
  createPoster(data); // Create fields designer.

  const designer = createDesigner(data);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-widget-warning'],
    append: designer
  });
  createManager(designer);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: widget
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_screen',
      value: params.screen
    },
    append: widget
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_context',
      value: params.context
    },
    append: widget
  });
  showSizesWarning(data);
}
/**
 * Init metabox handler.
 */


(function () {
  if (wp === undefined) {
    return;
  }

  params = window.sharingImageWidget || {}; // Find only single Sharing Image widget on page.

  widget = document.querySelector('.sharing-image-widget');

  if (!widget) {
    return;
  }

  buildWidget(widget);
})();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map