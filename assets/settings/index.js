/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/settings/catalog/styles.scss":
/*!******************************************!*\
  !*** ./src/settings/catalog/styles.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/config/styles.scss":
/*!*****************************************!*\
  !*** ./src/settings/config/styles.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/editor/styles.scss":
/*!*****************************************!*\
  !*** ./src/settings/editor/styles.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/settings/premium/styles.scss":
/*!******************************************!*\
  !*** ./src/settings/premium/styles.scss ***!
  \******************************************/
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

/***/ "./src/settings/tools/styles.scss":
/*!****************************************!*\
  !*** ./src/settings/tools/styles.scss ***!
  \****************************************/
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

/***/ "./src/settings/catalog/index.js":
/*!***************************************!*\
  !*** ./src/settings/catalog/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/catalog/styles.scss");

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

/***/ "./src/settings/config/index.js":
/*!**************************************!*\
  !*** ./src/settings/config/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/config/styles.scss");
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
  description.push(wp.i18n.__('The default poster is used on pages where none is generated.', 'sharing-image'));
  description.push(wp.i18n.__('Best image size: 1200×630 pixels.', 'sharing-image'));
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('small', {
    text: description.join(' '),
    append: control
  });
  return control;
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
    label: wp.i18n.__('Select custom storage for posters', 'sharing-image'),
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
    text: wp.i18n.__('Use a relative path from the site root. The directory should be writable.', 'sharing-image'),
    append: control
  });
  control.querySelectorAll('input').forEach(radio => {
    if ('radio' !== radio.type) {
      return;
    } // Show storage input for checked custom radio.


    if (radio.checked && radio.value === 'custom') {
      input.disabled = false;
    }

    radio.addEventListener('change', () => {
      input.disabled = true;

      if (radio.value === 'custom') {
        input.disabled = false;
      }
    });
  });
  return control;
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

  if (format.value === 'jpg') {
    quality.disabled = false;
  }

  format.addEventListener('change', () => {
    quality.disabled = true;

    if (format.value === 'jpg') {
      quality.disabled = false;
    }
  });
  return control;
}
/**
 * Create autogenerate poster options.
 *
 * @param {HTMLElement} options   Options form element.
 * @param {Object}      data      Config data object.
 * @param {Array}       templates List of templates.
 */


function createAutogenerateOptions(options, data, templates) {
  const fields = {}; // Add empty option to disable feature.

  fields[''] = wp.i18n.__('Disable auto generation', 'sharing-image');

  for (const i in templates) {
    fields[i] = templates[i].title || wp.i18n.__('Untitled', 'sharing-image');
  }

  let selected = data.autogenerate;

  if (typeof selected === 'undefined') {
    selected = '';
  }

  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Auto generate poster', 'sharing-image'),
    help: wp.i18n.__('This template will be applied automatically when the post is saved.', 'sharing-image'),
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
  return control;
}
/**
 * Create hiding widget options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createHideWidgetOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Hide post widget', 'sharing-image'),
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-config-control-checkbox'],
      attributes: {
        name: params.name + '[nowidget]',
        value: 'nowidget'
      },
      label: wp.i18n.__('Hide the widget on the post editor page', 'sharing-image'),
      checked: data.nowidget
    }],
    append: options
  });
  return control;
}
/**
 * Create header meta options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createMetaOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control', 'control-extra'],
    label: wp.i18n.__('Header Meta Tags', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-config-control-select'],
      options: {
        snippets: wp.i18n.__('Display Meta Tags with consideration for SEO plugins', 'sharing-image'),
        custom: wp.i18n.__('Always display Meta Tags on all pages', 'sharing-image'),
        hidden: wp.i18n.__('Disable Sharing Image Meta Tags', 'sharing-image')
      },
      attributes: {
        name: params.name + '[meta]'
      },
      selected: data.meta || 'snippets'
    }],
    append: options
  });

  if (params.snippets.length === 0) {
    return control;
  }

  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('h4', {
    text: wp.i18n.__('Detected SEO plugins', 'sharing-image'),
    append: control
  });
  const list = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('ul', {
    classes: ['sharing-image-config-control-list'],
    append: control
  });
  params.snippets.forEach(snippet => {
    const item = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('li', {
      append: list
    });
    _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
      attributes: {
        href: snippet.link,
        target: '_blank',
        rel: 'noopener'
      },
      text: snippet.title,
      append: item
    });
  });
  return control;
}
/**
 * Live Reload options
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createLiveReloadOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Live-reload', 'sharing-image'),
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-config-control-checkbox'],
      attributes: {
        name: params.name + '[suspend]',
        value: 'suspend'
      },
      label: wp.i18n.__('Disable live reload on the template editor screen.', 'sharing-image'),
      checked: data.suspend
    }],
    append: options
  });
  return control;
}
/**
 * Attachment options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */


function createAttachmentOptions(options, data) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
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
  return control;
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

  createAutogenerateOptions(options, data, templates); // Hide widget and sidebar.

  createHideWidgetOptions(options, data); // Header meta options.

  createMetaOptions(options, data); // Attachment options.

  createAttachmentOptions(options, data); // Uploads directory options.

  createUploadsOptions(options, data); // Live-reload options.

  createLiveReloadOptions(options, data); // Default poster.

  createDefaultOptions(options, data); // Create required form fields.

  createMetaFields(options);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createConfig);

