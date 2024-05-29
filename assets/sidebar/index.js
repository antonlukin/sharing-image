/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/image.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/image.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const image = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (image);
//# sourceMappingURL=image.js.map

/***/ }),

/***/ "./src/sidebar/styles.module.scss":
/*!****************************************!*\
  !*** ./src/sidebar/styles.module.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"methodAuto":"Wbh9agf5OB2Fr9RPJCww","thumbnailImage":"g4qkvGu7xkyoImxRZ6GR","thumbnailIcon":"ipnonin6Xj5A9QU3K38L"});

/***/ }),

/***/ "./src/sidebar/components/preset-field.js":
/*!************************************************!*\
  !*** ./src/sidebar/components/preset-field.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);





const PresetField = ({
  name,
  layer,
  fieldset,
  setFieldset,
  attribute
}) => {
  const [changed, setChanged] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  /**
   * Subscribe on field updates.
   */

  const preset = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute(attribute);
  });
  /**
   * Update fieldset and set current component status as changed.
   *
   * @param {string} value
   */

  const changeFieldset = value => {
    setFieldset({ ...fieldset,
      [name]: value
    }); // Mark this field as manually changed by user.

    setChanged(true);
  };
  /**
   * Update fieldset on presets change.
   */


  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!changed) {
      setFieldset({ ...fieldset,
        [name]: preset
      });
    }
  }, [preset]); // eslint-disable-line

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    name: name,
    label: layer.title,
    value: fieldset[name],
    onChange: value => changeFieldset(value)
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PresetField);

/***/ }),

/***/ "./src/sidebar/components/preset-taxonomy.js":
/*!***************************************************!*\
  !*** ./src/sidebar/components/preset-taxonomy.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);





const PresetTaxonomy = ({
  name,
  layer,
  fieldset,
  setFieldset,
  attribute,
  entity
}) => {
  const [changed, setChanged] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  /**
   * Subscribe on taxonomy updates.
   */

  const preset = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const list = []; // Get checked categories ids.

    const checked = select('core/editor').getEditedPostAttribute(attribute);
    checked.forEach(id => {
      const category = select('core').getEntityRecord('taxonomy', entity, id);

      if (category) {
        list.push(category.name);
      }
    });
    return list.join(layer.separator || ', ');
  });
  /**
   * Update fieldset and set current component status as changed.
   *
   * @param {string} value
   */

  const changeFieldset = value => {
    setFieldset({ ...fieldset,
      [name]: value
    }); // Mark this field as manually changed by user.

    setChanged(true);
  };
  /**
   * Update fieldset on presets change.
   */


  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!changed) {
      setFieldset({ ...fieldset,
        [name]: preset
      });
    }
  }, [preset]); // eslint-disable-line

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    name: name,
    label: layer.title,
    value: fieldset[name],
    onChange: value => changeFieldset(value)
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PresetTaxonomy);

/***/ }),

/***/ "./src/sidebar/components/template-fields.js":
/*!***************************************************!*\
  !*** ./src/sidebar/components/template-fields.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _preset_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./preset-field */ "./src/sidebar/components/preset-field.js");
/* harmony import */ var _preset_taxonomy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preset-taxonomy */ "./src/sidebar/components/preset-taxonomy.js");
/* harmony import */ var _thumbnail_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./thumbnail-field */ "./src/sidebar/components/thumbnail-field.js");






