const express = require('express')
const http = require("http");
const https = require("https");
const rest = require("rest");
const app = express()
const port = 3000

app.get('/bna', (request, response) => {
    var options = {
        host: 'www.bna.com.ar',
        port: 80,
        path: '/Simulador/ImportesYTasas1Casa?destino=adq&plazo=360&tipoSeguro=-1&radioCliente=false&nombreSimulador=NacionUVAADQ&paquete=7&valorPropiedad=2377740&monto=1981450',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    rest.getJSON(options, function(statusCode, result) {
        // I could work with the result html/json here.  I could also just return it
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        res.statusCode = statusCode;
        res.send(result);
    });
    //response.send('Hello from Express!')
});

exports.getJSON = function(options, onResult) {
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});

