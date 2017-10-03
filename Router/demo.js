
var App = new getHash();

var o_fn = {
  showlist:function(_page, _row, _timeout){
    // do something . . .
  },
  addrequest:function(_id){
    // do something . . .
  },
  reply_search:function(){
    // do something . . .
  },
  study:function(){
    // do something . . .
  },
  videoplay:function(_id){
    // do something . . .
  }
}
  var config =  {
    router:function(){
      App.state({
        name:'list',
        url:'/list',
        fn:'listFn'
      })
      .state({
        name:'list-request',
        url:'/list-request/:id',
        template:'common/student/list-request.html',
        fn:'list-reqFn'
      })
      .state({
        name:'reply',
        url:'/reply',
        template:'common/student/reply.html',
        fn:'replyFn'
      })
      .state({
        name:'study',
        url:'/study',
        fn:'studyFn'
      })
      .state({
        name:'videoplay',
        url:'/videoplay/:id',
        fn:'videoplayFn'
      })
      .defaultState('list');
    },
    fn:function(){
      App.fn("listFn", function(param){
        $('.contentBanner').html('信息列表');
        var page = 1,
            row = 10,
            timeout = 0;
        o_fn.showlist(page, row, timeout);

      });
      App.fn("list-reqFn", function(param){
        $('.contentBanner').html('申请信息');
        o_fn.addrequest(param.id);
      });
      App.fn("replyFn", function(param){
        o_fn.reply_search();
      });
      App.fn("studyFn", function(){
        o_fn.study();
      });
      App.fn("videoplayFn", function(param){
        o_fn.videoplay(param.id);
      })
    },
    init:function(){
      this.router();
      this.fn();
      App.begin();
      return App;
    }
  }

  var A = config.init();
  
  function listfn() {
    A.showState('list');
  }
  function replybtnfn() {
    A.showState('reply');
  }
  function studyfn() {
    A.showState('study');
  }
 

