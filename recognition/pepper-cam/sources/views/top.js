import {JetView, plugins} from "webix-jet";

import toolbar from "views/toolbar"

export default class TopView extends JetView{
	config(){
		var header = {
			type:"header", template:" Перец и греча", css:"webix_header app_header"
		};

		var ui = {rows:[
			toolbar,
			{ $subview:true }
		]};

		return ui;
	}
	init(){
		//this.use(plugins.Menu, "top:menu");
	}
}