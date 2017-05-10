'use strict';

(function () {

  var ESCAPE_KEY_CODE = 27;

  var MAX_PRICE = 30000;
  var COORDS_DIFF = 160;

  var isEscEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
  };

  var writeUsBtn = document.querySelector('#write-us');

  if (writeUsBtn) {
    var writeUsPopup = document.querySelector('.modal-content-write-us');
    var mapBtn = document.querySelector('#map-btn');
    var map = document.querySelector('.modal-content-map');

    var closeWriteUsPopup = writeUsPopup.querySelector('.modal-content-close');
    var formWriteUs = writeUsPopup.querySelector('form');

    var closeMap = map.querySelector('.modal-content-close');

    var writeUsName = formWriteUs.querySelector('#write-us-name');
    var writeUsEmail = formWriteUs.querySelector('#write-us-email');
    var writeUsText = formWriteUs.querySelector('#write-us-text');

    var stgName = localStorage.getItem('name');
    var stgEmail = localStorage.getItem('e-mail');

    var formData = [writeUsName, writeUsEmail, writeUsText];

    var openWriteUsHandler = function (evt) {
      evt.preventDefault();
      writeUsPopup.classList.remove('invisible');
      writeUsPopup.classList.add('float-write-us');

      setTimeout(function () {
        writeUsPopup.classList.remove('float-write-us');
      }, 1000);

      if (stgName || stgEmail) {
        writeUsName.value = stgName;
        writeUsEmail.value = stgEmail;
        writeUsText.focus();
      } else {
        writeUsName.focus();
      }

      closeWriteUsPopup.addEventListener('click', closeWriteUsHandler);
      window.addEventListener('keydown', closeWriteUsKeydownHandler);
    };

    var closeWriteUsHandler = function (evt) {
      evt.preventDefault();
      writeUsPopup.classList.add('invisible');
      closeWriteUsPopup.removeEventListener('click', closeWriteUsHandler);
      window.removeEventListener('keydown', closeWriteUsKeydownHandler);
    };

    var closeWriteUsKeydownHandler = function (evt) {
      if (isEscEvent(evt)) {
        closeWriteUsHandler(evt);
      }
    };

    var errorShake = function () {
      writeUsPopup.classList.add('modal-error');
      setTimeout(function () {
        writeUsPopup.classList.remove('modal-error');
      }, 1000);
    };

    var formChecker = function () {
      formData.forEach(function (object) {
        if (!object.value) {
          object.placeholder = 'Обязательное поле!';
          object.style = 'border: 2px solid #ee3643';
          errorShake();
        } else {
          object.placeholder = object.value;
          object.style = 'border: 2px solid #d7dcde';
        }
      });
    };

    var submitWriteUsHandler = function (evt) {
      if (!writeUsName.value || !writeUsEmail.value || !writeUsText.value) {
        evt.preventDefault();
        formWriteUs.addEventListener('change', formChecker);
        formChecker();
      } else {
        localStorage.setItem('name', writeUsName.value);
        localStorage.setItem('e-mail', writeUsEmail.value);
      }
    };

    var openMapHandler = function (evt) {
      evt.preventDefault();
      map.classList.remove('invisible');
      closeMap.addEventListener('click', closeMapHandler);
      window.addEventListener('keydown', closeMapKeydownHandler);
    };

    var closeMapHandler = function (evt) {
      evt.preventDefault();
      map.classList.add('invisible');
    };

    var closeMapKeydownHandler = function (evt) {
      if (isEscEvent(evt)) {
        closeMapHandler(evt);
      }
    };

    writeUsBtn.addEventListener('click', openWriteUsHandler);
    formWriteUs.addEventListener('submit', submitWriteUsHandler);
    mapBtn.addEventListener('click', openMapHandler);
  }

  // btn-cart.js
  var catalogItems = document.querySelector('.catalog-items');

  if (catalogItems) {
    var popup = document.querySelector('.modal-content-add-to-cart');
    var closePopup = popup.querySelector('.modal-content-close');

    var openPopupHandler = function (evt) {
      evt.preventDefault();
      popup.classList.remove('invisible');
      closePopup.addEventListener('click', closePopupHandler);
      window.addEventListener('keydown', closePopupKeydownHandler);
    };

    var closePopupHandler = function (evt) {
      evt.preventDefault();
      popup.classList.add('invisible');
      closePopup.removeEventListener('click', closePopupHandler);
      window.removeEventListener('keydown', closePopupKeydownHandler);
    };

    var closePopupKeydownHandler = function (evt) {
      if (isEscEvent(evt)) {
        closePopupHandler(evt);
      }
    };

    var catalogItemsHandler = function (evt) {
      var target = evt.target;
      while (target !== catalogItems) {
        if (target.classList.contains('btn-cart')) {
          openPopupHandler(evt);
          return;
        }
        target = target.parentNode;
      }
    };

    catalogItems.addEventListener('click', catalogItemsHandler);
  }

  // price-slider.js
  var filtersForm = document.querySelector('.catalog-filters');

  if (filtersForm) {
    var bar = filtersForm.querySelector('.bar');
    var minToggle = filtersForm.querySelector('.min-toggle');
    var maxToggle = filtersForm.querySelector('.max-toggle');
    var minPrice = filtersForm.querySelector('#min-price');
    var maxPrice = filtersForm.querySelector('#max-price');

    var syncCoords = function (element) {
      return ((element.value / MAX_PRICE) * COORDS_DIFF) + 20;
    };

    var syncPrice = function (element) {
      return Math.floor((element.offsetLeft - 20) / COORDS_DIFF * MAX_PRICE);
    };

    var mouseMoveHandler = function (evt, element, priceHandler, syncToggle, diffToggle) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        element.style.left = (element.offsetLeft - shift.x) + 'px';

      };

      var mouseMoveChecker = function (moveEvt) {
        if (element.offsetLeft >= 20 && element.offsetLeft <= 180) {
          onMouseMove(moveEvt);
          if (element.classList.contains('min-toggle')) {
            priceHandler.value = syncPrice(element);
            syncToggle(element.offsetLeft, diffToggle.offsetLeft);
          } else {
            priceHandler.value = syncPrice(element);
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
    };

    var syncToggle = function (minCoord, maxCoord) {

      var barWidth = (((maxCoord - minCoord) / 180) * 100) - 10;

      minToggle.style = 'left: ' + minCoord.toString() + 'px;';
      maxToggle.style = 'left: ' + maxCoord.toString() + 'px;';
      bar.style = 'margin-left: ' + minCoord.toString() + 'px; width: ' + barWidth + '%;';
    };

    var priceChangeHandler = function (min, max) {
      var minCoord = syncCoords(min);
      var maxCoord = syncCoords(max);

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
      mouseMoveHandler(evt, minToggle, minPrice, syncToggle, maxToggle);
    });

    maxToggle.addEventListener('mousedown', function (evt) {
      mouseMoveHandler(evt, maxToggle, maxPrice, syncToggle, minToggle);
    });
  }

})();
