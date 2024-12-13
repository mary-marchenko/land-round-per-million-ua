//TDS
(function () {
    var url = new URL(window.location.href);
    var params = ['l', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'param1', 'param2', 'param3', 'param4', 'creative_type', 'creative_id'];
    var linkParams = ['affid', 'cpaid']; // ищем в url redirectUrl в url:

    if (url.searchParams.has('redirectUrl')) {
        var redirectUrl = new URL(url.searchParams.get('redirectUrl'));

        if (redirectUrl.href.match(/\//g).length === 4 && redirectUrl.searchParams.get('l')) {
            //если ссылка в ссылка redirectUrl корректная
            localStorage.setItem('redirectUrl', redirectUrl.href); // указываем точкой входа домен с протоколом из redirectUrl
        }
    }

    params.forEach(function (param) {
        if (url.searchParams.has(param)) localStorage.setItem(param, url.searchParams.get(param));
    });

    linkParams.forEach(function (linkParam) {
        if (url.searchParams.has(linkParam)) localStorage.setItem(linkParam, url.searchParams.get(linkParam));
    });

    window.addEventListener('click', function (e) {
        var link,
            parent = e.target.closest('a');

        if (parent.getAttribute('href') !== 'https://tds.favbet.partners') {
            return;
        }

        if (parent) {
            e.preventDefault();
            var affid = localStorage.getItem('affid');
            var cpaid = localStorage.getItem('cpaid');

            if (localStorage.getItem("redirectUrl")) {
                link = new URL(localStorage.getItem("redirectUrl"));
            } else {
                link = new URL(parent.href);
                if (affid && cpaid) {
                    link.pathname = '/' + affid + '/' + cpaid;
                }
            }

            params.forEach(function (param) {
                if (url.searchParams.has(param)) {
                    link.searchParams.set(param, localStorage.getItem(param));
                }
            });

            document.location.href = link;
        }
    });
})();

// btn
let mainBtn = document.querySelector('.land__btn');
let mainBtnCont = document.querySelector('.land__btn-cont');
let mediaQuery = window.matchMedia('(min-width: 600px) and (min-height: 501px) and (orientation: landscape)');

function handleHover() {
    if (mediaQuery.matches) {
        mainBtn.addEventListener('mouseenter', scaleUp);
        mainBtn.addEventListener('mouseleave', scaleDown);
    } else {
        mainBtn.removeEventListener('mouseenter', scaleUp);
        mainBtn.removeEventListener('mouseleave', scaleDown);
    }
}

function scaleUp() {
    mainBtnCont.style.transform = 'scale(1.1)';
}
function scaleDown() {
    mainBtnCont.style.transform = 'scale(1)';
}

handleHover();
mediaQuery.addEventListener('change', handleHover);