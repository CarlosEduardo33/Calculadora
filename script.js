const btnnumero = document.querySelectorAll('[numero]');
const btnoperador = document.querySelectorAll('[operador]');
const btnigual = document.querySelector('[igual]');
const btndel = document.querySelector('[deletar]');
const btnce = document.querySelector('[deletartudo]');
const previousOperandTextElement = document.querySelector('[operador1]');
const currentOperandTextElement = document.querySelector('[operador2]');

class Calcular{

    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    numberformat(numero){
        const stringNumber = numero.toString();
        const inteiro = parseFloat(stringNumber.split('.')[0]);
        const decimal = stringNumber.split('.')[1];

        let inteiromostrar;
        if(isNaN(inteiro)){
           inteiromostrar = '';}
        else{
            inteiromostrar = inteiro.toLocaleString('en',{maximumFractionDigits: 0,
            });
        }
        if(decimal != null){
            return `${inteiromostrar}.${decimal}`
        }
        else{
            return inteiromostrar;
        }
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    calc(){
        let resultado;
        const previousOperandF = parseFloat(this.previousOperand);
        const currentOperandF = parseFloat(this.currentOperand);

        if (isNaN(previousOperandF) || isNaN(currentOperandF)) return;

        switch(this.btnoperador){
            case '+':
                resultado = previousOperandF + currentOperandF; break;
            case '-': 
                resultado = previousOperandF - currentOperandF; break;
            case '/':
                resultado = previousOperandF / currentOperandF; break;
            case '*': 
                resultado = previousOperandF * currentOperandF; break;
            default:
                return;

        }
        this.currentOperand = resultado;
        this.btnoperador = undefined;
        this.previousOperand = "";
    }
    chooseOperation(btnoperador){
        if(this.currentOperand == '') return;
        if(this.previousOperand != ''){
            this.calc()
        }
        this.btnoperador = btnoperador;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    appendNumber(numero){
        this.currentOperand = `${this.currentOperand}${numero.toString()}`;
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.btnoperador = undefined;
    }
    updateDisplay(){
        this.previousOperandTextElement.innerText = `${this.numberformat(this.previousOperand)} ${this.btnoperador || ''}`;
        this.currentOperandTextElement.innerText = this.numberformat(this.currentOperand);
    }
}
const calcular = new Calcular
(previousOperandTextElement, currentOperandTextElement);

for(const btnnumeros of btnnumero){
    btnnumeros.addEventListener('click', () => {
        calcular.appendNumber(btnnumeros.innerText);
        calcular.updateDisplay();
    })
}

for(const btnoperadores of btnoperador){
    btnoperadores.addEventListener("click", () => {
        calcular.chooseOperation(btnoperadores.innerText);
        calcular.updateDisplay();
    })
}
btnce.addEventListener('click', () => {
    calcular.clear();
    calcular.updateDisplay();
})

btnigual.addEventListener('click', () => {
    calcular.calc();
    calcular.updateDisplay();
})
btndel.addEventListener('click', () =>{
    calcular.delete();
    calcular.updateDisplay();
})