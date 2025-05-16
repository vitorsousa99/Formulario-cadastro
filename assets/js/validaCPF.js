class ValidaCPF {
	constructor(cpfEnviado) {
		Object.defineProperty(this, "cpfLimpo", {
			writable: false,
			enumerable: false,
			configurable: false,
			value: cpfEnviado.replace(/\D+/g, "")
		});
	}
	

	sequencia() {
		//charAt retorna o caractere na possição 0
		//repeat repete o caractere 11 vezes 
		return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
	}

	geraNovoCPF() {
		const cpfSemDigito = this.cpfLimpo.slice(0, -2);
		const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
		const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1);
		this.novoCPF = cpfSemDigito + digito1 + digito2;
	}

	static geraDigito(cpfSemDigito) {
		let total = 0;
		let reverso = cpfSemDigito.length + 1;

		for (let stringNumerica of cpfSemDigito) {
			total += reverso * Number(stringNumerica);
			reverso--;
		}
		const digito = 11 - (total % 11);
		return digito <= 9 ? String(digito) : "0";
	}

	valida() {
		if (!this.cpfLimpo) return false;
		if (typeof this.cpfLimpo !== "string") return false;
		if (this.cpfLimpo.length !== 11) return false;
		if (this.sequencia()) return false;
		this.geraNovoCPF();
		console.log(this.novoCPF)
		return this.novoCPF === this.cpfLimpo;
	}
}

const validaCpf = new ValidaCPF("41344998879");
if(validaCpf.valida()){
    console.log(`CPF ${validaCpf.cpfLimpo} é válido!`)
	//return `CPF ${validaCpf.cpfLimpo} é válido!`
}else{
	console.log(`CPF ${validaCpf.cpfLimpo} é inválido!`)
	//return `CPF ${validaCpf.cpfLimpo} é inválido!`
}

//console.log(validaCpf.valida());