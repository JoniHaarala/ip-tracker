const btnBuscar = document.getElementById('btnBuscar')

const address = document.getElementById('address')
const loc = document.getElementById('location')
const timeZone = document.getElementById('timezone')
const isp = document.getElementById('isp')


const getInitUbi = async (ubi) => {
    try {

        let getIp = document.getElementById('iptext').value

        if (ubi === undefined || ubi === '') {
            const res1 = await fetch('https://api.ipify.org?format=json')
            const datos1 = await res1.json()
            const ip = await datos1.ip;

            const res2 = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_C78Gxcv1hHlX7aPWfFgoYVXEfwMx8&ipAddress=` + ip)
            const datos2 = await res2.json()
            console.log(datos2)
            const ubi = await datos2.location;
            const infoIp = await datos2.ip;
            const infoIsp = await datos2.isp;

            console.log(ubi);
            const lat = ubi.lat;
            const long = ubi.lng;
            console.log(lat, long);

            const fragment = document.createDocumentFragment();

            address.textContent = infoIp
            isp.textContent = infoIsp
            loc.textContent = ubi.city + ', ' + ubi.country
            timeZone.textContent = 'UTC ' + ubi.timezone;

            /* Creamos el div del mapa */
            const div_mapa = document.createElement("div");
            div_mapa.setAttribute('id', 'map');
            fragment.appendChild(div_mapa)
            document.body.appendChild(fragment);

            let map = L.map('map').setView([lat, long], 14);
            let gl = L.mapboxGL({
                attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
                style: 'https://api.maptiler.com/maps/basic/style.json?key=ygF3GfNGpfuVuX0kZOz1'
            }).addTo(map);
            let marker = L.marker([lat-0.003, long]).addTo(map);
            var popup = L.popup()
                .setLatLng([lat, long])
                .setContent("Your Current IP location")
                .openOn(map);
        }
        else {
            const res2 = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_C78Gxcv1hHlX7aPWfFgoYVXEfwMx8&ipAddress=` + getIp)
            const datos2 = await res2.json()
            const ubi = await datos2.location;

            const fragment = document.createDocumentFragment();

            console.log(ubi);
            const lat = ubi.lat;
            const long = ubi.lng;
            console.log(lat, long);

            /* Creamos el div del mapa */
            const div_mapa = document.createElement("div");
            div_mapa.setAttribute('id', 'map');
            fragment.appendChild(div_mapa)
            document.body.appendChild(fragment);

            let map = L.map('map').setView([lat, long], 14);
            let gl = L.mapboxGL({
                attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
                style: 'https://api.maptiler.com/maps/basic/style.json?key=ygF3GfNGpfuVuX0kZOz1'
            }).addTo(map);
            let marker = L.marker([lat, long]).addTo(map);
        }
    }

    catch (error) {
        console.log(error)
    }
}
getInitUbi()
console.log(getInitUbi())

const deleteChild = () => {
    document.body.removeChild(document.getElementById('map'));
};

btnBuscar.addEventListener('click', async () => {
    let getIp = document.getElementById('iptext').value
    console.log(getIp)
    deleteChild()
    getInitUbi(getIp)
})


// url para api de localizacion
// https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_C78Gxcv1hHlX7aPWfFgoYVXEfwMx8&ipAddress=8.8.8.8