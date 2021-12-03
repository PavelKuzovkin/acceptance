import {JetView} from "webix-jet";

export default class DataView extends JetView{
	config(){
		return {
			view:"form",
			elements:[
				{view:"text", name:"servAddr", label:"Адрес сервера", labelWidth: 160, value:'https://api.smartos.ru/api/v1/data/detect'},
				{view:"datepicker", name:"dateTime", label:"Дата/время", labelWidth: 160, value:new Date()},
				{view:"richselect", name:"deviceTypeId", label:"Тип устройства", labelWidth: 160,
					options:[
						{id:1, value:"Детектор брака"},
						{id:2, value:"Детектор номера"},
					]
				},
				{view:"text", name:"deviceId", label:"Идентификатор устройства", labelWidth: 160, value:1},
				{view:"text", name:"placeId", label:"Номер площадки", labelWidth: 160, value:1},
			]
		};
	}
}