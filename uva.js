var url = "http://www.bna.com.ar/Simulador/ImportesYTasas1Casa?destino=adq&plazo=360&tipoSeguro=-1&radioCliente=false&nombreSimulador=NacionUVAADQ&paquete=7&valorPropiedad=#propCost#&monto=#loan#";

var propertyCost = 0;
var loan = 0;
var extraCost = 0

var calculator = function(pocketMoney) {
    loan = (100 * pocketMoney) / 20;
    propertyCost = loan + pocketMoney;
    extraCost = (10 * propertyCost) / 100;
    var result = {};
    result.loan = loan;
    result.propertyCost = propertyCost;
    result.extraCost = extraCost;
    return result;
};

var callBank = function(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);

    /**var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "text/html; charset=utf-8");
    xhttp.send(null);**/
    //var response = JSON.parse(xhttp.responseText);
    console.log(response);
    return response;
};


var usValue = 17.23;
var pocketMoney = 0;
var result = calculator(pocketMoney);

url = url.replace("#propCost#", (result.propertyCost * usValue));
url = url.replace("#loan#", (result.loan * usValue));
console.log(url);
var response = callBank(url);

