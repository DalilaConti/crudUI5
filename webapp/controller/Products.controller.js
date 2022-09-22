sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, _MessageToast, Filter) {
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
                });
                },
                onDelete: function () {
                    const sContext = this.byId("list").getSelectedItem().getBindingContextPath();
                    const odataModel = this.getView().getModel();
                    odataModel.remove(sContext, {
                        success: function (odata) {
                            sap.m.MessageToast.show('Product deleted successfully');
                        }.bind(this),
                        error: function (oError) {
                            console.log("Error: ", oError);
                            sap.m.MessageToast.show('Failed to delete Product');
                        }.bind(this)
                    });
                    },
                    onSearch: function (event) {
                        var oItem = event.getParameter("suggestionItem");
                        if (oItem) {
                            sap.m.MessageToast.show("Search for: " + oItem.getText());
                        } else {
                            sap.m.MessageToast.show("Search is fired!");
                        }
                     
                    },
            
                    onSuggest: function (event) {
                        var sValue = event.getParameter("suggestValue"),
                            aFilters = [];
                        if (sValue) {
                            aFilters = [
                                new Filter([
                                    new Filter("ProductId", function (sText) {
                                        return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                                    }),
                                    new Filter("Name", function (sDes) {
                                        return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                                    })
                                ], false)
                            ];
                        }
                       
                        this.oSF.getBinding("suggestionItems").filter(aFilters);
                        this.oSF.suggest();
                    }

                });
            });
             
              
   
   
