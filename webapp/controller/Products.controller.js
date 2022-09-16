sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("globant.productos.controller.Products", {

            onInit: function () {
              
            },
           
        
            createClient: function(){
              var ID = this.getView().byId("idinput").getValue();
              var name = this.getView().byId("nameinput").getValue();
              var companyName = this.getView().byId("companyinput").getValue();
              var  clientTitle = this.getView().byId("titleinput").getValue();
              var data = {
                  ID: parseInt(ID),
                  Name: name,
                  companyName: companyName,
                  clientTitle: clientTitle

              };
              var odataModel = this.getView().getModel();
              odataModel.create("/Customers", data, {
                  success: function(data, response){
                      MessageBox.success("Client successfully created");
                  },
                  error: function(error){
                      MessageBox.error("Error while creating the client");
                    }
                });
            }
        });
    });
    
        
