class Contato {

    constructor(nome, email, telefone, tipoContato, mensagem) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
        this.mensagem = mensagem;
    }

    displayData() {
        console.log("--- Dados do Contato Recebidos ---");
        console.log(`Nome: ${this.nome}`);
        console.log(`Email: ${this.email}`);
        console.log(`Telefone: ${this.telefone}`);
        console.log(`Tipo de Contato: ${this.tipoContato}`);
        console.log(`Mensagem: ${this.mensagem}`);
        console.log("------------------------------------");
    }
}

function Post(formElement) {

    const nome = formElement.elements.namedItem("nome").value.trim();
    const email = formElement.elements.namedItem("email").value.trim();
    const telefone = formElement.elements.namedItem("telefone").value.trim();
    const tipoContato = formElement.elements.namedItem("tipoContato").value;
    const mensagem = formElement.elements.namedItem("mensagem").value.trim();

    if (!nome || !email || !telefone || !tipoContato || !mensagem) {
        showCustomFormAlert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showCustomFormAlert("Por favor, insira um endereço de e-mail válido.");
        return;
    }

    let dadosDoFormulario = new Contato(nome, email, telefone, tipoContato, mensagem);
    dadosDoFormulario.displayData();

    showCustomFormAlert(`Obrigado, ${nome}! Sua mensagem (${tipoContato}) foi recebida. Entraremos em contato em breve.`);
    formElement.reset();
}


function showCustomFormAlert(message) {
    const existingAlert = document.getElementById('customFormAlert');
    if (existingAlert) {
        existingAlert.remove();
    }


    const alertBox = document.createElement('div');
    alertBox.id = 'customFormAlert';
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '20px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '15px 20px';
    alertBox.style.backgroundColor = '#d4edda';
    alertBox.style.color = '#155724';
    alertBox.style.border = '1px solid #c3e6cb';
    alertBox.style.borderRadius = '8px';
    alertBox.style.zIndex = '10001';
    alertBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    alertBox.style.textAlign = 'center';
    alertBox.style.fontSize = '1em';

    alertBox.innerText = message; 

    document.body.appendChild(alertBox);


    setTimeout(() => {
        if (document.getElementById('customFormAlert')) {
            document.getElementById('customFormAlert').remove();
        }
    }, 6000);
}