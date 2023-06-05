// Criar uma lista vazia de pacientes
var tipsList = [];
var count = 1;

  function addTip(material, dica){
    var newTip = {id:count++, material: material, dica:dica};
    /*var materialSelect = document.getElementById("materialSelect");
    var material = materialSelect.value;
  
    // Verificar se um material foi selecionado
    if (material === "") {
      alert("Selecione o material.");
      return;
    }*/

    tipsList.push(newTip);
    localStorage.setItem('tipsList', JSON.stringify(tipsList));

    renderTipsList();
  }

function getTipsList(){
    var storedList = JSON.parse(localStorage.getItem('tipsList'));
    tipsList = storedList || [];
}  

function renderTipsList(){
    tipsListElement = documente.getElementById('tipsList');
    tipsListElement.innerHTML = '';

  tipsList.forEach(function (tip) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="tip-dica">' + tip.dica + '</span> (material: '+tip.material+') <button class="delete-button" onclick="deleteTip(' + tip.id + ')">Excluir</button>';
    tipsListElement.appendChild(listItem);
  });
}

/*// Função para inicializar a lista de dicas cadastradas
function initializeTipsList() {
  var tips = localStorage.getItem("tips");
  if (tips) {
    tips = JSON.parse(tips);
    tips.forEach(function (tip) {
      var listItem = document.createElement("li");
      listItem.innerHTML = tip.dica;
      listItem.classList.add(tip.material);
      tipsList.appendChild(listItem);
    });
  }
}

// Obtem referência à lista de dicas
var tipsList = document.getElementById("tipsList");

initializeTipsList();*/

// Exclui dica
function deleteTip(tipId) {
    var updateTipsList = tipsList.filter(function(tip){
        return tip.id !== tipId;
    });
    if(updateTipsList.length < tipsList.length){
        tipsList = updateTipsList;
        localStorage.setItem('tipsList', JSON.stringify(tipsList));
        renderTipsList();
    } else{
        alert('Dica não encontrada');
    }
  }

    getTipsList();
    renderTipsList();