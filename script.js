let productos = [];

function agregarProducto() {
  const nombre = document.getElementById("nombreProducto").value;
  const descripcion = document.getElementById("descripcionProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const imagen = document.getElementById("imagenProducto").value;

  if (!nombre || !precio) {
    alert("El producto necesita al menos nombre y precio");
    return;
  }

  productos.push({ nombre, descripcion, precio, imagen });
  mostrarProductos();

  document.getElementById("cotizacionForm").reset();
}

function mostrarProductos() {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "";

  productos.forEach((p, index) => {
    contenedor.innerHTML += `
      <div class="card">
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" onclick="window.open('${p.imagen}','_blank')">` : ""}
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <strong>$${p.precio}</strong>
        <br><button onclick="eliminarProducto(${index})">❌ Eliminar</button>
      </div>
    `;
  });
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  mostrarProductos();
}

function exportarHTML() {
  const nombreCotizacion = document.getElementById("nombreCotizacion").value || "Cotización Neón Flex";

  let estilos = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f7f8fb;
      text-align: center;
    }
    h1 {
      color: #007bff;
      margin-bottom: 5px;
    }
    h2 {
      font-weight: normal;
      color: #6c757d;
      margin-top: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-radius: 15px;
      padding: 30px;
      max-width: 1000px;
      margin: 20px auto;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 15px;
      transition: transform 0.2s ease;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.03);
    }
    .card img {
      max-width: 100%;
      border-radius: 10px;
    }
    .card h3 {
      margin: 10px 0 5px;
    }
    .precio {
      color: #28a745;
      font-weight: bold;
      margin-top: 5px;
    }
    /* Modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .modal-content {
      background: #fff;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      animation: fadeIn 0.3s ease;
    }
    .modal-content img {
      max-width: 100%;
      border-radius: 10px;
    }
    .close {
      float: right;
      font-size: 24px;
      cursor: pointer;
      color: #333;
    }
    @keyframes fadeIn {
      from {opacity:0; transform: scale(0.9);}
      to {opacity:1; transform: scale(1);}
    }
  `;

  let contenido = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>${nombreCotizacion}</title>
    <style>${estilos}</style>
  </head>
  <body>
    <h1>Chispas LED</h1>
    <h2>Cotización de Letreros Neón Flex<br>Fecha: ${new Date().toISOString().slice(0,10)}</h2>
    <div class="grid">
  `;

  productos.forEach((p, index) => {
    contenido += `
      <div class="card" onclick="abrirModal(${index})">
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ""}
        <h3>${p.nombre}</h3>
        <p>${p.descripcion || ""}</p>
        <div class="precio">${p.precio.toLocaleString()} COP</div>
      </div>
      <div class="modal" id="modal${index}">
        <div class="modal-content">
          <span class="close" onclick="cerrarModal(${index})">&times;</span>
          ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ""}
          <h3>${p.nombre}</h3>
          <p>${p.descripcion || ""}</p>
          <div class="precio">${p.precio.toLocaleString()} COP</div>
        </div>
      </div>
    `;
  });

  contenido += `
    </div>
    <script>
      function abrirModal(i) {
        document.getElementById("modal"+i).style.display = "flex";
      }
      function cerrarModal(i) {
        document.getElementById("modal"+i).style.display = "none";
      }
      window.onclick = function(e) {
        document.querySelectorAll(".modal").forEach(m => {
          if(e.target === m) m.style.display = "none";
        });
      }
    </script>
  </body>
  </html>
  `;

  const blob = new Blob([contenido], { type: "text/html" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = `${nombreCotizacion}.html`;
  enlace.click();
}

