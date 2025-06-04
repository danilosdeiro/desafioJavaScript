let carArr = [];

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }
}

function GetCarArrPosition(arr, carClass) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nome === carClass.nome) {
            return i;
        }
    }
    return -1;
}

function SetCarToCompare(el, carClass) {
    if (!(carClass instanceof Car)) {
        console.error("O objeto fornecido não é uma instância da classe Car.");
        return;
    }

    const position = GetCarArrPosition(carArr, carClass);

    if (el.checked) {

        if (position === -1) {
            if (carArr.length < 2) {
                carArr.push(carClass);
            } else {

                el.checked = false;

                showCustomAlert("Você já selecionou 2 carros para comparação. Desmarque um para selecionar outro.");
            }
        }
    } else {

        if (position !== -1) {
            carArr.splice(position, 1);
        }
    }
}

function ShowCompare() {
    if (carArr.length < 2) {
        showCustomAlert("Precisa marcar 2 carros para apresentar a comparação.");
        return;
    }

    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

function HideCompare() {
    document.getElementById("compare").style.display = "none";
}

function UpdateCompareTable() {
    if (carArr.length < 2) return;

    const car1 = carArr[0];
    const car2 = carArr[1];

    const formatPrice = (price) => {
        return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // document.getElementById("compare_image_0").innerHTML = `<img src="img/${car1.image}" alt="${car1.nome}" style="width:150px; height:auto; border-radius: 8px;">`;
    // document.getElementById("compare_image_1").innerHTML = `<img src="img/${car2.image}" alt="${car2.nome}" style="width:150px; height:auto; border-radius: 8px;">`;

    document.getElementById("compare_modelo_0").innerText = car1.nome;
    document.getElementById("compare_modelo_1").innerText = car2.nome;

    document.getElementById("compare_alturacacamba_0").innerText = car1.alturaCacamba + " mm";
    document.getElementById("compare_alturacacamba_1").innerText = car2.alturaCacamba + " mm";

    document.getElementById("compare_alturaveiculo_0").innerText = car1.alturaVeiculo + " mm";
    document.getElementById("compare_alturaveiculo_1").innerText = car2.alturaVeiculo + " mm";

    document.getElementById("compare_alturasolo_0").innerText = car1.alturaSolo + " mm";
    document.getElementById("compare_alturasolo_1").innerText = car2.alturaSolo + " mm";

    document.getElementById("compare_capacidadecarga_0").innerText = car1.capacidadeCarga + " Kg";
    document.getElementById("compare_capacidadecarga_1").innerText = car2.capacidadeCarga + " Kg";

    document.getElementById("compare_motor_0").innerText = car1.motor;
    document.getElementById("compare_motor_1").innerText = car2.motor;

    document.getElementById("compare_potencia_0").innerText = car1.potencia + " cv";
    document.getElementById("compare_potencia_1").innerText = car2.potencia + " cv";

    document.getElementById("compare_volumecacamba_0").innerText = car1.volumeCacamba + " L";
    document.getElementById("compare_volumecacamba_1").innerText = car2.volumeCacamba + " L";

    document.getElementById("compare_roda_0").innerText = car1.roda;
    document.getElementById("compare_roda_1").innerText = car2.roda;

    document.getElementById("compare_preco_0").innerText = formatPrice(car1.preco);
    document.getElementById("compare_preco_1").innerText = formatPrice(car2.preco);
}

function showCustomAlert(message) {
    const existingAlert = document.getElementById('customAlert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertBox = document.createElement('div');
    alertBox.id = 'customAlert';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '20px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '20px';
    alertBox.style.backgroundColor = '#f8d7da';
    alertBox.style.color = '#721c24';
    alertBox.style.border = '1px solid #f5c6cb';
    alertBox.style.borderRadius = '8px';
    alertBox.style.zIndex = '10000';
    alertBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    alertBox.style.textAlign = 'center';

    const messageP = document.createElement('p');
    messageP.innerText = message;
    messageP.style.margin = '0 0 10px 0';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Fechar';
    closeButton.style.padding = '8px 15px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#004085';
    closeButton.style.color = 'white';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        alertBox.remove();
    };

    alertBox.appendChild(messageP);
    alertBox.appendChild(closeButton);
    document.body.appendChild(alertBox);

    setTimeout(() => {
        if (document.getElementById('customAlert')) {
            document.getElementById('customAlert').remove();
        }
    }, 5000);
}
