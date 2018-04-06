let inputBox1, inputBox2, inputBox3;
let errorDiv;
let funcDiv;
let deltaDiv;
let rootsDiv;
const NULL = -1;

function calc() {
	try {
		let a = inputBox1.value();
		let b = inputBox2.value();
		let c = inputBox3.value();
		if(!a || !b || !c) return;

		a = new Frac(a);
		b = new Frac(b);
		c = new Frac(c);

		if(a.q === 0) throw "x^2 coeffecient cannot be 0";
		let funcStr = ""
		if(a.q !== a.p) funcStr += a.toLatex();
		funcStr += "x^2";
		if(b.q !== 0) {
			if(b.q > 0) funcStr += "+";
			if(b.q !== b.p) funcStr += b.toLatex();
			funcStr += "x";
		}
		if(c.q !== 0) {
			if(c.q > 0) funcStr += "+";
			funcStr += c.toLatex();
		}
		funcStr += " \\\\ = ";
		const h = Frac.div(b, Frac.mult(new Frac(2), a));
		const k = Frac.div(Frac.sub(Frac.mult(Frac.mult(new Frac(4), a), c), Frac.mult(b, b)), 
			Frac.mult(new Frac(4), a))
		if(a.q !== a.p) funcStr += a.toLatex();
		if(h.q === 0) funcStr += "x^2";
		else {
			funcStr += "(x";
			if(h.q > 0) funcStr += "+";
			funcStr += h.toLatex() + ")^2";
		}
		if(k.q > 0) funcStr += "+";
		if(k.q !== 0) funcStr += k.toLatex();
		MathJax.Hub.queue.Push(["Text", funcDiv, funcStr]);

		const delta = Frac.sub(Frac.mult(b, b), Frac.mult(Frac.mult(new Frac(4), a), c)).toLatex();
		MathJax.Hub.queue.Push(["Text", deltaDiv, "\\Delta=" + delta]);

		let ratio = new Frac(Lcm(Lcm(a.p, b.p), c.p));
		
		a = Frac.mult(a, ratio).q;
		b = Frac.mult(b, ratio).q;
		c = Frac.mult(c, ratio).q;
		const newDeltaRt = new Surd(b * b - 4 * a * c);
		ratio = Gcd(Gcd(b, newDeltaRt.coeff), 2 * a);

		let x1 = "x_1=";
		let q1 = "", p1 = 2 * a / ratio; 
		if(newDeltaRt.surd === 1) {
			q1 = (-b + newDeltaRt.coeff) / ratio;
			const newRatio = Gcd(q1, p1);
			q1 = (q1 / newRatio).toString();
			p1 = (p1 / newRatio).toString();
		}
		else {
			if(b !== 0) q1 += (-b / ratio).toString();
			q1 += "+";
			if(newDeltaRt.coeff / ratio !== 1) q1 += (newDeltaRt.coeff / ratio).toString();
			q1 += "\\sqrt{" + newDeltaRt.surd + "}";
			if(newDeltaRt.i) q1 += "i";
		}
		if(p1 === "1" || p1 === 1) x1 += q1;
		else x1 += "\\frac{" + q1 + "}{" + p1 + "}";

		let x2 = "x_2=";
		let q2 = "", p2 = 2 * a / ratio; 
		if(newDeltaRt.surd === 1) {
			q2 = (-b - newDeltaRt.coeff) / ratio;
			const newRatio = Gcd(q2, p2);
			q2 = (q2 / newRatio).toString();
			p2 = (p2 / newRatio).toString();
		}
		else {
			if(b !== 0) q2 += (-b / ratio).toString();
			q2 += "-";
			if(newDeltaRt.coeff / ratio !== 1) q2 += (newDeltaRt.coeff / ratio).toString();
			q2 += "\\sqrt{" + newDeltaRt.surd + "}";
			if(newDeltaRt.i) q2 += "i";
		}
		if(p2 === "1" || p2 === 1) x2 += q2;
		else x2 += "\\frac{" + q2 + "}{" + p2 + "}";

		let rootsStr = "\\left\\{ \\begin{array} \\\\ " + x1 + " \\\\ " + x2 + "\\end{array} \\right.";

		const sum = "x_1+x_2=" + new Frac(-b, a).toLatex();
		const prod = "x_1 x_2=" + new Frac(c, a).toLatex();
		rootsStr += "\\\\ \\left\\{ \\begin{array} \\\\ " + sum + " \\\\ " + prod + "\\end{array} \\right.";

		MathJax.Hub.queue.Push(["Text", rootsDiv, rootsStr]);



		errorDiv.html("Nothing");
	}
	catch(e) {
		errorDiv.html(e);
	}	
}


function setup() {
	inputBox1 = select("#input1");
	inputBox2 = select("#input2");
	inputBox3 = select("#input3");
	errorDiv = select("#error");
	
	MathJax.Hub.queue.Push(() => {
		funcDiv = MathJax.Hub.getAllJax("func")[0];
		deltaDiv = MathJax.Hub.getAllJax("delta")[0];
		rootsDiv = MathJax.Hub.getAllJax("roots")[0];
	});
	
	inputBox1.input(calc);
	inputBox2.input(calc);
	inputBox3.input(calc);
}

