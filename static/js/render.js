/* 作者:Disy & StarLight，拷贝及使用前请务必征得作者同意！ */

let resize_monitors;  // 窗口大小变化时需要调用






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