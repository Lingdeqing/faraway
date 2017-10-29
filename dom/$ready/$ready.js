(function () {
    var readyList = [],
        isReady = false,
        bindReady = false;

    function fireReadyList() {
        var fn;
        if(isReady){
            while (fn = readyList.shift()){
                fn.call(this)
            }
        }
    }

    function DOMContentLoaded() {
        isReady = true;
        fireReadyList();
    }

    function doScrollCheck() {
        if(isReady){
            return;
        }
        try{
            document.documentElement.doScroll('left');
        } catch(e) {
            setTimeout(doScrollCheck, 1)
            return;
        }

        DOMContentLoaded();
    }

    this.ready = function (fn) {
        // 保存回调到队列中
        if(Object.prototype.toString.call(fn) === '[object Function]'){
            readyList.push(fn)
        }

        // 绑定一次DOMContentLoaded的监听器
        if(!bindReady){
            bindReady = true;

            // 标准
            if(document.addEventListener){
                document.addEventListener('DOMContentLoaded', DOMContentLoaded, false)
                window.addEventListener('load', DOMContentLoaded, false)
            }

            // ie
            else if(document.attachEvent){
                document.attachEvent('onreadystatechange', function(){
                    DOMContentLoaded();
                    console.log('onreadystatechange')
                })
                window.attachEvent('load', DOMContentLoaded)

                // ie top页
                var topLevel = false;
                try{
                    topLevel = window.frameElement === null;
                } catch(e){}

                if(topLevel && document.documentElement.doScroll){
                    doScrollCheck();
                }
            }
        }

        // 触发ready回调
        else {
            fireReadyList();
        }
    }
})();