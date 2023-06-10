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
    tipsListElement = document.getElementById('tipsList');
    tipsListElement.innerHTML = '';

  tipsList.forEach(function (tip) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="tip-dica">' + tip.dica + '</span> (material: '+tip.material+') <button class="delete-button" onclick="deleteTip(' + tip.id + ')">Excluir</button>';
    tipsListElement.appendChild(listItem);
  });
}


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

    function showHorarios() {
      var collectionTimesList = document.getElementById("collectionTimesList");
      collectionTimesList.innerHTML = "";

      // Exemplo de horários de coleta por bairro
      var collectionTimes = [
        { bairro: "Bairro A", horarios: ["Segunda-feira (07:00)", "Quinta-feira (07:00)"] },
        { bairro: "Bairro B", horarios: ["Terça-feira (07:00)", "Sexta-feira (07:00)"] },
        { bairro: "Bairro C", horarios: ["Terça-feira (08:00)", "Quarta-feira (08:00)"] },
        { bairro: "Bairro D", horarios: ["Quarta-feira (07:00)", "Sábado (07:00)"] },
        { bairro: "Bairro E", horarios: ["Segunda-feira (08:00)", "Quinta-feira (08:00)"] }
      ]; 

      //alteração para o botao poder esconder a lista tambem
      if (collectionTimesList.style.display === "none") {
        collectionTimesList.innerHTML = "";

        // Para cada bairro, adiciona um item à lista
        collectionTimes.forEach(function(time) {
          var listItem = document.createElement("li");
          listItem.innerHTML = time.bairro + ": " + time.horarios.join(", ");
          collectionTimesList.appendChild(listItem);
        });

        collectionTimesList.style.display = "block";
        //altera o texto do botao
        var verHorariosBtn = document.getElementById("verHorariosBtn");
        verHorariosBtn.innerText = "Fechar";
      } else {
        collectionTimesList.style.display = "none";
        //altera o texto do botao
        var verHorariosBtn = document.getElementById("verHorariosBtn");
        verHorariosBtn.innerText = "Ver Horários";
      }
    }  

 