/* 作者:Disy & StarLight，拷贝及使用前请务必征得作者同意！ */

let resize_monitors;  // 窗口大小变化时需要调用

const sidebar_elements = [
    {
        "href": "/",
        "id":"home-btn",
        "text": "SLS主页",
        "img":{
            "src": "/img/icon/Home.svg",
            "alt": "Home"
        }
    },

    {
        "href": "/download/",
        "id":"resource-btn",
        "text": "资源下载",
        "img":{
            "src": "/img/icon/Download.svg",
            "alt": "Resources"
        }
    },

    {
        "href": "/map.html",
        "id":"map-btn",
        "text": "卫星地图",
        "img":{
            "src": "/img/icon/Map.svg",
            "alt": "Map"
        }
    },

    {
        "href": "/donation-hardware.html",
        "id":"thanks-btn",
        "text": "捐助鸣谢",
        "img":{
            "src": "/img/icon/Donation.svg",
            "alt": "Donation"
        }
    },

    {
        "href": "https://sls.wiki",
        "id":"server-btn",
        "text": "SLS Wiki",
        "img":{
            "src": "/img/icon/Wiki.svg",
            "alt": "Server"
        }
    },

    {
        "href": "/wastewater.html",
        "id":"more-btn",
        "text": "辐岛核污水",
        "img":{
            "src": "/img/icon/Nuclear.svg",
            "alt": "More"
        }
    },

    {
        "href": "http://www.mcformac.tech/d/4-geng-duo-wang-zhan",
        "id":"more-btn",
        "text": "更多网站",
        "img":{
            "src": "/img/icon/More.svg",
            "alt": "More"
        }
    },

    {
        "href": "https://sls.wiki/index.php?title=The_Land_Of_StarLight#TLSL%E5%8E%86%E5%8F%B2_&_%E5%85%B3%E4%BA%8E_SLS%E4%B8%8E_TLSL",
        "id":"about-btn",
        "text": "关于SLS",
        "img":{
            "src": "/img/icon/About.svg",
            "alt": "About"
        }
    }
];

const subtitle = [
    "高性能且有趣的综合Minecraft服务器",
    "友好+较低门槛型综合Minecraft服务器",
    "什么都有一点点的Minecraft服务器",
    "全国最菜的Minecraft生电服务器",
    "超级好玩的Minecraft服务器",
    "广受玩家认可的Minecraft服务器",
    "只会用木棍的Minecraft生电服务器",
    "服主超级菜的Minecraft服务器",
    "重名率超高的Minecraft服务器",
    "服主超负责的Minecraft服务器",
    "和谐友爱的Minecraft服务器",
    "过年会挂可爱红灯笼的Minecraft服务器",
    "设施健全的Minecraft服务器"
];

// 玩家语录弹幕
const player_bullets = [
    "玩SLS，最重要的是要开心！ —— Disy",
    "来SL享受一场酣畅淋漓的天坑之战吧！ —— CrystalAura",
    "炸的越多，残留越多；残留越多，炸的越少；炸的越多，炸的越少 —— AR",
    "Disy最帅！！！（痴 —— FlyCreeperS",
    "Disy，没有你我可怎么活啊 — BirchOH",
    "Disy，小小的，香香的，嘿嘿 — BirchOH"
];

