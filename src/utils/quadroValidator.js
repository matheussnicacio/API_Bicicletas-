function quadroValidoParaAltura(altura, quadro) {
    const alt = parseFloat(altura);
    if (isNaN(alt)) return false;
    if (alt >= 1.50 && alt <= 1.65) return quadro === 15;
    if (alt > 1.65 && alt <= 1.75) return quadro === 17;
    if (alt > 1.75) return quadro === 18;
    return false; 
    }
    
    
    module.exports = { quadroValidoParaAltura };