/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/builders/element.js
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

/* harmony default export */ const builders_element = (buildElement);
;// CONCATENATED MODULE: ./src/scripts/builders/input.js


/**
 * Helper to create input field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildInput(args, parent) {
  const field = builders_element('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    const label = builders_element('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  const input = builders_element('input', {
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
    const counter = builders.element('em', {
      text: input.value,
      append: field
    });
    input.addEventListener('change', () => {
      counter.textContent = input.value;
    });
    input.addEventListener('input', () => {
      counter.textContent = input.value;
    });
  }

  return input;
}

/* harmony default export */ const input = (buildInput);
;// CONCATENATED MODULE: ./src/scripts/builders/checkbox.js

/**
 * Helper to create radio field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildCheckbox(args, parent) {
  const field = builders_element('label', {
    classes: args.classes || [],
    append: parent
  });
  const checkbox = builders_element('input', {
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
    const label = builders_element('span', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  return checkbox;
}

/* harmony default export */ const builders_checkbox = (buildCheckbox);
;// CONCATENATED MODULE: ./src/scripts/builders/radio.js

/**
 * Helper to create radio field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildRadio(args, parent) {
  const field = builders_element('label', {
    classes: args.classes || [],
    append: parent
  });
  const radio = builders_element('input', {
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
    const label = builders_element('span', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  if (args.hasOwnProperty('help')) {
    builders_element('small', {
      text: args.help,
      append: field
    });
  }

  return radio;
}

/* harmony default export */ const builders_radio = (buildRadio);
;// CONCATENATED MODULE: ./src/scripts/builders/select.js

/**
 * Helper to create select field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildSelect(args, parent) {
  const field = builders_element('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    const label = builders_element('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  const select = builders_element('select', {
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
    const option = builders_element('option', {
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

/* harmony default export */ const builders_select = (buildSelect);
;// CONCATENATED MODULE: ./src/scripts/builders/textarea.js

/**
 * Helper to create input field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */

function buildTextarea(args, parent) {
  const field = builders_element('div', {
    classes: args.classes || [],
    append: parent
  });

  if (args.hasOwnProperty('label')) {
    const label = builders_element('h4', {
      text: args.label
    });

    if (null !== args.label) {
      field.appendChild(label);
    }
  }

  const textarea = builders_element('textarea', {
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

/* harmony default export */ const builders_textarea = (buildTextarea);
;// CONCATENATED MODULE: ./src/scripts/builders/control.js






/**
 * Helper to create control.
 *
 * @param {Object} args List of control options.
 */

function buildControl(args) {
  const control = builders_element('div', {
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
    args.fields.forEach(field => {
      switch (field.group) {
        case 'input':
          input(field, control);
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

/* harmony default export */ const control = (buildControl);
;// CONCATENATED MODULE: ./src/scripts/builders/layer.js

/**
 * Helper to create layer.
 *
 * @param {Object} args List of layer options.
 */

function buildLayer(args) {
  const layer = builders_element('div', {
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

  builders_element('h2', {
    text: args.label,
    append: layer
  });

  if (args.hasOwnProperty('description')) {
    builders_element('h5', {
      text: args.description,
      append: layer
    });
  }

  return layer;
}

/* harmony default export */ const builders_layer = (buildLayer);
;// CONCATENATED MODULE: ./src/scripts/helpers/param.js
/**
 * Get current location search parameter.
 *
 * @param {string} key URL parameter key.
 */
function getSearchParam(key) {
  const params = new URL(document.location.href);
  return params.searchParams.get(key);
}

/* harmony default export */ const param = (getSearchParam);
;// CONCATENATED MODULE: ./src/scripts/helpers/attachment.js
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

/* harmony default export */ const attachment = (uploadMedia);
;// CONCATENATED MODULE: ./src/scripts/helpers/defaults.js
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

/* harmony default export */ const defaults = (intersectDefaults);
;// CONCATENATED MODULE: ./src/scripts/helpers/index.js



const Helper = {
  param: param,
  attachment: attachment,
  defaults: defaults
};
/* harmony default export */ const helpers = (Helper);
;// CONCATENATED MODULE: ./src/scripts/builders/media.js



/**
 * Helper to create media block.
 *
 * @param {Object} args List of media options.
 */

function buildMedia(args) {
  const media = control({
    classes: args.classes || []
  });

  if (args.hasOwnProperty('append')) {
    args.append.appendChild(media);
  }

  if (args.hasOwnProperty('prepend')) {
    args.prepend.insertBefore(media, args.prepend.firstChild);
  } // Labels are required.


  args.labels = args.labels || {};
  const attachment = builders_element('input', {
    attributes: {
      type: 'hidden',
      name: args.name
    },
    append: media
  });
  const upload = builders_element('button', {
    classes: ['button'],
    text: args.labels.button,
    attributes: {
      type: 'button'
    },
    append: media
  });
  const details = builders_element('a', {
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

    helpers.attachment(args.labels.heading, id => {
      setAttachment(id);
    });
  });
  return media;
}

/* harmony default export */ const media = (buildMedia);
;// CONCATENATED MODULE: ./src/scripts/builders/index.js









const Build = {
  element: builders_element,
  control: control,
  layer: builders_layer,
  checkbox: builders_checkbox,
  media: media,
  input: input,
  textarea: builders_textarea,
  radio: builders_radio,
  select: builders_select
};
/* harmony default export */ const builders = (Build);
;// CONCATENATED MODULE: ./src/scripts/sections/picker.js
/**
 * Metabox handler.
 */

/* global ajaxurl:true */
 // Store global script object for metabox.

let params = null; // Poster HTML element.

let poster = null; // Is gutenberg editor used.

let gutenberg = false;
/**
 * Show picker warning message.
 *
 * @param {string} message Warning message.
 */

function showPickerError(message) {
  const picker = poster.parentNode; // Try to find warning element.

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
  const picker = poster.parentNode; // Try to find warning element.

  const warning = picker.querySelector('.sharing-image-picker-warning');

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
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json';
  poster.classList.add('poster-loader'); // Create data form data bundle.

  const bundle = new window.FormData();
  bundle.set('action', 'sharing_image_generate');
  picker.querySelectorAll('[name]').forEach(field => {
    bundle.append(field.name, field.value);
  });
  hidePickerError();
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide preview loader on request complete.

    poster.classList.remove('poster-loader');

    if (!response.data) {
      return showPickerError();
    }

    if (!response.success) {
      return showPickerError(response.data);
    }

    for (const key in response.data) {
      // Find all poster input fields and set response data value.
      poster.querySelectorAll('input').forEach(input => {
        const name = params.name + '[' + key + ']';

        if (name === input.name) {
          input.value = response.data[key];
        }
      });
    }

    let image = poster.querySelector('img');

    if (null === image) {
      image = builders.element('img', {
        append: poster
      });
    }

    image.src = response.data.poster; // Show the poster.

    poster.classList.add('poster-visible');
  });
  request.addEventListener('error', () => {
    showPickerError(); // Hide preview loader on request complete.

    poster.classList.remove('poster-loader');
  });
  request.send(bundle);
}
/**
 * Create designer template selector.
 *
 * @param {HTMLElement} picker   Picker element.
 * @param {HTMLElement} designer Designer element.
 * @param {Object}      selected Seleted template.
 */


function createTemplate(picker, designer, selected) {
  const fields = {};
  params.templates.forEach((template, i) => {
    fields[i] = template.title || wp.i18n.__('Untitled', 'sharing-image');
  });
  const template = builders.select({
    classes: ['sharing-image-picker-template'],
    options: fields,
    attributes: {
      name: params.name + '[template]'
    },
    selected: String(selected)
  }, picker);
  template.addEventListener('change', () => {
    const fieldset = designer.childNodes;

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
 * Prefill caption fields for classic editor.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */


function fillClassicEditorPreset(textarea, preset) {
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
 * Prefill caption fields for block editor.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */


function fillBlockEditorPreset(textarea, preset) {
  const getAttribute = () => {
    return wp.data.select('core/editor').getEditedPostAttribute(preset);
  };

  let attribute = getAttribute();
  wp.data.subscribe(() => {
    const updated = getAttribute();

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
 * @param {string}      preset   Preset field.
 */


function fillCaptionPreset(textarea, preset) {
  if (gutenberg) {
    return fillBlockEditorPreset(textarea, preset);
  }

  fillClassicEditorPreset(textarea, preset);
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

  builders.media({
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

    const textarea = builders.textarea({
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
 * @param {HTMLElement} picker Picker element.
 * @param {Object}      data   Picker data object.
 */


function createDesigner(picker, data) {
  const designer = builders.element('div', {
    classes: ['sharing-image-picker-designer']
  });
  let selected = data.template || 0; // Reset selected template if index undefined.

  if (!params.templates[selected]) {
    selected = 0;
  } // Create designer fields


  params.templates.forEach((template, i) => {
    // Set default layers list.
    template.layers = template.layers || [];
    const fieldset = builders.element('div', {
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

  if (params.templates.length > 1) {
    createTemplate(picker, designer, selected);
  }

  picker.appendChild(designer);
}
/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} picker  Picker element.
 * @param {HTMLElement} manager Manager element.
 */


function createGenerateButton(picker, manager) {
  const button = builders.element('button', {
    classes: ['sharing-image-picker-generate', 'button'],
    text: wp.i18n.__('Generate', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', () => {
    generatePoster(picker);
  });
}
/**
 * Create button to delete current metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */


function createDeleteButton(manager) {
  const button = builders.element('button', {
    classes: ['sharing-image-picker-delete', 'button', 'button-delete'],
    text: wp.i18n.__('Remove', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: manager
  });
  button.addEventListener('click', () => {
    const image = poster.querySelector('img');

    if (null !== image) {
      poster.removeChild(image);
    }

    poster.querySelectorAll('input').forEach(input => {
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
  const manager = builders.element('div', {
    classes: ['sharing-image-picker-manager'],
    append: picker
  }); // Create poster generation button.

  createGenerateButton(picker, manager); // Create poster removing button.

  createDeleteButton(manager);
  builders.element('span', {
    classes: ['sharing-image-picker-spinner', 'spinner'],
    append: manager
  });
}
/**
 * Create poster block.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {Object}      data   Picker data object.
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
      name: params.name + '[poster]',
      value: data.poster
    },
    append: poster
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: params.name + '[width]',
      value: data.width
    },
    append: poster
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: params.name + '[height]',
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
    showPickerError(wp.i18n.__('Image sizes are not set. Regenerate the poster.', 'sharing-image'));
  }
}
/**
 * Get new config with AJAX call and reinit metabox.
 *
 * @param {HTMLElement} widget Widget element.
 */


const rebuildPicker = widget => {
  const request = new XMLHttpRequest();
  request.open('POST', ajaxurl);
  request.responseType = 'json';
  poster.classList.add('poster-loader'); // We need post ID for this request.

  const postId = wp.data.select('core/editor').getCurrentPostId(); // Create data form data bundle.

  const bundle = new window.FormData();
  bundle.set('action', 'sharing_image_rebuild');
  bundle.set('post', postId); // Find picker child.

  const picker = widget.querySelector('.sharing-image-picker');
  picker.querySelectorAll('[name]').forEach(field => {
    if ('sharing_image_nonce' === field.name) {
      bundle.append(field.name, field.value);
    }
  });
  hidePickerError();
  request.addEventListener('load', () => {
    const response = request.response || {}; // Hide preview loader on request complete.

    poster.classList.remove('poster-loader');

    if (!response.data) {
      return showPickerError();
    }

    if (!response.success) {
      return showPickerError(response.data);
    }

    buildPicker(widget, response.data);
  });
  request.addEventListener('error', () => {
    showPickerError(); // Hide preview loader on request complete.

    poster.classList.remove('poster-loader');
  });
  request.send(bundle);
};
/**
 * Wait Gutenberg post saving and reinit tasks list.
 *
 * @param {HTMLElement} widget Widget element.
 */


const subscribeOnSaving = widget => {
  let wasSavingPost = wp.data.select('core/edit-post').isSavingMetaBoxes();
  wp.data.subscribe(() => {
    const isSavingPost = wp.data.select('core/edit-post').isSavingMetaBoxes();

    if (wasSavingPost && !isSavingPost) {
      rebuildPicker(widget);
    }

    wasSavingPost = isSavingPost;
  });
};
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

  if ('term' === params.context) {
    const title = builders.element('div', {
      classes: ['sharing-image-title'],
      append: widget
    });
    builders.element('strong', {
      text: wp.i18n.__('Sharing Image', 'sharing-image'),
      append: title
    });
  }

  const picker = builders.element('div', {
    classes: ['sharing-image-picker'],
    append: widget
  });
  const data = params.meta || {}; // Create poster block.

  createPoster(picker, data); // Create fields designer.

  createDesigner(picker, data);
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
      value: params.nonce
    },
    append: picker
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_screen',
      value: params.screen
    },
    append: picker
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_context',
      value: params.context
    },
    append: picker
  });
}
/**
 * Create metabox generator picker and subscribe to events.
 *
 * @param {HTMLElement} widget   Widget element.
 * @param {Object}      settings Global settings object.
 */


function createPicker(widget, settings) {
  if (wp.data && wp.data.select('core/editor')) {
    gutenberg = true;
  }

  buildPicker(widget, settings);

  if (gutenberg) {
    subscribeOnSaving(widget);
  }
}

/* harmony default export */ const picker = (createPicker);
;// CONCATENATED MODULE: ./src/scripts/widget.js

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

    picker(widget, object);
  });
})();
/******/ })()
;