const TemplateFields = ({
  layers,
  fieldset,
  setFieldset
}) => {
  /**
   * Display dynamic text field.
   *
   * @param {Object} layer
   * @param {string} name
   *
   * @return {JSX.Element} Textarea control component.
   */
  const displayTextField = (layer, name) => {
    const props = {
      name,
      layer,
      fieldset,
      setFieldset
    };

    switch (layer.preset) {
      case 'title':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_preset_field__WEBPACK_IMPORTED_MODULE_2__["default"], { ...props,
          attribute: 'title'
        });

      case 'excerpt':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_preset_field__WEBPACK_IMPORTED_MODULE_2__["default"], { ...props,
          attribute: 'excerpt'
        });

      case 'categories':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_preset_taxonomy__WEBPACK_IMPORTED_MODULE_3__["default"], { ...props,
          attribute: 'categories',
          entity: 'category'
        });

      case 'tags':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_preset_taxonomy__WEBPACK_IMPORTED_MODULE_3__["default"], { ...props,
          attribute: 'post_tags',
          entity: 'tag'
        });
    }

    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
      name: name,
      label: layer.title,
      defaultValue: fieldset[name],
      onChange: value => setFieldset({ ...fieldset,
        [name]: value
      })
    });
  };
  /**
   * Display dynamic image field.
   *
   * @param {Object} layer
   * @param {string} name
   *
   * @return {JSX.Element} Textarea control component.
   */


  const displayImageField = (layer, name) => {
    const props = {
      name,
      layer,
      fieldset,
      setFieldset
    }; // Thumbnail field custom styles.

    const styles = {
      border: 'solid 1px #ccc',
      padding: '4px',
      borderRadius: '4px'
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
      id: null,
      label: layer.title
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
      justify: 'flex-start',
      style: styles
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_thumbnail_field__WEBPACK_IMPORTED_MODULE_4__["default"], { ...props
    })));
  };

  const composeControls = () => {
    const controls = [];

    for (const key in layers) {
      const layer = layers[key];

      if (!layer.dynamic) {
        continue;
      }

      switch (layer.type) {
        case 'text':
          controls.push(displayTextField(layer, key));
          break;

        case 'image':
          controls.push(displayImageField(layer, key));
          break;
      }
    }

    return controls;
  };

  return composeControls();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TemplateFields);

/***/ }),

/***/ "./src/sidebar/components/thumbnail-field.js":
/*!***************************************************!*\
  !*** ./src/sidebar/components/thumbnail-field.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/image.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles.module.scss */ "./src/sidebar/styles.module.scss");









const ThumbnailField = ({
  name,
  layer,
  fieldset,
  setFieldset
}) => {
  const [changed, setChanged] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  /**
   * Subscribe on featured media updates.
   */

  const preset = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('featured_media');
  });
  const thumbnail = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const media = select('core').getMedia(fieldset[name]); // Try to get thumnail first.

    let url = media?.media_details?.sizes?.thumbnail?.source_url;

    if (!url) {
      url = media?.source_url;
    }

    return url;
  }, [fieldset]);
  /**
   * Update fieldset and set current component status as changed.
   *
   * @param {string} value
   */

  const changeFieldset = value => {
    setFieldset({ ...fieldset,
      [name]: value
    }); // Mark this field as manually changed by user.

    setChanged(true);
  };
  /**
   * Update fieldset on presets change.
   */


  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!changed && layer.preset === 'featured') {
      setFieldset({ ...fieldset,
        [name]: preset
      });
    }
  }, [preset]); // eslint-disable-line

  /**
   * Function to remove layer image.
   */

  const removeImage = () => {
    setFieldset({ ...fieldset,
      [name]: 0
    });
  };

  const displayThumbnailIcon = open => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
      className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].thumbnailIcon
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "link",
      onClick: open
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set layer image', 'sharing-image')));
  };

  const displayThumbnailImage = () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, thumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: thumbnail,
      alt: '',
      className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].thumbnailImage
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "link",
      onClick: removeImage
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove image', 'sharing-image')));
  };
  /**
   * Display thumbnail ot icon according to fieldset data.
   *
   * @param {Function} open
   */


  const displayThumbnail = ({
    open
  }) => {
    if (fieldset[name]) {
      return displayThumbnailImage();
    }

    return displayThumbnailIcon(open);
  };

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.MediaUpload, {
    onSelect: media => {
      changeFieldset(media.id);
    },
    allowedTypes: ['image'],
    value: fieldset[name],
    render: displayThumbnail
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThumbnailField);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!******************************!*\
  !*** ./src/sidebar/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_template_fields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/template-fields */ "./src/sidebar/components/template-fields.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles.module.scss */ "./src/sidebar/styles.module.scss");












