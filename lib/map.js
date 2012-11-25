(function (exports) {

/**
 * Init a new Google static map.
 */

function Map(elem, title) {
  this.url = 'http://maps.googleapis.com/maps/api/staticmap?';
  this.title = title || 'Static Map';
  this.elem = elem;
  return this;
}

/**
 * Set map center at location.
 */

Map.prototype.at = function (lat, lng) {
  this.url += 'center=';
  if (typeof lat === 'string')
    this.url += lat;
  else {
    this.url += lat + ',' +  lng;
  }
  this.url += '&';
  return this;
}

/**
 * Set map size.
 */

Map.prototype.size = function (width, height) {
  this.url += 'size=';
  this.url += width + 'x' + height;
  this.url += '&';
  return this;
}

/**
 * Set zoom.
 */

Map.prototype.zoom = function (zoom) {
  this.url += 'zoom=';
  this.url += zoom;
  this.url += '&';
  return this;
}

/**
 * Set type
 */

Map.prototype.type = function (type) {
  this.url += 'maptype=';
  this.url += type;
  this.url += '&';
  return this;
}

/**
 * Get style options
 */

function getStyle(style) {
  var arr = []
    , url = '';

  for (var prop in style)
    arr.push(prop + ':' + style[prop]);
  if (!arr.length)
    return '';
  url += arr.join('|');
  url += '|';
  return url;
}

/**
 * Get paths array
 */

function getPaths(paths) {
  var arr = []
    , url = '';

  for (var i = 0, path ; path = paths[i] ; i++)
    arr.push(path.lat + ',' + path.lng);
  if (!arr.length)
    return '';
  url += arr.join('|');
  url += '|';
  return url;
}

/**
 * Add markers according specific `style` and a list of `locations`
 *
 * @example
 *   map.markers({color: 'blue'}, [{lat: 48.8656, lng: 2.3921962}])
 */

Map.prototype.markers = function (style, locations) {
  this.url += 'markers=';
  this.url += getStyle(style);
  this.url += getPaths(locations);
  this.url += '&';
  return this;
}

/**
 * Set a path according a `style` and an array of points `locations`
 */

Map.prototype.path = function (style, locations) {
  this.url += 'path=';
  this.url += getStyle(style);
  this.url += getPaths(locations);
  this.url += '&';
  return this;
}

/**
 * Set some style rules on the map.
 */

Map.prototype.style = function (style) {
  this.url += 'style=';
  this.url += getStyle(style);
  this.url += '&';
  return this;
};

/**
 * Generate the map.
 */

Map.prototype.generate = function (elem) {
  var img = document.createElement('img');

  this.url = this.url.slice(0, this.url.length - 1);
  this.url += '&sensor=false';
  img.src = this.url;
  img.alt = this.title;
  elem || (elem = this.elem);
  if (elem) elem.appendChild(img);
  return img;
}

exports.Map = Map;

})(window);