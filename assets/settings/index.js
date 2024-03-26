/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/settings/pages/catalog/styles.scss":
/*!************************************************!*\
  !*** ./src/settings/pages/catalog/styles.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/pages/config/styles.scss":
/*!***********************************************!*\
  !*** ./src/settings/pages/config/styles.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/pages/editor/styles.scss":
/*!***********************************************!*\
  !*** ./src/settings/pages/editor/styles.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/pages/premium/styles.scss":
/*!************************************************!*\
  !*** ./src/settings/pages/premium/styles.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/pages/tools/styles.scss":
/*!**********************************************!*\
  !*** ./src/settings/pages/tools/styles.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/styles.scss":
/*!**********************************!*\
  !*** ./src/settings/styles.scss ***!
  \**********************************/
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
/* harmony import */ var _uniqid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uniqid.js */ "./src/helpers/uniqid.js");




const Helper = {
  param: _param_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  attachment: _attachment_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  defaults: _defaults_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  uniqid: _uniqid_js__WEBPACK_IMPORTED_MODULE_3__["default"]
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

/***/ "./src/settings/pages/catalog/index.js":
/*!*********************************************!*\
  !*** ./src/settings/pages/catalog/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/pages/catalog/styles.scss");

 // Store global scriot object for settings page.

let params = null;
/**
 * Create template card in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {Object}      option  List of template options.
 * @param {string}      index   Template index.
 */

function createCard(catalog, option, index) {
  const card = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-catalog-card'],
    append: catalog
  });
  const preview = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('figure', {
    classes: ['sharing-image-catalog-preview'],
    append: card
  });

  if (option.preview) {
    _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('img', {
      attributes: {
        src: option.preview,
        alt: ''
      },
      append: preview
    });
  }

  const footer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('footer', {
    classes: ['sharing-image-catalog-footer'],
    append: card
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('h2', {
    text: option.title || wp.i18n.__('Untitled', 'sharing-image'),
    append: footer
  });
  const link = new URL(document.location.href);
  link.searchParams.set('template', index);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
    classes: ['button'],
    text: wp.i18n.__('Edit template', 'sharing-image'),
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
 * @param {string}      index   Template index.
 */


function createNewButton(catalog, index) {
  const link = new URL(document.location.href);
  link.searchParams.set('template', index);
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
    classes: ['sharing-image-catalog-new'],
    attributes: {
      href: link.href
    },
    append: catalog
  });
  const title = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('h2', {
    append: button
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('strong', {
    text: wp.i18n.__('Add new template', 'sharing-image'),
    append: title
  }); // Restrict new template creation for not Premium users.

  if (params.templates.length === 0) {
    return;
  }

  const license = params.license || {};

  if (license.premium || license.develop) {
    return;
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    text: wp.i18n.__('(Availible for Premium only)', 'sharing-image'),
    append: title
  });

  if (params.links.premium) {
    button.href = params.links.premium;
  }
}
/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */


function createCatalog(content, settings) {
  params = settings;
  const catalog = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-catalog'],
    append: content
  });

  for (const index in settings.templates) {
    createCard(catalog, settings.templates[index], index);
  }

  createNewButton(catalog, settings.index);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCatalog);

/***/ }),

/***/ "./src/settings/pages/config/index.js":
/*!********************************************!*\
  !*** ./src/settings/pages/config/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/pages/config/styles.scss");
/**
 * Config settings tab.
 */

 // Store global script object for settings page.

let params = null;
/**
 * Create default poster option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */

function createDefaultOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Default poster', 'sharing-image'),
    append: options
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].media({
    name: params.name + '[default]',
    classes: ['sharing-image-config-control-media'],
    label: wp.i18n.__('Default poster', 'sharing-image'),
    value: data.default,
    link: params.links.uploads,
    labels: {
      button: wp.i18n.__('Upload image', 'sharing-image'),
      heading: wp.i18n.__('Select default poster', 'sharing-image'),
      details: wp.i18n.__('Attachment details', 'sharing-image'),
      remove: wp.i18n.__('Remove image', 'sharing-image')
    },
    remove: true,
    append: control
  });
  const description = [];
  description.push(wp.i18n.__('The default poster is used on pages where there is no generated.', 'sharing-image'));
  description.push(wp.i18n.__('Best image size: 1200×630 pixels.', 'sharing-image'));
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('small', {
    text: description.join(' '),
    append: control
  });
}
/**
 * Create uploads directory option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createUploadsOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Upload directory', 'sharing-image'),
    append: options
  });
  const fieldset = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-config-control-fieldset'],
    append: control
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].radio({
    classes: ['sharing-image-config-control-radio'],
    attributes: {
      name: params.name + '[uploads]',
      value: 'default'
    },
    label: wp.i18n.__('Use default uploads directory', 'sharing-image'),
    checked: data.uploads || 'default'
  }, fieldset);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].radio({
    classes: ['sharing-image-config-control-radio'],
    attributes: {
      name: params.name + '[uploads]',
      value: 'custom'
    },
    label: wp.i18n.__('Choose custom storage for posters', 'sharing-image'),
    checked: data.uploads || 'default'
  }, fieldset);
  const input = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].input({
    classes: ['sharing-image-config-control-input'],
    attributes: {
      name: params.name + '[storage]',
      value: data.storage || params.links.storage,
      disabled: 'disabled'
    }
  }, control);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('small', {
    text: wp.i18n.__('Use relative path from site root. Directory should be writeable.', 'sharing-image'),
    append: control
  });
  control.querySelectorAll('input').forEach(radio => {
    if ('radio' !== radio.type) {
      return;
    } // Show storage input for checked custom radio.


    if (radio.checked && 'custom' === radio.value) {
      input.disabled = false;
    }

    radio.addEventListener('change', () => {
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
 * @param {Object}      data    Config data object.
 */


function createImageOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control', 'control-extra'],
    label: wp.i18n.__('Poster image format', 'sharing-image'),
    help: wp.i18n.__('The higher the value, the less compression. Availible for JPEG only.', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-config-control-select'],
      options: {
        jpg: wp.i18n.__('JPEG', 'sharing-image'),
        png: wp.i18n.__('PNG', 'sharing-image'),
        gif: wp.i18n.__('GIF', 'sharing-image')
      },
      attributes: {
        name: params.name + '[format]'
      },
      selected: data.format || 'jpg'
    }, {
      group: 'input',
      classes: ['sharing-image-config-control-range'],
      attributes: {
        type: 'range',
        name: params.name + '[quality]',
        min: 10,
        max: 100,
        step: 5,
        value: data.quality || '90',
        disabled: 'disabled'
      },
      label: wp.i18n.__('Image quality', 'sharing-image')
    }],
    append: options
  }); // Find control format select.

  const format = control.querySelector('select'); // Find control quiality input.

  const quality = control.querySelector('input');

  if ('jpg' === format.value) {
    quality.disabled = false;
  }

  format.addEventListener('change', () => {
    quality.disabled = true;

    if ('jpg' === format.value) {
      quality.disabled = false;
    }
  });
}
/**
 * Create autogenerate poster options.
 *
 * @param {HTMLElement} options   Options form element.
 * @param {Object}      data      Config data object.
 * @param {Array}       templates List of templates.
 */


function createAutogenerateOptions(options, data, templates) {
  const fields = {}; // Add the option for disabling feature.

  fields.manual = wp.i18n.__('Disable auto generation', 'sharing-image');

  for (const i in templates) {
    fields[i] = templates[i].title || wp.i18n.__('Untitled', 'sharing-image');
  }

  let selected = data.autogenerate;

  if (typeof selected === 'undefined') {
    selected = 'manual';
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Auto generate poster', 'sharing-image'),
    help: wp.i18n.__('This template will be applied automatically on post save.', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-config-control-select'],
      options: fields,
      attributes: {
        name: params.name + '[autogenerate]'
      },
      selected: String(selected)
    }],
    append: options
  });
}
/**
 * Live Reload options
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createLiveReloadOptions(options, data) {
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Live-reload', 'sharing-image'),
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-config-control-checkbox'],
      attributes: {
        name: params.name + '[suspend]',
        value: 'suspend'
      },
      label: wp.i18n.__('Disable live-reload on the template editor screen', 'sharing-image'),
      checked: data.suspend
    }],
    append: options
  });
}
/**
 * Attachment options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createAttachmentOptions(options, data) {
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Poster attachment', 'sharing-image'),
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-config-control-checkbox'],
      attributes: {
        name: params.name + '[attachment]',
        value: 'attachment'
      },
      label: wp.i18n.__('Save the generated poster as an attachment in the media library', 'sharing-image'),
      checked: data.attachment
    }],
    append: options
  });
}
/**
 * Create required form meta fields.
 *
 * @param {HTMLElement} options Options form element.
 */


function createMetaFields(options) {
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: params.name
    },
    append: options
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: options
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    text: wp.i18n.__('Save changes', 'sharing-image'),
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
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */


function createConfig(content, settings) {
  params = settings; // Set params name for config form fields.

  params.name = 'sharing_image_config'; // Find config element

  const config = content.querySelector('.sharing-image-config');

  if (null === config) {
    return;
  }

  const options = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('form', {
    classes: ['sharing-image-config-options'],
    attributes: {
      action: params.links.action,
      method: 'POST'
    },
    append: config
  });
  const data = params.config || {};
  const templates = params.templates || []; // Poster image options.

  createImageOptions(options, data); // Autogenerate poster.

  createAutogenerateOptions(options, data, templates); // Attachment options.

  createAttachmentOptions(options, data); // Uploads directory options.

  createUploadsOptions(options, data); // Live-reload options.

  createLiveReloadOptions(options, data); // Default poster.

  createDefaultOptions(options, data); // Create required form fields.

  createMetaFields(options);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createConfig);

/***/ }),

/***/ "./src/settings/pages/editor/index.js":
/*!********************************************!*\
  !*** ./src/settings/pages/editor/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../builders */ "./src/builders/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/pages/editor/styles.scss");
/**
 * Editor settings.
 */

/* global ajaxurl:true */


 // Store global script object for settings page.

let params = null; // Preview element.

let preview = null; // Root editor element.

let editor = null;
/**
 * Show template warning message.
 *
 * @param {string} message Warning message.
 */

function showTemplateError(message) {
  const viewport = preview.parentNode; // Try to find warning element.

  const warning = viewport.querySelector('.sharing-image-editor-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || wp.i18n.__('Unknown generation error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hideTemplateError() {
  const viewport = preview.parentNode; // Try to find warning element.

  const warning = viewport.querySelector('.sharing-image-editor-warning');

  if (null === warning) {
    return;
  }

  warning.classList.remove('warning-visible');
}
/**
 * Geneate template using editor data.
 */


function generateTemplate() {
  preview.classList.add('preview-loader');
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'blob'; // Create data bundle using form data.

  const bundle = new window.FormData(editor);
  bundle.set('action', 'sharing_image_show');
  hideTemplateError(); // Set blob for success response.

  request.addEventListener('readystatechange', () => {
    if (request.readyState === 2) {
      request.responseType = 'json';

      if (request.status === 200) {
        request.responseType = 'blob';
      }
    }
  });
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide preview loader on request complete.

    preview.classList.remove('preview-blank', 'preview-loader');

    if (200 !== request.status) {
      return showTemplateError(response.data);
    }

    let image = preview.querySelector('img');

    if (null === image) {
      image = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('img', {
        append: preview
      });
    } // Set new blob image source.


    image.src = window.URL.createObjectURL(response);
  });
  request.addEventListener('error', () => {
    showTemplateError(); // Hide preview loader on request complete.

    preview.classList.remove('preview-blank', 'preview-loader');
  });
  request.send(bundle);
}
/**
 * Save template while editor submiting.
 */


