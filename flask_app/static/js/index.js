"use strict";
$(function () {
    avg_mean_chart();
    get_events_chart();

    function get_avg_mean_data(avg_data) {
        var data_list = [];
        var tmp, i=0;
        var colors = ["#ff6699", "#8e5ea2","#ffff00","#e8c3b9","#45B39D","#9966ff","#ff9900"]
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
                    display: true,
                    text: 'Average Temperature of Seven Canadian Cities From 2009 to 2019'
                }
            }
        });
    }

    function get_event_data(event_data) {
        var data_list = [];
        var tmp, i=0;
        var colors = ["#e8c3b9","#45B39D","#9966ff","#ff9900"]
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

    $('a.js-toggle-trigger').click(function (event) {
        console.log(event.currentTarget.hash);
        if (event.currentTarget.hash === '#page1') {
            $('#page1').show();
            $('#page2').hide();
        } else if (event.currentTarget.hash === '#page2') {
            $('#page2').show();
            $('#page1').hide();
        }
        // $(event.currentTarget.hash).hide();
    });

});