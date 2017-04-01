/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 83);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = module.exports = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (isDocument(element) && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        isSimple && !maybeID ?
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this[0].textContent : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (!this.length || this[0].nodeType !== 1 ? undefined :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return 0 in arguments ?
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        }) :
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        )
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var computedStyle, element = this[0]
        if(!element) return
        computedStyle = getComputedStyle(element, '')
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var name, type, result = [],
      add = function(value) {
        if (value.forEach) return value.forEach(add)
        result.push({ name: name, value: value })
      }
    if (this[0]) $.each(this[0].elements, function(_, field){
      type = field.type, name = field.name
      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
        ((type != 'radio' && type != 'checkbox') || field.checked))
          add($(field).val())
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (0 in arguments) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($){
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function(dom, selector){
        dom = dom || []
        $.extend(dom, $.fn)
        dom.selector = selector || ''
        dom.__Z = true
        return dom
      },
      // this is a kludge but works
      isZ: function(object){
        return $.type(object) === 'array' && '__Z' in object
      }
    })
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element){
      try {
        return nativeGetComputedStyle(element)
      } catch(e) {
        return null
      }
    }
  }
})(Zepto)

/***/ },
/* 1 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 2 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ },
/* 3 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
    var Interface = __webpack_require__(27);
    var MD5 = __webpack_require__(28);
    var options = {
        debug: false
    };
    var pageInitFunc;
    var setPageInit = function setPageInit(func) {
        pageInitFunc = func;
    };
    exports.setPageInit = setPageInit;
    var pageInit = function pageInit() {
        if (window.setTokenFlag) {
            pageInitFunc();
        } else {
            window.setTimeout(function () {
                pageInit();
            }, 200);
        }
    };
    exports.pageInit = pageInit;
    var PushNextPage = function PushNextPage(route, path) {
        var appFunc;
        try {
            appFunc = JSON.parse(localStorage['appFunc']);
            if (appFunc && appFunc.indexOf('APPWebView') != -1) {
                window.location.href = 'baoxiang://APPWebView?openUrl=' + encodeURIComponent("http://" + window.location.host + '/m/financial/#' + path);
            } else {
                route.push(path);
            }
        } catch (r) {
            appFunc = sessionStorage['appFunc'] && JSON.parse(sessionStorage['appFunc']);
            if (appFunc && appFunc.indexOf('APPWebView') != -1) {
                window.location.href = 'baoxiang://APPWebView?openUrl=' + encodeURIComponent("http://" + window.location.host + '/m/financial/#' + path);
            } else {
                route.push(path);
            }
        }
    };
    var AppJump = function AppJump(url) {
        try {
            var appFunc = JSON.parse(localStorage['appFunc']);
            if (appFunc && appFunc.indexOf('APPWebView') != -1) {
                window.location.href = 'baoxiang://APPWebView?openUrl=' + encodeURIComponent(url);
            } else {
                window.location.href = url;
            }
        } catch (r) {
            appFunc = sessionStorage['appFunc'] && JSON.parse(sessionStorage['appFunc']);
            if (appFunc && appFunc.indexOf('APPWebView') != -1) {
                window.location.href = 'baoxiang://APPWebView?openUrl=' + encodeURIComponent(url);
            } else {
                window.location.href = url;
            }
        }
    };

    exports.AppJump = AppJump;
    exports.PushNextPage = PushNextPage;
    var Auth = {
        get: function get() {
            var result = {};
            try {
                result = JSON.parse(localStorage['persion']);
            } catch (r) {
                result = sessionStorage['persion'] && JSON.parse(sessionStorage['persion']);
            }
            if ("object" === (typeof result === "undefined" ? "undefined" : _typeof(result))) {
                return result['accessToken'];
            }
            return 0;
        },
        set: function set(_user) {
            try {
                window.setTokenFlag = true;
                localStorage['persion'] = JSON.stringify(_user);
            } catch (r) {
                sessionStorage['persion'] = JSON.stringify(_user);
            }
        },
        remove: function remove() {
            try {
                localStorage.removeItem('persion');
            } catch (r) {
                sessionStorage.removeItem('persion');
            }
        }
    };
    exports.Auth = Auth;
    var API_GET = function API_GET(config) {
        var data = config['data'] || {};
        config['success'] = config['success'] || function () {};
        config['fail'] = function (response) {
            if (/重新登录/.test(response.message)) {
                Auth.remove();
            }
        };
        var _config = {
            'API_KEY': Auth.get(),
            'SECRET': 'UYGGYG876T6759HUHI975T7GGKJO9786456EDC08'
        };

        var param = function param(obj) {
            var newobj = { 'api_key': _config['API_KEY'], 'ct': 1, 'bt': 2 },
                tmparr = ['api_key', 'ct', 'bt'],
                query = [],
                name,
                value,
                subName,
                querytext;

            for (name in obj) {
                tmparr.push(name);
                newobj[name] = obj[name];
            }
            tmparr.sort();

            for (var i = 0, len = tmparr.length; i < len; i++) {
                name = tmparr[i];
                value = newobj[name];
                if (value instanceof Array) {
                    value = value.join(',');
                } else if (value instanceof Object) {
                    for (subName in value) {
                        value = value[subName];
                        break;
                    }
                }
                if (value !== undefined && value !== null) {
                    query.push(name + '=' + value);
                }
            }
            querytext = _config['SECRET'] + query.join('').split('=').join('');
            return query.join('&') + '&sign=' + MD5.MD5(querytext).toUpperCase();
        };

        $.ajax({
            type: 'POST',
            url: Interface.Model[config['url']],
            data: String(data) == '[object Object]' ? param(data) : data,
            dataType: 'json',
            success: function success(response) {
                if (response.data == null) {
                    response.data = [];
                }

                config['success'](response);
                if (response.isSuccess == false) {
                    if (response.message.indexOf('您不是专职理财师') > -1) {
                        window.location.href = "baoxiang://APPMyWealth";
                    }
                    config['fail'](response);
                }
            },
            error: config['error']
        });
    };
    exports.API_GET = API_GET;

    if (options.debug && !/.com/.test(location.host) && Auth.get() == 0) {
        setTimeout(function () {
            var str1 = prompt('请输入用户名', '');
            var str2 = prompt('请输入密码', '');
            if (str1 && str2) {
                API_GET({
                    url: 'loginOn',
                    data: { username: str1, password: str2 },
                    success: function success(result) {
                        if (result.isSuccess) {
                            Auth.set(result.data);
                        } else {
                            alert(result.message);
                        }
                    }
                });
            }
        }, 0);
    }
    var jumpApp = function jumpApp(response) {
        try {
            localStorage.setItem('appFunc', JSON.stringify(response));
        } catch (r) {
            sessionStorage.setItem('appFunc', JSON.stringify(response));
        }
    };
    window.setToken = function (accessToken) {

        Auth.set({ "accessToken": accessToken });
    };
}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _customer = __webpack_require__(56);

var _customer2 = _interopRequireDefault(_customer);

var _client = __webpack_require__(54);

var _client2 = _interopRequireDefault(_client);

var _sales = __webpack_require__(60);

var _sales2 = _interopRequireDefault(_sales);

var _my = __webpack_require__(58);

var _my2 = _interopRequireDefault(_my);

var _payment = __webpack_require__(59);

var _payment2 = _interopRequireDefault(_payment);

var _contacts = __webpack_require__(55);

var _contacts2 = _interopRequireDefault(_contacts);

var _birthday = __webpack_require__(48);

var _birthday2 = _interopRequireDefault(_birthday);

var _brisk = __webpack_require__(49);

var _brisk2 = _interopRequireDefault(_brisk);

var _brisk_doc = __webpack_require__(50);

var _brisk_doc2 = _interopRequireDefault(_brisk_doc);

var _brisk_sec = __webpack_require__(53);

var _brisk_sec2 = _interopRequireDefault(_brisk_sec);

var _brisk_list = __webpack_require__(51);

var _brisk_list2 = _interopRequireDefault(_brisk_list);

var _memberGrade = __webpack_require__(57);

var _memberGrade2 = _interopRequireDefault(_memberGrade);

var _brisk_protocol = __webpack_require__(52);

var _brisk_protocol2 = _interopRequireDefault(_brisk_protocol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerOption = {

    base: __dirname,
    routes: [{
        path: '/customer',
        component: _customer2.default
    }, {
        path: '/track/:id',
        component: track
    }, {
        path: '/track',
        component: track
    }, {
        path: '/client',
        component: _client2.default
    }, {
        path: '/sales',
        component: _sales2.default
    }, {
        path: '/my',
        component: _my2.default
    }, {
        path: '/payment',
        component: _payment2.default
    }, {
        path: '/contacts',
        component: _contacts2.default
    }, {
        path: '/birthday',
        component: _birthday2.default
    }, {
        path: '/brisk',
        component: _brisk2.default,
        children: [{
            path: 'doc',
            component: _brisk_doc2.default
        }, {
            path: 'sec',
            component: _brisk_sec2.default
        }, {
            path: 'list',
            component: _brisk_list2.default
        }]

    }, {
        path: '/memberGrade',
        component: _memberGrade2.default
    }, {
        path: '/team/:id',
        component: team,
        children: [{ path: '/team', component: team }]
    }, {
        path: "/protocol",
        component: _brisk_protocol2.default
    }]
};
exports.default = routerOption;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(45)

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(77)
__webpack_require__(78)

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(61)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1", __vue_options__)
  } else {
    hotAPI.reload("data-v-1", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] App.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
/*!
 * vue-resource v1.0.3
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

'use strict';

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0,
            result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return Promise.reject(reason);
    });
};

/**
 * Utility functions.
 */

var debug = false;var util = {};var slice = [].slice;


function Util (Vue) {
    util = Vue.util;
    debug = Vue.config.debug || !Vue.config.silent;
}

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}

function isBoolean(val) {
    return val === true || val === false;
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (obj && typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

function root (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}

/**
 * Query Parameter Transform.
 */

function query (options, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options);

    each(options.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function (context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

function template (options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

var ie = document.documentMode;
var el = document.createElement('a');

function Url(url, params) {

    var self = this || {},
        options = url,
        transform;

    if (isString(url)) {
        options = { url: url, params: params };
    }

    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options) {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

function xdrClient (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(),
            handler = function (_ref) {
            var type = _ref.type;


            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, { status: status }));
        };

        request.abort = function () {
            return xdr.abort();
        };

        xdr.open(request.method, request.getUrl());
        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
}

/**
 * CORS Interceptor.
 */

var ORIGIN_URL = Url.parse(location.href);
var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

function cors (request, next) {

    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
        request.crossOrigin = true;
    }

    if (request.crossOrigin) {

        if (!SUPPORTS_CORS) {
            request.client = xdrClient;
        }

        delete request.emulateHTTP;
    }

    next();
}

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
}

/**
 * Body Interceptor.
 */

function body (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');
    } else if (isObject(request.body) || isArray(request.body)) {

        if (request.emulateJSON) {
            request.body = Url.params(request.body);
            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            request.body = JSON.stringify(request.body);
        }
    }

    next(function (response) {

        Object.defineProperty(response, 'data', {
            get: function () {
                return this.body;
            },
            set: function (body) {
                this.body = body;
            }
        });

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type');

            if (isString(type) && type.indexOf('application/json') === 0) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }
            } else {
                response.body = text;
            }

            return response;
        }) : response;
    });
}

/**
 * JSONP client.
 */

function jsonpClient (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback',
            callback = '_jsonp' + Math.random().toString(36).substr(2),
            body = null,
            handler,
            script;

        handler = function (_ref) {
            var type = _ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(body, { status: status }));

            delete window[callback];
            document.body.removeChild(script);
        };

        request.params[name] = callback;

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

/**
 * JSONP Interceptor.
 */

function jsonp (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next(function (response) {

        if (request.method == 'JSONP') {

            return when(response.json(), function (json) {

                response.body = json;

                return response;
            });
        }
    });
}

/**
 * Before Interceptor.
 */

function before (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
}

/**
 * HTTP method override Interceptor.
 */

function method (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
}

/**
 * Header Interceptor.
 */

function header (request, next) {

    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
}

/**
 * Timeout Interceptor.
 */

function timeout (request, next) {

    var timeout;

    if (request.timeout) {
        timeout = setTimeout(function () {
            request.abort();
        }, request.timeout);
    }

    next(function (response) {

        clearTimeout(timeout);
    });
}

/**
 * XMLHttp client.
 */

function xhrClient (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(),
            handler = function (event) {

            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
            });

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () {
            return xhr.abort();
        };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if ('responseType' in xhr) {
            xhr.responseType = 'blob';
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onerror = handler;
        xhr.send(request.getBody());
    });
}

/**
 * Base client.
 */

function Client (context) {

    var reqHandlers = [sendRequest],
        resHandlers = [],
        handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);
                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        });
                    });

                    when(response, resolve);

                    return;
                }

                exec();
            }

            exec();
        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
}

function sendRequest(request, resolve) {

    var client = request.client || xhrClient;

    resolve(client(request));
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * HTTP Headers.
 */

var Headers = function () {
    function Headers(headers) {
        var _this = this;

        classCallCheck(this, Headers);


        this.map = {};

        each(headers, function (value, name) {
            return _this.append(name, value);
        });
    }

    Headers.prototype.has = function has(name) {
        return getName(this.map, name) !== null;
    };

    Headers.prototype.get = function get(name) {

        var list = this.map[getName(this.map, name)];

        return list ? list[0] : null;
    };

    Headers.prototype.getAll = function getAll(name) {
        return this.map[getName(this.map, name)] || [];
    };

    Headers.prototype.set = function set(name, value) {
        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
    };

    Headers.prototype.append = function append(name, value) {

        var list = this.getAll(name);

        if (list.length) {
            list.push(trim(value));
        } else {
            this.set(name, value);
        }
    };

    Headers.prototype.delete = function _delete(name) {
        delete this.map[getName(this.map, name)];
    };

    Headers.prototype.forEach = function forEach(callback, thisArg) {
        var _this2 = this;

        each(this.map, function (list, name) {
            each(list, function (value) {
                return callback.call(thisArg, value, name, _this2);
            });
        });
    };

    return Headers;
}();

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function () {
    function Response(body, _ref) {
        var url = _ref.url;
        var headers = _ref.headers;
        var status = _ref.status;
        var statusText = _ref.statusText;
        classCallCheck(this, Response);


        this.url = url;
        this.ok = status >= 200 && status < 300;
        this.status = status || 0;
        this.statusText = statusText || '';
        this.headers = new Headers(headers);
        this.body = body;

        if (isString(body)) {

            this.bodyText = body;
        } else if (isBlob(body)) {

            this.bodyBlob = body;

            if (isBlobText(body)) {
                this.bodyText = blobText(body);
            }
        }
    }

    Response.prototype.blob = function blob() {
        return when(this.bodyBlob);
    };

    Response.prototype.text = function text() {
        return when(this.bodyText);
    };

    Response.prototype.json = function json() {
        return when(this.text(), function (text) {
            return JSON.parse(text);
        });
    };

    return Response;
}();

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };
    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function () {
    function Request(options) {
        classCallCheck(this, Request);


        this.body = null;
        this.params = {};

        assign(this, options, {
            method: toUpper(options.method || 'GET')
        });

        if (!(this.headers instanceof Headers)) {
            this.headers = new Headers(this.headers);
        }
    }

    Request.prototype.getUrl = function getUrl() {
        return Url(this);
    };

    Request.prototype.getBody = function getBody() {
        return this.body;
    };

    Request.prototype.respondWith = function respondWith(body, options) {
        return new Response(body, assign(options || {}, { url: this.getUrl() }));
    };

    return Request;
}();

/**
 * Service for sending network requests.
 */

var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

function Http(options) {

    var self = this || {},
        client = Client(self.$vm);

    defaults(options || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {
        client.use(handler);
    });

    return client(new Request(options)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    custom: CUSTOM_HEADERS,
    common: COMMON_HEADERS
};

Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, options) {
        return this(assign(options || {}, { url: url, method: method }));
    };
});

['post', 'put', 'patch'].forEach(function (method) {

    Http[method] = function (url, body, options) {
        return this(assign(options || {}, { url: url, method: method, body: body }));
    };
});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options) {

    var self = this || {},
        resource = {};

    actions = assign({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: assign({}, params) }, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options = assign({}, action),
        params = {},
        body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
    }

    options.body = body;
    options.params = assign({}, options.params, params);

    return options;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function () {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function () {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function () {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function () {
                var _this = this;

                return function (executor) {
                    return new Vue.Promise(executor, _this);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.1.1
  * (c) 2016 Evan You
  * @license MIT
  */
'use strict';

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true

    var route = parent.$route
    var cache = parent._routerViewCache || (parent._routerViewCache = {})
    var depth = 0
    var inactive = false

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      if (parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }

    data.routerViewDepth = depth
    var matched = route.matched[depth]
    if (!matched) {
      return h()
    }

    var name = props.name
    var component = inactive
      ? cache[name]
      : (cache[name] = matched.components[name])

    if (!inactive) {
      var hooks = data.hook || (data.hook = {})
      hooks.init = function (vnode) {
        matched.instances[name] = vnode.child
      }
      hooks.prepatch = function (oldVnode, vnode) {
        matched.instances[name] = vnode.child
      }
      hooks.destroy = function (vnode) {
        if (matched.instances[name] === vnode.child) {
          matched.instances[name] = undefined
        }
      }
    }

    return h(component, data, children)
  }
}

/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
  }
}

/*  */

var encode = encodeURIComponent
var decode = decodeURIComponent

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery
    try {
      parsedQuery = parseQuery(query)
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message)
      parsedQuery = {}
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key]
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=')
    var key = decode(parts.shift())
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key]

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = []
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key))
        } else {
          result.push(encode(key) + '=' + encode(val2))
        }
      })
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null
  return res ? ("?" + res) : ''
}

/*  */

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom)
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
})

function formatMatch (record) {
  var res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

var trailingSlashRE = /\/$/
function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a)
  var bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.indexOf(target.path.replace(/\/$/, '')) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object]

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: [String, Array],
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router
    var current = this.$route
    var ref = router.resolve(this.to, current, this.append);
    var normalizedTo = ref.normalizedTo;
    var resolved = ref.resolved;
    var href = ref.href;
    var classes = {}
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
    var compareTarget = normalizedTo.path ? createRoute(null, normalizedTo) : resolved
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget)

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(normalizedTo)
        } else {
          router.push(normalizedTo)
        }
      }
    }

    var on = { click: guardEvent }
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler })
    } else {
      on[this.event] = handler
    }

    var data = {
      class: classes
    }

    if (this.tag === 'a') {
      data.on = on
      data.attrs = { href: href }
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default)
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false
        var extend = _Vue.util.extend
        var aData = a.data = extend({}, a.data)
        aData.on = on
        var aAttrs = a.data.attrs = extend({}, a.data.attrs)
        aAttrs.href = href
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function guardEvent (e) {
  // don't redirect with control keys
  /* istanbul ignore if */
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  /* istanbul ignore if */
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  /* istanbul ignore if */
  if (e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  /* istanbul ignore if */
  var target = e.target.getAttribute('target')
  if (/\b_blank\b/i.test(target)) { return }

  e.preventDefault()
  return true
}

function findAnchor (children) {
  if (children) {
    var child
    for (var i = 0; i < children.length; i++) {
      child = children[i]
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue

function install (Vue) {
  if (install.installed) { return }
  install.installed = true

  _Vue = Vue

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get$1 () { return this.$root._route }
  })

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
    }
  })

  Vue.component('router-view', View)
  Vue.component('router-link', Link)

  var strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/')
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i]
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop()
    } else {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = ''
  var query = ''

  var hashIndex = path.indexOf('#')
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex)
    path = path.slice(0, hashIndex)
  }

  var queryIndex = path.indexOf('?')
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1)
    path = path.slice(0, queryIndex)
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (routes) {
  var pathMap = Object.create(null)
  var nameMap = Object.create(null)

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route)
  })

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.")
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    )
  }

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {}
  }

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(false, ("Named Route '" + (route.name) + "' has a default child route.\n          When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), the default child route will not be rendered.\n          Remove the name from this route and use the name of the default child route for named links instead.")
        )
      }
    }
    route.children.forEach(function (child) {
      addRouteRecord(pathMap, nameMap, child, record)
    })
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
      })
    } else {
      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record
  }
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, ("Duplicate named routes definition: { name: \"" + name + "\", path: \"" + (record.path) + "\" }"))
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '')
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var __moduleExports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = __moduleExports

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp
var parse_1 = parse
var compile_1 = compile
var tokensToFunction_1 = tokensToFunction
var tokensToRegExp_1 = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null)

function getRouteRegex (path) {
  var hit = regexpCache[path]
  var keys, regexp

  if (hit) {
    keys = hit.keys
    regexp = hit.regexp
  } else {
    keys = []
    regexp = index(path, keys)
    regexpCache[path] = { keys: keys, regexp: regexp }
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null)

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path))
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)))
    }
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next)
    next._normalized = true
    var params = assign(assign({}, current.params), next.params)
    if (current.name) {
      next.name = current.name
      next.params = params
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path
      next.path = fillParams(rawPath, params, ("path " + (current.path)))
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.")
    }
    return next
  }

  var parsedPath = parsePath(next.path || '')
  var basePath = (current && current.path) || '/'
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/'
  var query = resolveQuery(parsedPath.query, next.query)
  var hash = next.hash || parsedPath.hash
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key]
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute)
    var name = location.name;

    if (name) {
      var record = nameMap[name]
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; })

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {}
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect

    if (typeof redirect === 'string') {
      redirect = { path: redirect }
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      )
      return _createRoute(null, location)
    }

    var re = redirect
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query
    hash = re.hasOwnProperty('hash') ? re.hash : hash
    params = re.hasOwnProperty('params') ? re.params : params

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record)
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    })
    if (aliasedMatch) {
      var matched = aliasedMatch.matched
      var aliasedRecord = matched[matched.length - 1]
      location.params = aliasedMatch.params
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return match
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp)

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1]
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
    if (key) { params[key.name] = val }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

var inBrowser = typeof window !== 'undefined'

var supportsHistory = inBrowser && (function () {
  var ua = window.navigator.userAgent

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})()

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}

/*  */


var History = function History (router, base) {
  this.router = router
  this.base = normalizeBase(base)
  // start with a route object that stands for "nowhere"
  this.current = START
  this.pending = null
};

History.prototype.listen = function listen (cb) {
  this.cb = cb
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current)
  this.confirmTransition(route, function () {
    this$1.updateRoute(route)
    onComplete && onComplete(route)
    this$1.ensureURL()
  }, onAbort)
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current
  var abort = function () { onAbort && onAbort() }
  if (isSameRoute(route, current)) {
    this.ensureURL()
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  )

  this.pending = route
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true)
        abort()
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to)
        abort()
      } else {
        // confirm transition and pass on the value
        next(to)
      }
    })
  }

  runQueue(queue, iterator, function () {
    var postEnterCbs = []
    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
      return this$1.current === route
    })
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null
      onComplete(route)
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); })
        })
      }
    })
  })
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current
  this.current = route
  this.cb && this.cb(route)
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev)
  })
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base')
      base = baseEl ? baseEl.getAttribute('href') : '/'
    } else {
      base = '/'
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i
  var max = Math.max(current.length, next.length)
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def)
  }
  return def.options[key]
}

function extractLeaveGuards (matched) {
  return flatten(flatMapComponents(matched, function (def, instance) {
    var guard = extractGuard(def, 'beforeRouteLeave')
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return wrapLeaveGuard(guard, instance); })
        : wrapLeaveGuard(guard, instance)
    }
  }).reverse())
}

function wrapLeaveGuard (
  guard,
  instance
) {
  return function routeLeaveGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  matched,
  cbs,
  isValid
) {
  return flatten(flatMapComponents(matched, function (def, _, match, key) {
    var guard = extractGuard(def, 'beforeRouteEnter')
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return wrapEnterGuard(guard, cbs, match, key, isValid); })
        : wrapEnterGuard(guard, cbs, match, key, isValid)
    }
  }))
}

function wrapEnterGuard (
  guard,
  cbs,
  match,
  key,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb)
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid)
        })
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key])
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid)
    }, 16)
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = function (resolvedDef) {
          match.components[key] = resolvedDef
          next()
        }

        var reject = function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason))
          next(false)
        }

        var res = def(resolve, reject)
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject)
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

/*  */

var positionStore = Object.create(null)

function saveScrollPosition (key) {
  if (!key) { return }
  positionStore[key] = {
    x: window.pageXOffset,
    y: window.pageYOffset
  }
}

function getScrollPosition (key) {
  if (!key) { return }
  return positionStore[key]
}

function getElementPosition (el) {
  var docRect = document.documentElement.getBoundingClientRect()
  var elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */


var genKey = function () { return String(Date.now()); }
var _key = genKey()

var HTML5History = (function (History) {
  function HTML5History (router, base) {
    var this$1 = this;

    History.call(this, router, base)

    var expectScroll = router.options.scrollBehavior
    window.addEventListener('popstate', function (e) {
      _key = e.state && e.state.key
      var current = this$1.current
      this$1.transitionTo(getLocation(this$1.base), function (next) {
        if (expectScroll) {
          this$1.handleScroll(next, current, true)
        }
      })
    })

    if (expectScroll) {
      window.addEventListener('scroll', function () {
        saveScrollPosition(_key)
      })
    }
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n)
  };

  HTML5History.prototype.push = function push (location) {
    var this$1 = this;

    var current = this.current
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath))
      this$1.handleScroll(route, current, false)
    })
  };

  HTML5History.prototype.replace = function replace (location) {
    var this$1 = this;

    var current = this.current
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath))
      this$1.handleScroll(route, current, false)
    })
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath)
      push ? pushState(current) : replaceState(current)
    }
  };

  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
    var router = this.router
    if (!router.app) {
      return
    }

    var behavior = router.options.scrollBehavior
    if (!behavior) {
      return
    }
    if (process.env.NODE_ENV !== 'production') {
      assert(typeof behavior === 'function', "scrollBehavior must be a function")
    }

    // wait until re-render finishes before scrolling
    router.app.$nextTick(function () {
      var position = getScrollPosition(_key)
      var shouldScroll = behavior(to, from, isPop ? position : null)
      if (!shouldScroll) {
        return
      }
      var isObject = typeof shouldScroll === 'object'
      if (isObject && typeof shouldScroll.selector === 'string') {
        var el = document.querySelector(shouldScroll.selector)
        if (el) {
          position = getElementPosition(el)
        } else if (isValidPosition(shouldScroll)) {
          position = normalizePosition(shouldScroll)
        }
      } else if (isObject && isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll)
      }

      if (position) {
        window.scrollTo(position.x, position.y)
      }
    })
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}

