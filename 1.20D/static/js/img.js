  var mouse = document.querySelector('.mouse');
        window.addEventListener('mousemove',function(event){    
            mouse.style.left = event.clientX - mouse.offsetWidth/2 + 'px' ;
            mouse.style.top = event.clientY -mouse.offsetHeight/2 + 'px';       
        })// JavaScript Document