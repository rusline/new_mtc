/*
Author: Aleksey Kislitsyn, Quantum Art ©, S-Pb.
Date: 2011-08-03

===========================================Usage:==============================================
1). jqTransform is not applied yet:
$('form').jqTransform().jqtfCustomize({ targetImgRelativePath : 'jqtransform.custom_resources_rel_path' });

2). jqTransform already applied:
$('form').jqtfCustomize({ targetImgRelativePath : 'jqtransform.custom_resources_rel_path' });
Caution: Do not forget to link 'jquery.jqtransform.custom.js' if it is not preloaded on page
===============================================================================================
*/

(function ($) {
	
	$.fn.jqtfCustomize = function (options) {
		options = $.extend({}, options);
		if (!options.targetImgRelativePath || typeof(options.targetImgRelativePath) != 'string' || options.targetImgRelativePath.length == 0)
			return;
		if (options.targetImgRelativePath.charAt(0) == '../../../static.mts.ru/default.htm')
			options.targetImgRelativePath = options.targetImgRelativePath.substr(1);
		if (options.targetImgRelativePath.length == 0)
			return;
		if (options.targetImgRelativePath.charAt(options.targetImgRelativePath.length - 1) == '../../../static.mts.ru/default.htm')
			options.targetImgRelativePath = options.targetImgRelativePath.substr(0, options.targetImgRelativePath.length - 1);
		if (options.targetImgRelativePath.length == 0)
			return;
		
		return this.each(function () {
			//Fix for all select wrappers
			var MAX_SELECT_DROPDOWN_PORTION_HEIGHT = 180;
			var ARROW_IMG_WIDTH = 17;
			var SPAN_TEXT_PADDING = 2;
			
			var isIE8 = $.browser.msie && (parseInt($.browser.version) == 8);
			$('div.jqTransformSelectWrapper', this).each(function () {
				var leftImgPath = $(this).css('background-image');
				var urlQuoteSymbol1 = (leftImgPath.charAt(4) == '\'' || leftImgPath.charAt(4) == '\"') ? leftImgPath.charAt(4) : null;
				var terminator1 = urlQuoteSymbol1 == null ? ')' : urlQuoteSymbol1 + ')';
				
				var rightImgPath = $($('div a', this)[0]).css('background-image');
				var urlQuoteSymbol2 = (leftImgPath.charAt(4) == '\'' || leftImgPath.charAt(4) == '\"') ? leftImgPath.charAt(4) : null;
				var terminator2 = urlQuoteSymbol2 == null ? ')' : urlQuoteSymbol2 + ')';
				
				var matchIndex = leftImgPath.indexOf('.ru/');
				var newResFolderPath = leftImgPath.substr(0, matchIndex + 4) + options.targetImgRelativePath;
				
				$(this).css({
					height: '19px',
					'background-image': newResFolderPath + '/select_left.gif' + terminator1
				});
				
				var ul = $($('ul', this).get(0));
				
				var spanWidth = parseInt(ul.next('select').get(0).style.width) - SPAN_TEXT_PADDING;
				
				var spanTag = $($('div>span:first-child', this).get(0));
				spanTag.css({ width: spanWidth + 'px', height: 'auto', 'text-indent': '0px', padding: SPAN_TEXT_PADDING + 'px 0 0 ' + SPAN_TEXT_PADDING + 'px' });
				
				var aTag = $($('div>a', this).get(0));
				aTag.css({
					width: ARROW_IMG_WIDTH + 'px',
					height: '19px',
					'background-image': ul.next('select').attr('disabled') ? newResFolderPath + '/select_right_disabled.gif' + terminator2 : newResFolderPath + '/select_right.gif' + terminator2
				});
				
				$(this).width(parseInt(spanTag.get(0).style.width) + parseInt(spanTag.css('padding-left')) + parseInt(aTag.get(0).style.width));
				$('li', ul).css('cssText', 'margin: 0px !important').css({ 'line-height': '1.1em', height: 'auto' });
				$('a', ul).css('cssText', 'padding: 0 0 0 ' + SPAN_TEXT_PADDING + 'px !important');
				
				//Normal code, but there are bugs with UL scroll in IE8, Google Chrome and Safari
				/*ul.css({
					width: (spanWidth + ARROW_IMG_WIDTH) + 'px',
					height: setULHeight(ul, MAX_SELECT_DROPDOWN_PORTION_HEIGHT),
					top: '20px',
					'overflow-x': 'hidden'
				});
				ul.css('overflow-y', isIE8 ? (ul.get(0).style.height == 'auto' ? 'auto' : 'scroll') : 'auto');*/
				
				//fix
				ul.css({
					width: (spanWidth + ARROW_IMG_WIDTH) + 'px',
					height: setULHeight(ul, MAX_SELECT_DROPDOWN_PORTION_HEIGHT),
					top: '20px',
					'overflow-x': 'hidden'
				});
				ul.css('overflow-y', ul.get(0).style.height == 'auto' ? 'hidden' : 'scroll');
			});
			
			
			function setULHeight(ul, maxHeight) {
				var ulClone = ul.clone(false).css({ position: 'absolute', top: '-1000px', height: 'auto', 'list-style': 'none' }).appendTo('body').show();
				var ulHeight = ulClone.find('li').css('cssText', 'margin: 0px !important').css('line-height', '1.1em').end()
					.find('a').css('cssText', 'padding: 0px 0px 0px 2px !important').css({ 'text-decoration': 'none', 'font-size': '12px' }).end().height();
				ulClone.remove();
				return ulHeight > maxHeight ? maxHeight + 'px' : 'auto';
			}
			
			//add your code for other controls...
		});
	}
})(jQuery);