function pushState (url, replace) {
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url)
    } else {
      _key = genKey()
      history.pushState({ key: _key }, '', url)
    }
    saveScrollPosition(_key)
  } catch (e) {
    window.location[replace ? 'assign' : 'replace'](url)
  }
}

function replaceState (url) {
  pushState(url, true)
}

/*  */


var HashHistory = (function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base)
    // check history fallback deeplinking
    if (fallback && this.checkFallback()) {
      return
    }
    ensureSlash()
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  HashHistory.prototype.checkFallback = function checkFallback () {
    var location = getLocation(this.base)
    if (!/^\/#/.test(location)) {
      window.location.replace(
        cleanPath(this.base + '/#' + location)
      )
      return true
    }
  };

  HashHistory.prototype.onHashChange = function onHashChange () {
    if (!ensureSlash()) {
      return
    }
    this.transitionTo(getHash(), function (route) {
      replaceHash(route.fullPath)
    })
  };

  HashHistory.prototype.push = function push (location) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath)
    })
  };

  HashHistory.prototype.replace = function replace (location) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath)
    })
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n)
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current)
    }
  };

  return HashHistory;
}(History));

function ensureSlash () {
  var path = getHash()
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path)
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href
  var index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}

/*  */


var AbstractHistory = (function (History) {
  function AbstractHistory (router) {
    History.call(this, router)
    this.stack = []
    this.index = -1
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
      this$1.index++
    })
  };

  AbstractHistory.prototype.replace = function replace (location) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
    })
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex]
    this.confirmTransition(route, function () {
      this$1.index = targetIndex
      this$1.updateRoute(route)
    })
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null
  this.options = options
  this.beforeHooks = []
  this.afterHooks = []
  this.match = createMatcher(options.routes || [])

  var mode = options.mode || 'hash'
  this.fallback = mode === 'history' && !supportsHistory
  if (this.fallback) {
    mode = 'hash'
  }
  if (!inBrowser) {
    mode = 'abstract'
  }
  this.mode = mode

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this)
      break
    default:
      process.env.NODE_ENV !== 'production' && assert(false, ("invalid mode: " + mode))
  }
};

var prototypeAccessors = { currentRoute: {} };

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  )

  this.app = app

  var history = this.history

  if (history instanceof HTML5History) {
    history.transitionTo(getLocation(history.base))
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      window.addEventListener('hashchange', function () {
        history.onHashChange()
      })
    }
    history.transitionTo(getHash(), setupHashListener, setupHashListener)
  }

  history.listen(function (route) {
    this$1.app._route = route
  })
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn)
};

VueRouter.prototype.push = function push (location) {
  this.history.push(location)
};

VueRouter.prototype.replace = function replace (location) {
  this.history.replace(location)
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n)
};

VueRouter.prototype.back = function back () {
  this.go(-1)
};

VueRouter.prototype.forward = function forward () {
  this.go(1)
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).resolved
    : this.currentRoute
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var normalizedTo = normalizeLocation(to, current || this.history.current, append)
  var resolved = this.match(normalizedTo, current)
  var fullPath = resolved.redirectedFrom || resolved.fullPath
  var base = this.history.base
  var href = createHref(base, fullPath, this.mode)
  return {
    normalizedTo: normalizedTo,
    resolved: resolved,
    href: href
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}

module.exports = VueRouter;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.1.6
 * (c) 2014-2016 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val, 10);
  return (n || n === 0) ? n : val
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind$1 (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (
    isObject(a) && isObject(b)
      ? JSON.stringify(a) === JSON.stringify(b)
      : false
  )
  /* eslint-enable eqeqeq */
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: null,

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set$1 (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set$1(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and param attributes are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isBooleanType(prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm[key] !== undefined) {
    return vm[key]
  }
  // call factory function for non-Function types
  return typeof def === 'function' && prop.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isBooleanType (fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === 'Boolean'
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === 'Boolean') {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}



var util = Object.freeze({
	defineReactive: defineReactive$$1,
	_toString: _toString,
	toNumber: toNumber,
	makeMap: makeMap,
	isBuiltInTag: isBuiltInTag,
	remove: remove$1,
	hasOwn: hasOwn,
	isPrimitive: isPrimitive,
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	bind: bind$1,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	toObject: toObject,
	noop: noop,
	no: no,
	identity: identity,
	genStaticKeys: genStaticKeys,
	looseEqual: looseEqual,
	looseIndexOf: looseIndexOf,
	isReserved: isReserved,
	def: def,
	parsePath: parsePath,
	hasProto: hasProto,
	inBrowser: inBrowser,
	UA: UA,
	isIE: isIE,
	isIE9: isIE9,
	isEdge: isEdge,
	isAndroid: isAndroid,
	isIOS: isIOS,
	isServerRendering: isServerRendering,
	devtools: devtools,
	nextTick: nextTick,
	get _Set () { return _Set; },
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	get warn () { return warn; },
	get formatComponentName () { return formatComponentName; },
	validateProp: validateProp
});

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */


var queue = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has$1 = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    var watcher = queue[index];
    var id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  if ( options === void 0 ) options = {};

  this.vm = vm;
  vm._watchers.push(this);
  // options
  this.deep = !!options.deep;
  this.user = !!options.user;
  this.lazy = !!options.lazy;
  this.sync = !!options.sync;
  this.expression = expOrFn.toString();
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
      if (
        value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          /* istanbul ignore else */
          if (config.errorHandler) {
            config.errorHandler.call(null, e, this.vm);
          } else {
            process.env.NODE_ENV !== 'production' && warn(
              ("Error in watcher \"" + (this.expression) + "\""),
              this.vm
            );
            throw e
          }
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      remove$1(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

function initState (vm) {
  vm._watchers = [];
  initProps(vm);
  initMethods(vm);
  initData(vm);
  initComputed(vm);
  initWatch(vm);
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm) {
  var props = vm.$options.props;
  if (props) {
    var propsData = vm.$options.propsData || {};
    var keys = vm.$options._propKeys = Object.keys(props);
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;
    var loop = function ( i ) {
      var key = keys[i];
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (isReservedProp[key]) {
          warn(
            ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
          if (vm.$parent && !observerState.isSettingProps) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      } else {
        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
      }
    };

    for (var i = 0; i < keys.length; i++) loop( i );
    observerState.shouldConvert = true;
  }
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else {
      proxy(vm, keys[i]);
    }
  }
  // observe data
  observe(data);
  data.__ob__ && data.__ob__.vmCount++;
}

var computedSharedDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initComputed (vm) {
  var computed = vm.$options.computed;
  if (computed) {
    for (var key in computed) {
      var userDef = computed[key];
      if (typeof userDef === 'function') {
        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
        computedSharedDefinition.set = noop;
      } else {
        computedSharedDefinition.get = userDef.get
          ? userDef.cache !== false
            ? makeComputedGetter(userDef.get, vm)
            : bind$1(userDef.get, vm)
          : noop;
        computedSharedDefinition.set = userDef.set
          ? bind$1(userDef.set, vm)
          : noop;
      }
      Object.defineProperty(vm, key, computedSharedDefinition);
    }
  }
}

function makeComputedGetter (getter, owner) {
  var watcher = new Watcher(owner, getter, noop, {
    lazy: true
  });
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}

function initMethods (vm) {
  var methods = vm.$options.methods;
  if (methods) {
    for (var key in methods) {
      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
      if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
    }
  }
}

function initWatch (vm) {
  var watch = vm.$options.watch;
  if (watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);

  Vue.prototype.$set = set$1;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

function proxy (vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val;
      }
    });
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.child = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._mount = function (
    el,
    hydrating
  ) {
    var vm = this;
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if (process.env.NODE_ENV !== 'production') {
        /* istanbul ignore if */
        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'option is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
    vm._watcher = new Watcher(vm, function () {
      vm._update(vm._render(), hydrating);
    }, noop);
    hydrating = false;
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  };

  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    if (vm._isMounted) {
      callHook(vm, 'updated');
    }
  };

  Vue.prototype._updateFromParent = function (
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    var vm = this;
    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = true;
      }
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = false;
      }
      vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      vm._updateListeners(listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$1(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm);
    }
  }
  vm.$emit('hook:' + hook);
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.child || vnode.child._isDestroyed) {
    var child = vnode.child = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.child = oldVnode.child;
  child._updateFromParent(
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.child._isMounted) {
    vnode.child._isMounted = true;
    callHook(vnode.child, 'mounted');
  }
  if (vnode.data.keepAlive) {
    vnode.child._inactive = false;
    callHook(vnode.child, 'activated');
  }
}

function destroy$1 (vnode) {
  if (!vnode.child._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.child.$destroy();
    } else {
      vnode.child._inactive = true;
      callHook(vnode.child, 'deactivated');
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook, key) {
  key = key + hookKey;
  var injectedHash = def.__injected || (def.__injected = {});
  if (!injectedHash[key]) {
    injectedHash[key] = true;
    var oldHook = def[hookKey];
    if (oldHook) {
      def[hookKey] = function () {
        oldHook.apply(this, arguments);
        hook.apply(this, arguments);
      };
    } else {
      def[hookKey] = hook;
    }
  }
}

/*  */

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, fn, event, capture, once;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + name + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      once = name.charAt(0) === '~'; // Prefixed last, checked first
      event = once ? name.slice(1) : name;
      capture = event.charAt(0) === '!';
      event = capture ? event.slice(1) : event;
      if (Array.isArray(cur)) {
        add(event, (cur.invoker = arrInvoker(cur)), once, capture);
      } else {
        if (!cur.invoker) {
          fn = cur;
          cur = on[name] = {};
          cur.fn = fn;
          cur.invoker = fnInvoker(cur);
        }
        add(event, cur.invoker, once, capture);
      }
    } else if (cur !== old) {
      if (Array.isArray(old)) {
        old.length = cur.length;
        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
        on[name] = old;
      } else {
        old.fn = cur;
        on[name] = old;
      }
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      once = name.charAt(0) === '~'; // Prefixed last, checked first
      event = once ? name.slice(1) : name;
      capture = event.charAt(0) === '!';
      event = capture ? event.slice(1) : event;
      remove$$1(event, oldOn[name].invoker, capture);
    }
  }
}

function arrInvoker (arr) {
  return function (ev) {
    var arguments$1 = arguments;

    var single = arguments.length === 1;
    for (var i = 0; i < arr.length; i++) {
      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
    }
  }
}

function fnInvoker (o) {
  return function (ev) {
    var single = arguments.length === 1;
    single ? o.fn(ev) : o.fn.apply(null, arguments);
  }
}

/*  */

function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  needNormalization,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    needNormalization = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { needNormalization = true; }
  return _createElement(context, tag, data, children, needNormalization)
}

function _createElement (
  context,
  tag,
  data,
  children,
  needNormalization
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (needNormalization) {
    children = normalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      ns = tag === 'foreignObject' ? 'xhtml' : ns;
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = {};
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, needNormalization, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    if (_parentVnode && _parentVnode.data.scopedSlots) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots;
    }

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      /* istanbul ignore else */
      if (config.errorHandler) {
        config.errorHandler.call(null, e, vm);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
        }
        throw e
      }
      // return previous vnode to prevent render error causing blank component
      vnode = vm._vnode;
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // toString for mustaches
  Vue.prototype._s = _toString;
  // convert text to vnode
  Vue.prototype._v = createTextVNode;
  // number conversion
  Vue.prototype._n = toNumber;
  // empty vnode
  Vue.prototype._e = createEmptyVNode;
  // loose equal
  Vue.prototype._q = looseEqual;
  // loose indexOf
  Vue.prototype._i = looseIndexOf;

  // render static tree by index
  Vue.prototype._m = function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, ("__static__" + index), false);
    return tree
  };

  // mark node as static (v-once)
  Vue.prototype._o = function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  };

  function markStatic (tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  // filter resolution helper
  Vue.prototype._f = function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  };

  // render v-for
  Vue.prototype._l = function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  };

  // renderSlot
  Vue.prototype._t = function (
    name,
    fallback,
    props
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) { // scoped slot
      return scopedSlotFn(props || {}) || fallback
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && process.env.NODE_ENV !== 'production') {
        slotNodes._rendered && warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
        slotNodes._rendered = true;
      }
      return slotNodes || fallback
    }
  };

  // apply v-bind object
  Vue.prototype._b = function bindProps (
    data,
    tag,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        process.env.NODE_ENV !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            data[key] = value[key];
          } else {
            var hash = asProp || config.mustUseProp(tag, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  };

  // check v-on keyCodes
  Vue.prototype._k = function checkKeyCodes (
    eventKeyCode,
    key,
    builtInAlias
  ) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  };
}

function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  var add = function (event, fn, once) {
    once ? vm.$once(event, fn) : vm.$on(event, fn);
  };
  var remove$$1 = bind$1(vm.$off, vm);
  vm._updateListeners = function (listeners, oldListeners) {
    updateListeners(listeners, oldListeners || {}, add, remove$$1, vm);
  };
  if (listeners) {
    vm._updateListeners(listeners);
  }
}

function eventsMixin (Vue) {
  Vue.prototype.$on = function (event, fn) {
    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    initRender(vm);
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = Ctor.super.options;
    var cachedSuperOptions = Ctor.superOptions;
    var extendOptions = Ctor.extendOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed
      Ctor.superOptions = superOptions;
      extendOptions.render = options.render;
      extendOptions.staticRenderFns = options.staticRenderFns;
      extendOptions._scopeId = options._scopeId;
      options = Ctor.options = mergeOptions(superOptions, extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else {
    return pattern.test(name)
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes
  },
  created: function created () {
    this.cache = Object.create(null);
  },
  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    if (vnode && vnode.componentOptions) {
      var opts = vnode.componentOptions;
      // check pattern
      var name = opts.Ctor.options.name || opts.tag;
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? opts.Ctor.cid + (opts.tag ? ("::" + (opts.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.child = this.cache[key].child;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  },
  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this.cache) {
      var vnode = this$1.cache[key];
      callHook(vnode.child, 'deactivated');
      vnode.child.$destroy();
    }
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  Vue.util = util;
  Vue.set = set$1;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.1.6';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.child) {
    childNode = childNode.child._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML',
  xhtml: 'http://www.w3.org/1999/xhtml'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + selector
      );
      return document.createElement('div')
    }
  }
  return el
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.child || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$1(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeElement(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeElement (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.child) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.child)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.child) {
      innerNode = innerNode.child._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.child) {
      vnode = vnode.child._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.child.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          nodeOps.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeElement(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.child = oldVnode.child;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.child)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return _toString(vnode.text) === node.data
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var elm, parent;
    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        elm = oldVnode.elm;
        parent = nodeOps.parentNode(elm);
        createElm(vnode, insertedVnodeQueue, parent, nodeOps.nextSibling(elm));

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parent !== null) {
          removeVnodes(parent, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    }, 'dir-postpatch');
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var target;

function add$1 (event, handler, once, capture) {
  if (once) {
    var oldHandler = handler;
    handler = function (ev) {
      remove$2(event, handler, capture);
      arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
    };
  }
  target.addEventListener(event, handler, capture);
}

function remove$2 (event, handler, capture) {
  target.removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target = vnode.elm;
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }
    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (!elm.composing && (
        (document.activeElement !== elm && elm.value !== strCur) ||
        isValueChanged(vnode, strCur)
      )) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

function isValueChanged (vnode, newVal) {
  var value = vnode.elm.value;
  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.child) {
      childNode = childNode.child._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove$1(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear ? appearClass : enterClass;
  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    enterHook &&
    // enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length || enterHook.length) > 1;

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.context === vnode.context &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    }, 'transition-insert');
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        whenTransitionEnds(el, type, cb);
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    leave &&
    // leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length || leave.length) > 1;

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          whenTransitionEnds(el, type, cb);
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    leaveClass: (name + "-leave"),
    appearClass: (name + "-enter"),
    enterActiveClass: (name + "-enter-active"),
    leaveActiveClass: (name + "-leave-active"),
    appearActiveClass: (name + "-enter-active")
  }
});

function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model = {
  inserted: function inserted (el, binding, vnode) {
    if (process.env.NODE_ENV !== 'production') {
      if (!modelableTagRE.test(vnode.tag)) {
        warn(
          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
          'If you are working with contenteditable, it\'s recommended to ' +
          'wrap a library dedicated for that purpose inside a custom component.',
          vnode.context
        );
      }
    }
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.child && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.child._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  }
};

var platformDirectives = {
  model: model,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1].fn;
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    var key = child.key = child.key == null || child.isStatic
      ? ("__v" + (child.tag + this._uid) + "__")
      : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && oldChild.key !== key) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);

      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts
            ? (opts.Ctor.options.name || opts.tag)
            : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var f = document.body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      addTransitionClass(el, moveClass);
      var info = getTransitionInfo(el);
      removeTransitionClass(el, moveClass);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.isUnknownElement = isUnknownElement;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.mustUseProp = mustUseProp;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

