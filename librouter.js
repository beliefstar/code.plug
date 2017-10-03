var getview = (function(){
    function getview(_url, fn, _param){
        this.url = _url;
        this.fn = fn;
        this.param = _param;
        this.init();
    }
    getview.prototype = {
        init:function(){
            var _this = this;
            $("[zx-view]").html('正在加载中...');
            $.ajax({
                url: this.url,
                type: 'GET',
                dataType: 'html'
            })
            .done(function(data) {
                $("[zx-view]").html(data);
                _this.fn(_this.param);
            })
            .fail(function() {
                console.log("error");
            });
        }
    }
    return getview;
}())

var getHash = (function(){
    function getHash(){
        this.hash_arr = [];   //存放当前hash值
        this.state_arr = [];  //路由表
        this.d_state = '';    //默认路由
    }
    getHash.prototype = {
        init : function(){
            var ha = location.hash
            this.hash_arr = ha.substr(2,ha.length).split('/');
        },
        setHash : function(_code, _param){
            var param = _param || {};
            var _c = _code.split('/');
            $.each(_c, function(index, val) {
              if(val.substr(0,1) == ":"){
                _c[index] = param[val.substring(1,val.length)];
              }
            });
            location.hash = this.paramstr(_c.join("/"));
            this.init();
        },
        state : function(option){
            this.state_arr.push(option);
            return this;
        },
        defaultState : function(sname){
            this.d_state = sname;
            return this;
        },
        fn:function(fn_name, _fn){
            $.each(this.state_arr, function(index, val) {
                if(val.fn == fn_name){
                  val.fn = _fn;
                }
            });
            return this;
        },
        slideView:function(_state, _param){
            var param = _param || {};
            if(_state.template){
                new getview(_state.template, _state.fn, param);
            }else{
                _state.fn(param);
            }
        },
        showState:function(_s_name, _param){
            var _this = this,
                param = _param || {};
            $.each(this.state_arr, function(index, val) {
                if(val.name == _s_name){
                  _this.setHash(val.url, param);
                  _this.slideView(val, param);
                }
            });
        },
        paramstr:function(str){
            var index = str.indexOf(':');
            if(index > 0){
                return str.substr(0,index-1);
            }else{
                return str;
            }
        },
        genParamObj:function(v_url){
            var _c = v_url.split('/'),
                relObj = {},
                _this = this;
            $.each(_c, function(index, val) {
                if(val.substr(0,1) == ":"){
                    var o_key = val.substring(1,val.length);
                    relObj[o_key] = _this.hash_arr[index-1];
                }
            });
            return relObj;
        },
        begin:function(){
            this.init();
            var _url = "\/" + this.hash_arr.join("\/");
            var _this = this,
                _s = {},
                flag = false;
            $.each(this.state_arr, function(index, val) {
                if(val.name == _this.d_state){
                    _s = val;
                }
                var arr_s = _this.paramstr(val.url);
                if(_url.indexOf(arr_s) == 0){
                    var _ = _url.substr(arr_s.length,1);
                    if( _ == '\/' || _ == ""){
                        //查找成功！
                        flag = true;
                        _this.slideView(val, _this.genParamObj(val.url));
                    }
                }
            });
            if(!flag){
                //查找失败，用默认值
                _this.setHash(_s.url);
                _this.slideView(_s);
            }
        }
    }
    return getHash;
}())