import {JetView} from "webix-jet";


export default class detector extends JetView{
	config(){
		return { 
			view:"template",
			autoheight:true
			//template:'<video id="video-player" autoplay="autoplay" style="border: 3px solid green;"> </video><canvas id="canvas" style="display:none;"> </canvas>'
		};
	}
	init(view){
		let html = `<video id="video-player" autoplay="autoplay" style="border: 3px solid green;"></video><canvas id="canvas" style="display:none;"></canvas>`;
		this.getRoot().setHTML(html);
		this.videoH = 480;
		this.videoW = 640;
		//let deviceId = 1;
		
		const canvas = document.getElementById('canvas');
		//console.log("canvas", canvas);
		canvas.height = this.videoH;
		canvas.width = this.videoW;
		this.context = canvas.getContext('2d');

		const video = document.getElementById('video-player');
		video.height = this.videoH;
		video.width = this.videoW;

		navigator.getUserMedia(
			{	
				video: {
					facingMode: "environment",
					width: this.videoW,
					height: this.videoH,
					deviceId: videoDevices[0].deviceId
				}
			},
			(stream) => {
				video.srcObject = stream;
				//timerId = setInterval(() => this.detectFrame(video, model), 4000);
			},
			function(){
				console.log('что-то не так с видеостримом :P');
			}
		);

		this.app.setService('detector',{
			shot: () => {
				this.detectFrame(video, model);
			}
		});

	}

	detectFrame(video, model){
    	model.detect(video, options).then(predictions => {
			//console.log(predictions);
			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
			if (predictions.length == 0) return;

			this.renderPredictions(predictions);
			
			let message = {predictions: predictions};
			let deviceId = 1;
			message.deviceId = deviceId;
						
			this.context.drawImage(video, 0, 0, this.videoW, this.videoH);
			message.base64dataUrl = canvas.toDataURL('image/png');
			//console.log("message", message);
			//context.setTransform(1, 0, 0, 1, 0, 0); // убираем все кастомные трансформации canvas
			// можно отправить base64dataUrl на сервер
			webix.ajax().headers({
				"Content-type":"application/json; charset=utf-8",
				//"Authorization":"Bearer "+ sessionStorage.getItem('accessToken')
			}).post(`https://api.smartos.ru/api/v1/data/detect`, JSON.stringify(message));
		})
	}

	renderPredictions(predictions){
		predictions.forEach(prediction => {
			console.log("prediction", prediction);
			// Рисуем рамку
			//this.context.strokeStyle = "#00FFFF";
			this.context.strokeStyle = "red";
			this.context.lineWidth = 2;
			this.context.strokeRect(prediction.box.left, prediction.box.top, prediction.box.width, prediction.box.height);
		});
	}
}