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
function buildElement(tag, args) {
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

  if ('range' === input.type) {
    const counter = _index_js__WEBPACK_IMPORTED_MODULE_1__["default"].element('em', {
      text: input.value,
      attributes: {
        title: wp.i18n.__('Click to change input view', 'sharing-image')
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
      if ('text' === input.type) {
        return input.type = 'range';
      }

      return input.type = 'text';
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
  } // Labels are required.


  args.labels = args.labels || {};
  const attachment = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('input', {
    attributes: {
      type: 'hidden',
      name: args.name
    },
    append: media
  });
  const upload = (0,_element__WEBPACK_IMPORTED_MODULE_0__["default"])('button', {
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
      upload.textContent = args.labels.remove;
    }

    details.classList.remove('hidden');
  }; // Helper function to remove attachment value.


  const removeAttachment = () => {
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

  upload.addEventListener('click', () => {
    if (args.remove && attachment.value) {
      return removeAttachment();
    }

    _helpers__WEBPACK_IMPORTED_MODULE_2__["default"].attachment(args.labels.heading, id => {
      setAttachment(id);
    });
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
 * @param {string}   header   Frame header text.
 * @param {Function} callback Callback function.
 */
function uploadMedia(header, callback) {
  const frame = wp.media({
    title: header,
    multiple: false
  });
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



const Helper = {
  param: _param_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  attachment: _attachment_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  defaults: _defaults_js__WEBPACK_IMPORTED_MODULE_2__["default"]
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

let params = null; // Picker HTML element.

let picker = null;
/**
 * Show picker warning message.
 *
 * @param {string} message Warning message.
 */

function showPickerError(message) {
  const warning = picker.querySelector('.sharing-image-picker-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || wp.i18n.__('Unknown generation error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hidePickerError() {
  const warning = picker.querySelector('.sharing-image-picker-warning');

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
  picker.classList.add('picker-loader'); // Create data form data bundle.

  const bundle = new window.FormData();
  bundle.set('action', 'sharing_image_generate');
  picker.querySelectorAll('[name]').forEach(field => {
    bundle.append(field.name, field.value);
  });
  hidePickerError();
  const poster = picker.querySelector('.sharing-image-picker-poster');
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide preview loader on request complete.

    picker.classList.remove('picker-loader');

    if (!response.data) {
      return showPickerError();
    }

    if (!response.success) {
      return showPickerError(response.data);
    }

    for (const key in response.data) {
      poster.querySelectorAll('input').forEach(input => {
        const name = params.name + '[' + key + ']';

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

    image.src = response.data.poster; // Show the poster.

    picker.classList.add('picker-visible');
  });
  request.addEventListener('error', () => {
    showPickerError(); // Hide preview loader on request complete.

    picker.classList.remove('picker-loader');
  });
  request.send(bundle);
}
/**
 * Create designer template selector.
 *
 * @param {HTMLElement} designer Designer element.
 * @param {Object}      selected Seleted template.
 */


function createTemplate(designer, selected) {
  const fields = {};
  params.templates.forEach((template, i) => {
    fields[i] = template.title || wp.i18n.__('Untitled', 'sharing-image');
  });
  const template = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].select({
    classes: ['sharing-image-picker-template'],
    options: fields,
    attributes: {
      name: params.name + '[template]'
    },
    selected: String(selected)
  }, designer);
  template.addEventListener('change', () => {
    const fieldset = designer.querySelectorAll('.sharing-image-picker-fieldset');

    for (let i = 0; i < fieldset.length; i++) {
      fieldset[i].classList.remove('fieldset-visible');

      if (i === parseInt(template.value)) {
        fieldset[i].classList.add('fieldset-visible');
      }
    }
  });
  return template;
}
/**
 * Try to prefill caption field.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */


function fillCaptionPreset(textarea, preset) {
  const source = document.getElementById(preset);

  if (null === source) {
    return;
  }

  const updateCaption = () => {
    textarea.value = source.value;
  };

  source.addEventListener('change', updateCaption); // Stop textarea update after first user input.

  textarea.addEventListener('change', () => {
    source.removeEventListener('change', updateCaption);
  });
  updateCaption();
}
/**
 * Create designer attachment field for dynamic background.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      template Template data.
 * @param {Array}       values   Template fieldset values.
 * @param {string}      name     Field name attribute.
 */


function createDesignerAttachment(fieldset, template, values, name) {
  if ('dynamic' !== template.background) {
    return;
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].media({
    name: name + '[attachment]',
    classes: ['sharing-image-picker-media'],
    value: values.attachment,
    link: params.links.uploads,
    labels: {
      button: wp.i18n.__('Upload background', 'sharing-image'),
      heading: wp.i18n.__('Select background image', 'sharing-image'),
      details: wp.i18n.__('Attachment', 'sharing-image')
    },
    append: fieldset
  });
}
/**
 * Create designer captions for text layers.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      template Template data.
 * @param {Array}       values   Template fieldset values.
 * @param {string}      name     Field name attribute.
 */


function createDesignerCaptions(fieldset, template, values, name) {
  const captions = values.captions || []; // Set default layers list.

  template.layers = template.layers || [];
  template.layers.forEach((layer, n) => {
    if ('text' !== layer.type || !layer.dynamic) {
      return;
    }

    const textarea = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].textarea({
      classes: ['sharing-image-picker-caption'],
      label: layer.title || null,
      attributes: {
        name: name + `[captions][${n}]`
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
 * @param {Object} data Picker data object.
 */


function createDesigner(data) {
  const designer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-picker-designer']
  });
  let selected = data.template || 0; // Reset selected template if index undefined.

  if (!params.templates[selected]) {
    selected = 0;
  }

  if (params.templates.length > 1) {
    createTemplate(designer, selected);
  }

  params.templates.forEach((template, i) => {
    template.layers = template.layers || [];
    const fieldset = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
      classes: ['sharing-image-picker-fieldset'],
      append: designer
    });

    if (i === parseInt(selected)) {
      fieldset.classList.add('fieldset-visible');
    }

    let values = {};

    if (data.fieldset && data.fieldset[i]) {
      values = data.fieldset[i];
    }

    const name = params.name + `[fieldset][${i}]`;
    _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
      attributes: {
        type: 'hidden',
        name: name
      },
      append: fieldset
    });
    createDesignerAttachment(fieldset, template, values, name);
    createDesignerCaptions(fieldset, template, values, name);
  });
  picker.appendChild(designer);
  return designer;
}
/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */


function createGenerateButton(manager) {
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-picker-generate', 'button'],
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
    classes: ['sharing-image-picker-delete', 'button', 'button-delete'],
    text: wp.i18n.__('Remove', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', () => {
    const image = picker.querySelector('.sharing-image-picker-poster img');

    if (null === image) {
      return;
    }

    const poster = image.parentNode;
    poster.removeChild(image);
    poster.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
    picker.classList.remove('picker-visible');
  });
}
/**
 * Create picker manager.
 *
 * @param {HTMLElement} designer Designer element.
 */


function createManager(designer) {
  const manager = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-picker-manager'],
    append: designer
  });
  createGenerateButton(manager);
  createDeleteButton(manager);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    classes: ['sharing-image-picker-spinner', 'spinner'],
    append: manager
  });
}
/**
 * Create poster block.
 *
 * @param {Object} data Picker data object.
 */


function createPoster(data) {
  const poster = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-picker-poster'],
    append: picker
  });

  if (data.poster) {
    _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('img', {
      attributes: {
        src: data.poster,
        alt: ''
      },
      append: poster
    });
    picker.classList.add('picker-visible');
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name + '[poster]',
      value: data.poster
    },
    append: poster
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name + '[width]',
      value: data.width
    },
    append: poster
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name + '[height]',
      value: data.height
    },
    append: poster
  });
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
    showPickerError(wp.i18n.__('Image sizes are not set. Regenerate the poster.', 'sharing-image'));
  }
}
/**
 * Build metabox fields.
 *
 * @param {HTMLElement} widget   Widget element.
 * @param {Object}      settings Global settings object.
 */


function buildPicker(widget, settings) {
  params = settings; // Set params name for template form fields.

  params.name = 'sharing_image_picker';

  while (widget.firstChild) {
    widget.removeChild(widget.lastChild);
  }

  picker = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-picker'],
    append: widget
  });
  const data = params.meta || {};
  createPoster(data); // Create fields designer.

  const designer = createDesigner(data);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-picker-warning'],
    append: designer
  });
  createManager(designer);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: picker
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_screen',
      value: params.screen
    },
    append: picker
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_context',
      value: params.context
    },
    append: picker
  });
  showSizesWarning(data);
}
/**
 * Init metabox handler.
 */


(function () {
  if (typeof 'undefined' === wp) {
    return;
  }

  const object = window.sharingImageWidget || {}; // Set default templates empty list.

  object.templates = object.templates || []; // Find metabox element.

  const widgets = document.querySelectorAll('.sharing-image-widget');
  widgets.forEach(widget => {
    if (object.context) {
      widget.classList.add(`widget-${object.context}`);
    }

    buildPicker(widget, object);
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map