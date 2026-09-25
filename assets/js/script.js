const eventLinks = [['cumpleanos.html','Cumpleaños'],['bautizos.html','Bautizos'],['revelacion.html','Revelación'],['baby-shower.html','Baby shower'],['graduaciones.html','Graduaciones'],['decoracion-personalizada.html','Personalizada']];
const eventIcons = {'Cumpleaños':'🎈','Bautizos':'🕊️','Revelación':'✨','Baby shower':'🧸','Graduaciones':'🎓','Personalizada':'🎨'};
document.querySelectorAll('.nav-links').forEach(nav => {
  if (!nav.querySelector('.nav-category')) {
    const old = Array.from(nav.children).find(el => el.tagName === 'A' && /categorías/i.test(el.textContent));
    if (old) {
      const wrap = document.createElement('div'); wrap.className = 'nav-category';
      const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-expanded','false'); button.innerHTML = 'Eventos <span aria-hidden="true">⌄</span>';
      const menu = document.createElement('div'); menu.className = 'category-menu';
      eventLinks.forEach(([href,label]) => { const a=document.createElement('a'); a.href=href; a.innerHTML=`<span class="menu-event-icon" aria-hidden="true">${eventIcons[label]}</span><span>${label}</span><span class="menu-event-arrow" aria-hidden="true">↗</span>`; menu.appendChild(a); });
      wrap.append(button, menu); old.replaceWith(wrap);
    }
  }
});
document.querySelectorAll('.category-menu a').forEach(link => {
  if (!link.querySelector('.menu-event-icon')) {
    const label = link.textContent.trim();
    link.innerHTML = `<span class="menu-event-icon" aria-hidden="true">${eventIcons[label] || '✳'}</span><span>${label}</span><span class="menu-event-arrow" aria-hidden="true">↗</span>`;
  }
});
document.querySelectorAll('.nav-links a').forEach(link => { if (/galer[ií]a|inspiraci[oó]n/i.test(link.textContent)) { link.href='galeria.html'; link.textContent='Galería'; } });
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  const events = links.querySelector('.nav-category');
  const eventButton = events?.querySelector('button');
  if (events && eventButton) { events.classList.toggle('open',open); eventButton.setAttribute('aria-expanded',String(open)); }
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => links?.classList.remove('open')));
document.querySelectorAll('.nav-category button').forEach(button => button.addEventListener('click', () => { const wrap=button.parentElement; const open=wrap.classList.toggle('open'); button.setAttribute('aria-expanded', String(open)); }));
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dots button')];
let currentSlide = 0;
function showSlide(index) { if (!slides.length) return; currentSlide = (index + slides.length) % slides.length; slides.forEach((slide,i)=>slide.classList.toggle('active',i===currentSlide)); dots.forEach((dot,i)=>{dot.classList.toggle('active',i===currentSlide);dot.setAttribute('aria-current',String(i===currentSlide));}); }
document.querySelector('[data-next]')?.addEventListener('click',()=>showSlide(currentSlide+1));
document.querySelector('[data-prev]')?.addEventListener('click',()=>showSlide(currentSlide-1));
dots.forEach(dot=>dot.addEventListener('click',()=>showSlide(Number(dot.dataset.slide))));
const heroBanner = document.querySelector('.hero-banner');
let swipeStartX = null;
heroBanner?.addEventListener('touchstart', event => { swipeStartX = event.changedTouches[0]?.clientX ?? null; }, { passive:true });
heroBanner?.addEventListener('touchend', event => {
  if (swipeStartX === null) return;
  const distance = event.changedTouches[0].clientX - swipeStartX;
  if (Math.abs(distance) > 45) showSlide(currentSlide + (distance < 0 ? 1 : -1));
  swipeStartX = null;
}, { passive:true });
if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(()=>{ if (!document.hidden && !heroBanner?.matches(':hover, :focus-within')) showSlide(currentSlide+1); }, 7500);
const realRoot = 'assets/images/social-web/';
const photoDescriptions = {
  'social-193904.jpg':'Decoración de cumpleaños temática con globos rosas, lilas y plateados',
  'social-193912.jpg':'Arco de globos blancos y dorados para una revelación',
  'social-193919.jpg':'Decoración de cumpleaños en tonos lilas',
  'social-193924.jpg':'Decoración infantil de piratas con globos rojos, negros y blancos',
  'social-193930.jpg':'Decoración de cumpleaños de 21 años con globos rosas, naranjas y dorados',
  'social-193943.jpg':'Columnas de globos rosas, negros y dorados en la entrada de un local',
  'social-193950.jpg':'Cumpleaños infantil bajo el mar con globos azules y amarillos',
  'social-193956.jpg':'Cumpleaños de superhéroes con globos negros y amarillos',
  'social-194003.jpg':'Montaje de revelación al aire libre con globos blancos',
  'social-194009.jpg':'Decoración de baby shower en beige y blanco con un osito',
  'social-194018.jpg':'Decoración de graduación con globos negros, blancos y dorados',
  'social-194025.jpg':'Decoración de graduación en azul turquesa y dorado',
  'social-194032.jpg':'Decoración personalizada con globos turquesas, blancos y dorados',
  'social-194041.jpg':'Decoración de Primera Comunión con globos rosas y lavanda'
};
const realSets = {
  home: ['social-193930.jpg','social-194041.jpg','social-193912.jpg','social-193919.jpg','social-194018.jpg'],
  'cumpleanos.html': ['social-193930.jpg','social-193924.jpg','social-193919.jpg'],
  'bautizos.html': ['social-194041.jpg','social-194009.jpg','social-193912.jpg'],
  'revelacion.html': ['social-193912.jpg','social-194003.jpg','social-194009.jpg'],
  'baby-shower.html': ['social-194009.jpg','social-193912.jpg','social-194003.jpg'],
  'graduaciones.html': ['social-194018.jpg','social-194025.jpg','social-193930.jpg'],
  'decoracion-personalizada.html': ['social-193904.jpg','social-193943.jpg','social-194032.jpg'],
  'galeria.html': ['social-193904.jpg','social-193912.jpg','social-193919.jpg','social-193924.jpg','social-193930.jpg','social-193943.jpg','social-193950.jpg','social-193956.jpg','social-194003.jpg','social-194009.jpg','social-194018.jpg','social-194025.jpg','social-194032.jpg','social-194041.jpg']
};
const pageKey = location.pathname.endsWith('/') || location.pathname.endsWith('index.html') ? 'home' : location.pathname.split('/').pop();
document.body.dataset.page = pageKey.replace('.html','');
const realSet = realSets[pageKey];
if (realSet) {
  const galleryIntro = document.querySelector('#inspiracion .section-head p');
  if (galleryIntro && pageKey !== 'home') galleryIntro.textContent = pageKey === 'galeria.html' ? 'Fotografías compartidas por Deco Emma. Explora los montajes, colores y detalles.' : 'Trabajos de Deco Emma: ideas reales para encontrar el estilo de tu celebración.';
  const categoryIntro = document.querySelector('.section .section-head p');
  if (categoryIntro && pageKey !== 'home' && pageKey !== 'galeria.html') categoryIntro.textContent = 'Tres montajes para empezar a imaginar los colores y el ambiente de tu día.';
  const galleryImages = [...document.querySelectorAll('#inspiracion img, .gallery figure img')];
  realSet.forEach((file,index) => { const img=galleryImages[index]; if (!img) return; img.src = realRoot + file; img.dataset.lightbox = img.src; img.alt = photoDescriptions[file] || img.alt || 'Decoración con globos de Deco Emma'; });
  const heroImg = document.querySelector('.page-hero-art img');
  if (heroImg && pageKey !== 'home') { heroImg.src = realRoot + realSet[0]; heroImg.alt = photoDescriptions[realSet[0]] || 'Decoración con globos de Deco Emma'; heroImg.dataset.lightbox = heroImg.src; document.querySelector('.page-hero-art')?.classList.add('real-photo'); }
  if (pageKey === 'bautizos.html') { const caption=document.querySelector('.gallery figcaption'); if (caption) caption.textContent='Celebración familiar'; }
}
const categoryContent = {
  'cumpleanos.html': {
    event:'un cumpleaños',
    title:'Una decoración que cuenta quién cumple', intro:'Un cumpleaños puede ser alegre, elegante, temático o una mezcla propia. Aquí conviven montajes infantiles con personajes y propuestas para adultos con números y color.',
    angle:'Elige el ambiente', copy:'Piensa en la edad, la temática y el tono de la celebración. Si tienes una referencia visual, puedes compartirla para orientar los colores y el estilo.', list:['Temáticas infantiles y composiciones coloridas','Celebraciones de adultos con números y nombres','Paletas pastel, intensas, neutras o elegantes'],
    practical:'Para consultar, indica la fecha aproximada, el tipo de cumpleaños, la temática o colores y cualquier referencia. Emma podrá confirmar por WhatsApp qué opciones hay para tu caso.',
    faqs:[['¿Puedo pedir una decoración con una temática concreta?','Puedes contar la temática que tienes en mente y enviar una referencia por WhatsApp para consultar una propuesta.'],['¿Hay opciones tanto para cumpleaños infantiles como de adultos?','El material del perfil muestra decoraciones infantiles y celebraciones de adultos. Comparte la edad y el estilo que buscas para consultar una idea adecuada.'],['¿Se puede incluir un número o un nombre?','En las fotografías aparecen números y nombres. Indica qué texto o número te gustaría y consulta su disponibilidad para tu fecha.'],['¿Cuánto cuesta una decoración de cumpleaños?','Cuéntale a Emma la fecha y tu idea por WhatsApp para pedir un presupuesto.'],['¿La fecha está disponible y qué incluye el montaje?','La disponibilidad y el alcance deben confirmarse directamente con Emma. Pregunta también si el presupuesto contempla montaje, transporte u otros elementos.']]
  },
  'bautizos.html': {
    event:'un bautizo',
    title:'Un ambiente sereno para celebrar en familia', intro:'En las imágenes de Deco Emma se ven propuestas familiares con tonos suaves, flores, fondos decorativos y detalles pensados para vestir el espacio de la celebración.',
    angle:'Define el tono', copy:'Puedes partir de una paleta delicada o de una combinación con más contraste. Comparte las referencias que te gustan y el tipo de celebración para orientar la consulta.', list:['Neutros, beige y dorados suaves','Rosa, lavanda o detalles florales','Fondos y composiciones de globos que aparecen en las referencias'],
    practical:'Cuéntale a Emma la fecha, los colores que prefieres y qué estilo te gustaría ver en las fotografías. Ella puede confirmar por WhatsApp qué propuesta es posible.',
    faqs:[['¿Qué colores puedo pedir para un bautizo?','Las fotos muestran combinaciones suaves, neutras, rosas, lavanda y doradas. Comparte la paleta que te gustaría valorar.'],['¿Puedo enviar una foto del lugar?','Sí, puedes adjuntar una imagen al escribir por WhatsApp para dar contexto. La viabilidad del montaje en ese espacio la confirma Emma.'],['¿Se puede personalizar con el nombre del bebé?','Puedes consultar si es posible añadir un nombre o un detalle personalizado y compartir cómo te gustaría verlo.'],['¿Qué presupuesto necesito?','Pide una valoración a Emma indicando fecha, estilo y detalles deseados.'],['¿Incluye transporte o montaje?','La información disponible no confirma esos aspectos. Pregunta a Emma qué incluye la propuesta para tu celebración.']]
  },
  'revelacion.html': {
    event:'una revelación de género',
    title:'Una sorpresa que se vive con emoción', intro:'Las referencias incluyen montajes de revelación con combinaciones “boy or girl”, tonos azules, blancos y elementos decorativos. El punto de partida puede ser el ambiente que quieres compartir con familia y amistades.',
    angle:'Colores para la sorpresa', copy:'Decide si imaginas una propuesta equilibrada entre rosa y azul, una decoración neutra o un montaje con más contraste. La idea final se consulta según tu fecha y preferencias.', list:['Combinaciones de rosa, azul y blanco presentes en las fotos','Fondos decorativos con mensaje de revelación','Composiciones visuales pensadas para acompañar el momento'],
    practical:'Escribe qué fecha tienes en mente, qué estilo quieres mantener en secreto y qué colores prefieres. Confirma directamente con Emma qué detalles y opciones puede preparar.',
    faqs:[['¿Puedo mantener la sorpresa en secreto?','Indica en el mensaje cómo quieres organizar la consulta y qué información debe mantenerse reservada. Acordad directamente con Emma cómo manejar los detalles.'],['¿Qué colores aparecen en las ideas de revelación?','Las referencias muestran azul, rosa, blanco y tonos suaves. Puedes compartir una paleta distinta si tienes otra idea.'],['¿Puedo pedir un mensaje en el fondo?','Puedes consultar qué texto o personalización se puede incluir para la fecha y compartirlo por WhatsApp.'],['¿Cómo se consulta el precio?','No hay precios publicados aquí. Escribe con la fecha aproximada y una descripción de la idea para solicitar presupuesto.'],['¿Cómo sé si mi fecha está disponible?','No. La fecha, el desplazamiento y los elementos incluidos deben confirmarse directamente con Emma.']]
  },
  'baby-shower.html': {
    event:'un baby shower',
    title:'Una bienvenida en los colores que imaginas', intro:'Aquí hay decoraciones para bebé en tonos neutros, beige, blanco, azul y rosa, junto con fondos y volúmenes de globos. Puedes utilizarlas como referencia al explicar el ambiente que buscas.',
    angle:'Suave, neutro o lleno de color', copy:'Piensa si buscas una paleta tranquila, una combinación tradicional o una propuesta más alegre. Acompaña la consulta con una fecha aproximada y referencias visuales.', list:['Neutros y beige para un acabado sereno','Azul, rosa, blanco y acentos dorados','Ideas para recibir al bebé o reunirse antes de su llegada'],
    practical:'Cuéntale a Emma qué celebras, la fecha, los colores y cualquier detalle que quieras tener en cuenta. La propuesta concreta y disponibilidad se revisan por WhatsApp.',
    faqs:[['¿Tengo que saber ya el nombre o el sexo del bebé?','No hace falta para iniciar la consulta. Puedes explicar el tipo de celebración y los colores que te gustan.'],['¿Hay decoraciones neutras además de rosa y azul?','Sí, las imágenes aportadas incluyen ejemplos en blanco, beige y tonos suaves. Comparte la referencia que más te encaja.'],['¿Puedo pedir una decoración relacionada con una temática?','Puedes comentar la temática y enviar una referencia para preguntar si puede adaptarse a la propuesta.'],['¿Cómo pido un presupuesto?','Escribe por WhatsApp con la fecha aproximada, la idea y los colores. Emma podrá orientarte al conocer tu idea.'],['¿Qué incluye el servicio?','El alcance se confirma con Emma para cada consulta. Pregunta expresamente por montaje, transporte y elementos incluidos.']]
  },
  'graduaciones.html': {
    event:'una graduación',
    title:'Un logro importante también merece su momento', intro:'Las fotografías compartidas incluyen propuestas de graduación con globos en azul, turquesa, blanco, negro y dorado, además de fondos decorativos. Son referencias para pensar el estilo de tu celebración.',
    angle:'Una paleta con carácter', copy:'Puedes orientar la idea hacia los colores de la promoción, un acabado elegante o una composición festiva. Indica qué tipo de graduación celebras y qué elementos te gustaría destacar.', list:['Azul y dorado para un contraste elegante','Turquesa, blanco y tonos intensos','Globos y fondos decorativos visibles en las referencias'],
    practical:'Envía la fecha, los colores de la promoción y cualquier referencia que quieras tomar como punto de partida. Consulta con Emma qué opciones y disponibilidad hay.',
    faqs:[['¿Puedo usar los colores de mi centro o promoción?','Puedes compartir esos colores y preguntar cómo podrían reflejarse en una propuesta de globos.'],['¿Se puede añadir el año de graduación?','En las fotos aparece el año en una decoración. Consulta si puede prepararse ese detalle para tu evento.'],['¿Esta categoría sirve para graduaciones de distintas edades?','Cuéntale a Emma qué etapa celebráis y qué estilo os gusta.'],['¿Hay un precio fijo?','No hay precios publicados. Solicita un presupuesto indicando fecha, idea y detalles deseados.'],['¿Se confirma aquí si hay disponibilidad?','No. La fecha y lo que incluye la propuesta se confirman directamente con Emma.']]
  },
  'decoracion-personalizada.html': {
    event:'una decoración personalizada',
    title:'Una idea propia puede ser el mejor punto de partida', intro:'Las fotos muestran estilos muy distintos: K‑pop, personajes, tonos pastel, propuestas comerciales y montajes al aire libre. Si no encuentras una categoría exacta, puedes explicar tu tema y compartir imágenes de referencia.',
    angle:'Cuéntanos qué quieres imaginar', copy:'Describe la celebración, la atmósfera, los colores y los elementos que te interesan. Una imagen del espacio o una referencia ayuda a iniciar la conversación; Emma confirma después la viabilidad.', list:['Temáticas y combinaciones de color variadas','Montajes para espacios interiores y exteriores que aparecen en las fotos','Inspiración para celebraciones privadas o propuestas visuales comerciales'],
    practical:'Contacta con la fecha aproximada y la idea que quieres explorar. Si el montaje depende del lugar, adjunta una fotografía y pregunta por transporte, montaje y disponibilidad.',
    faqs:[['¿Puedo pedir una temática que no aparece en la web?','Sí puedes consultar cualquier idea. Comparte una referencia y pregunta directamente si se puede adaptar.'],['¿Puedo enviar imágenes de inspiración?','Sí. Puedes enviar fotos, paletas o ejemplos por WhatsApp para explicar mejor lo que imaginas.'],['¿Trabajáis en exteriores o locales?','El perfil muestra imágenes de montajes en distintos espacios, incluido exterior y un local. La viabilidad y ubicación se confirman para cada caso.'],['¿Cómo se calcula el presupuesto?','Envíale a Emma la fecha, el lugar aproximado y tu idea para pedir un presupuesto.'],['¿Incluye todos los elementos que aparecen en la foto?','Las imágenes sirven como referencia visual. Confirma con Emma qué elementos concretos forman parte de la propuesta.']]
  }
};
const relatedByPage = {
  'cumpleanos.html': ['bautizos.html','graduaciones.html','decoracion-personalizada.html'],
  'bautizos.html': ['baby-shower.html','revelacion.html','decoracion-personalizada.html'],
  'revelacion.html': ['baby-shower.html','bautizos.html','cumpleanos.html'],
  'baby-shower.html': ['revelacion.html','bautizos.html','decoracion-personalizada.html'],
  'graduaciones.html': ['cumpleanos.html','decoracion-personalizada.html','bautizos.html'],
  'decoracion-personalizada.html': ['cumpleanos.html','baby-shower.html','graduaciones.html']
};
const category = categoryContent[pageKey];
if (category) {
  const gallerySection = document.querySelector('.gallery')?.closest('.section');
  const ctaSection = document.querySelector('#contacto')?.closest('.section');
  if (gallerySection && ctaSection) {
    gallerySection.id = 'inspiracion';
    const faqMarkup = category.faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
    const relatedMarkup = (relatedByPage[pageKey]||[]).map(href=>{const info=eventLinks.find(([path])=>path===href);return `<a class="related-link" href="${href}"><img src="${realRoot + realSets[href][0]}" alt="" loading="lazy"><strong>${info[1]}</strong><span>Ver celebración ↗</span></a>`}).join('');
    const extra = document.createElement('div');
    extra.innerHTML = `<section class="section editorial-section"><div class="container"><div class="section-head"><div><div class="kicker">Detrás de la idea</div><h2>${category.title}.</h2></div><p>${category.intro}</p></div><div class="detail-grid"><article class="detail-card"><div class="kicker">01 / El ambiente</div><h3>${category.angle}</h3><p>${category.copy}</p><ul>${category.list.map(item=>`<li>${item}</li>`).join('')}</ul></article><article class="detail-card"><div class="kicker">02 / Tu propuesta</div><h3>Empecemos por tu idea</h3><p>${category.practical}</p><a class="text-link" href="https://wa.me/34641586364?text=${encodeURIComponent(`Hola Emma, quiero consultar una decoración de globos para ${category.event}. La fecha aproximada es __ y esta es mi idea: __`)}" target="_blank" rel="noopener noreferrer">Contársela a Emma <span aria-hidden="true">↗</span></a></article></div><p class="honest-note" style="margin-top:20px">Presupuesto, fecha y detalles de cada propuesta: consúltalos directamente con Emma.</p></div></section><section class="section faq-section" id="preguntas"><div class="container"><div class="section-head"><div><div class="kicker">Preguntas habituales</div><h2>Antes de escribirnos.</h2></div><p>Las respuestas rápidas que pueden ayudarte a contar mejor tu idea.</p></div><div class="faq-list">${faqMarkup}</div></div></section><section class="section related-section"><div class="container"><div class="section-head"><div><div class="kicker">Sigue explorando</div><h2>Quizá también te guste...</h2></div></div><div class="related-grid">${relatedMarkup}</div></div></section>`;
    ctaSection.before(extra);
    document.querySelectorAll('.nav-links a').forEach(link => { if (/inspiraci[oó]n|galer[ií]a/i.test(link.textContent)) link.href = 'galeria.html'; });
    const pageNav = document.querySelector('.nav-links');
    if (pageNav && !pageNav.querySelector('a[href="#preguntas"]')) { const faqLink=document.createElement('a'); faqLink.href='#preguntas'; faqLink.textContent='Preguntas'; pageNav.insertBefore(faqLink,pageNav.querySelector('a[href="#contacto"]')); }
  }
}
if (pageKey === 'home') {
  const homeNav = document.querySelector('.nav-links');
  if (homeNav && !homeNav.querySelector('a[href="#preguntas"]')) { const faqLink=document.createElement('a'); faqLink.href='#preguntas'; faqLink.textContent='Preguntas'; homeNav.insertBefore(faqLink,homeNav.querySelector('a[href="#contacto"]')); }
  const homeCta = document.querySelector('#contacto')?.closest('.section');
  if (homeCta) {
    const extra = document.createElement('div');
    extra.innerHTML = `<section class="section home-faq faq-section" id="preguntas"><div class="container"><div class="section-head"><div><div class="kicker">Preguntas habituales</div><h2>Antes de escribirnos.</h2></div><p>Cuéntale a Emma tu idea para saber qué opciones pueden encajar con tu fecha y celebración.</p></div><div class="faq-list"><details><summary>¿Qué información ayuda para pedir presupuesto?</summary><p>Tipo de celebración, fecha aproximada, colores o temática. Si tienes una foto de referencia, también puedes compartirla.</p></details><details><summary>¿Puedo pedir una idea distinta a las que aparecen?</summary><p>Sí. En la página de decoración personalizada puedes explorar otros estilos y explicar qué tienes en mente.</p></details><details><summary>¿Las fotos de la web son montajes de Deco Emma?</summary><p>Sí, la galería reúne fotografías de trabajos compartidos por Deco Emma.</p></details><details><summary>¿La web muestra precios o confirma fechas?</summary><p>Esos detalles se consultan directamente con Emma por WhatsApp.</p></details></div></div></section>`;
    extra.querySelector('h2').innerHTML = 'Resolvamos tus <em>dudas.</em>';
    extra.querySelector('.section-head p').textContent = 'Unas respuestas rápidas para que puedas contarnos tu idea con toda la ilusión y sin complicaciones.';
    homeCta.before(extra);
  }
}
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal img');
let lightboxTrigger = null;
if (modal) { modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-label','Fotografía ampliada'); }
function closeLightbox() { if (!modal?.classList.contains('open')) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); lightboxTrigger?.focus(); }
document.querySelectorAll('.gallery-filter button').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.gallery-filter button').forEach(item => { const active=item===button; item.classList.toggle('active',active); item.setAttribute('aria-pressed',String(active)); });
  document.querySelectorAll('.gallery-page-grid figure').forEach(figure => { figure.hidden = filter !== 'todo' && figure.dataset.category !== filter; });
}));
document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.tabIndex = 0;
  item.setAttribute('role','button');
  item.setAttribute('aria-label',`Ampliar: ${item.alt || 'fotografía'}`);
  const open = () => { if (!modal || !modalImg) return; lightboxTrigger=item; modalImg.src=item.dataset.lightbox; modalImg.alt=item.alt || ''; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.querySelector('.modal-close')?.focus(); };
  item.addEventListener('click',open);
  item.addEventListener('keydown',event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
});
document.querySelector('.modal-close')?.addEventListener('click',closeLightbox);
modal?.addEventListener('click', event => { if (event.target === modal) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
