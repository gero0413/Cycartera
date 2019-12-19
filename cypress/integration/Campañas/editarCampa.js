function editarCampa(edita) {
    let fecha = new Date();
    let fecha_automatica = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
    let fecha_manual_inicial = "2019-12-17";
    let fecha_manual_final = "2019-12-20";
    let dias = 4;

    if (edita == 1) {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a[title='Editar campana']").eq(4).click()

        cy.wait(3000)
        cy.get('object').iframeLoaded().its('document').getInDocument('div.container-fluid').then(() => {
            // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=nombre]").type("Test geral")
            cy.frameFecha("object", "input[name=fecha_inicial]", fecha_manual_inicial);
            cy.frameFecha("object", "input[name=fecha_final]", fecha_manual_final);
            // cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_inicial]").type("08:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=hora_final]").type("18:00:00.000")
            cy.get('object').iframeLoaded().its('document').getInDocument("input[name=dias]").clear().type(dias)
                // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=actualizar]").select("NO")
                // cy.get('object').iframeLoaded().its('document').getInDocument("select[name=cod_area_interna]").select("Servicio al cliente")
            cy.seleccionaCanal("Predictiva");
            // cy.get('object').iframeLoaded().its('document').getInDocument("textarea[name=observacion]").type("Test geral campo observaciones")
            cy.get('object').iframeLoaded().its('document').getInDocument("button[type=submit]").click()
        });
    }
}

export default editarCampa;