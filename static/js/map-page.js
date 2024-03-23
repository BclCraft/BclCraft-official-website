/* 作者:Disy & StarLight，拷贝及使用前请务必征得作者同意！ */


/* 以下两个方法用于适时隐藏滚动条，防止卫星地图误触 */
function movIn(){
    document.getElementsByClassName("main-frame")[0].style.overflow = "hidden";
}

function movOut(){
    document.getElementsByClassName("main-frame")[0].style.overflow = "auto";
}


window.onload = function (){
    initSidebar();
    fitWindow();
    initLantern();

    document.getElementById("scroll-btn").addEventListener("click", function (){
        let main_ele = document.getElementsByClassName("main-frame")[0];
        let current_position = 0;
        let end_position = window.innerHeight;

        let rid = setInterval(function (){

            if(end_position - current_position < 20){
                main_ele.scrollTop += 5;
                current_position += 5;
            }
            else {
                main_ele.scrollTop += 15;
                current_position += 15;
            }

            if(current_position >= end_position){
                clearInterval(rid);
            }
        }, 1);
    });

    /* 顶端栏按钮逻辑 */
    let top_btn = document.getElementsByClassName("top-btn");
    let map_iframe = document.getElementById("map-iframe");

    for(let i = 0; i < top_btn.length; i++){
        top_btn[i].addEventListener("click", function (){
            document.getElementById("top-tab").style.left = ((25 * i) + "%");
            switch (i){
                case 0:
                    map_iframe.src = "https://www.starlight.cool/map-1.20/";
                    break;

                case 1:
                    map_iframe.src = "https://www.starlight.cool/map-internal/";
                    break;

                case 2:
                    map_iframe.src = "https://www.starlight.cool/map-1.19/";
                    break;

                case 3:
                    map_iframe.src = "https://www.starlight.cool/map-1.16/";
                    break;

                default:
                    map_iframe.src = "https://www.starlight.cool/map-1.20/";
                    break;
            }
        });
    }
}

window.onresize = function () {
    fitWindow();
}