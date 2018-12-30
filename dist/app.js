'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('registrar');
  var input = form.querySelector('input');

  var mainDiv = document.querySelector('.main');
  var ul = document.getElementById('invitedList');

  var div = document.createElement('div');
  var filterLabel = document.createElement('label');
  var filterCheckbox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterLabel.setAttribute('for', 'hideID');
  filterCheckbox.type = 'checkbox';
  filterCheckbox.setAttribute('id', 'hideID');
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);
  filterCheckbox.addEventListener('change', function (e) {
    var isChecked = e.target.checked;
    var lis = ul.children;
    if (isChecked) {
      for (var i = 0; i < lis.length; i += 1) {
        var li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (var _i = 0; _i < lis.length; _i += 1) {
        var _li = lis[_i];
        _li.style.display = '';
      }
    }
  });

  function createLI(text) {
    function createElement(elementName, property, value) {
      var element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    function appendToLI(elementName, property, value) {
      var element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }
    var li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirmed').appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');

    return li;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value;
    input.value = '';
    var li = createLI(text);
    ul.appendChild(li);
  });

  ul.addEventListener('change', function (e) {
    var checkbox = e.target;
    var checked = checkbox.checked;
    var listItem = checkbox.parentNode.parentNode;

    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      var button = e.target;
      var li = button.parentNode;
      var _ul = li.parentNode;
      var action = button.textContent;
      var nameActions = {
        remove: function remove() {
          _ul.removeChild(li);
        },
        edit: function edit() {
          var span = li.firstElementChild;
          var input = document.createElement('input');
          input.type = 'text';
          input.className = 'editNameInput';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: function save() {
          var input = li.firstElementChild;
          var span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };

      nameActions[action]();
    }
  });
});