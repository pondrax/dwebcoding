let headerOpen = false;
const toggleHeader = (ev)=>{
  const header = document.getElementById('header');
  if(!headerOpen){
    header.classList.add('open')
  }else{
    header.classList.remove('open')
  }
  headerOpen = !headerOpen;
}

let sidebarOpen = false;
const toggleSidebar = (ev)=>{
  const sidebar = document.getElementById('sidebar');
  if(sidebarOpen){
    sidebar.style.right = -300 +'px';
  }else{
    sidebar.style.right = 0;
  }
  sidebarOpen = !sidebarOpen;
}


// https://usefulangle.com/post/118/javascript-intersection-observe
const observerScroll = new IntersectionObserver( (entries) => {
  entries.forEach((entry,index) => {
    const delay = 500; //Custom delay animasi saat sejajar (500ms)
    // verikasi element muncul di viewport
    if (entry.isIntersecting) {
      setTimeout(()=>entry.target.classList.add('scrolled'),delay*index)
    }else{
      setTimeout(()=>entry.target.classList.remove('scrolled'),delay*index)
    }
  });
}, {threshold:0.5});

const scrollElements = document.querySelectorAll("[data-scroll]");
scrollElements.forEach(section => {
  observerScroll.observe(section);
});


const observerSpy = new IntersectionObserver( (entries) => {
  const header= document.querySelector('#header')
  const navs = document.querySelectorAll('.nav li a');
  const activeEl = document.querySelector('#sidebar .active-page')
  let listNav = [];
  navs.forEach(el=>{
    listNav.push(el.getAttribute('href').replace('#',''));
    el.addEventListener('click',(ev)=>{
      headerOpen=false;
      header.classList.remove('open')
    })
  })
  entries.forEach((entry,index) => {
    if (entry.isIntersecting) {
      if(listNav.includes(entry.target.id)){
        navs.forEach(el=>{
          // console.log(el.getAttribute('href'), entry.target.id)
          if(el.getAttribute('href') == '#'+entry.target.id){
            //aktifkan link navigasi yang tampil
            el.classList.add('button')
            activeEl.innerText = el.innerText
          }else{
            el.classList.remove('button')
          }
        })
      }
    }
  });
}, {threshold:0.2});

const spyElements = document.querySelectorAll("[data-spy]");
spyElements.forEach(section => {
  observerSpy.observe(section);
});
const counters = document.querySelectorAll('[data-count]');

const updateCount = (el) => {
  const target = + el.getAttribute('data-count');
  const count = + el.innerText;
  const speed = el.getAttribute('data-duration');
  const inc = target / speed; 
  if(count < target) {
    el.innerText = Math.ceil(count + inc);
    setTimeout(()=>updateCount(el), 1);
  } else {
    el.innerText = target;
    // Jika selesai diulang
    const replay = el.getAttribute('data-replay');
    if(replay){
      setTimeout(()=>{
        el.innerText = 0;
        updateCount(el)
      },replay)
    }
  }
}

counters.forEach(el=>{
  updateCount(el);
})
