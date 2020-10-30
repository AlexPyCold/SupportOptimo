;(function()
{
    var showPopup = function (params)
    {
        var popup = BX.PopupWindowManager.create(params.id, null, {
            autoHide: true,
            cacheable: false,
            closeByEsc: true,
            closeIcon: true,
            className: "popup-form",
            content: params.content,
            contentColor: 'white',
            compatibleMode: false,
            offsetLeft: 0,
            offsetTop: 0,
            overlay : true,
            titleBar: params.title != undefined > 0 ? params.title : false,
            events: {
                onAfterPopupShow: function(popup) {
                    // BX.removeClass(popup.popupContainer, 'popup-window');
                    BX.addClass(popup.contentContainer, '');
                    BX.addClass(popup.titleBar, 'popup__title');
                    // BX.removeClass(popup.contentContainer, 'popup-window-content');

                }
            }
        });
        
        popup.show();
    };

    var onReady = function()
    {
        BX.bindDelegate(
            document, 'click', { attribute: 'data-popup' },
            function(e)
            {
                console.log('click');
                e.preventDefault();

                if (this.getAttribute('data-type') == 'ajax')
                {
                    var url = this.getAttribute('data-src') || this.href;
                    var popupId = this.getAttribute('data-popup') || this.id;
                    var title = this.getAttribute('data-title'); //  || this.innerText;
          
                    var tmp = document.createElement('div');
                    tmp.innerHTML = title;
                    if (BX.type.isDomNode(tmp.firstChild))
                    {
                        title = {
                            content: tmp.firstChild,
                        }
                    }
                    else
                    {
                        title = {
                            content: BX.create("span", {
                                text : title
                            }),
                        }
                    }

                    BX.ajax.post(
                        url, {
                            backurl: window.location.href.replace(window.location.origin, ''),
                        },
                        function (data) {
                            var resultJson = BX.parseJSON(data);
                
                            if (resultJson)
                            {
                                if (!resultJson || !resultJson.JS)
                                    return;

                                BX.ajax.processScripts(
                                    BX.processHTML(resultJson.JS).SCRIPT,
                                    false,
                                    function() {
                                        var processed = BX.processHTML(resultJson.PAGE_CONTENT, false);

                                        showPopup({
                                            id: popupId,
                                            title: title,
                                            content: processed.HTML,
                                        });
                                        
			                            BX.ajax.processScripts(processed.SCRIPT);
                                    }
                                );
                            }
                            else
                            {
                                var newContent = data.split('<!-- ajax-content-custom -->', 3)[1];
                                if (newContent == undefined)
                                {
                                    newContent = data.split('<!-- ajax-content -->', 3)[1];
                                }
                
                                newContent = newContent == undefined ? data : newContent;

                                showPopup({
                                    id: popupId,
                                    title: title,
                                    content: newContent,
                                });
                            }
                        }
                    );

                    return false;
                }
            }
        );
    };

    

    if (window.frameCacheVars !== undefined)
    {
        BX.addCustomEvent("onFrameDataReceived" , function(json) {
            onReady();
        });
    }
    else
    {
        BX.ready(function() {
            onReady();
        });
    }

// проверка на размер экрана (размер я брал вроде с Bootstrap-а)



$(window).scroll(function() {
    if ($('body').width() > 730) {
       
    
                var top = $(document).scrollTop();
                if (top < 100) $(".header-bottom").removeClass("sticky");
                else $(".header-bottom").addClass("sticky");
}
            });


})();

(function(){
    // Back to Top - by CodyHouse.co
	var backTop = document.getElementsByClassName('js-cd-top')[0],
		// browser window scroll (in pixels) after which the "back to top" link is shown
		offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offsetOpacity = 1200,
		scrollDuration = 700,
		scrolling = false;
	if( backTop ) {
		//update back to top visibility on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
			}
		});
		//smooth scroll to top
		backTop.addEventListener('click', function(event) {
			event.preventDefault();
			(!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
		});
	}

	function checkBackToTop() {
		var windowTop = window.scrollY || document.documentElement.scrollTop;
		( windowTop > offset ) ? addClass(backTop, 'cd-top--show') : removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
		( windowTop > offsetOpacity ) && addClass(backTop, 'cd-top--fade-out');
		scrolling = false;
	}
	
	function scrollTop(duration) {
	    var start = window.scrollY || document.documentElement.scrollTop,
	        currentTime = null;
	        
	    var animateScroll = function(timestamp){
	    	if (!currentTime) currentTime = timestamp;        
	        var progress = timestamp - currentTime;
	        var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
	        window.scrollTo(0, val);
	        if(progress < duration) {
	            window.requestAnimationFrame(animateScroll);
	        }
	    };

	    window.requestAnimationFrame(animateScroll);
	}

	Math.easeInOutQuad = function (t, b, c, d) {
 		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
})();