/***/ }),

/***/ "./src/settings/editor/index.js":
/*!**************************************!*\
  !*** ./src/settings/editor/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../builders */ "./src/builders/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers */ "./src/helpers/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/editor/styles.scss");
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
      image = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('img', {
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
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[dynamic]',
      value: 'dynamic'
    },
    label: wp.i18n.__('Dynamic field. Filled in on the post editing screen.', 'sharing-image'),
    checked: data.dynamic
  }, control);
  const fields = [];
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: wp.i18n.__('Only visible on the admin side.', 'sharing-image'),
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
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: wp.i18n.__('This field is for example purposes only, to preview the editor’s appearance.', 'sharing-image'),
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
  const presets = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
        value: 'categories'
      },
      dataset: {
        persistent: true
      },
      label: wp.i18n.__('Use post categories', 'sharing-image'),
      checked: data.preset || 'none'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[preset]',
        value: 'tags'
      },
      dataset: {
        persistent: true
      },
      label: wp.i18n.__('Use post tags', 'sharing-image'),
      checked: data.preset || 'none'
    }],
    append: layer
  });
  fields[fields.length] = presets;
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend'],
    help: wp.i18n.__('You can use non-breaking spaces to adjust your string position.', 'sharing-image'),
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
  const dynamic = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-gapped'],
    append: layer
  });
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[dynamic]',
      value: 'dynamic'
    },
    label: wp.i18n.__('Dynamic image. Can be updated on the post editing screen.', 'sharing-image'),
    checked: data.dynamic
  }, dynamic);
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].media({
    name: name + '[attachment]',
    classes: ['sharing-image-editor-control-media'],
    value: data.attachment,
    link: params.links.uploads,
    labels: {
      button: wp.i18n.__('Select an image', 'sharing-image'),
      heading: wp.i18n.__('Select layer image', 'sharing-image'),
      details: wp.i18n.__('Attachment details', 'sharing-image'),
      remove: wp.i18n.__('Remove image', 'sharing-image')
    },
    append: dynamic,
    image: true,
    remove: true,
    help: wp.i18n.__('This image is for example purposes only, to preview the editor’s appearance.', 'sharing-image'),
    mime: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
  });
  const fields = [];
  const presets = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
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
      label: wp.i18n.__('Manual selection', 'sharing-image'),
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
      label: wp.i18n.__('Use Post Featured Image', 'sharing-image'),
      checked: data.preset || 'featured'
    }],
    append: layer
  });
  fields[fields.length] = presets; // Helper function to toggle controls visibility and labels.

  const updateDynamic = () => {
    fields.forEach(field => {
      field.classList.toggle('control-hidden');
    });
    dynamic.classList.add('control-unhelp');

    if (checkbox.checked) {
      dynamic.classList.remove('control-unhelp');
    }
  };

  if (!checkbox.checked) {
    updateDynamic();
  }

  checkbox.addEventListener('change', () => {
    updateDynamic();
  });
}
/**
 * Creating a button to populate layer dimension fields.
 *
 * @param {HTMLElement} layer    Current layer element.
 * @param {HTMLElement} sizes    Sizes component.
 * @param {Function}    callback Callaback after button click.
 */


