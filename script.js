  //adiciona dica
  function addTip(){
    var material = document.getElementById("materialSelect");
    var dica = document.getElementById("dicaInput");

    if(material.value && dica.value){
    var storedTips = localStorage.getItem("storedTips");
    var arrayValues = storedTips ? JSON.parse(storedTips) : [];
    /*código verifica o comprimento da matriz valuesArray usando operador ternário. 
    Se ela não estiver vazia, o ID do novo objeto será o ID do último objeto mais 1. 
    Caso contrário, o ID será definido como 1.*/
    var id = arrayValues.length > 0 ? arrayValues[arrayValues.length - 1].id + 1 : 1;

    var newTip = {id: id, material: material.value, dica: dica.value};

    arrayValues.push(newTip);
    localStorage.setItem("storedTips", JSON.stringify(arrayValues));

    renderTipsList();
  } else{
    alert("Por favor, preencha todos os campos!");
  }
}

function getTipsList(){
    var storedList = JSON.parse(localStorage.getItem('tipsList'));
    tipsList = storedList || [];
}

//função obtem a lista, obtem os valores do localStorage, converte para uma matriz e cria li
function renderTipsList(){
  var tipsListElement = document.getElementById('tipsList');
  tipsListElement.innerHTML = "";

  var storedTips = localStorage.getItem("storedTips");
  if(storedTips){
    var arrayValues = JSON.parse(storedTips);
    arrayValues.forEach(function (tip) {
      var listItem = document.createElement('li');

      switch (tip.material) {
  case "papel":
    listItem.innerHTML = "<li class='papel'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "plastico":
    listItem.innerHTML = "<li class='plastico'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "vidro":
    listItem.innerHTML = "<li class='vidro'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "metal":
    listItem.innerHTML = "<li class='metal'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "organico":
    listItem.innerHTML = "<li class='organico'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
}

      tipsListElement.appendChild(listItem);
    });
  }
}

// Exclui dica por meio do id
  function deleteTip(tipId) {
    var storedTips = localStorage.getItem("storedTips");

    if(storedTips){
      var arrayValues = JSON.parse(storedTips);
      var index = arrayValues.findIndex(function(tip){
        return tip.id === tipId;
      });

      if (index !== -1){
        arrayValues.splice(index, 1);
        localStorage.setItem("storedTips", JSON.stringify(arrayValues));
        renderTipsList();
        renderFilteredTips();
      } else{
        alert('Dica não encontrada');
      }
    }
  }

    getTipsList();
    renderTipsList();

    function showHorarios() {
      var collectionTimesList = document.getElementById("collectionTimesList");
      collectionTimesList.innerHTML = "";

      var collectionTimes = [
        { bairro: "Primavera", horarios: ["Segunda-feira (07:00)", "Quarta-feira (07:00)", "Sexta-feira(07:00"] },
        { bairro: "Cristo Rei", horarios: ["Terça-feira (07:00)", "Quinta-feira (07:00)", "Sabado(07:00"] },
        { bairro: "Novo Bandeirantes", horarios: ["Segunda-feira (16:00)", "Quarta-feira (16:00)", "Sexta-feira(16:00"] },
        { bairro: "Jardom Morumbi", horarios: ["Terça-feira (16:00)", "Quinta-feira (16:00)", "Sabado(16:00"] },
        { bairro: "Centro", horarios: ["Segunda-feira (18:00) a Sabado (18:00)"] }
      ]; 

      //alteração para o botao poder esconder a lista tambem
      if (collectionTimesList.style.display === "none") {
        collectionTimesList.innerHTML = "";

        //adiciona cada bairro à lista
        collectionTimes.forEach(function(time) {
          var listItem = document.createElement("li");
          listItem.innerHTML = time.bairro + ": " + time.horarios.join(", ");
          collectionTimesList.appendChild(listItem);
        });

        collectionTimesList.style.display = "block";
        //altera o texto do botao
        var verHorariosBtn = document.getElementById("verHorariosBtn");
        verHorariosBtn.innerText = "Esconder";
      } else {
        collectionTimesList.style.display = "none";
        //altera o texto do botao
        var verHorariosBtn = document.getElementById("verHorariosBtn");
        verHorariosBtn.innerText = "Ver Horários";
      }
    }  

function filterTips() {
  var materialFilter = document.getElementById("materialFilter");
  var selectedMaterial = materialFilter.value;
  var filteredTips = [];

  var storedTips = localStorage.getItem("storedTips");
  if (storedTips) {
      var arrayValues = JSON.parse(storedTips);
      filteredTips = arrayValues.filter(function(tip) {
          return tip.material === selectedMaterial;
      });
  }

  var filterTipsElement = document.getElementById("filterTips");

  //remove os itens da lista anterior toda vez que um novo material é selecionado
  while (filterTipsElement.firstChild) {
      filterTipsElement.removeChild(filterTipsElement.firstChild);
  }

  renderFilteredTips(filteredTips);

  //resolve o problema da lista aparecer mesmo sem um material ser selecionando
  //no html o style esta "display: none"
  filterTipsElement.style.display = "block";

}

// mostra as dicas de acordo com o material selecionado
function renderFilteredTips(tips) {
  var filterTipsElement = document.getElementById("filterTips");
  filterTipsElement.innerHTML = "";

  tips.forEach(function(tip) {
      var listItem = document.createElement("li");
            switch (tip.material) {
  case "papel":
    listItem.innerHTML = "<li class='papel'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "plastico":
    listItem.innerHTML = "<li class='plastico'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "vidro":
    listItem.innerHTML = "<li class='vidro'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "metal":
    listItem.innerHTML = "<li class='metal'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
  case "organico":
    listItem.innerHTML = "<li class='organico'>" + tip.dica + '<button class="delete-button" onclick="deleteTip(' + tip.id + ')">X</button> </li>';
    break;
}
      filterTipsElement.appendChild(listItem);
  });
}

renderFilteredTips(JSON.parse(localStorage.getItem("storedTips")));

document.getElementById('tipForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var material = document.getElementById("materialSelect");
  var dica = document.getElementById("dicaInput");

  dica.value = '';
  material.value = '';
});
