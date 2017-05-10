'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var MAX_PRICE = 30000;
  var COORDS_DIFF = 160;

  return {

    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    isEscEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
    },

    syncCoords: function (element) {
      return ((element.value / MAX_PRICE) * COORDS_DIFF) + 20;
    },

    syncPrice: function (element) {
      return Math.floor((element.offsetLeft - 20) / COORDS_DIFF * MAX_PRICE);
    },

    mouseMoveHandler: function (evt, element, priceHandler, syncToggle, diffToggle) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        // y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          // y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          // y: moveEvt.clientY
        };

        element.style.left = (element.offsetLeft - shift.x) + 'px';

      };

      var mouseMoveChecker = function (moveEvt) {
        if (element.offsetLeft >= 20 && element.offsetLeft <= 180) {
          onMouseMove(moveEvt);
          if (element.classList.contains('min-toggle')) {
            priceHandler.value = window.utils.syncPrice(element);
            syncToggle(element.offsetLeft, diffToggle.offsetLeft);
          } else {
            priceHandler.value = window.utils.syncPrice(element);
            syncToggle(diffToggle.offsetLeft, element.offsetLeft);
          }
        } else {
          if (element.offsetLeft < 20) {
            element.style.left = '20px';
            priceHandler.value = '0';
          } else {
            element.style.left = '180px';
            priceHandler.value = MAX_PRICE;
          }
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveChecker);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', mouseMoveChecker);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
