/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
var app = {
  itemsKey: 'GEOAUDIO_ITEMS',

  items: [],

  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.getElementById('submit').addEventListener('click', this.onSubmitClick.bind(this), false);
    document.getElementById('clear').addEventListener('click', this.onClearClick.bind(this), false);
    document.getElementById('lookup').addEventListener('click', this.onLookupClick.bind(this), false);
  },

  onLookupClick: function() {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      document.getElementById('location').value = JSON.stringify(coords);
    }

    function error(error) {
      document.getElementById('location').value = "failed";
    }
  },

  onSubmitClick: function() {
    console.log('onSubmitClick');
    let description = document.getElementById('description');
    let location = document.getElementById('location');
    let item = { description: description.value, location: location.value };
    description.value = '';
    location.value = '';
    this.items.push(item);
    console.log(this.items.length);
    window.localStorage.setItem(this.itemsKey, JSON.stringify(this.items));
    this.addItem(item);
  },

  onClearClick: function() {
    this.items = [];
    window.localStorage.setItem(this.itemsKey, JSON.stringify(this.items));
    let itemsElement = document.getElementById('items');
    while (itemsElement.firstChild) {
      itemsElement.removeChild(itemsElement.firstChild);
    }
  },

  addItem: function(item) {
    let description = document.createElement('div');
    description.className = 'description';
    description.textContent = item.description === '' ? 'No description' : item.description;
    let location = document.createElement('div');
    location.className = 'location';
    location.textContent = item.location;

    let itemContainer = document.createElement('div');
    itemContainer.className = 'item';
    itemContainer.appendChild(description);
    itemContainer.appendChild(location);

    document.getElementById('items').appendChild(itemContainer);
  },

  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    console.log('onDeviceReady');
    for (element of document.querySelectorAll('.deviceready')) {
      element.style.display = 'block';
    }

    this.items = JSON.parse(window.localStorage.getItem(this.itemsKey));
    if (!this.items) this.items = [];
    console.log(this.items.length);
    for (item of this.items) {
      this.addItem(item);
    }
  },
};
