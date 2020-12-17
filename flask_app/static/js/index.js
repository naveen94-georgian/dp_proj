"use strict";
$(function () {
    bind_events();
    avg_mean_chart();
    get_events_chart();

    $('[data-toggle="tooltip"]').tooltip()

    var API_URL = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/weather-app-qeitr/service/weather-http/incoming_webhook/weather-webhook";
    $('#api_url').val(API_URL);
    new ClipboardJS('#btn_copy');

    $('.datepicker').datepicker();
    function get_avg_mean_data(avg_data) {
        var data_list = [];
        var tmp, i = 0;
        var colors = ["#ff6699", "#8e5ea2", "#ffff00", "#e8c3b9", "#45B39D", "#9966ff", "#ff9900"]
        $.each(avg_data, (idx, value) => {
            tmp = {
                data: value,
                label: idx,
                borderColor: colors[i++],
                fill: false
            };
            data_list.push(tmp);
        });
        return data_list;
    };

    function avg_mean_chart() {
        var json_data = $('#inp_temp_mean').val();
        var temp_mean = JSON.parse(json_data);
        var data_list = get_avg_mean_data(temp_mean.output_dict);

        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: temp_mean.lbl,
                datasets: data_list
            },
            options: {
                title: {
                    position: 'top',
                    display: true,
                    text: 'Average Temperature of Seven Canadian Cities From 2009 to 2019'
                }
            }
        });
    }

    function get_event_data(event_data) {
        var data_list = [];
        var tmp, i = 0;
        var colors = ["#e8c3b9", "#45B39D", "#9966ff", "#ff9900"]
        $.each(event_data, (idx, value) => {
            tmp = {
                data: value,
                label: idx,
                backgroundColor: colors[i++]
            };
            data_list.push(tmp);
        });
        return data_list;
    };

    function get_events_chart() {
        var json_data = $('#inp_event_data').val();
        var event_data = JSON.parse(json_data);
        var data_list = get_event_data(event_data.output_dict);
        new Chart(document.getElementById("bar-chart-grouped"), {
            type: 'bar',
            data: {
                labels: event_data.lbl,
                datasets: data_list
            },
            options: {
                title: {
                    display: true,
                    text: 'Total Number of Days with Various Weather Events by City from 2009 to 2019'
                }
            }
        });
    };

    // your code goes here
    $('#tb').click(function () {
        console.log("hello");
        $.ajax({
            url: '/get_data', success: function (result) {
                console.log(result)
                $('#my_table').children().remove()
                $('#my_table').append(result);
            }
        });
        return false;
    });



    function bind_events() {

        $('[data-toggle="popover"]').popover();
        $('#btn_add_filer,#btn_copy,#btn_clear_filer').on('shown.bs.popover', function (e) {
            setTimeout(() => {
                $('#'+e.currentTarget.id).popover('hide')
            }, 2000)
        });
        

        $('#btn_add_filer').popover({
            placement: 'bottom',
            content: function() {
                if($('#selCity').val() === "" && $('#sel_day').val() === ""
                && $('#sel_month').val() ==="" && $('#sel_year').val() === ""){
                    return "No Filter Added";
                }else{
                    return "Filter Added";
                }
            }
        });

        var copyMsg = "Copy To Clipboard";

        $('#btn_copy').click(() => {
            copyMsg = "Copied!";
        });

        //hidden.bs.popover

        $('#btn_copy').popover({
            placement: 'bottom',
            trigger: 'click',
            content: function(e){
                return "Copied!"
            }
        });

        $('#btn_add_filer').click((event) => {
            var selectVal = $('#selCity').val();
            var dayVal = $('#sel_day').val();
            var monthVal = $('#sel_month').val();
            var yearVal = $('#sel_year').val();

            var url = API_URL;
            var opts = "";
            if (selectVal && opts.indexOf('?') >= 0) {
                opts += "&city=" + selectVal;
            } else if (selectVal) {
                opts += "?city=" + selectVal;
            }
            if (dayVal && opts.indexOf('?') >= 0) {
                opts += "&day=" + dayVal;
            } else if (dayVal) {
                opts += "?day=" + dayVal;
            }
            if (monthVal && opts.indexOf('?') >= 0) {
                opts += "&month=" + monthVal;
            } else if (monthVal) {
                opts += "?month=" + monthVal;
            }
            if (yearVal && opts.indexOf('?') >= 0) {
                opts += "&year=" + yearVal;
            } else if (yearVal) {
                opts += "?year=" + yearVal;
            }
            var url = API_URL + opts;
            $('#api_url').val(url);

            $("#txt_city").val(selectVal);
            $("#txt_day").val(dayVal);
            $("#txt_month").val(monthVal);
            $("#txt_year").val(yearVal);
        });

        $('#btn_clear_filer').click((event) => {
            $('#api_url').val(API_URL);
            $("#txt_city").val("");
            $("#txt_day").val("");
            $("#txt_month").val("");
            $("#txt_year").val("");
            $('#selCity').val("");
            $('#sel_day').val("");
            $('#sel_month').val("");
            $('#sel_year').val("");
        });
    };

    function togglePage($page1, $page2) {
        //display page 1
        $page1.addClass('d-block');
        $page1.removeClass('d-none');
        $('body').scrollTop();
        //hide page 2
        $page2.removeClass('d-block');
        $page2.addClass('d-none');
        var elmnt = document.getElementById("contents");
        elmnt.scrollIntoView();
    };

    $('a.js-toggle-trigger').click(function (event) {
        // console.log(event.currentTarget.hash);
        if (event.currentTarget.hash === '#page1') {
            togglePage($('#page1'), $('#page2'));
        } else if (event.currentTarget.hash === '#page2') {
            togglePage($('#page2'), $('#page1'));
        }
    });

});