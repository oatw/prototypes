var LC =window.LC || {};

(function(obj,window,undefined) {
	// polyfill
	(function() {
		// classlist polyfill
		if ("document" in self) {

			// Full  for browsers with no classList support
			if (!("classList" in document.createElement("_"))) {

				(function(view) {

					"use strict";

					if (!('Element' in view)) return;

					var
						classListProp = "classList",
						protoProp = "prototype",
						elemCtrProto = view.Element[protoProp],
						objCtr = Object,
						strTrim = String[protoProp].trim || function() {
							return this.replace(/^\s+|\s+$/g, "");
						},
						arrIndexOf = Array[protoProp].indexOf || function(item) {
							var
								i = 0,
								len = this.length;
							for (; i < len; i++) {
								if (i in this && this[i] === item) {
									return i;
								}
							}
							return -1;
						}
						// Vendors: please allow content code to instantiate DOMExceptions
						,
						DOMEx = function(type, message) {
							this.name = type;
							this.code = DOMException[type];
							this.message = message;
						},
						checkTokenAndGetIndex = function(classList, token) {
							if (token === "") {
								throw new DOMEx(
									"SYNTAX_ERR", "An invalid or illegal string was specified"
								);
							}
							if (/\s/.test(token)) {
								throw new DOMEx(
									"INVALID_CHARACTER_ERR", "String contains an invalid character"
								);
							}
							return arrIndexOf.call(classList, token);
						},
						ClassList = function(elem) {
							var
								trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
								classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
								i = 0,
								len = classes.length;
							for (; i < len; i++) {
								this.push(classes[i]);
							}
							this._updateClassName = function() {
								elem.setAttribute("class", this.toString());
							};
						},
						classListProto = ClassList[protoProp] = [],
						classListGetter = function() {
							return new ClassList(this);
						};
					// Most DOMException implementations don't allow calling DOMException's toString()
					// on non-DOMExceptions. Error's toString() is sufficient here.
					DOMEx[protoProp] = Error[protoProp];
					classListProto.item = function(i) {
						return this[i] || null;
					};
					classListProto.contains = function(token) {
						token += "";
						return checkTokenAndGetIndex(this, token) !== -1;
					};
					classListProto.add = function() {
						var
							tokens = arguments,
							i = 0,
							l = tokens.length,
							token, updated = false;
						do {
							token = tokens[i] + "";
							if (checkTokenAndGetIndex(this, token) === -1) {
								this.push(token);
								updated = true;
							}
						}
						while (++i < l);

						if (updated) {
							this._updateClassName();
						}
					};
					classListProto.remove = function() {
						var
							tokens = arguments,
							i = 0,
							l = tokens.length,
							token, updated = false,
							index;
						do {
							token = tokens[i] + "";
							index = checkTokenAndGetIndex(this, token);
							while (index !== -1) {
								this.splice(index, 1);
								updated = true;
								index = checkTokenAndGetIndex(this, token);
							}
						}
						while (++i < l);

						if (updated) {
							this._updateClassName();
						}
					};
					classListProto.toggle = function(token, force) {
						token += "";

						var
							result = this.contains(token),
							method = result ?
							force !== true && "remove" :
							force !== false && "add";

						if (method) {
							this[method](token);
						}

						if (force === true || force === false) {
							return force;
						} else {
							return !result;
						}
					};
					classListProto.toString = function() {
						return this.join(" ");
					};

					if (objCtr.defineProperty) {
						var classListPropDesc = {
							get: classListGetter,
							enumerable: true,
							configurable: true
						};
						try {
							objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
						} catch (ex) { // IE 8 doesn't support enumerable:true
							if (ex.number === -0x7FF5EC54) {
								classListPropDesc.enumerable = false;
								objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
							}
						}
					} else if (objCtr[protoProp].__defineGetter__) {
						elemCtrProto.__defineGetter__(classListProp, classListGetter);
					}

				}(self));

			} else {
				// There is full or partial native classList support, so just check if we need
				// to normalize the add/remove and toggle APIs.

				(function() {
					"use strict";

					var testElement = document.createElement("_");

					testElement.classList.add("c1", "c2");

					// Polyfill for IE 10/11 and Firefox <26, where classList.add and
					// classList.remove exist but support only one argument at a time.
					if (!testElement.classList.contains("c2")) {
						var createMethod = function(method) {
							var original = DOMTokenList.prototype[method];

							DOMTokenList.prototype[method] = function(token) {
								var i, len = arguments.length;

								for (i = 0; i < len; i++) {
									token = arguments[i];
									original.call(this, token);
								}
							};
						};
						createMethod('add');
						createMethod('remove');
					}

					testElement.classList.toggle("c3", false);

					// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
					// support the second argument.
					if (testElement.classList.contains("c3")) {
						var _toggle = DOMTokenList.prototype.toggle;

						DOMTokenList.prototype.toggle = function(token, force) {
							if (1 in arguments && !this.contains(token) === !force) {
								return force;
							} else {
								return _toggle.call(this, token);
							}
						};

					}

					testElement = null;
				}());

			}

		};

		// matches polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.webkitMatches ||
				Element.prototype.msMatches ||
				Element.prototype.mozMatches ||
				Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				function(selector) {
					var element = this;
					var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
					var i = 0;
					while (matches[i] && matches[i] !== element) {
						i++;
					};
					return matches[i] ? true : false;
				};
		};

	})();

	// extend prefixcss
	(function() {
		if (!Element.prototype.prefixCss) {
			Element.prototype.prefixCss = function(stylesObj) {

				var vendor = ['webkit', 'moz', 'ms', 'o'],
					rule = '',
					value = '',
					i = '',
					j = 0,
					l = vendor.length,
					noVendorI = '',
					vendorI = '',
					noVendorStylesObjI = '',
					vendorStylesObjI = '';

				for (i in stylesObj) {

					if (i.indexOf('-vendor-') == -1) {
						rule = i;
						// console.log('no vendor ' + rule + ' detected');
					} else {
						noVendorI = i.replace(/-vendor-/g, '');
						if (noVendorI in this.style) {
							rule = noVendorI;
							// console.log(rule + " doesn't need be prefixed");
						} else {
							j = 0;
							while (j < l) {
								vendorI = vendor[j] + noVendorI.replace(noVendorI[0], noVendorI[0].toUpperCase());
								if (vendorI in this.style) {
									rule = vendorI;
									// console.log(rule + " prefixed by vendor " + vendor[j])
									j = l;
								} else {
									j++;
								};
							};
						};
					};

					if (stylesObj[i].indexOf('-vendor-') == -1) {
						value = stylesObj[i];
						this.style[rule] = value;
						// console.log('no vendor ' + value + ' detected');
					} else {
						noVendorStylesObjI = stylesObj[i].replace(/-vendor-/g, '');
						this.style[rule] = noVendorStylesObjI;
						if (this.style[rule]) {
							// console.log(noVendorStylesObjI + " doesn't need be prefixed");
						} else {
							j = 0;
							while (j < l) {
								value = '-' + vendor[j] + '-' + noVendorStylesObjI;
								this.style[rule] = value;
								if (this.style[rule]) {
									// console.log(value + ' prefixed by vendor ' + vendor[j]);
									j = l;
								} else {
									j++;
								};
							};
						};
					};

				};

			};
		};
	})();

	// extend getposition
	(function() {
		if (!Element.prototype.getPosition) {
			Element.prototype.getPosition = function() {
				var obj = this;
				return {
					top: function() {
						var top = obj.offsetTop,
							parent = obj.offsetParent;
						while (parent !== null) {
							top += parent.offsetTop;
							parent = parent.offsetParent;
						};
						return top;
					},
					left: function() {
						var left = obj.offsetLeft,
							parent = obj.offsetParent;
						while (parent !== null) {
							left += parent.offsetLeft;
							parent = parent.offsetParent;
						};
						return left;
					}
				};
			};
		};
	})();

	// extend in target
	(function() {
		if (!Element.prototype.isInTarget) {
			Element.prototype.isInTarget = function(selector) {
				if (this.matches(selector) || this.matches(selector + ' *')) {
					return true;
				};
			};
		};
	})();

	// extend addtouchevent
	(function() {
		if (!Element.prototype.addTouchEventListener || !Element.prototype.removeTouchEventListener) {

			var doc = document;
			var touchEvents = (function() {

				var tap = (function() {

						var defaultTapSetting = {
								range: 10
							},
							startX, startY, endX, endY, tapStartE,
							touchStart = function(e) {
								tapStartE = e;
								startX = e.touches[0].clientX;
								startY = e.touches[0].clientY;
								endX = startX;
								endY = startY;
							},
							touchMove = function(e) {
								endX = e.touches[0].clientX;
								endY = e.touches[0].clientY
							},
							touchEnd = function(e) {
								var xRange = Math.abs(endX - startX),
									yRange = Math.abs(endY - startY),
									obj = this,
									i = 0,
									l = obj.touchEvents.tap.callbackArr.length,
									settingI,
									rangeI;
								while (i < l) {
									settingI = obj.touchEvents.tap.settingsArr[i] || defaultTapSetting;
									rangeI = settingI.range || defaultTapSetting.range;
									if (xRange <= rangeI && yRange <= rangeI) {
										obj.touchEvents.tap.callbackArr[i] && obj.touchEvents.tap.callbackArr[i](tapStartE, e);
									};
									i++;
								};
							};
						return {
							defaultSettings: defaultTapSetting,
							touchStart: touchStart,
							touchMove: touchMove,
							touchEnd: touchEnd
						};
					})(),
					swipe = (function() {
						var defaultSwipeSettings = {
								range: 20
							},
							startX, startY, endX, endY, swipeStartE,
							touchStart = function(e) {
								swipeStartE = e;
								startX = e.touches[0].clientX;
								startY = e.touches[0].clientY;
							},
							touchMove = function(e) {
								endX = e.touches[0].clientX;
								endY = e.touches[0].clientY;
								var xDis = endX - startX,
									yDis = endY - startY,
									xDisAbs = Math.abs(xDis),
									yDisAbs = Math.abs(yDis),
									obj = this,
									i = 0,
									l = obj.touchEvents.swipe.callbackArr.length,
									settingsI,
									rangeI;
								while (i < l) {
									settingsI = obj.touchEvents.swipe.settingsArr[i] || defaultSwipeSettings;
									rangeI = settingsI.range || defaultSwipeSettings.range;
									if (xDisAbs > rangeI || yDisAbs > rangeI) {
										var directionV = yDis > 0 ? 'down' : 'up',
											directionH = xDis > 0 ? 'right' : 'left';
										obj.touchEvents.swipe.callbackArr[i] && obj.touchEvents.swipe.callbackArr[i](directionH, directionV, xDisAbs, yDisAbs, swipeStartE, e);
									};
									i++;
								};
							};
						return {
							defaultSettings: defaultSwipeSettings,
							touchStart: touchStart,
							touchMove: touchMove
						};
					})(),
					swiping = (function() {
						var defaultSwipingSettings = {},
							startX, startY, endX, endY, swipingE, eventStart = false,

							touchStart = function(e) {
								eventStart = true;
								startX = e.touches[0].clientX;
								startY = e.touches[0].clientY;
								endX = startX;
								endY = startY;
							},
							touchMove = function(e) {
								if (eventStart) {
									try {
										var tryX = e.touches[0].clientX,
											tryY = e.touches[0].clientY;
										!isNaN(tryX) ? endX = tryX : '';
										!isNaN(tryY) ? endY = tryY : '';
									} catch (err) {
										console.log(err);
									};
									var xDis = endX - startX,
										yDis = endY - startY,
										obj = this,
										i = 0,
										l = obj.touchEvents.swiping.callbackArr.length,
										settingsI,
										selectorI;
									while (i < l) {
										settingsI = obj.touchEvents.swiping.settingsArr[i] || defaultSwipingSettings;
										selectorI = settingsI.selector;
										if (selectorI) {
											if (e.target.isInTarget(selectorI)) {
												obj.touchEvents.swiping.callbackArr[i] && obj.touchEvents.swiping.callbackArr[i](endX, endY, xDis, yDis, swipingE);
											} else {
												eventStart = false;
											};
										} else {
											obj.touchEvents.swiping.callbackArr[i] && obj.touchEvents.swiping.callbackArr[i](endX, endY, xDis, yDis, swipingE);

										};
										i++;
									};
								};
							},
							touchEnd = function(e) {
								var obj = this;
								touchMove.call(obj, e);
								eventStart = false;
							};
						return {
							defaultSettings: defaultSwipingSettings,
							touchStart: touchStart,
							touchMove: touchMove,
							touchEnd: touchEnd
						};
					})();


				return {
					tap: tap,
					swipe: swipe,
					swiping: swiping
				};

			})();



			var onEventsLoop = function(type) {
					var obj = this;
					if (!obj.touchEvents[type].onEventsLoop) {
						obj.touchEvents[type].onEventsLoop = true;
						touchEvents[type].touchStart && obj.addEventListener('touchstart', touchEvents[type].touchStart);
						touchEvents[type].touchMove && obj.addEventListener('touchmove', touchEvents[type].touchMove);
						touchEvents[type].touchEnd && obj.addEventListener('touchend', touchEvents[type].touchEnd);
					};
				},
				tryOffEventsLoop = function(type) {
					var obj = this;
					if (obj.touchEvents[type].onEventsLoop && obj.touchEvents[type].callbackArr.length == 0) {
						obj.touchEvents[type].onEventsLoop = false;
						touchEvents[type].touchStart && obj.removeEventListener('touchstart', touchEvents[type].touchStart);
						touchEvents[type].touchMove && obj.removeEventListener('touchmove', touchEvents[type].touchMove);
						touchEvents[type].touchEnd && obj.removeEventListener('touchend', touchEvents[type].touchEnd);
						var i;
						for (i in obj.touchEvents[type]) {
							delete obj.touchEvents[type][i];
						};
					};
				},

				addTouchEvent = function(type, callback, settings) {
					if (typeof callback == 'function') {
						var obj = this,
							settings = settings || touchEvents[type].defaultSettings;
						obj.touchEvents = obj.touchEvents || {};
						obj.touchEvents[type] = obj.touchEvents[type] || {};
						obj.touchEvents[type].callbackArr = obj.touchEvents[type].callbackArr || [];
						obj.touchEvents[type].settingsArr = obj.touchEvents[type].settingsArr || [];
						var index = obj.touchEvents[type].callbackArr.indexOf(callback);
						if (index == -1) {
							obj.touchEvents[type].callbackArr.push(callback);
							obj.touchEvents[type].settingsArr.push(settings);
							console.log('frist time rigistered event handler ' + callback);
						} else {
							var oldSettings = obj.touchEvents[type].settingsArr[index];
							obj.touchEvents[type].callbackArr[index] = callback;
							obj.touchEvents[type].settingsArr[index] = settings;
							console.log(callback + ' already rigistered with settings: ' + JSON.stringify(oldSettings) + ', the ' + JSON.stringify(oldSettings) + ' will be replaced by ' + JSON.stringify(settings));
						};
						!obj.touchEvents[type].onEventsLoop ? onEventsLoop.call(obj, type) : '';
					} else {
						console.log('rigistered event handler failed, not valid callback function ' + callback);
					};
				},

				removeTouchEvent = function(type, callback) {
					var obj = this;
					if (obj.touchEvents) {
						if (obj.touchEvents[type]) {
							if (obj.touchEvents[type].callbackArr) {
								var index = obj.touchEvents[type].callbackArr.indexOf(callback);
								if (index == -1) {
									console.log('remove event handler failed, no such ' + callback + ' found in handler array or this handler already be removed');
								} else {
									obj.touchEvents[type].callbackArr.splice(index, 1);
									obj.touchEvents[type].settingsArr.splice(index, 1);
									console.log('event handler ' + callback + ' removed from ' + obj);
									obj.touchEvents[type].onEventsLoop ? tryOffEventsLoop.call(obj, type) : '';
								};
							} else {
								console.log(type + ' events handler in ' + obj + 'already totaly removed');
							};
						} else {
							console.log('no ' + type + 'events rigistered on ' + obj);
						};
					} else {
						console.log('no touchevents rigistered on ' + obj);
					};
				};

			Element.prototype.addTouchEventListener = addTouchEvent;
			Element.prototype.removeTouchEventListener = removeTouchEvent;

			doc.addTouchEventListener = addTouchEvent;
			doc.removeTouchEventListener = removeTouchEvent;
		};
	})();

	// extend dragevent
	(function() {
		if (!Element.prototype.addDragEventListener || !Element.prototype.removeDragEventListener) {

			var doc = document;
			var dragEvents = (function() {

				var draging = (function() {
					var defaultDragingSettings = {},
						startX, startY, endX, endY, dragingE, eventStart = false,
						dragStart = function(e) {
							eventStart = true;
							startX = e.pageX;
							startY = e.pageY;
							endX = startX;
							endY = startY;
						},
						dragMove = function(e) {
							if (eventStart) {
								try {
									var tryX = e.pageX,
										tryY = e.pageY;
									!isNaN(tryX) ? endX = tryX : '';
									!isNaN(tryY) ? endY = tryY : '';
								} catch (err) {
									console.log(err);
								};
								var xDis = endX - startX,
									yDis = endY - startY,
									obj = this,
									i = 0,
									l = obj.dragEvents.draging.callbackArr.length,
									settingsI,
									selectorI;
								while (i < l) {
									settingsI = obj.dragEvents.draging.settingsArr[i] || defaultDragingSettings;
									selectorI = settingsI.selector;
									if (selectorI) {
										if (e.target.isInTarget(selectorI)) {
											obj.dragEvents.draging.callbackArr[i] && obj.dragEvents.draging.callbackArr[i](endX, endY, xDis, yDis, dragingE);
										} else {
											eventStart = false;
										};
									} else {
										obj.dragEvents.draging.callbackArr[i] && obj.dragEvents.draging.callbackArr[i](endX, endY, xDis, yDis, dragingE);
									};
									i++;
								};
							};
						},
						dragEnd = function(e) {
							var obj = this;
							dragMove.call(obj, e);
							eventStart = false;
						};
					return {
						defaultSettings: defaultDragingSettings,
						dragStart: dragStart,
						dragMove: dragMove,
						dragEnd: dragEnd
					};
				})();


				return {
					draging: draging
				};

			})();



			var onEventsLoop = function(type) {
					var obj = this;
					if (!obj.dragEvents[type].onEventsLoop) {
						obj.dragEvents[type].onEventsLoop = true;
						dragEvents[type].dragStart && obj.addEventListener('mousedown', dragEvents[type].dragStart);
						dragEvents[type].dragMove && obj.addEventListener('mousemove', dragEvents[type].dragMove);
						dragEvents[type].dragEnd && obj.addEventListener('mouseup', dragEvents[type].dragEnd);
					};
				},
				tryOffEventsLoop = function(type) {
					var obj = this;
					if (obj.dragEvents[type].onEventsLoop && obj.dragEvents[type].callbackArr.length == 0) {
						obj.dragEvents[type].onEventsLoop = false;
						dragEvents[type].dragStart && obj.removeEventListener('mousedown', dragEvents[type].dragStart);
						dragEvents[type].dragMove && obj.removeEventListener('mousemove', dragEvents[type].dragMove);
						dragEvents[type].dragEnd && obj.removeEventListener('mouseup', dragEvents[type].dragEnd);
						var i;
						for (i in obj.dragEvents[type]) {
							delete obj.dragEvents[type][i];
						};
					};
				},

				addDragEvent = function(type, callback, settings) {
					if (typeof callback == 'function') {
						var obj = this,
							settings = settings || dragEvents[type].defaultSettings;
						obj.dragEvents = obj.dragEvents || {};
						obj.dragEvents[type] = obj.dragEvents[type] || {};
						obj.dragEvents[type].callbackArr = obj.dragEvents[type].callbackArr || [];
						obj.dragEvents[type].settingsArr = obj.dragEvents[type].settingsArr || [];
						var index = obj.dragEvents[type].callbackArr.indexOf(callback);
						if (index == -1) {
							obj.dragEvents[type].callbackArr.push(callback);
							obj.dragEvents[type].settingsArr.push(settings);
							console.log('frist time rigistered event handler ' + callback);
						} else {
							var oldSettings = obj.dragEvents[type].settingsArr[index];
							obj.dragEvents[type].callbackArr[index] = callback;
							obj.dragEvents[type].settingsArr[index] = settings;
							console.log(callback + ' already rigistered with settings: ' + JSON.stringify(oldSettings) + ', the ' + JSON.stringify(oldSettings) + ' will be replaced by ' + JSON.stringify(settings));
						};
						!obj.dragEvents[type].onEventsLoop ? onEventsLoop.call(obj, type) : '';
					} else {
						console.log('rigistered event handler failed, not valid callback function ' + callback);
					};
				},

				removeDragEvent = function(type, callback) {
					var obj = this;
					if (obj.dragEvents) {
						if (obj.dragEvents[type]) {
							if (obj.dragEvents[type].callbackArr) {
								var index = obj.dragEvents[type].callbackArr.indexOf(callback);
								if (index == -1) {
									console.log('remove event handler failed, no such ' + callback + ' found in handler array or this handler already be removed');
								} else {
									obj.dragEvents[type].callbackArr.splice(index, 1);
									obj.dragEvents[type].settingsArr.splice(index, 1);
									console.log('event handler ' + callback + ' removed from ' + obj);
									obj.dragEvents[type].onEventsLoop ? tryOffEventsLoop.call(obj, type) : '';
								};
							} else {
								console.log(type + ' events handler in ' + obj + 'already totaly removed');
							};
						} else {
							console.log('no ' + type + 'events rigistered on ' + obj);
						};
					} else {
						console.log('no dragEvents rigistered on ' + obj);
					};
				};

			Element.prototype.addDragEventListener = addDragEvent;
			Element.prototype.removeDragEventListener = removeDragEvent;

			doc.addDragEventListener = addDragEvent;
			doc.removeDragEventListener = removeDragEvent;

		};
	})();

	// extend getindex
	(function() {
		if (!Element.prototype.getIndex) {
			Element.prototype.getIndex = function() {
				var parent = this.parentNode,
					children = parent.children,
					i = 0,
					l = children.length;
				while (i < l) {
					if (children[i] == this) {
						return i;
					};
					i++;
				};
			};
		};
	})();



	// common component

	var TimerExecute = (function() {
		var ObjPrivate = (function() {
			return {
				setPara: function(options) {
					!isNaN(options.executeTimer) ? this.executeTimer = options.executeTimer : this.executeTimer = this.executeTimer || 0;
					typeof options.onTimerSet != 'undefined' ? this.onTimerSet = options.onTimerSet : '';
					typeof options.onTimerClear != 'undefined' ? this.onTimerClear = options.onTimerClear : '';
					typeof options.alwaysExecute != 'undefined' ? this.alwaysExecute = options.alwaysExecute : '';
				}
			};
		})();
		var Obj = function(options) {
			if (this instanceof Obj) {
				ObjPrivate.setPara.call(this, options);
			} else {
				return new Obj(options);
			};
		};
		Obj.prototype = {
			constructor: Obj,
			tryToExecute: function(para, timer) {
				this.alwaysExecute && this.alwaysExecute(para);
				if (!this._timerMark) {
					var obj = this,
						timer = !isNaN(timer) ? timer : this.executeTimer;
					this._timerMark = true;
					this.onTimerSet && this.onTimerSet(para);
					obj._timerMarkStatus = setTimeout(function() {
						obj.onTimerClear && obj.onTimerClear(para);
						obj._timerMark = false;
					}, timer);
				};
			},
			update: function(options) {
				ObjPrivate.setPara.call(this, options);
			},
			remove: function() {
				clearTimeout(this._timerMarkStatus);
				var i;
				for (i in this) {
					delete this[i];
				};
			}
		};
		return Obj;
	})();

	var TimerDelay = (function() {
		var ObjPrivate = (function() {
			return {
				setPara: function(options) {
					!isNaN(options.delayTimer) ? this.delayTimer = options.delayTimer : this.delayTimer = this.delayTimer || 500;
					typeof options.execute != 'undefined' ? this.execute = options.execute : '';
				}
			};
		})();
		var Obj = function(options) {
			if (this instanceof Obj) {
				ObjPrivate.setPara.call(this, options);
			} else {
				return new Obj(options);
			};
		};
		Obj.prototype = {
			constructor: Obj,
			delayExecute: function(para, timer) {
				var obj = this,
					timer = !isNaN(timer) ? timer : this.delayTimer;
				clearTimeout(this._delayExecuteMark);
				this._delayExecute = setTimeout(function() {
					obj.execute && obj.execute(para);
				}, timer);
			},
			update: function(options) {
				ObjPrivate.setPara.call(this, options);
			},
			remove: function() {
				clearTimeout(this._delayExecuteMark);
				var i;
				for (i in this) {
					delete this[i];
				};
			}
		};
		return Obj;
	})();

	// slider object module
	var Slider = (function() {

		// private methods
		var _setPara = function(obj, options) {
				var $sliders = options.$sliders,
					showIndex = options.showIndex,
					minTimer = options.minTimer,
					autoPlayTimer = options.autoPlayTimer,
					loop = options.loop,
					callback = options.callback,
					noNextDo = options.noNextDo,
					noPrevDo = options.noPrevDo;
				if (typeof $sliders != 'undefined') {
					obj.$sliders = $sliders;
					obj._sliderLength = $sliders.length;
				};
				if (!isNaN(showIndex)) {
					obj.showIndex = showIndex;
				} else if (!isNaN(obj.showIndex)) {
					obj.showIndex = obj.showIndex;
				} else {
					obj.showIndex = 0;
				};

				//typeof showIndex != 'number' ? obj.showIndex = showIndex : '';
				typeof minTimer == 'number' ? obj.minTimer = minTimer : '';
				typeof callback == 'function' ? obj.callback = callback : '';
				typeof noNextDo != 'undefined' ? obj.noNextDo = noNextDo : '';
				typeof noPrevDo != 'undefined' ? obj.noPrevDo = noPrevDo : '';
				typeof loop == 'boolean' ? obj.loop = loop : '';
				typeof autoPlayTimer != 'undefined' ? obj.autoPlayTimer = autoPlayTimer : '';
			},
			// determine if autoplay should be active according to autoplayTime validation
			_judgePara = function(obj) {
				if (typeof obj.autoPlayTimer == 'number') {
					obj._autoPlay = true;
					obj._playState = null;
					obj.autoPlayTimer < obj.minTimer ? obj.autoPlayTimer = obj.minTimer : '';
				} else {
					delete obj._autoPlay;
					delete obj._playState;
				};
			},
			_plusIndex = function(obj) {
				var maxIndex = obj._sliderLength - 1,
					index = obj.showIndex + 1;
				if (index > maxIndex) {
					if (obj.loop) {
						return {
							index: 0,
							exec: true
						};
					} else {
						return {
							index: maxIndex,
							exec: false
						};
					};
				};
				return {
					index: index,
					exec: true
				};
			},
			_minusIndex = function(obj) {
				var minIndex = 0,
					index = obj.showIndex - 1;
				if (index < minIndex) {
					if (obj.loop) {
						return {
							index: obj._sliderLength - 1,
							exec: true
						};
					} else {
						return {
							index: minIndex,
							exec: false
						};
					};
				};
				return {
					index: index,
					exec: true
				};
			},
			_setPlayingTimer = function(obj, callback) {
				obj._playing = true;
				setTimeout(function() {
					obj._playing = false;
					callback && callback();
				}, obj.minTimer);
			};

		//default para
		//minTimer:0
		//showIndex:0
		//autoPlay:undefined
		//_playState:undefined
		//_playing:undefined
		//autoPlayTimer:undefined
		//$sliders:undefined
		//callback:undefined
		//loop:undefined
		//noNextDo:undefined
		//noPrevDo:undefined
		var SliderFunc = function(options) {
			if (this instanceof SliderFunc) {
				this.minTimer = 0;
				_setPara(this, options);
				//this.showIndex = 0;
				_judgePara(this);
			} else {
				return new SliderFunc(options);
			};
		};

		// public methods
		SliderFunc.prototype = {
			constructor: SliderFunc,
			start: function(prevShowIndex) {
				try {
					var obj = this,
						prevIndex = _minusIndex(this).index,
						nextIndex = _plusIndex(this).index,
						$showSlider = this.$sliders[this.showIndex];
					$prevSlider = (prevIndex == this.showIndex) ? null : this.$sliders[prevIndex],
						$nextSlider = (nextIndex == this.showIndex) ? null : this.$sliders[nextIndex];
					this.callback($prevSlider, $showSlider, $nextSlider, this.showIndex, this._sliderLength - 1, this.$sliders[prevShowIndex], prevShowIndex);

					if (this._autoPlay) {
						_setPlayingTimer(this, function() {
							obj._playState = setTimeout(function() {
								obj.showNext();
							}, obj.autoPlayTimer - obj.minTimer);
						});
					} else {
						_setPlayingTimer(this);
					};
				} catch (err) {
					this.remove();
					console.log('slider stacked since remove commond executed after slider.start excuted, but slider has been removed again successfully afterError');
				};
			},
			showNext: function() {
				if (!this._playing) {
					var currentShowIndex = this.showIndex,
						result = _plusIndex(this);
					this.showIndex = result.index;
					// console.log(this.showIndex);
					if (result.exec) {
						this.stop();
						this.start(currentShowIndex);
					} else {
						_setPlayingTimer(this);
						this.noNextDo && this.noNextDo(this.$sliders[this.showIndex]);
					};
				};
			},
			showPrev: function() {
				if (!this._playing) {
					var currentShowIndex = this.showIndex,
						result = _minusIndex(this);
					this.showIndex = result.index;
					// console.log(this.showIndex);
					if (result.exec) {
						this.stop();
						this.start(currentShowIndex);
					} else {
						_setPlayingTimer(this);
						this.noPrevDo && this.noPrevDo(this.$sliders[this.showIndex]);
					};
				};
			},
			startIndex: function(index) {
				if (!this._playing) {
					var minIndex = 0,
						maxIndex = this._sliderLength - 1,
						currentShowIndex = this.showIndex;
					index > maxIndex ? index = maxIndex : '';
					index < minIndex ? index = minIndex : '';
					if (index != this.showIndex) {
						this.showIndex = index;
						this.stop();
						this.start(currentShowIndex);
					};
				};
			},
			stop: function() {
				this._autoPlay ? clearTimeout(this._playState) : '';
			},
			update: function(options) {
				this.stop();
				_setPara(this, options);
				_judgePara(this);
				//this.start();
			},
			remove: function() {
				this.stop();
				for (var i in this) {
					delete this[i];
				};
			}
		};

		return SliderFunc;
	})();

	// xhrhttprequest object module
	var Xhr = (function() {
		// private functions
		var ObjPrivate = (function() {
			return {
				setPara: function(options) {

					var obj = this;

					this.originUrl = options.url || this.originUrl;
					this.method = options.method || this.method || 'get';

					this.cache = (function() {
						if (typeof options.cache == 'boolean') {
							return options.cache;
						} else if (typeof obj.cache == 'boolean') {
							return obj.cache;
						} else {
							return true;
						};
					})();
					this.asy = (function() {
						if (typeof options.asy == 'boolean') {
							return options.asy;
						} else if (typeof obj.asy == 'boolean') {
							return obj.asy;
						} else {
							return true;
						};
					})();

					typeof options.start != 'undefined' ? this.start = options.start : '';
					typeof options.success != 'undefined' ? this.success = options.success : '';
					typeof options.fail != 'undefined' ? this.fail = options.fail : '';
					typeof options.always != 'undefined' ? this.always = options.always : '';
					typeof options.progress != 'undefined' ? this.progress = options.progress : '';

					typeof options.timeout != 'undefined' ? this.timeout = options.timeout : '';
					typeof options.headers != 'undefined' ? this.headers = options.headers : '';
					typeof options.mimeType != 'undefined' ? this.mimeType = options.mimeType : '';
					typeof options.responseType != 'undefined' ? this.responseType = options.responseType : '';
					typeof options.user != 'undefined' ? this.user = options.user : '';
					typeof options.password != 'undefined' ? this.password = options.password : '';

					this._xhr = undefined;
				},
				addPara: function(para) {
					var url = this.originUrl;
					if (para) {
						url += '?';
						if (typeof para == 'object') {
							for (var j in para) {
								url += encodeURIComponent(j) + '=' + encodeURIComponent(para[j]) + '&';
							};
						} else {
							url += encodeURIComponent(para);
						};
					};
					this.url = url;
				},
				setCache: function() {
					var url = this.url,
						cache = this.cache;
					if (!cache) {
						url += (url.indexOf('?') == -1) ? ('?' + (new Date()).getTime()) : (new Date()).getTime();
					};
					this.url = url;
				},
				createXhr: function() {
					// creat xhr
					var obj = this,
						xhr = new XMLHttpRequest();
					// rigister events
					xhr.onloadstart = function() {
						if(!xhr._onloadstartTriggered){
							console.log('start');
							obj.start && obj.start();
							xhr._onloadstartTriggered=true;
						};
					};
					xhr.onprogress = function(event) {
						var loadedBytes, totalBytes;
						if (event.lengthComputable) {
							loadedBytes = event.loaded || event.position;
							totalBytes = event.total || event.totalSize;
							obj.progress && obj.progress(loadedBytes, totalBytes, xhr, event);

						};
						console.log('loading: ' + loadedBytes + ' of ' + totalBytes + ' bytes loaded');
					};
					xhr.onerror = function(event) {
						console.log('error');
						obj.fail && obj.fail(xhr, event);
					};
					xhr.onabort = function(event) {
						console.log('aborted');
						obj.fail && obj.fail(xhr, event);
					};
					xhr.ontimeout = function(event) {
						console.log('timeout');
						obj.fail && obj.fail(xhr, event);
					};
					xhr.onload = function(event) {
						if(!xhr.onloadTriggered){
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
								console.log('success');
								obj.success && obj.success(xhr.response, xhr.responseText, xhr, event);
							} else {
								console.log('failed');
								obj.fail && obj.fail(xhr, event);
							};
							xhr.onloadTriggered=true;
						};
					};
					xhr.onloadend = function(event) {
						if(xhr){
							console.log('always');
							obj.always && obj.always(xhr, event);
							ObjPrivate.removeXhr.call(obj);
						};
					};

					xhr.onreadystatechange=function(e){
						if(xhr.readyState==2){
							xhr.onloadstart && xhr.onloadstart(e);
						}
						// else if(xhr.readyState==3){
						// 	xhr.onprogress && xhr.onprogress(e);
						// }
						else if(xhr.readyState==4){
							xhr.onload && xhr.onload(e);
							xhr.onloadend && xhr.onloadend(e);
						};
					};
					// open xhr
					xhr.open(obj.method, obj.url, obj.asy, obj.user, obj.password);
					// set timeout
					obj.timeout ? xhr.timeout = obj.timeout : '';
					// set headers
					xhr.setRequestHeader('customHeader', 'customValue');
					if (obj.headers) {
						for (var i in obj.headers) {
							xhr.setRequestHeader(i, obj.headers[i]);
						};
					};
					// set responseMime
					try{
						obj.mimeType ? xhr.overrideMimeType(obj.mimeType) : '';
					}catch(err){
						console.log('xhr.overrideMimeType not supported');
						console.log(err);
					};
					obj.responseType ? xhr.responseType = obj.responseType : '';
					obj._xhr = xhr;
				},
				removeXhr: function() {
					this._xhr.onloadstart = null;
					this._xhr.onprogress = null;
					this._xhr.onerror = null;
					this._xhr.onabout = null;
					this._xhr.ontimeout = null;
					this._xhr.onload = null;
					this._xhr.onloadend = null;
					this._xhr.onreadystatechange = null;
					this._xhr = null;
				}
			};
		})();

		// constructor
		var Obj = function(options) {
			if (this instanceof Obj) {
				ObjPrivate.setPara.call(this, options);
			} else {
				return new Obj(options);
			};
		};
		// public methods
		Obj.prototype = {
			constructor: Obj,
			send: function(paraObj, data) {
				var para = paraObj ? paraObj : '',
					data = data ? data : null;
				ObjPrivate.addPara.call(this, para);
				ObjPrivate.setCache.call(this);
				ObjPrivate.createXhr.call(this);
				this._xhr.send(data);
			},
			abort: function() {
				this._xhr.abort();
			},
			update: function(options) {
				ObjPrivate.setPara.call(this, options);
			},
			remove: function() {
				ObjPrivate.removeXhr.call(this);
				for (var i in this) {
					delete this[i];
				};
			}
		};
		return Obj;
	})();

	// mediaplayer object module
	var MediaPlayer = (function() {
		var doc = document,
			body = doc.body;
		var ObjPrivate = (function() {
			return {
				setPlayerId: (function() {
					var playerNumber = 0;
					return function() {
						playerNumber++;
						this.playerId = 'mediaPlayer_' + playerNumber;
					};
				})(),
				setPara: function(options) {
					options.settings ? this.settings = options.settings : '';
					options.sources ? this.sources = options.sources : '';
					this.$playerWrapper = options.$playerWrapper || this.$playerWrapper || body;
					!isNaN(options.playingIndex) ? this.playingIndex = ObjPrivate.checkNewPlayingIndex.call(this, options.playingIndex) : '';
					typeof options.playStart != 'undefined' ? this.playStart = options.playStart : '';
					typeof options.runPlayCommond != 'undefined' ? this.runPlayCommond = options.runPlayCommond : '';
					typeof options.buffering != 'undefined' ? this.buffering = options.buffering : '';
					typeof options.bufferStart != 'undefined' ? this.bufferStart = options.bufferStart : '';
					typeof options.bufferEnd != 'undefined' ? this.bufferEnd = options.bufferEnd : '';
					typeof options.seekEnd != 'undefined' ? this.seekEnd = options.seekEnd : '';
					typeof options.seeking != 'undefined' ? this.seeking = options.seeking : '';
					typeof options.playEnd != 'undefined' ? this.playEnd = options.playEnd : '';
					typeof options.onePlayEnd != 'undefined' ? this.onePlayEnd = options.onePlayEnd : '';
					typeof options.playPaused != 'undefined' ? this.playPaused = options.playPaused : '';
					typeof options.error != 'undefined' ? this.error = options.error : '';
					typeof options.timeUpdate != 'undefined' ? this.timeUpdate = options.timeUpdate : '';
					typeof options.volumeUpdate != 'undefined' ? this.volumeUpdate = options.volumeUpdate : '';
					typeof options.playChange != 'undefined' ? this.playChange = options.playChange : '';
					typeof options.waitingBuffer != 'undefined' ? this.waitingBuffer = options.waitingBuffer : '';
					typeof options.waitingBufferEnd != 'undefined' ? this.waitingBufferEnd = options.waitingBufferEnd : '';
				},
				checkType: function() {
					if (this.sources && this.sources.length) {
						var audioPatten = new RegExp(/audio\/.+/),
							videoPatten = new RegExp(/video\/.+/),
							source = this.sources[this.playingIndex];
						if (audioPatten.test(source.types[0])) {
							return 'audio';
						} else if (videoPatten.test(source.types[0])) {
							return 'video';
						} else {
							console.log('not valid type patten');
							return false;
						};
					} else {
						console.log('no valid source detected');
						return false;
					};
				},
				buildMedia: function() {
					this.$player = doc.createElement(this.mediaType);
					this.$player.id = this.playerId;
					this.$player.className = 'mediaPlayer';
				},
				setAttributes: function() {
					if (this.sources && this.sources.length) {
						var obj = this,
							commonSettings = obj.settings,
							uniqueSettings = !isNaN(obj.playingIndex) ? obj.sources[obj.playingIndex].settings : '';
						setAttr = function(settings) {
							if (obj.$player) {
								obj.$player.removeAttribute('width');
								obj.$player.removeAttribute('height');
								obj.$player.removeAttribute('poster');
								for (var i in settings) {
									if (settings[i]) {
										if (i == 'width' || i == 'height' || i == 'poster' || i == 'preload') {
											obj.$player.setAttribute(i, settings[i]);
										} else if (i == 'playMode') {
											obj.$player.setAttribute('data-playmode', settings[i]);
										} else {
											obj.$player.setAttribute(i, '');
										};
									};
								};
							};
						};

						setAttr(commonSettings);
						uniqueSettings ? setAttr(uniqueSettings) : '';

					};

				},
				buildSource: function() {
					var source = this.sources[this.playingIndex],
						i = 0,
						l = source.srcs.length,
						sources = '';
					while (i < l) {
						sources += '<source src="' + source.srcs[i] + '" type="' + source.types[i] + '"/>';
						i++;
					};
					this.$player.innerHTML = sources + 'html5 media player not aviliable';

					// fix ie9
					if(this.$player.innerHTML=='html5 media player not aviliable'){
						this.$player.innerHTML='';
						i=0;
						while(i<l){
							var media=doc.createElement('source');
							media.src=source.srcs[i];
							media.type=source.types[i];
							this.$player.appendChild(media);								
							i++;
						};
					};

				},
				createMedia: function() {
					var mediaType = ObjPrivate.checkType.call(this);
					if (mediaType) {
						var prevMediaType = this.mediaType;
						if (mediaType == prevMediaType) {
							ObjPrivate.buildSource.call(this);
						} else {
							this.$player && ObjPrivate.offEvents.call(this);
							this.$player ? this.$playerWrapper.removeChild(this.$player) : '';
							this.mediaType = mediaType;
							ObjPrivate.buildMedia.call(this);
							ObjPrivate.onEvents.call(this);
							ObjPrivate.setAttributes.call(this);
							ObjPrivate.buildSource.call(this);
							this.$playerWrapper.appendChild(this.$player);
						};
						return true;
					};
				},
				calcRandomIndex: function() {
					var obj=this;

					var resetIndexes = function(randomIndex) {
							obj.randomIndexes = [];
							delete obj.randomIndex;
						},
						calcIndex = function() {
							var i = 0,
								l = obj.randomIndexes.length,
								randomIndex = Math.floor(Math.random() * obj.sources.length);
							while (i < l) {
								if (randomIndex == obj.randomIndexes[i]) {
									arguments.callee();
									return;
								};
								i++;
							};
							obj.randomIndex = randomIndex;
							obj.randomIndexes.push(randomIndex);
						};
					if (obj.randomIndexes) {
						if (obj.randomIndexes.length >= obj.sources.length) {
							if (obj.settings.playMode == 'loop-random') {
								resetIndexes();
								calcIndex();
							} else {
								delete obj.randomIndex;
								delete obj.randomIndexes;
							};
						} else {
							calcIndex();
						};
					} else {
						resetIndexes();
						calcIndex();
					};
				},
				onEvents: function() {
					!('ontimeupdate' in this.$player) ? this.noOnTimeUpdate=true : '';
					!('onprogress' in this.$player) ? this.noOnProgress=true : '';
					!('onvolumechange' in this.$player) ? this.noOnVolumnChange=true : '';

					var obj = this;
					var bufferFunction = function(e) {
						if (!obj.downloaded) {
							var buffered = obj.$player.buffered,
								l = buffered.length;
							if (l) {
								var bufferedObjArr = [];
								i = 0;

								while (i < l) {
									var start = buffered.start(i),
										end = buffered.end(i);
									bufferedObjArr.push({
										start: start,
										end: end
									});
									i++;
								};

								obj.buffering && obj.buffering(bufferedObjArr, obj.$player.duration, obj.$player.bufferedBytes, obj.$player.totalBytes, obj.$player.bufferingRate, e);
								if (l == 1 && bufferedObjArr[0].start == 0 && bufferedObjArr[0].end == obj.$player.duration) {
									obj.downloaded = true;
									obj.bufferEnd && obj.bufferEnd();
								};
							};
						};
					};
					this.$player.onplay = function(e) {
						if(!obj.playing){
							obj.downloaded = false;
							obj.playing = true;
							obj.aborted = false;
							obj.runPlayCommond && obj.runPlayCommond(obj.playingIndex, e);
						};
					};
					this.$player.onloadstart = function(e) {
						obj.bufferStart && obj.bufferStart(obj.playingIndex, e);
					};
					this.$player.onloadedmetadata = function(e) {
						obj.setVolume(obj.volume || 1);
					};
					this.$player.onplaying = function(e) {
						obj.waiting = false;
						obj.playStart && obj.playStart(obj.playingIndex, e);
						if (!obj.waitingBufferEndExecuted) {
							obj.waitingBufferEnd && obj.waitingBufferEnd(obj.playingIndex, e);
							obj.waitingBufferEndExecuted = true;
						};
						if (!isNaN(obj._tempPlayPercent)) {
							obj.setPlayPercent(obj._tempPlayPercent);
							delete obj._tempPlayPercent;
						};
						bufferFunction(e);
					};

					this.$player.onprogress = function(e) {
						bufferFunction(e);
					};
					this.$player.onwaiting = function(e) {
						obj.waiting = true;
						obj.waitingBufferEndExecuted = false;
						obj.waitingBuffer && obj.waitingBuffer(obj.playingIndex, e);
					};
					this.$player.onseeking = function(e) {
						obj.seeking && obj.seeking(obj.playingIndex, e);
					};
					this.$player.onseeked = function(e) {
						obj.waiting = false;
						obj.downloaded = false;
						obj.seekEnd && obj.seekEnd(obj.playingIndex, e);
						if (!obj.waitingBufferEndExecuted) {
							obj.waitingBufferEnd && obj.waitingBufferEnd(obj.playingIndex, e);
							obj.waitingBufferEndExecuted = true;
						};
						if (!isNaN(obj._tempPlayPercent)) {
							obj.setPlayPercent(obj._tempPlayPercent);
							delete obj._tempPlayPercent;
						};
					};

					this.$player.ontimeupdate = function(e) {
						obj.timeUpdate && obj.timeUpdate(obj.$player.currentTime, obj.$player.duration, obj.$player.played, obj.playingIndex, e);
					};


					this.$player.onvolumechange = function(e) {

						if (obj.$player) {
							if (!isNaN(obj.$player.volume)) {
								obj.volume = obj.$player.volume;
							} else {
								obj.volume = 1;
							};
						} else {
							obj.volume = 1;
						};
						obj.volumeUpdate && obj.volumeUpdate(obj.$player.volume, obj.playingIndex, e);

					};
					this.$player.onemptied = function(e) {
						console.log('net connection closed', obj.playingIndex, e);
					};
					this.$player.onempty = function(e) {
						obj.error && obj.error('error occored, loading stopped', obj.playingIndex, e);
					};
					this.$player.onerror = function(e) {
						obj.error && obj.error('error occered during loading', obj.playingIndex, e);
					};
					this.$player.onstalled = function(e) {
						obj.error && obj.error('no data receved', obj.playingIndex, e);
					};
					this.$player.onabort = function(e) {
						if (!obj.aborted) {
							obj.waiting = false;
							obj.waitingBufferEnd && obj.waitingBufferEnd(obj.playingIndex, e);
							obj.aborted = true;
						};
					};
					this.$player.onpause = function(e) {
						if (obj.playing) {
							obj.playPaused && obj.playPaused(obj.playingIndex, e);
							obj.playing = false;
						};
					};
					this.$player.onended = function(e){
							obj.onePlayEnd && obj.onePlayEnd(obj.playingIndex);
							switch (obj.settings.playMode) {
								case 'loop-single':
									obj.setPlayPercent(0);
									obj.$player.load();
									obj.play();
									break;
								case 'loop-all':
									obj.playNext();
									break;
								case 'all':
									if (obj.playingIndex < obj.sources.length - 1) {
										obj.playNext();
									} else {
										obj.stop();
										obj.playEnd && obj.playEnd();
									};
									break;
								default:
									// obj.stop();
									ObjPrivate.calcRandomIndex.call(obj);
									!isNaN(obj.randomIndex) ? obj.playIndex(obj.randomIndex) : obj.playEnd && obj.playEnd();
							};
					};

				if(obj.noOnProgress || obj.noOnVolumnChange || obj.noOnTimeUpdate){
						clearTimeout(obj.falseFunctionsMark);
						obj.falseFunctionsMark=setTimeout(function(){
							if(obj.$player){
								obj.noOnProgress && obj.$player.onprogress();
								obj.noOnVolumnChange && obj.$player.onvolumechange();
								if(obj.noOnTimeUpdate){
									obj.$player.ontimeupdate();
									obj.$player.duration-obj.$player.currentTime<=0.1 ? obj.$player.onended() : '';
								};
							};
							var callee=arguments.callee;
							obj.falseFunctionsMark=setTimeout(function(){
								callee();
							},17);
						},17);
				};

				},
				offEvents: function() {
					this.$player.onloadstart = null;
					this.$player.onended = null;
					this.$player.onprogress = null;
					this.$player.onplaying = null;
					this.$player.ontimeupdate = null;
					this.$player.onvolumechange = null;
					this.$player.onenmptied = null;
					this.$player.onenmpty = null;
					this.$player.onerror = null;
					this.$player.onstalled = null;
					this.$player.onwaiting = null;
					this.$player.onabort = null;
					this.$player.onseeking = null;
					this.$player.onseeked = null;
					this.$player.onloadedmetadata = null;
					!isNaN(this.falseFunctionsMark) && clearTimeout(this.falseFunctionsMark);
				},
				checkNewPlayingIndex: function(newIndex) {
					if (this.sources && this.sources.length) {
						newIndex > this.sources.length - 1 ? newIndex = 0 : '';
						newIndex < 0 ? newIndex = this.sources.length - 1 : '';
						return newIndex;
					} else {
						console.log('no sources detected');
					};
				}
			};
		})();
		var Obj = function(options) {
			if (this instanceof Obj) {
				ObjPrivate.setPlayerId.call(this);
				ObjPrivate.setPara.call(this, options);
				this.settings.autoPlay ? this.$player.play() : '';
			} else {
				return new Obj(options);
			};
		};
		Obj.prototype = {
			constructor: Obj,
			playNext: function() {
				return this.playIndex(this.playingIndex + 1);
			},
			playPrev: function() {
				return this.playIndex(this.playingIndex - 1);
			},
			playIndex: function(index) {
				var obj = this,
					oldIndex = obj.playingIndex,
					validSource = true;
				this.$player && this.stop();
				var newIndex = ObjPrivate.checkNewPlayingIndex.call(obj, index || 0);
				if (!isNaN(newIndex)) {
					obj.playingIndex = newIndex;
					obj.playChange && obj.playChange(oldIndex, newIndex);
					validSource = ObjPrivate.createMedia.call(obj);
					if (validSource) {
						obj.$player.load();
						obj.play();
						return true;
					};
				};
			},
			setPlayPercent: function(percent, forceLimit) {
				percent >= 1 ? (forceLimit ? percent = 1 : percent = 0.999) : '';
				percent <= 0 ? (forceLimit ? percent = 0 : percent = 0.001) : '';
				if (this.$player && !isNaN(this.$player.duration)) {
					this.$player.currentTime = this.$player.duration * percent;
				} else {
					this._tempPlayPercent = percent;
				};
				this.timeUpdate && this.timeUpdate(percent, 1, (this.$player ? (this.$player.played || null) : null), this.playingIndex, null);
				// this.$player && !isNaN(this.$player.duration) ? this.$player.currentTime = this.$player.duration * percent : '';
			},
			pause: function() {
				this.$player ? this.$player.oncanplay = null : '';
				this.$player && this.$player.pause();
				this.$player && this.$player.onpause && this.$player.onpause();
			},
			play: function() {
				if (this.sources && this.sources.length) {
					if (this.$player) {
						var obj = this,
							playMedia = function() {
								obj.$player.play();
								!isNaN(obj.volume) ? obj.$player.volume = obj.volume : '';
								obj.$player.onplay && obj.$player.onplay();
							};
						if (this.$player.readyState == 2 || this.$player.readyState == 3 || this.$player.readyState == 4) {
							playMedia();
						};
						this.$player.oncanplay = playMedia();
						return true;
					} else {
						return this.playIndex(0);
					};
				};
			},
			stop: function() {
				if (this.$player) {
					this.setPlayPercent(0, true);
					this.pause();
					var sources = this.$player.querySelectorAll('source'),
						i = 0;
					while (i < sources.length) {
						sources[i].src = '';
						sources[i].removeAttribute('src');
						i++;
					};
					try {
						this.$player.abort();
					} catch (err) {
						console.log(err);
						this.$player.onabort && this.$player.onabort();
					};
				};
			},
			volumeUp: function(n) {
				var v = Math.abs(n),
					newVolume = this.volume + v;
				this.volume(newVolume);
			},
			volumeDown: function(n) {
				var v = -Math.abs(n),
					newVolume = this.volume - v;
				this.volume(newVolume);
			},
			setVolume: function(v) {
				if (!isNaN(v)) {
					v > 1 ? v = 1 : '';
					v < 0 ? v = 0 : '';
					this.volume = v;
					if (this.$player && (this.$player.readyState == 2 || this.$player.readyState == 3 || this.$player.readyState == 4)) {
						this.$player.volume = v;
					} else {
						this.volumeUpdate && this.volumeUpdate(this.volume, this.playingIndex, null);
					};
					// if(this.noOnVolumeChange){
					// 	this.$player.onvolumechange && this.$player.onvolumechange();
					// };
				};
			},
			update: function(options) {
				ObjPrivate.setPara.call(this, options);
				ObjPrivate.setAttributes.call(this);
				if (!this.sources || !this.sources.length) {
					this.stop();
				};
			},
			remove: function() {
				this.$player && this.$player.load();
				this.stop();
				ObjPrivate.offEvents.call(this);
				this.$playerWrapper.removeChild(this.$player);
				for (var i in this) {
					delete this[i];
				};
			}
		};
		return Obj;
	})();


	// dom buffer
	var win = window,
		$doc = document,
		$html = $doc.documentElement,
		$body = $doc.body,
		$main = $doc.querySelector('#main'),
		$contentWrapper = $main.querySelector('.contentWrapper'),
		mediaPath='media/audio/';



	// page level function
	// menu
	var menu = (function() {
		var $menuTrigger = $body.querySelector('#menuTrigger'),
			$nav = $body.querySelector('#nav'),

			toggleMenu = function() {
				$body.classList.toggle('showMenu');
			},

			bindToggleMenu = function() {
				$menuTrigger.addEventListener('touchstart', toggleMenu);
			},

			loadPage = function(e) {
				e.preventDefault();
				var $target = e.target,
					targetName = $target.nodeName.toLowerCase();
				if (targetName == 'li' && !$target.classList.contains('selected')) {
					var source = $target.getAttribute('data-loadsource');
					loadPageXhr(source);
				};
			},

			bindLoadPage = function() {
				$nav.addEventListener('touchstart', loadPage);
				$nav.addEventListener('click', loadPage);
			};
		bindToggleMenu();
		bindLoadPage();
	})();



	var playPannel = (function() {

		var scrollDistance = 0,
			$playPannel = $doc.querySelector('#playPannel'),
			$playButton = $playPannel.querySelector('.playPause i'),
			$timeLine = $playPannel.querySelector('.timeLine'),
			$timeWrapper = $timeLine.querySelector('.lines'),
			$timeDisc = $playPannel.querySelector('.timeDisc'),
			$bufferLine = $playPannel.querySelector('.bufferLine'),
			$volume = $playPannel.querySelector('.volumeLine'),
			$volumeWrapper = $volume.querySelector('.wrapper'),
			$volumeDisc = $volume.querySelector('.volumeDisc'),
			$lrc = $main.querySelector('.lyrcWrapper'),
			$lrcButton = $playPannel.querySelector('.toggleLrc i'),
			$playMode = $playPannel.querySelector('.setPlayMode i'),
			$infoWrapper = $playPannel.querySelector('.pannelInfo'),
			paddingBottom = parseInt($doc.defaultView.getComputedStyle($lrc, null).paddingBottom, 10),
			pannelShowControl = (function() {
				var showPannel = function() {
						!$body.classList.contains('showPannel') && $body.classList.add('showPannel');
					},
					hidePannel = function() {
						$body.classList.contains('showPannel') && $body.classList.remove('showPannel');
					},
					checkScroll = function() {
						var newScrollTop = $contentWrapper.scrollTop;
						if (newScrollTop > scrollDistance) {
							hidePannel();
						} else {
							showPannel();
						};
						scrollDistance = newScrollTop;
					},
					bindTogglePannel = function() {
						$contentWrapper.addEventListener('scroll', checkScroll);
					};
				bindTogglePannel();
				return {
					show: showPannel
				};
			})(),
			pannelPlayControl = (function() {
				var

					setPlayMode = (function() {
						var playModes = ['loop-all', 'loop-single', 'loop-random'],
							currentPlayModeIndex = 0;
						return function() {
							currentPlayModeIndex++;
							currentPlayModeIndex > playModes.length - 1 ? currentPlayModeIndex = 0 : '';
							mediaPlayer.updatePlayMode(playModes[currentPlayModeIndex]);
							$playMode.className = 'icon-' + playModes[currentPlayModeIndex];
						};
					})(),
					setPlayPercent = (function() {
						var totalWidth = $bufferLine.offsetWidth,
							bufferLineLeft = $bufferLine.getPosition().left(),
							timerDelay = new TimerDelay({
								delayTimer: 600,
								execute: function(para) {
									totalWidth = $bufferLine.offsetWidth;
									bufferLineLeft = $bufferLine.getPosition().left();
								}
							});
						win.addEventListener('resize', function() {
							timerDelay.delayExecute();
						});
						return function(x, y, xDis, yDis, e) {
							var timePosition = (x - bufferLineLeft) / totalWidth;
							timePosition >= 0.98 ? timePosition = 1 : '';
							timePosition <= 0.02 ? timePosition = 0 : '';
							// markCurrentTime(timePosition, 1);
							mediaPlayer.setPlayPercent(timePosition);
						};
					})(),
					setVolume = (function() {
						var totalHeight = 100,
							volumeLineBottom = $volumeWrapper.getPosition().top() + totalHeight,
							timerDelay = new TimerDelay({
								delayTimer: 600,
								execute: function(para) {
									volumeLineBottom = $volumeWrapper.getPosition().top() + totalHeight;
								}
							});
						win.addEventListener('resize', function() {
							timerDelay.delayExecute();
						});
						return function(x, y, xDis, yDis, e) {
							var volumePosition = (volumeLineBottom - y) / totalHeight;
							volumePosition >= 0.97 ? volumePosition = 1 : '';
							volumePosition <= 0.03 ? volumePosition = 0 : '';
							mediaPlayer.setVolume(volumePosition);
						};
					})(),
					toggleLrc = (function() {
						var listScrollTop = 0,
							showLrc = (function() {
								var
									targetSongId = '',
									xhrMark = false,
									xhr = new Xhr({
										url: '',
										cache: false,
										start: function() {
											xhrMark = true;
											// $lrc.classList.add('loading');
											$lrc.innerHTML = '<h6>Loading...</h6>';
										},
										success: function(response, responseText, xhr, event) {
											$lrc.innerHTML = responseText;
											$lrc.setAttribute('data-lrcsongid', targetSongId);
										},
										progress: function(loadedBytes, totalBytes, xhr, event) {

										},
										fail: function(xhr, event) {
											$lrc.innerHTML = '<h6>Load failed,try later!</h6>';
										},
										always: function(xhr, event) {
											// $lrc.classList.remove('loading');
											xhrMark = false;
										}
									}),
									loadNewLrc = function(songId) {
										xhr.update({
											url: 'html/lrc/' + songId + '.html'
										});
										xhrMark ? xhr.abort() : '';
										xhr.send();
										targetSongId = songId;
									};
								return function(songId) {
									if (songId) {
										listScrollTop = $contentWrapper.scrollTop;

										var oldSongId = $lrc.getAttribute('data-lrcsongid');
										if (songId != oldSongId) {
											loadNewLrc(songId);
										};
										$body.classList.add('preShowLyrc');
										setTimeout(function() {
											$body.classList.add('showLrc');
											$playPannel.classList.add('showLrc');
											setTimeout(function() {
												$body.classList.add('hidePlayList');
											}, 500);
										}, 10);
										return true;
									} else {
										console.log('no valid songId detected');
									};
								};
							})(),
							showList = function(resetScrollTop) {
								$body.classList.remove('hidePlayList');
								setTimeout(function() {
									resetScrollTop ? listScrollTop = 0 : '';
									$contentWrapper.scrollTop = listScrollTop;
									$body.classList.remove('showLrc');
									$playPannel.classList.remove('showLrc');
									setTimeout(function() {
										$body.classList.remove('preShowLyrc');
									}, 500);
								}, 10);
							};
						return (function() {
							var success = true,
								timer = new TimerExecute({
									executeTimer: 600,
									onTimerSet: function(para) {
										if (para) {
											if (para.showTarget == 'list') {
												showList(para.resetScrollTop);
												success = true;
											} else if (para.showTarget == 'lrc') {
												success = showLrc(para.songId);
											};
										} else {
											if ($body.classList.contains('showLrc')) {
												showList();
												success = true;
											} else {
												success = showLrc(mediaPlayer.getPlayingStatus().songId);
											};
										};
									}
								});
							return function(para) {
								timer.tryToExecute(para);
								return success;
							};
						})();
					})(),
					loadSongsPage = function(e) {
						if (!$body.classList.contains('songsPage')) {
							e.preventDefault();
							loadPageXhr('songs');

						};
					},
					pannelInfo = new TimerExecute({
						executeTimer: 4000,
						onTimerSet: function(para) {
							$infoWrapper.classList.add('show');
							$infoWrapper.addEventListener('touchstart', loadSongsPage);
							$infoWrapper.addEventListener('click', loadSongsPage);
						},
						onTimerClear: function(para) {
							$infoWrapper.classList.remove('show');
							$infoWrapper.removeEventListener('touchstart', loadSongsPage);
							$infoWrapper.removeEventListener('click', loadSongsPage);
						},
						alwaysExecute: function(para) {
							$infoWrapper.innerHTML = para.info;
						}
					}),
					pannelEvents = function(e) {
						e.preventDefault();
						var target = e.target,
							playSuccess = true;
						switch (true) {
							case target.isInTarget('.setPlayMode'):
								setPlayMode();
								break;
							case target.isInTarget('.playPrev'):
								playSuccess = mediaPlayer.playPrev();
								break;
							case target.isInTarget('.playPause'):
								playSuccess = mediaPlayer.playToggle();
								break;
							case target.isInTarget('.playNext'):
								playSuccess = mediaPlayer.playNext();
								break;
							case target.isInTarget('.toggleLrc'):
								playSuccess = toggleLrc();
								break;
							default:
								;
						};
						!playSuccess ? pannelInfo.tryToExecute({
							info: '<p><i class="icon-add"></i>Add songs from playlist</p>'
						}) : '';
					},
					bindPannelEvents = function() {
						var preventDefault = function(e) {
							e.stopPropagation();
							e.preventDefault();
						};
						$playPannel.addEventListener('touchstart', pannelEvents);
						$playPannel.addEventListener('click', pannelEvents);
						$timeLine.addTouchEventListener('swiping', setPlayPercent);
						$volume.addTouchEventListener('swiping', setVolume);
						$timeLine.addDragEventListener('draging', setPlayPercent, {
							selector: '.lines'
						});
						$volume.addDragEventListener('draging', setVolume, {
							selector: '.wrapper'
						});
						$timeLine.addEventListener('touchstart', preventDefault);
						$volume.addEventListener('touchstart', preventDefault);
						$timeLine.addEventListener('touchmove', preventDefault);
						$timeLine.addEventListener('touchend', preventDefault);
					};
				bindPannelEvents();
				return {
					toggleLrc: toggleLrc
				};
			})();

		return {
			show: function() {
				scrollDistance = 0;
				pannelPlayControl.toggleLrc({
					showTarget: 'list',
					resetScrollTop: true
				});
				pannelShowControl.show();
			},
			runPlayCommond: function() {
				$playButton.classList.add('icon-pause');
				$playButton.classList.remove('icon-play');
			},
			playPaused: function(pauseIndex, e) {
				$playButton.classList.add('icon-play');
				$playButton.classList.remove('icon-pause');
			},
			buffering: function(bufferedObjArr, duration, bufferedBytes, totalBytes, bufferingRate, index, e) {
				if(Modernizr.cssgradients){
					var i = 0,
						start,
						end,
						back = 'linear-gradient(90deg';
					for (i = 0; i < bufferedObjArr.length; i++) {
						start = bufferedObjArr[i].start;
						end = bufferedObjArr[i].end;
						back += ',transparent ' + start / duration * 100 + '%,rgba(0,161,211,0.618) ' + start / duration * 100 + '%,rgba(0,161,211,0.618) ' + end / duration * 100 + '%,transparent ' + end / duration * 100 + '%';
					};
					back += ')';
					$bufferLine.prefixCss({
						'background': ('-vendor-' + back)
					});
				}else{
					$bufferLine.style.backgroundColor='rgba(0,161,211,0.618)';
				};
			},
			volumeUpdate: function(volume, index, e) {
				$volumeDisc.prefixCss({
					'-vendor-transform': Modernizr.csstransforms3d ? ('translateY(' + (1 - volume) * 90 + 'px) translateZ(0)') : ('translateY(' + (1 - volume) * 90 + 'px)')
				});
			},
			timeUpdate: function(currentTime, duration, playedTimeRanges, index, e) {
				if (!isNaN(currentTime) && !isNaN(duration)) {
					var totalWidth = $bufferLine.offsetWidth - $timeDisc.offsetWidth,
						timePosition = currentTime / duration * totalWidth;
					$timeDisc.prefixCss({
						'-vendor-transform': Modernizr.csstransforms3d ? ('translateX(' + timePosition + 'px) translateZ(0)') : ('translateX(' + timePosition + 'px)')
					});
				};
				if ($body.classList.contains('showLrc')) {
					var currentTime = parseInt(currentTime, 10),
						$targetLine = $lrc.querySelector('p[data-showtime="' + currentTime + '"]');
					if ($targetLine) {
						var $lines = $lrc.querySelectorAll('p[data-showtime]'),
							i = 0,
							l = $lines.length;
						while (i < l) {
							$lines[i].classList.remove('currentPlaying');
							i++;
						};
						$targetLine.classList.add('currentPlaying');
						$lrc.scrollTop = $targetLine.offsetTop - $lrc.clientHeight / 2 + paddingBottom;

					};
				};
			},
			playChange: function(oldIndex,newIndex) {
				$timeDisc.removeAttribute('style');
				$bufferLine.removeAttribute('style');
				if ($body.classList.contains('showLrc')) {
					pannelPlayControl.toggleLrc({
						showTarget: 'lrc',
						songId: mediaPlayer.getPlayingStatus().songId
					});
				};
			},
			waitingBuffer: function(index, e) {
				$playButton.classList.add('waitingBuffer');
			},
			waitingBufferEnd: function(index, e) {
				$playButton.classList.remove('waitingBuffer');
			}
		};
	})();

	var commonPlayControl = (function() {
		var $songs = null,
			mediaEventsControl = null,
			getSongWrapper = null,
			markPlayingStatus = null,
			addSongRenderCallback = null,
			removeSongRenderCallback = null;
		return {
			install: function() {

				getSongWrapper = function(songId) {
					var $songWrapper = $doc.querySelector('[data-songid="' + songId + '"]');
					return $songWrapper;
				};

				markPlayingStatus = function() {
					var playingStatus = mediaPlayer.getPlayingStatus(),
						$songWrapper = getSongWrapper(playingStatus.songId);
					if (playingStatus.waiting) {
						$songWrapper && $songWrapper.querySelector('.icon-play').classList.add('waitingBuffer');
					} else if (playingStatus.playing) {
						$songWrapper && $songWrapper.classList.add('playing');
					};
				};


				// bind common play control
				mediaEventsControl = function(tapStartE, tapEndE) {
					tapEndE && tapEndE.preventDefault();
					var target = tapStartE.target,
						checkTarget = function(originalTarget) {
							var selector = null,
								checkTarget = function(newTarget) {
									if (newTarget.matches('[data-songid]')) {
										selector = newTarget;
									} else if (newTarget.matches('[data-songid] *')) {
										arguments.callee(newTarget.parentNode);
									};
								};
							checkTarget(originalTarget);
							return selector;
						},
						$selector = checkTarget(target);
					if ($selector) {
						switch (true) {
							case target.classList.contains('icon-play') && $selector.classList.contains('playing'):
								mediaPlayer.pause();
								break;
							case target.classList.contains('icon-play') && !$selector.classList.contains('playing'):
								var added = mediaPlayer.playIdSong($selector.getAttribute('data-songid')).added;
								(!added && addSongRenderCallback) ? addSongRenderCallback($selector): '';
								break;
							case target.classList.contains('icon-add') && $selector.classList.contains('added'):
								mediaPlayer.removeIdSong($selector.getAttribute('data-songid'));
								removeSongRenderCallback && removeSongRenderCallback($selector);
								break;
							case target.classList.contains('icon-add') && !$selector.classList.contains('added'):
								var added = mediaPlayer.addIdSong($selector.getAttribute('data-songid')).added;
								(!added && addSongRenderCallback) ? addSongRenderCallback($selector): '';
							default:
								;
						};
					};
				};

				// update mediaplayer render
				mediaPlayer.updatePageLevelFunctions({
					markPlayingSong: function(songId, e) {
						var $songWrapper = getSongWrapper(songId);
						if ($songWrapper) {
							$songWrapper.classList.add('playing');
							if ($body.classList.contains('songsPage')) {
								$songs = $songs || $doc.querySelector('#songs');
								// console.log($songWrapper.offsetTop-$songs.clientHeight/2);
								$songs.scrollTop = $songWrapper.offsetTop - $songs.clientHeight / 2;
							} else {
								$songs = null;
							};
						};
					},
					removeMarkPlayingSong: function(songId, e) {
						var $songWrapper = getSongWrapper(songId);
						$songWrapper && $songWrapper.classList.remove('playing');
					},
					markWaitingSong: function(songId, e) {
						var $songWrapper = getSongWrapper(songId);
						$songWrapper && $songWrapper.querySelector('.icon-play').classList.add('waitingBuffer');
					},
					removeMarkWaitingSong: function(songId, e) {
						var $songWrapper = getSongWrapper(songId);
						$songWrapper && $songWrapper.querySelector('.icon-play').classList.remove('waitingBuffer');
					}
				});


				$doc.addTouchEventListener('tap', mediaEventsControl);
				$doc.addEventListener('click', mediaEventsControl);

				markPlayingStatus();


			},
			uninstall: function() {

				// remove unnecessary mediaplayer render
				mediaPlayer.updatePageLevelFunctions({
					markPlayingSong: null,
					removeMarkPlayingSong: null,
					markWaitingSong: null,
					removeMarkWaitingSong: null
				});
				getSongWrapper = null;
				markPlayingStatus = null;
				$songs = null;

				// remove common play control
				$doc.removeTouchEventListener('tap', mediaEventsControl);
				$doc.removeEventListener('click', mediaEventsControl);
				mediaEventsControl = null;

			},
			updatePageLevelFunctions: function(options) {
				options.addSongRender != 'undefined' ? addSongRenderCallback = options.addSongRender : '';
				options.removeSongRender != 'undefined' ? removeSongRenderCallback = options.removeSongRender : '';
			}
		};

	})();



	// mediaplayer
	var mediaPlayer = (function() {
		var localSongsIdStr = localStorage.getItem('addedSongsIdJson'),
			localSongsArr = localSongsIdStr ? JSON.parse(localSongsIdStr) : null,
			mediaListIds = localSongsArr || [],
			mediaList = localSongsArr ? (function() {
				var i = 0,
					l = localSongsArr.length,
					arr = [];
				while (i < l) {
					arr.push({
						srcs: [
							mediaPath + localSongsArr[i] + '.mp3',
							mediaPath + localSongsArr[i] + '.ogg'
						],
						types: [
							'audio/mpeg',
							'audio/ogg'
						]
					});
					i++;
				};
				return arr;
			})() : [],
			player = new MediaPlayer({
				$playerWrapper: $body,
				settings: {
					autoPlay: false,
					controls: false,
					preload: 'auto',
					playMode: 'loop-all'
				},
				sources: mediaList,
				runPlayCommond: function(index, e) {
					playPannel.runPlayCommond(index, e);
				},
				playPaused: function(pauseIndex, e) {
					playPannel.playPaused(pauseIndex, e);
				},
				buffering: function(bufferedObjArr, duration, bufferedBytes, totalBytes, bufferingRate, index, e) {
					playPannel.buffering(bufferedObjArr, duration, bufferedBytes, totalBytes, bufferingRate, index, e);
				},
				volumeUpdate: function(volume, index, e) {
					playPannel.volumeUpdate(volume, index, e);
				},
				timeUpdate: function(currentTime, duration, playedTimeRanges, index, e) {
					playPannel.timeUpdate(currentTime, duration, playedTimeRanges, index, e);
				},
				playChange: function(oldIndex,newIndex) {
					playPannel.playChange(oldIndex,newIndex);
				},
				waitingBuffer: function(index, e) {
					playPannel.waitingBuffer(index, e);
				},
				waitingBufferEnd: function(index, e) {
					playPannel.waitingBufferEnd(index, e);
				},
				error: function(errorInfo, e) {
					console.log(errorInfo);
				}
			}),
			addIdSong = function(songId) {
				var index = mediaListIds.indexOf(songId);
				if (index == -1) {
					mediaListIds.push(songId);
					mediaList.push({
						srcs: [
							mediaPath + songId + '.mp3',
							mediaPath + songId + '.ogg'
						],
						types: [
							'audio/mpeg',
							'audio/ogg'
						]
					});
					player.update({
						sources: mediaList
					});
					localStorage.setItem('addedSongsIdJson', JSON.stringify(mediaListIds));
					return {
						index: mediaList.length - 1,
						added: false
					};
				} else {
					return {
						index: index,
						added: true
					};
				};
			},
			removeIdSong = function(songId) {
				var index = mediaListIds.indexOf(songId),
					playing = player.playing,
					playingIndex = player.playingIndex;

				index === playingIndex ? player.stop() : '';

				mediaList.splice(index, 1);
				mediaListIds.splice(index, 1);
				player.update({
					sources: mediaList,
					playingIndex: index < playingIndex ? playingIndex - 1 : playingIndex
				});

				localStorage.setItem('addedSongsIdJson', JSON.stringify(mediaListIds));

				mediaList.length && index == playingIndex && playing ? player.playIndex(index) : '';

				!mediaList.length ? console.log('all songs removed') : '';

			},
			playIdSong = function(songId) {
				var add = addIdSong(songId),
					index = add.index,
					added = add.added,
					success = true;
				if (index === player.playingIndex) {
					success = player.play();
				} else {
					success = player.playIndex(index);
				};
				return {
					success: success,
					index: index,
					added: added
				};
			};

		return {
			playIdSong: function(songId) {
				return playIdSong(songId);
			},
			addIdSong: function(songId) {
				return addIdSong(songId);
			},
			removeIdSong: function(songId) {
				removeIdSong(songId);
			},
			pause: function() {
				player.pause();
			},
			playNext: function() {
				return player.playNext();
			},
			playPrev: function() {
				return player.playPrev();
			},
			playToggle: function() {
				if (!player.playing) {
					return player.play();
				} else {
					player.pause();
					return true;
				};
			},
			setPlayPercent: function(percent) {
				player.setPlayPercent(percent);
			},
			setVolume: function(v) {
				player.setVolume(v);
			},
			updatePageLevelFunctions: function(options) {
				var markPlayingSong = options.markPlayingSong,
					removeMarkPlayingSong = options.removeMarkPlayingSong,
					markWaitingSong = options.markWaitingSong,
					removeMarkWaitingSong = options.removeMarkWaitingSong,

					newRunPlayCommond = (typeof markPlayingSong != 'undefined') ? function(playIndex, e) {
						playPannel.runPlayCommond(playIndex, e);
						markPlayingSong && markPlayingSong(mediaListIds[playIndex], e);
					} : '',
					newPlayPaused = (typeof removeMarkPlayingSong != 'undefined') ? function(index, e) {
						playPannel.playPaused(index, e);
						removeMarkPlayingSong && removeMarkPlayingSong(mediaListIds[index], e);
					} : '',
					newWaitingBuffer = (typeof markWaitingSong != 'undefined') ? function(index, e) {
						playPannel.waitingBuffer(index, e);
						markWaitingSong && markWaitingSong(mediaListIds[index], e);
					} : '',
					newWaitingBufferEnd = (typeof removeMarkWaitingSong != 'undefined') ? function(index, e) {
						playPannel.waitingBufferEnd(index, e);
						removeMarkWaitingSong && removeMarkWaitingSong(mediaListIds[index], e);
					} : '';


				player.update({
					runPlayCommond: newRunPlayCommond,
					playPaused: newPlayPaused,
					waitingBuffer: newWaitingBuffer,
					waitingBufferEnd: newWaitingBufferEnd
				});

			},
			updatePlayMode: function(playMode) {
				var playMode = playMode || 'loop-all',
					settings = player.settings;
				settings.playMode = playMode;
				player.update({
					settings: settings
				});
			},
			getPlayingStatus: function() {
				return {
					playing: player.playing,
					waiting: player.waiting,
					songId: mediaListIds[player.playingIndex || 0]
				}
			},
			getAddedSongsId: function() {
				return mediaListIds;
			}
		};
	})();

	// background
	var background = (function() {
		// create slider
		var $backgrounds = $body.querySelectorAll('.background:nth-of-type(1) li'),
			backgrounds = Array.prototype.slice.call($backgrounds, 0, $backgrounds.length),
			slider = new Slider({
				// number,not required,default 0
				minTimer: 1200,
				// number,not required,default not autoPlay
				autoPlayTimer: 5000,
				// boolean,not required,default not loop
				loop: true,
				//jquery dom obj,required
				$sliders: backgrounds,
				//function,required	
				callback: function($prevSlider, $showSlider, $nextSlider, showIndex, totalIndex, $prevShowSlider) {
					$showSlider.classList.add('show');
					$prevShowSlider && $prevShowSlider.classList.remove('show');
				}
			});

		return {
			showBlurBack: function() {
				$body.classList.remove('showStaticBack');
				$body.classList.add('preShowBlurBack');
				$body.classList.add('preHideBack');
				setTimeout(function() {
					$body.classList.add('showBlurBack');
					setTimeout(function() {
						$body.classList.add('hideNoBlurBack');
						$body.classList.remove('preShowStaticBack');
						$body.classList.add('hideBack');
					}, 1000);
				}, 10);
			},
			showNoBlurBack: function() {
				$body.classList.remove('showStaticBack');
				$body.classList.remove('hideNoBlurBack');
				$body.classList.remove('showBlurBack');
				$body.classList.remove('hideBack');
				setTimeout(function() {
					$body.classList.remove('preHideBack');
					setTimeout(function() {
						$body.classList.remove('preShowBlurBack');
						$body.classList.remove('preShowStaticBack');
					}, 1000);
				}, 10);

			},

			showStaticBack: function() {
				$body.classList.add('preShowStaticBack');
				$body.classList.add('preShowBlurBack');
				$body.classList.add('preHideBack');
				setTimeout(function() {
					$body.classList.add('showBlurBack');
					$body.classList.add('showStaticBack');
					$body.classList.add('hideBack');
					setTimeout(function() {
						$body.classList.add('hideNoBlurBack');
					}, 1000);
				}, 10);
			},
			showIndex: function(index) {
				slider.startIndex(index);
			},
			showNext: function() {
				slider.showNext();
			},
			showPrev: function() {
				slider.showPrev();
			},
			update: function(options) {
				slider.update(options);
			},
			start: function() {
				slider.start();
			}
		};
	})();



	// homepage
	var homePage = (function() {
		var $home = null,
			$homeSongs = null,
			homeSongs = null,
			slider = null,
			preventScroll = null,
			swipeFunction = null,
			loadAbout = null,
			showIndexSlider = null,
			$moreInfo = null,
			$sliderIndex = null,
			$sliderIndexes = null;

		return {
			install: function() {

				// create slider
				$home = $doc.querySelector('#home');
				$sliderIndex = $doc.querySelector('.sliderIndex');
				$sliderIndexes = $sliderIndex.querySelectorAll('span');
				$moreInfo = $home.querySelector('.homeInfo a');
				$homeSongs = $home.querySelectorAll('li');
				homeSongs = Array.prototype.slice.call($homeSongs, 0, $homeSongs.length);
				slider = new Slider({
					// number,not required,default 0
					minTimer: 1200,
					// number,not required,default not autoPlay
					autoPlayTimer: 5000,
					// boolean,not required,default not loop
					loop: true,
					//jquery dom obj,required
					$sliders: homeSongs,
					//function,required	
					callback: function($prevSlider, $showSlider, $nextSlider, showIndex, totalIndex, $prevShowSlider, prevShowIndex) {
						$showSlider.classList.add('preShow');
						$prevShowSlider && $prevShowSlider.classList.remove('show');
						setTimeout(function() {
							$showSlider.classList.add('show');
							$sliderIndexes && $sliderIndexes[showIndex].classList.add('show');
							($sliderIndexes && !isNaN(prevShowIndex)) && $sliderIndexes[prevShowIndex].classList.remove('show');
							setTimeout(function() {
								$prevShowSlider && $prevShowSlider.classList.remove('preShow');
							}, 1000);
						}, 100);

					}
				});

				preventScroll = function(e) {
					if ($home) {
						e.stopPropagation();
						e.preventDefault();
					};
				};
				swipeFunction = function(leftRight, upDown, xDisAbs, yDisAbs, swipeStartE, swipeEndE) {
					if (leftRight == 'right') {
						slider.showPrev();
						background.showPrev();
					} else {
						slider.showNext();
						background.showNext();
					};
				};

				showIndexSlider = function(e) {
					var target = e.target;
					if (target.isInTarget('.sliderIndex span')) {
						target.tagName.toLowerCase() == 'i' ? target = target.parentNode : '';
						var index = target.getIndex();
						background.showIndex(index);
						slider.startIndex(index);
					};
				};

				loadAbout = function(e) {
					e.preventDefault();
					loadPageXhr('about');
				};


				$body.classList.add('homePage');
				$doc.addEventListener('touchmove', preventScroll);
				$home.addTouchEventListener('swipe', swipeFunction);
				$sliderIndex.addEventListener('click', showIndexSlider);
				$moreInfo.addEventListener('touchstart', loadAbout);
				$moreInfo.addEventListener('click', loadAbout);



				background.showIndex(0);

				slider.start();
				background.showNoBlurBack();

				playPannel.show();
				commonPlayControl.install();

			},
			uninstall: function() {
				commonPlayControl.uninstall();

				if ($home) {
					$body.classList.remove('homePage');
					$doc.removeEventListener('touchmove', preventScroll);
					$home.removeTouchEventListener('swipe', swipeFunction);
					$sliderIndex.removeEventListener('click', showIndexSlider);
					$moreInfo.removeEventListener('touchstart', loadAbout);
					$moreInfo.removeEventListener('click', loadAbout);

					$home = null;
					$sliderIndex = null;
					$sliderIndexes = null;
					$homeSongs = null;
					$homeInfo = null;
					homeSongs = null;
					loadAbout = null,
						showIndexSlider = null,
						slider ? slider.remove() : '';
					slider = null;
					songId = '';
					preventScroll = null;
					// mediaPlayer.updatePageLevelFunctions({
					// 	runPlayCommond: null,
					// 	playStart: null
					// });
				};
			}
		};
	})();

	// bookpage
	var booksPage = (function() {
		return {
			install: function() {
				playPannel.show();
				background.showBlurBack();
				window.picturefill && window.picturefill();
			}
		};
	})();

	// albumspage
	var albumsPage = (function() {
		return {
			install: function() {
				playPannel.show();
				background.showBlurBack();
				window.picturefill && window.picturefill();

			}
		};
	})();

	// songs page
	var songsPage = (function() {

		var $playListAdded = null,
			$playListNotAdded = null,
			fillSongs = null;

		return {
			install: function() {
				$body.classList.add('songsPage');
				$playListAdded = $doc.querySelector('#songs .playList .added');
				$playListNotAdded = $doc.querySelector('#songs .playList .notAdded');
				fillSongs = function() {
					var addedSongsIds = mediaPlayer.getAddedSongsId(),
						allSongsInfo = songsPage.allSongsInfo,
						allSongsIds = songsPage.allSongsIds,
						addedSongs = [],
						notAddedSongs = null,
						tempAddSong = null,
						index = 0,
						i = 0,
						l = addedSongsIds.length;
					while (i < l) {
						index = songsPage.allSongsIds.indexOf(addedSongsIds[i]);
						tempAddSong = allSongsInfo.splice(index, 1)[0];
						allSongsIds.splice(index, 1);
						addedSongs.push(tempAddSong);
						i++;
					};
					notAddedSongs = allSongsInfo;

					var addedStr = '',
						notAddedStr = '',
						j = 0,
						jL = addedSongs.length,
						k = 0,
						kL = notAddedSongs.length;
					while (j < jL) {
						addedStr += [
							'<li data-songid="' + addedSongs[j].id + '" class="added" title="' + addedSongs[j].name + '">',
							'<div class="playPause"><i class="icon-play"></i></div>',
							'<div class="songInfo"><p>' + addedSongs[j].name + '</p><time>' + addedSongs[j].duration + '</time></div>',
							'<div class="addRemove"><i class="icon-add"></i></div>',
							'</li>'
						].join('');
						j++;
					};
					while (k < kL) {
						notAddedStr += [
							'<li data-songid="' + notAddedSongs[k].id + '" title="' + notAddedSongs[k].name + '">',
							'<div class="playPause"><i class="icon-play"></i></div>',
							'<div class="songInfo"><p>' + notAddedSongs[k].name + '</p><time>' + notAddedSongs[k].duration + '</time></div>',
							'<div class="addRemove"><i class="icon-add"></i></div>',
							'</li>'
						].join('');
						k++;
					};

					addedStr ? $playListAdded.innerHTML = addedStr : '';
					notAddedStr ? $playListNotAdded.innerHTML = notAddedStr : '';
				};
				fillSongs();
				$body.classList.add('cutContent');
				playPannel.show();
				background.showBlurBack();
				commonPlayControl.updatePageLevelFunctions({
					addSongRender: function($selector) {
						$selector.classList.add('added');
						$playListAdded.appendChild($selector);
					},
					removeSongRender: function($selector) {
						$selector.classList.remove('added');
						$playListNotAdded.insertBefore($selector, $playListNotAdded.querySelector('li'));
					}
				});
				commonPlayControl.install();
				// mediaPlayer.updatePageLevelFunctions({
				// 	runPlayCommond: function(playingIndex, e) {
				// 		var $target=$playListAdded.querySelector('li:nth-of-type(' + (playingIndex + 1) + ')');
				// 		console.log($target.offsetTop-$songs.clientHeight/2);

				// 		$songs.scrollTop=$target.offsetTop-$songs.clientHeight/2;
				// 	}
				// });
			},
			uninstall: function() {
				$body.classList.remove('songsPage');
				$playListAdded = null;
				$playListNotAdded = null;
				fillSongs = null;

				$body.classList.remove('cutContent');

				commonPlayControl.updatePageLevelFunctions({
					addSongRender: null,
					removeSongRender: null
				});
				// mediaPlayer.updatePageLevelFunctions({
				// 	runPlayCommond:null
				// });
				commonPlayControl.uninstall();
				delete songsPage.allSongsInfo;
				delete songsPage.allSongsIds;

			}
		};
	})();

	var aboutPage = (function() {

		return {
			install: function() {
				playPannel.show();
				background.showStaticBack();
			}
		};
	})();



	// load page function
	var loadPageXhr = (function() {
		var
			items = {
				home: $doc.querySelector('#nav ul li[data-loadsource="home"]'),
				songs: $doc.querySelector('#nav ul li[data-loadsource="songs"]'),
				books: $doc.querySelector('#nav ul li[data-loadsource="books"]'),
				albums: $doc.querySelector('#nav ul li[data-loadsource="albums"]'),
				// contact: $doc.querySelector('#nav ul li[data-loadsource="contact"]'),
				about: $doc.querySelector('#nav ul li[data-loadsource="about"]')
			},
			itemLoadingLines = (function() {
				var i = '',
					obj = {};
				for (i in items) {
					obj[i] = items[i].querySelector('div');
				};
				return obj;
			})(),
			executeScript = function(responseText) {
				var regDetectJs = /<script(.|\n)*?>(.|\n|\r\n)*?<\/script>/ig;
				var jsContained = responseText.match(regDetectJs);
				if (jsContained) {
					var regGetJS = /<script(.|\n)*?>((.|\n|\r\n)*)?<\/script>/im;
					var jsNums = jsContained.length;
					for (var i = 0; i < jsNums; i++) {
						var jsSection = jsContained[i].match(regGetJS);
						if (jsSection[2]) {
							if (window.execScript) {
								window.execScript(jsSection[2]);
							} else {
								window.eval(jsSection[2]);
							};
						};
					};
				};
			},
			isIosSafari=navigator.userAgent.search(/Safari/i)!=-1 && navigator.userAgent.search(/iPhone/i)!=-1,
			fillContent = function(content, callback) {
				$body.classList.add('hideContent');
				setTimeout(function() {
					$contentWrapper.scrollTop = 0;
					$contentWrapper.innerHTML = content;
					executeScript(content);
					callback && callback();
					if(isIosSafari){
						$body.classList.add('hidePlayList');//safari fix
						setTimeout(function() {
							win.scrollTo(0, 1);
							$body.classList.remove('hidePlayList');//safari fix
							setTimeout(function(){//safari fix
								$body.classList.remove('hideContent');
							},10)//safari fix
						}, 500);
					}else{
						setTimeout(function(){
							win.scrollTo(0, 1);
							$body.classList.remove('hideContent');
						},500)						
					};
				}, 600);
			},
			targetPage = '',
			xhrMark = false,
			backStarted = false,
			xhrObject = new Xhr({
				url: 'html/home.html',
				cache: false,
				start: function() {
					xhrMark = true;
					items[targetPage].classList.add('selected');
					itemLoadingLines[targetPage].prefixCss({
						'-vendor-transform': Modernizr.csstransforms3d ? 'translateX(95%) translateZ(0)' : 'translateX(95%)'
					});
				},
				success: function(response, responseText, xhr, event) {
					// console.log(xhr);
					var i = 0;
					for (i in items) {
						if (i != targetPage) {
							items[i].classList.remove('selected');
							itemLoadingLines[i].prefixCss({
								'-vendor-transform': Modernizr.csstransforms3d ? 'translateX(110%) translateZ(0)' : 'translateX(110%)'
							});
						};
					};
							itemLoadingLines[targetPage].prefixCss({
								'-vendor-transform':Modernizr.csstransforms3d ? ('translateX(0) translateZ(0)') : ('translateX(0)')
							});
					homePage.uninstall();
					songsPage.uninstall();

					fillContent(response || responseText, function() {
						switch (targetPage) {
							case 'home':
								homePage.install();
								backStarted = false;
								break;
							case 'books':
								booksPage.install();
								break;
							case 'albums':
								albumsPage.install();
								break;
							case 'songs':
								songsPage.install();
								break;
							case 'about':
								aboutPage.install();
							default:
								;
						};

						if (!backStarted) {
							background.start();
							backStarted = true;
						};
					});
					try {
						history.pushState({
							page: targetPage
						}, targetPage, targetPage);

					} catch (err) {
						console.log(err);
						console.log('history pushstate not supported')
					};

				},
				progress: function(loadedBytes, totalBytes, xhr, event) {
					// console.log(xhr);
					var percent = 100 - loadedBytes / totalBytes * 100;
					if (percent < 95) {
						itemLoadingLines[targetPage].prefixCss({
							'-vendor-transform':Modernizr.csstransforms3d ? ('translateX(' + percent + '%) translateZ(0)') : ('translateX(' + percent + '%)')
						});
					};
				},
				fail: function(xhr, event) {
					alert('load failed,try later');
					targetPage='';
					items[targetPage].classList.remove('selected');
					itemLoadingLines[targetPage].removeAttribute('style');
					// fillContent('<h6>load failed, try later.</h6>');
					// console.log(xhr);
				},
				always: function(xhr, event) {
					// console.log(xhr);
					xhrMark = false;
					setTimeout(function() {
						$body.classList.remove('showMenu');
					}, 300);
				}
			}),
			bindPopState = function() {
				try {
					window.addEventListener('popstate', function(e) {
						var state = history.state || e.state,
							page = state.page;
						loadPageXhr(page);
					});

				} catch (err) {
					console.log(err);
					console.log('popstate not supported');
				};

			};

		bindPopState();

		return function(page) {
			var page = page || 'home';
			if (page != targetPage) {
				targetPage = page || 'home';
				xhrMark ? xhr.abort() : '';
				xhrObject.update({
					url: 'html/' + targetPage + '.html'
				});
				xhrObject.send();
			};

		};
	})();


		var checkClient=(function(){
			return {
				system:{
					isAndroid:function(){
						if(/Android (\d+.\d+)/.test(navigator.userAgent)){
							return parseFloat(RegExp.$1);	
						};
					}
				},
				browser:{}
			};
		})();

		obj.songsPage=songsPage;
		obj.init=function() {
			var android=checkClient.system.isAndroid();
			if(android){
				if(android<4.0){
					location.href='html/updateBrowser.html';
				}else{
				$body.classList.add('no-cssmask');
				$body.classList.add('fuckingAndroid');

				};
			};
			var path=location.pathname.replace(/\//g,'');
			if(path!='home' && path!='about' && path!='songs' && path!='albums' && path!='books'){
				path='home';
			};
			loadPageXhr(path);
			// loadPageXhr(location.pathname.replace('/', '') || 'home');
		};
})(LC,window,undefined);

LC.init();