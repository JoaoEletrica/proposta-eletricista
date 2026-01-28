const { jsPDF } = window.jspdf;

function gerarPDF() {
  const cliente = clienteEl.value;
  const endereco = enderecoEl.value;
  const servico = servicoEl.value;
  const valor = valorEl.value;
  const dataAg = dataAgendamento.value;
  const horaAg = horaAgendamento.value;

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  const doc = new jsPDF();

  doc.setFillColor(13, 71, 161);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255,255,255);
  doc.setFontSize(16);
  doc.text("JOÃO VITOR BRIGHENTI ELETRICISTA",105,18,{align:"center"});

  doc.setTextColor(0,0,0);
  doc.setFontSize(11);

  let y = 45;

  doc.text(`Data do Orçamento: ${dataHoje}`,14,y); y+=8;
  doc.text(`Cliente: ${cliente}`,14,y); y+=8;
  doc.text(`Endereço: ${endereco}`,14,y); y+=8;
  doc.text(`Agendamento: ${dataAg} às ${horaAg}`,14,y); y+=10;

  doc.line(14,y,196,y); y+=10;

  doc.text("Serviço:",14,y); y+=8;
  doc.text(servico,14,y,{maxWidth:180}); y+=20;

  doc.setFillColor(13,71,161);
  doc.rect(14,y,182,15,"F");
  doc.setTextColor(255,255,255);
  doc.setFontSize(14);
  doc.text(`VALOR FINAL: R$ ${valor}`,105,y+10,{align:"center"});

  doc.setTextColor(0,0,0);
  y+=30;

  doc.line(14,y,80,y); y+=6;
  doc.text("Assinado por:",14,y); y+=6;
  doc.text("Eletricista João Vitor Brighenti",14,y);

  const logo = new Image();
  logo.src = "logo.png";
  doc.addImage(logo,"PNG",150,250,40,20);

  doc.save(`orcamento-${cliente}.pdf`);

  salvarHistorico(cliente, servico, valor, dataAg, horaAg);
}

function enviarWhats() {
  const tel = telefone.value;
  const cliente = clienteEl.value;

  const msg = encodeURIComponent(
    `Olá ${cliente}, segue seu orçamento. Qualquer dúvida fico à disposição.`
  );

  window.open(`https://wa.me/${tel}?text=${msg}`);
}

/* ===== HISTÓRICO ===== */

const clienteEl = document.getElementById("cliente");
const enderecoEl = document.getElementById("endereco");
const servicoEl = document.getElementById("servico");
const valorEl = document.getElementById("valor");

function salvarHistorico(cliente, servico, valor, data, hora) {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.push({
    cliente,
    servico,
    valor,
    data,
    hora,
    criado: new Date().toLocaleDateString("pt-BR")
  });

  localStorage.setItem("historico", JSON.stringify(historico));
  carregarHistorico();
}

function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const div = document.getElementById("historico");

  div.innerHTML = "";

  historico.reverse().forEach(item => {
    div.innerHTML += `
      <div class="card">
        <strong>${item.cliente}</strong><br>
        Serviço: ${item.servico}<br>
        Valor: R$ ${item.valor}<br>
        Agendado: ${item.data} ${item.hora}<br>
        Criado em: ${item.criado}
      </div>
    `;
  });
}

carregarHistorico();

