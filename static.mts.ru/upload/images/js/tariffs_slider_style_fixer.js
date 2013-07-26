if (typeof mtsjs == 'undefined') var mtsjs = {};
mtsjs.sliderfixer = {
    sliderLinkStyle: "height: 17px;width: 11px;position: absolute;top: 26px;z-index: 20;cursor: default;outline: none;background: url(http://static.mts.ru/upload/images/main/v53/f/i/new_tar/slider.png) 0 0 no-repeat;line-height: 0;font-size: 0;text-indent: -9999px;margin-left: -3px;",
    fixSliderStyle: function () {
        var sliderDiv = $("div.demo div.ui-widget-content");
        var sliderLink = $("div.demo div.ui-slider a.ui-slider-handle");
        $(sliderDiv).removeClass("ui-widget-content");
        $(sliderLink).removeClass("ui-slider-handle");
        $(sliderLink).removeClass("ui-state-default");
        $(sliderLink).attr("style", mtsjs.sliderfixer.sliderLinkStyle);
    }
};

$(document).ready(function () {
    mtsjs.sliderfixer.fixSliderStyle();
});