// wrap mount
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return this._mount(el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (
      process.env.NODE_ENV !== 'production' &&
      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console.log(
        'Download the Vue Devtools for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr',
  true
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
  true
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track',
  true
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = makeMap('script,style', true);
var hasLang = function (attr) { return attr.name === 'lang' && attr.value !== 'html'; };
var isSpecialTag = function (tag, isSFC, stack) {
  if (isScriptOrStyle(tag)) {
    return true
  }
  if (isSFC && stack.length === 1) {
    // top-level template that has no pre-processor
    if (tag === 'template' && !stack[0].attrs.some(hasLang)) {
      return false
    } else {
      return true
    }
  }
  return false
};

var reCache = {};

var ltRE = /&lt;/g;
var gtRE = /&gt;/g;
var nlRE = /&#10;/g;
var ampRE = /&amp;/g;
var quoteRE = /&quot;/g;

function decodeAttr (value, shouldDecodeNewlines) {
  if (shouldDecodeNewlines) {
    value = value.replace(nlRE, '\n');
  }
  return value
    .replace(ltRE, '<')
    .replace(gtRE, '>')
    .replace(ampRE, '&')
    .replace(quoteRE, '"')
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a script or style element
    if (!lastTag || !isSpecialTag(lastTag, options.sfc, stack)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd > 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
    }

    if (html === last && options.chars) {
      options.chars(html);
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag('', lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag('', tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, attrs: attrs });
      lastTag = tagName;
      unarySlash = '';
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tag, tagName, start, end) {
    var pos;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      var needle = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].tag.toLowerCase() === needle) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (tagName.toLowerCase() === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (tagName.toLowerCase() === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !/[\w$]/.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue parser]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var onRE = /^@|^v-on:/;
var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$1;
var platformGetTagNamespace;
var platformMustUseProp;
var platformIsPreTag;
var preTransforms;
var transforms;
var postTransforms;
var delimiters;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$1 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;
  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;
  parseHTML(template, {
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$1(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">."
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production' && !warned) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warned = true;
            warn$1(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes:\n' + template
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warned = true;
            warn$1(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements:\n' + template
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production' && !warned) {
          warned = true;
          warn$1(
            "Component template should contain exactly one root element:" +
            "\n\n" + template + "\n\n" +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      // check pre state
      if (element.pre) {
        inVPre = false;
      }
      if (platformIsPreTag(element.tag)) {
        inPre = false;
      }
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production' && !warned && text === template) {
          warned = true;
          warn$1(
            'Component template requires a root element, rather than just text:\n\n' + template
          );
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && currentParent.children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          currentParent.children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else {
          currentParent.children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$1(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once = getAndRemoveAttr(el, 'v-once');
  if (once != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$1(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, arg, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        if (argMatch && (arg = argMatch[1])) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$1(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
      warn$1('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].tag) { return children[i] }
  }
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: 'if($event.target !== $event.currentTarget)return;',
  ctrl: 'if(!$event.ctrlKey)return;',
  shift: 'if(!$event.shiftKey)return;',
  alt: 'if(!$event.altKey)return;',
  meta: 'if(!$event.metaKey)return;'
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  } else if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  } else if (!handler.modifiers) {
    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
      ? handler.value
      : ("function($event){" + (handler.value) + "}")
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code = genKeyFilter(keys) + code;
    }
    var handlerCode = simplePathRE.test(handler.value)
      ? handler.value + '($event)'
      : handler.value;
    return 'function($event){' + code + handlerCode + '}'
  }
}

function genKeyFilter (keys) {
  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$2 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

var baseDirectives = {
  bind: bind$2,
  cloak: noop
};

/*  */

// configurable state
var warn$2;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$2 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && warn$2(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$2);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$2('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
}

function genScopedSlot (key, el) {
  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
        ? canSkipNormalization(children) ? '' : ',true'
        : ''))
  }
}

function canSkipNormalization (children) {
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (needsNormalization(el) ||
        (el.if && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      return false
    }
  }
  return true
}

function needsNormalization (el) {
  return el.for || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  return ("_t(" + slotName + (children ? ("," + children) : '') + (el.attrs ? ((children ? '' : ',null') + ",{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}") : '') + ")")
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

/**
 * Compile a template.
 */
function compile$1 (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

/*  */

// operators like typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');
// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;
// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "- avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + text
      );
    } else {
      errors.push(("- invalid expression: " + text));
    }
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

var warn$3;

function model$1 (
  el,
  dir,
  _warn
) {
  warn$3 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;
  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$3(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
  }
  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else {
    genDefaultModel(el, value, modifiers);
  }
  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  if (process.env.NODE_ENV !== 'production' &&
    el.attrsMap.checked != null) {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" +
      ":_q(" + value + "," + trueValueBinding + ")"
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  if (process.env.NODE_ENV !== 'production' &&
    el.attrsMap.checked != null) {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  if (process.env.NODE_ENV !== 'production') {
    if (el.tag === 'input' && el.attrsMap.value) {
      warn$3(
        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
        'inline value attributes will be ignored when using v-model. ' +
        'Declare initial values in the component\'s data option instead.'
      );
    }
    if (el.tag === 'textarea' && el.children.length) {
      warn$3(
        "<textarea v-model=\"" + value + "\">:\n" +
        'inline content inside <textarea> will be ignored when using v-model. ' +
        'Declare initial values in the component\'s data option instead.'
      );
    }
  }

  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
  var needCompositionGuard = !lazy && type !== 'range';
  var isNative = el.tag === 'input' || el.tag === 'textarea';

  var valueExpression = isNative
    ? ("$event.target.value" + (trim ? '.trim()' : ''))
    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
  valueExpression = number || type === 'number'
    ? ("_n(" + valueExpression + ")")
    : valueExpression;

  var code = genAssignmentCode(value, valueExpression);
  if (isNative && needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  // inputs with type="file" are read only and setting the input's
  // value will throw an error.
  if (process.env.NODE_ENV !== 'production' &&
      type === 'file') {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
      "File inputs are read only. Use a v-on:change listener instead."
    );
  }

  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

function genSelect (
    el,
    value,
    modifiers
) {
  if (process.env.NODE_ENV !== 'production') {
    el.children.some(checkOptionWarning);
  }

  var number = modifiers && modifiers.number;
  var assignment = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})" +
    (el.attrsMap.multiple == null ? '[0]' : '');

  var code = genAssignmentCode(value, assignment);
  addHandler(el, 'change', code, null, true);
}

function checkOptionWarning (option) {
  if (option.type === 1 &&
    option.tag === 'option' &&
    option.attrsMap.selected != null) {
    warn$3(
      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
      'inline selected attributes on <option> will be ignored when using v-model. ' +
      'Declare initial values in the component\'s data option instead.'
    );
    return true
  }
  return false
}

function genAssignmentCode (value, assignment) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model$1,
  text: text,
  html: html
};

/*  */

var cache = Object.create(null);

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  staticKeys: genStaticKeys(modules$1),
  directives: directives$1,
  isReservedTag: isReservedTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  getTagNamespace: getTagNamespace,
  isPreTag: isPreTag
};

function compile$$1 (
  template,
  options
) {
  options = options
    ? extend(extend({}, baseOptions), options)
    : baseOptions;
  return compile$1(template, options)
}

function compileToFunctions (
  template,
  options,
  vm
) {
  var _warn = (options && options.warn) || warn;
  // detect possible CSP restriction
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    try {
      new Function('return 1');
    } catch (e) {
      if (e.toString().match(/unsafe-eval|CSP/)) {
        _warn(
          'It seems you are using the standalone build of Vue.js in an ' +
          'environment with Content Security Policy that prohibits unsafe-eval. ' +
          'The template compiler cannot work in this environment. Consider ' +
          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
          'templates into render functions.'
        );
      }
    }
  }
  var key = options && options.delimiters
    ? String(options.delimiters) + template
    : template;
  if (cache[key]) {
    return cache[key]
  }
  var res = {};
  var compiled = compile$$1(template, options);
  res.render = makeFunction(compiled.render);
  var l = compiled.staticRenderFns.length;
  res.staticRenderFns = new Array(l);
  for (var i = 0; i < l; i++) {
    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
  }
  if (process.env.NODE_ENV !== 'production') {
    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
      _warn(
        "failed to compile template:\n\n" + template + "\n\n" +
        detectErrors(compiled.ast).join('\n') +
        '\n\n',
        vm
      );
    }
  }
  return (cache[key] = res)
}

function makeFunction (code) {
  try {
    return new Function(code)
  } catch (e) {
    return noop
  }
}

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      var ref = compileToFunctions(template, {
        warn: warn,
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(82)))

/***/ },
/* 12 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            'IOS': false,
            'APP': false
        };
    },

    methods: {
        setTitle: function setTitle(Name) {
            document.title = Name;
            var titletxt = Name;

            setTimeout(function () {
                var body = document.getElementsByTagName('body')[0];
                document.title = titletxt;
                var iframe = document.createElement("iframe");
                iframe.style.display = "none";
                var d = function d() {
                    setTimeout(function () {
                        iframe.removeEventListener('load', d);
                        document.body.removeChild(iframe);
                    }, 0);
                };
                iframe.addEventListener('load', d);
                document.body.appendChild(iframe);
            }, 0);
        },
        isIOS: function isIOS() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('baoxiangios') > -1) {
                this.IOS = true;
            }
        },
        isApp: function isApp() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('baoxiang') > -1) {
                this.APP = true;
            }
        }
    },
    components: {}
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(29);

var _core2 = _interopRequireDefault(_core);

var _render = __webpack_require__(30);

var _render2 = _interopRequireDefault(_render);

var _Spinner = __webpack_require__(47);

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function widthAndHeightCoerce(v) {
  if (v[v.length - 1] != '%') return v + 'px';
  return v;
}

function widthAndHeightValidator(v) {
  return (/^[\d]+(\%|px)$/.test(v)
  );
}

exports.default = {
  components: {
    Spinner: _Spinner2.default
  },

  props: {
    onRefresh: Function,
    onInfinite: Function,

    refreshText: {
      type: String,
      default: '下拉刷新'
    },

    width: {
      type: String,
      default: '100%',
      validator: widthAndHeightValidator,
      coerce: widthAndHeightCoerce
    },

    height: {
      type: String,
      default: '100%',
      validator: widthAndHeightValidator,
      coerce: widthAndHeightCoerce
    }
  },

  data: function data() {
    return {
      containerId: 'outer-' + Math.random().toString(36).substring(3, 8),
      contentId: 'inner-' + Math.random().toString(36).substring(3, 8),
      state: 0,

      showLoading: false,

      container: undefined,
      content: undefined,
      scroller: undefined,
      pullToRefreshLayer: undefined,
      mousedown: false,
      infiniteTimer: undefined,
      scrollbottom: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.container = document.getElementById(this.containerId);
    this.container.style.width = this.width;
    this.container.style.height = this.height;

    this.content = document.getElementById(this.contentId);
    this.pullToRefreshLayer = this.content.getElementsByTagName("div")[0];

    var render = (0, _render2.default)(this.content);

    this.scroller = new _core2.default(render, {
      scrollingX: false
    });

    if (this.onRefresh) {
      this.scroller.activatePullToRefresh(60, function () {
        _this.state = 1;
      }, function () {
        _this.state = 0;
      }, function () {
        _this.state = 2;

        _this.$on('$finishPullToRefresh', function () {
          setTimeout(function () {
            _this.state = 0;
            _this.finishPullToRefresh();
          });
        });

        _this.onRefresh();
      });
    }

    if (this.onInfinite) {
      this.infiniteTimer = setInterval(function () {
        var _scroller$getValues = _this.scroller.getValues(),
            left = _scroller$getValues.left,
            top = _scroller$getValues.top,
            zoom = _scroller$getValues.zoom;

        if (top + 60 > _this.content.offsetHeight - _this.container.clientHeight) {
          if (_this.scrollbottom) return;
          _this.scrollbottom = true;
          _this.showLoading = true;
          _this.onInfinite();
          setTimeout(function () {
            _this.scrollbottom = false;
          }, 1500);
        }
      }, 10);
    }

    var rect = this.container.getBoundingClientRect();
    this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop);

    var delegate = {
      resize: this.resize,
      finishPullToRefresh: this.finishPullToRefresh,
      triggerPullToRefresh: this.triggerPullToRefresh,
      scrollTo: this.scrollTo,
      scrollBy: this.scrollBy
    };
  },
  beforeDestroyed: function beforeDestroyed() {
    if (this.infiniteTimer) clearInterval(this.infiniteTimer);
  },


  methods: {
    resize: function resize() {
      var container = this.container;
      var content = this.content;
      this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
    },
    finishPullToRefresh: function finishPullToRefresh() {
      var _this2 = this;

      this.scroller.finishPullToRefresh();
      setTimeout(function () {
        _this2.resize();
      });
    },
    triggerPullToRefresh: function triggerPullToRefresh() {
      this.scroller.triggerPullToRefresh();
    },
    scrollTo: function scrollTo(x, y, animate) {
      this.scroller.scrollTo(x, y, animate);
    },
    scrollBy: function scrollBy(x, y, animate) {
      this.scroller.scrollBy(x, y, animate);
    },
    touchStart: function touchStart(e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }
      this.scroller.doTouchStart(e.touches, e.timeStamp);
    },
    touchMove: function touchMove(e) {
      e.preventDefault();
      this.scroller.doTouchMove(e.touches, e.timeStamp);
    },
    touchEnd: function touchEnd(e) {
      this.scroller.doTouchEnd(e.timeStamp);
    },
    mouseDown: function mouseDown(e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }
      this.scroller.doTouchStart([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);
      this.mousedown = true;
    },
    mouseMove: function mouseMove(e) {
      if (!this.mousedown) {
        return;
      }
      this.scroller.doTouchMove([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp);
      this.mousedown = true;
    },
    mouseUp: function mouseUp(e) {
      if (!this.mousedown) {
        return;
      }
      this.scroller.doTouchEnd(e.timeStamp);
      this.mousedown = false;
    },
    getPosition: function getPosition() {
      var v = this.scroller.getValues();

      return {
        left: parseInt(v.left),
        top: parseInt(v.top)
      };
    }
  }
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            'list': [],
            'scroll': {
                'loadTxt': ''
            },
            'num': 0,
            'phone': "",
            'SmsSel': false
        };
    },
    methods: {
        getCheck: function getCheck() {
            var that = this;
            that.phone = [];
            var i = 0;
            $('.alone-check').each(function () {
                if ($(this).is(':checked')) {
                    ++i;
                    that.phone += $(this).val() + ";";
                } else {
                    $(".all-check").get(0).checked = false;
                }
            });
            that.num = i;
            that.num > 0 ? that.SmsSel = true : that.SmsSel = false;
        },
        allCheck: function allCheck() {
            var that = this;
            if ($(".all-check").is(':checked')) {
                that.phone = "";
                $('.alone-check').each(function () {
                    $(this).prop('checked', true);
                    that.phone += $(this).val() + ";";
                });
                that.num = $('.alone-check').length;
                that.num > 0 ? that.SmsSel = true : that.SmsSel = false;
            } else {
                that.phone = "";
                $('.alone-check').each(function () {
                    $(this).get(0).checked = false;
                });
                that.num = 0;
                that.SmsSel = false;
            }
        },
        getData: function getData() {
            var that = this;
            Public.API_GET({
                url: 'getClientBirthdayList',
                success: function success(result) {
                    if (result.isSuccess) {
                        if (result.data.length == 0) {
                            that.scroll.loadTxt = '暂无数据';
                        } else {
                            that.list = that.list.concat(result.data);
                        }
                    }
                }
            });
        },
        formatPhone: function formatPhone() {
            this.phone = this.phone.substring(0, this.phone.length - 1);
        }
    },
    created: function created() {
        this.$parent.setTitle("近期过生日客户");
        var that = this;
        Public.setPageInit(that.getData);
        Public.pageInit();
        this.$parent.isIOS();
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            href: this.$router.app._route.path
        };
    },
    mounted: function mounted() {
        $('.brisk-item').click(function () {
            $('.brisk-item').removeClass('active');
            $(this).addClass('active');
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 16 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            rate: 5.5,

            minMoney: 100,

            dailyInMoney: 20000,

            sumMax: 50000,

            redeemDayMax: 20000,
            questions: []
        };
    },

    methods: {
        tabShow: function tabShow(question) {
            question.active = !question.active;
        },
        getData: function getData() {
            var _this = this;

            Public.API_GET({
                url: 'briskRecommand',
                success: function success(response) {
                    if (response.data) {
                        _this.rate = response.data.wealthYearRate;
                        _this.minMoney = response.data.wealthInvestMin;
                        _this.dailyInMoney = response.data.wealthInvestDayMax;
                        _this.sumMax = response.data.wealthTotalInvestMax;
                        _this.redeemDayMax = response.data.wealthRedeemDayMax;
                    }
                }
            });
            Public.API_GET({
                url: 'briskQuestions',
                data: { helpKey: "brisk" },
                success: function success(response) {
                    _this.questions = response.data.map(function (r) {
                        return {
                            name: r.articleTitle,
                            active: false,
                            content: r.articleContent
                        };
                    });
                }
            });
        }
    },
    mounted: function mounted() {
        Public.setPageInit(this.getData);
        Public.pageInit();
    }
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Scroller = __webpack_require__(46);

var _Scroller2 = _interopRequireDefault(_Scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        Scroller: _Scroller2.default
    },
    data: function data() {
        return {
            start: 0,
            uniLength: 10,
            items: [],
            hasMore: true,
            load: ""
        };
    },

    methods: {
        refresh: function refresh() {
            this.items = [];
            this.initData();
            $('.loading-layer').html(this.load);
        },
        infinite: function infinite() {
            var _this = this;

            if (this.hasMore) {
                if (this.bottom) {
                    Public.API_GET({
                        url: 'briskProductList',
                        data: { offset: this.bottom, max: this.uniLength },
                        success: function success(response) {
                            response.data.map(function (r) {
                                return {
                                    name: r.productTitle,
                                    id: r.productId,
                                    rate: r.productYearRate,
                                    day: r.productCycle,
                                    statusTitle: r.productStatusDescription,
                                    dayName: r.productCycleTypeDescription
                                };
                            }).forEach(function (d) {
                                return _this.items.push(d);
                            });
                            _this.bottom += response.data.length;
                            _this.hasMore = response.data.length < _this.uniLength ? false : true;
                            if (!_this.hasMore) {
                                $('.loading-layer').html('没有更多了');
                            }
                            setTimeout(function () {
                                if (_this.$refs.my_scroller) _this.$refs.my_scroller.resize();
                            });
                        },
                        error: function error(response) {
                            _this.hasMore = false;
                            $('.loading-layer').html('没有更多了');
                        }
                    });
                    $('.loading-layer').show();
                }
            } else {
                $('.loading-layer').html('没有更多了');
            }
        },
        initData: function initData() {
            var _this2 = this;

            Public.API_GET({
                url: 'briskProductList',
                data: { offset: 0, max: this.uniLength },
                success: function success(response) {
                    _this2.top = 1;
                    _this2.items = response.data.map(function (r) {
                        return {
                            name: r.productTitle,
                            id: r.productId,
                            rate: r.productYearRate,
                            day: r.productCycle,
                            statusTitle: r.productStatusDescription,
                            dayName: r.productCycleTypeDescription
                        };
                    });
                    _this2.bottom = response.data.length;
                    _this2.hasMore = response.data.length < _this2.uniLength ? false : true;
                    if (_this2.hasMore) {
                        $('.loading-layer').show();
                    }
                    if (_this2.$refs.my_scroller) _this2.$refs.my_scroller.finishPullToRefresh();
                }
            });
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        Public.setPageInit(this.initData);
        Public.pageInit();
        setTimeout(function () {
            _this3.$refs.my_scroller.resize();
        });
        this.load = $('.loading-layer').html();
        $('.loading-layer').hide();
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            id: "BXJR-TTJ01-00001",
            name: "***",
            cardId: "***"
        };
    },

    methods: {
        init: function init() {
            var _this = this;

            Public.API_GET({
                url: 'protocol',
                success: function success(response) {
                    if (response.data) {
                        _this.name = response.data.realName;
                        _this.cardId = response.data.idCard;
                        _this.id = response.data.briskNo;
                    }
                }
            });
        }
    },
    mounted: function mounted() {
        this.$parent.setTitle("添添金服务协议");
        Public.setPageInit(this.init);
        Public.pageInit();
    }
};

/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {};
    }
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            jionlist: [],
            max: 10,
            offset: 0,
            ajaxLock: true,
            currentTab: "all",
            loading: true,
            tableLock: false,
            rightTitle: "总佣金",
            initTime: 0,
            assFlag: false
        };
    },
    methods: {
        toCustomerDetail: function toCustomerDetail(e) {
            Public.AppJump("http://" + window.location.host + "/m/index.html#!/financialPlanner/view/" + e.currentTarget.dataset.member);
        },
        changeTab: function changeTab(e) {
            var _this = this;
            $(".on").removeClass("on");
            $(e.currentTarget).addClass("on");
            _this.currentTab = e.currentTarget.dataset.tab;
            _this.jionlist = [];
            _this.ajaxLock = true;
            _this.loading = true;
            _this.offset = 0;
            if (this.currentTab == "norealname") {
                _this.rightTitle = "手机号";
            } else if (this.currentTab == "invote" || this.currentTab == "all") {
                _this.rightTitle = "总佣金";
            } else {
                _this.rightTitle = "账户余额";
            }
            if (_this.tableLock) {
                return;
            } else {
                _this.getMore(this.currentTab);
                _this.tableLock = true;
            }
        },
        getDate: function getDate() {
            var _this = this;
            if (Public.Auth.get() == 0) {
                _this.assFlag = true;
            } else {
                _this.assFlag = false;
            }
            Public.API_GET({
                url: 'recommendMember',
                data: { offset: _this.offset, max: _this.max },
                success: function success(result) {
                    if (result.isSuccess) {} else if (_this.assFlag) {
                        if (_this.initTime < 10) {
                            window.setTimeout(function () {
                                _this.getDate();
                            }, 300);
                            _this.initTime++;
                        }
                    }
                    if (result.data.list && result.data.list.length > 0) {
                        _this.jionlist = result.data.list;
                        _this.$parent.setTitle("客户列表(" + result.data.recommendSize + "位)");
                    } else {
                        _this.jionlist = [];
                    }
                    if (result.data.list.length < 10) {
                        _this.ajaxLock = false;
                        _this.loading = false;
                    } else {
                        _this.loading = true;
                    }
                    _this.offset = 10;
                }
            });
        },
        getMore: function getMore(currentTab) {
            var _this = this;
            var sendData = {
                offset: _this.offset, max: _this.max
            };
            if (currentTab != "all") {
                sendData.type = _this.currentTab;
            }
            Public.API_GET({
                url: 'recommendMember',
                data: sendData,
                success: function success(result) {
                    _this.tableLock = false;
                    if (result.data.list && result.data.list.length > 0) {
                        _this.jionlist = _this.jionlist.concat(result.data.list);
                    }
                    if (result.data.list.length < 10) {
                        _this.ajaxLock = false;
                        _this.loading = false;
                    } else {
                        _this.loading = true;
                        _this.ajaxLock = true;
                    }
                    _this.offset += 10;
                }
            });
        }
    },

    created: function created() {

        this.$parent.setTitle("客户列表");
        var _this = this;
        var wh = $(window).height();
        $(window).on("scroll", function () {
            var top = $(this).scrollTop();
            var dh = $(document).height();
            if (top + wh >= dh) {
                if (_this.ajaxLock) {
                    _this.loading = true;
                    _this.ajaxLock = false;
                    _this.getMore(_this.currentTab);
                }
            }
        });
    },
    mounted: function mounted() {
        var _this = this;
        Public.setPageInit(_this.getDate);
        Public.pageInit();
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            'list': [],
            'scroll': {
                'top': '',
                'wh': '',
                'dh': '',
                'beforeTop': 0,
                'flg': true,
                'offset': 0,
                'max': 10,
                'loadTxt': ''
            },
            'num': 0,
            'SmsSel': false,
            'phone': [],
            'first': true,
            'checkFlg': false
        };
    },
    methods: {
        getCheck: function getCheck() {
            var that = this;
            that.phone = [];
            var i = 0;
            $('.alone-check').each(function () {
                if ($(this).is(':checked')) {
                    ++i;
                    $(this).parent().parent().css('background', '#ececec');
                    that.phone += $(this).val() + ";";
                } else {
                    that.checkFlg = false;
                    $(this).parent().parent().css('background', 'transparent');
                    $(".all-check").get(0).checked = false;
                }
            });
            that.num = i;
            that.num > 0 ? that.SmsSel = true : that.SmsSel = false;
        },
        allCheck: function allCheck() {
            var that = this;
            if ($(".all-check").is(':checked')) {
                that.phone = "";
                that.checkFlg = true;
                $('.alone-check').each(function () {
                    $(this).prop('checked', true);
                    $(this).parent().parent().css('background', '#ececec');
                    that.phone += $(this).val() + ";";
                });
                that.num = $('.alone-check').length;
                that.num > 0 ? that.SmsSel = true : that.SmsSel = false;
            } else {
                that.phone = "";

                $('.alone-check').each(function () {
                    $(this).get(0).checked = false;
                    $(this).parent().parent().css('background', 'transparent');
                });
                that.num = 0;
                that.SmsSel = false;
            }
        },
        getData: function getData() {
            var that = this;
            that.scroll.flg = false;
            that.scroll.loadTxt = '加载中...';
            Public.API_GET({
                url: 'getClientList',
                data: { "offset": that.scroll.offset, "max": that.scroll.max },
                success: function success(result) {
                    if (result.isSuccess) {
                        that.list = that.list.concat(result.data);
                        that.scroll.offset += that.scroll.max;
                        that.scroll.flg = true;
                        if (result.data.length == 0) {
                            that.first ? that.scroll.loadTxt = '暂无数据' : that.scroll.loadTxt = '没有更多了';
                        } else if (result.data.length < that.scroll.max) {
                            that.scroll.loadTxt = '没有更多了';
                        }
                        that.first = false;

                        setTimeout(function () {
                            if (that.checkFlg) {
                                that.allCheck();
                            }
                        }, 0);
                    }
                }
            });
        },
        formatPhone: function formatPhone() {
            if (this.phone.length > 0) {
                this.phone = this.phone.substring(0, this.phone.length - 1);
            }
        },
        cancel: function cancel(e) {
            e.preventDefault();
            $('.alone-check').each(function () {
                $(this).get(0).checked = false;
                $(this).parent().parent().css('background', 'transparent');
            });
            $(".all-check").get(0).checked = false;
            this.phone = "";
            this.num = 0;
        }
    },
    created: function created() {
        this.$parent.setTitle("选择联系人");
        this.$parent.isIOS();
        var that = this;
        Public.setPageInit(that.getData);
        Public.pageInit();

        that.scroll.wh = $(window).height();
        $(window).on("scroll", function () {
            that.scroll.top = $(this).scrollTop();
            that.scroll.dh = $(document).height();
            if (that.scroll.top + that.scroll.wh >= that.scroll.dh) {
                if (that.scroll.flg) {
                    that.getData();
                }
            }
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            birthday: 0,
            jionlist: [],
            offset: 0,
            max: 20,
            currentTab: "all",
            ajaxLock: true,
            tableLock: false,
            loading: true,
            initTime: 0,
            assFlag: true

        };
    },
    methods: {
        goToClient: function goToClient() {
            Public.PushNextPage(this.$router, "/client");
        },
        goToBirthday: function goToBirthday() {
            Public.PushNextPage(this.$router, "/birthday");
        },
        goToContacts: function goToContacts() {
            Public.PushNextPage(this.$router, "/contacts");
        },
        goToPayment: function goToPayment() {
            Public.PushNextPage(this.$router, "/payment");
        },
        toCustomerDetail: function toCustomerDetail(e) {
            Public.AppJump("http://" + window.location.host + "/m/index.html#!/financialPlanner/view/" + e.currentTarget.dataset.member);
        },
        changeTab: function changeTab(e) {
            var _this = this;
            if (_this.tableLock) {
                return;
            } else {
                $(".on").removeClass("on");
                $(e.currentTarget).addClass("on");
                _this.currentTab = e.currentTarget.dataset.tab;
                _this.jionlist = [];
                _this.ajaxLock = true;
                _this.offset = 0;
                _this.getMore(this.currentTab);
                _this.tableLock = true;
            }
        },
        getDate: function getDate() {
            localStorage.setItem("ajaxStart", new Date().getTime());
            var _this = this;
            if (Public.Auth.get() == 0) {
                _this.assFlag = true;
            } else {
                _this.assFlag = false;
            }
            Public.API_GET({
                url: 'recommendMoneyRecord',
                data: { offset: _this.offset, max: _this.max },
                success: function success(result) {
                    if (result.isSuccess) {
                        _this.jionlist = result.data;
                        if (result.data.length < 10) {
                            _this.ajaxLock = false;
                            _this.loading = false;
                        } else {
                            _this.ajaxLock = true;
                            _this.loading = true;
                        }
                        _this.offset = 10;
                    } else if (_this.assFlag) {
                        if (_this.initTime < 10) {
                            window.setTimeout(function () {
                                _this.getDate();
                            }, 200);
                            _this.initTime++;
                        }
                    }
                }
            });
        },
        getMore: function getMore(currentTab) {
            var _this = this;
            var sendData = {
                offset: _this.offset, max: _this.max
            };
            if (currentTab != "all") {
                sendData.type = currentTab;
            }
            Public.API_GET({
                url: 'recommendMoneyRecord',
                data: sendData,
                success: function success(result) {
                    _this.jionlist = _this.jionlist.concat(result.data);
                    _this.tableLock = false;
                    if (result.data.length < 10) {
                        _this.ajaxLock = false;
                        _this.loading = false;
                    } else {
                        _this.loading = true;
                        _this.ajaxLock = true;
                    }
                    _this.offset += 10;
                }
            });
        },
        initBirthday: function initBirthday() {
            var _this = this;
            Public.API_GET({
                url: 'getClientBirthdayList',
                data: { day: 7, offset: 0, max: 99 },
                success: function success(result) {
                    _this.birthday = result.data.length;
                }
            });
        }
    },

    mounted: function mounted() {
        this.$parent.setTitle("客户动态");
        var _this = this;
        Public.setPageInit(_this.getDate);
        Public.pageInit();

        var wh = $(window).height();
        $(window).on("scroll", function () {
            var top = $(this).scrollTop();
            var dh = $(document).height();
            if (top + wh >= dh) {
                if (_this.ajaxLock) {
                    _this.loading = true;
                    _this.ajaxLock = false;
                    _this.getMore(_this.currentTab);
                }
            }
        });
    },
    beforeMount: function beforeMount() {}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 23 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            list: []
        };
    },
    methods: {},
    created: function created() {
        var _this = this;
        _this.$parent.setTitle("团队业绩");

        Public.API_GET({
            url: 'listPersonTeamMoneyYear',
            success: function success(result) {
                if (result.isSuccess) {
                    _this.list = result.data.personTeamMoney;
                }
            }
        });
    }
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


window.setToken = function (accessToken) {
    Public.Auth.set({ "accessToken": accessToken });
};
exports.default = {
    data: function data() {
        return {
            'money': {
                'sumReward': '',
                'reward': ''
            },
            'list': [],
            'scroll': {
                'top': '',
                'wh': '',
                'dh': '',
                'beforeTop': 0,
                'flg': true,
                'max': 10,
                'offset': 0,
                'loadTxt': ''
            }, 'first': true,
            initTime: 0,
            assFlag: false
        };
    },
    methods: {
        getData: function getData() {
            var that = this;
            that.scroll.flg = false;
            that.scroll.loadTxt = '加载中...';
            Public.API_GET({
                url: 'getRecommendRewardList',
                data: { "offset": that.scroll.offset, "max": that.scroll.max },
                success: function success(result) {
                    if (result.isSuccess) {
                        that.list = that.list.concat(result.data);
                        that.scroll.offset += that.scroll.max;
                        that.scroll.flg = true;
                        if (result.data.length == 0) {
                            that.first ? that.scroll.loadTxt = '暂无数据' : that.scroll.loadTxt = '没有更多了';
                        } else if (result.data.length < that.scroll.max) {
                            that.scroll.loadTxt = '没有更多了';
                        }
                        that.first = false;
                    }
                }
            });
        },
        initData: function initData() {
            var that = this;
            that.scroll.flg = false;
            if (Public.Auth.get() == 0) {
                that.assFlag = true;
            } else {
                that.assFlag = false;
            }
            Public.API_GET({
                url: 'getRecommendRewardList',
                data: { "offset": that.scroll.offset, "max": that.scroll.max },
                success: function success(result) {
                    if (result.isSuccess) {} else if (that.assFlag) {
                        if (that.initTime < 10) {
                            window.setTimeout(function () {
                                that.initData();
                            }, 500);
                            that.initTime++;
                        }
                    }
                    if (result.isSuccess && result.data.length > 0) {
                        that.list = that.list.concat(result.data);
                        that.scroll.offset += that.scroll.max;
                        that.scroll.flg = true;
                        that.getFund();
                        if (result.data.length < that.scroll.max) {
                            that.scroll.loadTxt = '没有更多了';
                        }
                    } else {
                        that.scroll.loadTxt = '暂无数据';
                    }
                }
            });
        },
        getFund: function getFund() {
            var that = this;
            Public.API_GET({
                url: 'getRecommendRewardAll',
                success: function success(result) {
                    if (result.isSuccess) {
                        that.money = result.data;
                    }
                }
            });
        }
    },

    mounted: function mounted() {
        this.$parent.setTitle("我的佣金");
        var that = this;
        Public.setPageInit(that.initData);
        Public.pageInit();

        that.scroll.wh = $(window).height();
        $(window).on("scroll", function () {
            that.scroll.top = $(this).scrollTop();
            that.scroll.dh = $(document).height();
            if (that.scroll.top + that.scroll.wh >= that.scroll.dh) {
                if (that.scroll.flg) {
                    that.getData();
                }
            }
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            'money': {
                'payToday': '0',
                'payAdd': '0'
            },
            'paymentList': {
                'data': [], 'offset': 0, 'on': { 'menu': true, 'content': true },
                'first': true
            },
            'investList': {
                'data': [], 'offset': 0, 'on': { 'menu': false, 'content': false },
                'first': true
            },
            'scroll': {
                'top': '',
                'wh': '',
                'dh': '',
                'beforeTop': 0,
                'flg': true,
                'max': 10,
                'loadTxt': ''
            }
        };
    },
    methods: {
        getData: function getData(url, obj) {
            var that = this;
            that.scroll.flg = false;
            that.scroll.loadTxt = '加载中...';
            Public.API_GET({
                url: url,
                data: { "offset": obj.offset, "max": that.max },
                success: function success(result) {
                    if (result.isSuccess) {
                        obj.data = obj.data.concat(result.data);
                        obj.offset += that.scroll.max;
                        that.scroll.flg = true;
                        if (result.data.length == 0) {
                            obj.first ? that.scroll.loadTxt = '暂无数据' : that.scroll.loadTxt = '没有更多了';
                        } else if (result.data.length < that.scroll.max) {
                            that.scroll.loadTxt = '没有更多了';
                        }
                        obj.first = false;
                    }
                }
            });
        },
        switchOn: function switchOn(paymentOn, investOn) {
            this.paymentList.on.menu = paymentOn;
            this.paymentList.on.content = paymentOn;
            this.investList.on.menu = investOn;
            this.investList.on.content = investOn;
        },
        tabClick: function tabClick(type) {
            switch (type) {
                case 'payment':
                    this.$parent.setTitle("即将回款");
                    this.switchOn(true, false);
                    this.getData('getRecommendMemberReceipt', this.paymentList);
                    break;
                case 'invest':
                    this.$parent.setTitle("近期投资");
                    this.switchOn(false, true);
                    this.getData('getRecommendMemberInvest', this.investList);
                    break;
            }
        },
        initData: function initData() {
            var that = this;
            that.getData('getRecommendMemberReceipt', that.paymentList);
        }

    },

    created: function created() {
        this.$parent.setTitle("即将回款");
        this.$parent.isIOS();
        var that = this;
        Public.setPageInit(that.initData);
        Public.pageInit();

        that.scroll.wh = $(window).height();
        $(window).on("scroll", function () {
            that.scroll.top = $(this).scrollTop();
            that.scroll.dh = $(document).height();
            if (that.scroll.top + that.scroll.wh >= that.scroll.dh) {
                if (that.scroll.flg) {
                    if (that.paymentList.on.menu) {
                        that.getData('getRecommendMemberReceipt', that.paymentList);
                    } else {
                        that.getData('getRecommendMemberInvest', that.investList);
                    }
                }
            }
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 26 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {};
    },

    methods: {},

    created: function created() {
        this.$parent.setTitle("我的业绩");
    }
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

    var domain = window.location.host.indexOf("localhost") > -1 ? "10.0.20.13" : window.location.host;

    var host = "http://" + domain;

    var Model = {
        loginOn: host + "/wd_api/userCenter/loginOn",

        getClientBirthdayList: host + "/wd_api/financialPlanner/getClientBirthdayList",

        getClientList: host + "/wd_api/financialPlanner/getClientList",

        getRecommendMemberReceipt: host + "/wd_api/financialPlanner/getRecommendMemberReceipt",

        getRecommendMemberInvest: host + "/wd_api/financialPlanner/getRecommendMemberInvest",

        getRecommendRewardAll: host + "/wd_api/financialPlanner/getRecommendRewardAll",

        getRecommendRewardList: host + "/wd_api/financialPlanner/getRecommendRewardList",

        recommendMoneyRecord: host + "/wd_api/recommendMoneyRecord/list",

        recommendMember: host + "/wd_api/recommendMember/list",

        briskRecommand: host + "/wd_api/wealthApp/getBriskProductOn",

        briskProductList: host + "/wd_api/wealthApp/showBriskProductListOn",

        briskArticle: host + "/wd_api/about/getNoticeDetailByTypeOn",

        briskQuestions: host + "/wd_api/helpApp/getHelpListOn",

        protocol: host + "/wd_api/wealthApp/getBriskMemberInfo",

        getCafpTeamIndex: host + "/wd_api/financialPlanner/getCafpTeamIndex",

        getAnnualRankList: host + "/wd_api/financialPlanner/getAnnualRankList",

        removeTeamMember: host + "/wd_api/financialPlanner/removeTeamMember",

        sendVerifyMessage: host + "/wd_api/financialPlanner/sendVerifyMessage",

        addCafpTeam: host + "/wd_api/financialPlanner/addCafpTeam",

        listPersonTeamMoneyYear: host + "/wd_api/financialPlanner/listPersonTeamMoneyYear",

        getPersonSales: host + "/wd_api/financialPlanner/getCafpPersonYearMoney",

        getPersonSalesQuality: host + "/wd_api/financialPlanner/getCafpPersonQuality"

    };
    exports.Model = Model;
}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {

  function MD5(instring) {
    var hexcase = 0;
    var b64pad = "";
    function hex_md5(s) {
      return rstr2hex(rstr_md5(str2rstr_utf8(s)));
    }
    function b64_md5(s) {
      return rstr2b64(rstr_md5(str2rstr_utf8(s)));
    }
    function any_md5(s, e) {
      return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
    }
    function hex_hmac_md5(k, d) {
      return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
    }
    function b64_hmac_md5(k, d) {
      return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
    }
    function any_hmac_md5(k, d, e) {
      return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
    }

    function md5_vm_test() {
      return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    }

    function rstr_md5(s) {
      return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    function rstr_hmac_md5(key, data) {
      var bkey = rstr2binl(key);
      if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

      var ipad = Array(16),
          opad = Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
      return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    function rstr2hex(input) {
      try {
        hexcase;
      } catch (e) {
        hexcase = 0;
      }
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var output = "";
      var x;
      for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
      }
      return output;
    }

    function rstr2b64(input) {
      try {
        b64pad;
      } catch (e) {
        b64pad = '';
      }
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var output = "";
      var len = input.length;
      for (var i = 0; i < len; i += 3) {
        var triplet = input.charCodeAt(i) << 16 | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
          if (i * 8 + j * 6 > input.length * 8) output += b64pad;else output += tab.charAt(triplet >>> 6 * (3 - j) & 0x3F);
        }
      }
      return output;
    }

    function rstr2any(input, encoding) {
      var divisor = encoding.length;
      var i, j, q, x, quotient;

      var dividend = Array(Math.ceil(input.length / 2));
      for (i = 0; i < dividend.length; i++) {
        dividend[i] = input.charCodeAt(i * 2) << 8 | input.charCodeAt(i * 2 + 1);
      }

      var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
      var remainders = Array(full_length);
      for (j = 0; j < full_length; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
          x = (x << 16) + dividend[i];
          q = Math.floor(x / divisor);
          x -= q * divisor;
          if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
      }

      var output = "";
      for (i = remainders.length - 1; i >= 0; i--) {
        output += encoding.charAt(remainders[i]);
      }return output;
    }

    function str2rstr_utf8(input) {
      var output = "";
      var i = -1;
      var x, y;

      while (++i < input.length) {
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }

        if (x <= 0x7F) output += String.fromCharCode(x);else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | x >>> 6 & 0x1F, 0x80 | x & 0x3F);else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 | x >>> 12 & 0x0F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);else if (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | x >>> 18 & 0x07, 0x80 | x >>> 12 & 0x3F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
      }
      return output;
    }

    function str2rstr_utf16le(input) {
      var output = "";
      for (var i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF, input.charCodeAt(i) >>> 8 & 0xFF);
      }return output;
    }

    function str2rstr_utf16be(input) {
      var output = "";
      for (var i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) >>> 8 & 0xFF, input.charCodeAt(i) & 0xFF);
      }return output;
    }

    function rstr2binl(input) {
      var output = Array(input.length >> 2);
      for (var i = 0; i < output.length; i++) {
        output[i] = 0;
      }for (var i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
      }return output;
    }

    function binl2rstr(input) {
      var output = "";
      for (var i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
      }return output;
    }

    function binl_md5(x, len) {
      x[len >> 5] |= 0x80 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;

      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;

      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }

    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }

    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    }

    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }

    return hex_md5(instring);
  }
  exports.MD5 = MD5;
}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

(function (global) {
	var time = Date.now || function () {
		return +new Date();
	};
	var desiredFrames = 60;
	var millisecondsPerSecond = 1000;
	var running = {};
	var counter = 1;

	if (!global.core) {
		global.core = { effect: {} };
	} else if (!core.effect) {
		core.effect = {};
	}

	core.effect.Animate = {
		requestAnimationFrame: function () {
			var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
			var isNative = !!requestFrame;

			if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
				isNative = false;
			}

			if (isNative) {
				return function (callback, root) {
					requestFrame(callback, root);
				};
			}

			var TARGET_FPS = 60;
			var requests = {};
			var requestCount = 0;
			var rafHandle = 1;
			var intervalHandle = null;
			var lastActive = +new Date();

			return function (callback, root) {
				var callbackHandle = rafHandle++;

				requests[callbackHandle] = callback;
				requestCount++;

				if (intervalHandle === null) {

					intervalHandle = setInterval(function () {

						var time = +new Date();
						var currentRequests = requests;

						requests = {};
						requestCount = 0;

						for (var key in currentRequests) {
							if (currentRequests.hasOwnProperty(key)) {
								currentRequests[key](time);
								lastActive = time;
							}
						}

						if (time - lastActive > 2500) {
							clearInterval(intervalHandle);
							intervalHandle = null;
						}
					}, 1000 / TARGET_FPS);
				}

				return callbackHandle;
			};
		}(),

		stop: function stop(id) {
			var cleared = running[id] != null;
			if (cleared) {
				running[id] = null;
			}

			return cleared;
		},

		isRunning: function isRunning(id) {
			return running[id] != null;
		},

		start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {

			var start = time();
			var lastFrame = start;
			var percent = 0;
			var dropCounter = 0;
			var id = counter++;

			if (!root) {
				root = document.body;
			}

			if (id % 20 === 0) {
				var newRunning = {};
				for (var usedId in running) {
					newRunning[usedId] = true;
				}
				running = newRunning;
			}

			var step = function step(virtual) {
				var render = virtual !== true;

				var now = time();

				if (!running[id] || verifyCallback && !verifyCallback(id)) {

					running[id] = null;
					completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
					return;
				}

				if (render) {

					var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
					for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
						step(true);
						dropCounter++;
					}
				}

				if (duration) {
					percent = (now - start) / duration;
					if (percent > 1) {
						percent = 1;
					}
				}

				var value = easingMethod ? easingMethod(percent) : percent;
				if ((stepCallback(value, now, render) === false || percent === 1) && render) {
					running[id] = null;
					completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
				} else if (render) {
					lastFrame = now;
					core.effect.Animate.requestAnimationFrame(step, root);
				}
			};

			running[id] = true;

			core.effect.Animate.requestAnimationFrame(step, root);

			return id;
		}
	};
})(window);

var Scroller;

(function (window) {
	var NOOP = function NOOP() {};

	Scroller = function Scroller(callback, options) {

		this.__callback = callback;


		this.options = {
			scrollingX: true,

			scrollingY: true,

			animating: true,

			animationDuration: 250,

			bouncing: true,

			locking: true,

			paging: false,

			snapping: false,

			zooming: false,

			minZoom: 0.5,

			maxZoom: 3,

			speedMultiplier: 1,

			scrollingComplete: NOOP,

			penetrationDeceleration: 0.03,

			penetrationAcceleration: 0.08

		};

		for (var key in options) {
			this.options[key] = options[key];
		}
	};

	var easeOutCubic = function easeOutCubic(pos) {
		return Math.pow(pos - 1, 3) + 1;
	};

	var easeInOutCubic = function easeInOutCubic(pos) {
		if ((pos /= 0.5) < 1) {
			return 0.5 * Math.pow(pos, 3);
		}

		return 0.5 * (Math.pow(pos - 2, 3) + 2);
	};

	var members = {
		__isSingleTouch: false,

		__isTracking: false,

		__didDecelerationComplete: false,

		__isGesturing: false,

		__isDragging: false,

		__isDecelerating: false,

		__isAnimating: false,

		__clientLeft: 0,

		__clientTop: 0,

		__clientWidth: 0,

		__clientHeight: 0,

		__contentWidth: 0,

		__contentHeight: 0,

		__snapWidth: 100,

		__snapHeight: 100,

		__refreshHeight: null,

		__refreshActive: false,

		__refreshActivate: null,

		__refreshDeactivate: null,

		__refreshStart: null,

		__zoomLevel: 1,

		__scrollLeft: 0,

		__scrollTop: 0,

		__maxScrollLeft: 0,

		__maxScrollTop: 0,

		__scheduledLeft: 0,

		__scheduledTop: 0,

		__scheduledZoom: 0,

		__lastTouchLeft: null,

		__lastTouchTop: null,

		__lastTouchMove: null,

		__positions: null,

		__minDecelerationScrollLeft: null,

		__minDecelerationScrollTop: null,

		__maxDecelerationScrollLeft: null,

		__maxDecelerationScrollTop: null,

		__decelerationVelocityX: null,

		__decelerationVelocityY: null,

		setDimensions: function setDimensions(clientWidth, clientHeight, contentWidth, contentHeight) {

			var self = this;

			if (clientWidth === +clientWidth) {
				self.__clientWidth = clientWidth;
			}

			if (clientHeight === +clientHeight) {
				self.__clientHeight = clientHeight;
			}

			if (contentWidth === +contentWidth) {
				self.__contentWidth = contentWidth;
			}

			if (contentHeight === +contentHeight) {
				self.__contentHeight = contentHeight;
			}

			self.__computeScrollMax();

			self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
		},

		setPosition: function setPosition(left, top) {

			var self = this;

			self.__clientLeft = left || 0;
			self.__clientTop = top || 0;
		},

		setSnapSize: function setSnapSize(width, height) {

			var self = this;

			self.__snapWidth = width;
			self.__snapHeight = height;
		},

		activatePullToRefresh: function activatePullToRefresh(height, activateCallback, deactivateCallback, startCallback) {

			var self = this;

			self.__refreshHeight = height;
			self.__refreshActivate = activateCallback;
			self.__refreshDeactivate = deactivateCallback;
			self.__refreshStart = startCallback;
		},

		triggerPullToRefresh: function triggerPullToRefresh() {
			this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);

			if (this.__refreshStart) {
				this.__refreshStart();
			}
		},

		finishPullToRefresh: function finishPullToRefresh() {

			var self = this;

			self.__refreshActive = false;
			if (self.__refreshDeactivate) {
				self.__refreshDeactivate();
			}

			self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
		},

		getValues: function getValues() {

			var self = this;

			return {
				left: self.__scrollLeft,
				top: self.__scrollTop,
				zoom: self.__zoomLevel
			};
		},

		getScrollMax: function getScrollMax() {

			var self = this;

			return {
				left: self.__maxScrollLeft,
				top: self.__maxScrollTop
			};
		},

		zoomTo: function zoomTo(level, animate, originLeft, originTop, callback) {

			var self = this;

			if (!self.options.zooming) {
				throw new Error("Zooming is not enabled!");
			}

			if (callback) {
				self.__zoomComplete = callback;
			}

			if (self.__isDecelerating) {
				core.effect.Animate.stop(self.__isDecelerating);
				self.__isDecelerating = false;
			}

			var oldLevel = self.__zoomLevel;

			if (originLeft == null) {
				originLeft = self.__clientWidth / 2;
			}

			if (originTop == null) {
				originTop = self.__clientHeight / 2;
			}

			level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

			self.__computeScrollMax(level);

			var left = (originLeft + self.__scrollLeft) * level / oldLevel - originLeft;
			var top = (originTop + self.__scrollTop) * level / oldLevel - originTop;

			if (left > self.__maxScrollLeft) {
				left = self.__maxScrollLeft;
			} else if (left < 0) {
				left = 0;
			}

			if (top > self.__maxScrollTop) {
				top = self.__maxScrollTop;
			} else if (top < 0) {
				top = 0;
			}

			self.__publish(left, top, level, animate);
		},

		zoomBy: function zoomBy(factor, animate, originLeft, originTop, callback) {

			var self = this;

			self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);
		},

		scrollTo: function scrollTo(left, top, animate, zoom) {

			var self = this;

			if (self.__isDecelerating) {
				core.effect.Animate.stop(self.__isDecelerating);
				self.__isDecelerating = false;
			}

			if (zoom != null && zoom !== self.__zoomLevel) {

				if (!self.options.zooming) {
					throw new Error("Zooming is not enabled!");
				}

				left *= zoom;
				top *= zoom;

				self.__computeScrollMax(zoom);
			} else {
				zoom = self.__zoomLevel;
			}

			if (!self.options.scrollingX) {

				left = self.__scrollLeft;
			} else {

				if (self.options.paging) {
					left = Math.round(left / self.__clientWidth) * self.__clientWidth;
				} else if (self.options.snapping) {
					left = Math.round(left / self.__snapWidth) * self.__snapWidth;
				}
			}

			if (!self.options.scrollingY) {

				top = self.__scrollTop;
			} else {

				if (self.options.paging) {
					top = Math.round(top / self.__clientHeight) * self.__clientHeight;
				} else if (self.options.snapping) {
					top = Math.round(top / self.__snapHeight) * self.__snapHeight;
				}
			}

			left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
			top = Math.max(Math.min(self.__maxScrollTop, top), 0);

			if (left === self.__scrollLeft && top === self.__scrollTop) {
				animate = false;
			}

			if (!self.__isTracking) {
				self.__publish(left, top, zoom, animate);
			}
		},

		scrollBy: function scrollBy(left, top, animate) {

			var self = this;

			var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
			var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;

			self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);
		},

		doMouseZoom: function doMouseZoom(wheelDelta, timeStamp, pageX, pageY) {

			var self = this;
			var change = wheelDelta > 0 ? 0.97 : 1.03;

			return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);
		},

		doTouchStart: function doTouchStart(touches, timeStamp) {
			if (touches.length == null) {
				throw new Error("Invalid touch list: " + touches);
			}

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			var self = this;

			self.__interruptedAnimation = true;

			if (self.__isDecelerating) {
				core.effect.Animate.stop(self.__isDecelerating);
				self.__isDecelerating = false;
				self.__interruptedAnimation = true;
			}

			if (self.__isAnimating) {
				core.effect.Animate.stop(self.__isAnimating);
				self.__isAnimating = false;
				self.__interruptedAnimation = true;
			}

			var currentTouchLeft, currentTouchTop;
			var isSingleTouch = touches.length === 1;
			if (isSingleTouch) {
				currentTouchLeft = touches[0].pageX;
				currentTouchTop = touches[0].pageY;
			} else {
				currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
				currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
			}

			self.__initialTouchLeft = currentTouchLeft;
			self.__initialTouchTop = currentTouchTop;

			self.__zoomLevelStart = self.__zoomLevel;

			self.__lastTouchLeft = currentTouchLeft;
			self.__lastTouchTop = currentTouchTop;

			self.__lastTouchMove = timeStamp;

			self.__lastScale = 1;

			self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
			self.__enableScrollY = !isSingleTouch && self.options.scrollingY;

			self.__isTracking = true;

			self.__didDecelerationComplete = false;

			self.__isDragging = !isSingleTouch;

			self.__isSingleTouch = isSingleTouch;

			self.__positions = [];
		},

		doTouchMove: function doTouchMove(touches, timeStamp, scale) {
			if (touches.length == null) {
				throw new Error("Invalid touch list: " + touches);
			}

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			var self = this;

			if (!self.__isTracking) {
				return;
			}

			var currentTouchLeft, currentTouchTop;

			if (touches.length === 2) {
				currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
				currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
			} else {
				currentTouchLeft = touches[0].pageX;
				currentTouchTop = touches[0].pageY;
			}

			var positions = self.__positions;

			if (self.__isDragging) {
				var moveX = currentTouchLeft - self.__lastTouchLeft;
				var moveY = currentTouchTop - self.__lastTouchTop;

				var scrollLeft = self.__scrollLeft;
				var scrollTop = self.__scrollTop;
				var level = self.__zoomLevel;

				if (scale != null && self.options.zooming) {

					var oldLevel = level;

					level = level / self.__lastScale * scale;

					level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

					if (oldLevel !== level) {
						var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
						var currentTouchTopRel = currentTouchTop - self.__clientTop;

						scrollLeft = (currentTouchLeftRel + scrollLeft) * level / oldLevel - currentTouchLeftRel;
						scrollTop = (currentTouchTopRel + scrollTop) * level / oldLevel - currentTouchTopRel;

						self.__computeScrollMax(level);
					}
				}

				if (self.__enableScrollX) {

					scrollLeft -= moveX * this.options.speedMultiplier;
					var maxScrollLeft = self.__maxScrollLeft;

					if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
						if (self.options.bouncing) {

							scrollLeft += moveX / 2 * this.options.speedMultiplier;
						} else if (scrollLeft > maxScrollLeft) {

							scrollLeft = maxScrollLeft;
						} else {

							scrollLeft = 0;
						}
					}
				}

				if (self.__enableScrollY) {

					scrollTop -= moveY * this.options.speedMultiplier;
					var maxScrollTop = self.__maxScrollTop;

					if (scrollTop > maxScrollTop || scrollTop < 0) {
						if (self.options.bouncing) {

							scrollTop += moveY / 2 * this.options.speedMultiplier;

							if (!self.__enableScrollX && self.__refreshHeight != null) {

								if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {

									self.__refreshActive = true;
									if (self.__refreshActivate) {
										self.__refreshActivate();
									}
								} else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {

									self.__refreshActive = false;
									if (self.__refreshDeactivate) {
										self.__refreshDeactivate();
									}
								}
							}
						} else if (scrollTop > maxScrollTop) {

							scrollTop = maxScrollTop;
						} else {

							scrollTop = 0;
						}
					}
				}

				if (positions.length > 60) {
					positions.splice(0, 30);
				}

				positions.push(scrollLeft, scrollTop, timeStamp);

				self.__publish(scrollLeft, scrollTop, level);
			} else {

				var minimumTrackingForScroll = self.options.locking ? 3 : 0;
				var minimumTrackingForDrag = 5;

				var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
				var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

				self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
				self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;

				positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);

				self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
				if (self.__isDragging) {
					self.__interruptedAnimation = false;
				}
			}

			self.__lastTouchLeft = currentTouchLeft;
			self.__lastTouchTop = currentTouchTop;
			self.__lastTouchMove = timeStamp;
			self.__lastScale = scale;
		},

		doTouchEnd: function doTouchEnd(timeStamp) {

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			var self = this;

			if (!self.__isTracking) {
				return;
			}

			self.__isTracking = false;

			if (self.__isDragging) {
				self.__isDragging = false;

				if (self.__isSingleTouch && self.options.animating && timeStamp - self.__lastTouchMove <= 100) {
					var positions = self.__positions;
					var endPos = positions.length - 1;
					var startPos = endPos;

					for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 3) {
						startPos = i;
					}

					if (startPos !== endPos) {
						var timeOffset = positions[endPos] - positions[startPos];
						var movedLeft = self.__scrollLeft - positions[startPos - 2];
						var movedTop = self.__scrollTop - positions[startPos - 1];

						self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
						self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

						var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;

						if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
							if (!self.__refreshActive) {
								self.__startDeceleration(timeStamp);
							}
						} else {
							self.options.scrollingComplete();
						}
					} else {
						self.options.scrollingComplete();
					}
				} else if (timeStamp - self.__lastTouchMove > 100) {
					self.options.scrollingComplete();
				}
			}

			if (!self.__isDecelerating) {

				if (self.__refreshActive && self.__refreshStart) {
					self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);

					if (self.__refreshStart) {
						self.__refreshStart();
					}
				} else {

					if (self.__interruptedAnimation || self.__isDragging) {
						self.options.scrollingComplete();
					}
					self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);

					if (self.__refreshActive) {

						self.__refreshActive = false;
						if (self.__refreshDeactivate) {
							self.__refreshDeactivate();
						}
					}
				}
			}

			self.__positions.length = 0;
		},

		__publish: function __publish(left, top, zoom, animate) {

			var self = this;

			var wasAnimating = self.__isAnimating;
			if (wasAnimating) {
				core.effect.Animate.stop(wasAnimating);
				self.__isAnimating = false;
			}

			if (animate && self.options.animating) {
				self.__scheduledLeft = left;
				self.__scheduledTop = top;
				self.__scheduledZoom = zoom;

				var oldLeft = self.__scrollLeft;
				var oldTop = self.__scrollTop;
				var oldZoom = self.__zoomLevel;

				var diffLeft = left - oldLeft;
				var diffTop = top - oldTop;
				var diffZoom = zoom - oldZoom;

				var step = function step(percent, now, render) {

					if (render) {

						self.__scrollLeft = oldLeft + diffLeft * percent;
						self.__scrollTop = oldTop + diffTop * percent;
						self.__zoomLevel = oldZoom + diffZoom * percent;

						if (self.__callback) {
							self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
						}
					}
				};

				var verify = function verify(id) {
					return self.__isAnimating === id;
				};

				var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
					if (animationId === self.__isAnimating) {
						self.__isAnimating = false;
					}
					if (self.__didDecelerationComplete || wasFinished) {
						self.options.scrollingComplete();
					}

					if (self.options.zooming) {
						self.__computeScrollMax();
						if (self.__zoomComplete) {
							self.__zoomComplete();
							self.__zoomComplete = null;
						}
					}
				};

				self.__isAnimating = core.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
			} else {

				self.__scheduledLeft = self.__scrollLeft = left;
				self.__scheduledTop = self.__scrollTop = top;
				self.__scheduledZoom = self.__zoomLevel = zoom;

				if (self.__callback) {
					self.__callback(left, top, zoom);
				}

				if (self.options.zooming) {
					self.__computeScrollMax();
					if (self.__zoomComplete) {
						self.__zoomComplete();
						self.__zoomComplete = null;
					}
				}
			}
		},

		__computeScrollMax: function __computeScrollMax(zoomLevel) {

			var self = this;

			if (zoomLevel == null) {
				zoomLevel = self.__zoomLevel;
			}

			self.__maxScrollLeft = Math.max(self.__contentWidth * zoomLevel - self.__clientWidth, 0);
			self.__maxScrollTop = Math.max(self.__contentHeight * zoomLevel - self.__clientHeight, 0);
		},

		__startDeceleration: function __startDeceleration(timeStamp) {

			var self = this;

			if (self.options.paging) {

				var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
				var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
				var clientWidth = self.__clientWidth;
				var clientHeight = self.__clientHeight;

				self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
				self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
				self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
				self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
			} else {

				self.__minDecelerationScrollLeft = 0;
				self.__minDecelerationScrollTop = 0;
				self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
				self.__maxDecelerationScrollTop = self.__maxScrollTop;
			}

			var step = function step(percent, now, render) {
				self.__stepThroughDeceleration(render);
			};

			var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.001;

			var verify = function verify() {
				var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
				if (!shouldContinue) {
					self.__didDecelerationComplete = true;
				}
				return shouldContinue;
			};

			var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
				self.__isDecelerating = false;
				if (self.__didDecelerationComplete) {
					self.options.scrollingComplete();
				}

				self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
			};

			self.__isDecelerating = core.effect.Animate.start(step, verify, completed);
		},

		__stepThroughDeceleration: function __stepThroughDeceleration(render) {

			var self = this;

			var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
			var scrollTop = self.__scrollTop + self.__decelerationVelocityY;

			if (!self.options.bouncing) {

				var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
				if (scrollLeftFixed !== scrollLeft) {
					scrollLeft = scrollLeftFixed;
					self.__decelerationVelocityX = 0;
				}

				var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
				if (scrollTopFixed !== scrollTop) {
					scrollTop = scrollTopFixed;
					self.__decelerationVelocityY = 0;
				}
			}

			if (render) {

				self.__publish(scrollLeft, scrollTop, self.__zoomLevel);
			} else {

				self.__scrollLeft = scrollLeft;
				self.__scrollTop = scrollTop;
			}

			if (!self.options.paging) {
				var frictionFactor = 0.95;

				self.__decelerationVelocityX *= frictionFactor;
				self.__decelerationVelocityY *= frictionFactor;
			}

			if (self.options.bouncing) {

				var scrollOutsideX = 0;
				var scrollOutsideY = 0;

				var penetrationDeceleration = self.options.penetrationDeceleration;
				var penetrationAcceleration = self.options.penetrationAcceleration;

				if (scrollLeft < self.__minDecelerationScrollLeft) {
					scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
				} else if (scrollLeft > self.__maxDecelerationScrollLeft) {
					scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
				}

				if (scrollTop < self.__minDecelerationScrollTop) {
					scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
				} else if (scrollTop > self.__maxDecelerationScrollTop) {
					scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
				}

				if (scrollOutsideX !== 0) {
					if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
						self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
					} else {
						self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
					}
				}

				if (scrollOutsideY !== 0) {
					if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
						self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
					} else {
						self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
					}
				}
			}
		}
	};

	for (var key in members) {
		Scroller.prototype[key] = members[key];
	}

	if (typeof module != 'undefined' && module.exports) {
		module.exports = Scroller;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return Scroller;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.Scroller = Scroller;
	}
})(window);

/***/ },
/* 30 */
/***/ function(module, exports) {

"use strict";
'use strict';

function getContentRender(content) {
  var global = window;

  var docStyle = document.documentElement.style;

  var engine;
  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }

  var vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine];

  var helperElem = document.createElement("div");
  var undef;

  var perspectiveProperty = vendorPrefix + "Perspective";
  var transformProperty = vendorPrefix + "Transform";

  if (helperElem.style[perspectiveProperty] !== undef) {

    return function (left, top, zoom) {
      content.style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0) scale(' + zoom + ')';
    };
  } else if (helperElem.style[transformProperty] !== undef) {

    return function (left, top, zoom) {
      content.style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px) scale(' + zoom + ')';
    };
  } else {

    return function (left, top, zoom) {
      content.style.marginLeft = left ? -left / zoom + 'px' : '';
      content.style.marginTop = top ? -top / zoom + 'px' : '';
      content.style.zoom = zoom || '';
    };
  }
}

module.exports = getContentRender;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".layui-m-layer{position:relative;z-index:19891014}.layui-m-layer *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.layui-m-layermain,.layui-m-layershade{position:fixed;left:0;top:0;width:100%;height:100%}.layui-m-layershade{background-color:rgba(0,0,0,.7);pointer-events:auto}.layui-m-layermain{display:table;font-family:Helvetica,arial,sans-serif;pointer-events:none}.layui-m-layermain .layui-m-layersection{display:table-cell;vertical-align:middle;text-align:center}.layui-m-layerchild{position:relative;display:inline-block;text-align:left;background-color:#fff;font-size:14px;border-radius:5px;box-shadow:0 0 8px rgba(0,0,0,.1);pointer-events:auto;-webkit-overflow-scrolling:touch;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.2s;animation-duration:.2s}@-webkit-keyframes layui-m-anim-scale{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes layui-m-anim-scale{0%{opacity:0;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.layui-m-anim-scale{animation-name:layui-m-anim-scale;-webkit-animation-name:layui-m-anim-scale}@-webkit-keyframes layui-m-anim-up{0%{opacity:0;-webkit-transform:translateY(800px);transform:translateY(800px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes layui-m-anim-up{0%{opacity:0;-webkit-transform:translateY(800px);transform:translateY(800px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}.layui-m-anim-up{-webkit-animation-name:layui-m-anim-up;animation-name:layui-m-anim-up}.layui-m-layer0 .layui-m-layerchild{width:90%;max-width:640px}.layui-m-layer1 .layui-m-layerchild{border:none;border-radius:0}.layui-m-layer2 .layui-m-layerchild{width:auto;max-width:260px;min-width:40px;border:none;background:0 0;box-shadow:none;color:#fff}.layui-m-layerchild h3{margin:0;padding:0 10px;height:60px;line-height:60px;font-size:16px;font-weight:400;border-radius:5px 5px 0 0;text-align:center}.layui-m-layerbtn span,.layui-m-layerchild h3{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.layui-m-layercont{padding:50px 30px;line-height:22px;text-align:center}.layui-m-layer1 .layui-m-layercont{padding:0;text-align:left}.layui-m-layer2 .layui-m-layercont{text-align:center;padding:0;line-height:0}.layui-m-layer2 .layui-m-layercont i{width:25px;height:25px;margin-left:8px;display:inline-block;background-color:#fff;border-radius:100%;-webkit-animation:layui-m-anim-loading 1.4s infinite ease-in-out;animation:layui-m-anim-loading 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.layui-m-layerbtn,.layui-m-layerbtn span{position:relative;text-align:center;border-radius:0 0 5px 5px}.layui-m-layer2 .layui-m-layercont p{margin-top:20px}@-webkit-keyframes layui-m-anim-loading{0%,100%,80%{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}@keyframes layui-m-anim-loading{0%,100%,80%{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}.layui-m-layer2 .layui-m-layercont i:first-child{margin-left:0;-webkit-animation-delay:-.32s;animation-delay:-.32s}.layui-m-layer2 .layui-m-layercont i.layui-m-layerload{-webkit-animation-delay:-.16s;animation-delay:-.16s}.layui-m-layer2 .layui-m-layercont>div{line-height:22px;padding-top:7px;margin-bottom:20px;font-size:14px}.layui-m-layerbtn{display:box;display:-moz-box;display:-webkit-box;width:100%;height:50px;line-height:50px;font-size:0;border-top:1px solid #D0D0D0;background-color:#F2F2F2}.layui-m-layerbtn span{display:block;-moz-box-flex:1;box-flex:1;-webkit-box-flex:1;font-size:14px;cursor:pointer}.layui-m-layerbtn span[yes]{color:#40AFFE}.layui-m-layerbtn span[no]{border-right:1px solid #D0D0D0;border-radius:0 0 0 5px}.layui-m-layerbtn span:active{background-color:#F6F6F6}.layui-m-layerend{position:absolute;right:7px;top:10px;width:30px;height:30px;border:0;font-weight:400;background:0 0;cursor:pointer;-webkit-appearance:none;font-size:30px}.layui-m-layerend::after,.layui-m-layerend::before{position:absolute;left:5px;top:15px;content:'';width:18px;height:1px;background-color:#999;transform:rotate(45deg);-webkit-transform:rotate(45deg);border-radius:3px}.layui-m-layerend::after{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}body .layui-m-layer .layui-m-layer-footer{position:fixed;width:95%;max-width:100%;margin:0 auto;left:0;right:0;bottom:10px;background:0 0}.layui-m-layer-footer .layui-m-layercont{padding:20px;border-radius:5px 5px 0 0;background-color:rgba(255,255,255,.8)}.layui-m-layer-footer .layui-m-layerbtn{display:block;height:auto;background:0 0;border-top:none}.layui-m-layer-footer .layui-m-layerbtn span{background-color:rgba(255,255,255,.8)}.layui-m-layer-footer .layui-m-layerbtn span[no]{color:#FD482C;border-top:1px solid #c2c2c2;border-radius:0 0 5px 5px}.layui-m-layer-footer .layui-m-layerbtn span[yes]{margin-top:10px;border-radius:5px}body .layui-m-layer .layui-m-layer-msg{width:auto;max-width:90%;margin:0 auto;bottom:-150px;background-color:rgba(0,0,0,.7);color:#fff}.layui-m-layer-msg .layui-m-layercont{padding:10px 20px}\r\n\r\n@font-face {font-family: \"iconfont\";\r\n  src: url(" + __webpack_require__(4) + "); /* IE9*/\r\n  src: url(" + __webpack_require__(4) + "#iefix) format('embedded-opentype'), \r\n  url(" + __webpack_require__(44) + ") format('woff'), \r\n  url(" + __webpack_require__(43) + ") format('truetype'), \r\n  url(" + __webpack_require__(37) + "#iconfont) format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -webkit-text-stroke-width: 0.2px;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-appreciate:before { content: \"\\E644\"; }\r\n\r\n.icon-check:before { content: \"\\E645\"; }\r\n\r\n.icon-close:before { content: \"\\E646\"; }\r\n\r\n.icon-warn:before { content: \"\\E663\"; }\r\n\r\n.icon-delete:before { content: \"\\E6B4\"; }\r\n\r\n.icon-notice:before { content: \"\\E70A\"; }\r\n\r\n.icon-github:before { content: \"\\E66C\"; }\r\n\r\n", ""]);

