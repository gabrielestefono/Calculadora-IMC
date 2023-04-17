//VARIÁVEIS
    // Variáveis do DOM
let altura = document.getElementById('height');
let peso = document.getElementById('weight');
let calculadora = document.getElementById('calc-container');
let calcular = document.getElementById('calc-btn');
let limpar = document.getElementById('clear-btn');
let resultado = document.getElementById('result-container');

    // Variáveis de usabilidade
let numeroOuNao = '';
let letrasInput;
let novo = '';
let alturastr;
let pesostr;
let resultadoIMC;


//  FUNÇÕES
    // Função de validação final
let validar = ()=>{
    if(altura.value != ''){
        altura.setCustomValidity('');
        altura.reportValidity();
    }
    if(peso.value != ''){
        altura.setCustomValidity('');
        altura.reportValidity();
    }
}

    //Função que verifica se o input é numero ou letra
let verificarNumero = (valor)=>{
    valor = parseFloat(valor.data);
    if(isNaN(valor)){
        return false;
    }else{
        return true;
    }
}

    // Função verifica o valor no input de altura e não permite mais que três numeros e uma vírgula
let mostrarNoInputAltura = (valor)=>{
    let resultadoInput = altura.value.length;
    if(valor == null){
        altura.setCustomValidity('');
        altura.reportValidity();
    }else if(resultadoInput <= 1){
        novo = valor + ',';
        altura.value = novo;
    }else if(resultadoInput < 4){
        novo = novo + valor;
        altura.value = novo;
    }else if(resultadoInput > 4){
        novo = altura.value.slice(0,-1);
        altura.value = novo;
    }
}

    // Função verifica o valor no input de altura e não permite mais que uma vírgula
let mostrarNoInputPeso = (valor)=>{
    let resultadoInput = peso.value.length;
    if(valor == null){
        peso.setCustomValidity('');
        peso.reportValidity();
    }else if(resultadoInput <= 1){
        novo = valor;
        peso.value = novo;
        peso.setCustomValidity('');
        peso.reportValidity();
    }else{
        novo = novo + valor;
        peso.value = novo;
        peso.setCustomValidity('');
        peso.reportValidity();
    }
}

    // Caso o valor digitado for letra, uma segunda vírgula ou um quarto numero, essa função apaga imediatamente
let apagarUltimoValorAltura = (valor)=>{
    if(valor != null){
        novo = altura.value.slice(0,-1);
        altura.value = novo;
        if(valor == ',' || valor == '.'){
            altura.setCustomValidity('');
            altura.reportValidity();
        }else{
            altura.setCustomValidity('Somente numeros, por favor!');
            altura.reportValidity();
        }
    }else{
        mostrarNoInputAltura(valor);
    }
    novo = altura.value;
}

    // Caso o valor digitado for letra ou uma segunda vírgula, essa função apaga imediatamente
let apagarUltimoValorPeso = (valor)=>{
    if(valor != null){
        novo = peso.value.slice(0,-1);
        peso.value = novo;
        if(valor == ',' || valor == '.'){
            if(peso.value.indexOf(',') == -1){
                novo = peso.value + ',';
                peso.value = novo;
                peso.setCustomValidity('');
                peso.reportValidity();
            }else{
                peso.setCustomValidity('');
                peso.reportValidity();
            }
        }else{
            peso.setCustomValidity('Somente numeros, ponto ou vírgula, por favor!');
            peso.reportValidity();
        }
    }else{
        mostrarNoInputPeso(valor);
    }
    novo = peso.value;
}

    // Coleta informação dos input's
let inputInfo = ()=>{
    alturastr = altura.value;
    pesostr = peso.value;
    if(alturastr.indexOf(',') != -1){
        alturastr = alturastr.replace(',', '.');
    }
    if(pesostr.indexOf(',') != -1){
        pesostr = pesostr.replace(',', '.');
    }
    alturastr = parseFloat(alturastr);
    pesostr = parseFloat(pesostr);
}

    // Calcula o IMC
let calcularIMC = (valor1, valor2)=>{
    return valor2 / (valor1 * valor1);
}


// LISTENERS
    // Escutador do input altura
altura.addEventListener('input', (numero)=>{
    numeroOuNao = verificarNumero(numero);
    if(numeroOuNao){
        mostrarNoInputAltura(numero.data);
    }else{
        apagarUltimoValorAltura(numero.data);
    }
})

    // Escutador do input peso
peso.addEventListener('input', (numero)=>{
    numeroOuNao = verificarNumero(numero);
    if(numeroOuNao){
        mostrarNoInputPeso(numero.data);
    }else{
        apagarUltimoValorPeso(numero.data);
    }
})

    // Escutador do botão limpar
limpar.addEventListener('click', (event)=>{
    event.preventDefault();
    peso.removeAttribute('required');
    altura.removeAttribute('required');
    peso.value = "";
    altura.value = "";
    peso.setAttribute('required','');
    altura.setAttribute('required','');
})

    // Escutador do botão de envio
calcular.addEventListener('click', (event)=>{
    inputInfo();
    resultadoIMC = calcularIMC(alturastr, pesostr);
    console.log(resultadoIMC)
    // Enviar para o resultado
    // Estilizar o resultado de acordo com o grau de obesidade
    // mostrar resultado
    event.preventDefault();
    calculadora.className = 'hide';
    resultado.className = '';
})

//DEFINIÇÕES
    //Define a parte de resultado como inicialmente escondida
resultado.className = 'hide';