function saveTemplate() {
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json';
  preview.classList.add('preview-loader'); // Create data bundle using editor data.

  const bundle = new window.FormData(editor);
  bundle.set('action', 'sharing_image_save');
  request.addEventListener('load', () => {
    const response = request.response || {};

    if (!response.data) {
      return showTemplateError();
    }

    if (!response.success) {
      // Hide preview loader on request complete.
      preview.classList.remove('preview-loader');
      return showTemplateError(response.data);
    }

    const input = preview.querySelector('input');

    if (null !== input) {
      input.value = response.data;
    }

    editor.submit();
  });
  request.addEventListener('error', () => {
    // Hide preview loader on request complete.
    preview.classList.remove('preview-loader');
    showTemplateError();
  });
  request.send(bundle);
}
/**
 * Text layer dynamic/static fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createTextDynamicFields(layer, name, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[dynamic]',
      value: 'dynamic'
    },
    label: wp.i18n.__('Dynamic field. Filled in the post editing screen.', 'sharing-image'),
    checked: data.dynamic
  }, control);
  const fields = [];
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: wp.i18n.__('Displayed only in the metabox.', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[title]',
        value: data.title
      },
      dataset: {
        caption: 'title'
      },
      label: wp.i18n.__('Field name', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: wp.i18n.__('This field is used for example only, to see how the editor will look.', 'sharing-image'),
    fields: [{
      group: 'textarea',
      classes: ['sharing-image-editor-control-textarea'],
      content: data.sample || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      attributes: {
        name: name + '[sample]',
        rows: 2
      },
      label: wp.i18n.__('Text sample', 'sharing-image')
    }],
    append: layer
  });
  const presets = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-hidden'],
    label: wp.i18n.__('Preset text field', 'sharing-image'),
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
      label: wp.i18n.__('Fill in manually', 'sharing-image'),
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
      label: wp.i18n.__('Take from post title', 'sharing-image'),
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
      label: wp.i18n.__('Use post excerpt text', 'sharing-image'),
      checked: data.preset || 'none'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[preset]',
        value: 'taxonomy'
      },
      dataset: {
        persistent: true
      },
      label: wp.i18n.__('Show post taxonomy terms', 'sharing-image'),
      checked: data.preset || 'none'
    }],
    append: layer
  });
  fields[fields.length] = presets;
  const taxonomy = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-hidden', 'control-extend', 'control-pulled'],
    label: wp.i18n.__('Preset taxonomy', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: params.taxonomies,
      attributes: {
        name: name + '[taxonomy]'
      },
      selected: data.taxonomy
    }],
    append: layer
  });
  fields[fields.length] = taxonomy;

  if ('taxonomy' !== data.preset) {
    taxonomy.classList.add('control-disabled');
  } // Show taxonomy select on preset change.


  presets.addEventListener('change', () => {
    const checked = presets.querySelector('input:checked').value;
    taxonomy.classList.add('control-disabled');

    if ('taxonomy' === checked) {
      taxonomy.classList.remove('control-disabled');
    }
  });
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend'],
    help: wp.i18n.__('You can use non-breaking spaces to manage your string position.', 'sharing-image'),
    fields: [{
      group: 'textarea',
      classes: ['sharing-image-editor-control-textarea'],
      content: data.content,
      attributes: {
        name: name + '[content]',
        rows: 2
      },
      dataset: {
        caption: 'content'
      },
      label: wp.i18n.__('Content', 'sharing-image')
    }],
    append: layer
  }); // Helper function to toggle controls visibility.

  const toggleClasses = () => {
    fields.forEach(field => {
      field.classList.toggle('control-hidden');
    });
  };

  if (checkbox.checked) {
    toggleClasses();
  }

  checkbox.addEventListener('change', () => {
    toggleClasses();
    updateLayerCaption(layer, checkbox);
  });
  updateLayerCaption(layer, checkbox);
}
/**
 * Image layer dynamic/static fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createImageDynamicFields(layer, name, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[dynamic]',
      value: 'dynamic'
    },
    label: wp.i18n.__('Dynamic image. Can be updated on the post editing screen.', 'sharing-image'),
    checked: data.dynamic
  }, control);
  const fields = [];
  const presets = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-hidden'],
    label: wp.i18n.__('Preset image field', 'sharing-image'),
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
      label: wp.i18n.__('Choose in manually', 'sharing-image'),
      checked: data.preset || 'none'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[preset]',
        value: 'featured'
      },
      dataset: {
        persistent: true
      },
      label: wp.i18n.__('Take from featured image', 'sharing-image'),
      checked: data.preset || 'featured'
    }],
    append: layer
  });
  fields[fields.length] = presets; // Helper function to toggle controls visibility.

  const toggleClasses = () => {
    fields.forEach(field => {
      field.classList.toggle('control-hidden');
    });
  };

  if (checkbox.checked) {
    toggleClasses();
  }

  checkbox.addEventListener('change', () => {
    toggleClasses();
  });
}
/**
 * Image layer sizes fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createImageSizesFields(layer, name, data) {
  const fields = [];
  const sizes = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[x]',
        value: data.x,
        placeholder: '10'
      },
      label: wp.i18n.__('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[y]',
        value: data.y,
        placeholder: '10'
      },
      label: wp.i18n.__('Y', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[width]',
        value: data.width
      },
      dataset: {
        dimension: 'width'
      },
      label: wp.i18n.__('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[height]',
        value: data.height
      },
      dataset: {
        dimension: 'height'
      },
      label: wp.i18n.__('Height', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    label: wp.i18n.__('Image resizing principle', 'sharing-image'),
    fields: [{
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'center'
      },
      label: wp.i18n.__('Center image while preserving aspect ratio.', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'top'
      },
      label: wp.i18n.__('Top aligned image while preserving aspect ratio', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'bottom'
      },
      label: wp.i18n.__('Bottom aligned image while preserving aspect ratio', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'ignore'
      },
      label: wp.i18n.__('Resize ignore the aspect ratio', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'crop'
      },
      label: wp.i18n.__('Center-crop the image', 'sharing-image'),
      checked: data.resize || 'center'
    }],
    append: layer
  });
  const dimensions = sizes.querySelectorAll('[data-dimension]'); // Helper function to trigger events on dimension changes.

  const toggleClasses = () => {
    let empty = false;
    dimensions.forEach(input => {
      if (input.value.length < 1) {
        empty = true;
      }
    });
    fields.forEach(field => {
      field.classList.toggle('control-disabled', empty);
    });
  };

  toggleClasses();
  dimensions.forEach(dimension => {
    dimension.addEventListener('keyup', toggleClasses);
  });
}
/**
 * Update layer caption according to text fields value.
 *
 * @param {HTMLElement} layer    Current layer element.
 * @param {HTMLElement} checkbox Dynamic text checbox element.
 */


