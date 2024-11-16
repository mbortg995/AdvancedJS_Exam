const endpoint = 'https://demo.tesserapass.es/api/company/de-ruta-con-miguel/events/5';

function setvalues(a){
  // Capturamos con DOM los elementos de la web y le metemos elementos del JSON de la API.
  const header_div = document.getElementById('header');

  // Creo elemento img y le meto de source el link de la imagen. Lo chuto dentro de header.
  const img = document.createElement('img');
  header_div.appendChild(img);
  img.setAttribute('class', 'img');
  img.src = a.event.image;

  // Creo un div para la cabecera del evento. Nombre del evento + descripcion.
  const event_name = document.createElement('div');
  header_div.appendChild(event_name);
  event_name.setAttribute('class', 'event_name');

  const h1_event_name = document.createElement('h1');
  event_name.appendChild(h1_event_name);
  h1_event_name.innerText = a.company.name;

  const br = document.createElement('br');
  event_name.appendChild(br);

  const h2_event_name = document.createElement('h2');
  event_name.appendChild(h2_event_name);
  h2_event_name.innerText = a.event.description;

  // Vamos a la parte del donde y cuando.
  const location = document.getElementById('location');
  location.innerText = a.event.address;

  // OJO REVISAR: FALTA FORMATEAR LA FECHA
  const time = document.getElementById('time');
  const date_event = a.event.start_at;
  const formatted_date_event = new Date(date_event);

  // Numero de tickes maximo definido por el máximo de tickets en la API
  const tickets = document.getElementById('tickets');
  for(let i =1; i<=a.event.max_tickets_for_order; i++){
    const ticket_option = document.createElement('option');
    ticket_option.setAttribute('value', i);
    ticket_option.innerText = i;
    tickets.appendChild(ticket_option);
  }

}

async function connectAPI(){
  const response = await fetch(endpoint);
  const api_response = await response.json();
  console.log(api_response);
  setvalues(api_response);
}

function capture_form(){

}

function main(){
  connectAPI();
}

main();