function createBackgroundButton(layer, sizes, callback) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-pulled'],
    append: layer
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
    classes: ['sharing-image-editor-more'],
    text: wp.i18n.__('Utilize image as the poster background.', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', () => {
    const fields = {};
    sizes.querySelectorAll('input').forEach(input => {
      fields[input.dataset.dimension] = input;
    });
    fields.x.value = 0;
    fields.y.value = 0; // Set layer image size same as poster.

    fields.width.value = _helpers__WEBPACK_IMPORTED_MODULE_2__["default"].dataget(editor, 'editor', 'width');
    fields.height.value = _helpers__WEBPACK_IMPORTED_MODULE_2__["default"].dataget(editor, 'editor', 'height');
    return callback();
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
  const sizes = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[x]',
        value: data.x,
        placeholder: '0'
      },
      dataset: {
        dimension: 'x'
      },
      label: wp.i18n.__('X', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[y]',
        value: data.y,
        placeholder: '0'
      },
      dataset: {
        dimension: 'y'
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
  }); // Helper function to set full-size poster dimensions.

  createBackgroundButton(layer, sizes, () => {
    // Show dimensions options.
    toggleDimensions(); // Regenerate right after size changed.

    generateTemplate();
  }); // Add boundary options.

  createBoundaryOptions(layer, name, data);
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
    label: wp.i18n.__('Image resizing principle', 'sharing-image'),
    fields: [{
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'center'
      },
      label: wp.i18n.__('Center image while preserving the aspect ratio', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'top'
      },
      label: wp.i18n.__('Top-aligned image while preserving the aspect ratio.', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'bottom'
      },
      label: wp.i18n.__('Bottom-aligned image while preserving aspect ratio', 'sharing-image'),
      checked: data.resize || 'center'
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: name + '[resize]',
        value: 'ignore'
      },
      label: wp.i18n.__('Resize while ignoring the aspect ratio', 'sharing-image'),
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
  const dimensions = [];
  sizes.querySelectorAll('input').forEach(input => {
    if (['width', 'height'].includes(input.dataset.dimension)) {
      dimensions.push(input);
    }
  }); // Helper function to trigger events on dimension changes.

  const toggleDimensions = () => {
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

  toggleDimensions();
  dimensions.forEach(dimension => {
    dimension.addEventListener('input', toggleDimensions);
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
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  fields[fields.length] = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
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
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-upload', 'control-hidden'],
    append: layer
  });
  const select = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].select({
    classes: ['sharing-image-editor-control-select'],
    options: params.fonts,
    attributes: {
      name: name + '[fontname]'
    },
    label: wp.i18n.__('Font family', 'sharing-image'),
    selected: data.fontname
  }, control);
  const media = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].media({
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
    mime: ['font/ttf', 'font/otf'],
    append: control
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('small', {
    text: wp.i18n.__('Custom fonts can only be in .ttf or .otf format.', 'sharing-image'),
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
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[outline]',
      value: 'outline'
    },
    label: wp.i18n.__('Outline rectangle.', 'sharing-image'),
    checked: data.outline
  }, control);
  const range = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
 * Boundary options for multuple layers.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createBoundaryOptions(layer, name, data) {
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-pulled', 'control-upnext'],
    label: wp.i18n.__('Relative boundaries', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-editor-control-select'],
      options: {
        absolute: wp.i18n.__('No Relative Positioning', 'sharing-image'),
        vertically: wp.i18n.__('Vertical Only', 'sharing-image'),
        horizontally: wp.i18n.__('Horizontal Only', 'sharing-image'),
        both: wp.i18n.__('Both Directions Alignment', 'sharing-image')
      },
      attributes: {
        name: name + '[boundary]'
      },
      selected: data.boundary
    }],
    help: wp.i18n.__('Using offset from previous layer.', 'sharing-image'),
    append: layer
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('a', {
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
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('a', {
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
  preview = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
    classes: ['sharing-image-editor-preview', 'preview-blank'],
    append: viewport
  });

  if (data.preview) {
    _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('img', {
      attributes: {
        src: data.preview,
        alt: ''
      },
      append: preview
    });
    preview.classList.remove('preview-blank');
  }

  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('span', {
    classes: ['sharing-image-editor-loader'],
    append: preview
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
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
 * @param {Object}      data  Current template data.
 * @param {string}      name  Layer name id.
 */


function createCollapseButton(layer, data, name) {
  const label = layer.querySelector('h2');
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
    classes: ['sharing-image-editor-collapse'],
    attributes: {
      type: 'button',
      title: wp.i18n.__('Collapse layer', 'sharing-image')
    },
    prepend: label
  });
  let collapsed = data.collapsed === 1;

  if (collapsed) {
    layer.classList.add('layer-collapsed');
  }

  const input = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[collapsed]',
      value: Number(collapsed)
    },
    append: layer
  });
  button.addEventListener('click', e => {
    e.preventDefault();
    collapsed = !collapsed; // Collapse/expand layer.

    layer.classList.toggle('layer-collapsed', collapsed); // Change button title.

    button.setAttribute('title', wp.i18n.__('Collapse layer', 'sharing-image'));

    if (collapsed) {
      button.setAttribute('title', wp.i18n.__('Expand layer', 'sharing-image'));
    }

    input.value = Number(collapsed);
  });
}
/**
 * Create button inside layer box to change order.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */


function createOrderLayersButton(designer, layer) {
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
    classes: ['sharing-image-editor-order'],
    attributes: {
      type: 'button',
      title: wp.i18n.__('Change layer position', 'sharing-image')
    },
    append: layer
  });
  sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"].create(designer, {
    handle: '.sharing-image-editor-order',
    onUpdate: () => {
      if (editor.classList.contains('editor-suspend')) {
        return;
      }

      generateTemplate();
    }
  });
}
/**
 * Create button to delete layer.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */


function createDeleteLayerButton(designer, layer) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-footer'],
    append: layer
  });
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
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
 * @param {Object} data Current template layer data.
 * @param {string} name Layer name id.
 */


function createLayerImage(data, name) {
  const description = [];
  description.push(wp.i18n.__('Use JPG, GIF, or PNG image formats.', 'sharing-image'));
  description.push(wp.i18n.__('Leave the width and height fields blank to use the original image size.', 'sharing-image'));
  description.push(wp.i18n.__('Sizes are calculated proportionally if not specified.', 'sharing-image'));
  description.push(wp.i18n.__('You can use negative values for position and dimensions.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-image'],
    label: wp.i18n.__('Image', 'sharing-image'),
    description: description.join(' ')
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'image'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-extend'],
    help: wp.i18n.__('Only visible on the admin side.', 'sharing-image'),
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
  }); // Create static/dynamic image fields.

  createImageDynamicFields(layer, name, data); // Create static/dynamic image fields.

  createImageSizesFields(layer, name, data);
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[legacy]',
      value: data.legacy || ''
    },
    append: layer
  });
  return layer;
}
/**
 * Create text layer.
 *
 * @param {Object} data Current template data.
 * @param {string} name Layer name id.
 */


