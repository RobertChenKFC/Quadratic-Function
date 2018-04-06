class Surd {
    constructor(val) {
        this.i = val < 0;
        
        val = abs(val);

        this.coeff = 1;
        const sqrtVal = sqrt(val) + 1;
        while(val % 4 === 0) {
            val /= 4;
            this.coeff *= 2;
        }
        for(let i = 3, g = 2; i < sqrtVal; i += 2) {
            const sq = i * i;
            while(val % sq === 0) {
                val /= sq;
                this.coeff *= i;
            }
        }
        this.surd = val;
    }
}