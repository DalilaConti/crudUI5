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
                  succes:function(_oData){
                      sap.m.MessageToast.show('Product added successfully');
                  }.bind(this),
                  error: function(){
                    sap.m.MessageToast.show('Failed to add Product');
            }.bind(this)
          
              });
              },

              onUpdate: function(){
                   const list = this.getView().byId("list");
                  const selItem = list.getSelectedItem();
                   const title = selItem.getTitle();
                    const description = selItem.getDescription();
                   const Name = this.getView().byId("pname").getValue();
               
                    const payload = {
                       ID: parseInt(title),
                        Name: Name
                   };
    
                    const path = "/Products(" + title + ")";
                    const odataModel = this.getView().getModel();
                    odataModel.update(path,payload,{
                        succes: function (data,response) {
                            sap.m.MessageToast.show('Product updated successfully');
                        }.bind(this),
                        error: function(){
                          sap.m.MessageToast.show('Failed to update Product');
                  }.bind(this)
                
                });
            }
        });
    });
