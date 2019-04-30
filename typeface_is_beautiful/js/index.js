var TF = window.TF || {};

TF.imgPath='img';
TF.init=function() {
	var OnloadTimer = (function() {
		var _ObjPrivate = (function() {
			return {
				setPara: function(options) {
					!isNaN(options.timer) ? this.timer = options.timer : '';
					options.callback ? this.callback = options.callback : '';
				},
				execCallback: function() {
					this._execedMark = true;
					this.callback && this.callback(this._status);
				}
			} 
		})();
		var Obj = function(options) {
			if (this instanceof Obj) {
				this._execedMark = false;
				this._status = 'loading';
				this._onloadObj = options.onloadObj;
				_ObjPrivate.setPara.call(this, options);
			} else {
				return new Obj(options);
			};
		};
		Obj.prototype = {
			constructor: Obj,
			init: function() {
				var obj = this,
					triggerOnload=function(){
							obj._status = 'loaded';
							clearTimeout(obj._timerMark);
							_ObjPrivate.execCallback.call(obj);
						};
				this._execedMark = false;
				this._status = 'loading';
				'onreadystatechange' in this._onloadObj ? 
				this._onloadObj.onreadystatechange = function() {
					if (!obj._execedMark) {
						obj._onloadObj.readyState=='complete' ? triggerOnload() : '';
					};
				} : 
				this._onloadObj.onload=function(){
					if(!obj._execedMark){
						triggerOnload();
					};
				};
				this._timerMark = setTimeout(function() {
					if (!obj._execedMark) {
						obj._status = 'not loaded in timer';
						_ObjPrivate.execCallback.call(obj);
					};
				}, this.timer);
				obj._onloadObj.readyState=='complete' ? triggerOnload() : '';
			},
			update: function(options) {
				_ObjPrivate.setPara.call(this, options);
			},
			remove: function() {
				this._onloadObj.onreadystatechange = null;
				this._onloadObj.onload = null;
				for (var i in this) {
					delete this[i];
				};
			}
		};
		return Obj;
	})();
	// main slider
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
			start: function() {
				var obj = this,
					prevIndex = _minusIndex(this).index,
					nextIndex = _plusIndex(this).index,
					$showSlider = this.$sliders[this.showIndex];
				$prevSlider = (prevIndex == this.showIndex) ? null : this.$sliders[prevIndex],
					$nextSlider = (nextIndex == this.showIndex) ? null : this.$sliders[nextIndex];
				this.callback($prevSlider, $showSlider, $nextSlider, this.showIndex, this._sliderLength - 1);

				if (this._autoPlay) {
					_setPlayingTimer(this, function() {
						obj._playState = setTimeout(function() {
							obj.showNext();
						}, obj.autoPlayTimer - obj.minTimer);
					});
				} else {
					_setPlayingTimer(this);
				};
			},
			showNext: function() {
				if (!this._playing) {
					var result = _plusIndex(this);
					this.showIndex = result.index;
					if (result.exec) {
						this.stop();
						this.start();
					} else {
						_setPlayingTimer(this);
						this.noNextDo && this.noNextDo(this.$sliders[this.showIndex]);
					};
				};
			},
			showPrev: function() {
				if (!this._playing) {
					var result = _minusIndex(this);
					this.showIndex = result.index;
					if (result.exec) {
						this.stop();
						this.start();
					} else {
						_setPlayingTimer(this);
						this.noPrevDo && this.noPrevDo(this.$sliders[this.showIndex]);
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

	var	prefixCss=function(rule,value){
		var vendors=['-webkit-','-khtml-','-moz-','-ms-','-o-'],
			i=0,
			styleObj={};
		while(i<vendors.length){
			styleObj[vendors[i]+rule]=value;
			i++;
		};
			styleObj[rule]=value;
		this.css(styleObj);
	};

	var $body = $('body'),
		doc=document,
		$doc=$(doc);

	

	var preventBodyScroll=function(){
		('ontouchmove' in doc) ? doc.addEventListener('touchmove',function(e){
			var targetTag=e.target.tagName.toLowerCase();
			if(targetTag=='body' || targetTag=='html'){
				e.preventDefault();
			};
		}) : '';
	};

	var mainSliderEffect = (function() {

		var mainSlider = (function() {

			var loadTypeface = (function() {
				var $main = $('#main'),
					loadComplete = function() {
						info.timerInfo('All pages loaded!');
					},
					beforeSend = function() {
						info.show('Loading more ...');
					},
					success = function(html, $markSlider) {
						$main.append(html);
						$markSlider.addClass('loadedMark');
						var oldLength=slider.$sliders.length-1;
						$sliders = $('.typeface');
						slider.update({
							$sliders: $sliders
						});
						TF.noInlineSvg && TF.noInlineSvg();
						var newLength=slider.$sliders.length-1,
							loadedPage=newLength-oldLength;
						info.timerInfo(loadedPage+' more pages loaded.');
						updatePageIndex(null,newLength);
					},
					error = function() {
						info.timerInfo('load failed, try later.');
					},
					load = (function() {
						var loading = false,
							ajaxing = null,
							page = 0,
							totalPage = 1,
							ajax = function($markSlider) {
								if (!loading) {
									loading = true;
									if (page <= totalPage) {
										ajaxing ? ajaxing.abort() : '';
										ajaxing = $.ajax({
											url: 'html/page/' + page + '.html',
											beforeSend: beforeSend,
											success: function(html) {
												success(html, $markSlider);
												page++;
												page > totalPage ? page = totalPage + 1 : '';
											},
											error: error,
											complete: function() {
												loading = false;
												ajaxing = null;
											}
										});
									} else {
										loadComplete();
									};
								};
							};
						return ajax;
					})();
				return load;
			})();

			var info=(function(){
				var $info=$('#info'),
					$infoText=$info.children('p'),
					timerMark=false,
					showing=null,
					hiding=null,
					timer=5000,
					timerGap=4000,
					fillInfo=function(text){
						$infoText.text(text);
					},
					showInfo=function(){
						$info.addClass('show');
						timerMark=true;
						clearTimeout(showing);
						showing=setTimeout(function(){
							timerMark=false;
						},timerGap);
					},
					hideInfo=function(){
						if(timerMark){
							clearTimeout(hiding);
							hiding=setTimeout(function(){
								hideInfo();
							},timerGap);
						}else{
							$info.removeClass('show');
						};
					},
					timerInfo=function(){
						showInfo();
						setTimeout(function(){
							hideInfo();
						},timer);
					};
				return {
					show:function(text){
						text ? fillInfo(text) : '';
						showInfo();
					},
					hide:hideInfo,
					timerInfo:function(text){
						text ? fillInfo(text) : '';
						timerInfo();
					}
				};	
			})();

			var updatePageIndex = (function() {
				var $currentPage = $('#currentPage'),
					$totalPage = $('#totalPage');
				return function(currentPage, totalPage) {
					currentPage ? $currentPage.text(currentPage) : '';
					$totalPage ? $totalPage.text(totalPage) : '';
				};
			})();

			var setTransformOrigin=function($slider){
				var $fill=$slider.find('.fill'),
					$shadow=$slider.find('.shadow'),
					origin=$fill.attr('data-transform-origin');
				if(origin){
					prefixCss.call($fill,'transform-origin',origin);
					prefixCss.call($shadow,'transform-origin',origin);
					$fill.removeAttr('data-transform-origin');
				};	
			};

			var $sliders = $('.typeface'),
				slider = new Slider({
					minTimer: 1200,
					// loop:true,
					// autoPlayTimer:1100,
					$sliders: $sliders,
					callback: function($prevSlider, $showSlider, $nextSlider, showIndex, totalIndex) {
						$($showSlider).addClass('prevShow');
						setTransformOrigin($($showSlider));
						TF.svgSizeFix && TF.svgSizeFix($($showSlider));
						setTimeout(function() {
							$prevSlider ? $($prevSlider).addClass('up').removeClass('down').removeClass('show') : '';
							$nextSlider ? $($nextSlider).addClass('down').removeClass('up').removeClass('show') : '';
							$($showSlider).addClass('show').removeClass('up').removeClass('down');
							if (showIndex == 1) {
								$body.addClass('showFonts');
							} else if (showIndex == 0) {
								$body.removeClass('showFonts');
							} else if (showIndex == totalIndex - 5) {
								!$($showSlider).hasClass('loadedMark') ? loadTypeface($($showSlider)) : '';
							};

							setTimeout(function() {
								$nextSlider ? $($nextSlider).removeClass('prevShow') : '';
								$prevSlider ? $($prevSlider).removeClass('prevShow') : '';
							}, 1000);
							showIndex != 0 ? updatePageIndex(showIndex, totalIndex) : '';
						}, 100);
					},
					noNextDo: function($last) {
						$($last).addClass('last');
						setTimeout(function() {
							$($last).removeClass('last');
						}, 1000);
						info.timerInfo('More beautiful typefaces coming soon!');
						console.log('last one already showing');
					},
					noPrevDo: function($first) {
						$($first).addClass('first');
						setTimeout(function() {
							$($first).removeClass('first');
						}, 1000);
						console.log('first one already showing');
					}
				});
			return slider;

		})();

		var backSlider = (function() {
			var $backgrounds = $('#background .layer'),
				backgroundSlider = new Slider({
					$sliders: $backgrounds,
					loop: true,
					minTimer: 1600,
					callback: function($prevSlider, $showSlider, $nextSlider, showIndex, totalIndex) {
						$($showSlider).addClass('prevShow');
						setTimeout(function() {
							$($showSlider).addClass('show');
							$($prevSlider).removeClass('show');
							setTimeout(function() {
								$($prevSlider).removeClass('prevShow');
							}, 1500);
						}, 100);
					}
				});
			return backgroundSlider;
		})();

		var bindSliderEvents = function() {
			var startY = 0,
				endY = 0,
				distance = 0,
				slideAble = true;

			preventBodyScroll();

			$body
				.on('touchstart', '.typeface', function(e) {
					e.stopPropagation();
					startY = e.touches[0].pageY;
					endY = startY;
					slideAble = true;
				})
				.on('touchmove', '.typeface', function(e) {
					e.preventDefault();
					e.stopPropagation();
					if (slideAble) {
						endY = e.touches[0].pageY;
						distance = endY - startY;
						if (Math.abs(distance) >= 20) {
							slideAble = false;
							distance < 0 ? mainSlider.showNext() : mainSlider.showPrev();
							backSlider.showNext();
						};
					};
				})
				.on('touchstart', '.typeface .download', function(e) {
					e.stopPropagation();
				})
				.on('mousewheel DOMMouseScroll', '#main', function(event) {
					window.jQuery ? event=event.originalEvent : '';
					if (slideAble) {
						var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
						delta < 0 ? mainSlider.showNext() : mainSlider.showPrev();
						backSlider.showNext();
					};
				})
				.on('keydown', function(e) {
					if (!$body.hasClass('showMenu')) {
						if (e.keyCode == 40) {
							mainSlider.showNext();
							backSlider.showNext();
						} else if (e.keyCode == 38) {
							mainSlider.showPrev();
							backSlider.showNext();
						};
					};
				});
		};


		return {
			bindEvents: bindSliderEvents,
			start: function() {
				mainSlider.start();
				backSlider.start();
			}
		};
	})();


	var menuFunc = (function() {
		var $menu = $('#menu'),


			toggleMenu = (function(e) {
				var toggleMenuEffect = function() {
						$body.toggleClass('showMenu');
					},
					bindClickToggleMenu = function() {
						$body.on('click.toggleMenu', '#menuTrigger', toggleMenuEffect);
					};
				bindEvents = function() {
					$body.on('touchstart', '#menuTrigger', function() {
						$body.off('click.toggleMenu');
						toggleMenuEffect();
						$body.one('click', bindClickToggleMenu);
					});
					bindClickToggleMenu();
				};
				return {
					bindEvents: bindEvents
				};
			})(),

			toggleMenuItem = (function() {
				var $items = $menu.find('.item'),

					toggleMenuItemEffect = function($eventTarget) {
						$items.removeClass('show');
						$eventTarget.addClass('show');
					},
					bindClickToggleMenuItem = function() {
						$body.on('click.toggleMenuItem', '#nav .item', function() {
							toggleMenuItemEffect($(this));
						});
					},
					bindEvents = function() {
						$body.on('touchstart', '#nav .item', function(e) {
							// e.preventDefault();
							e.stopPropagation();
							$body.off('click.toggleMenuItem');
							toggleMenuItemEffect($(this));
							$body.one('click', bindClickToggleMenuItem);
						});
						bindClickToggleMenuItem();
					};
				return {
					bindEvents: bindEvents
				};
			})(),

			menuScroll = (function() {
				var menu = $menu.get(0),
					body = $body.get(0),
					bindEvents = function() {
						$body
							.on('touchstart', '#menu', function(e) {
								e.stopPropagation();
							})
							.on('touchmove', '#menu', function(e) {
								e.stopPropagation();
							})
							.on('mousewheel DOMMouseScroll', '#menu', function(e) {
								e.stopPropagation();
							});
					};

				return {
					bindEvents: bindEvents
				};
			})();

		return {
			bindEvents: function() {
				toggleMenu.bindEvents();
				toggleMenuItem.bindEvents();
				menuScroll.bindEvents();
			}
		};
	})();
	return function() {
			mainSliderEffect.bindEvents();
			menuFunc.bindEvents();
			TF.shareInit();
			if(TF.checkClient.system.isAndroid() < 4.4){
				$('html').addClass('noSvgStrokeAni');
				alert('android device below version 4.4');
			};

			var onloadTimer = new OnloadTimer({
				onloadObj: document,
				timer: 3000,
				callback: function(status) {
					mainSliderEffect.start();
					onloadTimer.remove();
					onloadTimer = null;
				}
			});

			onloadTimer.init();
		};
};

TF.shareInit=function(){
	var win=window,
		$body=$('body'),
		url=location.origin+'/typeface_is_beautiful',
		description='Typeface is beautiful - A collection of the most beautiful typefaces all over the world.',
		imgUrl=location.origin+'/typeface_is_beautiful/'+TF.imgPath+'/shareCover.png',
		imgWidth=600,
		imgHeight=1000;
		bindShare=(function(){
			var	pinterestShare=(function(){
						var calcGuid=function(){
							var guid='';
							for(var i=0;i<12;i++){
								guid+="0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz".substr(Math.floor(60 * Math.random()), 1);
							};
							guid+='-1';
							return guid;
						};
						return function(url,imgUrl,description){
							var shareUrl='https://www.pinterest.com/pin/create/button/?guid='+calcGuid()+'&url='+url+'&media='+imgUrl+'&description='+description,
								windowName='';							
							window.open(shareUrl,windowName);	
						};	
				})(),
				facebookShare=(function(){
					return function(url){
						var shareUrl='https://www.facebook.com/sharer/sharer.php?u='+url+'&display=popup&ref=plugin',
							windowName='';
						window.open(shareUrl,windowName);	
					};
				})(),
				huabanShare=function(url,imgUrl,description,imgWidth,imgHeight){
						var shareUrl='http://huaban.com/bookmarklet/?media='+imgUrl+'&w='+imgWidth+'&h='+imgHeight+'&description='+description+'&url='+url+'&via=3&md='+url,
							windowName='';
						window.open(shareUrl,windowName);
					},
				weiboShare=function(url,imgUrl,description){
					var shareUrl='http://service.weibo.com/share/share.php?url='+url+'&appkey=2499394483&pic='+imgUrl+'&title='+description,
						windowName='';
					window.open(shareUrl,windowName);	
				};

				return function(){
						$body.on('click','#social li:not(.email)',function(){
							var $this=$(this);
							switch ($this.attr('class')) {
								case 'pinterest':
								pinterestShare(url,imgUrl,description);
								break;
								case 'facebook':
								facebookShare(url,imgUrl,description);
								break;
								case 'huaban':
								huabanShare(url,imgUrl,description,imgWidth,imgHeight);
								break;
								case 'weibo':
								weiboShare(url,imgUrl,description);
							};	
						});
					};	

			})();

			bindShare();
};

TF.checkClient=(function(){
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
