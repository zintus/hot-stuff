      var map, heatmap;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 59.945727, lng: 30.315571},
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map,
          maxIntensity: 10,
          radius: 20
        });
      }

      function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

      function changeGradient() {
        var gradient = [
          'rgba(255, 150, 0, 0)',
          'rgba(255, 150, 0, 0.8)',
          'rgba(255, 150, 0, 0.9)',
          'rgba(255, 150, 0, 1)',
          'rgba(115, 208, 66, 1)',
          'rgba(0, 181, 81, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      }

      function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 20);
      }

      function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      }

      function getPoints() {
          let venues = [].concat(...venueData.response.groups.map(x => x.items)).map(x => x.venue);
          return venues.map(venue => { 
               return { 
                    location : new google.maps.LatLng(venue.location.lat, venue.location.lng),
                    weight : venue.rating
               };
          });
      }