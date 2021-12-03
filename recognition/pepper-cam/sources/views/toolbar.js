import {JetView, plugins} from "webix-jet";

export default class toolbar extends JetView{
	config(){
		return {
			view:"toolbar", height: 80,
			elements:[
				{view:"template", template:"03.12.2021 10:30", borderless:true},
				{},
				{view:"button", label:"Захват", name:"camshot",
					click:() => {
						this.app.getService('detector').shot();
					}
				},
				{view:"button", label:"Работа", name:"work",
					click:() => {
						//console.log("this.getRoot()", this.getRoot());
						this.app.show("/top/detector");
						this.getRoot().elements['camshot'].show();
						this.getRoot().elements['work'].hide();
						this.getRoot().elements['settings'].show();
					}
				},
				{view:"button", label:"Настройки", name:"settings",
					click:() => {
						clearInterval(timerId);
						this.app.show("/top/settings");
						this.getRoot().elements['camshot'].hide();
						this.getRoot().elements['work'].show();
						this.getRoot().elements['settings'].hide();
					}
				},
				{width:10}
			]
		}
	}

	init(view){
		const url = this.getUrlString();
		console.log("url", url);
		if(url == 'top/detector'){
			view.elements['work'].hide();
			view.elements['camshot'].hide();
			view.elements['settings'].show();
		}else{
			view.elements['work'].show();
			view.elements['camshot'].show();
			view.elements['settings'].hide();
		}
	}
}