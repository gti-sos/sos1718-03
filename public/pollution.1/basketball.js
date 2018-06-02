 /* global Highcharts */
 /* global angular*/

 angular.module("StatsApp").controller("basketball", ["$scope", "$http", function($scope, $http) {

     console.log("List Ctrl initialized!");
     var apiPropia = "/api/v2/global-warmings";
     var api2 = "proxyCIT/v2/networks";


     $http.get(api2).then(function(response1) {
         $http.get(apiPropia).then(function(response2) {

             var ultimo = [];

             for (var i = 0; i < 5; i++) {

                 ultimo.push([-50, 100, response1.data.networks[i].location.latitude, 100, 200]);

             }
             for (var i = 0; i < 5; i++) {

                 ultimo.push([-50, 100, response2.data[i].peakPower, 100, 200]);

             }





             var names = ['Temazepam', 'Guaifenesin', 'Salicylic Acid', 'Fluoride', 'Zinc Oxide', 'Acetaminophen'];
             var data = [23, 34, 67, 93, 56, 100];
             var dataSet = anychart.data.set(data);
             var palette = anychart.palettes.distinctColors().items(['#64b5f6', '#1976d2', '#ef6c00', '#ffd54f', '#455a64', '#96a6a6', '#dd2c00', '#00838f', '#00bfa5', '#ffa000']);

             var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
                 var stroke = '1 #e5e4e4';
                 if (without_stroke) {
                     stroke = null;
                     gauge.label(i)
                         .text(names[i] + ', <span style="">' + data[i] + '%</span>') // color: #7c868e
                         .useHtml(true);
                     gauge.label(i)
                         .hAlign('center')
                         .vAlign('middle')
                         .anchor('right-center')
                         .padding(0, 10)
                         .height(width / 2 + '%')
                         .offsetY(radius + '%')
                         .offsetX(0);
                 }

                 gauge.bar(i).dataIndex(i)
                     .radius(radius)
                     .width(width)
                     .fill(palette.itemAt(i))
                     .stroke(null)
                     .zIndex(5);
                 gauge.bar(i + 100).dataIndex(5)
                     .radius(radius)
                     .width(width)
                     .fill('#F5F4F4')
                     .stroke(stroke)
                     .zIndex(4);

                 return gauge.bar(i)
             };

             anychart.onDocumentReady(function() {
                 var gauge = anychart.gauges.circular();
                 gauge.data(dataSet);
                 gauge.fill('#fff')
                     .stroke(null)
                     .padding(0)
                     .margin(100)
                     .startAngle(0)
                     .sweepAngle(270);

                 var axis = gauge.axis().radius(100).width(1).fill(null);
                 axis.scale()
                     .minimum(0)
                     .maximum(100)
                     .ticks({
                         interval: 1
                     })
                     .minorTicks({
                         interval: 1
                     });
                 axis.labels().enabled(false);
                 axis.ticks().enabled(false);
                 axis.minorTicks().enabled(false);
                 makeBarWithBar(gauge, 100, 0, 17, true);
                 makeBarWithBar(gauge, 80, 1, 17, true);
                 makeBarWithBar(gauge, 60, 2, 17, true);
                 makeBarWithBar(gauge, 40, 3, 17, true);
                 makeBarWithBar(gauge, 20, 4, 17, true);

                 gauge.margin(50);
                 gauge.title().text('Medicine manufacturing progress' +
                     '<br/><span style="color:#929292; font-size: 12px;">(ACME CORPORATION)</span>').useHtml(true);
                 gauge.title()
                     .enabled(true)
                     .hAlign('center')
                     .padding(0)
                     .margin([0, 0, 20, 0]);

                 gauge.container('container');
                 gauge.draw();
             });
         });
     });
 }]);
 