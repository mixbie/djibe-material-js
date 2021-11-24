/*!
 * Djibe Material v4.6.0-rc.2 (https://djibe.github.io/material/)
 * Copyright 2011-2021 Daemon Pty Ltd + djibe
 * Licensed under MIT (https://github.com/djibe/material/blob/master/LICENSE)
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.material = {}, global.jQuery));
}(this, (function (exports, $) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var $__default = /*#__PURE__*/_interopDefaultLegacy($);

    if (typeof Element !== "undefined") {
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }

        if (!Element.prototype.closest) {
            Element.prototype.closest = function (s) {
                var el = this;

                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);
                
                return null;
            };
        }
    }

    /*
     * Expansion panel plugins expands a collapsed panel in full upon selecting
     */

    var ExpansionPanel = function ($) {
      // constants >>>
      var DATA_KEY = 'bs.collapse';
      var EVENT_KEY = ".".concat(DATA_KEY);
      var ClassName = {
        SHOW: 'show',
        SHOW_PREDECESSOR: 'show-predecessor'
      };
      var Event = {
        HIDE: "hide".concat(EVENT_KEY),
        SHOW: "show".concat(EVENT_KEY)
      };
      var Selector = {
        PANEL: '.expansion-panel',
        PANEL_BODY: '.expansion-panel .collapse'
      }; // <<< constants

      $(document).on("".concat(Event.HIDE), Selector.PANEL_BODY, function () {
        var target = $(this).closest(Selector.PANEL);
        target.removeClass(ClassName.SHOW);
        var predecessor = target.prev(Selector.PANEL);

        if (predecessor.length) {
          predecessor.removeClass(ClassName.SHOW_PREDECESSOR);
        }
      }).on("".concat(Event.SHOW), Selector.PANEL_BODY, function () {
        var target = $(this).closest(Selector.PANEL);
        target.addClass(ClassName.SHOW);
        var predecessor = target.prev(Selector.PANEL);

        if (predecessor.length) {
          predecessor.addClass(ClassName.SHOW_PREDECESSOR);
        }
      });
    }($__default['default']);

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    /*
     * Floating label plugin moves inline label to float above the field
     * when a user engages with the assosciated text input field
     */

    var FloatingLabel = function ($) {
      // constants >>>
      var DATA_KEY = 'md.floatinglabel';
      var EVENT_KEY = ".".concat(DATA_KEY);
      var NAME = 'floatinglabel';
      var NO_CONFLICT = $.fn[NAME];
      var ClassName = {
        IS_FOCUSED: 'is-focused',
        HAS_VALUE: 'has-value'
      };
      var Event = {
        CHANGE: "change".concat(EVENT_KEY),
        FOCUSIN: "focusin".concat(EVENT_KEY),
        FOCUSOUT: "focusout".concat(EVENT_KEY)
      };
      var Selector = {
        DATA_PARENT: '.floating-label',
        DATA_TOGGLE: '.floating-label .custom-select, .floating-label .form-control'
      }; // <<< constants

      var FloatingLabel = /*#__PURE__*/function () {
        function FloatingLabel(element) {
          _classCallCheck(this, FloatingLabel);

          this._element = element;
          this._parent = $(element).closest(Selector.DATA_PARENT)[0];
        }

        _createClass(FloatingLabel, [{
          key: "change",
          value: function change() {
            if ($(this._element).val() || $(this._element).is('select') && $('option:first-child', $(this._element)).html().replace(' ', '') !== '') {
              $(this._parent).addClass(ClassName.HAS_VALUE);
            } else {
              $(this._parent).removeClass(ClassName.HAS_VALUE);
            }
          }
        }, {
          key: "focusin",
          value: function focusin() {
            $(this._parent).addClass(ClassName.IS_FOCUSED);
          }
        }, {
          key: "focusout",
          value: function focusout() {
            $(this._parent).removeClass(ClassName.IS_FOCUSED);
          }
        }], [{
          key: "_jQueryInterface",
          value: function _jQueryInterface(event) {
            return this.each(function () {
              var _event = event ? event : 'change';

              var data = $(this).data(DATA_KEY);

              if (!data) {
                data = new FloatingLabel(this);
                $(this).data(DATA_KEY, data);
              }

              if (typeof _event === 'string') {
                if (typeof data[_event] === 'undefined') {
                  throw new Error("No method named \"".concat(_event, "\""));
                }

                data[_event]();
              }
            });
          }
        }]);

        return FloatingLabel;
      }();

      $(document).on("".concat(Event.CHANGE, " ").concat(Event.FOCUSIN, " ").concat(Event.FOCUSOUT), Selector.DATA_TOGGLE, function (event) {
        FloatingLabel._jQueryInterface.call($(this), event.type);
      });
      $.fn[NAME] = FloatingLabel._jQueryInterface;
      $.fn[NAME].Constructor = FloatingLabel;

      $.fn[NAME].noConflict = function () {
        $.fn[NAME] = NO_CONFLICT;
        return FloatingLabel._jQueryInterface;
      };

      return FloatingLabel;
    }($__default['default']);

    /*
     * Selection control plugin fixes the focus state problem with
     * Chrome persisting focus state on checkboxes/radio buttons after clicking
     */

    var SelectionControlFocus = function ($) {
      // constants >>>
      var DATA_KEY = 'md.selectioncontrolfocus';
      var EVENT_KEY = ".".concat(DATA_KEY);
      var ClassName = {
        FOCUS: 'focus'
      };
      var LastInteraction = {
        IS_MOUSEDOWN: false
      };
      var Event = {
        BLUR: "blur".concat(EVENT_KEY),
        FOCUS: "focus".concat(EVENT_KEY),
        MOUSEDOWN: "mousedown".concat(EVENT_KEY),
        MOUSEUP: "mouseup".concat(EVENT_KEY)
      };
      var Selector = {
        CONTROL: '.custom-control',
        INPUT: '.custom-control-input'
      }; // <<< constants

      $(document).on("".concat(Event.BLUR), Selector.INPUT, function () {
        $(this).removeClass(ClassName.FOCUS);
      }).on("".concat(Event.FOCUS), Selector.INPUT, function () {
        if (LastInteraction.IS_MOUSEDOWN === false) {
          $(this).addClass(ClassName.FOCUS);
        }
      }).on("".concat(Event.MOUSEDOWN), Selector.CONTROL, function () {
        LastInteraction.IS_MOUSEDOWN = true;
      }).on("".concat(Event.MOUSEUP), Selector.CONTROL, function () {
        setTimeout(function () {
          LastInteraction.IS_MOUSEDOWN = false;
        }, 1);
      });
    }($__default['default']);

    /*
     * Global util js
     * Based on Bootstrap's (v4.6.0) `util.js`
     */

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      if (obj === null || typeof obj === 'undefined') {
        return "".concat(obj);
      }

      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($__default['default'](event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined;
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $__default['default'](this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
      $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          var hrefAttr = element.getAttribute('href');
          selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (_) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $__default['default'](element).css('transition-duration');
        var transitionDelay = $__default['default'](element).css('transition-delay');
        var floatTransitionDuration = parseFloat(transitionDuration);
        var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $__default['default'](element).trigger(TRANSITION_END);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error("".concat(componentName.toUpperCase(), ": ") + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
            }
          }
        }
      },
      findShadowRoot: function findShadowRoot(element) {
        if (!document.documentElement.attachShadow) {
          return null;
        } // Can find the shadow root otherwise it'll return the document


        if (typeof element.getRootNode === 'function') {
          var root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }

        if (element instanceof ShadowRoot) {
          return element;
        } // when we don't find a shadow root


        if (!element.parentNode) {
          return null;
        }

        return Util.findShadowRoot(element.parentNode);
      },
      jQueryDetection: function jQueryDetection() {
        if (typeof $__default['default'] === 'undefined') {
          throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
        }

        var version = $__default['default'].fn.jquery.split(' ')[0].split('.');
        var minMajor = 1;
        var ltMajor = 2;
        var minMinor = 9;
        var minPatch = 1;
        var maxMajor = 4;

        if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
          throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
        }
      }
    };
    Util.jQueryDetection();
    setTransitionEndSupport();

    /*
     * Tab indicator animation
     * Requires Bootstrap's (v4.4.X) `tab.js`
     */

    var TabSwitch = function ($) {
      // constants >>>
      var DATA_KEY = 'md.tabswitch';
      var NAME = 'tabswitch';
      var NO_CONFLICT = $.fn[NAME];
      var ClassName = {
        ANIMATE: 'animate',
        DROPDOWN_ITEM: 'dropdown-item',
        INDICATOR: 'nav-tabs-indicator',
        MATERIAL: 'nav-tabs-material',
        SCROLLABLE: 'nav-tabs-scrollable',
        SHOW: 'show'
      };
      var Event = {
        SHOW_BS_TAB: 'show.bs.tab'
      };
      var Selector = {
        DATA_TOGGLE: '.nav-tabs [data-toggle="tab"]',
        DROPDOWN: '.dropdown',
        NAV: '.nav-tabs'
      }; // <<< constants

      var TabSwitch = /*#__PURE__*/function () {
        function TabSwitch(nav) {
          _classCallCheck(this, TabSwitch);

          this._nav = nav;
          this._navindicator = null;
        }

        _createClass(TabSwitch, [{
          key: "switch",
          value: function _switch(element, relatedTarget) {
            var _this = this;

            var navLeft = $(this._nav).offset().left;
            var navScrollLeft = $(this._nav).scrollLeft();
            var navWidth = $(this._nav).outerWidth();

            if (!this._navindicator) {
              this._createIndicator(navLeft, navScrollLeft, navWidth, relatedTarget);
            }

            if ($(element).hasClass(ClassName.DROPDOWN_ITEM)) {
              element = $(element).closest(Selector.DROPDOWN);
            }

            var elLeft = $(element).offset().left;
            var elWidth = $(element).outerWidth();
            $(this._navindicator).addClass(ClassName.SHOW);
            Util.reflow(this._navindicator);
            $(this._nav).addClass(ClassName.ANIMATE);
            $(this._navindicator).css({
              left: elLeft + navScrollLeft - navLeft,
              right: navWidth - (elLeft + navScrollLeft - navLeft + elWidth)
            });

            var complete = function complete() {
              $(_this._nav).removeClass(ClassName.ANIMATE);
              $(_this._navindicator).removeClass(ClassName.SHOW);
            };

            var transitionDuration = Util.getTransitionDurationFromElement(this._navindicator);
            $(this._navindicator).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          }
        }, {
          key: "_createIndicator",
          value: function _createIndicator(navLeft, navScrollLeft, navWidth, relatedTarget) {
            this._navindicator = document.createElement('div');
            $(this._navindicator).addClass(ClassName.INDICATOR).appendTo(this._nav);

            if (typeof relatedTarget !== 'undefined') {
              if ($(relatedTarget).hasClass(ClassName.DROPDOWN_ITEM)) {
                relatedTarget = $(relatedTarget).closest(Selector.DROPDOWN);
              }

              var relatedLeft = $(relatedTarget).offset().left;
              var relatedWidth = $(relatedTarget).outerWidth();
              $(this._navindicator).css({
                left: relatedLeft + navScrollLeft - navLeft,
                right: navWidth - (relatedLeft + navScrollLeft - navLeft + relatedWidth)
              });
            }

            $(this._nav).addClass(ClassName.MATERIAL);
          }
        }], [{
          key: "_jQueryInterface",
          value: function _jQueryInterface(relatedTarget) {
            return this.each(function () {
              var nav = $(this).closest(Selector.NAV)[0];

              if (!nav) {
                return;
              }

              var data = $(nav).data(DATA_KEY);

              if (!data) {
                data = new TabSwitch(nav);
                $(nav).data(DATA_KEY, data);
              }

              data["switch"](this, relatedTarget);
            });
          }
        }]);

        return TabSwitch;
      }();

      $(document).on(Event.SHOW_BS_TAB, Selector.DATA_TOGGLE, function (event) {
        TabSwitch._jQueryInterface.call($(this), event.relatedTarget);
      });
      $.fn[NAME] = TabSwitch._jQueryInterface;
      $.fn[NAME].Constructor = TabSwitch;

      $.fn[NAME].noConflict = function () {
        $.fn[NAME] = NO_CONFLICT;
        return TabSwitch._jQueryInterface;
      };

      return TabSwitch;
    }($__default['default']);

    exports.ExpansionPanel = ExpansionPanel;
    exports.FloatingLabel = FloatingLabel;
    exports.SelectionControlFocus = SelectionControlFocus;
    exports.TabSwitch = TabSwitch;
    exports.Util = Util;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material.js.map
