import initChart from './chart';
export default async () => {

    const mapEl = document.getElementById('map');
    if (mapEl) {
        try {
            const L = await import('leaflet');
            await import('leaflet-gesture-handling');

            const map = L.map(mapEl, {
                center: [54.4526626, 17.0398293],
                zoom: 9,
                gestureHandling: true
            });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                minZoom: 2,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            let marker=null;
            map.on('click', function(e){
                if (marker!=null) {
                    map.removeLayer(marker);
                }
                marker = new L.marker(e.latlng).addTo(map);
                initChart(e.latlng.lat, e.latlng.lng);})

        } catch (error) {
            console.log(error);
        }
    }
};
