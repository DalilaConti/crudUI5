sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("globant.productos.controller.Products", {

            onInit: function () {
              const oModel = this.getView().getModel();
              const datos = {
                  firstName = "fname",
                  lastName = "lname",
                  companyName= "cname",
                  city= "city"
                };
              oModel.create("/Customers", datos, null,{
                  succes:function(oData){
                      sap.m.MessageToast.show('Customer added successfully');
                  }.bind(this),
                  error: function(){
                     sap.m.MessageToast.show('Failed to add customer');
            }.bind(this)
          });
        }
    });
        });
    
              
        
   
    
        
