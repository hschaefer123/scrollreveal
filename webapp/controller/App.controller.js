sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("de.blogspot.openui5.scrollreveal.controller.App", {
		
		onInit : function() {
			// ui model
			var oViewModel = new JSONModel({
				results : ""
			});
			this.getView().setModel(oViewModel, "ui");
			
			// attach list update finished handler
			this.oList = this.getView().byId("list");
			this.oList.attachUpdateFinished(function(oEvent) {
				oViewModel.setProperty("/results", oEvent.getParameter("total"));
			}, this);
		},
		
		onSearch : function(oEvent) {
			var sQuery = oEvent.getSource().getValue();
			
			this._filter(sQuery);
		},
		
		/*
		onItemPress : function(oEvent){
			var oItem = oEvent.getParameter("listItem"),
				oUser = oItem.getBindingContext().getObject(),
				sGitHub = oUser.github;
				
			if (sGitHub && sGitHub.length > 0) {
				sap.m.URLHelper.redirect("https://github.com/" + sGitHub, true);
			}
		},
		*/
		
		_filter : function(sQuery) {
			var oBinding = this.oList.getBinding("items");
			
			if (sQuery && sQuery.length > 0) {
				var aFilters = [];
				aFilters.push(new Filter("lastname", FilterOperator.Contains, sQuery));
				aFilters.push(new Filter("firstname", FilterOperator.Contains, sQuery));
				aFilters.push(new Filter("twitter", FilterOperator.Contains, sQuery));
				aFilters.push(new Filter("github", FilterOperator.Contains, sQuery));
				
				oBinding.filter(new Filter(aFilters, false)); // OR combine filters
			} else {
				oBinding.filter([]);
			}
		}

	});
});