const menu=[
{name:"Caramel Latte",desc:"Espresso, silky milk & caramel",price:189,cat:"coffee",icon:"☕"},
{name:"Strawberry Latte",desc:"Creamy latte with a sweet berry finish",price:199,cat:"coffee",icon:"🍓"},
{name:"Cold Coffee",desc:"Chilled, smooth & lightly sweet",price:149,cat:"coffee",icon:"🧋"},
{name:"Cappuccino",desc:"Bold espresso with creamy foam",price:159,cat:"coffee",icon:"☕"},
{name:"Couple's Croissant",desc:"Buttery, flaky & made to share",price:169,cat:"bites",icon:"🥐"},
{name:"Creamy Pink Pasta",desc:"House sauce, herbs & parmesan",price:279,cat:"bites",icon:"🍝"},
{name:"Avocado Toast",desc:"Sourdough, avocado & herbs",price:229,cat:"bites",icon:"🥑"},
{name:"Chocolate Cake",desc:"Rich chocolate with a soft center",price:179,cat:"sweet",icon:"🍰"},
{name:"Love Berry Cheesecake",desc:"Creamy cheesecake with berry glaze",price:219,cat:"sweet",icon:"🍓"},
{name:"Warm Brownie",desc:"Fudgy brownie made for two",price:159,cat:"sweet",icon:"🍫"}];

let cart=[];

const grid=document.getElementById("menuGrid");

function render(cat="all"){
 const list=menu.filter(x=>cat==="all"||x.cat===cat);
 grid.innerHTML=list.map(x=>{
  const i=menu.indexOf(x);
  return `<article class="item">
    <div class="icon">${x.icon}</div>
    <h3>${x.name}</h3>
    <strong>₹${x.price}</strong>
    <p>${x.desc}</p>
    <button onclick="add(${i})">+ Add</button>
  </article>`;
 }).join("");
}

function add(i){
 cart.push(menu[i]);
 document.getElementById("cartCount").textContent=cart.length;
 toast("Added to your little order ♥");
}

function openCart(){
 document.getElementById("cartModal").classList.add("show");
 drawCart();
}

function closeCart(){
 document.getElementById("cartModal").classList.remove("show");
}

function drawCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){
  box.innerHTML='<div class="empty">Nothing here yet.<br>Choose something delicious. ♥</div>';
  document.getElementById("cartTotal").textContent="₹0";
  return;
 }
 box.innerHTML=cart.map((x,i)=>`
  <div class="cart-line">
   <span>${x.icon} ${x.name}</span>
   <b>₹${x.price}</b>
  </div>`).join("");
 document.getElementById("cartTotal").textContent="₹"+cart.reduce((s,x)=>s+x.price,0);
}

function placeOrder(){
 if(!cart.length){toast("Your order is empty ♥");return;}
 const name=prompt("Your name?");
 if(!name)return;
 const phone=prompt("Your phone number?");
 if(!phone)return;

 const total=cart.reduce((s,x)=>s+x.price,0);
 const lines=cart.map((x,i)=>`${i+1}. ${x.name} × 1 — ₹${x.price}`).join("\n");
 const msg=`💗 NEW ORDER — Rettika & Shubham Café\n\n👤 Customer: ${name}\n📞 Phone: ${phone}\n\n☕ ORDER\n${lines}\n\n💰 Total: ₹${total}\n\nMade with love. Please confirm the order.`;
 const url=`https://wa.me/919051858997?text=${encodeURIComponent(msg)}`;

 window.location.href = url;
 cart=[];
 document.getElementById("cartCount").textContent="0";
 drawCart();
 closeCart();
 toast("Your order is ready for WhatsApp ♥");
}

function reserve(){
 const name=document.getElementById("rName").value.trim();
 const phone=document.getElementById("rPhone").value.trim();
 const people=document.getElementById("rPeople").value;
 const date=document.getElementById("rDate").value;
 if(!name||!phone||!date){toast("Please fill all reservation details.");return;}
 const msg=`💌 TABLE RESERVATION — Rettika & Shubham Café\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n👥 Guests: ${people}\n📅 Date: ${date}\n\nPlease confirm the reservation.`;
 window.open(`https://wa.me/919051858997?text=${encodeURIComponent(msg)}`,"_blank");
 document.getElementById("reserveMsg").textContent="WhatsApp opened with your reservation request ♥";
}

function toast(text){
 const t=document.getElementById("toast");
 t.textContent=text;
 t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),2600);
}

function toggleNav(){
 document.getElementById("nav").classList.toggle("open");
}

document.querySelectorAll(".category button").forEach(btn=>{
 btn.addEventListener("click",()=>{
  document.querySelectorAll(".category button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  render(btn.dataset.cat);
 });
});

document.getElementById("enterBtn").addEventListener("click",async ()=>{
 document.getElementById("intro").classList.add("hide");
 try {
  await cafeMusic.play();
  musicOn = true;
  document.getElementById("soundBtn").textContent = "♫";
 } catch(e) {}
 for(let i=0;i<12;i++){
  setTimeout(()=>{
   const h=document.createElement("span");
   h.className="heart";
   h.textContent=["♥","♡","❤"][Math.floor(Math.random()*3)];
   h.style.left=Math.random()*100+"%";
   h.style.bottom="-20px";
   h.style.fontSize=(12+Math.random()*18)+"px";
   document.getElementById("hearts").appendChild(h);
   setTimeout(()=>h.remove(),4000);
  },i*120);
 }
});

const cafeMusic = document.getElementById("cafeMusic");
cafeMusic.volume = 0.05;
let musicOn = false;

document.getElementById("soundBtn").addEventListener("click", async ()=>{
 if (musicOn) {
  cafeMusic.pause();
  musicOn = false;
  document.getElementById("soundBtn").textContent = "♪";
  toast("Café music paused ♡");
 } else {
  try {
   await cafeMusic.play();
   musicOn = true;
   document.getElementById("soundBtn").textContent = "♫";
   toast("Café ambience ON ♪");
  } catch(e) {
   toast("Tap the music button again to start ♪");
  }
 }
});

render();
