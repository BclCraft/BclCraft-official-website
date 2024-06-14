/* 作者:Disy & StarLight，拷贝及使用前请务必征得作者同意！ */

let RESOURCE_TYPE = "Java";  // 当前选中的资源类型
let RESOURCE_LATEST_VERSION_CACHE = {};
let RESOURCE_VERSION_CACHE = {};
let COLOR_THEME_NUM = 1;

let AJAX_URL = "/downloads/";
let AJAX_OBJ = new XMLHttpRequest();
let AJAX_OBJ_FREQ = new XMLHttpRequest();

AJAX_OBJ_FREQ.onreadystatechange = function (){
    let download_frame = document.getElementsByClassName("download-card-container")[0];

    if(AJAX_OBJ_FREQ.readyState === 4){
        let response_data = JSON.parse(AJAX_OBJ_FREQ.responseText);
        if(response_data.state === "End"){
            if(COLOR_THEME_NUM !== 1){
                if(RESOURCE_VERSION_CACHE[RESOURCE_TYPE] > 0){
                    download_frame.innerHTML += `
                    <div class="na-card download-card theme-color-${COLOR_THEME_NUM}">
                        <div class="title-bar">没有更多</div>
                        <div class="download-container">
                            <h2>到底啦!</h2>
                            <h3>Coming soon...</h3>
                        </div>
                    </div>`;
                }
            }
            else {
                RESOURCE_VERSION_CACHE[RESOURCE_TYPE] = -1;
            }

            displayFailMsg("已经到底了诶(>_<)");
        }
        else {
            download_frame.innerHTML += `
            <div class="na-card download-card theme-color-${COLOR_THEME_NUM}">
                <div class="title-bar">${response_data.title}</div>
                <div class="download-container">
                    <h2># ${response_data.name}</h2>
                    <h3>${response_data.information_1}</h3>
                    <p>${response_data.information_2}</p>
                </div>
                <a href="${response_data.url}">download</a>
            </div>`;

            reloadDownloadPage(1);
        }

        if(COLOR_THEME_NUM >= 3){
            COLOR_THEME_NUM = 1;
        }
        else {
            ++COLOR_THEME_NUM;
        }
    }
}

/**
 * 用于重新渲染下载页
 * @param mode 渲染模式，为一整数
 * 模式0：显示“加载中”字样，隐藏加载更多的按钮和下载栏（通常不用）
 * 模式1：隐藏“加载中”字样，显示加载更多的按钮和下载栏
 * 模式2：隐藏加载更多的按钮，显示“加载中”字样和下载栏
 * 模式3：隐藏加载更多的按钮和“加载中”字样，显示下载栏
 * 默认模式：模式0
 */
function reloadDownloadPage(mode){
    let loader_frame = document.getElementsByClassName("load-frame")[0];
    let load_btn = document.getElementById("load-more-btn");
    let download_frame = document.getElementsByClassName("download-card-container")[0];

    switch (mode){
        case 1:
            download_frame.classList.remove("hidden");
            load_btn.classList.remove("hidden");
            loader_frame.classList.add("hidden");
            break;

        case 2:
            download_frame.classList.remove("hidden");
            load_btn.classList.add("hidden");
            loader_frame.classList.remove("hidden");
            break;

        case 3:
            download_frame.classList.remove("hidden");
            load_btn.classList.add("hidden");
            loader_frame.classList.add("hidden");
            break;

        case 0:
        default:
            download_frame.classList.add("hidden");
            load_btn.classList.add("hidden");
            loader_frame.classList.remove("hidden");
            download_frame.innerHTML = "";
            break;
    }
}

/**
 * 显示ajax获取失败后的错误消息
 */
function displayFailMsg(msg){
    let loader_frame = document.getElementsByClassName("loader")[0];
    let load_btn = document.getElementById("load-more-btn");
    let failed_msg_frame = document.getElementById("failed-msg");

    failed_msg_frame.innerText = msg;
    failed_msg_frame.classList.remove("hidden");
    load_btn.classList.add("hidden");
    loader_frame.classList.add("hidden");
}

/**
 * 发送请求拿到最新的下载数据
 */
function requestLatestData(){
    if(!(RESOURCE_TYPE in RESOURCE_LATEST_VERSION_CACHE)){
        let response_data = null;

        AJAX_OBJ.open("GET", AJAX_URL + RESOURCE_TYPE + "/latest", true);
        AJAX_OBJ.send(null);

        AJAX_OBJ.onreadystatechange = function (){
            if(AJAX_OBJ.readyState === 4){
                response_data = JSON.parse(AJAX_OBJ.responseText);
                if(response_data != null){
                    if(response_data instanceof Number){
                        RESOURCE_LATEST_VERSION_CACHE[RESOURCE_TYPE] = response_data;
                        RESOURCE_VERSION_CACHE[RESOURCE_TYPE] = response_data;
                        requestCurrentData();
                    }
                    else {  // 兼容旧文件
                        RESOURCE_LATEST_VERSION_CACHE[RESOURCE_TYPE] = response_data.number;
                        RESOURCE_VERSION_CACHE[RESOURCE_TYPE] = response_data.number;
                        requestCurrentData();
                    }
                }
            }
        }

        AJAX_OBJ.onerror = function (){
            displayFailMsg("获取数据失败，建议刷新页面后重试");
        }
    }
    else {
        RESOURCE_VERSION_CACHE[RESOURCE_TYPE] = RESOURCE_LATEST_VERSION_CACHE[RESOURCE_TYPE];
        requestCurrentData();
    }
}


function requestCurrentData(){
    if(RESOURCE_VERSION_CACHE[RESOURCE_TYPE] > 0){
        for(let i = 0; i < 3; ++i){
            AJAX_OBJ_FREQ.open("GET", AJAX_URL + RESOURCE_TYPE + "/" + RESOURCE_VERSION_CACHE[RESOURCE_TYPE], false);
            AJAX_OBJ_FREQ.send(null);
            --RESOURCE_VERSION_CACHE[RESOURCE_TYPE];
        }
    }
    else {
        reloadDownloadPage(3);
    }
}

window.onload = function () {
    initSidebar();
    initLantern();
    fitWindow();
    reloadDownloadPage(0);
    requestLatestData();

    /* 跳转按钮逻辑 */
    document.getElementById("download-btn").addEventListener("click", function (){
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

    /* “加载更多”按钮逻辑 */
    document.getElementById("load-more-btn").addEventListener("click", function (){
        reloadDownloadPage(2);
        requestCurrentData();
    });

    /* 顶端导航栏按钮逻辑 */
    let top_btn = document.getElementsByClassName("top-btn");
    for(let i = 0; i < top_btn.length; i++){
        top_btn[i].addEventListener("click", function () {
            document.getElementById("top-tab").style.left = (((33 * i) + 1) + "%");
            switch (i){
                case 0:
                    RESOURCE_TYPE = "Java";
                    break;

                case 1:
                    RESOURCE_TYPE = "BE";
                    break;

                case 2:
                    RESOURCE_TYPE = "Other";
                    break;
            }

            document.getElementsByClassName("download-card-container")[0].innerHTML = "";
            requestLatestData();
        });
    }
}

window.onresize = function () {
    fitWindow();
}