"use strict";

/**
 * Settings script handler.
 */
(function () {
  if ('undefined' === typeof wp) {
    return;
  }

  var __ = wp.i18n.__; // Find root settings element.

  var screen = document.getElementById('sharing-image-settings');

  if (null === screen) {
    return;
  }
  /**
   * Parse JSON if valid, otherwise return def value.
   *
   * @param {string} input JSON input string to parse
   * @param {Object|Array|null} fail Default value on fail.
   */


  function parseJSON(input) {
    var fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    try {
      return JSON.parse(input);
    } catch (e) {
      return fail;
    }
  }
  /**
   * Get current location search parameter.
   *
   * @param {string} key URL parameter key.
   */


  function getSearchParam(key) {
    var params = new URL(document.location.href);
    return params.searchParams.get(key);
  }
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
        element.setAttribute(key, args.attributes[key]);
      }
    } // Append child


    if (args.hasOwnProperty('parent')) {
      args.parent.appendChild(element);
    }

    return element;
  }
  /**
   * Create poster card in catalog.
   *
   * @param {HTMLElement} catalog Catalog HTML element.
   * @param {number} index Current card index.
   * @param {Object} option List of poster options.
   */


  function createPosterCard(catalog, index, option) {
    var card = buildElement('div', {
      classes: ['sharing-image-card'],
      parent: catalog
    });
    var cover = buildElement('figure', {
      classes: ['sharing-image-cover'],
      parent: card
    });
    cover.classList.add('blank');
    var footer = buildElement('footer', {
      classes: ['sharing-image-footer'],
      parent: card
    });
    buildElement('h2', {
      text: option.title || __('Untitled', 'sharing-image'),
      parent: footer
    });
    var link = new URL(document.location.href);
    link.searchParams.set('poster', index);
    buildElement('a', {
      classes: ['button'],
      text: __('Edit poster', 'sharing-image'),
      attributes: {
        href: link
      },
      parent: footer
    });
  }
  /**
   * Create append new poster button in catalog.
   *
   * @param {HTMLElement} catalog Catalog HTML element.
   * @param {number} index New card index.
   */


  function createPosterNew(catalog, index) {
    var link = new URL(document.location.href);
    link.searchParams.set('poster', index);
    var button = buildElement('a', {
      classes: ['sharing-image-new'],
      attributes: {
        href: link
      },
      parent: catalog
    });
    buildElement('h2', {
      text: __('Add new template', 'sharing-image'),
      parent: button
    });
  }
  /**
   * Create posters catalog from options.
   *
   * @param {HTMLElement} wrapper Settings wrapper element.
   * @param {string} options Posters options from storage field.
   */


  function createPostersCatalog(wrapper, options) {
    var catalog = buildElement('div', {
      classes: ['sharing-image-catalog'],
      parent: wrapper
    });
    var index = 1;
    options.forEach(function (option) {
      createPosterCard(catalog, index++, option);
    });
    createPosterNew(catalog, index);
  }
  /**
   * Init config settings tab.
   */


  function initConfigTab() {}
  /**
   * Init premium settings tab.
   */


  function initPremiumTab() {}
  /**
   * Init config settings tab.
   */


  function initPostersTab() {
    var posters = screen.querySelector('.sharing-image-posters');

    if (null === posters) {
      return;
    }

    var storage = posters.querySelector('textarea');

    if (null === storage) {
      return;
    }

    var index = getSearchParam('poster'); // Try to parse storage value.

    var options = parseJSON(storage.value, []);

    if (options[index - 1]) {
      return console.log('show page with id', index);
    }

    return createPostersCatalog(posters.parentElement, options);
  }
  /**
   * Route settings by url parameter.
   */


  var routeSettings = function routeSettings() {
    var tab = getSearchParam('tab');

    if ('config' === tab) {
      return initConfigTab();
    }

    if ('premium' === tab) {
      return initPremiumTab();
    }

    return initPostersTab();
  };

  routeSettings();
})();