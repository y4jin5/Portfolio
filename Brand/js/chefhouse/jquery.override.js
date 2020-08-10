(function($) {
	var u = navigator.userAgent.toLowerCase(); 
	var v = (u.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, '0' ])[1];
	var isMSIE = /msie/.test(u);

	var html_ = $.fn.html;
	function reQuote(t) {
		t = t.replace(new RegExp("([\\w-]+)=([^\\\'\\\" >]+)([ >])", "g"),
				function(str, $n, $v, $e, offset, s) {
					return $n + '="' + $v + '"' + $e;
				});
		return t;
	}
	$.fn.html = function(value) {
		if (value === undefined) {
			return jQuery
					.access(
							this,
							function(value) {
								var elem = this[0] || {};

								if (value === undefined) {
									return elem.nodeType === 1 ? (((isMSIE && parseInt(v, 10) <= 8) || document.documentMode <= 8) ? reQuote(elem.innerHTML)
											: elem.innerHTML).replace(
											jQuery.rinlinejQuery, "")
											: null;
								}
							}, null, value, arguments.length);
		}
		return html_.call(this, value);
	};

	if (isMSIE && $.browser && document.documentMode) {
		$.browser.version = document.documentMode;
	}
})(jQuery);