// 输出广告
console.log(`
          _____                        _____                 _____          
         /\\    \\                      /\\    \\               /\\    \\         
        /::\\    \\                    /::\\____\\             /::\\    \\        
       /::::\\    \\                  /:::/    /            /::::\\    \\       
      /::::::\\    \\                /:::/    /            /::::::\\    \\      
     /:::/\\:::\\    \\              /:::/    /            /:::/\\:::\\    \\     
    /:::/__\\:::\\    \\            /:::/    /            /:::/__\\:::\\    \\    
    \\:::\\   \\:::\\    \\          /:::/    /             \\:::\\   \\:::\\    \\   
  ___\\:::\\   \\:::\\    \\        /:::/    /            ___\\:::\\   \\:::\\    \\  
 /\\   \\:::\\   \\:::\\    \\      /:::/    /            /\\   \\:::\\   \\:::\\    \\ 
/::\\   \\:::\\   \\:::\\____\\    /:::/____/            /::\\   \\:::\\   \\:::\\____\\
\\:::\\   \\:::\\   \\::/    /    \\:::\\    \\            \\:::\\   \\:::\\   \\::/    /
 \\:::\\   \\:::\\   \\/____/      \\:::\\    \\            \\:::\\   \\:::\\   \\/____/ 
  \\:::\\   \\:::\\    \\           \\:::\\    \\            \\:::\\   \\:::\\    \\     
   \\:::\\   \\:::\\____\\           \\:::\\    \\            \\:::\\   \\:::\\____\\    
    \\:::\\  /:::/    /            \\:::\\    \\            \\:::\\  /:::/    /    
     \\:::\\/:::/    /              \\:::\\    \\            \\:::\\/:::/    /     
      \\::::::/    /                \\:::\\    \\            \\::::::/    /      
       \\::::/    /                  \\:::\\____\\            \\::::/    /       
        \\::/    /                    \\::/    /             \\::/    /        
         \\/____/                      \\/____/               \\/____/         
         
         
想来一起开发？抑或发现了网页的Bug/可优化之处？StarLight-Server欢迎你的加入！
我们的QQ群：535392227，加群请注明：来自console输出信息！
`);


function initSidebar(){
    let sidebar_html = `<a class="box logo-box"><i><img src="/img/icon/Menu.svg" alt="List"></i><span>StarLight</span></a>`;
    for (let index in sidebar_elements){
        let item = sidebar_elements[index];
        sidebar_html += `<a href=\"${item.href}\" class=\"box\" id=\"${item.id}\"><i><img src=\"${item.img.src}\" alt=\"${item.img.alt}\"></i><span>${item.text}</span></a>`;
    }

    document.getElementsByClassName("sidebar")[0].innerHTML += sidebar_html;
    document.getElementsByClassName("mobile-sidebar")[0].innerHTML += sidebar_html;
}

function initCards(){
    let elements = document.getElementsByClassName("card");

    if(elements != null){
        if(elements.length > 0){
            for (let ele_key in elements){
                VanillaTilt.init(elements[ele_key], {
                    max: 10,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.5
                });
            }
        }
    }
}