const SharingImageSidebar = ({
  meta,
  templates
}) => {
  const {
    createErrorNotice,
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_8__.store);
  /**
   * Retrieve post meta.
   */

  const postMeta = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('meta');
  });
  /**
   * Retrieve post id.
   */

  const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core/editor').getCurrentPostId();
  });
  /**
   * Dispatchers.
   */

  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/editor', [postMeta]);
  /**
   * Local states.
   */

  const [template, setTemplate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(postMeta[meta.source]?.template);
  const [fieldset, setFieldset] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(postMeta[meta.fieldset]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  /**
   * Change Template.
   *
   * @param {string} index Template ID.
   */

  const changeTemplate = index => {
    editPost({
      meta: {
        [meta.source]: { ...postMeta[meta.source],
          template: index
        }
      }
    });
    setTemplate(index);
  };
  /**
   * Send REST API request to generate new poster.
   */


  const generatePoster = async () => {
    if (loading) {
      return;
    }

    removeNotice('sharing-image-generate');
    const options = {
      path: 'sharing-image/v1/poster/' + postId,
      method: 'POST',
      data: {
        fieldset: fieldset,
        template: template
      }
    };
    setLoading(true);

    try {
      const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()(options);

      if (!result.data) {
        throw new Error();
      }

      editPost({
        meta: {
          [meta.source]: { ...result.data,
            template: template
          }
        }
      });
    } catch (error) {
      createErrorNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An unexpected error occurred', 'sharing-image'), {
        id: 'sharing-image-generate',
        type: 'snackbar'
      });
    }

    setLoading(false);
  };
  /**
   * Remove poster handler button.
   */


  const removePoster = () => {
    editPost({
      meta: {
        [meta.source]: {}
      }
    });
  };
  /**
   * Display icon for auto generated poster.
   */


  const displayMethodAutoIcon = () => {
    const title = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Poster was generated automatically and will update on post saving.', 'sharing-image');

    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Dashicon, {
      icon: "awards",
      className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_10__["default"].methodAuto,
      title: title
    });
  };
  /**
   * Update post meta on fieldset changes.
   */


  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    editPost({
      meta: {
        [meta.fieldset]: fieldset
      }
    });
  }, [fieldset]); // eslint-disable-line

  /**
   * Set template.
   */

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const [index] = Object.keys(templates);

    if (!templates[template] && index) {
      setTemplate(index);
    }
  }, [templates, template]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__.PluginDocumentSettingPanel, {
    name: "sharing-image-setting",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sharing Image', 'sharing-image')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Flex, {
    direction: 'column',
    gap: 2,
    style: {
      position: 'relative'
    }
  }, postMeta[meta.source]?.poster && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: postMeta[meta.source].poster,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sharing Image poster', 'sharing-image')
  }), postMeta[meta.source]?.method === 'auto' && displayMethodAutoIcon(), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
    value: template,
    options: Object.keys(templates).map(index => ({
      label: templates[index].title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Untitled', 'sharing-image'),
      value: index
    })),
    onChange: changeTemplate
  }), templates[template] && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Flex, {
    direction: 'column',
    gap: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_template_fields__WEBPACK_IMPORTED_MODULE_9__["default"], {
    layers: templates[template].layers || [],
    fieldset: fieldset,
    setFieldset: setFieldset
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Flex, {
    justify: 'flex-start'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "secondary",
    type: 'button',
    onClick: () => generatePoster()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generate', 'sharing-image')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "tertiary",
    isDestructive: true,
    onClick: () => removePoster()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'sharing-image')), loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Spinner, null))));
};

const checkMeta = params => {
  if (!params.meta?.source || !params.meta?.fieldset) {
    return false;
  }

  return true;
};

(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__.registerPlugin)('sharing-image-sidebar', {
  render: () => {
    const params = window.sharingImageSidebar || {};

    if (checkMeta(params)) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SharingImageSidebar, { ...params
      });
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map