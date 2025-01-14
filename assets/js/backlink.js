document.addEventListener('DOMContentLoaded', function() {
    var backLink = document.getElementById('backLink');
    if (backLink) {
        backLink.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
            history.back();
        });
    }
});