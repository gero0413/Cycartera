describe("test", function() {
    it("prueba", function() {
        ingresa();
        pausar();
        consultaMalla();
        verificarPausa("Pausado");
        cy.wait(5500)
        despausar();
        // verificarDatosPausa();
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
        // cy.obtieneValor(mem)        
        // console.log(mem); 
        let inicio = mem[0];
        let fin = mem[1];
        let total = inicio - fin;   
        console.log(total);
    })
}