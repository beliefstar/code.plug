
var MessageBox = (function(){
  function MessageBox(){

    this.head = document.head || document.getElementsByTagName('head')[0];

    this.body = document.body || document.getElementsByTagName('body')[0];

    this.divDom = document.createElement('div');

    this.alertStyleIsAppend = false;

    this.tipeStyleIsAppend = false;
    this.tipeIsOpen = false;

    this.alertStyle = `
      .alert-wrapper{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(80,80,80,.5);z-index: 999;padding-top: 60px;opacity: 0;transition: all 0.5s ease-out;}
      .alert-wrapper.in{opacity: 1;}
      .message-alert{width: 260px;min-height: 10px;background-color: #fff;margin: 0 auto;border-radius: 5px;color:#333;}
      .message-title{box-sizing: border-box;width: 100%;min-height: 10px;border-radius: 5px 5px 0 0;border-bottom: 1px solid #ddd;padding:10px 15px;background-color: #eee;position:relative;}
      .closebtn{position: absolute;top:10px;right:10px;cursor:pointer;font-size:16px;}
      .message-content{padding: 15px;}
      .alert-fade{transform: translateY(-100px);opacity: 0;transition: all 0.3s ease-out;}
      .alert-fade-in{transform: translateY(0);opacity: 1}
    `;

    this.tipeStyle = `
      @keyframes fadeIn{form{opacity: 0;}to{opacity: 1}}
      @keyframes tipe-item-sclaeX{form{transform:scaleX(0);}to{transform:scaleX(1);}}
      .message-tipe{position: fixed;min-width: 160px;}
      .rightBottom{right:0;bottom:0}
      .rightTop{right:0;top:0;}
      .leftTop{left:0;top:0;}
      .leftBottom{left:0;bottom:0;}
      .tipe-item{position: relative;box-sizing:border-box;width: 100%;border-radius: 5px;margin-top: 5px;background: #29ab9f;animation: fadeIn 0.5s ease both;padding:15px;font-size:14px;opacity:0;}
      .tipe-item::after{content: '';position: absolute;bottom: 1px;left: 1px;width: 98%;height: 2px;background: #000;transform-origin:right;transform: scaleX(0);animation: tipe-item-sclaeX 2s both;}
    `;
  }

  MessageBox.prototype.alert = function(messageTxt, title) {

    var styleDom = this.createStyle(),
        divDom = this.createDiv(),
        title = title || '',
        _self = this;

    if(!this.alertStyleIsAppend){
      styleDom.innerHTML = this.alertStyle;
      this.head.appendChild(styleDom);
      this.alertStyleIsAppend = true;
    }
    
    divDom.className = 'alert-wrapper';
    divDom.innerHTML = `
      <div class="message-alert alert-fade">
        <div class="message-title">
          ${title}
          <div data-close="true" class="closebtn">&times;</div>
        </div>
        <div class="message-content">${messageTxt}</div>
      </div>
    `;
    this.body.appendChild(divDom);

    divDom.onclick = function(){
      _self.hide(divDom);
    }

    divDom.getElementsByClassName('closebtn')[0].onclick = function(){
      _self.hide(divDom);
    }

    var alertDom = divDom.getElementsByClassName('message-alert')[0];

    alertDom.onclick = function(e){
      e.stopPropagation();
    }

    setTimeout(function(){
      divDom.className += ' in';
      alertDom.className += ' alert-fade-in';
    },300);
  };

  MessageBox.prototype.tipe = function(messageTxt, _position) {

    var divDom = this.divDom,
        styleDom = this.createStyle(),
        body = this.body,
        _self = this,
        position = _position || 'rightBottom';

    if(!this.tipeStyleIsAppend) {
      styleDom.innerHTML = this.tipeStyle;
      this.head.appendChild(styleDom);
      this.tipeStyleIsAppend = true;
    }

    var tipeItem = this.createDiv();
    tipeItem.innerHTML = messageTxt;
    tipeItem.className = 'tipe-item';

    if(!this.tipeIsOpen){
      divDom.className = 'message-tipe ' + position;
      divDom.appendChild(tipeItem);
      body.appendChild(divDom);
      this.tipeIsOpen = true;
    }else{
      divDom.appendChild(tipeItem);
    }

    setTimeout(function(){
      _self.hide(tipeItem);
      if(document.getElementsByClassName('tipe-item').length == 0){
        _self.hide(divDom);
        _self.tipeIsOpen = false;
      }
    },2000);
  };

  MessageBox.prototype.hide = function (elem) {
    elem.parentNode.removeChild(elem);
  }

  MessageBox.prototype.createStyle = function() {
    return document.createElement('style');
  };

  MessageBox.prototype.createDiv = function() {
    return document.createElement('div');
  };

  return new MessageBox();
}())

