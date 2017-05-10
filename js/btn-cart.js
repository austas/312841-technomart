'use strict';

(function () {
  var catalogItems = document.querySelector('.catalog-items');
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
    if (window.utils.isEscEvent(evt)) {
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

})();
