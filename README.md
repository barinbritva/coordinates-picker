coordinates-picker
==================

This module allows you to show location of the address on map (Google Maps), and store it’s coordinates it in distinct field with custom format.

Parameters
----------

<table>
    <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>fields*</td>
        <td>jQuery</td>
        <td>Form fields from which address is build. Final address is made by concatenation of fields, divided by comma.</td>
    </tr>
    <tr>
        <td>container*</td>
        <td>jQuery</td>
        <td><code>Div</code> element where the map will be placed.</td>
    </tr>
    <tr>
        <td>coordinates*</td>
        <td>jQuery</td>
        <td>Form field in which coordinates will be placed. If in the moment of initialisation this field is not empty, coordinates will be marked on the map with marker.</td>
    </tr>
    <tr>
        <td>format</td>
        <td>string</td>
        <td>Data format in which coordinates will be stored in the text field. By default it is <code>lng lat</code>, where lat is latitude and lng is longitude. Such data format allows us to
prepare field for storing in the database like POINT object: <code>PointFromText('POINT(".$coordinates.")')</code>.</td>
    </tr>
    <tr>
        <td>center</td>
        <td>google.maps.LatLng|Array</td>
        <td>Coordinates of the map center. Used if on the initialisation moment all address fields and coordinates fields are empty.</td>
    </tr>
    <tr>
        <td>selectValue</td>
        <td>boolean</td>
        <td>By default module takes select values not by <code>val()</code> method, because in common cases tag <code>option</code> in <code>value</code> attribute contains some identifiers, but not values. For example <code>option value=“1”>Russia</option></code>. Setting this parameter to false cancels this behaviour.</td>
    </tr>
    <tr>
        <td>zooms</td>
        <td>object</td>
        <td>Levels of scale. 
            <ul>
                <li><code>initial</code> (initial),</li>
                <li><code>country</code> (country precision),</li>
                <li><code>locality</code> (city precision),</li>
                <li><code>route</code> (street precision),</li>
                <li><code>street_address</code> (appartment precision).</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>marker</td>
        <td>object</td>
        <td>Object of <a href="https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions" target=“_blank">marker parameters</a> (Google Maps API).</td>
    </tr>
    <tr>
        <td>map</td>
        <td>object</td>
        <td>Object of <a href="https://developers.google.com/maps/documentation/javascript/reference#MapOptions" target="_blank">map parameters</a> (Google Maps API).</td>
    </tr>
</table>

Methods
-------

<table>
    <tr>
        <th>Method</th>
        <th>Return value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>getMap()</td>
        <td>google.maps.Map</td>
        <td>Returns <a href="https://developers.google.com/maps/documentation/javascript/reference#Map" target=“_blank">map object</a>.</td>
    </tr>
    <tr>
        <td>getMarker()</td>
        <td>google.maps.Marker|null</td>
        <td>Returns <a href="https://developers.google.com/maps/documentation/javascript/reference#Marker" target=“_blank">marker object</a> (if marker doesn’t exist return <code>null</code>).</td>
    </tr>
    <tr>
        <td>getPosition()</td>
        <td>google.maps.LatLng|null</td>
        <td>Return <a href="https://developers.google.com/maps/documentation/javascript/reference#LatLng" target=“_blank">lat and lng object</a> or <code>null</code>.</td>
    </tr>
    <tr>
        <td>getPoint(format)</td>
        <td>string</td>
        <td>Return coordinates of found address in specified data type. If optional parameter <code>format</code> is not defined, coordinates will be formed according to initialisation options. Can be an empty string if marker doesn’t exist.</td>
    </tr>
</table>

Events
------

<table>
    <tr>
        <th>Event</th>
        <th>Descroption</th>
    </tr>
    <tr>
        <td>viewchange</td>
        <td>Event fires on map view change(scale or centering). Manual map moving is not considered.</td>
    </tr>
    <tr>
        <td>coordschange</td>
        <td>Event fires after defining/changing coordinates of current place. Event has options <code>marker</code> and <code>position</code>.</td>
    </tr>
    <tr>
        <td>geocodingstart</td>
        <td>Event fires on geocoding start, which also fires after address fields values change. Event has option <code>address</code>.</td>
    </tr>
    <tr>
        <td>geocodingend</td>
        <td>Event fires when geocoding process is finished. Event has options <code>address</code> and contains properties <code>status</code> and <code>results</code>.</td>
    </tr>
</table>

