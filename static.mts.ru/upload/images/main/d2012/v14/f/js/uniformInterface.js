$(document).ready(function ()
{

    var urls = [];
    if (!window.mtsRegions)
        return;
    $(mtsRegions).each(function ()
    {
        var baseUrl = this['url'].replace('http://', '').replace('../../../https@/', '').replace('www.', '').replace('corp.', '').replace('company.', '').replace('dealers.', '');;
        urls.push('www.' + baseUrl);
        urls.push('corp.' + baseUrl);
        urls.push('company.' + baseUrl);
        urls.push('www.corp.' + baseUrl);
        urls.push('www.company.' + baseUrl);
        urls.push('www.pda.' + baseUrl);
        urls.push('www.dealers.' + baseUrl);
        urls.push('dealers.' + baseUrl);
        urls.push('sendsms.ssl.' + baseUrl);
        urls.push('sendmms.ssl.' + baseUrl);
    });
    urls.push('../../../mtsweb.adcast.ru/');
    urls.push('www.mtsgsm.com/');
    urls.push('www.vis.mtsgsm.com/');
    urls.push('www.corp.mtsgsm.com/');
    urls.push('../../../ads.adfox.ru/');
    urls.push('../../../pdealer.mts.ru/');
    urls.push('../../../ads.mts.ru/');
    // Рисуем иконку рядом с ссылкой
    $('.rounds-bottom-left a').each(function ()
    {
        if ($(this).attr('class') === undefined && $(this).parent().attr('class') != 'pdf' && typeof ($(this).attr('href')) != 'undefined' && $(this).attr('href').indexOf('.pdf') > -1 && $(this).html().indexOf('pdf_icon_bw.gif') < 0)
        {
            $(this).append(function ()
            {
                return '&nbsp;<img src="../../../static.mts.ru/upload/images/pdf_icon_bw.gif" />';
            });
        }
    });

    // Обработка линков на другие сайты
    // верхнее меню, левое меню и центральная часть
    $('#content a, #nav a').each(function ()
    {
        var link = $(this).attr('href');
        var h = window.location.host.toLowerCase();
        if (!$(this).hasClass('link-2') && typeof (link) != 'undefined' && link.indexOf('http') > -1 && link.indexOf(h) < 0 && link.indexOf('static.mts.ru') < 0 && link.indexOf('adcast.ru') < 0 && link.indexOf('ads.mts.ru') < 0 && link.indexOf('adfox.ru') < 0 && jQuery.inArray(link.split('/')[2] + '../../../static.mts.ru/default.htm', urls) < 0)
        {
            // если ссылка оформлена в ввиде кнопки или скрипт уже отработал на этой ссылке, пропускаем
            if ($(this).context.innerHTML.toLowerCase().indexOf('<img') < 0 && ($(this).css("background-image") == 'none' || $(this).attr('class') == 'mts-bonus' || $(this).attr('class') == 'i-helper') && $(this).next().context.innerHTML.indexOf('externalLinks.png') < 0)
            {
                if ($(this).css('display') != 'block' && !$(this).hasClass("blank"))
                {
                    $(this).addClass("blank");
                    $(this).attr("target", "_blank");
                    $(this).attr("title", "Страница откроется в новом окне");
                }
                //else if (typeof ($(this).attr('class')) === 'undefined' || $(this).attr('class') == '')
                //{
                //    $(this).append('<img src="../../../static.mts.ru/upload/images/externallinks.png" class="externalBlock" />');
                //}
                //else
                //{
                //    $(this).append('<img src="../../../static.mts.ru/upload/images/externallinks_red.png" class="externalBlock" />');
                //}
            }
        }
    });
});