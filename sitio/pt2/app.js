const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const m0=n=>'$'+n,m2=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const CATS=['Entradas','Platos fuertes','Asados y parrilla','Guisos de la casa','Postres tradicionales','Bebidas'];
// id, categoría, nombre, descripción, precio, imagen, ingredientes, kcal
const P=[
['sopa',0,'Sopa de la abuela','Calientita y reconfortante, como de siempre.',65,'t-sopa','caldo de verduras, jitomate, cebolla, ajo, cilantro, tortilla frita',210],
['empanadas',0,'Empanadas de horno','Hechas al horno, doraditas y crujientes.',55,'t-empanadas','masa de trigo, queso, papa, chile poblano, cebolla, mantequilla',320],
['tostadas',0,'Tostadas de frijol','Crujientes con frijoles refritos y queso.',45,'t-tostadas','tortilla de maíz, frijoles refritos, queso fresco, lechuga, crema',280],
['milanesa',1,'Milanesa con puré','Clásica milanesa con puré cremoso.',145,'t-milanesa','milanesa de res, pan molido, huevo, papa, mantequilla, leche, perejil',680],
['mole',1,'Pollo en mole','Pollo bañado en mole tradicional.',150,'t-mole','pollo, mole poblano, chile ancho, chocolate, ajonjolí, arroz',640],
['enchiladas',1,'Enchiladas verdes','Enchiladas bañadas en salsa verde.',125,'t-enchiladas','tortilla de maíz, pollo, tomate verde, chile serrano, crema, queso',520],
['costillas',2,'Costillas BBQ ahumadas','Costillas tiernas con salsa BBQ de la casa.',195,'t-costillas','costilla de cerdo, salsa BBQ, ajo, pimentón ahumado, azúcar morena',760],
['arrachera',2,'Arrachera con chimichurri','Jugosa arrachera con chimichurri casero.',210,'t-arrachera','arrachera, chimichurri, perejil, ajo, orégano, aceite de oliva',690],
['birria',3,'Birria de res','Birria de res cocida lentamente con chiles, especias y aromas de la casa, servida con tortillas, cilantro, cebolla y limón.',160,'t-birria','carne de res, chiles guajillo y ancho, ajo, cebolla, comino, orégano, laurel, tortillas de maíz, cilantro, limón.',620,189],
['chile',3,'Chile relleno','Chile relleno en salsa de la casa.',135,'t-chile','chile poblano, queso, carne molida, jitomate, huevo, harina',450],
['caldo',3,'Caldo de res','Caldo de res con verduras y elote.',120,'t-caldo','res, zanahoria, calabacita, elote, papa, cilantro, limón',380],
['flan',4,'Flan casero','Flan cremoso, hecho en casa.',60,'t-flan','huevo, leche, azúcar, vainilla, caramelo',290],
['arroz',4,'Arroz con leche','Tradicional, cremoso y reconfortante.',50,'t-arroz','arroz, leche, canela, azúcar, pasas',310],
['pastel',4,'Pastel de tres leches','Esponjoso y bañado en tres leches.',70,'t-pastel','bizcocho, leche condensada, leche evaporada, crema, vainilla',420],
['jamaica',5,'Agua de jamaica','Fresca y natural, hecha al momento.',35,'t-jamaica','flor de jamaica, agua, azúcar, limón',90],
['chocolate',5,'Chocolate caliente','Cremoso y calentito, con canela.',45,'t-chocolate','chocolate de metate, leche, canela, azúcar',240],
['cafe',5,'Café de olla','Tradicional café de olla con piloncillo.',40,'t-cafe','café, piloncillo, canela, clavo, agua',60],
// sugerencias del detalle (fuera del menú principal)
['ench',1,'Enchiladas de la casa','Enchiladas de pollo con salsa roja, crema y queso.',149,'rel-enchiladas','tortilla de maíz, pollo deshebrado, salsa roja, crema, queso, cebolla',560,0,1],
['tacos',1,'Tacos de carnitas','Tacos de cerdo en carnitas con cebolla y cilantro.',129,'rel-tacos','cerdo en carnitas, tortilla de maíz, cebolla, cilantro, limón, salsa',480,0,1],
['arroz2',4,'Arroz con leche','Tradicional, cremoso y reconfortante.',79,'rel-arroz','arroz, leche, canela, azúcar, pasas',310,0,1]
].map(([id,c,n,d,p,i,ing,k,pd,h])=>({id,c,n,d,p,i,ing,k,pd:pd||p,h}));
const get=id=>P.find(x=>x.id===id);
const E={cart:[{id:'milanesa',q:2,p:180,i:'c-milanesa'},{id:'birria',q:1,p:185,i:'c-birria'},{id:'jamaica',q:3,p:30,i:'c-jamaica'},{id:'flan',q:2,p:70,i:'c-flan'}],
tipo:'aqui',pago:'Tarjeta',prop:0,folio:1048,cur:'birria',dq:1,snap:null,user:'Ana Martínez'};
let tt;const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),1600)};
const img=i=>`img/${i}.jpg`;

