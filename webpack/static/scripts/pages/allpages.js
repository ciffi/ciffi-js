var Page = (function () {

    'use strict';

    function Page() {
        document.body.classList.add('appIsReady');
    }

    Page.prototype.setData = function (data) {

    };

    return new Page();

})();

module.exports = Page;