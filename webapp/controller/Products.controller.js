sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, _MessageToast, Filter, FilterOperator) {
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
                    this.clearInputs();
                      sap.m.MessageToast.show('Product added successfully');
                  }.bind(this),
                  error: function(){
                    sap.m.MessageToast.show('Failed to add Product');
            }.bind(this)
       
    });
    },
    clearInputs: function(){
        const name = this.getView().byId("pname");
        const ID = this.getView().byId("pID");
        name.setValue("");
        ID.setValue("");
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
                        this.clearInputs();
                        sap.m.MessageToast.show('Product updated successfully');
                    }.bind(this),
                    error: function (oError) {
                        console.log("Error: ", oError);
                        sap.m.MessageToast.show('Failed to update Product');
                    }.bind(this)
                });
                },
                clearInputs: function(){
                    const name = this.getView().byId("pname");
                    const ID = this.getView().byId("pID");
                    name.setValue("");
                    ID.setValue("");
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
                   

                  //  onDeleteSelectedItems: function(_oEvent){
                  //   var _oList = this.getView().byId("list").getSelectedItem().getBindingContextPath();
                    //  const oListData = this.getView().getModel();      
                     //  for (const i=oListData.length -1; i>=0; i--) {
                     //   var oThisObj = oListData[i].getObject();
                      //  var index = $.map(oListData.results, function(obj, index) {
                       //     if(obj === oThisObj) {
                        //        return index;
                        //    }
                       // })
                        //oListData.results.splice(index, 1);
                     // }
                    
                      //this._oList.getModel().setData(oListData); 
                     // this._oList.removeSelections(true);
                  
                    
                onSearch: function (event) {
                        let oItem = event.getParameter("suggestionItem"),
                            oBinding = this.byId("list").getBinding("items"),
                            oFilter;
                        oItem.getText() ? oFilter = new Filter("Name", FilterOperator.Contains, oItem.getText()) : oFilter = null;
                        if (oFilter) {
                            oBinding.filter(oFilter, "Application");
                        }
                    },
                          onSuggest: function (event) {
                        var sValue = event.getParameter("suggestValue"),
                            aFilters = [];
                            if (sValue) {
                                aFilters.push(new Filter({
                                filters: [
                                    new Filter("Name", FilterOperator.Contains, sValue.toUpperCase())
                                   // new Filter("ID", FilterOperator.EQ, sValue.toUpperCase())
                                    ],
                                    and: false
                                    }));
                                    }
                                    var oSource = event.getSource();
                                    var oBinding = oSource.getBinding('suggestionItems');
                                    oBinding.filter(aFilters);
                                    oBinding.attachEventOnce('dataReceived', function() {
                                    oSource.suggest();
                                    });
                            
                                },
                                onDeleteSelectedItems: function(oEvent) {
                                    var oList = oEvent.getSource();
                                    var oContext = oEvent.getParameter("list").getBindingContext();
                                    var oPath = oContext.getPath();
                                    var oIndex = oPath.slice(1);
                                    var m = oList.getModel();
                                    var data = m.getProperty("/");
                                    var removed = data.splice(oIndex, 1);
                                    m.setProperty("/", data);
                                }.bind(this)
                            });
                        
        });
                            
 
             
              
   
   
