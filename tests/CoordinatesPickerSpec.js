// Fixtures fix
jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';

// Extends class for specific use
var extendedPrototype = {
	getCache: function() {
		return this._cache;
	},

	getCacheLength: function() {
		return Object.keys(this._cache).length;
	},

	clearCache: function() {
		this._cache = {};
	},

	getSetFormat: function() {
		return this._coordinatesFormat;
	},

	getSetCenter: function() {
		return this._defaultCoordinates;
	},

	getSetZoom: function(type) {
		return this._getZoomLevel(type);
	},

	getSetMarker: function(property) {
		property = property || null;
		return property === null ? this._markerParams : this._markerParams[property];
	},

	getSetMap: function(property) {
		property = property || null;
		return property === null ? this._mapParams : this._mapParams[property];
	}
};

BarinBritva.CoordinatesPicker.prototype = $.extend(BarinBritva.CoordinatesPicker.prototype, extendedPrototype);

// Tests
describe('CoordinatesPicker', function() {
	var coordinatesPicker = null,
			coordinatesPickerParams = null,
			map = null,
			country = null,
			city = null,
			street = null,
			house = null,
			coordinates = null;

	function prepareLayout() {
		loadFixtures('layout.html');

		map = $('#map');
		country = $('#country');
		city = $('#city');
		street = $('#street');
		house = $('#house');
		coordinates = $('#coordinates');

		coordinatesPickerParams = {
			fields: $('.address-part'),
			container: map,
			coordinates: coordinates
		};
	}

	function toFixed(number, precision) {
		return parseFloat(number.toFixed(precision));
	}

	function compareCoordinates(lat, lng, precision, position) {
		position = position || coordinatesPicker.getMap().getCenter();

		expect(toFixed(position.lat(), precision)).toBe(lat);
		expect(toFixed(position.lng(), precision)).toBe(lng);
	}

	describe('Initializations', function() {
		var initializations = 0;

		function checkNotEmptyInit(lat, lng) {
			var marker = coordinatesPicker.getMarker();

			compareCoordinates(lat, lng, 15);
			expect(marker instanceof google.maps.Marker).toBeTruthy();
			compareCoordinates(lat, lng, 15, marker.getPosition());
			checkCoordinatesField(lat, lng);
		}

		function checkCoordinatesField(lat, lng) {
			expect(coordinates).toHaveValue(lng+' '+lat);
		}

		beforeEach(function(done) {
			prepareLayout();

			if (initializations > 0) {
				country.val(1);
				city.val('Санкт-Петербург');
				street.val('Петроградская набережная');
				house.val('20');
			}

			if (initializations === 2) {
				coordinates.val('30.334525747360203 59.96000285452537');
			}

			coordinatesPicker = new BarinBritva.CoordinatesPicker(coordinatesPickerParams);

			setTimeout(function() {
				done();
			}, 600);
		});

		afterEach(function() {
			initializations++;
		});

		it('By default', function(done) {
			compareCoordinates(59.95, 30.317, 3);
			expect(coordinatesPicker.getMarker()).toBeNull();
			expect(coordinates).toHaveValue('');

			done();
		});

		it('By address', function(done) {
			checkNotEmptyInit(59.959976, 30.333763999999974);

			done();
		});

		it('By coordinates', function(done) {
			checkNotEmptyInit(59.96000285452537, 30.334525747360203);

			done();
		});
	});

	describe('Geo requests, cache', function() {
		var isFirstTest = true,
				iterations = 0,
				geocodings = 0,
				cache = 0,
				changes = null;

		function checkCacheLength() {
			expect(coordinatesPicker.getCacheLength()).toBe(cache);
		}

		beforeEach(function(done) {
			if (isFirstTest === true) {
				isFirstTest = false;
				prepareLayout();

				changes = [
					{
						field: country,
						value: 1,
						needRequest: true
					},
					{
						field: city,
						value: 'Тольятти',
						needRequest: true
					},
					{
						field: city,
						value: '',
						needRequest: false
					},
					{
						field: country,
						value: 2,
						needRequest: true
					},
					{
						field: city,
						value: 'New York',
						needRequest: true
					},
					{
						field: city,
						value: '',
						needRequest: false
					},
					{
						field: country,
						value: '',
						needRequest: false
					}
				];

				coordinatesPicker = new BarinBritva.CoordinatesPicker(coordinatesPickerParams);

				map.on('geocodingstart', function() {
					geocodings++;
				});

				coordinatesPicker.clearCache();
			}

			changes[iterations].field.val(changes[iterations].value).trigger('change');

			if (changes[iterations].needRequest === true) {
				cache++;
			}

			setTimeout(function() {
				done();
			}, 700);
		});

		afterEach(function() {
			iterations++;
		});

		it('Set Russia, check cache and requests', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(1);

			done();
		});

		it('Set Russia, Togliatti, check cache and requests', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(2);

			done();
		});

		it('Set Russia again, check cache and requests', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(2);

			done();
		});

		it('Set USA, check cache and requests', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(3);

			done();
		});

		it('Set USA, New York, check cache and requests', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(4);

			done();
		});

		it('Set USA again, check cache and requests', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(4);

			done();
		});

		it('Set nothing, check cache, requests and cache keys', function (done) {
			checkCacheLength();
			expect(geocodings).toBe(4);

			expect('Россия,Санкт-Петербург,Петроградская набережная,20' in coordinatesPicker.getCache()).toBeFalsy();
			expect('Россия' in coordinatesPicker.getCache()).toBeTruthy();
			expect('Россия,Тольятти' in coordinatesPicker.getCache()).toBeTruthy();
			expect('USA' in coordinatesPicker.getCache()).toBeTruthy();
			expect('USA,New York' in coordinatesPicker.getCache()).toBeTruthy();

			done();
		});
	});

	describe('Public methods', function() {
		it('getMap', function() {
			expect(coordinatesPicker.getMap() instanceof google.maps.Map).toBeTruthy();
		});

		it('getMarker', function() {
			expect(coordinatesPicker.getMarker() instanceof google.maps.Marker).toBeTruthy();
		});

		it('getPosition', function() {
			expect(coordinatesPicker.getPosition() instanceof google.maps.LatLng).toBeTruthy();
		});

		it('getPoint', function() {
			expect(coordinatesPicker.getPoint()).toBe('-95.71289100000001 37.09024');
			expect(coordinatesPicker.getPoint('lat lng')).toBe('37.09024 -95.71289100000001');
			expect(coordinatesPicker.getPoint('lat, lng')).toBe('37.09024, -95.71289100000001');
			expect(coordinatesPicker.getPoint('lng|lat')).toBe('-95.71289100000001|37.09024');
		});
	});

	describe('Settings override', function() {
		var isFirstTest = true,
				coordinatesPickerCustom = null,
				coordinatesPickerCustomParams = null;

		beforeEach(function(done) {
			if (isFirstTest === true) {
				isFirstTest = false;
				prepareLayout();

				coordinatesPicker = new BarinBritva.CoordinatesPicker(coordinatesPickerParams);

				coordinatesPickerCustomParams = $.extend(coordinatesPickerParams, {
					format: 'lat|lng',
					center: [30, 40],
					zooms: {
						initial: 6,
						country: 8,
						locality: 11,
						route: 16,
						street_address: 18
					},
					marker: {
						draggable: false
					},
					map: {
						disableDefaultUI: true
					}
				});

				coordinatesPickerCustom = new BarinBritva.CoordinatesPicker(coordinatesPickerParams);

				setTimeout(function() {
					done();
				}, 600);
			}
			else {
				done();
			}
		});

		it('Format', function(done) {
			expect(coordinatesPickerCustom.getSetFormat()).toBe('lat|lng');

			done();
		});

		it('Center', function(done) {
			var setCenter = coordinatesPickerCustom.getSetCenter();
			compareCoordinates(30, 40, 0, new google.maps.LatLng(setCenter.lat(), setCenter.lng()));

			done();
		});

		it('Zooms', function(done) {
			expect(coordinatesPickerCustom.getSetZoom('initial')).toBe(6);
			expect(coordinatesPickerCustom.getSetZoom('country')).toBe(8);
			expect(coordinatesPickerCustom.getSetZoom('locality')).toBe(11);
			expect(coordinatesPickerCustom.getSetZoom('route')).toBe(16);
			expect(coordinatesPickerCustom.getSetZoom('street_address')).toBe(18);

			done()
		});

		it('Marker', function() {
			expect(coordinatesPickerCustom.getSetMarker('draggable')).toBeFalsy();
		});

		it('Map', function() {
			expect(coordinatesPickerCustom.getSetMap('disableDefaultUI')).toBeTruthy();
		});
	});
});
