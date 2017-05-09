'use strict';

(function () {

  var filtersForm = document.querySelector('.catalog-filters');

  var bar = filtersForm.querySelector('.bar');
  var minToggle = filtersForm.querySelector('.min-toggle');
  var maxToggle = filtersForm.querySelector('.max-toggle');
  var minPrice = filtersForm.querySelector('#min-price');
  var maxPrice = filtersForm.querySelector('#max-price');

  var syncToggle = function (minCoord, maxCoord) {

    var barWidth = ((maxCoord - minCoord) / 180) * 100;

    minToggle.style = 'left: ' + minCoord.toString() + 'px;';
    maxToggle.style = 'left: ' + maxCoord.toString() + 'px;';
    bar.style = 'margin-left: ' + minCoord.toString() + 'px; width: ' + barWidth + '%;';
  };

  var priceChangeHandler = function (min, max) {
    var minCoord = window.utils.syncCoords(min);
    var maxCoord = window.utils.syncCoords(max);

    syncToggle(minCoord, maxCoord);
  };

  minPrice.addEventListener('change', function () {
    if (minPrice.value < 0) {
      minPrice.value = 0;
    } else if (minPrice.value > 30000) {
      minPrice.value = 29999;
    }
  });

  maxPrice.addEventListener('change', function () {
    if (maxPrice.value < 0) {
      maxPrice.value = 1;
    } else if (maxPrice.value > 30000) {
      maxPrice.value = 30000;
    }
  });

  filtersForm.addEventListener('change', function () {
    priceChangeHandler(minPrice, maxPrice);
  });

  minToggle.addEventListener('mousedown', function (evt) {
    window.utils.mouseMoveHandler(evt, minToggle, minPrice, syncToggle, maxToggle);
  });

  maxToggle.addEventListener('mousedown', function (evt) {
    window.utils.mouseMoveHandler(evt, maxToggle, maxPrice, syncToggle, minToggle);
  });

})();
