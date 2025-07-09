// Lista di libri di esempio (puoi sostituirla con dati reali)
const libri = [
  {
    id: 1,
    titolo: "Il Signore degli Anelli",
    prezzo: 19.99,
    copertina: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
  },
  {
    id: 2,
    titolo: "Harry Potter e la Pietra Filosofale",
    prezzo: 14.99,
    copertina: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
  },
  {
    id: 3,
    titolo: "Il Piccolo Principe",
    prezzo: 9.99,
    copertina: "https://covers.openlibrary.org/b/id/8225261-L.jpg"
  },
  {
    id: 4,
    titolo: "1984",
    prezzo: 12.99,
    copertina: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    id: 5,
    titolo: "Orgoglio e Pregiudizio",
    prezzo: 11.99,
    copertina: "https://covers.openlibrary.org/b/id/8091016-L.jpg"
  },
  {
    id: 6,
    titolo: "Moby Dick",
    prezzo: 13.99,
    copertina: "https://covers.openlibrary.org/b/id/8107892-L.jpg"
  }
];

// Funzione per generare le card dei libri
function mostraLibri() {
  const row = document.getElementById('libri-row');
  row.innerHTML = '';
  libri.forEach(libro => {
    // Creo la colonna responsive (col-12 su mobile, col-md-6 su tablet, col-lg-4 su desktop, col-xl-3 su schermi grandi)
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4 col-xl-3 mb-4';
    // Creo la card Bootstrap
    col.innerHTML = `
      <div class="card h-100" id="card-libro-${libro.id}">
        <!-- Immagine di copertina del libro -->
        <img src="${libro.copertina}" class="card-img-top" alt="Copertina di ${libro.titolo}">
        <div class="card-body d-flex flex-column">
          <!-- Titolo del libro -->
          <h5 class="card-title">${libro.titolo}</h5>
          <!-- Prezzo del libro -->
          <p class="card-text">Prezzo: €${libro.prezzo.toFixed(2)}</p>
          <div class="mt-auto d-flex gap-2">
            <!-- Pulsante per scartare la card -->
            <button class="btn btn-danger btn-sm" onclick="scartaCard(${libro.id})">Scarta</button>
            <!-- Pulsante per aggiungere al carrello -->
            <button class="btn btn-success btn-sm" onclick="aggiungiAlCarrello(${libro.id})">Compra ora</button>
          </div>
        </div>
      </div>
    `;
    row.appendChild(col);
  });
}

// Funzione per scartare una card dalla pagina
function scartaCard(id) {
  // Rimuove la card dal DOM
  const card = document.getElementById(`card-libro-${id}`);
  if (card) card.parentElement.remove();
}

// Funzione per ottenere il carrello da localStorage
function getCarrello() {
  // Recupera il carrello dal localStorage o restituisce un array vuoto
  return JSON.parse(localStorage.getItem('carrello')) || [];
}

// Funzione per salvare il carrello su localStorage
function setCarrello(carrello) {
  localStorage.setItem('carrello', JSON.stringify(carrello));
}

// Funzione per aggiungere un libro al carrello
function aggiungiAlCarrello(id) {
  let carrello = getCarrello();
  // Aggiunge solo se non già presente
  if (!carrello.includes(id)) {
    carrello.push(id);
    setCarrello(carrello);
    mostraCarrello();
  }
}

// Funzione per rimuovere un libro dal carrello
function rimuoviDalCarrello(id) {
  let carrello = getCarrello();
  carrello = carrello.filter(libroId => libroId !== id);
  setCarrello(carrello);
  mostraCarrello();
}

// Funzione per mostrare la lista del carrello
function mostraCarrello() {
  const carrello = getCarrello();
  const ul = document.getElementById('carrello');
  const vuoto = document.getElementById('carrello-vuoto');
  ul.innerHTML = '';
  if (carrello.length === 0) {
    vuoto.style.display = '';
    return;
  }
  vuoto.style.display = 'none';
  carrello.forEach(id => {
    const libro = libri.find(l => l.id === id);
    if (libro) {
      // Creo l'elemento della lista per il carrello
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <span>
          <strong>${libro.titolo}</strong> - €${libro.prezzo.toFixed(2)}
        </span>
        <button class="btn btn-outline-danger btn-sm" onclick="rimuoviDalCarrello(${libro.id})">Rimuovi</button>
      `;
      ul.appendChild(li);
    }
  });
}

// Espongo le funzioni globalmente per l'uso negli attributi onclick
window.scartaCard = scartaCard;
window.aggiungiAlCarrello = aggiungiAlCarrello;
window.rimuoviDalCarrello = rimuoviDalCarrello;

// Inizializzazione della pagina
mostraLibri(); // Mostra le card dei libri
mostraCarrello(); // Mostra il carrello all'avvio 