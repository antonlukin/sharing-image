/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sidebar/template-fields.js":
/*!****************************************!*\
  !*** ./src/sidebar/template-fields.js ***!
  \****************************************/
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
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);






const TemplateFields = ({
  layers,
  updateFieldset,
  fields
}) => {
  const presets = {};
  /**
   * Retrieve post title.
   */

  presets.title = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('title');
  });
  /**
   * Retrieve post excerpt.
   */

  presets.excerpt = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('excerpt');
  });
  /**
   * Local states.
   */

  const [changed, setChanged] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({});

  const changeField = (key, value) => {
    updateFieldset(key, value); // Mark this field as manually changed by user.

    setChanged({ ...changed,
      [key]: true
    });
  };
  /**
   * Display dynamic text field
   *
   * @param {Object} layer
   * @param {string} key
   *
   * @return {JSX.Element} Textarea control component.
   */


  const displayTextField = (layer, key) => {
    if (!changed[key] && layer.preset in presets) {
      fields[key] = presets[layer.preset];
    }

    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
      key: key,
      label: layer.title,
      value: fields[key],
      onChange: value => changeField(key, value)
    });
  }; // get meta data


  const {
    imageId,
    image
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const id = 0;
    return {
      imageId: id,
      image: select('core').getMedia(id)
    };
  });
  /**
   * Display dynamic image field
   *
   * @param {Object} layer
   * @param {string} key
   *
   * @return {JSX.Element} Textarea control component.
   */

  const displayImageField = (layer, key) => {
    console.log(fields);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
      onSelect: media => {
        updateFieldset(key, media.id);
      },
      allowedTypes: ['image'],
      value: fields[key],
      render: ({
        open
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !fields[key] && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        variant: "secondary",
        onClick: open
      }, "Upload image"), fields[key] && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        isDestructive: true,
        onClick: () => updateFieldset(key, 0)
      }, "Remove image"))
    }));
  };

  const controls = [];

  for (const key in layers) {
    const layer = layers[key]; // if ( ! layer.dynamic ) {
    // 	continue;
    // }

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TemplateFields);

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
/* harmony import */ var _template_fields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./template-fields */ "./src/sidebar/template-fields.js");











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
  const featuredId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('featured_media');
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

  const updateFieldset = (key, value) => {
    editPost({
      meta: {
        [meta.fieldset]: { ...postMeta[meta.fieldset],
          [key]: value
        }
      }
    });
  };

  const generateButton = async e => {
    e.preventDefault();

    if (loading) {
      return;
    }

    removeNotice('sharing-image-generate');
    const options = {
      path: 'sharing-image/v1/poster/' + postId,
      method: 'POST',
      data: {
        fieldset: postMeta[meta.fieldset],
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

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const [index] = Object.keys(templates);

    if (!templates[template] && index) {
      setTemplate(index);
    }
  }, [templates, template]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_6__.PluginDocumentSettingPanel, {
    name: "sharing-image-setting",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sharing Image', 'sharimg-image')
  }, postMeta[meta.source]?.poster && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: postMeta[meta.source].poster,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sharing Image poster', 'sharimg-image'),
    style: {
      marginBottom: '10px'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.SelectControl, {
    value: template,
    options: Object.keys(templates).map(index => ({
      label: templates[index].title,
      value: index
    })),
    onChange: changeTemplate
  }), templates[template] && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Flex, {
    direction: 'column'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_template_fields__WEBPACK_IMPORTED_MODULE_9__["default"], {
    layers: templates[template].layers || [],
    updateFieldset: updateFieldset,
    fields: postMeta[meta.fieldset]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Flex, {
    justify: 'flex-start'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "secondary",
    isDestructive: false,
    type: 'button',
    onClick: generateButton
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generate', 'sharing-image')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "ternary",
    isDestructive: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'sharing-image')), loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Spinner, null)));
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
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SharingImageSidebar, {
        meta: params.meta,
        templates: params.templates
      });
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map