// exports


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 80%;\n  overflow-x: hidden;\n}\n@media only screen and (min-width: 481px) {\nhtml {\n    font-size: 94% !important;\n}\n}\n@media only screen and (min-width: 561px) {\nhtml {\n    font-size: 109% !important;\n}\n}\n@media only screen and (min-width: 641px) {\nhtml {\n    font-size: 125% !important;\n}\n}\na {\n  -webkit-tap-highlight-color: transparent;\n}\nhtml, body {\n  width: 100%;\n  height: 100%;\n  min-height: 100%;\n  margin: 0;\n  padding: 0;\n  background-color: #fff;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n}\nbody {\n  color: #333;\n  font-family: Helvetica,'Microsoft YaHei', 'Heiti', 'SC';\n}\na {\n  color: #12adff;\n  text-decoration: none;\n}\nh1, h2, h3, h4, h5, h6, dl, dt, dd, form, input, hr, img, div, label, span, p, ul, ol, li {\n  margin: 0;\n  padding: 0;\n}\nul, li {\n  list-style: none;\n}\nh4 {\n  font-size: 16px;\n}\nh5 {\n  font-size: 14px;\n}\nh6 {\n  font-size: 12px;\n}\nimg {\n  max-width: 100%;\n  border: 0;\n  vertical-align: middle;\n}\npre {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\nstrong {\n  font-weight: normal;\n}\n.dp_ib {\n  display: inline-block;\n  vertical-align: middle;\n}\n.dp_b {\n  display: block;\n}\n.p_tb_373 {\n  padding-top: 3.733%;\n  padding-bottom: 3.733%;\n}\n.pt_40 {\n  padding-top: 40px;\n}\n.pr {\n  position: relative;\n}\n.mt_5 {\n  margin-top: 5%;\n}\n.mt_10 {\n  margin-top: 10px;\n}\n.mt_20 {\n  margin-top: 20px;\n}\n.mt_30 {\n  margin-top: 30px;\n}\n.mt_40 {\n  margin-top: 40px;\n}\n.mb_10 {\n  margin-bottom: 10px;\n}\n.mb_20 {\n  margin-bottom: 20px;\n}\n.mb_30 {\n  margin-bottom: 30px;\n}\n.mr_20 {\n  margin-right: 10%;\n}\n.mr_10 {\n  margin-right: 10px;\n}\n.ml_10 {\n  margin-left: 10%;\n}\n.ml_5 {\n  margin-left: 5%;\n}\n.ml_2 {\n  margin-left: 2%;\n}\n.m10 {\n  margin: 10px;\n}\n.fl {\n  float: left;\n}\n.fr {\n  float: right;\n}\n.t_l {\n  text-align: left;\n}\n.t_c {\n  text-align: center;\n}\n.t_r {\n  text-align: right;\n}\n.f_0 {\n  font-size: 0;\n}\n.f_10 {\n  font-size: 1rem;\n}\n.f_12 {\n  font-size: 1.2rem;\n}\n.f_14 {\n  font-size: 1.4rem;\n}\n.c_666 {\n  color: #666;\n}\n.c_999 {\n  color: #999;\n}\n.c_e71 {\n  color: #e71c18;\n}\n.w_33 {\n  width: 33.33%;\n  min-width: 33.33%;\n}\n.w_15 {\n  width: 15%;\n  min-width: 15%;\n}\n.w_20 {\n  width: 20%;\n  min-width: 20%;\n}\n.w_22 {\n  width: 22%;\n  min-width: 22%;\n}\n.w_25 {\n  width: 25%;\n  min-width: 25%;\n}\n.w_27 {\n  width: 27%;\n  min-width: 27%;\n}\n.w_30 {\n  width: 30%;\n  min-width: 30%;\n}\n.w_40 {\n  width: 40%;\n  min-width: 40%;\n}\n.w_50 {\n  width: 50%;\n  min-width: 50%;\n}\n.w_53 {\n  width: 53%;\n  min-width: 53%;\n}\n.w_45 {\n  width: 45%;\n  min-width: 45%;\n}\n.w_55 {\n  width: 55%;\n  min-width: 55%;\n}\n.w_58 {\n  width: 58%;\n  min-width: 58%;\n}\n.w_66 {\n  width: 66%;\n  min-width: 66%;\n}\n.w_75 {\n  width: 75%;\n  min-width: 75%;\n}\n.w_82 {\n  width: 82%;\n  min-width: 82%;\n}\n.w_100 {\n  width: 100%;\n  overflow: hidden;\n}\n.w_150 {\n  width: 150%;\n}\n.w_12 {\n  width: 2.5rem;\n}\n.m_w55 {\n  width: 55%;\n}\n.h_12 {\n  height: 2.5rem;\n}\n.icon-sms:before {\n  font-size: 1.6rem;\n}\n.icon-tel:before {\n  font-size: 1.6rem;\n}\n.p_tb_5 {\n  padding-top: 5% !important;\n  padding-bottom: 5% !important;\n}\n.p_5 {\n  padding: 5%;\n}\n.p_l_5 {\n  padding-left: 5%;\n}\n.pt_1 {\n  padding-top: 1rem;\n}\n.pb_1 {\n  padding-bottom: 1rem;\n}\n.lh15 {\n  line-height: 1.5;\n}\n.lh_18 {\n  line-height: 1.8;\n}\n.lh_22 {\n  line-height: 2.2;\n}\n.lh_30 {\n  line-height: 30px;\n}\n.lh_40 {\n  line-height: 40px;\n}\n\n/*公共边距*/\n.compd {\n  padding-left: 4.266%;\n  padding-right: 4.266%;\n}\n\n/*大字:1.4rem*/\n/*小字:1.2rem*/\n/*深色:#666*/\n/*浅色:#999*/\n/*红色:#e71c18*/\n/*黄色:#f6cd53*/\n/*蓝色:#2d449f*/\n.c {\n  clear: both;\n}\n.cc {\n  *zoom: 1;\n}\n.bg_edf {\n  background: #EDF0F3;\n}\n.cc:after {\n  content: '/20';\n  clear: both;\n  height: 0;\n  visibility: hidden;\n  display: block;\n}\n.content {\n  position: static;\n}\n.v-hide {\n  display: none;\n}\n.br_5 {\n  border-radius: 5px;\n}\n.b_fff {\n  background: #fff;\n}\n.nav {\n  height: 88px;\n  line-height: 88px;\n  background-color: #033b88;\n  font-size: 20px;\n  text-align: center;\n  color: #fff;\n}\n.mb {\n  margin-bottom: 10px;\n}\n.alert {\n  margin: 10px;\n  text-align: center;\n  padding: 10px 0;\n  border: 1px solid #d8d8d8;\n}\n.top_nav {\n  width: 100%;\n  height: 40px;\n  border-bottom: 1px solid #a4a7a9;\n  background-color: #fff;\n  color: #222;\n  text-align: center;\n  left: 0;\n  top: 0px;\n  right: 0;\n  z-index: 10;\n}\n.top_nav div {\n  margin: 0 50px;\n  height: 40px;\n  font-size: 16px;\n  line-height: 40px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.top_nav .back,\n.top_nav .reload {\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  font-size: 26px;\n  color: #2d449f;\n  position: absolute;\n  top: 0;\n  display: block;\n  cursor: pointer;\n}\n.top_nav .back {\n  left: 0;\n}\n.top_nav .reload {\n  right: 0;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAqCAYAAADbCvnoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM7SURBVFhHxZg9aFNhFIZTKa1VUKhDq2O1Wuoqzh1CrZMgIhYRdBDBRZ10VFFQcCquRUEdpIqOboJQNDgVHGwLLf7XVkToYP1LfE7umzRf72+Tr+kDL/fmfO95z0dI7r1JzgfFYnEXeoz2q7S+lEqlblThBhvbrKX1gQ10oc/aUInzaXREy81HG5rTfqpQG0P9sjUPhnag6jtUC/Vf6Aqnm2RfW7SZXrQQbCEa1qfQYbX5g9C96Ay6j8bRW/QeFTU7EWwP0U7F1Q8hw+iZchuCnEV0kdNWxWeHxoOoEET5hdx5dEGj0sE8ot41gfxv6LTGxYNpC3qhPu+Q/YfDZdSmkfFg2krDhDVmAe9PtID+qpQIvico27UJfyvm10FrPHgm0DU0iLoo9XAMXRhrUc8hjcoGDaPqj4T1SXSc0w1qKUOtHX0JXC7UFzlcQk5PKjTkLSCBu4R3yO5APenWUd81h8Zp5YRgbUS2SFi3DX2S3fx2cz2q5dVjzcoKwdoj2WLBVn38wH8dNfb4QcC48hyoz6F22WLBY/eyp2ifSvVDyG7ND8HaCdkSwZp+PckKQ88G412oz8jSXBh8T3twoH5TlubC4MgbJ/VBWZoLg2e1hyrUfnPokaW5MHw+2MYy1L6iLlm8w4gW1M2MHXasPV+XDVk2sovnd2SPICY7n7LFGe2jCjV7MO9Vv3fI3qNRK/lhi6/0woH6AfV7x7I1xsH2YosP9NqB+lX1e8eyNcbB9mKL5/Tagfqk+r1j2RrjYHuxT3xf8DIMhmPK8IZlKj6KvorppQoO1D9w2Fg2ecCyyPxYDl+B7UG28oaGVQ/B2phsDWNZig1he5AtuFBRSHpAuyVr3ViG4kJodousARQGyqsx0GQ/gbfJnhnrsV7FxDEguwuNt2WIhPV3HE6i1Ad28+A/pZ5YbKZaosGQ+rMZj31t7Z+yIdSPtkt2PqS1yK92LXgKGhsPpk70Rj2p4F1Cdu8zLamcis1AnRqbjBlR5HO2Dyw782Yq0NdGU+Jnqh6UWf8zOM15QlJ/XqehjLxiG4dA+8PqOfoXjEjHvOpZvuj5hnD7Jp1Hd1ABzaLKh9rOrWZr5lnlP7C53H+iPwWGdl7CxwAAAABJRU5ErkJggg==) center center no-repeat;\n  background-size: auto 16px;\n}\n\n/*tab选项卡*/\n.details {\n  position: relative;\n}\n.details .column {\n  font-size: 1.3rem;\n  position: absolute;\n  z-index: 9;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  /* -webkit-transition: all .3s linear 0s;-moz-webkit-transition: all .3s linear 0s;-ms-webkit-transition: all .3s linear 0s;-o-webkit-transition: all .3s linear 0s;transition: all .3s linear 0s;*/\n  text-align: center;\n  color: #a9b3c2;\n  border-bottom: .1rem solid #e1e8f2;\n  background: #fff;\n}\n.details .fix {\n  position: fixed;\n  top: 40px;\n}\n.noNav .details .fix {\n  position: fixed;\n  top: 0;\n}\n\n/*app、微信去除固定栏目的padding-top*/\n.details .column li {\n  box-sizing: border-box;\n  float: left;\n  width: 33.333%;\n  padding-top: 13px;\n  padding-bottom: 11px;\n  border-bottom: 2px solid #fff;\n}\n.details .column li:last-child {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.details .column li.on {\n  font-size: 1.5rem;\n  color: #2d449f;\n  border-bottom-color: #f6cd53;\n}\n\n/*项目清单*/\n.project {\n  background: #fff;\n}\n.project a {\n  display: block;\n  color: #999;\n  border-bottom: .1rem solid #e1e8f2;\n}\n.project a:last-child {\n  border-bottom: none;\n}\n.project ul {\n  font-size: 1.2rem;\n  color: #999;\n}\n.project ul li {\n  width: 100%;\n  padding: 4.266% 0;\n}\n.project li p {\n  width: 100%;\n  line-height: 1.7;\n}\n.project li p span {\n  display: inline-block;\n  vertical-align: middle;\n  text-align: right;\n}\n.project li p span:first-child {\n  width: 70%;\n  font-size: 1.4rem;\n  color: #555;\n  text-align: left;\n}\n.project li p span:last-child {\n  width: 30%;\n}\n.project ul li span.year {\n  font-size: 1.4rem;\n  color: #e71c18;\n}\n\n/*栏目*/\n.invest-list {\n  font-size: 1.2rem;\n  padding-top: 3.7333%;\n  padding-bottom: 3.7333%;\n  color: #666;\n}\n.invest-list strong {\n  font-weight: normal;\n  color: #2d449f;\n}\n\n/*加载*/\n.load-gif {\n  line-height: 40px;\n  color: #999;\n  text-align: center;\n  background-color: #f1f1f1;\n}\n.load-hide {\n  display: none;\n}\n\n/*客户页面*/\n.customer-bar {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.customer-bar .customer-col {\n  width: 22%;\n  float: left;\n  text-align: center;\n  position: relative;\n  padding-top: 10px;\n}\n.customer-bar .customer-logo-alert {\n  width: 16px;\n  height: 16px;\n  border-radius: 100%;\n  line-height: 16px;\n  position: absolute;\n  right: 8px;\n  top: 5px;\n  color: white;\n  background-color: red;\n  font-size: 12px;\n}\n.customer-bar .customer-col + .customer-col {\n  margin-left: 4%;\n}\n.customer-logo-cover {\n  width: 40px;\n  margin: 0 auto 10px auto;\n}\n.customer-logo-cover i {\n  color: #033b88;\n  font-size: 2.4rem;\n}\n.customer-title {\n  background-color: #edf0f3;\n}\n.customer-title span {\n    float: right;\n}\n.customer-tab {\n  margin: 0 auto;\n}\n.customer-tab {\n  background-color: #f1f1f1;\n}\n.customer-tab ul li {\n    display: block;\n    width: 16.6666%;\n    float: left;\n    text-align: center;\n    padding: 8px 0;\n    background-color: #f1f1f1;\n    color: #a5a5a5;\n    border-left: 1px solid #b7b7b7;\n    border-top: 1px solid #b7b7b7;\n    border-bottom: 1px solid #033b88;\n}\n.customer-tab ul li.on {\n    color: #033b88;\n    border-top: 1px solid #033b88;\n    background-color: white;\n    border-left: 1px solid #033b88;\n    border-bottom: 1px solid white;\n}\n.customer-tab ul li.on + li {\n    border-left: 1px solid #033b88;\n}\n.customer-tab ul li:first-child {\n    border-left: none;\n}\n.record-list {\n  background-color: #fff;\n  width: 100%;\n}\n.record-list table {\n  font-size: 1.2rem;\n  line-height: 1.6rem;\n  border-collapse: collapse;\n  color: #555;\n  background-color: #fff;\n  width: 100%;\n}\n.record-list table tr th {\n  background: #edf0f3;\n}\n.record-list table tr th:first-child {\n  padding: 13px 14px;\n  text-align: left;\n}\n.record-list table tr th:last-child {\n  text-align: right;\n  color: #333;\n}\n.record-list table tr th span {\n  color: #2d449f;\n}\n.record-list table tbody tr {\n  border-bottom: 1px solid #ececec;\n}\n.record-list table tbody tr td {\n  padding: 1rem 0;\n}\n.record-list table tbody tr td:first-child {\n  border: 0;\n}\n.record-list table tbody tr td:nth-child(2) {\n  text-indent: 0.2em;\n}\n.record-list table tr:last-child td {\n  border: none;\n}\n.record-list .list-right {\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  line-height: 2rem;\n}\n.record-list .list-right span {\n  font-size: 1.2rem;\n  color: #e71c18;\n}\n.record-list .list-right p {\n  font-size: 1rem;\n  max-width: 15rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  text-align: right;\n}\n.record-list .list-center {\n  text-align: left;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 5rem;\n  line-height: 2rem;\n}\n.record-list .list-center span {\n  font-size: 1.2rem;\n}\n.record-list .list-center p {\n  font-size: 0.9rem;\n  max-width: 15rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  text-align: left;\n}\n.record-list table i {\n  display: block;\n  width: 4rem;\n  height: 4rem;\n  margin: 0 auto;\n  border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100%;\n}\n.defaultHead {\n  background: url(\"//www.bxjr.com/images/member/member-def-avatar.png\") no-repeat center center;\n  background-size: 100% 100%;\n}\n.headimg {\n  display: inline-block;\n  width: 4rem;\n  height: 4rem;\n  margin: 0 auto;\n  border-radius: 50%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100% 100%;\n}\n.tap {\n  display: inline-block;\n  padding: 0 0.5rem;\n  font-size: 1rem;\n  font-style: normal;\n  text-align: center;\n  text-indent: 0em;\n  transform: scale(0.9);\n  color: white;\n  margin-left: 0.5rem;\n}\n.tap-tz {\n  background-color: #033b88;\n}\n.tap-deposit {\n  color: #cb8b00;\n  background: #fcf9f2;\n}\n.tap-withdraw {\n  color: #569429;\n  background: #f6faf4;\n}\n.tap-invest {\n  color: #e71c18;\n  background: rgba(249, 47, 46, 0.07);\n}\n.tap-recharge {\n  color: gold;\n  background: rgba(255, 215, 0, 0.07);\n}\n.tap-receipt {\n  color: #033b88;\n  background: rgba(3, 59, 136, 0.07);\n}\n.tap-register {\n  color: #912ccd;\n  background: rgba(145, 44, 205, 0.07);\n}\n.customer-loading {\n  padding: 50% 0;\n  text-align: center;\n  font-size: 1.2rem;\n  color: #a5a5a5;\n}\n\n/*业绩*/\n.sales-wrap {\n  text-align: center;\n  font-size: 1.2rem;\n  line-height: 1.8;\n}\n.sales-wrap .sales-img {\n  margin-left: auto;\n  margin-right: auto;\n  padding-top: 60%;\n  width: 60%;\n  background: url(\"//m.bxjr.com/m/financial/dist/assets/logo-expect.png\") no-repeat center;\n  background-size: 100%;\n}\n.sales-wrap .sales-tel {\n  display: block;\n  color: #999;\n}\n\n/*客户列表*/\n.client-tab {\n  height: 4rem;\n  line-height: 4rem;\n  font-size: 1.2rem;\n  background-color: white;\n}\n.client-tab .client-extend {\n    color: #333333 !important;\n}\n.client-tab ul li {\n    display: block;\n    width: 25%;\n    float: left;\n    text-align: center;\n    border-bottom: 2px solid white;\n}\n.client-tab ul .on {\n    border-color: #033b88;\n}\n\n/*佣金*/\n.my-wrap {\n  padding-bottom: 60px;\n}\n.my-wrap .my-pay {\n  padding-top: 8%;\n  padding-bottom: 12%;\n  text-align: center;\n}\n.my-wrap .pay-today, .my-wrap .pay-add {\n  width: 50%;\n}\n.my-wrap .pay-money {\n  line-height: 1.8;\n  font-size: 1.2rem;\n}\n.my-wrap .pay-txt {\n  line-height: 1.8;\n  font-size: 1rem;\n  color: #999;\n}\n.my-pay-stream .my-pay-nav {\n  padding-bottom: 3.733%;\n  padding-top: 3.733%;\n  line-height: 1.8;\n  font-size: 1rem;\n  background: #EDF0F3;\n}\n.my-pay-stream .my-pay-nav .pay-nav-txt {\n  width: 33.33%;\n}\n.pay-list {\n  line-height: 1.8;\n}\n.pay-list > p {\n  padding-top: 4.266%;\n  padding-bottom: 4.266%;\n  line-height: 2.2;\n  border-bottom: 1px solid #e1e8f2;\n}\n.pay-list > p:last-child {\n  border-bottom: none;\n}\n\n/*即将回款*/\n.underMenu {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background: #ebebed;\n  color: #a5a5a7;\n}\n.underMenu > div {\n  height: 50px;\n  line-height: 50px;\n}\n.underMenu > div:last-child {\n  border-left: 1px solid #fff;\n}\n.underMenu .on {\n  color: #2a459e;\n}\n\n/*选择联系人*/\n.contacts-list > div:not(:last-child) {\n  border-bottom: 1px solid #ececec;\n}\n.contacts-wrap {\n  padding-bottom: 60px;\n}\n.contacts-sel {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 40px;\n  height: 40px;\n  vertical-align: middle;\n  background: #fff;\n}\n.box-check {\n  vertical-align: middle;\n  margin-right: 10px;\n}\n.sms-wrap {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 60px;\n  line-height: 60px;\n  background: #ececec;\n}\n.sms-send {\n  width: 100px;\n  height: 32px;\n  line-height: 32px;\n  text-align: center;\n  background: #033b88;\n  color: #fff;\n  border-radius: 5px;\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  /* 1 */\n  display: table;\n  /* 2 */\n}\n.clearfix:after {\n  clear: both;\n}\n\n/*\n * For IE 6/7 only\n * Include this rule to trigger hasLayout and contain floats.\n */\n.clearfix {\n  *zoom: 1;\n}\n.top {\n  top: 0;\n}\n.footer {\n  bottom: 0;\n}\n.top, .footer {\n  position: fixed;\n  left: 0;\n  text-align: center;\n  line-height: 50px;\n  height: 50px;\n  width: 100%;\n  background-color: #0dcecb;\n  color: #fff;\n  z-index: 100;\n}\n#wrapper {\n  position: absolute;\n  left: 0;\n  top: 50px;\n  bottom: 50px;\n  width: 100%;\n  background-color: #fafafa;\n  z-index: 10;\n}\n.news-lists .item {\n  height: 40px;\n  line-height: 40px;\n  border-bottom: 1px solid #CFCFCF;\n}\n.news-lists {\n  position: relative;\n}\n#pullDown, #pullUp {\n  background: #fff;\n  height: 40px;\n  line-height: 40px;\n  padding: 5px 10px;\n  border-bottom: 1px solid #ccc;\n  font-weight: bold;\n  font-size: 14px;\n  color: #888;\n}\n#pullDown .pullDownIcon, #pullUp .pullUpIcon {\n  display: block;\n  float: left;\n  width: 40px;\n  height: 40px;\n  background: url(http://sandbox.runjs.cn/uploads/rs/200/ptvnx6ur/pull-icon@2x.png) 0 0 no-repeat;\n  -webkit-background-size: 40px 80px;\n  background-size: 40px 80px;\n  -webkit-transition-property: -webkit-transform;\n  -webkit-transition-duration: 250ms;\n}\n#pullDown .pullDownIcon {\n  -webkit-transform: rotate(0deg) translateZ(0);\n}\n#pullUp .pullUpIcon {\n  -webkit-transform: rotate(-180deg) translateZ(0);\n}\n#pullDown.flip .pullDownIcon {\n  -webkit-transform: rotate(-180deg) translateZ(0);\n}\n#pullUp.flip .pullUpIcon {\n  -webkit-transform: rotate(0deg) translateZ(0);\n}\n#pullDown.loading .pullDownIcon, #pullUp.loading .pullUpIcon {\n  background-position: 0 100%;\n  -webkit-transform: rotate(0deg) translateZ(0);\n  -webkit-transition-duration: 0ms;\n  -webkit-animation-name: loading;\n  -webkit-animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: linear;\n}\n@-webkit-keyframes loading {\nfrom {\n    -webkit-transform: rotate(0deg) translateZ(0);\n}\nto {\n    -webkit-transform: rotate(360deg) translateZ(0);\n}\n}\n\n/*个人业绩*/\n.track {\n  padding: 4%;\n  background-color: #fff;\n  margin-bottom: 1rem;\n  color: #333;\n}\n.track:last-child {\n  margin-bottom: 0;\n}\n.track-box h3 {\n  font-weight: 100;\n  padding-bottom: 0.5rem;\n  text-align: left;\n}\n.track-box h3 .track-team {\n    font-size: 2.4rem;\n    color: #033b88;\n    display: block;\n    float: right;\n}\n.track-box .cycle {\n  float: left;\n}\n.track-box .track-top-info {\n  float: left;\n  width: 56%;\n  font-size: 1rem;\n}\n.track-box .track-top-info div {\n    width: 50%;\n    float: left;\n    text-align: center;\n    vertical-align: middle;\n}\n.track-box .track-top-info div p {\n      line-height: 2rem;\n      font-size: 1.2rem;\n}\n.track-box .track-top-info div p:nth-child(even) {\n      font-size: 1rem;\n      color: #a5a5a5;\n}\n.track-box .investing {\n  width: 44.4444%;\n  text-align: center;\n}\n.track-chart {\n  padding-bottom: 0;\n}\n.track-chart .offer div {\n    float: left;\n    width: 50%;\n    text-align: center;\n    line-height: 2rem;\n    font-size: 1.2rem;\n    padding: 4% 0;\n}\n.track-chart .offer div p {\n      line-height: 2rem;\n      font-size: 1.2rem;\n}\n.track-chart .offer div p:nth-child(even) {\n      font-size: 1rem;\n      color: #a5a5a5;\n}\n.track-all .track-all-info {\n  float: left;\n  width: 50%;\n  text-align: center;\n  line-height: 2rem;\n  font-size: 1.2rem;\n  padding: 0.5rem 0;\n}\n.track-all .track-all-info p {\n    line-height: 2rem;\n    font-size: 1.2rem;\n}\n.track-all .track-all-info p:nth-child(even) {\n    font-size: 1rem;\n    color: #a5a5a5;\n}\n.track-bl {\n  border-left: 1px solid #efefef;\n}\n.track-bb {\n  border-bottom: 1px solid #efefef;\n}\n\n/*添添金*/\n.brisk-wrap {\n  width: 100%;\n  padding-top: 3.3rem;\n  background: #edf0f3;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list {\n    position: fixed;\n    width: 100%;\n    z-index: 100;\n    top: 0;\n    left: 0;\n    border-bottom: 1px solid #E1E8F2;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list ul {\n      list-style: none;\n      background: #fff;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list ul li.brisk-item {\n        float: left;\n        width: 33%;\n        text-align: center;\n        height: 3.3rem;\n        line-height: 3.3rem;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list ul li.brisk-item a {\n          font-size: 1.15rem;\n          color: #A9B3C2;\n          letter-spacing: 0;\n          display: block;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list ul li.brisk-item:last-child {\n        width: 34%;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list ul li.brisk-item.active {\n        border-bottom: 2px solid #F6CD53;\n}\n.brisk-wrap .brisk-tab .brisk-tab-list ul li.brisk-item.active a {\n          font-size: 1.25rem;\n          color: #2D449F;\n          letter-spacing: 0;\n}\n.doc-wrap .doc-title {\n  border: 1px solid #E1E8F2;\n  border-left: none;\n  border-right: none;\n  padding: 4%;\n  text-align: justify;\n  font-size: 1.15rem;\n  font-weight: normal;\n  color: #666666;\n  letter-spacing: 1px;\n  line-height: 22px;\n  background: #fff;\n}\n.doc-wrap .doc-table {\n  padding: 3% 4% 6%;\n  background: #fff;\n}\n.doc-wrap .doc-table table {\n    width: 100%;\n}\n.doc-wrap .doc-table table tr {\n      letter-spacing: 0;\n      line-height: 2rem;\n      vertical-align: text-top;\n}\n.doc-wrap .doc-table table tr td:first-child {\n        width: 26%;\n        font-size: 1rem;\n        color: #999999;\n}\n.doc-wrap .doc-table table tr td:last-child {\n        width: 68%;\n        font-size: 1.15rem;\n        color: #666666;\n}\n.doc-wrap .doc-table table tr td.red {\n        color: #E71C18;\n}\n.doc-wrap .doc-question {\n  margin-top: 2.5%;\n  background: #fff;\n}\n.doc-wrap .doc-question .universial {\n    border-bottom: 1px solid #E1E8F2;\n    padding: 1.15rem 4%;\n    font-size: 1.15rem;\n    color: #333333;\n    letter-spacing: 0;\n    line-height: 1.15rem;\n}\n.doc-wrap .doc-question ul.question-list {\n    list-style: none;\n}\n.doc-wrap .doc-question ul.question-list li.question-item {\n      font-size: 1.15rem;\n      position: relative;\n      display: block;\n      padding: 1.6rem 4%;\n      border-bottom: 1px solid #E1E8F2;\n}\n.doc-wrap .doc-question ul.question-list li.question-item .question-icon {\n        display: block;\n        position: absolute;\n        width: 8px;\n        height: 8px;\n        border-top: 1px solid #D3DAE8;\n        border-right: 1px solid #D3DAE8;\n        right: 4%;\n        top: 2rem;\n        transition: all .5s;\n}\n.doc-wrap .doc-question ul.question-list li.question-item .question-icon.right {\n        transform: rotate(45deg);\n}\n.doc-wrap .doc-question ul.question-list li.question-item .question-icon.down {\n        transform: rotate(135deg);\n}\n.doc-wrap .doc-question ul.question-list li.question-item div {\n        padding: .8rem 0 0 0;\n}\n.doc-wrap .doc-question ul.question-list li.question-item div p span {\n          font-size: 1.15rem !important;\n}\n.brisk-security {\n  background: #fff;\n  border-top: 1px solid #E1E8F2;\n}\n.list-wrap {\n  background: #fff;\n  border-top: 1px solid #E1E8F2;\n}\n.list-wrap ul {\n    list-style: none;\n    padding: 0 4%;\n}\n.list-wrap ul li {\n      display: block;\n      height: 4.1rem;\n      border-bottom: 1px solid #E1E8F2;\n}\n.list-wrap ul li a {\n        width: 100%;\n        padding-bottom: 1.25rem;\n        display: block;\n}\n.list-wrap ul li a p {\n          font-size: 1.15rem;\n          letter-spacing: 0;\n          line-height: 1.15rem;\n}\n.list-wrap ul li a p.upline {\n          margin-top: 1.25rem;\n}\n.list-wrap ul li a p.upline .title-left {\n            color: #555;\n}\n.list-wrap ul li a p.upline .title-right {\n            font-size: 1rem;\n            color: #999;\n            float: right;\n}\n.list-wrap ul li a p.downline {\n          padding-top: 8px;\n}\n.list-wrap ul li a p.downline .title-left {\n            color: #E71C18;\n}\n.list-wrap ul li a p.downline .title-right {\n            font-size: 1rem;\n            color: #333;\n            float: right;\n}\n.brisk-security {\n  background: #fff;\n  padding: 20px 4%;\n}\n\n/*团员成绩*/\n.memberGrade-wrap > div:not(:last-child) {\n  border-bottom: 1px solid #ececec;\n}\n\n/*团队成绩*/\n.nav-date li {\n  float: left;\n  width: 20%;\n  height: 3rem;\n  line-height: 3rem;\n  font-size: 1.2rem;\n  color: #a1a1a1;\n  text-align: center;\n  background: #fff;\n  border-bottom: 2px solid transparent;\n}\n.nav-date li.on {\n    border-color: #033b88;\n}\n.client-wrap {\n  position: relative;\n}\n.client-wrap > div {\n    float: left;\n    padding: 5%;\n    width: 50%;\n    text-align: center;\n}\n.tips-team {\n  padding: 2% 5%;\n  border: 1px solid #797979;\n  border-radius: 3px;\n  font-style: normal;\n  font-size: .8rem;\n}\n.team-list > div:not(:last-child) {\n  border-bottom: 1px solid #ececec;\n}\n.team-list > div {\n  position: relative;\n  top: 0;\n  right: 0;\n}\n.team-list > div.on {\n  animation: mymove .2s 1 normal forwards;\n  -webkit-animation: mymove .2s 1 normal forwards;\n  -ms-animation: mymove .2s 1 normal forwards;\n  -moz-animation: mymove .2s 1 normal forwards;\n  -o-animation: mymove .2s 1 normal forwards;\n}\n@keyframes mymove {\nfrom {\n    right: 0px;\n}\nto {\n    right: 60px;\n}\n}\n.team-list .dom-del {\n  display: none;\n}\n.btn-del {\n  position: absolute;\n  top: 0;\n  right: -60px;\n  width: 60px;\n  height: 77.59px;\n  line-height: 77.59px;\n  border: none;\n  outline: none;\n  background: #e71c18;\n  color: #fff;\n}\n.brisk-security {\n  background: #fff;\n  padding: 1.6rem 4%;\n}\n.t_r {\n  text-align: right;\n}\n.main {\n  width: 100%;\n  padding: 0 1.15rem;\n  margin: 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.main.agreement {\n  color: #000;\n}\n.agreement .cont {\n  padding: 1.15rem 0;\n  position: relative;\n}\n.agreement .cont h3 {\n  padding: 1rem 0;\n}\n.agreement .cont .seal_img {\n  width: 40%;\n  position: absolute;\n  left: 15%;\n  top: 8%;\n  z-index: -1;\n}\n.agreement .cont h3 {\n  font-size: 1.3rem;\n}\n.agreement table {\n  width: 100%;\n  margin: 10px 0;\n  border-collapse: collapse;\n}\n.agreement table th, .agreement table td {\n  padding: 5px 10px;\n  border: 1px solid #ccc;\n  text-align: left;\n}\n.agreement table th {\n  font-weight: normal;\n}\n.agreement .cont i {\n  width: 100px;\n  display: inline-block;\n  border-bottom: 1px solid #333;\n}\n.agreement .cont table {\n  font-size: 1rem;\n}\n.agreement .cont table td {\n  height: 25px;\n}\n.brisk-protocol {\n  background: #fff;\n  line-height: 2rem;\n}\n\n/*添加成员*/\n.gray-layer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n}\n.team-wrap {\n  background: #edf0f3;\n}\n.add-member {\n  width: 90%;\n  height: 40%;\n  background: #fff;\n  margin: auto;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.add-member .layer-closed {\n    position: absolute;\n    top: 15px;\n    right: 20px;\n    width: 20px;\n    height: 20px;\n    transform: rotate(45deg);\n}\n.add-member .layer-closed:before {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    height: 100%;\n    width: 2px;\n    background: #000;\n}\n.add-member .layer-closed:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 100%;\n    height: 2px;\n    background: #000;\n}\n.add-member .add-btn {\n    background: #033b88;\n    color: #fff;\n}\n.add-member .btn-initial {\n    border: none;\n}\n.add-member .btn-initial[disabled=disabled] {\n    background: #999;\n    color: #fff;\n}\n.iconTeam {\n  position: absolute;\n  top: 5%;\n  right: 3%;\n  font-size: 2.4rem;\n  color: #033b88;\n}\n.grayscale {\n  -webkit-filter: grayscale(100%);\n  /* Chrome, Safari, Opera */\n  filter: grayscale(100%);\n  color: #999 !important;\n}\n.noun {\n  display: inline-block;\n  width: 21px;\n  height: 30.5px;\n  margin: 0 auto;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100% 100%;\n}\n.noun0 {\n  background-image: url(" + __webpack_require__(39) + ");\n}\n.noun1 {\n  background-image: url(" + __webpack_require__(40) + ");\n}\n.noun2 {\n  background-image: url(" + __webpack_require__(41) + ");\n}\n@media (device-height: 480px) and (-webkit-min-device-pixel-ratio: 2) {\n  /* 兼容iphone4/4s */\n.add-member {\n    height: 52% !important;\n}\n}\n@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {\n  /* 兼容iphone5 */\n.add-member {\n    height: 45% !important;\n}\n}\n", ""]);

// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.i(__webpack_require__(31), "");

// module
exports.push([module.i, "\n", ""]);

// exports


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.fade-enter-active, .fade-leave-active {\r\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-active {\r\n  opacity: 0\n}\r\n", ""]);

// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n._v-container[data-v-15] {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  overflow: hidden;\n  background: #f1f1f1;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n}\n._v-container > ._v-content[data-v-15] {\n  width: 100%;\n\n  -webkit-transform-origin: left top;\n  -webkit-transform: translateZ(0);\n  -moz-transform-origin: left top;\n  -moz-transform: translateZ(0);\n  -ms-transform-origin: left top;\n  -ms-transform: translateZ(0);\n  -o-transform-origin: left top;\n  -o-transform: translateZ(0);\n  transform-origin: left top;\n  transform: translateZ(0);\n}\n._v-container > ._v-content > .pull-to-refresh-layer[data-v-15] {\n  width: 100%;\n  height: 60px;\n  margin-top: -60px;\n  text-align: center;\n  font-size: 16px;\n  color: #ccc;\n}\n._v-container > ._v-content > .loading-layer[data-v-15] {\n  width: 100%;\n  height: 60px;\n  text-align: center;\n  font-size: 16px;\n  line-height: 60px;\n  color: #ccc;\n\n  opacity: 0;\n  transition: opacity .15s linear;\n  -webkit-transition: opacity .15s linear;\n}\n._v-container > ._v-content > .loading-layer.active[data-v-15] {\n  opacity: 1;\n}\n._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder[data-v-15],\n._v-container > ._v-content > .loading-layer .spinner-holder[data-v-15] {\n  text-align: center;\n  -webkit-font-smoothing: antialiased;\n}\n._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .arrow[data-v-15],\n._v-container > ._v-content > .loading-layer .spinner-holder .arrow[data-v-15] {\n  width: 20px;\n  height: 20px;\n  margin: 8px auto 0 auto;\n\n  -webkit-transform: translate3d(0,0,0) rotate(0deg);\n  transform: translate3d(0,0,0) rotate(0deg);\n\n  -webkit-transition: -webkit-transform .2s linear;\n  transition: transform .2s linear;\n}\n._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .text[data-v-15],\n._v-container > ._v-content > .loading-layer .spinner-holder .text[data-v-15] {\n  display: block;\n  margin: 0 auto;\n  font-size: 14px;\n  line-height: 20px;\n  color: #aaa;\n}\n._v-container > ._v-content > .pull-to-refresh-layer .spinner-holder .spinner[data-v-15],\n._v-container > ._v-content > .loading-layer .spinner-holder .spinner[data-v-15] {\n  margin-top: 14px;\n  width: 32px;\n  height: 32px;\n\n  /* svg style */\n  fill: #444;\n  stroke: #69717d;\n}\n._v-container > ._v-content > .pull-to-refresh-layer.active .spinner-holder .arrow[data-v-15] {\n  -webkit-transform: translate3d(0,0,0) rotate(180deg);\n  transform: translate3d(0,0,0) rotate(180deg);\n}\n\n/* sass version */\n\n/*._v-container {\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n\n  ._v-content {\n    width: 100%;\n\n    -webkit-transform-origin: left top;\n    -webkit-transform: translateZ(0);\n    -moz-transform-origin: left top;\n    -moz-transform: translateZ(0);\n    -ms-transform-origin: left top;\n    -ms-transform: translateZ(0);\n    -o-transform-origin: left top;\n    -o-transform: translateZ(0);\n    transform-origin: left top;\n    transform: translateZ(0);\n\n    .pull-to-refresh-layer {\n      width: 100%;\n      height: 60px;\n      margin-top: -60px;\n      text-align: center;\n      font-size: 16px;\n      color: #ccc;\n\n      &.active {\n        // no style\n      }\n\n      &.refreshing {\n        // no style\n      }\n    }\n\n    .loading-layer {\n      width: 100%;\n      height: 60px;\n      text-align: center;\n      font-size: 16px;\n      line-height: 60px;\n      color: #ccc;\n\n      opacity: 0;\n      transition: opacity .15s linear;\n      -webkit-transition: opacity .15s linear;\n\n      &.active {\n        opacity: 1;\n      }\n    }\n\n    !* spinner & arrow *!\n    .pull-to-refresh-layer, .loading-layer {\n\n      .spinner-holder {\n        text-align: center;\n        -webkit-font-smoothing: antialiased;\n\n        .arrow {\n          width: 20px;\n          height: 20px;\n          margin: 8px auto 0 auto;\n\n          -webkit-transform: translate3d(0,0,0) rotate(0deg);\n          transform: translate3d(0,0,0) rotate(0deg);\n\n          -webkit-transition: -webkit-transform .2s linear;\n          transition: transform .2s linear;\n        }\n\n        .text {\n          display: block;\n          margin: 0 auto;\n          font-size: 14px;\n          line-height: 20px;\n          color: #aaa;\n        }\n\n        .spinner {\n          margin-top: 14px;\n          width: 32px;\n          height: 32px;\n\n          // svg style\n          fill: #444;\n          stroke: #69717d;\n        }\n      }\n\n      &.active .spinner-holder {\n        .arrow {\n          -webkit-transform: translate3d(0,0,0) rotate(180deg);\n          transform: translate3d(0,0,0) rotate(180deg);\n        }\n      }\n    }\n\n  }\n}*/\n\n", ""]);

// exports


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assests/iconfont.svg";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assests/arrow.svg";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assests/noun1.png";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assests/noun2.png";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assests/noun3.png";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assests/security.png";

/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = "data:application/x-font-ttf;base64,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"

/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ },
/* 45 */
/***/ function(module, exports) {

(function (window) {
  window.component = {
    template: '<div v-if="visible" class="layui-m-layer" v-bind:class="layerClass">\n                <div v-on:click="close()"  v-if="isShade" class="layui-m-layershade"></div>\n                <div class="layui-m-layermain">\n                  <div class="layui-m-layersection">\n                    <div v-if="type==2 && !skin" class="layui-m-layerchild  layui-m-anim-scale">\n                      <div class="layui-m-layercont"><i></i>\n                        <i class="layui-m-layerload"></i>\n                        <i></i><p>{{ content?content:"" }}</p>\n                      </div>\n                    </div>\n                    <div v-if="ismsg" v-bind:style="msgStyle" class="layui-m-layerchild layui-m-anim-up" v-bind:class="skinClass">\n                      <div class="layui-m-layercont">\n                      <i v-if="icon" style="display:block;font-size:40px;margin:22px" class="icon iconfont" :class="iconClass"></i>\n                      {{ content }}\n                      </div>\n                    </div>\n                    <div v-if="defaultChild" class="layui-m-layerchild layui-m-anim-up">\n                        <h3 :style="titleStyle" v-if="title">{{ titleText }}</h3>\n                        <div style="word-wrap:break-word" class="layui-m-layercont">{{ content }}</div>\n                        <div v-if="btn" class="layui-m-layerbtn">\n                          <template v-for="(item, index) in btn">\n                            <span v-on:click="callback(index)" type="1">{{ item }}</span>\n                          </template>\n                        </div>\n                    </div>\n                    <div v-if="isfooter" class="layui-m-layerchild layui-m-anim-up" v-bind:class="skinClass">\n                      <div v-if="content" class="layui-m-layercont">{{ content }}</div>\n                      <div class="layui-m-layerbtn">\n                          <template v-for="(item, index) in btn">\n                            <span :style="footerRadius(index)" v-if="index!=0" no="" v-on:click="callback(index)" type="1">{{ item }}</span>\n                          </template>\n                          <span v-if="btn.length>0" yes="" v-on:click="callback(0)" type="1">{{ btn[0] }}</span>\n                      </div>\n                  </div>\n                  </div>\n                </div>\n              </div>',
    props: {
      'content': String,
      'type': {
        type: [Number, String],
        default: 0
      },
      'time': {
        type: Number,
        default: 0
      },
      'skin': {
        type: String
      },
      'btn': {
        type: [String, Array]
      },
      'title': {
        type: [Array, String]
      },
      'icon': {
        type: String
      },
      'callback': {
        type: Function
      }
    },
    created: function created() {
      var _this = this;

      this.visible = true;
      setTimeout(function () {
        _this.status = false;
      }, 3000);
      this.time > 0 ? setTimeout(function () {
        _this.visible = false;
      }, this.time) : '';
    },
    computed: {
      defaultChild: function defaultChild() {
        return this.type == 2 || this.skin == 'msg' || this.skin == 'footer' ? false : true;
      },
      layerClass: function layerClass() {
        return 'layui-m-layer' + this.type;
      },
      skinClass: function skinClass() {
        return 'layui-m-layer-' + this.skin;
      },
      msgStyle: function msgStyle() {
        return {
          bottom: this.icon ? 'auto' : ''
        };
      },
      iconClass: function iconClass() {
        return this.icon;
      },
      isShade: function isShade() {
        return this.type == 2 || this.skin == 'footer' || this.defaultChild ? true : false;
      },
      titleText: function titleText() {
        return typeof this.title == 'string' ? this.title : this.title[0];
      },
      titleStyle: function titleStyle() {
        return typeof this.title == 'string' ? '' : this.title[1];
      },
      ismsg: function ismsg() {
        return this.skin == 'msg';
      },
      isfooter: function isfooter() {
        return this.skin == 'footer';
      }
    },
    data: function data() {
      return {
        visible: false,
        status: true
      };
    },
    methods: {
      close: function close() {
        if (this.type === 2) {
          return false;
        }
        this.visible = false;
      },
      footerRadius: function footerRadius(index) {
        return this.btn[index + 1] ? 'border-radius:0;' : 'border-radius: 0 0 5px 5px;';
      }
    }
  };
  function getIndexLayer(Vue, props) {
    var layerIndex = Vue.extend(component);
    return new layerIndex({
      el: document.createElement('div'),
      propsData: props
    });
  }
  var layer = {
    v: '1.0',
    instanceList: [],
    open: function open(props) {
      this.close();
      var instance = getIndexLayer(this.vue, props);
      this.instanceList.push(instance);
      document.body.appendChild(instance.$el);
      return instance;
    },
    close: function close() {
      if (this.instanceList.length > 0) {
        var item = this.instanceList.pop();
        item.visible = false;
        this.close();
      }
      return false;
    },
    loading: function loading(content) {
      var props = {
        content: content ? content : '',
        type: 2
      };
      this.open(props);
    },
    toast: function toast(icon) {
      var props = {
        content: typeof icon == 'string' ? icon : icon.content ? icon.content : '',
        icon: icon.className ? icon.className : '',
        skin: 'msg',
        time: icon.time ? icon.time : 2000
      };
      this.open(props);
    },
    dialog: function dialog(_dialog) {
      var self = this;
      var props = {
        content: _dialog.content ? _dialog.content : '',
        time: _dialog.time ? _dialog.time : 0,
        title: _dialog.title ? _dialog.title : '',
        btn: _dialog.btn ? _dialog.btn : ''
      };

      return new Promise(function (resolve, reject) {
        props.callback = function (action) {
          resolve(action);
          self.close();
        };
        var instance = self.open(props);
      });
    },
    footer: function footer(data) {
      var self = this;
      var props = {
        skin: 'footer',
        content: data.content ? data.content : '',
        btn: data.btn ? data.btn : []
      };
      return new Promise(function (resolve, reject) {
        props.callback = function (action) {
          resolve(action);
          self.close();
        };
        var instance = self.open(props);
      });
    }
  };
  layer.install = function (Vue, options) {
    layer.vue = Vue;
    Vue.prototype.$layer = layer;
  };
  module.exports = layer;
})(window);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(81)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(67)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-15"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15", __vue_options__)
  } else {
    hotAPI.reload("data-v-15", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Scroller.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* template */
var __vue_template__ = __webpack_require__(68)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16", __vue_options__)
  } else {
    hotAPI.reload("data-v-16", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Spinner.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(76)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9", __vue_options__)
  } else {
    hotAPI.reload("data-v-9", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] birthday.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(79)

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(62)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10", __vue_options__)
  } else {
    hotAPI.reload("data-v-10", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] brisk.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(80)

/* script */
__vue_exports__ = __webpack_require__(16)

/* template */
var __vue_template__ = __webpack_require__(63)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11", __vue_options__)
  } else {
    hotAPI.reload("data-v-11", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] brisk_doc.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(64)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12", __vue_options__)
  } else {
    hotAPI.reload("data-v-12", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] brisk_list.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(18)

/* template */
var __vue_template__ = __webpack_require__(65)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13", __vue_options__)
  } else {
    hotAPI.reload("data-v-13", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] brisk_protocol.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(75)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8", __vue_options__)
  } else {
    hotAPI.reload("data-v-8", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] brisk_sec.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(20)

/* template */
var __vue_template__ = __webpack_require__(69)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2", __vue_options__)
  } else {
    hotAPI.reload("data-v-2", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] client.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(74)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7", __vue_options__)
  } else {
    hotAPI.reload("data-v-7", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] contacts.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(22)

/* template */
var __vue_template__ = __webpack_require__(70)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3", __vue_options__)
  } else {
    hotAPI.reload("data-v-3", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] customer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(23)

/* template */
var __vue_template__ = __webpack_require__(66)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14", __vue_options__)
  } else {
    hotAPI.reload("data-v-14", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] memberGrade.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(24)

/* template */
var __vue_template__ = __webpack_require__(71)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4", __vue_options__)
  } else {
    hotAPI.reload("data-v-4", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] my.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(25)

/* template */
var __vue_template__ = __webpack_require__(73)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6", __vue_options__)
  } else {
    hotAPI.reload("data-v-6", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] payment.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* script */
__vue_exports__ = __webpack_require__(26)

/* template */
var __vue_template__ = __webpack_require__(72)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5", __vue_options__)
  } else {
    hotAPI.reload("data-v-5", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] sales.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('router-view', {
    staticClass: "view"
  })
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1", module.exports)
  }
}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "brisk-wrap"
  }, [_c('section', {
    staticClass: "brisk-tab"
  }, [_c('div', {
    staticClass: "brisk-tab-list"
  }, [_c('ul', {
    staticClass: "clearfix"
  }, [_c('li', {
    staticClass: "brisk-item",
    class: [_vm.href == '/brisk/doc' ? 'active' : '']
  }, [_c('router-link', {
    attrs: {
      "to": "/brisk/doc"
    }
  }, [_vm._v("产品说明")])]), _vm._v(" "), _c('li', {
    staticClass: "brisk-item",
    class: [_vm.href == '/brisk/sec' ? 'active' : '']
  }, [_c('router-link', {
    attrs: {
      "to": "/brisk/sec"
    }
  }, [_vm._v("安全保障")])]), _vm._v(" "), _c('li', {
    staticClass: "brisk-item",
    class: [_vm.href == '/brisk/list' ? 'active' : '']
  }, [_c('router-link', {
    attrs: {
      "to": "/brisk/list"
    }
  }, [_vm._v("项目清单")])])])])]), _vm._v(" "), _c('section', {
    staticClass: "brisk-container"
  }, [_c('router-view')])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-10", module.exports)
  }
}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "doc-wrap"
  }, [_c('div', {
    staticClass: "doc-title"
  }, [_vm._v("添添金是宝象金融为您精心打造的活期产品，申购添添金的资金投向真实优质债权项目，不仅能够得到超额收益，还能随时提取，方便灵活且不收取任何手续费。")]), _vm._v(" "), _c('div', {
    staticClass: "doc-table clearfix"
  }, [_c('table', [_c('tbody', [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('tr', [_c('td', [_vm._v("收益率")]), _vm._v(" "), _c('td', [_vm._v("历史年利率" + _vm._s(_vm.rate) + "%(将根据市场行情不定期调整)。")])]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('tr', [_c('td', [_vm._v("申购门槛")]), _vm._v(" "), _c('td', [_vm._v("使用可用余额申购，" + _vm._s(_vm.minMoney) + "元起。")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("申购限制")]), _vm._v(" "), _c('td', [_vm._v("单人单日累计申购上限为" + _vm._s(_vm.dailyInMoney) + "元；"), _c('br'), _vm._v("单人累计申购总额上限为" + _vm._s(_vm.sumMax) + "元。\n                    ")])]), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5), _vm._v(" "), _c('tr', [_c('td', [_vm._v("赎回限制")]), _vm._v(" "), _c('td', [_vm._v("每位投资人单日赎回上限为" + _vm._s(_vm.redeemDayMax) + "元。")])]), _vm._v(" "), _vm._m(6), _vm._v(" "), _vm._m(7)])])]), _vm._v(" "), _c('div', {
    staticClass: "doc-question"
  }, [_c('div', {
    staticClass: "universial"
  }, [_vm._v("常见问题")]), _vm._v(" "), _c('ul', {
    staticClass: "question-list"
  }, _vm._l((_vm.questions), function(question, index) {
    return _c('li', {
      staticClass: "question-item",
      on: {
        "click": function($event) {
          _vm.tabShow(question)
        }
      }
    }, [_vm._v(_vm._s(question.name)), _c('i', {
      staticClass: "question-icon",
      class: [question.active ? 'down' : 'right']
    }), _vm._v(" "), _c('transition', {
      attrs: {
        "name": "fade"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (question.active),
        expression: "question.active"
      }],
      class: [question.active ? 'active' : ''],
      domProps: {
        "innerHTML": _vm._s(question.content)
      }
    })])])
  }))])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("申购范围")]), _vm._v(" "), _c('td', [_vm._v("平台优选真实优质债权项目。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("适合人群")]), _vm._v(" "), _c('td', [_vm._v("需要资金灵活存取且收益稳健的投资人。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("期限")]), _vm._v(" "), _c('td', [_vm._v("无期限，可以随时申请赎回。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("起息日")]), _vm._v(" "), _c('td', [_vm._v("当日16：00前申购成功的金额当日起息，16：00点后申购成功的金额次日起息。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("收益到账日")]), _vm._v(" "), _c('td', [_vm._v("起息后收益次日到账。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("赎回")]), _vm._v(" "), _c('td', [_vm._v("债权转让退出，由新的投资人接手后赎回。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', [_vm._v("费用")]), _vm._v(" "), _c('td', [_vm._v("0.00%")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('tr', [_c('td', {
    staticClass: "red"
  }, [_vm._v("说明")]), _vm._v(" "), _c('td', [_vm._v("• 体验金、红包等不能申购添添金；"), _c('br'), _vm._v(" • 持有期间利息按日计算，本金自动复投。")])])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-11", module.exports)
  }
}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "list-wrap"
  }, [_c('scroller', {
    ref: "my_scroller",
    attrs: {
      "delegate-id": "myScroller",
      "on-refresh": _vm.refresh,
      "on-infinite": _vm.infinite
    }
  }, [_c('ul', _vm._l((_vm.items), function(item) {
    return _c('li', [_c('a', [_c('p', {
      staticClass: "upline clearfix"
    }, [_c('span', {
      staticClass: "title-left"
    }, [_vm._v(_vm._s(item.name) + "-" + _vm._s(item.id))]), _vm._v(" "), _c('span', {
      staticClass: "title-right"
    }, [_vm._v(_vm._s(item.statusTitle))])]), _vm._v(" "), _c('p', {
      staticClass: "downline clearfix"
    }, [_c('span', {
      staticClass: "title-left"
    }, [_vm._v(_vm._s(item.rate) + "%")]), _vm._v(" "), _c('span', {
      staticClass: "title-right"
    }, [_vm._v(_vm._s(item.day) + _vm._s(item.dayName))])])])])
  }))])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-12", module.exports)
  }
}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "main agreement brisk-protocol"
  }, [_c('div', {
    staticClass: "cont"
  }, [_vm._m(0), _vm._v(" "), _c('br'), _vm._v(" "), _c('p', [_c('b', [_vm._v("甲方")]), _vm._v("（申购人）"), _c('b', [_vm._v("：" + _vm._s(_vm._f("formatName2")(_vm.name)))])]), _vm._v(" "), _c('p', [_vm._v("证件号码：" + _vm._s(_vm._f("formatIdCart")(_vm.cardId)))]), _vm._v(" "), _c('br'), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('p', [_vm._v("办公地址：上海市浦东新区向城路288号SOHO世纪广场5F")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('p', [_vm._v("甲方在此申明：已就本协议的所有条款进行了充分理解。甲方对本协议的全部条款均无异议，并在当事人对有关权利义务和责任限制或免除条款、风险提示内容的法律含义有准确无误理解的基础上，双方达成如下协议：")]), _vm._v(" "), _c('h3', [_vm._v("一、产品概述")]), _vm._v(" "), _c('p', [_vm._v("1.1甲方通过乙方的金融信息服务平台（以下简称“平台”）将其合法所有的申购资金，由乙方通过交易撮合的方式，分散投资到市场上的各类资产中，乙方对平台上真实借款项目，包括但不限于助农贸易贷、供应链金融等安全、流动性高的产品等，进行系统优化筛选，按一定风险配比进行组合，并协助甲方随时申请买入及申请赎回添添金，甲方通过投资以期获得收益。以下添添金产品简称为“本产品”。")]), _vm._v(" "), _c('p', [_vm._v("1.2投资范围：甲方在本产品的投资对象是平台上真实借款项目，包括但不限于助农贸易贷、供应链金融等安全、流动性高的产品等。")]), _vm._v(" "), _c('p', [_vm._v("1.3预期收益：甲方知悉并同意，平台方宣传页面显示的与甲方投资相关的收益均为预期收益，并不代表最终的实际收益，也不代表乙方对甲方承诺的收益。乙方未以任何方式对甲方的投资资金及预期收益进行承诺和担保。甲方投资资金存在不能按期收回的风险。")]), _vm._v(" "), _c('p', [_vm._v("1.4收益计算：甲方知悉并同意，甲方投资的收益自成功申购资产（即平台上真实借款项目，包括但不限于助农贸易贷、供应链金融等安全、流动性高的产品等）之日起开始计算（按自然日计算），每日收益以当日实际结算金额为准。")]), _vm._v(" "), _c('p', [_vm._v("1.5申购资金：甲方合法所有的，通过申购操作加入到本产品的资金，具体为本协议第2.1条的申购资金。")]), _vm._v(" "), _c('p', [_vm._v("1.6申购人账户：指甲方以自身名义在平台方注册后系统自动产生的由具有合法资质的第三方支付机构进行监管的虚拟账户，通过第三方支付机构及/或其他通道进行申购或赎回，系账户资金所有权唯一，属于甲方且与乙方及其他用户自有资金完全独立的甲方专用账户。")]), _vm._v(" "), _c('p', [_vm._v("1.7本协议：本《服务协议》及其有效的补充。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("二、申购的流程")]), _vm._v(" "), _c('p', [_vm._v("2.1注册及开户：甲方根据平台方规则及提示的步骤进行注册操作，接受相关用户规则，用户注册成功的同时平台方系统自动为甲方生成投资人账户。")]), _vm._v(" "), _c('p', [_vm._v("2.2资产申购：甲方点击“申购”，并输入金额后，点击“确定”，账户余额资金将通过系统与添添金产品项下资产（即平台上真实借款项目，包括但不限于助农贸易贷、供应链金融等安全、流动性高的产品等）进行匹配。为实现用户最大资金收益，在系统匹配资产期间，甲方同意授权乙方为其配置债权类产品，并按债权类产品计息。")]), _vm._v(" "), _c('p', [_vm._v("2.3甲方申购成功后，即按本协议第1.3条约定计算收益，平台方计息的次日起开始显示甲方应得收益金额。")]), _vm._v(" "), _c('p', [_vm._v("2.4甲方申购成功后，可授权乙方通过包括但不限于债权转让形式，部分或全部退出其在本产品项下的资产，甲方选择“赎回”按钮，即视为甲方已向乙方发出不可撤销的授权指令，甲方全权委托乙方按照投资及管理规则，将其在本产品项下未到期的债权进行转让，并以甲方名义代为签署相应协议，但乙方不保证甲方申请赎回后资产能够匹配并转让成功。")]), _vm._v(" "), _c('p', [_vm._v("2.5甲方赎回申请被确认后，资产将自动通过系统匹配进行转让，转让成功后，资金自动回转到甲方所在乙方平台的账户余额里。")]), _vm._v(" "), _c('p', [_vm._v("2.6若甲方添添金账户内资金全部转让成功并赎回，则视为甲方终止本产品，本协议随之终止。")]), _vm._v(" "), _c('p', [_vm._v("2.7乙方有权限定甲方每日申请赎回次数，具体规定以乙方通过平台方做出的相关操作说明为准。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("三、收益")]), _vm._v(" "), _c('p', [_vm._v("3.1在投资本产品后至本协议终止前，包括但不限于投资资金、赎回资金，及为调整甲方在本产品中全部资金投资于各类资产的比例而进行的资金投资分配时，甲方不可撤销地委托并授权乙方通过其系统按一定风险配比自动配置撮合，使甲方得于投资于各类资产的资金，并对各类资产进行日常管理。")]), _vm._v(" "), _c('p', [_vm._v("3.2甲方投资本产品项下的收益按日计算，每日的收益以当日实际结算金额为准。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("四、管理及授权委托")]), _vm._v(" "), _c('p', [_vm._v("4.1甲方不可撤销地同意并确认，接受乙方系统就投资资金进行配置及撮合各类项目组合，并为本协议之目的进行资产的申购与赎回。")]), _vm._v(" "), _c('p', [_vm._v("4.2甲方不可撤销地同意并确认，通过乙方及乙方系统在本协议项下甲方认可的投资范围内进行优先自动投资，并通过乙方及乙方系统以甲方名义自动签署投资所需的必要文件；甲方对该等自动投资行为和自动签署必要文件的效力均予以认可且无任何异议，均视为甲方真实意思的表示，并受之约束。")]), _vm._v(" "), _c('p', [_vm._v("4.3甲方不可撤销地同意并确认，依据本协议及通过系统自动投资而签署之必要文件，授权乙方可根据该等必要文件的相关约定，向乙方合作的第三方支付机构发出指令（如有），并通过该机构为甲方的投资行为提供必要的操作。")]), _vm._v(" "), _c('p', [_vm._v("4.4为降低甲方因投资标的过于集中而所带来的违约风险，乙方将对甲方投资本产品的投资本金根据乙方有关规则安排分散化的优先自动投标。")]), _vm._v(" "), _c('p', [_vm._v("4.5甲方确认，本产品存续期间，为甲方之利益，乙方有权（但无义务）进行投资项目的必要管理，其内容包括但不限于对甲方投资的资产进行适当监控、向债务人进行还款提醒、在债务人根本违约的情形下要求债务人提前清偿，判断是否接受债务人提前还款、对债务人提起诉讼、选择适当方式代表甲方处置资产以获得对价等。")]), _vm._v(" "), _c('p', [_vm._v("4.6甲方确认，甲方赎回时自动退出本产品，甲方授权乙方通过系统自动将投资受让资产按照以下方式分别处理：")]), _vm._v(" "), _c('p', [_vm._v("（1）甲方投资受让的资产已到期未发生风险事项而选择退出时，可依本协议约定赎回投资资金及收益。")]), _vm._v(" "), _c('p', [_vm._v("（2）甲方投资的资产未到期时，均授权乙方通过平台自动进行转让。一旦转让成功，甲方授权签署并自动生成相应的《转让协议》。甲方投资本金及预期收益将通过系统直接划转至甲方的账户中。")]), _vm._v(" "), _c('p', [_vm._v("4.7当投资组合的项目对应的借款人不按照约定支付利息或偿还本金时，甲方不可撤销地授权乙方为甲方的利益向借款人发起代偿请求或其他追偿行动。")]), _vm._v(" "), _c('p', [_vm._v("4.8甲方同意乙方有权代为处理本协议项下与借款人、监管方之间的全部争议，乙方有权为了维护甲方利益自行或委托专业机构和人员采取一切必要的手段，行使相关违约救济措施，但不对行使违约救济措施的最终结果向甲方承担责任。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("五、申购人承诺")]), _vm._v(" "), _c('p', [_vm._v("5.1甲方保证其所有投资资金来源合法，不存在违法所得或所有权存在争议。若第三方对资金归属、合法性问题发生争议，则由甲方自行负责解决，乙方不承担任何法律责任。若甲方未能及时解决，则须放弃享有本产品的一切收益；由此给乙方造成损失的，应当赔偿其损失。")]), _vm._v(" "), _c('p', [_vm._v("5.2甲方同意依本协议投资本产品，同时，甲方应自行判断本产品的相关信息的真实性、准确性、及时性，自主决定是否投资，并承担投资相关风险和由此而导致的一切损失或责任，乙方将其所知的甲方投资组合债务人信息及其变更情况通知甲方。或在其能力范围内所了解的相关信息不真实、不准确的情况通知甲方，在任何情况下均不视为乙方对本协议项目债务人信息的真实、准确、及时和完整性做出任何保证或承诺。")]), _vm._v(" "), _c('p', [_vm._v("5.3如因司法机关或行政机关对甲方采取强制措施导致其本产品对应的资金被全部或部分扣划、查封，视为甲方提前退出本产品，本协议自动终止。本协议因此而自动终止的，甲方将不再享有相应收益。")]), _vm._v(" "), _c('p', [_vm._v("5.4甲方应自行承担并缴付其因投资本产品所获收益的应纳税费。")]), _vm._v(" "), _c('p', [_vm._v("5.5本协议以及乙方通过平台方不时公示之交易规则、说明、公告等涉及甲乙双方权利义务的文件资料，共同构成约束甲方接受乙方在本协议项下提供服务时双方行为的协议整体，甲方均须予以遵守，如有违反，应当自行承担相关法律后果。")]), _vm._v(" "), _c('p', [_vm._v("5.6由于地震、火灾、战争等不可抗力导致交易中断、延误的，甲乙双方互不承担责任。但应在条件允许的情况下，采取一切必要的补救措施以减小不可抗力造成的损失。")]), _vm._v(" "), _c('p', [_vm._v("5.7甲方确认，乙方不是本协议及本协议履行所涉及投资组合法律关系的当事人，对本协议及本协议履行所涉各项投资标的法律关系以及由此产生的其他法律关系不承担任何义务和责任。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("六、风险提示")]), _vm._v(" "), _c('p', [_vm._v("乙方作为服务方，是对甲方的资金依照本协议约定，配置及撮合甲方拟投资于本协议项下的投资组合。根据国家相关法律法规的有关规定，且鉴于任何投资均具有一定的投资风险，乙方有义务对甲方的投资行为进行风险提示。甲方为本产品的投资人之一，在充分了解并清楚知晓本产品投资风险的前提下，同意按本协议约定投资本产品，并有能力承担投资风险引起的不利后果。")]), _vm._v(" "), _c('p', [_vm._v("6.1投资风险：甲方加入本产品后，可通过分散投资及组合配比方式降低投资项目所带来的投资风险。甲方应判断本产品与其自身风险承受能力、其资产管理需求是否相匹配后，自行决定是否加入本产品。")]), _vm._v(" "), _c('p', [_vm._v("6.2流动性风险：甲方所投资金与本产品项下资产成功匹配后，可授权乙方协助甲方部分或全部退出其在本产品项下的资产。但因资产匹配的周期性或其他情况的不确定性，甲方资产存在不能迅速退出的可能。")]), _vm._v(" "), _c('p', [_vm._v("6.3政策与法律风险：国家货币政策、财政税收政策、宏观政策及相关法律、法规的调整与变化，可能影响本产品的正常运作。")]), _vm._v(" "), _c('p', [_vm._v("6.4市场风险：乙方承诺基于诚实信用、勤勉尽责的原则，协助甲方进行投资，但因金融投资市场利率的不稳定性，本产品在运作过程中可能面临各种市场风险，乙方不保证本产品一定会产生盈利，亦不保证最低收益。")]), _vm._v(" "), _c('p', [_vm._v("6.5信息传递风险：本产品存续期间，乙方有权利对本协议及相关规则进行调整，甚至终止本产品。届时，乙方将通过官网公告、邮件、手机平台等方式进行公布。如因甲方的操作失误或系统受到黑客攻击以及其他不可抗力等因素使得甲方未能及时了解到相关调整，由此产生的责任与风险由甲方自行承担。")]), _vm._v(" "), _c('p', [_vm._v("6.6不可抗力风险：由于自然灾害、战争、社会动乱、战争、罢工等不可抗力因素的出现，将可能影响市场经济的运行及本产品的正常运行。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("七、违约责任")]), _vm._v(" "), _c('p', [_vm._v("7.1协议双方均应严格履行协议义务，非经双方协商一致或依照本协议约定，任何一方不得解除本协议。")]), _vm._v(" "), _c('p', [_vm._v("7.2如一方违约，违约方应承担因违约行为造成的费用和损失，包括但不限于调查费、诉讼费、律师费等。")]), _vm._v(" "), _c('p', [_vm._v("7.3任何一方直接或间接违反本协议的任何条款，不履行或不完全履行本协议项下义务即构成违约，守约方有权以书面形式要求违约方纠正其违约行为，采取有效措施减少违约后果，并赔偿守约方因违约行为而遭致的损失。若违约方在收到守约方关于其违约行为的上述通知后4日内未纠正其违约行为，守约方有权以书面形式单方提前终止本协议，并追究其违约责任。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("八、法律适用及争议解决")]), _vm._v(" "), _c('p', [_vm._v("8.1本协议的签订、履行、终止、解释均适用中华人民共和国法律。")]), _vm._v(" "), _c('p', [_vm._v("8.2本协议在履行过程中，如发生任何争执或纠纷，各方应友好协商解决；若协商不成，应向乙方所在地人民法院诉讼解决。")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('h3', [_vm._v("九、其他")]), _vm._v(" "), _c('p', [_vm._v("9.1本协议的任何修改、补充均须通过平台方以电子文本形式作出。")]), _vm._v(" "), _c('p', [_vm._v("9.2甲、乙双方均须确认，本协议的签订、生效和履行以不违反中国的法律法规为前提。如果本协议中的任何条款违反相关法律法规，则相关条款被视为无效，不影响本协议其他条款的效力。")]), _vm._v(" "), _c('p', [_vm._v("9.3甲方委托平台方保管本协议及与本协议有关的书面文件或电子信息。")]), _vm._v(" "), _c('p', [_vm._v("9.4本协议中所使用的定义，除非在上下文中另有定义外，应参照平台方的“帮助与反馈”中的相关释义。")]), _vm._v(" "), _c('p', [_vm._v("（以下无正文）")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('p', [_c('b', [_vm._v("本《服务协议》（以下简称“本协议”）由甲、乙双方于年月日在上海市浦东新区签署。")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('p', [_c('b', [_vm._v("乙方")]), _vm._v("（服务方）"), _c('b', [_vm._v("：")]), _vm._v("上海宝象金融信息服务有限公司")])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-13", module.exports)
  }
}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', {
    staticClass: "memberGrade-wrap"
  }, [_vm._l((_vm.list), function(item, index) {
    return [(item.isCurrent) ? _c('div', {
      staticClass: "cc pt_1 pb_1 f_0 compd dp_b"
    }, [_c('div', {
      staticClass: "dp_ib w_20 c_999 f_12 t_c"
    }, [(index < 3) ? _c('span', {
      staticClass: "dp_ib noun",
      class: 'noun' + index
    }) : _c('span', [_vm._v(_vm._s(index + 1))]), _vm._v(" ")]), _vm._v(" "), _c('div', {
      staticClass: "dp_ib w_53 f_12"
    }, [(item.avatar) ? _c('i', {
      staticClass: "headimg dp_ib",
      style: ('background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/' + item.avatar + ');')
    }) : _c('i', {
      staticClass: "headimg defaultHead dp_ib "
    }), _vm._v(" "), _vm._v(" "), _c('div', {
      staticClass: "dp_ib ml_5"
    }, [_c('p', {
      staticClass: "c_666"
    }, [_vm._v(_vm._s(_vm._f("realName")(item.realName)))]), _vm._v(" "), _c('p', {
      staticClass: "f_10 c_999 lh15"
    }, [_vm._v(_vm._s(item.mobile))])])]), _vm._v(" "), _c('div', {
      staticClass: "dp_ib w_27 t_r f_10 c_999"
    }, [_c('span', [_vm._v(_vm._s(item.personInvestYear))]), _vm._v(" 元\n            ")])]) : _vm._e()]
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return [_c('div', {
      staticClass: "cc pt_1 pb_1 f_0 compd dp_b"
    }, [_c('div', {
      staticClass: "dp_ib w_20 c_999 f_12 t_c"
    }, [(index < 3) ? _c('span', {
      staticClass: "dp_ib noun",
      class: 'noun' + index
    }) : _c('span', [_vm._v(_vm._s(index + 1))]), _vm._v(" ")]), _vm._v(" "), _c('div', {
      staticClass: "dp_ib w_53 f_12"
    }, [(item.avatar) ? _c('i', {
      staticClass: "headimg dp_ib",
      style: ('background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/' + item.avatar + ');')
    }) : _c('i', {
      staticClass: "headimg defaultHead dp_ib "
    }), _vm._v(" "), _vm._v(" "), _c('div', {
      staticClass: "dp_ib ml_5"
    }, [_c('p', {
      staticClass: "c_666"
    }, [_vm._v(_vm._s(_vm._f("realName")(item.realName)))]), _vm._v(" "), _c('p', {
      staticClass: "f_10 c_999 lh15"
    }, [_vm._v(_vm._s(item.mobile))])])]), _vm._v(" "), _c('div', {
      staticClass: "dp_ib w_27 t_r f_10 c_999"
    }, [_c('span', [_vm._v(_vm._s(item.personInvestYear))]), _vm._v(" 元\n            ")])])]
  })], true)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "compd cc p_tb_373 lh_18 f_10 bg_edf"
  }, [_c('span', {
    staticClass: "w_20 t_c fl "
  }, [_vm._v("名次")]), _vm._v(" "), _c('span', {
    staticClass: "w_53 t_c fl"
  }, [_vm._v("成员")]), _vm._v(" "), _c('span', {
    staticClass: "w_27 t_c fl"
  }, [_vm._v("本月年化业绩")])])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-14", module.exports)
  }
}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "_v-container",
    attrs: {
      "id": _vm.containerId
    },
    on: {
      "touchstart": function($event) {
        _vm.touchStart($event)
      },
      "touchmove": function($event) {
        _vm.touchMove($event)
      },
      "touchend": function($event) {
        _vm.touchEnd($event)
      },
      "mousedown": function($event) {
        _vm.mouseDown($event)
      },
      "mousemove": function($event) {
        _vm.mouseMove($event)
      },
      "mouseup": function($event) {
        _vm.mouseUp($event)
      }
    }
  }, [_c('div', {
    staticClass: "_v-content",
    attrs: {
      "id": _vm.contentId
    }
  }, [(_vm.onRefresh) ? _c('div', {
    staticClass: "pull-to-refresh-layer",
    class: {
      'active': _vm.state == 1, 'active refreshing': _vm.state == 2
    }
  }, [_c('span', {
    staticClass: "spinner-holder"
  }, [(_vm.state != 2) ? _c('img', {
    staticClass: "arrow",
    attrs: {
      "src": __webpack_require__(38)
    }
  }) : _vm._e(), _vm._v(" "), (_vm.state != 2) ? _c('span', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.refreshText))]) : _vm._e(), _vm._v(" "), (_vm.state == 2) ? _c('spinner', {
    staticClass: "spinner"
  }) : _vm._e()])]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.onInfinite) ? _c('div', {
    staticClass: "loading-layer",
    class: {
      'active': _vm.showLoading
    }
  }, [_c('span', {
    staticClass: "spinner-holder"
  }, [_c('spinner', {
    staticClass: "spinner"
  })])]) : _vm._e()], true)])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-15", module.exports)
  }
}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('svg', {
    attrs: {
      "viewBox": "0 0 64 64"
    }
  }, [_c('g', {
    attrs: {
      "stroke-width": "4",
      "stroke-linecap": "round"
    }
  }, [_c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(180)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(210)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": "0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(240)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(270)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(300)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(330)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(0)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(30)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(60)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(90)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(120)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": ".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85",
      "repeatCount": "indefinite"
    }
  })]), _c('line', {
    attrs: {
      "y1": "17",
      "y2": "29",
      "transform": "translate(32,32) rotate(150)"
    }
  }, [_c('animate', {
    attrs: {
      "attributeName": "stroke-opacity",
      "dur": "750ms",
      "values": "1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1",
      "repeatCount": "indefinite"
    }
  })])])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-16", module.exports)
  }
}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', [_c('div', {
    staticClass: "client-tab"
  }, [_c('ul', [_c('li', {
    staticClass: "on",
    attrs: {
      "data-tab": "all"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("全部")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "invote"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("在投客户")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "novote"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("空仓客户")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "norealname"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("未实名")])])]), _vm._v(" "), _c('div', {
    staticClass: "invest-list compd customer-title clearfix"
  }, [_vm._v("我的客户"), _c('span', [_vm._v(_vm._s(_vm.rightTitle))])]), _vm._v(" "), (_vm.jionlist.length > 0) ? [_c('div', {
    staticClass: "record-list compd"
  }, [_c('table', [_c('tbody', _vm._l((_vm.jionlist), function(item) {
    return _c('tr', {
      attrs: {
        "data-member": item.memberId
      },
      on: {
        "click": _vm.toCustomerDetail
      }
    }, [_c('td', {
      attrs: {
        "width": "20%"
      }
    }, [(item.avatar) ? _c('i', {
      staticClass: "headimg",
      style: ('background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/' + item.avatar + ');')
    }) : _c('i', {
      staticClass: "defaultHead"
    }), _vm._v(" ")]), _vm._v(" "), _c('td', {
      staticClass: "list-center",
      attrs: {
        "width": "45%"
      }
    }, [_c('span', {
      staticClass: "g333"
    }, [_vm._v(_vm._s(_vm._f("formatName")(item.realName)))]), _vm._v(" "), _c('p', {
      staticClass: "g999"
    }, [_vm._v("注册时间:" + _vm._s(item.regTime))])]), _vm._v(" "), _c('td', {
      staticClass: "list-right",
      attrs: {
        "width": "35%"
      }
    }, [(_vm.currentTab == 'norealname') ? _c('span', {
      staticClass: "g333 client-extend"
    }, [_vm._v(_vm._s(item.extend))]) : _c('span', {
      staticClass: "g333"
    }, [_vm._v(_vm._s(_vm._f("formatMoney")(item.extend)) + "元")]), _vm._v(" ")])])
  }))])])] : _vm._e(), _vm._v(" "), (_vm.jionlist.length != 0 && _vm.loading) ? _c('div', {
    staticClass: "load-gif"
  }, [_vm._v("\n        加载中...\n    ")]) : _vm._e(), _vm._v(" "), (_vm.jionlist.length != 0 && !_vm.loading) ? _c('div', {
    staticClass: "load-gif"
  }, [_vm._v("\n        没有更多了\n    ")]) : _vm._e(), _vm._v(" "), (_vm.jionlist.length == 0 && _vm.loading) ? _c('div', {
    staticClass: "customer-loading"
  }, [_vm._v("\n        加载中...\n    ")]) : _vm._e(), _vm._v(" "), (_vm.jionlist.length == 0 && !_vm.loading) ? _c('div', {
    staticClass: "customer-loading"
  }, [_vm._v("\n        暂无数据\n    ")]) : _vm._e()], true)
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2", module.exports)
  }
}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', [_c('div', {
    staticClass: "customer-bar compd clearfix"
  }, [_c('div', {
    staticClass: "customer-col",
    on: {
      "click": _vm.goToClient
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', [_vm._v("\n            客户列表\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "customer-col"
  }, [_c('div', {
    staticClass: "customer-logo-cover",
    on: {
      "click": _vm.goToContacts
    }
  }, [_c('i', {
    staticClass: "iconfont icon-comments"
  })]), _vm._v(" "), _c('div', [_vm._v("\n            消息群发\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "customer-col"
  }, [_c('div', {
    staticClass: "customer-logo-cover",
    on: {
      "click": _vm.goToPayment
    }
  }, [_c('i', {
    staticClass: "iconfont icon-trade"
  })]), _vm._v(" "), _c('div', [_vm._v("\n            即将回款\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "customer-col"
  }, [_c('div', {
    staticClass: "customer-logo-cover",
    on: {
      "click": _vm.goToBirthday
    }
  }, [_c('i', {
    staticClass: "iconfont icon-renwuguanli"
  })]), _vm._v(" "), (_vm.birthday > 0) ? _c('i', {
    staticClass: "customer-logo-alert"
  }, [_vm._v(_vm._s(_vm.birthday))]) : _vm._e(), _vm._v(" "), _c('div', [_vm._v("\n            生日提醒\n        ")])])]), _vm._v(" "), _vm._v(" "), _c('div', {
    staticClass: "customer-tab  clearfix"
  }, [_c('ul', [_c('li', {
    staticClass: "on",
    attrs: {
      "data-tab": "all"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("全部")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "receipt"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("回款")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "register"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("注册")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "recharge"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("充值")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "invest"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("投资")]), _vm._v(" "), _c('li', {
    attrs: {
      "data-tab": "withdraw"
    },
    on: {
      "click": _vm.changeTab
    }
  }, [_vm._v("提现")])])]), _vm._v(" "), _c('div', [(_vm.jionlist.length > 0) ? [_c('div', {
    staticClass: "record-list compd"
  }, [_c('table', [_c('tbody', [_vm._l((_vm.jionlist), function(item) {
    return [_c('tr', {
      attrs: {
        "data-member": item.memberId
      },
      on: {
        "click": _vm.toCustomerDetail
      }
    }, [_c('td', {
      attrs: {
        "width": "20%"
      }
    }, [(item.avatar) ? _c('i', {
      staticClass: "headimg",
      style: ('background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/' + item.avatar + ');')
    }) : _c('i', {
      staticClass: "defaultHead"
    }), _vm._v(" ")]), _vm._v(" "), _c('td', {
      staticClass: "list-center",
      attrs: {
        "width": "35%"
      }
    }, [_c('span', {
      staticClass: "g333"
    }, [_vm._v(_vm._s(item.realName)), _c('em', {
      class: 'tap tap-' + item.type
    }, [_vm._v(_vm._s(item.typeName))])]), _vm._v(" "), _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s(item.time))])]), _vm._v(" "), _c('td', {
      staticClass: "list-right",
      attrs: {
        "width": "45%"
      }
    }, [(item.type != 'register') ? [_c('span', {
      staticClass: "g333"
    }, [_vm._v(_vm._s(_vm._f("formatMoney")(item.balanceaffect)) + "元")])] : _vm._e(), _vm._v(" "), (item.type == 'recharge' || item.type == 'withdraw') ? [(item.type == 'recharge') ? _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s("共" + item.number + "笔充值"))]) : _vm._e(), _vm._v(" "), (item.type == 'withdraw') ? _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s("共" + item.number + "笔提现"))]) : _vm._e()] : _vm._e(), _vm._v(" "), (item.type == 'invest' || item.type == 'receipt') ? [(item.type == 'receipt' && item.number > 1) ? _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s("共" + item.number + "笔回款"))]) : _vm._e(), _vm._v(" "), (item.type == 'invest' && item.number > 1) ? _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s("共" + item.number + "笔投资"))]) : _vm._e(), _vm._v(" "), (item.number == 1) ? _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s(_vm._f("formatRemark")(item.remark)))]) : _vm._e()] : _vm._e(), _vm._v(" "), (item.type == 'register') ? [(item.number == 1) ? _c('p', {
      staticClass: "g999"
    }, [_vm._v(_vm._s(item.mobile))]) : _vm._e()] : _vm._e()], true)])]
  })], true)])])] : _vm._e()], true), _vm._v(" "), (_vm.jionlist.length != 0 && _vm.loading) ? _c('div', {
    staticClass: "load-gif"
  }, [_vm._v("\n        加载中...\n    ")]) : _vm._e(), _vm._v(" "), (_vm.jionlist.length != 0 && !_vm.loading) ? _c('div', {
    staticClass: "load-gif"
  }, [_vm._v("\n        没有更多了\n    ")]) : _vm._e(), _vm._v(" "), (_vm.jionlist.length == 0 && _vm.loading) ? _c('div', {
    staticClass: "customer-loading"
  }, [_vm._v("\n        加载中...\n    ")]) : _vm._e(), _vm._v(" "), (_vm.jionlist.length == 0 && !_vm.loading) ? _c('div', {
    staticClass: "customer-loading"
  }, [_vm._v("\n        暂无数据\n    ")]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "customer-logo-cover"
  }, [_c('i', {
    staticClass: "iconfont icon-bussinessman"
  })])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3", module.exports)
  }
}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', {
    staticClass: "my-wrap"
  }, [_c('nav', {
    staticClass: "my-pay cc compd"
  }, [_c('div', {
    staticClass: "pay-today fl"
  }, [_c('p', {
    staticClass: "pay-money"
  }, [_vm._v(_vm._s(_vm._f("formatMoney")(_vm.money.reward)))]), _vm._v(" "), _c('p', {
    staticClass: "pay-txt"
  }, [_vm._v("今日发放佣金(元)")])]), _vm._v(" "), _c('div', {
    staticClass: "pay-add  fr"
  }, [_c('p', {
    staticClass: "pay-money"
  }, [_vm._v(_vm._s(_vm._f("formatMoney")(_vm.money.sumReward)))]), _vm._v(" "), _c('p', {
    staticClass: "pay-txt"
  }, [_vm._v("累计发放佣金(元)")])])]), _vm._v(" "), _c('div', {
    staticClass: "my-pay-stream"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "pay-list compd"
  }, _vm._l((_vm.list), function(item) {
    return _c('p', {
      staticClass: "cc"
    }, [_c('span', {
      staticClass: "w_33 t_l fl"
    }, [_vm._v(_vm._s(item.fundDate))]), _c('span', {
      staticClass: "w_33 t_c fl c_e71"
    }, [_vm._v(_vm._s(_vm._f("formatMoney")(item.fund)))]), _c('span', {
      staticClass: "w_33 t_r fl"
    }, [_vm._v(_vm._s(_vm._f("judgeType")(item.fundStatus)))])])
  })), _vm._v(" "), _c('p', {
    staticClass: "load-gif",
    domProps: {
      "textContent": _vm._s(_vm.scroll.loadTxt)
    }
  }), _vm._v(" ")])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "my-pay-nav compd cc"
  }, [_c('span', {
    staticClass: "pay-nav-txt w_33 t_l fl "
  }, [_vm._v("日期")]), _vm._v(" "), _c('span', {
    staticClass: "pay-nav-txt w_33 t_c fl"
  }, [_vm._v("金额(元)")]), _vm._v(" "), _c('span', {
    staticClass: "pay-nav-txt w_33 t_r fl"
  }, [_vm._v("状态")])])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4", module.exports)
  }
}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', [_c('section', {
    staticClass: "sales-wrap"
  }, [_c('div', {
    staticClass: "sales-img mt_40 mb_30"
  }), _vm._v(" "), _c('p', {
    staticClass: "sales-txt"
  }, [_vm._v("程序媛和攻城狮们正在加班加点"), _c('br'), _c('strong', [_vm._v("您想要什么功能，可以现在告诉我们。")])]), _vm._v(" "), _c('a', {
    staticClass: "sales-tel mt_10",
    attrs: {
      "href": "tel:400-885-1100"
    }
  }, [_vm._v("tel: 400-885-1100")])])])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5", module.exports)
  }
}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', [_c('section', {
    staticClass: "my-wrap"
  }, [_c('div', {
    staticClass: "my-pay-stream"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.paymentList.on.content),
      expression: "paymentList.on.content"
    }],
    staticClass: "pay-list compd"
  }, _vm._l((_vm.paymentList.data), function(item) {
    return _c('p', {
      staticClass: "cc"
    }, [_c('span', {
      staticClass: "w_33 t_l fl"
    }, [_vm._v(_vm._s(_vm._f("formatName")(item.realName)))]), _c('span', {
      staticClass: "w_33 t_c fl c_e71"
    }, [_vm._v(_vm._s(_vm._f("formatMoney")(item.shouldReceipt)))]), _c('span', {
      staticClass: "w_33 t_r fl"
    }, [_vm._v(_vm._s(item.deadline))])])
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.investList.on.content),
      expression: "investList.on.content"
    }],
    staticClass: "pay-list compd"
  }, _vm._l((_vm.investList.data), function(item) {
    return _c('p', {
      staticClass: "cc"
    }, [_c('span', {
      staticClass: "w_33 t_l fl"
    }, [_vm._v(_vm._s(_vm._f("formatName")(item.realName)))]), _c('span', {
      staticClass: "w_33 t_c fl c_e71"
    }, [_vm._v(_vm._s(_vm._f("formatMoney")(item.investAmount)))]), _c('span', {
      staticClass: "w_33 t_r fl"
    }, [_vm._v(_vm._s(item.dateCreated))])])
  })), _vm._v(" "), _c('p', {
    staticClass: "load-gif",
    domProps: {
      "textContent": _vm._s(_vm.scroll.loadTxt)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "underMenu t_c cc",
    class: {
      'hack-ios': this.$parent.IOS
    }
  }, [_c('div', {
    staticClass: "fl w_50",
    class: {
      'on': _vm.paymentList.on.menu
    },
    on: {
      "click": function($event) {
        _vm.tabClick('payment')
      }
    }
  }, [_vm._v("即将回款")]), _vm._v(" "), _c('div', {
    staticClass: "fr w_50",
    class: {
      'on': _vm.investList.on.menu
    },
    on: {
      "click": function($event) {
        _vm.tabClick('invest')
      }
    }
  }, [_vm._v("近期投资")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "my-pay-nav compd cc"
  }, [_c('span', {
    staticClass: "pay-nav-txt w_33 t_l fl "
  }, [_vm._v("客户信息")]), _vm._v(" "), _c('span', {
    staticClass: "pay-nav-txt w_33 t_c fl"
  }, [_vm._v("回款金额(元)")]), _vm._v(" "), _c('span', {
    staticClass: "pay-nav-txt w_33 t_r fl"
  }, [_vm._v("回款时间")])])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6", module.exports)
  }
}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', [_c('section', {
    staticClass: "contacts-wrap"
  }, [_c('div', {
    staticClass: "contacts-stream "
  }, [_c('div', {
    staticClass: "contacts-list"
  }, [_vm._l((_vm.list), function(item) {
    return [_c('div', {
      staticClass: "cc pt_1 pb_1 f_0"
    }, [_c('label', {
      staticClass: "compd dp_b",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.getCheck($event)
        }
      }
    }, [_c('input', {
      staticClass: "box-check alone-check",
      staticStyle: {
        "display": "none"
      },
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": item.mobile
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "dp_ib w_55 f_12"
    }, [(item.avatar) ? _c('i', {
      staticClass: "headimg dp_ib",
      style: ('background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/' + item.avatar + ');')
    }) : _c('i', {
      staticClass: "headimg defaultHead dp_ib "
    }), _vm._v(" "), _vm._v(" "), _c('div', {
      staticClass: "dp_ib ml_5"
    }, [(item.realName) ? _c('p', [_vm._v(_vm._s(_vm._f("formatName")(item.realName)))]) : _vm._e(), _vm._v(" "), _c('p', {
      staticClass: "f_10 c_999 lh15"
    }, [_vm._v(_vm._s(_vm._f("formatMobile")(item.mobile)))])])]), _vm._v(" "), _c('div', {
      staticClass: "dp_ib w_45 t_r f_10"
    }, [_vm._v("总佣金:"), _c('span', {
      staticClass: "c_e71"
    }, [_vm._v(_vm._s(_vm._f("formatMoney")(item.reward)))]), _vm._v("元\n                            ")])])])]
  })], true), _vm._v(" "), _c('p', {
    staticClass: "load-gif",
    domProps: {
      "textContent": _vm._s(_vm.scroll.loadTxt)
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (true),
      expression: "true"
    }],
    staticClass: "sms-wrap compd",
    class: {
      'hack-ios': this.$parent.IOS
    }
  }, [_c('span', {
    staticClass: "dp_ib"
  }, [_c('label', {
    on: {
      "click": _vm.allCheck
    }
  }, [_c('input', {
    staticClass: "box-check all-check",
    attrs: {
      "type": "checkbox"
    }
  }), _vm._v("全选")])]), _vm._v(" "), _c('div', {
    staticClass: "dp_ib w_82"
  }, [_c('a', {
    staticClass: "dp_ib sms-send ml_10 fl",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("取消")]), _vm._v(" "), (this.$parent.IOS) ? _c('a', {
    staticClass: "dp_ib sms-send fr",
    attrs: {
      "href": 'baoxiang://APPMobilesms?mobile=' + _vm.phone
    },
    on: {
      "click": _vm.formatPhone
    }
  }, [_vm._v("发送 "), (_vm.num != 0) ? [_vm._v("(" + _vm._s(_vm.num) + ")")] : _vm._e()], true) : _c('a', {
    staticClass: "dp_ib sms-send ml_2 fr",
    attrs: {
      "href": 'sms:' + _vm.phone
    },
    on: {
      "click": _vm.formatPhone
    }
  }, [_vm._v("发送 "), (_vm.num != 0) ? [_vm._v("(" + _vm._s(_vm.num) + ")")] : _vm._e()], true), _vm._v(" ")])])])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7", module.exports)
  }
}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('div', {
    staticClass: "brisk-security"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(42),
      "alt": ""
    }
  })])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8", module.exports)
  }
}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _c('section', [_c('section', {
    staticClass: "contacts-wrap pt_40"
  }, [_c('div', {
    staticClass: "contacts-sel compd"
  }, [_c('label', {
    on: {
      "click": _vm.allCheck
    }
  }, [_c('input', {
    staticClass: "box-check all-check",
    attrs: {
      "type": "checkbox"
    }
  }), _vm._v("全选")])]), _vm._v(" "), _c('div', {
    staticClass: "contacts-stream "
  }, [_c('div', {
    staticClass: "contacts-list pay-list  compd"
  }, _vm._l((_vm.list), function(item) {
    return _c('p', {
      staticClass: "cc",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.getCheck($event)
        }
      }
    }, [_c('label', {
      staticClass: "w_66"
    }, [_c('span', {
      staticClass: "w_33 t_l dp_ib"
    }, [_c('input', {
      staticClass: "box-check alone-check",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": item.mobile
      }
    }), _vm._v(_vm._s(_vm._f("formatName")(item.realName)))]), _c('span', {
      staticClass: "w_33 t_l dp_ib"
    }, [_vm._v(_vm._s(item.birth))])]), _c('span', {
      staticClass: "w_33"
    }, [_c('a', {
      staticClass: "dp_ib mr_20 iconfont icon-email icon-sms",
      attrs: {
        "href": 'sms:' + item.mobile
      }
    }), _c('a', {
      staticClass: "dp_ib iconfont icon-phone icon-tel fr mr_10",
      attrs: {
        "href": 'tel:' + item.mobile
      }
    })])])
  })), _vm._v(" "), _c('p', {
    staticClass: "load-gif",
    domProps: {
      "textContent": _vm._s(_vm.scroll.loadTxt)
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.SmsSel),
      expression: "SmsSel"
    }],
    staticClass: "sms-wrap compd",
    class: {
      'hack-ios': this.$parent.IOS
    }
  }, [_c('span', {
    staticClass: "dp_ib w_50"
  }, [_vm._v("已选" + _vm._s(_vm.num) + "位联系人")]), _vm._v(" "), (this.$parent.IOS) ? _c('a', {
    staticClass: "dp_ib sms-send",
    attrs: {
      "href": 'MobileSms:' + _vm.phone
    },
    on: {
      "click": _vm.formatPhone
    }
  }, [_vm._v("发送短信")]) : _c('a', {
    staticClass: "dp_ib sms-send",
    attrs: {
      "href": 'sms:' + _vm.phone
    },
    on: {
      "click": _vm.formatPhone
    }
  }, [_vm._v("发送短信")]), _vm._v(" ")])])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-9", module.exports)
  }
}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/.css-loader@0.25.0/index.js!./../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-1!./../node_modules/.sass-loader@4.1.0/index.js!./../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./App.vue", function() {
			var newContent = require("!!./../node_modules/.css-loader@0.25.0/index.js!./../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-1!./../node_modules/.sass-loader@4.1.0/index.js!./../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./App.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/.css-loader@0.25.0/index.js!./../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-1!./../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=1!./App.vue", function() {
			var newContent = require("!!./../node_modules/.css-loader@0.25.0/index.js!./../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-1!./../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=1!./App.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.css-loader@0.25.0/index.js!./../../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-10!./../../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./brisk.vue", function() {
			var newContent = require("!!./../../node_modules/.css-loader@0.25.0/index.js!./../../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-10!./../../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./brisk.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.css-loader@0.25.0/index.js!./../../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-11!./../../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./brisk_doc.vue", function() {
			var newContent = require("!!./../../node_modules/.css-loader@0.25.0/index.js!./../../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-11!./../../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./brisk_doc.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.css-loader@0.25.0/index.js!./../../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-15&scoped=true!./../../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./Scroller.vue", function() {
			var newContent = require("!!./../../node_modules/.css-loader@0.25.0/index.js!./../../node_modules/.vue-loader@9.5.0/lib/style-rewriter.js?id=data-v-15&scoped=true!./../../node_modules/.vue-loader@9.5.0/lib/selector.js?type=styles&index=0!./Scroller.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 82 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _vue = __webpack_require__(11);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(8);

var _App2 = _interopRequireDefault(_App);

var _vueRouter = __webpack_require__(10);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = __webpack_require__(9);

var _vueResource2 = _interopRequireDefault(_vueResource);

var _public = __webpack_require__(5);

var _public2 = _interopRequireDefault(_public);

var _vueLayerMobile = __webpack_require__(7);

var _vueLayerMobile2 = _interopRequireDefault(_vueLayerMobile);

var _router = __webpack_require__(6);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Public = _public2.default;

_vue2.default.config.debug = false;

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueLayerMobile2.default);

var router = new _vueRouter2.default(_router2.default);

_vue2.default.filter('formatName', function (value) {
    if (value.length != 0 && value.indexOf('null') == -1) {
        var len = value.length <= 2 ? value.length : value.length - 1;
        var symbol = value.slice(1, len).length;
        var str = "";
        for (var i = 0; i < symbol; i++) {
            str += "*";
        }
        return value.replace(value.slice(1, len), str);
    } else {
        return "未实名";
    }
});

_vue2.default.filter('formatName2', function (value) {
    if (value.length != 0 && value.indexOf('null') == -1) {
        var len = value.length;
        var symbol = value.slice(1, len).length;
        var str = "";
        for (var i = 0; i < symbol; i++) {
            str += "*";
        }
        return value.replace(value.slice(1, len), str);
    } else {
        return "未实名";
    }
});

_vue2.default.filter('formatIdCart', function (value) {
    var length = value.length;
    var temp = "";
    for (var i = 0; i < value.length - 4; i++) {
        temp += "*";
    }
    var last = value.substr(length - 4, length);
    return temp + last;
});

_vue2.default.filter('judgeType', function (value) {
    if (value == 'settled') {
        return '已结算';
    } else {
        return '待结算';
    }
});

_vue2.default.filter('formatMobile', function (value) {
    if (value && value.length == 11) {
        return value.substr(0, 3) + " **** " + value.substr(7, 11);
    }
});

_vue2.default.filter('formatRemark', function (value) {
    return value.split('">')[1].split("</")[0];
});

_vue2.default.filter('formatMoney', function (value) {
    value = value == null ? 0 : value;
    return Number(Math.abs(value)).toFixed(2);
});

_vue2.default.filter('realName', function (value) {
    if (value == null) {
        return "未实名";
    } else {
        return value;
    }
});

var app = new _vue2.default({
    router: router,
    render: function render(h) {
        return h(_App2.default);
    }
}).$mount('#app');

/***/ }
/******/ ]);