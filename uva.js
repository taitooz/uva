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
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "text/html; charset=utf-8");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    return response;
};


var usValue = 17.23;
var pocketMoney = 23000;
var result = calculator(pocketMoney);

url = url.replace("#propCost#", (result.propertyCost * usValue));
url = url.replace("#loan#", (result.loan * usValue));
console.log(url);
let response = callBank(url);

