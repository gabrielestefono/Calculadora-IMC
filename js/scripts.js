//VARIÁVEIS
    // Variáveis do DOM
let altura = document.getElementById('height');
let peso = document.getElementById('weight');
let calculadora = document.getElementById('calc-container');
let calcular = document.getElementById('calc-btn');
let limpar = document.getElementById('clear-btn');
let resultado = document.getElementById('result-container');
let imcSpan = document.getElementById('imc');
let situacaoSpan = document.getElementById('situacao');
let divTabela = document.getElementById('imc-table');
let voltar = document.getElementById('back-btn');

    // Variáveis de usabilidade
let numeroOuNao = '';
let letrasInput;
let novo = '';
let alturastr;
let pesostr;
let resultadoIMC;
let classificacao;
let obesidade;
let resultadoTabela;
let datap1;
let datap2;
let datap3;

    //Criando elementos DOM
resultadoTabela = document.createElement('div');
datap1 = document.createElement('p');
datap2 = document.createElement('p');
datap3 = document.createElement('p');

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
        if(altura.value.length == 1){
            altura.value = '';
        }else{
            altura.setCustomValidity('');
            altura.reportValidity();
        }
    }else if(resultadoInput <= 1){
        novo = valor + ',';
        altura.value = novo;
        altura.setCustomValidity('');
        altura.reportValidity();
    }else if(resultadoInput < 4){
        novo = novo + valor;
        altura.value = novo;
        altura.setCustomValidity('');
        altura.reportValidity();
    }else if(resultadoInput > 4){
        novo = altura.value.slice(0,-1);
        altura.value = novo;
        altura.setCustomValidity('');
        altura.reportValidity();
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
            if(altura.value == ''){
                altura.value = '0,';
                altura.setCustomValidity('');
                altura.reportValidity();
            }else{
                altura.setCustomValidity('');
                altura.reportValidity();
            }
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

    // Mostrar resultado
let mostrarResultado = (valor)=>{
    imcSpan.innerText = valor;
    if(valor < 18.5){
        imcSpan.className = 'low';
        classificacao = 'Magreza';
        situacaoSpan.innerText = classificacao;
        situacaoSpan.className = 'low';
        obesidade = '0';
    }else if(valor <= 24.9){
        imcSpan.className = 'good';
        classificacao = 'Peso Ideal';
        situacaoSpan.innerText = classificacao;
        situacaoSpan.className = 'good';
        obesidade = '0';
    }else if(valor <= 29.9){
        imcSpan.className = 'low';
        classificacao = 'Sobrepeso';
        situacaoSpan.innerText = classificacao;
        situacaoSpan.className = 'low';
        obesidade = '0';
    }else if(valor <= 34.9){
        imcSpan.className = 'medium';
        classificacao = 'Obseidade I';
        situacaoSpan.innerText = classificacao;
        situacaoSpan.className = 'medium';
        obesidade = 'I';
    }else if(valor <= 39.9){
        imcSpan.className = 'high';
        classificacao = 'Obesidade II';
        situacaoSpan.innerText = classificacao;
        situacaoSpan.className = 'high';
        obesidade = 'II';
    }else if(valor > 40){
        imcSpan.className = 'higher';
        classificacao = 'Obesidade III';
        situacaoSpan.innerText = classificacao;
        situacaoSpan.className = 'higher';
        obesidade = 'III';
    }
    datap1.innerText = valor;
    datap2.innerText = classificacao;
    datap3.innerText = obesidade;
    resultadoTabela.appendChild(datap1);
    resultadoTabela.appendChild(datap2);
    resultadoTabela.appendChild(datap3);
    divTabela.appendChild(resultadoTabela);
    resultadoTabela.className = 'table-data';
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
    peso.value = '';
    altura.value = '';
    peso.setAttribute('required','');
    altura.setAttribute('required','');
})

    // Escutador do botão de envio
calcular.addEventListener('click', ()=>{
    validar();
    calculadora.addEventListener('submit', (event)=>{
        event.preventDefault();
        inputInfo();
        resultadoIMC = calcularIMC(alturastr, pesostr);
        mostrarResultado(resultadoIMC.toFixed(1));
        // mostrar resultado
        calculadora.className = 'hide';
        resultado.className = '';
    })
})

voltar.addEventListener('click', ()=>{
    calculadora.className = '';
    resultado.className = 'hide';
    altura.value = '';
    peso.value = '';
    divTabela.removeChild(resultadoTabela);
    resultadoTabela.remove();
})

//DEFINIÇÕES
    //Define a parte de resultado como inicialmente escondida
resultado.className = 'hide';