function createLayerText(data, name) {
  const description = [];
  description.push(wp.i18n.__('Write text on the current image.', 'sharing-image'));
  description.push(wp.i18n.__('If the font does not fit within your limits, its size will decrease.', 'sharing-image'));
  description.push(wp.i18n.__('Avoid using large font sizes for long text as it affects performance.', 'sharing-image'));
  description.push(wp.i18n.__('You can use negative values for position and dimensions.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Text', 'sharing-image'),
    description: description.join(' ')
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'text'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  }); // Add boundary options.

  createBoundaryOptions(layer, name, data); // Create static/dynamic text fields.

  createTextDynamicFields(layer, name, data); // Create more options.

  createTextMoreFields(layer, name, data);
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[separator]',
      value: ', '
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[legacy]',
      value: data.legacy || ''
    },
    append: layer
  });
  return layer;
}
/**
 * Create filter layer.
 *
 * @param {Object} data Current template data.
 * @param {string} name Layer name id.
 */


function createLayerFilter(data, name) {
  const description = [];
  description.push(wp.i18n.__('Filters are applied sequentially to the entire editor image.', 'sharing-image'));
  description.push(wp.i18n.__('If you want to control their order, create multiple layers.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Filter', 'sharing-image'),
    description: description.join(' ')
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'filter'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
    fields: [{
      group: 'checkbox',
      classes: ['sharing-image-editor-control-checkbox'],
      attributes: {
        name: name + '[grayscale]',
        value: 'grayscale'
      },
      label: wp.i18n.__('Converts the image into a grayscale version', 'sharing-image'),
      checked: data.grayscale
    }],
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
 * @param {Object} data Current template data.
 * @param {string} name Layer name id.
 */


function createLayerRectangle(data, name) {
  const description = [];
  description.push(wp.i18n.__('Draw a colored rectangle on the current image.', 'sharing-image'));
  description.push(wp.i18n.__('You can get a filled or outlined figure with custom color and opacity.', 'sharing-image'));
  description.push(wp.i18n.__('Use a small height to draw the line.', 'sharing-image'));
  description.push(wp.i18n.__('You can use negative values for position and dimensions.', 'sharing-image'));
  const layer = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Rectangle', 'sharing-image'),
    description: description.join(' ')
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: name + '[type]',
      value: 'rectangle'
    },
    append: layer
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  }); // Add boundary options.

  createBoundaryOptions(layer, name, data);
  createRectangleOutline(layer, name, data);
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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

  const uniqid = data.uniqid || _helpers__WEBPACK_IMPORTED_MODULE_2__["default"].uniqid(); // Form fields name for this layer.

  const name = params.name + `[layers][${uniqid}]`;

  switch (type) {
    case 'text':
      layer = createLayerText(data, name);
      break;

    case 'image':
      layer = createLayerImage(data, name);
      break;

    case 'filter':
      layer = createLayerFilter(data, name);
      break;

    case 'rectangle':
      layer = createLayerRectangle(data, name);
      break;

    default:
      return null;
  }

  designer.appendChild(layer); // Button to delete layer.

  createDeleteLayerButton(designer, layer); // Button to collapse layer.

  createCollapseButton(layer, data, name); // Drag-n-drop button.

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
  const control = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
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

    const layer = createLayer(designer, select.value);
    layer.scrollIntoView({
      behavior: 'smooth'
    });
  });
  const designer = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
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
    }
  }
}
/**
 * Create common settings on template editor screen.
 *
 * @param {Object} data Current template data.
 */


