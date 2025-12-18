// Función para mostrar u ocultar información extra de un producto
function toggleExtra(id){
  const el = document.getElementById(id);
  if(!el) return;

  // Alternar la visibilida
  if(el.style.display === 'block'){
    el.style.display = 'none';
  } else {
    el.style.display = 'block';
    el.scrollIntoView({behavior:'smooth',block:'center'});
  }
}

// Función para aplicar un descuento a un producto
function applyPromo(productId, percent){
  const priceEl = document.getElementById('price-'+productId);
  const promoEl = document.getElementById('promo-'+productId);
  if(!priceEl) return;

  // Obtener el precio base desde el atributo data-base o desde el texto
  const base = parseFloat(priceEl.dataset.base || priceEl.textContent.replace(/[^0-9\.]/g,''));
  
  // Calcular precio con descuento
  const discounted = (base * (1 - percent/100));
  
  // Actualizar el precio en pantalla
  priceEl.textContent = '€' + discounted.toFixed(2);
  
  // Si hay elemento de promoción, mostrar mensaje animado
  if(promoEl){
    promoEl.textContent = `Precio promocional ${percent}% aplicado: -${percent}%`;
    promoEl.animate([{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'ease-out'});
  }
}

// Actualiza los precios mostrados desde data-base al cargar la página
document.addEventListener('DOMContentLoaded',()=>{
  
  // Para cada elemento con atributo data-base
  document.querySelectorAll('.price[data-base]').forEach(el=>{
    const base = parseFloat(el.dataset.base);
    // Mostrar precio con 2 decimales
    if(!isNaN(base)) el.textContent = '€'+base.toFixed(2);
  });
});
