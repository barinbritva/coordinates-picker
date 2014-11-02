coordinates-picker
==================

Данный модуль позволяет отобразить на карте (Google Maps) местоположение введённого адреса, а так же сохранить координаты найденного места в отдельное поле в произвольном формате.

Параметры
-------------

<table>
    <tr>
        <th>Параметр</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>fields*</td>
        <td>jQuery</td>
        <td>Поля формы из которых составляется адрес. Конечный адрес получается путём конкатенации полей выборки, разделяемых запятой.</td>
    </tr>
    <tr>
        <td>container*</td>
        <td>jQuery</td>
        <td>Элемент <code>div</code> в котором будет отображаться карта.</td>
    </tr>
    <tr>
        <td>coordinates*</td>
        <td>jQuery</td>
        <td>Поле формы, в которое будут помещаться координаты адреса. Если данное поле в момент инициализации содержит данные, то место по этим координатам будет показано и отмечено маркером.</td>
    </tr>
    <tr>
        <td>format</td>
        <td>string</td>
        <td>Формат, в котором координаты буду сохраняться в текстовом поле. По умолчанию установлен формат <code>lng lat</code>, где: <code>lat</code> - широта, <code>lng</code> - долгота. Данный формат позволяет легко подготовить поле для его сохранения в СУБД как объект POINT: <code>PointFromText('POINT(".$coordinates.")')</code>.</td>
    </tr>
    <tr>
        <td>center</td>
        <td>google.maps.LatLng|Array</td>
        <td>Координаты центра при инициализации карты. Используются, если при инициализации модуля все поля адреса и поле координат являются пустыми.</td>
    </tr>
    <tr>
        <td>selectValue</td>
        <td>boolean</td>
        <td>По умолчанию плагин берёт значение для элементов select не методом <code>val()</code>, а извлекает текст из выбранной опции. Так сделано потому, что в большинстве случаев тэг <code>option</code> в атрибуте <code>value</code> содержит некие идентификаторы, а не отображаемые значения.  Например: <code>&lt;option value="1">Россия&lt;/option></code>. Установка этого параметра в <code>false</code> отменяет такое поведение.</td>
    </tr>
    <tr>
        <td>zooms</td>
        <td>object</td>
        <td>Объект значений уровней мастабов, который может содержать свойства: <ul><li><code>initial</code> (инициализация),</li><li><code>country</code> (точность до страны),</li><li><code>locality</code> (точность до города)</li><li><code>route</code> (точность до улицы),</li><li><code>street_address</code> (точность до дома).</li></ul></td>
    </tr>
    <tr>
        <td>marker</td>
        <td>object</td>
        <td>Объект <a href="https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions" target="_blank">параметров для маркера</a>. (Параметры соответствуют Google Maps API).</td>
    </tr>
    <tr>
        <td>map</td>
        <td>object</td>
        <td>Объект <a href="https://developers.google.com/maps/documentation/javascript/reference#MapOptions" target="_blank">параметров для карты</a>. (Параметры соответствуют Google Maps API).</td>
    </tr>
</table>

Методы
-------
<table>
    <tr>
        <th>Метод</th>
        <th>Возвращаемое значение</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>getMap()</td>
        <td>google.maps.Map</td>
        <td>Возвращает <a href="https://developers.google.com/maps/documentation/javascript/reference#Map" target="_blank">объект карты</a>.</td>
    </tr>
    <tr>
        <td>getMarker()</td>
        <td>google.maps.Marker|null</td>
        <td>Возвращает <a href="https://developers.google.com/maps/documentation/javascript/reference#Marker" target="_blank">объект маркера</a> (если маркера не существует, возвращается <code>null</code>).</td>
    </tr>
    <tr>
        <td>getPosition()</td>
        <td>google.maps.LatLng|null</td>
        <td>Возвращает <a href="https://developers.google.com/maps/documentation/javascript/reference#LatLng" target="_blank">объект широты и долготы</a> или <code>null</code>.</td>
    </tr>
    <tr>
        <td>getPoint(format)</td>
        <td>string</td>
        <td>Возвращает координаты найденной точки в указаном формате. Если необязательный параметр <code>format</code> не передан, то координаты форматируются в соответствии с настройками формата при инициализации. (Может быть пустой строкой, если маркера не существует).</td>
    </tr>
</table>

События
-------
<table>
    <tr>
        <th>Событие</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>viewchange</td>
        <td>Событие срабатывает после смены вида карты (масштаба и/или центра). Ручное манипулирование картой не учитывается.</td>
    </tr>
    <tr>
        <td>coordschange</td>
        <td>Событие срабатывает после определения/изменения координат указанного места. Событие содержит свойства <code>marker</code> и <code>position</code>.</td>
    </tr>
    <tr>
        <td>geocodingstart</td>
        <td>Событие срабатывает во время запуска процесса геокодирования, которое в свою очередь запускается после каждого изменения адресного поля. Событие содержит свойство <code>address</code>.</td>
    </tr>
    <tr>
        <td>geocodingend</td>
        <td>Событие срабатывает по завершении процесса геокодирования. Событие содержит свойство <code>address</code>. Так же событие содержит свойства <code>status</code> и <code>results</code>.</td>
    </tr>