function createFieldset(data) {
  const fieldset = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
    classes: ['sharing-image-editor-fieldset'],
    append: editor
  }); // Create template title control.

  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
        persistent: true,
        editor: 'title'
      },
      label: wp.i18n.__('Template title', 'sharing-image')
    }],
    append: fieldset
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control'],
    label: wp.i18n.__('Fill color', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-color'],
      attributes: {
        name: params.name + '[fill]',
        type: 'color',
        value: data.fill
      },
      dataset: {
        editor: 'fill'
      }
    }],
    append: fieldset
  }); // Create width/height settings control.

  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-compact', 'control-sizes'],
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: params.name + '[width]',
        value: data.width || '1200',
        placeholder: '1200',
        maxlength: 4
      },
      dataset: {
        editor: 'width'
      },
      label: wp.i18n.__('Editor width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: params.name + '[height]',
        value: data.height || '630',
        placeholder: '630',
        maxlength: 4
      },
      dataset: {
        editor: 'height'
      },
      label: wp.i18n.__('Editor height', 'sharing-image')
    }],
    append: fieldset
  });
  const description = [];
  description.push(wp.i18n.__('You can add multiple layers on your editor.', 'sharing-image'));
  description.push(wp.i18n.__('Note that the stacking order of the layers is important.', 'sharing-image'));
  description.push(wp.i18n.__('You can change the order using the icon in the corner of each box.', 'sharing-image'));
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
    classes: ['sharing-image-editor-control', 'control-reduced'],
    label: wp.i18n.__('Add layers', 'sharing-image'),
    description: description.join(' '),
    append: fieldset
  }); // Create layers designer block.

  createDesigner(fieldset, data);
  const footer = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].control({
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
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
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
  const button = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('button', {
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
  const checkbox = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].checkbox({
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
  const monitor = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
    classes: ['sharing-image-editor-monitor'],
    append: editor
  });
  const viewport = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
    classes: ['sharing-image-editor-viewport'],
    append: monitor
  });
  createPreview(viewport, data);
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
    classes: ['sharing-image-editor-warning'],
    append: viewport
  });
  const manager = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('div', {
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
  const form = _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('form', {
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

  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: params.name
    },
    append: form
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_index',
      value: index
    },
    append: form
  });
  _builders__WEBPACK_IMPORTED_MODULE_1__["default"].element('input', {
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

/***/ "./src/settings/premium/index.js":
/*!***************************************!*\
  !*** ./src/settings/premium/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/premium/styles.scss");
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
    title = wp.i18n.__('Verification unsuccessful.', 'sharing-image');
  }

  message.push(title);

  switch (code) {
    case 'LIMIT_EXCEEDED':
      message.push(wp.i18n.__('The number of licenses for this key has been exceeded.', 'sharing-image'));
      break;

    case 'KEY_NOT_FOUND':
      message.push(wp.i18n.__('The Premium key is invalid or expired.', 'sharing-image'));
      break;

    case 'SERVER_ERROR':
      message.push(wp.i18n.__('Unable to receive a response from the verification server.', 'sharing-image'));
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
  warning.textContent = message || wp.i18n.__('Unknown request error.', 'sharing-image');
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
  showPremiumError(wp.i18n.__('Using the plugin with a development license is prohibited in production.', 'sharing-image'));
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

/***/ "./src/settings/tools/index.js":
/*!*************************************!*\
  !*** ./src/settings/tools/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _builders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../builders */ "./src/builders/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/tools/styles.scss");
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
    classes: ['sharing-image-tools-control', 'control-section'],
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
 * Create clearing options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */


function createClearOptions(tools) {
  const control = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].control({
    classes: ['sharing-image-tools-control'],
    label: wp.i18n.__('Clearing settings', 'sharing-image'),
    append: tools
  });
  const fieldset = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('div', {
    classes: ['sharing-image-tools-control-fieldset'],
    append: control
  }); // Set template index to delete link.

  const link = new URL(params.links.action);
  link.searchParams.set('action', 'sharing_image_clear');
  link.searchParams.set('nonce', params.nonce);
  const remove = _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('a', {
    classes: ['sharing-image-tools-delete', 'button'],
    text: wp.i18n.__('Remove posters', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: fieldset
  });
  remove.addEventListener('click', e => {
    const message = wp.i18n.__('Are you sure you want to clear plugin data?', 'sharing-image');

    if (!confirm(message)) {
      // eslint-disable-line
      e.preventDefault();
    }
  });
  _builders__WEBPACK_IMPORTED_MODULE_0__["default"].element('small', {
    text: wp.i18n.__('This action clears post meta options but does not delete server images.', 'sharing-image'),
    append: fieldset
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

  createImportOptions(tools); // Clear plugin options.

  createClearOptions(tools);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTools);

/***/ }),

/***/ "./node_modules/sortablejs/modular/sortable.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/sortablejs/modular/sortable.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiDrag": () => (/* binding */ MultiDragPlugin),
/* harmony export */   "Sortable": () => (/* binding */ Sortable),
/* harmony export */   "Swap": () => (/* binding */ SwapPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**!
 * Sortable 1.15.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var version = "1.15.2";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !! /*@__PURE__*/navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches( /**HTMLElement*/el, /**String*/selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest( /**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }
      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = '';
  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');
      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
      i = 0,
      n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}

/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode;

    // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect();

          // Set relative to edges of padding box of container
          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
      scaleX = elMatrix && elMatrix.a,
      scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}

/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
    elSideVal = getRect(el)[elSide];

  /* jshint boss:true */
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
      visible = void 0;
    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}

/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0,
    i = 0,
    children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}

/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}

/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */
function index(el, selector) {
  var index = 0;
  if (!el || !el.parentNode) {
    return -1;
  }

  /* jshint boss:true */
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }
  return index;
}

/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */
function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
    offsetTop = 0,
    winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el),
        scaleX = elMatrix.a,
        scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}

/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
        _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}
function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}
function getChildContainingRectFromElement(container, options, ghostEl) {
  var rect = {};
  Array.from(container.children).forEach(function (child) {
    var _rect$left, _rect$top, _rect$right, _rect$bottom;
    if (!closest(child, options.draggable, container, false) || child.animated || child === ghostEl) return;
    var childRect = getRect(child);
    rect.left = Math.min((_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : Infinity, childRect.left);
    rect.top = Math.min((_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : Infinity, childRect.top);
    rect.right = Math.max((_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : -Infinity, childRect.right);
    rect.bottom = Math.max((_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : -Infinity, childRect.bottom);
  });
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
    animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);

        // If animating: compensate for current animation
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }
      var animating = false,
        animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
          target = state.target,
          fromRect = target.fromRect,
          toRect = getRect(target),
          prevFromRect = target.prevFromRect,
          prevToRect = target.prevToRect,
          animatingRect = state.rect,
          targetMatrix = matrix(target, true);
        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) &&
          // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }

        // if fromRect != toRect: animate
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d,
          translateX = (currentRect.left - toRect.left) / (scaleX || 1),
          translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        this.forRepaintDummy = repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }
    plugins.forEach(function (p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function () {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return;
      // Fire global events if it exists in this sortable
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable: sortable
        }, evt));
      }

      // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;

      // Add default options from plugin
      _extends(defaults, initialized.defaults);
    });
    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);
      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return;

      // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
    rootEl = _ref.rootEl,
    name = _ref.name,
    targetEl = _ref.targetEl,
    cloneEl = _ref.cloneEl,
    toEl = _ref.toEl,
    fromEl = _ref.fromEl,
    oldIndex = _ref.oldIndex,
    newIndex = _ref.newIndex,
    oldDraggableIndex = _ref.oldDraggableIndex,
    newDraggableIndex = _ref.newDraggableIndex,
    originalEvent = _ref.originalEvent,
    putSortable = _ref.putSortable,
    extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
    options = sortable.options,
    onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
  // Support for new CustomEvent feature
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }
  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var _excluded = ["evt"];
