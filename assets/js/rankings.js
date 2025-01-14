async function loadAndDisplayTopRankings() {
    const metaTag = document.querySelector('meta[name="rankings-url"]');
    const url = metaTag ? metaTag.getAttribute('content') : '';

    if (!url) {
        console.error('Rankings URL not found in meta tag.');
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // 按照count值从大到小排序，并取前十个
        const sortedData = data.slice(0, 10).sort((a, b) => b.count - a.count);

        // 添加排名信息（从1开始）
        sortedData.forEach((item, index) => {
            item.rank = index + 1;
        });

        updateTable(sortedData);
    } catch (error) {
        console.error('Error loading rankings:', error);
        // 可以在这里添加一些用户友好的错误消息显示逻辑
    }
}

function updateTable(data) {
    const tbody = document.querySelector('#rankingTable tbody');
    tbody.innerHTML = ''; // 清空现有数据

    data.forEach(ranking => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = ranking.rank;
        row.appendChild(rankCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = ranking.name;
        row.appendChild(nameCell);

        const countCell = document.createElement('td');
        countCell.textContent = ranking.count;
        row.appendChild(countCell);

        tbody.appendChild(row);
    });
}

// 在页面加载完成后调用loadAndDisplayTopRankings函数
window.onload = loadAndDisplayTopRankings;