function updateLayerCaption(layer, checkbox) {
  const caption = layer.querySelector('h2 > span');

  if (null === caption) {
    return;
  }

  const fields = {};
  const prefix = ': ';
  layer.querySelectorAll('[data-caption]').forEach(field => {
    fields[field.dataset.caption] = field;
    field.addEventListener('keyup', () => {
      caption.textContent = field.value ? prefix + field.value : '';
    });
  });
  caption.textContent = prefix + fields.content.value;

  if (checkbox.checked) {
    caption.textContent = prefix + fields.title.value;
  }

  if (caption.textContent === prefix) {
    caption.textContent = '';
  }
}
/**
 * Text layer more options fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createTextMoreFields(layer, name, data) {
  const fields = [];
  fields[fields.length] = createFontField(layer, name, data);
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-hidden'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        type: 'color',
        name: name + '[color]',
        value: data.color || '#ffffff'
      },
      label: wp.i18n.__('Text color', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-series', 'control-hidden'],
    fields: [{
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        left: wp.i18n.__('Left', 'sharing-image'),
        center: wp.i18n.__('Center', 'sharing-image'),
        right: wp.i18n.__('Right', 'sharing-image')
      },
      attributes: {
        name: name + '[horizontal]'
      },
      label: wp.i18n.__('Horizontal alignment', 'sharing-image'),
      selected: data.horizontal
    }, {
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        top: wp.i18n.__('Top', 'sharing-image'),
        center: wp.i18n.__('Center', 'sharing-image'),
        bottom: wp.i18n.__('Bottom', 'sharing-image')
      },
      attributes: {
        name: name + '[vertical]'
      },
      label: wp.i18n.__('Vertical alignment', 'sharing-image'),
      selected: data.vertical
    }],
    append: layer
  });
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-editor-more'],
    text: wp.i18n.__('More options', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', () => {
    fields.forEach(field => {
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
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createFontField(layer, name, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-upload', 'control-hidden'],
    append: layer
  });
  const select = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].select({
    classes: ['sharing-image-editor-control-select'],
    options: params.fonts,
    attributes: {
      name: name + '[fontname]'
    },
    label: wp.i18n.__('Font family', 'sharing-image'),
    selected: data.fontname
  }, control);
  const media = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].media({
    name: name + '[fontfile]',
    classes: ['sharing-image-editor-control-media'],
    value: data.fontfile,
    link: params.links.uploads,
    labels: {
      button: wp.i18n.__('Upload custom font', 'sharing-image'),
      heading: wp.i18n.__('Upload custom font', 'sharing-image'),
      details: wp.i18n.__('Font attachment', 'sharing-image'),
      remove: wp.i18n.__('Remove font', 'sharing-image')
    },
    remove: true,
    append: control
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('small', {
    text: wp.i18n.__('Custom font can only be in .ttf format.', 'sharing-image'),
    append: control
  });

  if (data.fontfile) {
    select.disabled = true;
  } // Find media attachment input.


  const input = media.querySelector('input');
  input.addEventListener('change', () => {
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
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createRectangleOutline(layer, name, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[outline]',
      value: 'outline'
    },
    label: wp.i18n.__('Outline rectangle.', 'sharing-image'),
    checked: data.outline
  }, control);
  const range = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('Border width', 'sharing-image')
    }],
    append: layer
  });

  if (data.outline) {
    range.classList.remove('control-hidden');
  }

  checkbox.addEventListener('change', () => {
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
  const link = new URL(document.location.href);
  link.searchParams.delete('template');
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
    classes: ['button'],
    text: wp.i18n.__('← Back to Catalog', 'sharing-image'),
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
  const href = new URL(document.location.href); // Get template index from current link.

  const index = href.searchParams.get('template'); // Set template index to delete link.

  const link = new URL(params.links.action);
  link.searchParams.set('action', 'sharing_image_delete');
  link.searchParams.set('template', index);
  link.searchParams.set('nonce', params.nonce);
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
    classes: ['sharing-image-editor-delete'],
    text: wp.i18n.__('Delete template', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: footer
  });
  button.addEventListener('click', e => {
    const message = wp.i18n.__('Are you sure you want to delete this template?', 'sharing-image');

    if (!confirm(message)) {
      // eslint-disable-line
      e.preventDefault();
    }
  });
}
/**
 * Create preview element.
 *
 * @param {HTMLElement} viewport Monitor viewport element.
 * @param {Object}      data     Template data object.
 */


function createPreview(viewport, data) {
  preview = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-preview', 'preview-blank'],
    append: viewport
  });

  if (data.preview) {
    _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('img', {
      attributes: {
        src: data.preview,
        alt: ''
      },
      append: preview
    });
    preview.classList.remove('preview-blank');
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    classes: ['sharing-image-editor-loader'],
    append: preview
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: params.name + '[preview]',
      value: data.preview
    },
    append: preview
  });
  return preview;
}
/**
 * Create button to collapse layer.
 *
 * @param {HTMLElement} layer
 */


function createCollapseButton(layer) {
  const label = layer.querySelector('h2');
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-editor-collapse'],
    attributes: {
      type: 'button',
      title: wp.i18n.__('Collapse layer', 'sharing-image')
    },
    prepend: label
  });
  button.addEventListener('click', e => {
    e.preventDefault(); // Set default button title.

    button.setAttribute('title', wp.i18n.__('Collapse layer', 'sharing-image'));
    layer.classList.toggle('layer-collapsed'); // Check if new class is collapsed.

    const collapsed = layer.classList.contains('layer-collapsed');

    if (collapsed) {
      button.setAttribute('title', wp.i18n.__('Expand layer', 'sharing-image'));
    }
  });
}
/**
 * Create button inside layer box to change order.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */


function createOrderLayersButton(designer, layer) {
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-editor-order'],
    attributes: {
      type: 'button',
      title: wp.i18n.__('Raise higher', 'sharing-image')
    },
    append: layer
  });
  button.addEventListener('click', () => {
    if (layer.previousSibling) {
      designer.insertBefore(layer, layer.previousSibling);
    }

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
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */


function createDeleteLayerButton(designer, layer) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-footer'],
    append: layer
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-editor-delete'],
    text: wp.i18n.__('Delete layer', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', () => {
    designer.removeChild(layer);

    if (editor.classList.contains('editor-suspend')) {
      return;
    }

    generateTemplate();
  });
}
/**
 * Create image layer.
 *
 * @param {Object} data   Current template layer data.
 * @param {string} uniqid Unique layer name id.
 */


function createLayerImage(data, uniqid) {
  const description = [];
  description.push(wp.i18n.__('Use jpg, gif or png image formats.', 'sharing-image'));
  description.push(wp.i18n.__('Leave width and height fields blank to use the original image size.', 'sharing-image'));
  description.push(wp.i18n.__('Sizes are calculated proportionally if not filled.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-image'],
    label: wp.i18n.__('Image', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = params.name + `[layers][${uniqid}]`; // Create static/dynamic image fields.

  createImageDynamicFields(layer, name, data);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'image'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].media({
    name: name + '[attachment]',
    classes: ['sharing-image-editor-control', 'control-media'],
    value: data.attachment,
    link: params.links.uploads,
    labels: {
      button: wp.i18n.__('Upload image', 'sharing-image'),
      heading: wp.i18n.__('Select layer image', 'sharing-image'),
      details: wp.i18n.__('Attachment details', 'sharing-image')
    },
    append: layer
  }); // Create static/dynamic image fields.

  createImageSizesFields(layer, name, data);
  return layer;
}
/**
 * Create text layer.
 *
 * @param {Object} data   Current template data.
 * @param {string} uniqid Unique layer name id.
 */


function createLayerText(data, uniqid) {
  const description = [];
  description.push(wp.i18n.__('Write a text to the current image.', 'sharing-image'));
  description.push(wp.i18n.__('If the font does not fit within your limits, its size will decrease.', 'sharing-image'));
  description.push(wp.i18n.__('Avoid using large font sizes for long text – this affects performance.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Text', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = params.name + `[layers][${uniqid}]`;
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'text'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[y]',
        value: data.y,
        placeholder: '10'
      },
      label: wp.i18n.__('Y', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[width]',
        value: data.width,
        placeholder: '1000'
      },
      label: wp.i18n.__('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[height]',
        value: data.height
      },
      label: wp.i18n.__('Height', 'sharing-image')
    }],
    append: layer
  }); // Create static/dynamic text fields.

  createTextDynamicFields(layer, name, data); // Create more options.

  createTextMoreFields(layer, name, data);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('Font size', 'sharing-image')
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
      label: wp.i18n.__('Line height', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create filter layer.
 *
 * @param {Object} data   Current template data.
 * @param {string} uniqid Unique layer name id.
 */


function createLayerFilter(data, uniqid) {
  const description = [];
  description.push(wp.i18n.__('Filters are applied one after another to the entire editor image.', 'sharing-image'));
  description.push(wp.i18n.__('If you want to control their order, create multiple layers.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Filter', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = params.name + `[layers][${uniqid}]`;
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'filter'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-editor-control-checkbox'],
      attributes: {
        name: name + '[grayscale]',
        value: 'grayscale'
      },
      label: wp.i18n.__('Turns image into a grayscale version', 'sharing-image'),
      checked: data.grayscale
    }],
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-editor-control-checkbox'],
      attributes: {
        name: name + '[blur]',
        value: 'blur'
      },
      label: wp.i18n.__('Blur image by Gaussian effect', 'sharing-image'),
      checked: data.blur
    }],
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('Contrast', 'sharing-image')
    }],
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('Brightness', 'sharing-image')
    }],
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('Blackout', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create rectangle layer.
 *
 * @param {Object} data   Current template data.
 * @param {string} uniqid Unique layer name id.
 */


function createLayerRectangle(data, uniqid) {
  const description = [];
  description.push(wp.i18n.__('Draw a colored rectangle on current image.', 'sharing-image'));
  description.push(wp.i18n.__('You can get filled or outlined figure with custom color and opacity.', 'sharing-image'));
  description.push(wp.i18n.__('Use small height to draw the line.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Rectangle', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = params.name + `[layers][${uniqid}]`;
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'rectangle'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        type: 'color',
        name: name + '[color]',
        value: data.color || '#ffffff'
      },
      label: wp.i18n.__('Rectangle color', 'sharing-image')
    }],
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[x]' || 0,
        value: data.x
      },
      label: wp.i18n.__('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[y]' || 0,
        value: data.y
      },
      label: wp.i18n.__('Y', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[width]',
        value: data.width
      },
      label: wp.i18n.__('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        type: 'text',
        name: name + '[height]',
        value: data.height
      },
      label: wp.i18n.__('Height', 'sharing-image')
    }],
    append: layer
  });
  createRectangleOutline(layer, name, data);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
      label: wp.i18n.__('Opacity', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create new layer.
 *
 * @param {HTMLElement} designer Designer HTML element.
 * @param {string}      type     New layer type.
 * @param {Object}      data     New layer data.
 */


function createLayer(designer, type, data = {}) {
  let layer = null; // Get layer id from data.

  const uniqid = data.uniqid || _helpers__WEBPACK_IMPORTED_MODULE_1__["default"].uniqid();

  switch (type) {
    case 'text':
      layer = createLayerText(data, uniqid);
      break;

    case 'image':
      layer = createLayerImage(data, uniqid);
      break;

    case 'filter':
      layer = createLayerFilter(data, uniqid);
      break;

    case 'rectangle':
      layer = createLayerRectangle(data, uniqid);
      break;

    default:
      return null;
  }

  designer.appendChild(layer); // Button to delete layer.

  createDeleteLayerButton(designer, layer); // Button to collapse layer.

  createCollapseButton(layer); // Button to order layers

  createOrderLayersButton(designer, layer);
  return layer;
}
/**
 * Create layers designer control.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object}      data     Current template data.
 */


function createDesigner(fieldset, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-select', 'control-compact'],
    fields: [{
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        text: wp.i18n.__('Text', 'sharing-image'),
        image: wp.i18n.__('Image', 'sharing-image'),
        filter: wp.i18n.__('Filter', 'sharing-image'),
        rectangle: wp.i18n.__('Rectangle', 'sharing-image')
      }
    }],
    append: fieldset
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['button'],
    text: wp.i18n.__('Add new', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', () => {
    const select = control.querySelector('select');

    if (null === select) {
      return;
    }

    createLayer(designer, select.value);
  });
  const designer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-designer'],
    append: fieldset
  });
  data.layers = data.layers || {};

  for (const uniqid in data.layers) {
    const item = data.layers[uniqid];
    item.uniqid = uniqid;

    if (item.hasOwnProperty('type')) {
      const created = createLayer(designer, item.type, item);

      if (!created) {
        return;
      }

      created.classList.add('layer-collapsed');
    }
  }
}
/**
 * Create common settings on template editor screen.
 *
 * @param {Object} data Current template data.
 */