function initAllMonitor(){
    let cpu_monitor_container = document.getElementById("cpu-monitor");
    let memory_monitor_container = document.getElementById("memory-monitor");
    let disk_monitor_container = document.getElementById("disk-monitor");
    let temperature_monitor_container = document.getElementById("temperature-monitor");

    let cpu_option = {
        backgroundColor: "rgba(0, 0, 0, 0)",
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.35, '#7CFFB2'],
                            [0.65, '#FDDD60'],
                            [0.8, '#FDAA60'],
                            [1, '#FF6E76']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 10,
                    offsetCenter: [0, '-45%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 1
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 10,
                    distance: -60,
                    formatter: function (value) {
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-26%'],
                    fontSize: 12
                },
                detail: {
                    fontSize: 17,
                    offsetCenter: [0, '0%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return ' ' + value.toFixed(2) + ' %';
                    },
                    color: 'auto'
                },
                data: [
                    {
                        value: 0,
                        name: 'CPU使用率',  // 可变参数，内存仪表盘会变
                    }
                ]
            }
        ]
    };

    let memory_option = deepCopy(cpu_option);
    memory_option.series[0].data[0].name = "内存使用率";
    let disk_option = deepCopy(cpu_option);
    disk_option.series[0].data[0].name = "磁盘使用率";
    let temperature_option = deepCopy(cpu_option);
    temperature_option.series[0].data[0].name = "CPU温度";
    temperature_option.series[0].detail.formatter = function (value) {return ' ' + value.toFixed(1) + ' ℃';};

    let cpu_monitor = echarts.init(cpu_monitor_container, "dark");
    let memory_monitor = echarts.init(memory_monitor_container, "dark");
    let disk_monitor = echarts.init(disk_monitor_container, "dark");
    let temperature_monitor = echarts.init(temperature_monitor_container, "dark");

    cpu_monitor.setOption(cpu_option);
    memory_monitor.setOption(memory_option);
    disk_monitor.setOption(disk_option);
    temperature_monitor.setOption(temperature_option);

    resize_monitors = function (){
        cpu_monitor.resize();
        memory_monitor.resize();
        disk_monitor.resize();
        temperature_monitor.resize();
        cpu_monitor.resize();  // 该方法基于bug运行，请不要删除这行语句！
        disk_monitor.resize();  // 该方法基于bug运行，请不要删除这行语句！
    }

    let websocket;
    try{
        websocket = new WebSocket("wss://slv4.starlight.cool:26666");
        websocket.onerror = function(){
            websocket = new WebSocket("wss://slv6.starlight.cool:26666");
        }
        websocket.onclose = function (){
            websocket = new WebSocket("wss://slv6.starlight.cool:26666");
        }
    }
    catch(err){
        websocket = new WebSocket("wss://slv6.starlight.cool:26666");
    }

    let loader = document.getElementsByClassName("loader")[0];
    let status_frame = document.getElementById("monitor-status");

    websocket.onmessage = function(evt){
        let msg = evt.data;
        let packet = JSON.parse(msg);

        if (packet.header === "serverStatus") {
            if(!loader.classList.contains("hidden")){
                loader.classList.add("hidden");
            }

            status_frame.innerHTML = "实时监控中...";
            status_frame.style.color = "limegreen";
            if(status_frame.classList.contains("hidden")){
                status_frame.classList.remove("hidden");
            }

            let status_data = packet.body;
            cpu_option.series[0].data[0].value = status_data.cpuLoad;
            memory_option.series[0].data[0].value = status_data.memoryLoad;
            disk_option.series[0].data[0].value = status_data.diskLoad;
            temperature_option.series[0].data[0].value = status_data.cpuTemperature;

            cpu_monitor.setOption(cpu_option);
            memory_monitor.setOption(memory_option);
            disk_monitor.setOption(disk_option);
            temperature_monitor.setOption(temperature_option);
        }
    }

    websocket.onerror = function (){
        if(!loader.classList.contains("hidden")){
            loader.classList.add("hidden");
        }

        status_frame.innerHTML = "好像连不上服务器了...";
        status_frame.style.color = "indianred";
        if(status_frame.classList.contains("hidden")){
            status_frame.classList.remove("hidden");
        }
    }

    websocket.onclose = function (){
        if(!loader.classList.contains("hidden")){
            loader.classList.add("hidden");
        }

        status_frame.innerHTML = "好像连不上服务器了...";
        status_frame.style.color = "indianred";
        if(status_frame.classList.contains("hidden")){
            status_frame.classList.remove("hidden");
        }
    }
}

function initBulletScreen(){
    let delay = 0;
    let bullet_screen = document.getElementById("bullet-screens");

    for(let i in player_bullets){
        let new_block = document.createElement("div");
        new_block.innerText = player_bullets[i];
        new_block.classList.add("block");
        new_block.style.setProperty("--i", delay.toString());
        new_block.style.setProperty("top", (10 + randomNum(0, 27) * 3) + "%");
        new_block.style.setProperty("min-width", (16 * player_bullets[i].length) + "px");
        bullet_screen.appendChild(new_block);

        delay++;
    }
}

