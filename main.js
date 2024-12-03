const endpoint = 'https://demo.tesserapass.es/api/company/de-ruta-con-miguel/events/5';

function displayValues(data){
  const header_div = document.getElementById('header');
  header_div.style.backgroundImage = `url(${data.event.image})`;

  const event_name = document.createElement('div');
  header_div.appendChild(event_name);
  event_name.setAttribute('class', 'event_name');

  const h1_event_name = document.createElement('h1');
  event_name.appendChild(h1_event_name);
  h1_event_name.innerText = data.event.name;

  const h2_event_name = document.createElement('h2');
  event_name.appendChild(h2_event_name);
  h2_event_name.innerText = `Organizado por: ${data.company.name}`;

  const p_event_name = document.createElement('p');
  event_name.appendChild(p_event_name);
  p_event_name.innerText = data.event.description;

  const location = document.getElementById('location');
  location.innerText = data.event.address;

  const time = document.getElementById('time');
  const date_event = data.event.start_at;
  const formatted_date_event = new Date(date_event);

  const dateoptions = { day: 'numeric', month: 'long', year: 'numeric',};
  const formatted_date = formatted_date_event.toLocaleDateString('es-ES', dateoptions);

  const houroptions = { hour: '2-digit', minute: '2-digit', hour12: false,};
  const formatted_hour = formatted_date_event.toLocaleTimeString('es-ES', houroptions);

  const final_date_hour = `${formatted_date} - ${formatted_hour}`;
  time.innerText = final_date_hour + ' - Cierre';

  const tickets = document.getElementById('tickets');
  for(let i =1; i<=data.event.max_tickets_for_order; i++){
    const ticket_option = document.createElement('option');
    ticket_option.setAttribute('value', i);
    ticket_option.innerText = i;
    tickets.appendChild(ticket_option);
  }

}

async function connectAPI(){

  try {
    const response = await fetch(endpoint);
    const api_response = await response.json();
    console.log(api_response);
    displayValues(api_response);
  } catch (error) {
    console.error('Error al realizar el pedido:', error);
  }

}

async function submit_form(){
  const endpoint = 'https://demo.tesserapass.es/api/company/de-ruta-con-miguel/events/5/orders';

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const confirm_email = document.getElementById('confirm_email').value;
  const ticket = parseInt(document.getElementById('tickets').value);

  if (email !== confirm_email) {
    alert('El correo electrónico y la confirmación no coinciden. Por favor, verifica los campos.');
    return;
  }

  const data = {
    order: {
      full_name: name,
      email: email,
      rrpp: '',
      total_price: 0,
      confirmed_email: email,
    },
    tickets: Array.from({ length: ticket,}, () => ({
      product_id: 6,
      full_name: name,
      email: email,
    })),
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Pedido realizado:', result);

    const form =  document.getElementById('form');
    form.setAttribute('style', 'display: none;');
    const confirmed_form = document.getElementById('confirmed_form');
    confirmed_form.removeAttribute('style');
    const p_form = document.getElementById('mail_reponse');
    p_form.textContent = `Hemos enviado un correo a ${email} con las entradas. Por favor, en caso de no verlo en la bandeja principal, revise SPAM.
    Gracias.`;

  } catch (error) {
    console.error('Error al realizar el pedido:', error);
    const form =  document.getElementById('form');
    form.setAttribute('style', 'display: none;');
    const confirmed_form = document.getElementById('error_form');
    error_form.removeAttribute('style');
  }

}

function main(){
  connectAPI();
  const submit = document.getElementById('submit');
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    submit_form();
  });
}

main();