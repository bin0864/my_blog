const wrap = document.querySelector('#wrap')
const fixedTopBtn = document.querySelector('.top')

console.log(wrap)

fixedTopBtn.addEventListener('click', ()=>[
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
])

window.addEventListener('scroll', ()=>{
    console.log(window.scrollY)
    if(window.scrollY>100){
        wrap.classList.add('scroll')
    }else{
        wrap.classList.remove('scroll')
    }
})