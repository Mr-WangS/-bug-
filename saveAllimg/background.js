chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    'id':'saveall',
    'type':'normal',
    'title':'保存所有图片',
  });
});


chrome.contextMenus.onClicked.addListener(function(info, tab){
  if(info.menuItemId == 'saveall'){
    chrome.tabs.executeScript(tab.id, {file: 'main.js'}, function(results){

      if (results && results[0] && results[0].length){
        results[0].forEach(function(url) {
          chrome.downloads.download({
            url: url,
            conflictAction: 'uniquify',  //conflictAction的取值只能是uniquify（在文件名后添加带括号的序号保证文件名唯一）
            saveAs: false
          });
        });
      }
    });
  }
});

// {
//     url: 下载文件的url,
//     filename: 保存的文件名,
//     conflictAction: 重名文件的处理方式,
//     saveAs: 是否弹出另存为窗口,
//     method: 请求方式（POST或GET），
//     headers: 自定义header数组,
//     body: POST的数据
// }