var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    originalEvent = _ref.evt,
    data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}
var dragEl,
  parentEl,
  ghostEl,
  rootEl,
  nextEl,
  lastDownEl,
  cloneEl,
  cloneHidden,
  oldIndex,
  newIndex,
  oldDraggableIndex,
  newDraggableIndex,
  activeGroup,
  putSortable,
  awaitingDragStarted = false,
  ignoreNextClick = false,
  sortables = [],
  tapEvt,
  touchEvt,
  lastDx,
  lastDy,
  tapDistanceLeft,
  tapDistanceTop,
  moved,
  lastTarget,
  lastDirection,
  pastFirstInvertThresh = false,
  isCircumstantialInvert = false,
  targetMoveDistance,
  // For positioning ghost absolutely
  ghostRelativeParent,
  ghostRelativeParentInitialScroll = [],
  // (left, top)

  _silent = false,
  savedInputChecked = [];

/** @const */
var documentExists = typeof document !== 'undefined',
  PositionGhostAbsolutely = IOS,
  CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
  // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
  supportCssPointerEvents = function () {
    if (!documentExists) return;
    // false when <= IE11
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
  _detectDirection = function _detectDirection(el, options) {
    var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === 'flex') {
      return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
    }
    if (elCSS.display === 'grid') {
      return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
      var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
      return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
    }
    return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
  _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },
  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
    var ret;
    sortables.some(function (sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable)) return;
      var rect = getRect(sortable),
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  },
  _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      return function (to, from, dragEl, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          // Default pull value
          // Default pull and put value if same group
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === 'clone') {
          return value;
        } else if (typeof value === 'function') {
          return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != 'object') {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  },
  _hideGhostForTarget = function _hideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', 'none');
    }
  },
  _unhideGhostForTarget = function _unhideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', '');
    }
  };

// #1184 fix - Prevent click event on fallback if dragged but item not changed position
if (documentExists && !ChromeForAndroid) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      // Create imitation event
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};