function createFieldset(data) {
  const fieldset = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-fieldset'],
    append: editor
  }); // Create template title control.

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-compact', 'control-extend'],
    help: wp.i18n.__('Used only in the admin panel', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: params.name + '[title]',
        value: data.title
      },
      dataset: {
        persistent: true
      },
      label: wp.i18n.__('Template title', 'sharing-image')
    }],
    append: fieldset
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control'],
    label: wp.i18n.__('Fill color', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        name: params.name + '[fill]',
        type: 'color',
        value: data.fill
      }
    }],
    append: fieldset
  }); // Create width/height settings control.

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-compact', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: params.name + '[width]',
        value: data.width || '1200',
        placeholder: '1200'
      },
      label: wp.i18n.__('Editor width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: params.name + '[height]',
        value: data.height || '630',
        placeholder: '630'
      },
      label: wp.i18n.__('Editor height', 'sharing-image')
    }],
    append: fieldset
  });
  const description = [];
  description.push(wp.i18n.__('You can add multiple layers on your editor.', 'sharing-image'));
  description.push(wp.i18n.__('Note that the stacking order of the layers is important.', 'sharing-image'));
  description.push(wp.i18n.__('You can change the order using the arrows in the corner of each box.', 'sharing-image'));
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-reduced'],
    label: wp.i18n.__('Add layers', 'sharing-image'),
    description: description.join(' '),
    append: fieldset
  }); // Create layers designer block.

  createDesigner(fieldset, data);
  const footer = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-editor-control', 'control-footer'],
    append: fieldset
  }); // Create back to catalog button.

  createCatalogButton(footer); // Create template deletion button.

  createDeleteButton(footer);
  fieldset.addEventListener('change', e => {
    if (editor.classList.contains('editor-suspend')) {
      return;
    }

    const target = e.target; // Skip fields that don't affect the poster.

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
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    text: wp.i18n.__('Save changes', 'sharing-image'),
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
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    text: wp.i18n.__('Generate preview', 'sharing-image'),
    classes: ['button'],
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', () => {
    generateTemplate();
  });
}
/**
 * Create debug text checkbox.
 *
 * @param {HTMLElement} manager Manager element.
 * @param {Object}      data    Template data.
 */


function createDebugCheckbox(manager, data) {
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].checkbox({
    classes: ['sharing-image-editor-debug'],
    attributes: {
      name: params.name + '[debug]',
      value: 'debug'
    },
    label: wp.i18n.__('Show debug frames', 'sharing-image'),
    checked: data.debug
  }, manager);
  checkbox.addEventListener('change', () => {
    generateTemplate();
  });
}
/**
 * Create template settings preview.
 *
 * @param {Object} data Current template data.
 */


function createMonitor(data) {
  const monitor = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-monitor'],
    append: editor
  });
  const viewport = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-viewport'],
    append: monitor
  });
  createPreview(viewport, data);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-warning'],
    append: viewport
  });
  const manager = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-editor-manager'],
    append: viewport
  }); // Create debug only checkbox.

  createDebugCheckbox(manager, data); // Create submit form button.

  createSubmitButton(manager); // Create template generator button.

  createGenerateButton(manager);
}
/**
 * Create form hidden settings fields.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {string}      index   Current option index.
 */


function prepareEditor(content, index) {
  params.name = 'sharing_image_editor';
  const form = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('form', {
    classes: ['sharing-image-editor'],
    attributes: {
      action: params.links.action,
      method: 'POST'
    },
    append: content
  });

  if (params.config.suspend) {
    form.classList.add('editor-suspend');
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: params.name
    },
    append: form
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_index',
      value: index
    },
    append: form
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: form
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    saveTemplate();
  });
  return form;
}
/**
 * Create template editor page.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 * @param {number}      index    Current option index.
 * @param {Object}      data     Template data.
 */


function createEditor(content, settings, index, data = {}) {
  params = settings; // Prepare form with hidden fields and events.

  editor = prepareEditor(content, index); // Create monitor section part.

  createMonitor(data); // Create fieldset section part.

  createFieldset(data);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEditor);

/***/ }),

/***/ "./src/settings/pages/premium/index.js":
/*!*********************************************!*\
  !*** ./src/settings/pages/premium/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/pages/premium/styles.scss");
/**
 * Premium settings tab.
 */

/* global ajaxurl:true */

 // Store global scriot object for settings page.

let params = null; // Premium HTML emelent.

