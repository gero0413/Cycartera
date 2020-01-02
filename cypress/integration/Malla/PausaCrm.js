const moment = require("moment");

describe("test", function() {
    it("prueba", function() {
        cy.entrar();
        cy.login("adminpqr3", "123{enter}");
        cy.verificaLugarPausa("Servicio al cliente").then((flag) => {
            flag == 1 ? vPausasVd() : vPausasCrm();
        });
        // vPausasCrm();
    })
})

let  mem  =   [];
let fecha = new Date();
let hoy = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
let mPausa = "Break";

function vPausasVd() {
    cy.get('a').contains("Salir").click();
    cy.wait(2000)
    cy.get(".confirm").click();

    cy.login("51964417", "123{enter}");
    cy.navbar("Pausas")
    cy.get('object').iframeLoaded().its('document').getInDocument(".row").should("contain", "Las pausas de este usuario se gestionan directamente en Vicidial")
    cy.wait(2000)
    cy.get('a').contains("Salir").click();
    cy.wait(2000)
    cy.get(".confirm").click();
}

function vPausasCrm() {
    cy.wait(2000);
    cy.navbar("Salir")
    cy.wait(2000)
    cy.get(".confirm").click();

    cy.entrar();
    cy.login("51964417", "123{enter}");
    cy.navbar("Pausas")
    pausar();
    consultaMalla();
    verificarPausa("Pausado");
    cy.wait(5500)
    despausar();
    verificarPausa("Activo");
}

function pausar() {
    // Validar si existe turno
    cy.frameSelect("object", "select[name=cod_motivo_pausa]", mPausa);
    cy.get('object').iframeLoaded().its('document').getInDocument('button').click();
    cy.log("aqui empieza la pausa")
    // verificarDatosPausa();
}

function consultaMalla() {
    cy.navbar("Malla de Turnos");
    cy.frameFecha("object", "input[name=fecha_inicio]", hoy);
    cy.frameFecha("object", "input[name=fecha_fin]", hoy);
    cy.frameSelect("object", "select[name=cod_area]", "Servicio al cliente");
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

    //Despausar
    cy.get("object").iframeLoaded().its("document").getInDocument("button").click();
    cy.log("aqui termina la pausa")
    // verificarDatosPausa();

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
        consultaMalla();
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("button.detalle-pausas").first().click();
        cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument("#table-pausas_wrapper").should("contain", hInicial)
                // cy.get('object').iframeLoaded().its('document').getInDocument("#table-pausas_wrapper").should("contain", estado)
                // cy.get('object').iframeLoaded().its('document').getInDocument("#table-pausas_wrapper").should("contain", estado)
        });
    })
}