/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el; // root element
  this.options = options = _extends({}, options);

  // Export instance
  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults);

  // Set default options
  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }
  _prepareGroup(options);

  // Bind all private methods
  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  }

  // Setup drag mode
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  }

  // Bind events
  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }
  sortables.push(this.el);

  // Restore sorting
  options.store && options.store.get && this.sort(options.store.get(this) || []);

  // Add animation state manager
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart( /** Event|TouchEvent */evt) {
    if (!evt.cancelable) return;
    var _this = this,
      el = this.el,
      options = this.options,
      preventOnFilter = options.preventOnFilter,
      type = evt.type,
      touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
      target = (touch || evt).target,
      originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
      filter = options.filter;
    _saveInputCheckedState(el);

    // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    }

    // cancel dnd if original target is content editable
    if (originalTarget.isContentEditable) {
      return;
    }

    // Safari ignores further event handling after mousedown
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    }

    // Get the index of the dragged element within its parent
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);

    // Check filter
    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }

    // Prepare `dragstart`
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart( /** Event */evt, /** Touch */touch, /** HTMLElement */target) {
    var _this = this,
      el = _this.el,
      options = _this.options,
      ownerDocument = el.ownerDocument,
      dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';
      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }

        // Bind the events: dragstart/dragend
        _this._triggerDragStart(evt, touch);

        // Drag start event
        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        });

        // Chosen item
        toggleClass(dragEl, options.chosenClass, true);
      };

      // Disable "draggable"
      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop);

      // Make dragEl draggable (must be before delay for FireFox)
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent('delayStart', this, {
        evt: evt
      });

      // Delay is impossible for native DnD in Edge or IE
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag
        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler( /** TouchEvent|PointerEvent **/e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart( /** Event */evt, /** Touch */touch) {
    touch = touch || evt.pointerType == 'touch' && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }
    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });
      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }
      var options = this.options;

      // Apply effect
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();

      // Drag start event
      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent; // store last element
        }
        /* jshint boss:true */ while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove( /**TouchEvent*/evt) {
    if (tapEvt) {
      var options = this.options,
        fallbackTolerance = options.fallbackTolerance,
        fallbackOffset = options.fallbackOffset,
        touch = evt.touches ? evt.touches[0] : evt,
        ghostMatrix = ghostEl && matrix(ghostEl, true),
        scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
        scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
        relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
        dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
        dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);

      // only set the status to dragging, when we are actually dragging
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
        rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
        options = this.options;

      // Position absolutely
      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);

      // Set transform-origin
      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart( /**Event*/evt, /**boolean*/fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent('setupClone', this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }

    // #1143: IFrame support workaround
    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);

    // Set proper drop events
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, 'drop', _this);

      // #1276 fix:
      css(dragEl, 'transform', 'translateZ(0)');
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;
    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver( /**Event*/evt) {
    var el = this.el,
      target = evt.target,
      dragRect,
      targetRect,
      revert,
      options = this.options,
      group = options.group,
      activeSortable = Sortable.active,
      isOwner = activeGroup === group,
      canSort = options.sort,
      fromSortable = putSortable || activeSortable,
      vertical,
      _this = this,
      completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread2({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    }

    // Capture animation state
    function capture() {
      dragOverEvent('dragOverAnimationCapture');
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }

    // Return invocation when dragEl is inserted (or completed)
    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });
      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }

        // Animation
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }

      // Null lastTarget if it is not inside a previously swapped element
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }

      // no bubbling and not fallback
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);

        // Do not detect for empty insert if already inserted
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }

    // Call when dragEl has been inserted
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl; // actualization
        capture();
        this._hideClone();
        dragOverEvent('revert');
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // Insert to end of list

        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        }

        // if there is a last element, it is the target
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          if (elLastChild && elLastChild.nextSibling) {
            // the last draggable element is not the last node
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        // Insert to start of list
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
          targetBeforeFirstSwap,
          differentLevel = dragEl.parentNode !== el,
          differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
          side1 = vertical ? 'top' : 'left',
          scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
          scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        }
        // If dragEl is already beside target: Do not insert
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
          after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }

          // Undo chrome's scroll adjustment (has no effect on other browsers)
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode; // actualization

          // must be done before animation
          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop( /**Event*/evt) {
    var el = this.el,
      options = this.options;

    // Get the index of the dragged element within its parent
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode;

    // Get again after plugin event
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);

    // Unbind events
    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, 'user-select', '');
    }
    css(dragEl, 'transform', '');
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }
        _disableDraggable(dragEl);
        dragEl.style['will-change'] = '';

        // Remove classes
        // ghostClass is added in dragStarted
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);

        // Drag stop event
        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            // Remove event
            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            });

            // drag from one list and drop into another
            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          });

          // Save sorting
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent( /**Event*/evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);
        break;
      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
      el,
      children = this.el.children,
      i = 0,
      n = children.length,
      options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {},
      rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];
      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);
    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    }
    // Remove draggable attributes
    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return;

      // show clone at dragEl or original position
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};
function _globalDragOver( /**Event*/evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
    sortable = fromEl[expando],
    onMoveFn = sortable.options.onMove,
    retVal;
  // Support for new CustomEvent feature
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var firstElRect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX < childContainingRect.left - spacer || evt.clientY < firstElRect.top && evt.clientX < firstElRect.right : evt.clientY < childContainingRect.top - spacer || evt.clientY < firstElRect.bottom && evt.clientX < firstElRect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var lastElRect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX > childContainingRect.right + spacer || evt.clientY > lastElRect.bottom && evt.clientX > lastElRect.left : evt.clientY > childContainingRect.bottom + spacer || evt.clientX > lastElRect.right && evt.clientY > lastElRect.top;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
    targetLength = vertical ? targetRect.height : targetRect.width,
    targetS1 = vertical ? targetRect.top : targetRect.left,
    targetS2 = vertical ? targetRect.bottom : targetRect.right,
    invert = false;
  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}

/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
    i = str.length,
    sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}

// Fixed #973:
if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}

// Export utils
Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};

/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */
Sortable.get = function (element) {
  return element[expando];
};

/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */
Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }
  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};

/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */
Sortable.create = function (el, options) {
  return new Sortable(el, options);
};

// Export
Sortable.version = version;

var autoScrolls = [],
  scrollEl,
  scrollRootEl,
  scrolling = false,
  lastAutoScrollX,
  lastAutoScrollY,
  touchEvt$1,
  pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };

    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX,
        y = (evt.touches ? evt.touches[0] : evt).clientY,
        elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;

      // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);

        // Listener for pointer element change
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          // Detect for pointer elem change, emulating native DnD behaviour
          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
    y = (evt.touches ? evt.touches[0] : evt).clientY,
    sens = options.scrollSensitivity,
    speed = options.scrollSpeed,
    winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
    scrollCustomFn;

  // New scroll root, set scrollEl
  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent,
      rect = getRect(el),
      top = rect.top,
      bottom = rect.bottom,
      left = rect.left,
      right = rect.right,
      width = rect.width,
      height = rect.height,
      canScrollX = void 0,
      canScrollY = void 0,
      scrollWidth = el.scrollWidth,
      scrollHeight = el.scrollHeight,
      elCSS = css(el),
      scrollPosX = el.scrollLeft,
      scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */
        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
    putSortable = _ref.putSortable,
    dragEl = _ref.dragEl,
    activeSortable = _ref.activeSortable,
    dispatchSortableEvent = _ref.dispatchSortableEvent,
    hideGhostForTarget = _ref.hideGhostForTarget,
    unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};
function Revert() {}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
      putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable) {
      putSortable.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }
    this.sortable.animateAll();
    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};
_extends(Revert, {
  pluginName: 'revertOnSpill'
});
function Remove() {}
Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
      putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};