</table>

Свойства событий
----------------
<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Событие</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>map</td>
        <td>google.maps.Map</td>
        <td>все события</td>
        <td>Объект карты <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Map" target="_blank">google.maps.Map</a></code></td>
    </tr>
    <tr>
        <td>mapCenter</td>
        <td>google.maps.LatLng</td>
        <td>все события</td>
        <td>Объект широты и долготы <code><a href="https://developers.google.com/maps/documentation/javascript/reference#LatLng" target="_blank">google.maps.LatLng</a></code></td>
    </tr>
    <tr>
        <td>mapZoom</td>
        <td>integer</td>
        <td>все события</td>
        <td>Текущий уровень масштаба</td>
    </tr>
    <tr>
        <td>marker</td>
        <td>google.maps.Marker|null</td>
        <td>coordschange</td>
        <td>Объект маркера <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Marker" target="_blank">google.maps.Marker</a></code> или <code>null</code></td>
    </tr>
    <tr>
        <td>position</td>
        <td>google.maps.LatLng|null</td>
        <td>coordschange</td>
        <td>Объект широты и долготы <code><a href="https://developers.google.com/maps/documentation/javascript/reference#LatLng" target="_blank">google.maps.LatLng</a></code> или <code>null</code></td>
    </tr>
    <tr>
        <td>address</td>
        <td>string</td>
        <td>geocodingstart, geocodingend</td>
        <td>Адрес для начатого или завершённого процесса геокодирования.</td>
    </tr>
    <tr>
        <td>status</td>
        <td>string</td>
        <td>geocodingend</td>
        <td>Статус процесса геокодирования. Соответствует свойству <code>status</code> объекта <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Geocoder" target="_blalnk">google.maps.Geocoder</a></code>.</td>
    </tr>
    <tr>
        <td>results</td>
        <td>object</td>
        <td>geocodingend</td>
        <td>Результаты процесса геокодирования. Соответствует свойству <code>results</code> объекта <code><a href="https://developers.google.com/maps/documentation/javascript/reference#Geocoder" target="_blalnk">google.maps.Geocoder</a></code>.</td>
    </tr>
</table>

Примеры подключения
--------------------
Для наглядности в примерах будет использоваться следующая структура проекта:

    ├── assets
    │   ├── images
    │   │   └── marker.png
    │   └── scripts
    │       ├── amd
    │       │   ├── main.js
    │       │   ├── require.config.js
    │       │   └── requirejs.async.js
    │       ├── CoordinatesPicker.js
    │       └── main.js
    └── index.php


Модуль имеет зависимости от jQuery и Google Maps, так же модуль поддерживает AMD загрузку. Поэтому подключение модуля может осуществляться одним из двух способов:

### Обычный способ ###

Фрагмент файла <code>index.html</code>

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&amp;language=ru"></script>
<script type="text/javascript" src="/assets/scripts/CoordinatesPicker.js"></script>
<script type="text/javascript" src="/assets/scripts/main.js"></script>
```

### AMD (используя RequireJS) ###

Фрагмент файла <code>index.html</code>

```html
<script data-main="/assets/scripts/amd/main" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js"></script>
<script src="/assets/scripts/amd/require.config.js"></script>
```

Файл <code>/assets/scripts/amd/require.config.js</code>

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

Фрагмент файла <code>/assets/scripts/amd/main.js</code>

```javascript
require(['jquery', 'googlemaps', 'coordinatespicker'], function($, google, coordinatesPicker) {
  // см. "Пример использования"
});
```

Пример использования
--------------------

Фрагмент файла <code>index.html</code>

```html
<form id="institution-form">
	<select id="country" name="country" class="address-part">
		<option value="">Страна</option>
		<option value="1">Россия</option>
		<option value="2">США</option>
		<option value="3">Польша</option>
		<option value="4">Казахстан</option>
		<option value="5">Монголия</option>
	</select>
	<input type="text" id="city" name="city" class="address-part" placeholder="Город"/>
	<input type="text" id="street" name="street" class="address-part" placeholder="Улица"/>
	<input type="text" id="house" name="house" class="address-part" placeholder="Дом"/>
	<input type="text" id="coordinates" name="coordinates" readonly/>
</form>

<div>
	<div style="width: 500px; height: 500px;"></div>
</div>
```

Использование модуля в файле <code>/assets/scripts/main.js</code> или <code>/assets/scripts/amd/main.js</code>

```javascript
// При AMD загрузке вместо BarinBritva.CoordinatesPicker необходимо использовать имя, 
// данное при объявлении зависимости, в даннном примере - coordinatesPicker
var coordinatesPicker = new BarinBritva.CoordinatesPicker({
  fields: $('.address-part'),
  container: $('#map'),
  coordinates: $('#coordinates'),
  format: 'lng,lat',
  center: new google.maps.LatLng(53.517, 49.417),
  zooms: {initial: 9, country: 11, locality: 14, route: 16, street_address: 18},
  marker: {draggable: true, animation: null, icon: '/assets/images/marker.png'},
  map: {disableDefaultUI: false}
});
```

Демо
----
Демо модуля можно посмотреть <a href="http://coordinatespicker.demo.barinbritva.ru" target="_blank">здесь</a>.
