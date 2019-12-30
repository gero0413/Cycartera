Cypress.Commands.add("verificarImporte", (nombre_archivo) => {
    if (nombre_archivo === "carga_clientes_exitoso.csv") {
        cy.log("La carga es exitosa." +
            "Se deben cargar 20 clientes");
    }
    if (nombre_archivo === "falla_documento_cliente.csv") {
        cy.log("la carga debe tener falla con algunos documentos, ya que no corresponden al formato requerido." +
            "Documento a cargar, debe cargar correctamente 3 y fallar 6");
    }
    if (nombre_archivo === "falla_sin_telefono.csv") {
        cy.log("la carga debe tener falla con teléfonos, ya que algunos registros no tienen este dato." +
            "Documento a cargar, debe cargar correctamente 4 y fallar 5");
    }
    if (nombre_archivo === "falla_telefono_cantidad_digitos.csv") {
        cy.log("la carga debe tener falla con algunos teléfonos que no cumplen con la cantidad de digitos." +
            "Documento a cargar, debe cargar correctamente 2 y fallar 7");
    }
    if (nombre_archivo === "falla_telefono_ciudad.csv") {
        cy.log("la carga debe tener falla con algunos teléfonos ya que son fijos y no tienen ciudad." +
            "documento a cargar, debe cargar correctamente 6 y fallar 3");
    }
    if (nombre_archivo === "falla_unidad.csv") {
        cy.log("la carga debe tener falla con algunas unidades, ya que no se encunetran correctos todos los registros." +
            "Documento a cargar, debe cargar correctamente 6 y fallar 3");
    }
    if (nombre_archivo === "todas_las_fallas_juntas.csv") {
        cy.log("la carga debe tener falla con todos los registros");
    }
    if (nombre_archivo === "falla_formato_documento.pdf") {
        cy.log("El documento no tienen el formato correcto");
        cy.get('object').iframeLoaded().its('document').getInDocument("div.swal-title").should("contain", "Error")
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click()
    }
    if (nombre_archivo !== "falla_formato_documento.pdf"){
        cy.get('object').iframeLoaded().its('document').getInDocument("button[name=btn_importa]").click()
        cy.wait(6000)
        cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
        cy.get('object').iframeLoaded().its('document').getInDocument("div.swal-title").should("contain", "Correcto")

      cantidadClientes(20);
    }
})

function cantidadClientes(cant) {
    // cy.obtieneClientes();
    cy.wait(2000)
    cy.get('object').iframeLoaded().its('document').getInDocument("#clientes-cargados").then(elem => {
        let n_clientes = Cypress.$(elem).val();
        if(n_clientes == cant){
            cy.log("La cantidad de clientes es correcta");
        }else{
            cy.log("Ha ocurrido un error, verifica el archivo cargado")
        }
    })

    // cy.get('object').iframeLoaded().its('document').getInDocument("button#atras")
    // cy.get('object').iframeLoaded().its('document').getInDocument("button#procesar").click()
    // cy.wait(2000)
    // cy.get('object').iframeLoaded().its('document').getInDocument('button.swal-button--confirm').click();
}