/* 初始化春节小灯笼 */
function initLantern(){
    let date = new Date();
    let month = date.getMonth() + 1;

    if(month === 12 || month === 1 || month === 2){
        let main_container = document.getElementsByClassName("main-container")[0];

        let new_container = document.createElement("div");
        new_container.classList.add("lantern-container");
        new_container.innerHTML = `
        <div class="lantern-box-left">
            <div class="lantern">
                <div class="string"></div>
                <div class="lantern-a">
                    <div class="lantern-b">
                        <div class="lantern-text">福</div>
                    </div>
                </div>
                <div class="spike spike-a">
                    <div class="spike-c"></div>
                    <div class="spike-b"></div>
                </div>
            </div>
        </div>
        <div class="lantern-box-right">
            <div class="lantern">
                <div class="string"></div>
                <div class="lantern-a">
                    <div class="lantern-b">
                        <div class="lantern-text">福</div>
                    </div>
                </div>
                <div class="spike spike-a">
                    <div class="spike-c"></div>
                    <div class="spike-b"></div>
                </div>
            </div>
        </div>
        `

        main_container.appendChild(new_container);
    }
}

/* 自动更新年份 */
function autoUpdateYear(){
    let year_dom = document.getElementById("year-now");
    let date = new Date();

    year_dom.innerText = date.getFullYear().toString();
}

/* 自适应屏幕变化 */
function fitWindow(){
    stopSakura();
    startSakura();

    let mobile_sidebar_btn = document.getElementById("mobile-sidebar-btn");
    let close_sidebar_btn = document.getElementById("close-sidebar-btn");
    let sidebar_ele = document.getElementsByClassName("sidebar")[0];
    let mobile_sidebar_ele = document.getElementsByClassName("mobile-sidebar")[0];

    let enable_mobile_sidebar_btn = function (){
        if(!mobile_sidebar_btn.classList.contains("hidden")){
            mobile_sidebar_btn.classList.add("hidden");
        }
        else {
            mobile_sidebar_btn.classList.remove("hidden");
        }

        if(!mobile_sidebar_ele.classList.contains("show-sidebar")){
            mobile_sidebar_ele.classList.add("show-sidebar");
            fadeIn(mobile_sidebar_ele, 100);
        }
        else {
            mobile_sidebar_ele.classList.remove("show-sidebar");
        }
    };


    if(window.screen.width < 500){  // 窄框手机屏幕
        if(mobile_sidebar_btn.classList.contains("hidden")){
            mobile_sidebar_btn.classList.remove("hidden");
        }

        if(mobile_sidebar_ele.classList.contains("hidden")){
            mobile_sidebar_ele.classList.remove("hidden");
        }

        if(!sidebar_ele.classList.contains("hidden")){
            sidebar_ele.classList.add("hidden");
        }
        mobile_sidebar_btn.addEventListener("click", enable_mobile_sidebar_btn);
        close_sidebar_btn.addEventListener("click", enable_mobile_sidebar_btn);
    }
    else {
        if(!mobile_sidebar_btn.classList.contains("hidden")){
            mobile_sidebar_btn.classList.add("hidden");
        }

        if(!mobile_sidebar_ele.classList.contains("hidden")){
            mobile_sidebar_ele.classList.add("hidden");
        }

        if(sidebar_ele.classList.contains("hidden")){
            sidebar_ele.classList.remove("hidden");
        }
        mobile_sidebar_btn.removeEventListener("click", enable_mobile_sidebar_btn);
        close_sidebar_btn.removeEventListener("click", enable_mobile_sidebar_btn);
    }
}

function autoChangeSubTitle(){
    let subtitle_ele = document.getElementById("subtitle-text");
    let position = 0;

    setInterval(function (){
        subtitle_ele.style.top = "50px";

        if(position >= (subtitle.length - 1)){
            position = 0
        }
        else {
            ++position;
        }

        setTimeout(function (){
            subtitle_ele.innerText = subtitle[position];
            subtitle_ele.style.top = "0";
        }, 720);
    }, 8000);
}