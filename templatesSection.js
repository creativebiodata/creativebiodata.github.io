/* 8 templates per category (reusing your 4 local images) */
const templates={
  elegant:[
    {title:"Elegant Minimalist",desc:"Graceful layout with clean typography and balanced spacing.",features:["Soft tones","A4 ready","Elegant header"],img:"template1.jpg"},
    {title:"Classic White",desc:"Minimal look for sophisticated families.",features:["Subtle borders","Photo layout","Digital & print ready"],img:"template2.jpg"},
    {title:"Graceful Design",desc:"Timeless and balanced design.",features:["Classic fonts","Photo focus","Printable format"],img:"template3.jpg"},
    {title:"Refined Charm",desc:"Soft pastel hues with balanced margins.",features:["Color harmony","Professional fonts","A4 setup"],img:"template4.jpg"},
    {title:"Subtle Shine",desc:"Elegant yet simple biodata for modern couples.",features:["Light borders","Clear spacing","Clean icons"],img:"template1.jpg"},
    {title:"Soft Aura",desc:"Simple biodata with calm colors.",features:["Two-column layout","Photo highlight","Perfect for print"],img:"template2.jpg"},
    {title:"Golden Simplicity",desc:"Elegant with a gentle golden accent.",features:["Printable","Modern fonts","Premium touch"],img:"template3.jpg"},
    {title:"Balanced Beauty",desc:"Beautifully aligned biodata layout.",features:["Clean visuals","Readable","Space for photo"],img:"template4.jpg"}
  ],
  royal:[
    {title:"Royal Heritage",desc:"Traditional grandeur with gold elements.",features:["Gold accents","Family crest space","Rich typography"],img:"template3.jpg"},
    {title:"Cultural Royalty",desc:"Luxurious design inspired by Indian palaces.",features:["Decorative frames","Elegant title fonts","Photo & details"],img:"template4.jpg"},
    {title:"Regal Touch",desc:"Bold borders and vintage look.",features:["Royal fonts","Deep colors","Classic frame"],img:"template1.jpg"},
    {title:"Imperial Grace",desc:"Traditional and artistic layout.",features:["Ethnic design","A4 printable","Family details"],img:"template2.jpg"},
    {title:"Majestic Bloom",desc:"Inspired by royal invitations.",features:["Cultural tone","Luxury appeal","Customizable"],img:"template3.jpg"},
    {title:"Golden Frame",desc:"Decorative style with gold hues.",features:["Traditional fonts","Aesthetic look","Photo ready"],img:"template4.jpg"},
    {title:"Royal Legacy",desc:"Classic heritage layout.",features:["Detailed section","Elegant headers","Print optimized"],img:"template1.jpg"},
    {title:"Indian Royal",desc:"Rich pattern inspired by weddings.",features:["Bold frame","Classic colors","Cultural layout"],img:"template2.jpg"}
  ],
  modern:[
    {title:"Contemporary Love",desc:"Clean and stylish layout.",features:["Grid sections","Soft gradients","Professional look"],img:"template1.jpg"},
    {title:"Urban Chic",desc:"Trendy biodata with modern fonts.",features:["Photo-ready","Editable sections","Sleek design"],img:"template2.jpg"},
    {title:"Modern Classic",desc:"Modern structure with timeless fonts.",features:["Typography focus","Printable","Digital format"],img:"template3.jpg"},
    {title:"Stylish Edge",desc:"Minimal yet bold design.",features:["Professional look","Dynamic header","A4 ready"],img:"template4.jpg"},
    {title:"Metro Vibes",desc:"Sleek metro-inspired layout.",features:["Modern icons","Two-column","Clean lines"],img:"template1.jpg"},
    {title:"Tech Fusion",desc:"Perfect for tech professionals.",features:["Minimal","Grey accents","Structured"],img:"template2.jpg"},
    {title:"Flat Design",desc:"Flat layout with color accents.",features:["Flat theme","Modern blocks","Readable"],img:"template3.jpg"},
    {title:"Professional Bio",desc:"Designed for career-oriented profiles.",features:["Corporate fonts","ATS safe","Digital print"],img:"template4.jpg"}
  ],
  creative:[
    {title:"Vibrant Hearts",desc:"Colorful and bold layout full of life.",features:["Bright palette","Photo collage","Fun typography"],img:"template3.jpg"},
    {title:"Modern Flow",desc:"Artistic design for creative personalities.",features:["Infographic style","Modern icons","Highlight colors"],img:"template4.jpg"},
    {title:"Dynamic Design",desc:"Expressive and unique layout.",features:["Color blocks","Bold fonts","Playful visuals"],img:"template1.jpg"},
    {title:"Art Deco",desc:"Retro artistic style for creative souls.",features:["Golden touch","Abstract art","Classy vibe"],img:"template2.jpg"},
    {title:"Vivid Lines",desc:"Energy-filled and colorful design.",features:["Gradient visuals","Dynamic layout","Eye-catching"],img:"template3.jpg"},
    {title:"Creative Spark",desc:"Out-of-box visual story.",features:["Illustrations","Soft gradients","Modern layout"],img:"template4.jpg"},
    {title:"Bold Impressions",desc:"For artistic couples with style.",features:["Custom fonts","Vibrant background","Unique header"],img:"template1.jpg"},
    {title:"Color Symphony",desc:"Perfect mix of design and emotion.",features:["Vivid colors","Layered visuals","Emotional tone"],img:"template2.jpg"}
  ]
};

