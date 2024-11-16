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

  // Formateo de fecha
  const time = document.getElementById('time');
  const date_event = a.event.start_at;
  const formatted_date_event = new Date(date_event);

  const dateoptions = { day: 'numeric', month: 'long', year: 'numeric',};
  const formatted_date = formatted_date_event.toLocaleDateString('es-ES', dateoptions);

  const houroptions = { hour: '2-digit', minute: '2-digit', hour12: false,};
  const formatted_hour = formatted_date_event.toLocaleTimeString('es-ES', houroptions);

  const final_date_hour = `${formatted_date} - ${formatted_hour}`;
  time.innerText = final_date_hour + ' - Cierre';

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

  const submit = document.getElementById('submit');
  if(api_response.event.booking_open = false) {
    submit.disabled = true;
    submit.setAttribute('disabled', true);
  }
}

async function submit_form(){
  const endpoint = 'https://demo.tesserapass.es/api/company/feending/events/5/orders';

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const confirm_email = document.getElementById('confirm_email').value;
  const ticket = parseInt(document.getElementById('tickets').value, 10);

  if (email !== confirm_email) {
    alert('El correo electrónico y la confirmación no coinciden. Por favor, verifica los campos.');
    return;
  }

  // JSON para el POST. Hay que hacer un pequeño bucle en función del número de tickets.

  const data = {
    order: {
      full_name: name,
      email: email,
      rrpp: '',
      total_price: 0,
      confirmed_email: confirm_email,
    },
    tickets: Array.from({ length: ticket,}, () => ({
      product_id: '7',
      full_name: name,
      email: email,
    })),
  };

  try {
    // Realiza la solicitud POST a la API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Pedido realizado:', result);
    alert('Entradas compradas con éxito!');
  } catch (error) {
    console.error('Error al realizar el pedido:', error);
    alert('Ocurrió un error al comprar las entradas.');
  }

}

function main(){
  connectAPI();
  const submit = document.getElementById('submit');
  submit.addEventListener('click', () => submit_form());
}

main();