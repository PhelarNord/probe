import sensor from 'node-dht-sensor';

const url = 'ws://192.168.1.242:5000/ws'
const connection = new WebSocket(url);

connection.onopen(() => {
    console.log("Probe is connected to server");
    connection.send(readProbe());
})

connection.onclose((error) => {
    console.log("Probe failed to connect to server" + error);
})





export const readProbe = () => {

    const probeData = {temp: 0, hum: 0};

    setTimeout(()=>{
        sensor.read(11, 17, (err,temperature, humidity) => {
            if(!err) {
                probeData.temp = temperature;
                probeData.hum = humidity;
            } else {
                console.log(err);
            }
        })
    },5000)

    return probeData
}