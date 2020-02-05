define(["jquery", "select2", "loadcss"], function ($) {
    $(function () {
        loadCSS(['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/all.min.css', './css/style.min.css?v=11', './css/select2.min.css']);
        /** Declare global data */
        items = [];
        for (var i = 0; i < 10000; i++) {
            items.push({ id: i, text: "item " + i })
        }

        pageSize = 50

        $.fn.select2.amd.require(["select2/data/array", "select2/utils"],

            function (ArrayData, Utils) {
                function CDATA($element, options) {
                    CDATA.__super__.constructor.call(this, $element, options);
                }
                Utils.Extend(CDATA, ArrayData);

                CDATA.prototype.query = function (params, callback) {
                    if (!("page" in params)) {
                        params.page = 1;
                    }
                    var data = {};
                    data.results = items.slice((params.page - 1) * pageSize, params.page * pageSize);
                    data.pagination = {};
                    data.pagination.more = params.page * pageSize < items.length;
                    callback(data);
                };

                $(document).ready(function () {
                    $("#sl2").select2({
                        ajax: {},
                        dataAdapter: CDATA
                    });
                });
            })
    });
});