// ----- Menú -----
$('#tabs').innerHTML=CATS.map((c,i)=>`<button data-i="${i}" class="${i?'':'on'}">${c}</button>`).join('');
$('#grid').innerHTML=CATS.map((c,ci)=>`<section class="cat" id="cat${ci}"><h2>${c}</h2>`+P.filter(x=>x.c===ci&&!x.h).map(x=>`<article class="it"><img src="${img(x.i)}" alt="${x.n}" data-p="${x.id}"><div><h3><a data-p="${x.id}">${x.n}</a></h3><p>${x.d.length>60?x.d.slice(0,38)+'…':x.d}</p><div class="f"><b>${m0(x.p)}</b><button class="mini" data-add="${x.id}">Agregar</button></div></div></article>`).join('')+'</section>').join('');
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));const c=$('#cat'+b.dataset.i);c.scrollIntoView({block:'center',behavior:'smooth'});c.classList.add('flash');setTimeout(()=>c.classList.remove('flash'),900)};

function add(id,q=1){const x=get(id),l=E.cart.find(l=>l.id===id);l?l.q+=q:E.cart.push({id,q,p:x.pd===x.p?x.p:x.p,i:x.i});E.snap=null;draw();toast(`${x.n} agregado`)}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(a)return add(a.dataset.add);
  const p=e.target.closest('[data-p]');if(p){E.cur=p.dataset.p;E.dq=1;detalle();location.hash='producto'}
});

// ----- Detalle -----
function detalle(){const x=get(E.cur);$('#d-img').src=img(x.id==='birria'?'birria-grande':x.i);$('#d-img').alt=x.n;
  $('#d-cat').textContent=CATS[x.c];$('#d-nom').textContent=x.n;$('#d-desc').textContent=x.d;$('#d-pr').textContent=m0(x.pd);$('#d-q').textContent=E.dq;
  $('#d-ing').textContent=x.ing;$('#d-kcal').textContent=x.k+' kcal';
  $('#d-tags').innerHTML=(x.ing.includes('leche')||x.ing.includes('queso')||x.ing.includes('crema')||x.ing.includes('mantequilla')?'':'<span>sin lácteos</span>')+(/chile|salsa/.test(x.ing)?'<span>picante medio</span>':'');
  const rel=['ench','tacos','arroz2','birria'].filter(i=>i!==x.id).slice(0,3).map(get);
  $('#d-rel').innerHTML=rel.map(r=>`<a class="rel" data-p="${r.id}"><img src="${img(r.id==='birria'?'t-birria':r.i)}" alt=""><div>${r.n}<b>${m0(r.pd)}</b></div></a>`).join('')}
$('#d-menos').onclick=()=>{E.dq=Math.max(1,E.dq-1);$('#d-q').textContent=E.dq};
$('#d-mas').onclick=()=>{E.dq++;$('#d-q').textContent=E.dq};
$('#d-add').onclick=()=>{const x=get(E.cur),l=E.cart.find(l=>l.id===x.id);l?l.q+=E.dq:E.cart.push({id:x.id,q:E.dq,p:x.pd,i:x.i});E.snap=null;draw();toast(`${x.n} agregado al carrito`)};