Event properties
----------------

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Event</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>map</td>
        <td>google.maps.Map</td>
        <td>all events</td>
        <td>Instance of <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Map" target="_blank">google.maps.Map</a></code></td>
    </tr>
    <tr>
        <td>mapCenter</td>
        <td>google.maps.LatLng</td>
        <td>all events</td>
        <td>Instance of <code><a href="https://developers.google.com/maps/documentation/javascript/reference#LatLng" target="_blank">google.maps.LatLng</a></code></td>
    </tr>
    <tr>
        <td>mapZoom</td>
        <td>integer</td>
        <td>all events</td>
        <td>Current level of scale</td>
    </tr>
    <tr>
        <td>marker</td>
        <td>google.maps.Marker|null</td>
        <td>coordschange</td>
        <td>Instance of <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Marker" target="_blank">google.maps.Marker</a></code> or <code>null</code></td>
    </tr>
    <tr>
        <td>position</td>
        <td>google.maps.LatLng|null</td>
        <td>coordschange</td>
        <td>Instance of <code><a href="https://developers.google.com/maps/documentation/javascript/reference#LatLng" target="_blank">google.maps.LatLng</a></code> or <code>null</code></td>
    </tr>
    <tr>
        <td>address</td>
        <td>string</td>
        <td>geocodingstart, geocodingend</td>
        <td>Address for started or finished geocoding process.</td>
    </tr>
    <tr>
        <td>status</td>
        <td>string</td>
        <td>geocodingend</td>
        <td>Status of geocoding process. Matches property <code>status</code> of <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Geocoder" target=“_blalnk">google.maps.Geocoder</a></code> object.</td>
    </tr>
    <tr>
        <td>results</td>
        <td>object</td>
        <td>geocodingend</td>
        <td>Result of geocoding process. Matches property <code>results</code> of <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Geocoder" target=“_blalnk">google.maps.Geocoder</a></code> object.</td>
    </tr>
</table>

Loading examples
----------------

You can get module code via three ways:

* copy code from repository to your project
* get code from CDN:

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/coordinates-picker/1.0.0/coordinates-picker.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/coordinates-picker/1.0.0/coordinates-picker.min.js"></script>
<!-- project page on cdnjs.com: https://cdnjs.com/libraries/coordinates-picker -->
```
* install module via Bower:

```bash
bower install coordinates-picker
```

Project structure:

    ├── assets
    │   ├── images
    │   │   └── marker.png
    │   └── scripts
    │       ├── amd
    │       │   ├── main.js
    │       │   ├── require.config.js
    │       │   └── requirejs.async.js
    │       ├── CoordinatesPicker.js
    │       └── main.js
    └── index.php


Module has dependency of jQuery and Google Maps, and implement AMD loading. Thats why module can be loaded via two ways:

### Regular way ###

Part of <code>index.html</code> file

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&amp;language=ru"></script>
<script type="text/javascript" src="/assets/scripts/CoordinatesPicker.js"></script>
<script type="text/javascript" src="/assets/scripts/main.js"></script>
```

### AMD (using RequireJS) ###

Part of <code>index.html</code> file

```html
<script data-main="/assets/scripts/amd/main" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js"></script>
<script src="/assets/scripts/amd/require.config.js"></script>
```

File <code>/assets/scripts/amd/require.config.js</code>

```javascript
require.config({
    paths: {
        async: 'requirejs.async',
        coordinatespicker: '../CoordinatesPicker',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min',
        googlemaps: 'https://maps.google.com/maps/api/js?sensor=false&amp;language=ru'
    }
});

define('googlemaps', ['async!googlemaps'], function() {
    return window.google;
});
```

Part of <code>/assets/scripts/amd/main.js</code> file

```javascript
require(['jquery', 'googlemaps', 'coordinatespicker'], function($, google, coordinatesPicker) {
    // look "Usage example"
});
```

Usage example
-------------

Part of <code>index.html</code> file

```html
<form id="institution-form">
    <select id="country" name="country" class="address-part">
        <option value="">Country</option>
        <option value="1">Russia</option>
        <option value="2">USA</option>
        <option value="3">Poland</option>
        <option value="4">Kazakhstan</option>
        <option value="5">Mongolia</option>
    </select>
    <input type="text" id="city" name="city" class="address-part" placeholder="City"/>
    <input type="text" id="street" name="street" class="address-part" placeholder="Street"/>
    <input type="text" id="house" name="house" class="address-part" placeholder="Apartment"/>
    <input type="text" id="coordinates" name="coordinates" readonly/>
</form>

<div>
    <div style="width: 500px; height: 500px;"></div>
</div>
```

Using module in <code>/assets/scripts/main.js</code> or <code>/assets/scripts/amd/main.js</code> file

```javascript
// If you are using AMD, you must replace BarinBritva.CoordinatesPicker with name 
// given in dependency. In this example it is coordinatesPicker.
var coordinatesPicker = new BarinBritva.CoordinatesPicker({
    fields: $('.address-part'),
    container: $('#map'),
    coordinates: $('#coordinates'),
    format: 'lng,lat',
    center: new google.maps.LatLng(53.517, 49.417),
    zooms: {
        initial: 9,
        country: 11,
        locality: 14,
        route: 16,
        street_address: 18
    },
    marker: {
        draggable: true,
        animation: null,
        icon: '/assets/images/marker.png'
    },
    map: {
        disableDefaultUI: false
    }
});
```

Demo
----

You can see demo example <a href="http://coordinatespicker.demo.barinbritva.ru" target=“_blank">in here</a>.
