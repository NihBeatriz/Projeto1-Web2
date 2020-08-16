const vetCidade = [];
const listEl = document.getElementById('resultado');

document.querySelector('button').addEventListener('click', function () {
    document.getElementById('validacao').style.display = 'none';
    var cidade = document.getElementById('cidade').value;
    
    if (cidade.length < 3) {
        document.getElementById('cidade').value = '';
        document.getElementById('validacao').style.display = 'block';
        return;
    }

    startCarregar();
    var chamadaApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cidade + '&appid=83a9db599874d9f5683e2016c92ae339';

    axios.get(chamadaApi).then(function (res) {
        document.getElementById('cidValidacao').style.display = 'none';
        salvaArray(res);
    }).catch(error => {
        document.getElementById('cidValidacao').style.display = 'block';
        return;
    })
        .finally(() => endCarregar(),
        document.getElementById('cidade').value = '');
});

function mostraResultado() {
        
    document.getElementById('resultado').innerHTML = '';
    let tamanho = vetCidade.length;

    listEl.value = '';

    vetCidade.forEach(element => {

        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', element.link_url);

        let divResult = document.createElement('div');
        divResult.setAttribute('id', 'descricao');

        let titleEl = document.createElement('strong');
        titleEl.appendChild(document.createTextNode(element.cidade));

        let descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(element.description));

        let listItem = document.createElement('li');
        listItem.appendChild(imgEl);
        divResult.appendChild(titleEl);
        divResult.appendChild(descriptionEl);
        listItem.appendChild(divResult);

        listEl.appendChild(listItem);
    });
}

function startCarregar() {
    // Exibe a div de carregamento
    document.getElementById('carregar').style.display = 'block';
}

function endCarregar() {
    // Oculta a div de preloader
    document.getElementById('carregar').style.display = 'none';
}

function salvaArray(res) {
    vetCidade.push({
        cidade: res.data.name,
        description: res.data.weather[0].description,
        link_url: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
    });
    
    mostraResultado();
}