describe("test", function() {
    it("prueba", function() {
        ingresa();
        pausar();
        consultaMalla();
        verificarPausa("Pausado");
        cy.wait(5500)
        despausar();
        verificarDatosPausa();
    })
})

let  mem  =   [];
let fecha = new Date();
let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
let mPausa = "Break";

function ingresa() {
    cy.entrar();
    cy.login("51964417", "123{enter}");
    cy.navbar("Pausas");
}

function pausar() {
    cy.frameSelect("object", "select[name=cod_motivo_pausa]", mPausa);
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

    //Consultar malla
    consultaMalla();

    // Verificar estado 
    verificarPausa("Activo");
}

function  verificarDatosPausa()  {    
    cy.vHora().then((value)   =>   {        
        let  tiempo  =  value;   
        mem.push(tiempo);
        // cy.obtieneValor(mem);
        let hInicial = mem[0];
        let hFinal = mem[1];
        console.log("Inicio Pausa" + hInicial + "Fin Pausa" + hFinal);

        // Verificar datos
        cy.wait(2000)
            // cy.get('object').iframeLoaded().its('document').getInDocument("button.detalle-pausas").first().click();
            // cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
            //     cy.wait(2000)
            //     cy.get('object').iframeLoaded().its('document').getInDocument("#table-pausas_wrapper").should("contain", "11:54:12")
            //     cy.get('object').iframeLoaded().its('document').getInDocument("#table-pausas_wrapper").should("contain", estado)
            //     cy.get('object').iframeLoaded().its('document').getInDocument("#table-pausas_wrapper").should("contain", estado)
            // });
    })
}