let premium = null;
/**
 * Parse error code from settings or AJAX response.
 *
 * @param {string} code  Error code from settings or AJAX response.
 * @param {string} title Prepended error title. Optional.
 */

function parseErrorCode(code, title) {
  const message = [];

  if (undefined === title) {
    title = wp.i18n.__('Verification failed.', 'sharing-image');
  }

  message.push(title);

  switch (code) {
    case 'LIMIT_EXCEEDED':
      message.push(wp.i18n.__('The number of licenses for this key has been exceeded.', 'sharing-image'));
      break;

    case 'KEY_NOT_FOUND':
      message.push(wp.i18n.__('Premium key is invalid or expired.', 'sharing-image'));
      break;

    case 'SERVER_ERROR':
      message.push(wp.i18n.__('Unable to get a response from the verification server.', 'sharing-image'));
      break;
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
  const warning = premium.querySelector('.sharing-image-premium-warning');

  if (null === warning) {
    return;
  }

  warning.classList.add('warning-visible');
  warning.textContent = message || wp.i18n.__('Unknown request error', 'sharing-image');
}
/**
 * Remove warning message block.
 */


function hidePremiumError() {
  // Try to find warning element.
  const warning = premium.querySelector('.sharing-image-premium-warning');

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
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json'; // Create data bundle using form data.

  const bundle = new window.FormData(access);
  bundle.set('action', 'sharing_image_revoke');
  hidePremiumError();
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide form loader class.

    access.classList.remove('access-loader');

    if (!response.data) {
      return showPremiumError();
    }

    if (!response.success) {
      return showPremiumError(response.data);
    }

    params.license = response.data; // Refresh premium fields.

    preparePremiumFields();
  });
  request.addEventListener('error', () => {
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
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json'; // Create data bundle using form data.

  const bundle = new window.FormData(access);
  bundle.set('action', 'sharing_image_verify');
  hidePremiumError();
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide form loader class.

    access.classList.remove('access-loader');

    if (!response.data) {
      return showPremiumError();
    }

    if (!response.success) {
      return showPremiumError(parseErrorCode(response.code, response.data));
    }

    params.license = response.data; // Refresh premium fields.

    preparePremiumFields();
  });
  request.addEventListener('error', () => {
    showPremiumError(); // Hide form loader class.

    access.classList.remove('access-loader');
  });
  request.send(bundle);
}
/**
 * Show verify form if stil not premium.
 *
 * @param {HTMLElement} access  Access HTML element.
 * @param {Object}      license License data.
 */


function showVerifyForm(access, license) {
  if (license.error) {
    showPremiumError(parseErrorCode(license.error));
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('strong', {
    text: wp.i18n.__('Do you already have a key? Enter it here', 'sharing-image'),
    append: access
  });
  const verify = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-premium-verify'],
    append: access
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    label: wp.i18n.__('Your Premium key', 'sharing-image'),
    attributes: {
      type: 'text',
      name: 'sharing_image_key',
      value: license.key
    },
    append: verify
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['button'],
    text: wp.i18n.__('Submit', 'sharing-image'),
    attributes: {
      type: 'submit'
    },
    append: verify
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    classes: ['spinner'],
    append: verify
  });
  access.addEventListener('submit', e => {
    e.preventDefault();
    verifyPremium(access);
  });
}
/**
 * Show alert for develop license mode.
 */


function showDevelopAlert() {
  showPremiumError(wp.i18n.__('Using plugin with a development license is prohibited in production.', 'sharing-image'));
}
/**
 * Show revoke Premium button.
 *
 * @param {HTMLElement} access Access HTML element.
 */


function showRevokeButton(access) {
  const revoke = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-premium-revoke'],
    append: access
  });
  const description = [];
  description.push(wp.i18n.__('Disabling premium mode will not remove the license for this domain.', 'sharing-image'));
  description.push(wp.i18n.__('Your current key will also be saved in the plugin settings.', 'sharing-image'));
  description.push(wp.i18n.__('Use key management tool to delete the license for the site.', 'sharing-image'));
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('p', {
    text: description.join(' '),
    append: revoke
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['button'],
    text: wp.i18n.__('Disable Premium', 'sharing-image'),
    attributes: {
      type: 'submit'
    },
    append: revoke
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('span', {
    classes: ['spinner'],
    append: revoke
  });
  access.addEventListener('submit', e => {
    e.preventDefault();
    revokePremium(access);
  });
}
/**
 * Show permit information.
 *
 * @param {HTMLElement} access Access HTML element.
 * @param {string}      key    License key from settings.
 */


function showLicenseInfo(access, key) {
  const permit = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-premium-permit'],
    append: access
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['sharing-image-premium-show', 'button'],
    text: wp.i18n.__('Show License key', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: permit
  });
  button.addEventListener('click', () => {
    permit.classList.toggle('permit-visible');
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('strong', {
    text: key,
    append: permit
  });
  return permit;
}
/**
 * Show fields if user has the license.
 *
 * @param {HTMLElement} access  Access HTML element.
 * @param {Object}      license License data.
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
  let access = premium.querySelector('.sharing-image-premium-access');

  if (null !== access) {
    premium.removeChild(access);
  }

  access = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('form', {
    classes: ['sharing-image-premium-access'],
    attributes: {
      action: '',
      method: 'POST'
    },
    append: premium
  });
  premium.classList.remove('premium-enabled');
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: access
  });
  const license = params.license || {}; // Show fields if user has the license.

  if (license.premium || license.develop) {
    return showPremiumData(access, license);
  }

  return showVerifyForm(access, license);
}
/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */


function createPremium(content, settings) {
  params = settings; // Find premium element

  premium = content.querySelector('.sharing-image-premium');

  if (null === premium) {
    return;
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-premium-warning'],
    append: premium
  });
  preparePremiumFields();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPremium);

/***/ }),

/***/ "./src/settings/pages/tools/index.js":
/*!*******************************************!*\
  !*** ./src/settings/pages/tools/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/pages/tools/styles.scss");
/**
 * Tools settings tab.
 */

 // Store global script object for settings page.

