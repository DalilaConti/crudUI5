sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, _MessageToast) {
        "use strict";

        return Controller.extend("globant.productos.controller.Products", {

            onInit: function () {

            },
            onCreate: function (){
                const ID = this.getView().byId("pID").getValue(); 
                const name = this.getView().byId("pname").getValue();
                const data = {
                  ID :ID,
                  Name: name,
                 
                };
                
             const oModel = this.getView().getModel();
              oModel.create("/Products", data, {
                  success:function(_oData){
                      sap.m.MessageToast.show('Product added successfully');
                  }.bind(this),
                  error: function(){
                    sap.m.MessageToast.show('Failed to add Product');
            }.bind(this)
          
              });
              },
              onUpdate: function () {
                // Primero obtenemos el 'path' del producto que queremos modificar
                // para eso, de nuestra lista tomamos el item seleccionado y mediante los
                // métodos que nos da SAPUI5, obtendremos el path. sContext valdrá algo como "Products(123)"
                const sContext = this.byId("list").getSelectedItem().getBindingContextPath();
                const name = this.getView().byId("pname").getValue();
                const ID = this.getView().byId("pID").getValue();
                // Cuando vamos a modificar un elemento, no es necesario enviar todos los campos, solo
                // aquellos que queremos modificar para no sobrecargar el programa. En este caso, no 
                // sería lo ideal permitir la modificación del ID, así que sólo enviamos el nuevo nombre. 
                const oData = {
                    Name: name,
                    ID: ID
                }
                const oModel = this.getView().getModel();
                // Cuando vamos a enviar nuestro put a backend, en lugar de usar un path estático
                // usamos uno dinámico que apunte al producto que queremos modificar. 
                oModel.update(sContext, oData, {
                    success: function (_odata) {
                        sap.m.MessageToast.show('Product updated successfully');
                    }.bind(this),
                    error: function (oError) {
                        console.log("Error: ", oError);
                        sap.m.MessageToast.show('Failed to update Product');
                    }.bind(this)
              
                // NOTA: Fijate que sería lo ideal que agregues más validaciones. Te recomiendo las 
                // siguientes: 
                // 1) Validar que el usuario no modifique campos clave como el id
                // 2) Validar que el usuario no envie un string vacio como nombre
            
                });
            }
        });
    });
     
   
