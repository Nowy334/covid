function btn(){
    const btn = document.querySelector('.btn');
    const icon = document.querySelector('.icon');

    btn.addEventListener('mouseenter', () =>{
        icon.classList.add('icon-active');
        btn.classList.add('btn-active');
    });
    btn.addEventListener('mouseleave', () =>{
        icon.classList.remove('icon-active');
        btn.classList.remove('btn-active');
    });
    btn.addEventListener('click', () =>{
        btn.classList.toggle('btn-active');
    });
    
}


export {btn}