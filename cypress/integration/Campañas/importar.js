function importarCampa(importar, fileName, tipo) {
    if (importar == 1) {
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("input[type=search]").type("geral")
        cy.wait(2000)
        cy.get('object').iframeLoaded().its('document').getInDocument("a").eq(2).click()

        cy.get('object').iframeLoaded().its('document').getInDocument('div.panel panel-primary').then(() => {
            cy.fixture(fileName).then(fileContent => {
                cy.wait(2000)
                cy.get('object').iframeLoaded().its('document').getInDocument('input[name=archivo]')
                    .upload({fileContent, fileName, mimeType: tipo, encoding: 'ascii', force: true})
                    .trigger("input", {force: true})
            });
            prueba(fileName);

        });
    }
}

function cantidadClientes() {
    cy.obtieneClientes();
    cy.wait(2000)
    // cy.get('object').iframeLoaded().its('document').getInDocument("button#atras")
    cy.get('object').iframeLoaded().its('document').getInDocument("button#procesar").click()
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}

function prueba(nombre_archivo) {
    switch (nombre_archivo) {
        case "carga_clientes_exitoso.csv":
            cy.log("La carga es exitosa");
            cy.get('object').iframeLoaded().its('document').getInDocument("button[name=btn_importa]").click()
            cy.wait(2000)
            cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
            cy.get('object').iframeLoaded().its('document').getInDocument("div.swal-title").should("contain", "Correcto")
            cantidadClientes();
            cy.obtieneClientes.then(($cantidad)=>{
                cy.log($cantidad)
            })git 
            break;
        case "falla_documento_cliente.csv":
            cy.log("la carga debe tener falla con algunos documentos, ya que no corresponden al formato requerido");
            cantidadClientes();
            break;
        case "falla_sin_telefono.csv":
            cy.log("la carga debe tener falla con teléfonos, ya que algunos registros no tienen este dato");
            cantidadClientes();
            break;
        case "falla_telefono_cantidad_digitos.csv":
            cy.log("la carga debe tener falla con algunos teléfonos que no cumplen con la cantidad de digitos");
            cantidadClientes();
            break;
        case "falla_telefono_ciudad.csv":
            cy.log("la carga debe tener falla con algunos teléfonos ya que son fijos y no tienen ciudad");
            cantidadClientes();
            break;
        case "falla_unidad.csv":
            cy.log("la carga debe tener falla con algunas unidades, ya que no se encunetran correctos todos los registros");
            cantidadClientes();
            break;
        case "todas_las_fallas_juntas.csv":
            cy.log("la carga debe tener falla con todos los registros");
            cantidadClientes();
            break;
        case "falla_formato_documento.pdf":
            cy.log("El documento no tienen el formato correcto");
            cy.get('object').iframeLoaded().its('document').getInDocument("div.swal-title").should("contain", "Error")
            cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click()
    }
}

export default importarCampa;