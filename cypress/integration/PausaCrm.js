describe("test", function() {
    it("prueba", function() {
        ingresa();
        pausar();
        consultaMalla();
        verificarPausa("Pausado");
        cy.wait(5500)
        despausar();
        cy.wait(3000)
            // verificarDatosPausa();
            // Pausa();
    })
})

let  mem  =   [];
let fecha = new Date();
let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

function ingresa() {
    cy.entrar();
    cy.login("51964417", "123{enter}");
    cy.navbar("Pausas");
}

function pausar() {
    cy.frameSelect("object", "select[name=cod_motivo_pausa]", "Capacitación");
    cy.get('object').iframeLoaded().its('document').getInDocument('button').click();
    cy.log("aqui empieza la pausa")
    verificarDatosPausa();
}

function consultaMalla() {
    cy.navbar("Malla de Turnos");
    cy.frameFecha("object", "input[name=fecha_inicio]", hoy);
    cy.frameFecha("object", "input[name=fecha_fin]", hoy);
    cy.frameSelect("object", "select[name=cod_area]", "Crédito");
    cy.get("object").iframeLoaded().its("document").getInDocument("button", { timeout: 10000 }).click();
}

function verificarPausa(estado) {
    cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("#malla-turnos_wrapper").should("contain", estado)
    });
}

function despausar() {
    cy.navbar("Pausas");
    // Verificar si existe turno

    //Despausar
    cy.get("object").iframeLoaded().its("document").getInDocument("button").click();
    cy.log("aqui termina la pausa")
    verificarDatosPausa();

    consultaMalla();

    // Verificar estado 
    verificarPausa("Activo");
}

function  verificarDatosPausa()  {    
    cy.vHora().then((value)   =>   {        
        let  tiempo  =  value;   
        mem.push(tiempo);
        // console.log(value);
        cy.obtieneValor(mem);
        // var hora1 = (mem[0]).split("PM");
        // var hora2 = (mem[0]).split("PM");
        // var total = (hora1 - hora2) / 1000;
        // console.log(total)
    })
}