_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;
function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }
  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
        target = _ref2.target,
        onMove = _ref2.onMove,
        activeSortable = _ref2.activeSortable,
        changed = _ref2.changed,
        cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
        options = this.options;
      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;
        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }
        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }
      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
        putSortable = _ref3.putSortable,
        dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
    p2 = n2.parentNode,
    i1,
    i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);
  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
  multiDragClones = [],
  lastMultiDragSelect,
  // for selection with modifier key down (SHIFT)
  multiDragSortable,
  initialFolding = false,
  // Initial multi-drag fold when drag started
  folding = false,
  // Folding any other time
  dragStarted = false,
  dragEl$1,
  clonesFromRect,
  clonesHidden;
function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
    if (!sortable.options.avoidImplicitDeselect) {
      if (sortable.options.supportPointer) {
        on(document, 'pointerup', this._deselectMultiDrag);
      } else {
        on(document, 'mouseup', this._deselectMultiDrag);
        on(document, 'touchend', this._deselectMultiDrag);
      }
    }
    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      avoidImplicitDeselect: false,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';
        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }
        dataTransfer.setData('Text', data);
      }
    };
  }
  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
        cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;
      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }
      sortable._hideClone();
      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
        rootEl = _ref3.rootEl,
        dispatchSortableEvent = _ref3.dispatchSortableEvent,
        cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;
      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
        rootEl = _ref4.rootEl,
        cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;
      var sortable = _ref5.sortable,
        cloneNowHidden = _ref5.cloneNowHidden,
        cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');
        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;
      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      });

      // Sort multi-drag elements
      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;
      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;
      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM

        sortable.captureAnimationState();
        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }
      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;
        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        }

        // Remove all auxiliary multidrag items from el, if sorting enabled
        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
        completed = _ref8.completed,
        cancel = _ref8.cancel;
      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
        rootEl = _ref9.rootEl,
        sortable = _ref9.sortable,
        dragRect = _ref9.dragRect;
      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
        isOwner = _ref10.isOwner,
        insertion = _ref10.insertion,
        activeSortable = _ref10.activeSortable,
        parentEl = _ref10.parentEl,
        putSortable = _ref10.putSortable;
      var options = this.options;
      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }
        initialFolding = false;
        // If leaving sort:false root, or already folding - Fold to new location
        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute);

            // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable
            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        }

        // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out
        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }
          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;
            activeSortable._showClone(sortable);

            // Unfold animation for clones if showing from hidden
            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
        isOwner = _ref11.isOwner,
        activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });
      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
        rootEl = _ref12.rootEl,
        parentEl = _ref12.parentEl,
        sortable = _ref12.sortable,
        dispatchSortableEvent = _ref12.dispatchSortableEvent,
        oldIndex = _ref12.oldIndex,
        putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
        children = parentEl.children;

      // Multi-drag selection
      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }
        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvent: evt
          });

          // Modifier activated, select from last to dragEl
          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
              currentIndex = index(dragEl$1);
            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;
              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }
              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvent: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }
          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvent: evt
          });
        }
      }

      // Multi-drag drop
      if (dragStarted && this.isMultiDrag) {
        folding = false;
        // Do not "unfold" after around dragEl if reverted
        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
            multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();
          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect;

                  // Prepare unfold animation
                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            }

            // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed
            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }
              multiDragIndex++;
            });

            // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.
            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });
              if (update) {
                dispatchSortableEvent('update');
                dispatchSortableEvent('sort');
              }
            }
          }

          // Must be done after capturing individual rects (scroll bar)
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }
        multiDragSortable = toSortable;
      }

      // Remove clones if necessary
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();
      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return;

      // Only deselect if selection is in this sortable
      if (multiDragSortable !== this.sortable) return;

      // Only deselect if target is not item in this sortable
      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return;

      // Only deselect if left click
      if (evt && evt.button !== 0) return;
      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvent: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;
        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
          multiDragSortable = sortable;
        }
        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
          index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;
      var oldIndicies = [],
        newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        });

        // multiDragElements will already be sorted if folding
        var newIndex;
        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }
        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();
        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }
        return key;
      }
    }
  });
}
function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}

/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */
function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];
    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sortable);



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
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ "./src/settings/tools/index.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./catalog */ "./src/settings/catalog/index.js");
/* harmony import */ var _premium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./premium */ "./src/settings/premium/index.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor */ "./src/settings/editor/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./src/settings/config/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.scss */ "./src/settings/styles.scss");







/**
 * Init premium settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */

function initPremiumTab(content, settings) {
  (0,_premium__WEBPACK_IMPORTED_MODULE_3__["default"])(content, settings);
}
/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initConfigTab(content, settings) {
  (0,_config__WEBPACK_IMPORTED_MODULE_5__["default"])(content, settings);
}
/**
 * Init tools settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initToolsTab(content, settings) {
  (0,_tools__WEBPACK_IMPORTED_MODULE_1__["default"])(content, settings);
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
    return (0,_editor__WEBPACK_IMPORTED_MODULE_4__["default"])(content, settings, index, data);
  } // Create editor for new template.


  if (null === index) {
    return (0,_catalog__WEBPACK_IMPORTED_MODULE_2__["default"])(content, settings);
  }

  (0,_editor__WEBPACK_IMPORTED_MODULE_4__["default"])(content, settings, index);
}
/**
 * Init settings page handler.
 */


(function () {
  if (wp === undefined) {
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