const stage=document.getElementById('carouselStage');
const wrappers=document.querySelectorAll('.carousel-wrapper');
const tabs=document.querySelectorAll('.tab');
const modal=document.getElementById("previewModal");
const modalTitle=document.getElementById("modalTitle");
const modalImage=document.getElementById("modalImage");
const modalDesc=document.getElementById("modalDesc");
const modalFeatures=document.getElementById("modalFeatures");
const closeModal=document.getElementById("closeModal");

/* Populate carousels */
Object.keys(templates).forEach(cat=>{
  const container=document.getElementById(cat);
  templates[cat].forEach((t,i)=>{
    const card=document.createElement("div");
    card.className="template-card";
    card.innerHTML=`<img src="${t.img}" alt="${t.title}"><div class="template-info"><h3>${t.title}</h3><p>${t.desc}</p></div>`;
    card.addEventListener("click",()=>openModal(cat,i));
    container.appendChild(card);
  });
});

/* Stage height */
function setStageHeight(){
  const active=document.querySelector('.carousel-wrapper.active');
  if(!active)return;
  stage.style.height=active.offsetHeight+'px';
}
function ensureStableHeight(){
  const active=document.querySelector('.carousel-wrapper.active');
  if(!active)return;
  const imgs=active.querySelectorAll('img');
  let loaded=0;
  imgs.forEach(img=>{
    if(img.complete){loaded++;}
    else img.onload=()=>{loaded++;if(loaded===imgs.length)setStageHeight();}
  });
  if(loaded===imgs.length)setStageHeight();
}

/* Tabs */
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const target=tab.dataset.target;
    wrappers.forEach(w=>w.classList.toggle('active',w.dataset.category===target));
    ensureStableHeight();
  });
});

/* Arrows */
wrappers.forEach(w=>{
  const c=w.querySelector('.carousel-container');
  w.querySelector('.arrow-left').onclick=()=>c.scrollBy({left:-300,behavior:'smooth'});
  w.querySelector('.arrow-right').onclick=()=>c.scrollBy({left:300,behavior:'smooth'});
});

/* Modal */
function openModal(cat,i){
  const t=templates[cat][i];
  modalTitle.textContent=t.title;
  modalImage.src=t.img;
  modalDesc.textContent=t.desc;
  modalFeatures.innerHTML=t.features.map(f=>`<li><i data-lucide="check-circle"></i>${f}</li>`).join('');
  modal.classList.add('show');
  lucide.createIcons();
}
closeModal.onclick=()=>modal.classList.remove('show');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show');};
function useTemplate(){alert("Redirecting to customization...");}
function downloadSample(){alert("Downloading sample PDF (watermarked)...");}

window.addEventListener('load',ensureStableHeight);
window.addEventListener('resize',setStageHeight);
lucide.createIcons();