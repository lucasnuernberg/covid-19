
const result = document.getElementById('res');
const selectElement = document.getElementById('selectUf');
const apiDada = JSON.parse(getApi('https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true'));

window.onload = () => {
    let i = 0;
    let resStates = document.getElementById('optionStates');
    apiDada['infectedByRegion'].forEach(element => {
        resStates.innerHTML += `<option value="${i}">${element['state']}</option>`
        i++
    });
}

function getApi(url) {
    var resquest = new XMLHttpRequest();
    resquest.open("GET", url, false);
    resquest.send();
    return resquest.response;
};

function showResult() {

    result.innerHTML = 'Carregando dados...'

    let apiDada = JSON.parse(getApi('https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true'));

    let selected = parseInt(document.getElementById('selectUf').value);

    //Coleta de dados sobre o covid da api
    let totalInfected = apiDada['infected'];
    let totalDeaths = apiDada['deceased'];
    let totalRecouvered = apiDada['recovered'];            
    let uf = apiDada['infectedByRegion'][selected]['state'];
    let infectedUf = apiDada['infectedByRegion'][selected]['count'];
    //Formatando horário
    let index = (apiDada['lastUpdatedAtSource'].indexOf('T'));
    let data = apiDada['lastUpdatedAtSource'].substring(0, index);

    //Calculando porcentagem
    let percentageIfected =  (infectedUf * 100) / totalInfected;
    let percentageRecovered = (totalRecouvered * 100) / totalInfected;
    let percentageDeaths = (totalDeaths * 100) / totalInfected;

    result.innerHTML = `
    <div class="frame">
        <h3><b>TOTAL INFECTIONS IN BRASIL</b></h3>
        <div class="dados">
            <p>${(totalInfected).toLocaleString('pt-BR')}</p>
        </div>
    </div>

    <div class="frame">   
        <h3><b>TOTAL INFECTIONS IN <span>${uf}</span></b></h3>
        <div class="dados">
            <p>${(infectedUf).toLocaleString('pt-BR')}</p>
        </div>
    </div>

    <div class="frame">
        <h3><b>PERCENTAGE OF INFECTIONS IN <span>${uf}</span> BRASIL RELATIONSHIP</b></h3>
        <div class="dados">
            <p>${percentageIfected.toFixed(2)}%</p>
        </div>
    </div>

    <div class="frame">
        <h3><b>PERCENTAGE OF RECOVERED IN BRASIL</b></h3>
        <div class="dados">
            <p>${percentageRecovered.toFixed(2)}%</p>
        </div>
        </div>
    <div class="frame">
        <h3><b>PERCENTAGE OF DEATHS IN BRASIL</b></h3>
        <div class="dados">
            <p>${percentageDeaths.toFixed(2)}%</p>
        </div>
    </div>
    <p>Last Update: ${data}</p>
    `;
};