let params = null;
/**
 * Create export options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */

function createExportOptions(tools) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-tools-control'],
    label: wp.i18n.__('Export templates', 'sharing-image'),
    append: tools
  });
  const fieldset = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-tools-control-fieldset'],
    append: control
  }); // Set template index to delete link.

  const link = new URL(params.links.action);
  link.searchParams.set('action', 'sharing_image_export');
  link.searchParams.set('nonce', params.nonce);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
    classes: ['button', 'button-primary'],
    text: wp.i18n.__('Download backup file', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: fieldset
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('small', {
    text: wp.i18n.__('Save a local copy of all template settings for later use.', 'sharing-image'),
    append: fieldset
  });
}
/**
 * Create import options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */


function createImportOptions(tools) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-tools-control'],
    label: wp.i18n.__('Import templates', 'sharing-image'),
    append: tools
  });
  const uploader = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('form', {
    classes: ['sharing-image-tools-control-uploader'],
    attributes: {
      action: params.links.action,
      method: 'POST',
      enctype: 'multipart/form-data'
    },
    append: control
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    classes: ['sharing-image-tools-control-file'],
    attributes: {
      type: 'file',
      name: 'sharing_image_import',
      accept: 'application/json',
      required: 'required'
    },
    append: uploader
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['button', 'button-primary'],
    attributes: {
      type: 'submit'
    },
    text: wp.i18n.__('Import templates', 'sharing-image'),
    append: uploader
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: 'sharing_image_import'
    },
    append: uploader
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: uploader
  });
}
/**
 * Create import options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */


function createCloningOptions(tools) {
  const templates = params.templates || [];
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-tools-control', 'control-section'],
    label: wp.i18n.__('Clone template', 'sharing-image'),
    append: tools
  });
  const warning = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('p', {
    classes: ['sharing-image-tools-warning'],
    text: wp.i18n.__('You need to enable Premium and create at least one template.', 'sharing-image')
  });
  const license = params.license || {};

  if (templates.length === 0 || !license.premium && !license.develop) {
    return control.appendChild(warning);
  }

  const fields = {};

  for (const i in templates) {
    fields[i] = templates[i].title || wp.i18n.__('Untitled', 'sharing-image');
  }

  const cloning = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('form', {
    classes: ['sharing-image-tools-control-cloning'],
    attributes: {
      action: params.links.action,
      method: 'POST'
    },
    append: control
  });
  const select = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].select({
    classes: ['sharing-image-tools-control-duplicator'],
    options: fields,
    attributes: {
      name: 'sharing_image_clone'
    }
  }, cloning);
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('button', {
    classes: ['button', 'button-primary'],
    attributes: {
      type: 'submit'
    },
    text: wp.i18n.__('Create a copy', 'sharing-image'),
    append: select.parentNode
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: 'sharing_image_clone'
    },
    append: cloning
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: params.nonce
    },
    append: cloning
  });
}
/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */


function createTools(content, settings) {
  params = settings; // Find tools element

  const tools = content.querySelector('.sharing-image-tools');

  if (null === tools) {
    return;
  } // Cloning options.


  createCloningOptions(tools); // Export options.

  createExportOptions(tools); // Import options.

  createImportOptions(tools);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTools);

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
/*!*******************************!*\
  !*** ./src/settings/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _pages_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/tools */ "./src/settings/pages/tools/index.js");
/* harmony import */ var _pages_catalog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/catalog */ "./src/settings/pages/catalog/index.js");
/* harmony import */ var _pages_premium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/premium */ "./src/settings/pages/premium/index.js");
/* harmony import */ var _pages_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/editor */ "./src/settings/pages/editor/index.js");
/* harmony import */ var _pages_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/config */ "./src/settings/pages/config/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/styles.scss");







/**
 * Init premium settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */

function initPremiumTab(content, settings) {
  (0,_pages_premium__WEBPACK_IMPORTED_MODULE_3__["default"])(content, settings);
}
/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initConfigTab(content, settings) {
  (0,_pages_config__WEBPACK_IMPORTED_MODULE_5__["default"])(content, settings);
}
/**
 * Init tools settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initToolsTab(content, settings) {
  (0,_pages_tools__WEBPACK_IMPORTED_MODULE_1__["default"])(content, settings);
}
/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initTemplatesTab(content, settings) {
  // Get index from URL search parameter.
  let index = null; // Set default templates empty list.

  settings.templates = settings.templates || [];

  if (_helpers__WEBPACK_IMPORTED_MODULE_0__["default"].param('template')) {
    index = _helpers__WEBPACK_IMPORTED_MODULE_0__["default"].param('template');
  }

  const data = settings.templates[index]; // Create editor for existing template.

  if (undefined !== data) {
    return (0,_pages_editor__WEBPACK_IMPORTED_MODULE_4__["default"])(content, settings, index, data);
  } // Create editor for new template.


  if (null === index) {
    return (0,_pages_catalog__WEBPACK_IMPORTED_MODULE_2__["default"])(content, settings);
  }

  (0,_pages_editor__WEBPACK_IMPORTED_MODULE_4__["default"])(content, settings, index);
}
/**
 * Init settings page handler.
 */


(function () {
  if (typeof 'undefined' === wp) {
    return;
  }

  let object = window.sharingImageSettings || {}; // Add default required values to object.

  object = _helpers__WEBPACK_IMPORTED_MODULE_0__["default"].defaults(object, ['links', 'fonts', 'config', 'templates', 'license']); // Find settings content element.

  const content = document.querySelector('#sharing-image-settings .sharing-image-content');

  if (null === content) {
    return;
  }

  content.classList.add('content-visible');

  switch (_helpers__WEBPACK_IMPORTED_MODULE_0__["default"].param('tab')) {
    case 'config':
      initConfigTab(content, object);
      break;

    case 'tools':
      initToolsTab(content, object);
      break;

    case 'premium':
      initPremiumTab(content, object);
      break;

    default:
      initTemplatesTab(content, object);
  }
})();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map