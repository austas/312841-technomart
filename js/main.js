'use strict';

(function () {
  var writeUsBtn = document.querySelector('#write-us');
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
    if (window.utils.isEscEvent(evt)) {
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
    if (window.utils.isEscEvent(evt)) {
      closeMapHandler(evt);
    }
  };

  writeUsBtn.addEventListener('click', openWriteUsHandler);
  formWriteUs.addEventListener('submit', submitWriteUsHandler);
  mapBtn.addEventListener('click', openMapHandler);

})();