// ----- Pedido -----
function draw(){
  $('#lineas').innerHTML=E.cart.length?E.cart.map((l,k)=>`<div class="ln"><img src="${img(l.i)}" alt=""><div><strong>${get(l.id).n}</strong><small>Sin nota</small></div><div class="q"><button data-m="${k}" aria-label="Menos">−</button><span>${l.q}</span><button data-s="${k}" aria-label="Más">+</button></div><b>${m2(l.p*l.q)}</b><button class="x" data-x="${k}">🗑 Quitar</button></div>`).join(''):'<p class="vacio">Tu pedido está vacío. Agrega productos desde el menú.</p>';
  const sub=E.cart.reduce((s,l)=>s+l.p*l.q,0),iva=Math.round(sub*16)/100,tip=Math.round(sub*E.prop)/100,tot=sub+iva+tip;
  $('#t-sub').textContent=m2(sub);$('#t-iva').textContent=m2(iva);$('#t-tot').textContent=m2(tot);
  const f=E.snap||{folio:E.folio,fecha:new Date().toLocaleDateString('es-MX',{day:'numeric',month:'short',year:'numeric'}).replace(/\./g,''),lines:E.cart.map(l=>[l.q,get(l.id).n,l.p*l.q]),tot,tip};
  $('#tk-m').textContent=`Folio #CK-${f.folio}  Fecha ${f.fecha}  Empleado: ${E.user}`;
  $('#tk-t').innerHTML=f.lines.map(r=>`<tr><td>${r[0]} ${r[1]}</td><td>${m2(r[2])}</td></tr>`).join('')+(f.tip?`<tr><td>Propina</td><td>${m2(f.tip)}</td></tr>`:'')+`<tr class="t"><td>Total</td><td>${m2(f.tot)}</td></tr>`;
  window._tot=tot;
}
$('#lineas').onclick=e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.m!==undefined){const l=E.cart[d.m];if(l.q>1)l.q--}
  if(d.s!==undefined)E.cart[d.s].q++;
  if(d.x!==undefined)E.cart.splice(d.x,1);E.snap=null;draw()};
function seg(sel,fn){$(sel).onclick=e=>{const b=e.target.closest('button');if(!b)return;$$(sel+' button').forEach(x=>x.classList.toggle('on',x===b));fn(b.dataset.v)}}
function campo(){const t=E.tipo,w=$('#campo-w'),l=$('#campo-l');
  l.textContent=t==='aqui'?'Número de mesa o nombre del cliente':t==='llevar'?'Nombre del cliente':'Dirección de entrega';
  w.innerHTML=t==='aqui'?'<select id="campo">'+Array.from({length:20},(_,i)=>`<option${i==11?' selected':''}>Mesa ${i+1}</option>`).join('')+'</select>':`<input class="in" id="campo" placeholder="${t==='llevar'?'Nombre':'Calle, número y colonia'}">`}
seg('#seg-tipo',v=>{E.tipo=v;campo()});seg('#seg-pago',v=>E.pago=v);
$('#t-prop').onchange=e=>{E.prop=+e.target.value;E.snap=null;draw()};
$('#gen').onclick=()=>{if(!E.cart.length)return toast('Agrega productos antes de generar el ticket');
  const sub=E.cart.reduce((s,l)=>s+l.p*l.q,0),tip=Math.round(sub*E.prop)/100;
  E.snap={folio:E.folio,fecha:new Date().toLocaleDateString('es-MX',{day:'numeric',month:'short',year:'numeric'}).replace(/\./g,''),lines:E.cart.map(l=>[l.q,get(l.id).n,l.p*l.q]),tot:window._tot,tip};
  toast(`Ticket #CK-${E.folio} generado`);E.folio++;draw();$('#tk').scrollIntoView({behavior:'smooth',block:'center'})};
$('#imp').onclick=()=>window.print();

// ----- Acceso de administrador -----
const msg=(t,ok)=>{const m=$('#msg');m.textContent=t;m.className='msg'+(ok?' ok':'')};
$('#login').onsubmit=e=>{e.preventDefault();const c=$('#correo').value.trim(),k=$('#clave').value;
  if(!/^\S+@\S+\.\S+$/.test(c))return msg('Escribe un correo electrónico válido.');
  if(!k)return msg('Escribe tu contraseña.');
  if(c.toLowerCase()!=='admin@cielokitchen.mx'||k!=='cielo2026')return msg('Correo o contraseña incorrectos.');
  msg('');E.user='Ana Martínez';$('#usr-n').textContent=E.user;$('#login').reset();draw();location.hash='pedido'};
$('#olvido').onclick=()=>{const c=$('#correo').value.trim();msg(/^\S+@\S+\.\S+$/.test(c)?`Enviamos instrucciones a ${c}.`:'Escribe tu correo para recuperar tu contraseña.',/^\S+@\S+\.\S+$/.test(c))};
$('#salir').onclick=()=>{location.hash='admin'};

// ----- Navegación -----
function nav(){const h=location.hash.slice(1);
  $$('.top nav').forEach(n=>[...n.children].forEach((a,i)=>a.classList.toggle('activo',h==='promociones'?i===2:h==='sucursales'?i===3:i===1)));
  if($('#'+h)?.classList.contains('vista')||!h)scrollTo(0,0)}
addEventListener('hashchange',nav);nav();detalle();campo();draw();
