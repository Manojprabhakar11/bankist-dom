'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header=document.querySelector(".header");
const tabs=document.querySelectorAll(".operations__tab");
const tabsContainer=document.querySelector(".operations__tab-container");
const tabsContent=document.querySelectorAll(".operations__content");
const nav=document.querySelector(".nav");
const allSection=document.querySelectorAll(".section");
const imgSrc=document.querySelectorAll("img[data-src]");


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal =  (e)=> {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>{
  btn.addEventListener("click",openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message=document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML="we use cookies for improved functionality.<button class='btn btn--close-cookie'>got it</button>";
// header.prepend(message.cloneNode(false));
header.append(message);
// header.before(message)
// header.after(message);
document
.querySelector(".btn--close-cookie")
.addEventListener("click",function(){
  message.remove();
});

message.style.backgroundColor="black";
message.style.width="120%";
message.style.display="flex";
message.style.flexWrap="wrap";
message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+40+"px";

const btnScrollTo=document.querySelector(".btn--scroll-to");
const section1=document.querySelector("#section--1");

btnScrollTo.addEventListener("click",(e)=>{
  // const s1coords=section1.getBoundingClientRect();
  // window.scrollTo(s1coords.left,s1coords.top+window.pageYOffset);
  section1.scrollIntoView();
});

// document.querySelectorAll(".nav__link").forEach(function(el){
//   el.addEventListener("click",function(e){
//   e.preventDefault();
//   const ids= this.getAttribute("href");
//   document.querySelector(ids).scrollIntoView({behavior:"smooth"});
//  });
// });

document.querySelector(".nav__links").addEventListener("click",(e)=>{
  if(e.target.classList.contains("nav__link")){
  e.preventDefault();
  const ids= e.target.getAttribute("href");
  document.querySelector(ids).scrollIntoView({behavior:"smooth"});
  }
});



tabsContainer.addEventListener("click",function(e){
  const clicked=e.target.closest(".operations__tab");

  if(!clicked)return;

  tabs.forEach((t)=>{
    t.classList.remove("operations__tab--active");
  });

  tabsContent.forEach((c)=>{
    c.classList.remove("operations__content--active");
  });
  clicked.classList.add("operations__tab--active");
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add("operations__content--active");
});

const hover=(e,opacity)=>{
  if(e.target.classList.contains("nav__link")){
    const link=e.target;
    const sibling=link.closest(".nav").querySelectorAll(".nav__link");
    const logo=link.closest(".nav").querySelector("img");
    sibling.forEach((i)=>{
      if(i!==link)i.style.opacity=opacity;
    });
    logo.style.opacity=opacity;
  }
};
nav.addEventListener("mouseover",(e)=>{
  hover(e,0.5);
});

nav.addEventListener("mouseout",(e)=>{
  hover(e,1);
});

const navHeight=nav.getBoundingClientRect().height;

const stickyNav=(entries)=>{
  const [entry]=entries;
  if(!entry.isIntersecting)nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  rootMargin:`-${navHeight}px`,
  thersold:0
});

headerObserver.observe(header);

const revealSection=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  thersold:0.1
});

allSection.forEach((section)=>{
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const loadImg=(entries,observer)=>{
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener("load",function(){
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  thersold:0.5
});

imgSrc.forEach(img=>imgObserver.observe(img));

const  slider=()=>{
const slides=document.querySelectorAll(".slide");
const btnLeft=document.querySelector(".slider__btn--left");
const btnRight=document.querySelector(".slider__btn--right");
const dotContainer=document.querySelector(".dots");
// const slider=document.querySelector(".slider");
let curSlide=0;
let maxSlide=slides.length-1;
// slider.style.overflow="visible";

const createDots=function(){
  slides.forEach((_,i)=>{
    dotContainer.insertAdjacentHTML("beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createDots();

const activateDots=(slide)=>{
  document.querySelectorAll(".dots__dot")
  .forEach((dot=>{
    dot.classList.remove("dots__dot--active");
  }));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add("dots__dot--active");
}
activateDots(0);

const goToSlide=function(curSlide){
  slides.forEach((s,i)=>{
    s.style.transform=`translateX(${100*(i-curSlide)}%)`;
  });
};
goToSlide(0);

btnRight.addEventListener("click",()=>{
  if(curSlide===maxSlide){
    curSlide=0;
  }
  else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
});

btnLeft.addEventListener("click",()=>{
  if(curSlide===0){
    curSlide=maxSlide;
  }
  else{
    curSlide--;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
});

dotContainer.addEventListener("click",(e)=>{
  if(e.target.classList.contains("dots__dot"))
  {
    const slide=e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
});
};

slider();