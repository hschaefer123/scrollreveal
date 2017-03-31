// UI5 Control using https://github.com/jlmakes/scrollreveal

/* global ScrollReveal */
sap.ui.define([
    "sap/m/List",
    "./3rd/scrollreveal.min"
    ],
	function(Control, scrollreveal) {
	"use strict";

	return Control.extend("de.blogspot.openui5.scrollreveal.control.ScrollRevealList", {
		
		bInitial : true,
		
		metadata: {
			properties: {
				revealConfig: {
					type: "object",
					defaultValue: {}
				}
			}
		},		
		
		init : function() {
			Control.prototype.init.apply(this, arguments);
			
			// shortcuts
			this.sControlId = this.getId();
			
			// TODO: find/set scroll container dynamically
			this.oScrollContainer = ".sapMPage section";
			
			// add indicator class for additional css styling
			this.addStyleClass("uoScrollReveal");
			
			// init scroll reveal
			this.sr = ScrollReveal();
			
			// attach updated finished handler to sync new dom elements
			this.attachUpdateFinished(this.onUpdateFinished, this);
		},
		
		/**
		 * after rendering (dom nodes have been rendered)
		 */
		onAfterRendering : function() {
			if (Control.prototype.onAfterRendering) {
				Control.prototype.onAfterRendering.apply(this, arguments);
			}
			
			if (this.bInitial) {
				// reveal config
				var oRevealConfig = this.getRevealConfig();
				
				// add dynamic scroll container
				oRevealConfig.container = this.oScrollContainer;
				
				// apply reveal on list nodes
				this.sr.reveal("#" + this.sControlId + " .sapMLIB", oRevealConfig);
				
				// avoid rerender initialisation
				this.bInitial = false;
			} else {
				this._refresh();
			}
		},		
		
		// used for list binding updates
		onUpdateFinished : function(oEvent) {
			// HINT: in some situations, you have to differ reason "Change" or "Filter"
			// var sReason = oEvent.getParameter("reason");
			
			this._refresh();
		},
		
		renderer: {},
			// add nothing, just inherit the ButtonRenderer as is; 
			// In this case (since the renderer is not changed) you could also specify this explicitly with:  renderer:"sap.ui.commons.ButtonRenderer"
			// (means you reuse the ButtonRenderer instead of creating a new view
		
		// call refresh to get new dom nodes into context
		_refresh : function() {
			this.sr.sync();
		}
		
	});
		
});