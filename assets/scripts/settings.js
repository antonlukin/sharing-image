/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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
;// CONCATENATED MODULE: ./src/scripts/sections/catalog.js
 // Store global scriot object for settings page.

let params = null;
/**
 * Create template card in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {number}      index   Current card index.
 * @param {Object}      option  List of template options.
 */

function createCard(catalog, index, option) {
  const card = builders.element('div', {
    classes: ['sharing-image-catalog-card'],
    append: catalog
  });
  const preview = builders.element('figure', {
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

  const footer = builders.element('footer', {
    classes: ['sharing-image-catalog-footer'],
    append: card
  });
  builders.element('h2', {
    text: option.title || wp.i18n.__('Untitled', 'sharing-image'),
    append: footer
  });
  const link = new URL(document.location.href);
  link.searchParams.set('template', index);
  builders.element('a', {
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
 * @param {number}      index   New card index.
 */


function createNewButton(catalog, index) {
  const link = new URL(document.location.href);
  link.searchParams.set('template', index);
  const button = builders.element('a', {
    classes: ['sharing-image-catalog-new'],
    attributes: {
      href: link.href
    },
    append: catalog
  });
  const title = builders.element('h2', {
    append: button
  });
  builders.element('strong', {
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

  builders.element('span', {
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
  const catalog = builders.element('div', {
    classes: ['sharing-image-catalog'],
    append: content
  });
  let index = 1;
  settings.templates.forEach(template => {
    createCard(catalog, index++, template);
  });
  createNewButton(catalog, index);
}

/* harmony default export */ const catalog = (createCatalog);
;// CONCATENATED MODULE: ./src/scripts/sections/editor.js
/**
 * Editor settings.
 */

/* global ajaxurl:true */
 // Store global script object for settings page.

let editor_params = null; // Preview element.

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
      image = builders.element('img', {
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
 * Update form fields name attributes for layers
 *
 * @param {HTMLElement} designer Layouts designer element.
 */


function reorderLayers(designer) {
  const layers = designer.children;

  for (let index = 0; index < layers.length; index++) {
    const fields = layers[index].querySelectorAll('[name]');
    fields.forEach(field => {
      let name = field.getAttribute('name'); // Try to find layer index.

      const match = name.match(/(.+?\[layers\])\[(\d+)\](\[.+?\])$/);

      if (null !== match) {
        name = match[1] + `[${index}]` + match[3];
      }

      field.name = name;
    });
  }
}
/**
 * Update template background settings with custom logic.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object}      data     Current template data.
 */


function createPermanentAttachment(fieldset, data) {
  data.background = data.background || null; // Create background settings control.

  const control = builders.control({
    classes: ['sharing-image-editor-control', 'control-reduced'],
    label: wp.i18n.__('Template background settings', 'sharing-image'),
    fields: [{
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: editor_params.name + '[background]',
        value: 'blank'
      },
      label: wp.i18n.__('Do not use background image', 'sharing-image'),
      checked: data.background
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: editor_params.name + '[background]',
        value: 'dynamic'
      },
      label: wp.i18n.__('Select for each post separately', 'sharing-image'),
      help: wp.i18n.__('Post thumbnail will be used if autogenerate', 'sharing-image'),
      checked: data.background
    }, {
      group: 'radio',
      classes: ['sharing-image-editor-control-radio'],
      attributes: {
        name: editor_params.name + '[background]',
        value: 'permanent'
      },
      label: wp.i18n.__('Upload permanent background', 'sharing-image'),
      checked: data.background
    }],
    append: fieldset
  });
  const media = builders.media({
    name: editor_params.name + '[attachment]',
    classes: ['sharing-image-editor-control', 'control-media'],
    value: data.attachment,
    link: editor_params.links.uploads,
    labels: {
      button: wp.i18n.__('Upload image', 'sharing-image'),
      heading: wp.i18n.__('Select background image', 'sharing-image'),
      details: wp.i18n.__('Attachment details', 'sharing-image')
    },
    append: fieldset
  });
  const upload = media.querySelector('button');
  upload.disabled = true;
  builders.control({
    classes: ['sharing-image-editor-control'],
    label: wp.i18n.__('Fill color', 'sharing-image'),
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
  control.querySelectorAll('input').forEach(radio => {
    if ('radio' !== radio.type) {
      return;
    } // Show upload button for checked permanent radio.


    if (radio.checked && 'permanent' === radio.value) {
      upload.disabled = false;
    }

    radio.addEventListener('change', () => {
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
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createDynamicFields(layer, name, data) {
  const control = builders.control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = builders.checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[dynamic]',
      value: 'dynamic'
    },
    label: wp.i18n.__('Dynamic field. Filled in the post editing screen.', 'sharing-image'),
    checked: data.dynamic
  }, control);
  const fields = [];
  fields[fields.length] = builders.control({
    classes: ['sharing-image-editor-control', 'control-extend', 'control-hidden'],
    help: wp.i18n.__('Displayed only in the metabox.', 'sharing-image'),
    fields: [{
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[title]',
        value: data.title
      },
      label: wp.i18n.__('Field name', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
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
  fields[fields.length] = builders.control({
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
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
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
      label: wp.i18n.__('Content', 'sharing-image')
    }],
    append: layer
  }); // Helper function to toggle contols visibility.

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
 * Text layer more options fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */


function createMoreFields(layer, name, data) {
  const fields = [];
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
      label: wp.i18n.__('Text color', 'sharing-image')
    }],
    append: layer
  });
  fields[fields.length] = builders.control({
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
  const control = builders.control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const button = builders.element('button', {
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
  const control = builders.control({
    classes: ['sharing-image-editor-control', 'control-upload', 'control-hidden'],
    append: layer
  });
  const select = builders.select({
    classes: ['sharing-image-editor-control-select'],
    options: editor_params.fonts,
    attributes: {
      name: name + '[fontname]'
    },
    label: wp.i18n.__('Font family', 'sharing-image'),
    selected: data.fontname
  }, control);
  const media = builders.media({
    name: name + '[fontfile]',
    classes: ['sharing-image-editor-control-media'],
    value: data.fontfile,
    link: editor_params.links.uploads,
    labels: {
      button: wp.i18n.__('Upload custom font', 'sharing-image'),
      heading: wp.i18n.__('Upload custom font', 'sharing-image'),
      details: wp.i18n.__('Font attachment', 'sharing-image'),
      remove: wp.i18n.__('Remove font', 'sharing-image')
    },
    remove: true,
    append: control
  });
  builders.element('small', {
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
  const control = builders.control({
    classes: ['sharing-image-editor-control'],
    append: layer
  });
  const checkbox = builders.checkbox({
    classes: ['sharing-image-editor-control-checkbox'],
    attributes: {
      name: name + '[outline]',
      value: 'outline'
    },
    label: wp.i18n.__('Outline rectangle.', 'sharing-image'),
    checked: data.outline
  }, control);
  const range = builders.control({
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
  builders.element('a', {
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

  const link = new URL(editor_params.links.action);
  link.searchParams.set('action', 'sharing_image_delete');
  link.searchParams.set('template', index);
  link.searchParams.set('nonce', editor_params.nonce);
  builders.element('a', {
    classes: ['sharing-image-editor-delete'],
    text: wp.i18n.__('Delete template', 'sharing-image'),
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
 * @param {Object}      data     Template data object.
 */


function createPreview(viewport, data) {
  preview = builders.element('div', {
    classes: ['sharing-image-editor-preview', 'preview-blank'],
    append: viewport
  });

  if (data.preview) {
    builders.element('img', {
      attributes: {
        src: data.preview,
        alt: ''
      },
      append: preview
    });
    preview.classList.remove('preview-blank');
  }

  builders.element('span', {
    classes: ['sharing-image-editor-loader'],
    append: preview
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: editor_params.name + '[preview]',
      value: data.preview
    },
    append: preview
  });
  return preview;
}
/**
 *
 * @param {*} designer
 * @param {*} layer
 */


function createCollapseButton(designer, layer) {
  const label = layer.querySelector('h2');
  const button = builders.element('button', {
    classes: ['sharing-image-editor-collapse'],
    attributes: {
      type: 'button',
      title: wp.i18n.__('Collapse layer', 'sharing-image')
    },
    append: label
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
  const button = builders.element('button', {
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
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */


function createDeleteLayerButton(designer, layer) {
  const control = builders.control({
    classes: ['sharing-image-editor-control', 'control-footer'],
    append: layer
  });
  const button = builders.element('button', {
    classes: ['sharing-image-editor-delete'],
    text: wp.i18n.__('Delete layer', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  button.addEventListener('click', () => {
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
 * @param {Object} data  Current template layer data.
 */


function createLayerImage(index, data) {
  const description = [];
  description.push(wp.i18n.__('Use jpg, gif or png image formats.', 'sharing-image'));
  description.push(wp.i18n.__('Leave width and height fields blank to use the original image size.', 'sharing-image'));
  description.push(wp.i18n.__('Sizes are calculated proportionally if not filled.', 'sharing-image'));
  const layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-image'],
    label: wp.i18n.__('Image', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = editor_params.name + `[layers][${index}]`;
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
      button: wp.i18n.__('Upload image', 'sharing-image'),
      heading: wp.i18n.__('Select layer image', 'sharing-image'),
      details: wp.i18n.__('Attachment details', 'sharing-image')
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
      label: wp.i18n.__('Width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: name + '[height]',
        value: data.height
      },
      label: wp.i18n.__('Height', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create text layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data  Current template data.
 */


function createLayerText(index, data) {
  const description = [];
  description.push(wp.i18n.__('Write a text to the current image.', 'sharing-image'));
  description.push(wp.i18n.__('If the font does not fit within your limits, its size will decrease.', 'sharing-image'));
  description.push(wp.i18n.__('Avoid using large font sizes for long text – this affects performance.', 'sharing-image'));
  const layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Text', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = editor_params.name + `[layers][${index}]`;
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
 * @param {number} index Current layer index.
 * @param {Object} data  Current template data.
 */


function createLayerFilter(index, data) {
  const description = [];
  description.push(wp.i18n.__('Filters are applied one after another to the entire editor image.', 'sharing-image'));
  description.push(wp.i18n.__('If you want to control their order, create multiple layers.', 'sharing-image'));
  const layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Filter', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = editor_params.name + `[layers][${index}]`;
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
      label: wp.i18n.__('Turns image into a grayscale version', 'sharing-image'),
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
      label: wp.i18n.__('Blur image by Gaussian effect', 'sharing-image'),
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
      label: wp.i18n.__('Contrast', 'sharing-image')
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
      label: wp.i18n.__('Brightness', 'sharing-image')
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
      label: wp.i18n.__('Blackout', 'sharing-image')
    }],
    append: layer
  });
  return layer;
}
/**
 * Create rectangle layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data  Current template data.
 */


function createLayerRectangle(index, data) {
  const description = [];
  description.push(wp.i18n.__('Draw a colored rectangle on current image.', 'sharing-image'));
  description.push(wp.i18n.__('You can get filled or outlined figure with custom color and opacity.', 'sharing-image'));
  description.push(wp.i18n.__('Use small height to draw the line.', 'sharing-image'));
  const layer = builders.layer({
    classes: ['sharing-image-editor-layer', 'layer-text'],
    label: wp.i18n.__('Rectangle', 'sharing-image'),
    description: description.join(' ')
  }); // Form fields name for this layer.

  const name = editor_params.name + `[layers][${index}]`;
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
      label: wp.i18n.__('Rectangle color', 'sharing-image')
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
 * @param {number}      index    Layer index.
 * @param {Object}      data     New layer data.
 */


function createLayer(designer, type, index) {
  let data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let layer = null;

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

  designer.insertBefore(layer, designer.firstChild); // Delete this layer button.

  createDeleteLayerButton(designer, layer); // Create collapse button.

  createCollapseButton(designer, layer); // Reorder layers button.

  createOrderLayersButton(designer, layer);
}
/**
 * Create layers designer control.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object}      data     Current template data.
 */


function createDesigner(fieldset, data) {
  const control = builders.control({
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
  const button = builders.element('button', {
    classes: ['button'],
    text: wp.i18n.__('Add new', 'sharing-image'),
    attributes: {
      type: 'button'
    },
    append: control
  });
  const designer = builders.element('div', {
    classes: ['sharing-image-editor-designer'],
    append: fieldset
  }); // Set default layers set.

  let layers = data.layers || [];
  layers = layers.reverse();
  layers.forEach((layer, index) => {
    if (layer.hasOwnProperty('type')) {
      createLayer(designer, layer.type, index++, layer);
    }
  });
  button.addEventListener('click', () => {
    const select = control.querySelector('select');

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
  const fieldset = builders.element('div', {
    classes: ['sharing-image-editor-fieldset'],
    append: editor
  }); // Create template title control.

  builders.control({
    classes: ['sharing-image-editor-control', 'control-compact', 'control-extend'],
    help: wp.i18n.__('Used only in the admin panel', 'sharing-image'),
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
      label: wp.i18n.__('Template title', 'sharing-image')
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
      label: wp.i18n.__('Editor width', 'sharing-image')
    }, {
      group: 'input',
      classes: ['sharing-image-editor-control-input'],
      attributes: {
        name: editor_params.name + '[height]',
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
  builders.control({
    classes: ['sharing-image-editor-control', 'control-reduced'],
    label: wp.i18n.__('Add layers', 'sharing-image'),
    description: description.join(' '),
    append: fieldset
  }); // Create layers designer block.

  createDesigner(fieldset, data);
  const footer = builders.control({
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
  builders.element('button', {
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
  const button = builders.element('button', {
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
 * Create disable live-reloading checkbox.
 *
 * @param {HTMLElement} manager Manager element.
 * @param {Object}      data    Template data.
 */


function createSuspendCheckbox(manager, data) {
  const checkbox = builders.checkbox({
    classes: ['sharing-image-editor-suspend'],
    attributes: {
      name: editor_params.name + '[suspend]',
      value: 'suspend'
    },
    label: wp.i18n.__('Disable live-reload', 'sharing-image'),
    checked: data.suspend
  }, manager);

  if (data.suspend) {
    editor.classList.add('editor-suspend');
  }

  checkbox.addEventListener('change', () => {
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
  const monitor = builders.element('div', {
    classes: ['sharing-image-editor-monitor'],
    append: editor
  });
  const viewport = builders.element('div', {
    classes: ['sharing-image-editor-viewport'],
    append: monitor
  });
  createPreview(viewport, data);
  builders.element('div', {
    classes: ['sharing-image-editor-warning'],
    append: viewport
  });
  const manager = builders.element('div', {
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
 * @param {number}      index   Current option index.
 */


function prepareEditor(content, index) {
  editor_params.name = 'sharing_image_editor';
  const form = builders.element('form', {
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


function createEditor(content, settings, index) {
  let data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  editor_params = settings; // Prepare form with hidden fields and events.

  editor = prepareEditor(content, index); // Create monitor section part.

  createMonitor(data); // Create fieldset section part.

  createFieldset(data);
}

/* harmony default export */ const sections_editor = (createEditor);
;// CONCATENATED MODULE: ./src/scripts/sections/config.js
/**
 * Config settings tab.
 */
 // Store global script object for settings page.

let config_params = null;
/**
 * Create default poster option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */

function createDefaultOptions(options, data) {
  const control = builders.control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Default poster', 'sharing-image'),
    append: options
  });
  builders.media({
    name: config_params.name + '[default]',
    classes: ['sharing-image-config-control-media'],
    label: wp.i18n.__('Default poster', 'sharing-image'),
    value: data.default,
    link: config_params.links.uploads,
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
  builders.element('small', {
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
  const control = builders.control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Upload directory', 'sharing-image'),
    append: options
  });
  const fieldset = builders.element('div', {
    classes: ['sharing-image-config-control-fieldset'],
    append: control
  });
  builders.radio({
    classes: ['sharing-image-config-control-radio'],
    attributes: {
      name: config_params.name + '[uploads]',
      value: 'default'
    },
    label: wp.i18n.__('Use default uploads directory', 'sharing-image'),
    checked: data.uploads || 'default'
  }, fieldset);
  builders.radio({
    classes: ['sharing-image-config-control-radio'],
    attributes: {
      name: config_params.name + '[uploads]',
      value: 'custom'
    },
    label: wp.i18n.__('Choose custom storage for posters', 'sharing-image'),
    checked: data.uploads || 'default'
  }, fieldset);
  const input = builders.input({
    classes: ['sharing-image-config-control-input'],
    attributes: {
      name: config_params.name + '[storage]',
      value: data.storage || config_params.links.storage,
      disabled: 'disabled'
    }
  }, control);
  builders.element('small', {
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
  const control = builders.control({
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
  templates.forEach((template, i) => {
    fields[i] = template.title || wp.i18n.__('Untitled', 'sharing-image');
  });
  let selected = data.autogenerate;

  if (typeof selected === 'undefined') {
    selected = 'manual';
  }

  builders.control({
    classes: ['sharing-image-config-control'],
    label: wp.i18n.__('Auto generate poster', 'sharing-image'),
    help: wp.i18n.__('This template will be applied automatically on post save.', 'sharing-image'),
    fields: [{
      group: 'select',
      classes: ['sharing-image-config-control-select'],
      options: fields,
      attributes: {
        name: config_params.name + '[autogenerate]'
      },
      selected: String(selected)
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
  config_params = settings; // Set params name for config form fields.

  config_params.name = 'sharing_image_config'; // Find config element

  const config = content.querySelector('.sharing-image-config');

  if (null === config) {
    return;
  }

  const options = builders.element('form', {
    classes: ['sharing-image-config-options'],
    attributes: {
      action: config_params.links.action,
      method: 'POST'
    },
    append: config
  });
  const data = config_params.config || {};
  const templates = config_params.templates || []; // Poster image options.

  createImageOptions(options, data); // Autogenerate poster.

  createAutogenerateOptions(options, data, templates); // Uploads directory options.

  createUploadsOptions(options, data); // Default poster.

  createDefaultOptions(options, data); // Create required form fields

  createMetaFields(options);
}

/* harmony default export */ const config = (createConfig);
;// CONCATENATED MODULE: ./src/scripts/sections/premium.js
/**
 * Premium settings tab.
 */

/* global ajaxurl:true */
 // Store global scriot object for settings page.

let premium_params = null; // Premium HTML emelent.

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

    premium_params.license = response.data; // Refresh premium fields.

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

    premium_params.license = response.data; // Refresh premium fields.

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

  builders.element('strong', {
    text: wp.i18n.__('Do you already have a key? Enter it here', 'sharing-image'),
    append: access
  });
  const verify = builders.element('div', {
    classes: ['sharing-image-premium-verify'],
    append: access
  });
  builders.element('input', {
    label: wp.i18n.__('Your Premium key', 'sharing-image'),
    attributes: {
      type: 'text',
      name: 'sharing_image_key',
      value: license.key
    },
    append: verify
  });
  builders.element('button', {
    classes: ['button'],
    text: wp.i18n.__('Submit', 'sharing-image'),
    attributes: {
      type: 'submit'
    },
    append: verify
  });
  builders.element('span', {
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
  const revoke = builders.element('div', {
    classes: ['sharing-image-premium-revoke'],
    append: access
  });
  const description = [];
  description.push(wp.i18n.__('Disabling premium mode will not remove the license for this domain.', 'sharing-image'));
  description.push(wp.i18n.__('Your current key will also be saved in the plugin settings.', 'sharing-image'));
  description.push(wp.i18n.__('Use key management tool to delete the license for the site.', 'sharing-image'));
  builders.element('p', {
    text: description.join(' '),
    append: revoke
  });
  builders.element('button', {
    classes: ['button'],
    text: wp.i18n.__('Disable Premium', 'sharing-image'),
    attributes: {
      type: 'submit'
    },
    append: revoke
  });
  builders.element('span', {
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
  const permit = builders.element('div', {
    classes: ['sharing-image-premium-permit'],
    append: access
  });
  const button = builders.element('button', {
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
  builders.element('strong', {
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
  const license = premium_params.license || {}; // Show fields if user has the license.

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

/* harmony default export */ const sections_premium = (createPremium);
;// CONCATENATED MODULE: ./src/scripts/sections/picker.js
/**
 * Metabox handler.
 */

/* global ajaxurl:true */
 // Store global script object for metabox.

let picker_params = null; // Poster HTML element.

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
        const name = picker_params.name + '[' + key + ']';

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
  picker_params.templates.forEach((template, i) => {
    fields[i] = template.title || wp.i18n.__('Untitled', 'sharing-image');
  });
  const template = builders.select({
    classes: ['sharing-image-picker-template'],
    options: fields,
    attributes: {
      name: picker_params.name + '[template]'
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
    link: picker_params.links.uploads,
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


function picker_createDesigner(picker, data) {
  const designer = builders.element('div', {
    classes: ['sharing-image-picker-designer']
  });
  let selected = data.template || 0; // Reset selected template if index undefined.

  if (!picker_params.templates[selected]) {
    selected = 0;
  } // Create designer fields


  picker_params.templates.forEach((template, i) => {
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

    const name = picker_params.name + `[fieldset][${i}]`;
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
 * @param {HTMLElement} picker  Picker element.
 * @param {HTMLElement} manager Manager element.
 */


function picker_createGenerateButton(picker, manager) {
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


function picker_createDeleteButton(manager) {
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
  picker_params = settings; // Set params name for template form fields.

  picker_params.name = 'sharing_image_picker';

  while (widget.firstChild) {
    widget.removeChild(widget.lastChild);
  }

  if ('term' === picker_params.context) {
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
  const data = picker_params.meta || {}; // Create poster block.

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
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_screen',
      value: picker_params.screen
    },
    append: picker
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_context',
      value: picker_params.context
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
;// CONCATENATED MODULE: ./src/scripts/sections/tools.js
/**
 * Tools settings tab.
 */
 // Store global script object for settings page.

let tools_params = null;
/**
 * Create export options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */

function createExportOptions(tools) {
  const control = builders.control({
    classes: ['sharing-image-tools-control'],
    label: wp.i18n.__('Export templates', 'sharing-image'),
    append: tools
  });
  const fieldset = builders.element('div', {
    classes: ['sharing-image-tools-control-fieldset'],
    append: control
  }); // Set template index to delete link.

  const link = new URL(tools_params.links.action);
  link.searchParams.set('action', 'sharing_image_export');
  link.searchParams.set('nonce', tools_params.nonce);
  builders.element('a', {
    classes: ['button', 'button-primary'],
    text: wp.i18n.__('Download backup file', 'sharing-image'),
    attributes: {
      href: link.href
    },
    append: fieldset
  });
  builders.element('small', {
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
  const control = builders.control({
    classes: ['sharing-image-tools-control'],
    label: wp.i18n.__('Import templates', 'sharing-image'),
    append: tools
  });
  const uploader = builders.element('form', {
    classes: ['sharing-image-tools-control-uploader'],
    attributes: {
      action: tools_params.links.action,
      method: 'POST',
      enctype: 'multipart/form-data'
    },
    append: control
  });
  builders.element('input', {
    classes: ['sharing-image-tools-control-file'],
    attributes: {
      type: 'file',
      name: 'sharing_image_import',
      accept: 'application/json',
      required: 'required'
    },
    append: uploader
  });
  builders.element('button', {
    classes: ['button', 'button-primary'],
    attributes: {
      type: 'submit'
    },
    text: wp.i18n.__('Import templates', 'sharing-image'),
    append: uploader
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: 'sharing_image_import'
    },
    append: uploader
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: tools_params.nonce
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
  const templates = tools_params.templates || [];
  const control = builders.control({
    classes: ['sharing-image-tools-control', 'control-section'],
    label: wp.i18n.__('Clone template', 'sharing-image'),
    append: tools
  });
  const warning = builders.element('p', {
    classes: ['sharing-image-tools-warning'],
    text: wp.i18n.__('To initiate cloning, enable Premium and possess a minimum of 1 template.', 'sharing-image')
  });
  const license = tools_params.license || {};

  if (templates.length === 0 || !license.premium && !license.develop) {
    return control.appendChild(warning);
  }

  const fields = {};
  templates.forEach((template, i) => {
    fields[i] = template.title || wp.i18n.__('Untitled', 'sharing-image');
  });
  const cloning = builders.element('form', {
    classes: ['sharing-image-tools-control-cloning'],
    attributes: {
      action: tools_params.links.action,
      method: 'POST'
    },
    append: control
  });
  const select = builders.select({
    classes: ['sharing-image-tools-control-duplicator'],
    options: fields,
    attributes: {
      name: 'sharing_image_clone'
    }
  }, cloning);
  builders.element('button', {
    classes: ['button', 'button-primary'],
    attributes: {
      type: 'submit'
    },
    text: wp.i18n.__('Create a copy', 'sharing-image'),
    append: select.parentNode
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'action',
      value: 'sharing_image_clone'
    },
    append: cloning
  });
  builders.element('input', {
    attributes: {
      type: 'hidden',
      name: 'sharing_image_nonce',
      value: tools_params.nonce
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
  tools_params = settings; // Find tools element

  const tools = content.querySelector('.sharing-image-tools');

  if (null === tools) {
    return;
  } // Cloning options.


  createCloningOptions(tools); // Export options.

  createExportOptions(tools); // Import options.

  createImportOptions(tools);
}

/* harmony default export */ const tools = (createTools);
;// CONCATENATED MODULE: ./src/scripts/sections/index.js






const Section = {
  catalog: catalog,
  editor: sections_editor,
  config: config,
  premium: sections_premium,
  picker: picker,
  tools: tools
};
/* harmony default export */ const sections = (Section);
;// CONCATENATED MODULE: ./src/scripts/settings.js


/**
 * Init premium settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */

function initPremiumTab(content, settings) {
  sections.premium(content, settings);
}
/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initConfigTab(content, settings) {
  sections.config(content, settings);
}
/**
 * Init tools settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */


function initToolsTab(content, settings) {
  sections.tools(content, settings);
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

  if (helpers.param('template')) {
    index = parseInt(helpers.param('template')) - 1;
  }

  const data = settings.templates[index]; // Create editor for existing template.

  if (undefined !== data) {
    return sections.editor(content, settings, index, data);
  } // Create editor for new template.


  if (settings.templates.length === index) {
    return sections.editor(content, settings, index);
  }

  sections.catalog(content, settings);
}
/**
 * Init settings page handler.
 */


(function () {
  if (typeof 'undefined' === wp) {
    return;
  }

  let object = window.sharingImageSettings || {}; // Add default required values to object.

  object = helpers.defaults(object, ['links', 'fonts', 'config', 'templates', 'license']); // Find settings content element.

  const content = document.querySelector('#sharing-image-settings .sharing-image-content');

  if (null === content) {
    return;
  }

  content.classList.add('content-visible');

  switch (helpers.param('tab')) {
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
/******/ })()
;