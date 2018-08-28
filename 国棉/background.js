/*
created 2018-08-28 by qq793717096
*/
$(document).ready(function(){

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		 if(request.cmd=='notify'){
			notify(request.type);
			sendResponse('ok');
		}
	})
});

function notify(ntype){
	var opt=null;
	switch(ntype){
		case 'basic':
			opt= {
			type: ntype,
			title: "桌面提醒",
			message: "中大奖了！",
			iconUrl: "icon128.png",
			
		  }
			break;
		case 'image':
			opt= {
			type: ntype,
			title: "桌面提醒",
			message: "中大奖了！",
			iconUrl: "icon128.png",
			imageUrl:"image.jpg",
		  }
		break;
		case 'list':
			opt= {
			type: ntype,
			title: "桌面提醒",
			message: "中大奖了！",
			iconUrl: "icon128.png",
			items: [{ title: "1.", message: "下班了"},
					{ title: "2.", message: "吃饭了."},
					{ title: "3.", message: "中奖了."}]
		  }
		break;
		case 'progress':
			opt= {
			type: ntype,
			title: "桌面提醒",
			message: "当前进度...",
			iconUrl: "icon128.png",			
			progress:80
			}
		break;
		}

	   chrome.notifications.create('',opt,function(id){
		    // alert(id)
	   })
}
/**更新已经发出的通知**/
function updata(id) {

    var  updatas= {
        type: "basic",
        title: "桌面提醒",
        message: "忍心关闭么？",
        iconUrl: "icon128.png"
    }
    chrome.notifications.update(id,updatas,function(wasUpdated){

        wasUpdated ? console.log('更新完成') : console.log('更新失败');

    });
}
/** 监听通知面板内点击事件**/
chrome.notifications.onClicked.addListener(function (id) {
    // console.log('点击面板内除按钮的其他地方!');
    // window.open("http://baidu.com")
    updata(id)
        });

/** 监听通知面板内关闭按钮点击事件**/
chrome.notifications.onClosed.addListener(function(id){

});
/**获取所有的通知**/
chrome.notifications.getAll(function(object,notifications){

    
});


//点击自定义的按钮

// chrome.notifications.onButtonClicked.addListener((notificationId,index)=>{
//
//     console.log(notificationId,index); //当前通知的ID和当前点击按钮的index
//
// });
//
//
// chrome.notifications.getPermissionLevel((level)=>{
//
//     console.log(level); //granted ( 批注：默认 granted )
//
// });


