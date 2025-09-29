import "./style.css";

// Variaveis Modal
const abrirModal = document.getElementById("abrirModal");
const cancelarModal = document.getElementById("cancelarModal");
const dialog = document.getElementById("modalTarefa");
const formTarefa = document.getElementById("formTarefa");

const divmodalExcluir = document.getElementById("divmodalExcluir");
const divmodalConfirmacao = document.getElementById("divmodalConfirmacao");

// Variaveis Modal Botoes
const abrirModalConfirmacao = document.getElementById("modalConfirmacao");
const btnModalConfirmacao = document.getElementById("btnModalConfirmacao");
const btnCancelarModalConfirmacao = document.getElementById(
  "btnCancelarModalConfirmacao"
);
let idParaConfirmar = null;

// Variáveis do Modal de Exclusao
const abrirModalExclusao = document.getElementById("modalExcluir");
const btnModalExclusao = document.getElementById("btnModalExcluir");
const btnCancelarModalExclusao = document.getElementById(
  "btnCancelarModalExcluir"
);
let idParaExcluir = null;

// Variaveis Formulario
const campoTituloTarefa = document.getElementById("tituloTarefa");
const campoDescTarefa = document.getElementById("descTarefa");

// Variaveis LocalStorage
if (localStorage.getItem("contadorID") !== null) {
  let contadorID = localStorage.getItem("contadorID");
} else {
  let contadorID = 0;
  localStorage.setItem("contadorID", contadorID);
}
if (localStorage.getItem("theme") !== null) {
  let theme = localStorage.getItem("theme");
} else {
  let theme = "light";
  localStorage.setItem("theme", theme);
}

// Variaveis Tabela
const bodyTabela = document.getElementById("bodyTabela");
const btnConcluirTabela = document.getElementsByClassName("btnConcluir");

// Variaveis Relogio e Variaveis para Tema
const relogio = document.getElementById("relogio");
const btnTheme = document.getElementById("btnTheme");
const header = document.getElementById("header");
const topSection = document.getElementById("topSection");
const main = document.getElementById("main");
const trHead = document.getElementById("trHead");
const body = document.getElementById("body");

// Variaveis Filtros
const btnFiltroTodas = document.getElementById("btnFiltroTodas");
const btnFiltroPendentes = document.getElementById("btnFiltroPendentes");
const btnFiltroConcluidas = document.getElementById("btnFiltroConcluidas");
let filtroCheck = false;
let varFiltro = "";

// Codigo
function openCheck(dialog) {
  if (dialog.open) {
    console.log("Modal aberto");
  } else {
    console.log("Modal fechado");
  }
}

// Abrir e Fechar Modal Tarefa
abrirModal.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

cancelarModal.addEventListener("click", () => {
  dialog.close("tarefaCancelada");
  openCheck(dialog);
});

// Funcao Abrir Modal Confirmacao
function modalConfirmacao() {
  abrirModalConfirmacao.showModal();
}

// Botoes Modal Confirmacao
btnCancelarModalConfirmacao.addEventListener("click", () => {
  abrirModalConfirmacao.close("confirmacaoCancelada");
});

btnModalConfirmacao.addEventListener("click", () => {
  funcaoBtnConcluir();
  abrirModalConfirmacao.close("confirmacaoConcluida");
});

// Funçao Abri Modal Exclusao
function modalExclusao() {
  abrirModalExclusao.showModal();
}

// Botoes Modal Exclusao
btnCancelarModalExclusao.addEventListener("click", () => {
  abrirModalExclusao.close("exclusaoCancelada");
  idParaExcluir = null;
});

btnModalExclusao.addEventListener("click", () => {
  funcaoBtnExcluir();
  abrirModalExclusao.close("exclusaoConfirmada");
});

// Botao Adicionar tarefa
formTarefa.addEventListener("submit", () => {
  let contadorID = localStorage.getItem("contadorID");
  contadorID++;
  localStorage.setItem("contadorID", contadorID);
  const tituloTarefa = campoTituloTarefa.value;
  const descTarefa = campoDescTarefa.value;
  const dataCriacao = new Date();

  const objTarefa = {
    id: contadorID,
    titulo: tituloTarefa,
    desc: descTarefa,
    dataCriacao: dataCriacao.toLocaleString("pt-br", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    situacao: "Pendente",
  };

  // Puxa a lista existente e adiciona novo objeto
  if (localStorage.getItem("listaTarefas") !== null) {
    let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    listaTarefas.push(objTarefa);
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  } else {
    const listaTarefas = [objTarefa];
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  }
  formTarefa.reset();
  atualizarTabela();
});

// Funcao para atualizar tabela
function atualizarTabela() {
  bodyTabela.innerHTML = ""; // Limpando a tabela
  let listaTarefas = [];
  let theme = localStorage.getItem("theme");
  // const listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));

  if (filtroCheck) {
    console.log("filtro on");
    listaTarefas = JSON.parse(localStorage.getItem("listaTarefas")).filter(
      (item) => item.situacao == varFiltro
    );
    console.log(listaTarefas);
  } else {
    listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
  }

  let contadorLinhas = 0;

  // Criacao das linhas com as informacoes
  listaTarefas.forEach((tarefa) => {
    const linhaTabela = document.createElement("tr");
    linhaTabela.id = tarefa.id;

    if (contadorLinhas % 2 == 0) {
      if (theme == "light") {
        linhaTabela.className =
          "align-middle h-14 bg-gradient-to-r from-purple-400 to-purple-300";
      } else {
        linhaTabela.className =
          "align-middle h-14 bg-gradient-to-r from-gray-400 to-gray-300";
      }
    } else {
      if (theme == "light") {
        linhaTabela.className =
          "align-middle h-14 bg-gradient-to-r from-purple-300 to-purple-200";
      } else {
        linhaTabela.className =
          "align-middle h-14 bg-gradient-to-r from-gray-300 to-gray-200";
      }
    }
    contadorLinhas++;

    const tituloTarefa = document.createElement("td");
    tituloTarefa.textContent = tarefa.titulo;
    tituloTarefa.className = "break-words max-w-[12rem] whitespace-normal p-2";

    const descTarefa = document.createElement("td");
    descTarefa.textContent = tarefa.desc;
    descTarefa.className = "break-words max-w-[12rem] whitespace-normal p-2";

    const dataTarefa = document.createElement("td");
    dataTarefa.textContent = tarefa.dataCriacao;
    dataTarefa.className =
      "break-words text-center max-w-[12rem] whitespace-normal p-2";

    const situacaoTarefa = document.createElement("td");
    situacaoTarefa.textContent = tarefa.situacao;

    // Adicionando botoes concluir e excluir da tabela
    const btnConcluir = document.createElement("button");

    if (tarefa.situacao == "Concluida") {
      btnConcluir.className =
        "btnConcluir bg-black text-white px-3 py-1 rounded m-1";
      btnConcluir.disabled = true;

      //Aproveitando o if para adicionar indicador visual em caso de tarefa concluida
      situacaoTarefa.className =
        "break-words text-center max-w-[12rem] whitespace-normal p-2 bg-green-300";
    } else {
      btnConcluir.className =
        "btnConcluir bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors m-1";
      situacaoTarefa.className =
        "break-words text-center max-w-[12rem] whitespace-normal p-2 bg-orange-300";
    }

    btnConcluir.textContent = "Concluir";
    btnConcluir.addEventListener("click", (event) => {
      idParaConfirmar = event.target.closest("tr").id;
      modalConfirmacao();
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.className =
      "btnExcluir bg-red-700 text-white px-3 py-1 rounded hover:bg-red-400 transition-colors m-1";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", (event) => {
      idParaExcluir = event.target.closest("tr").id;
      modalExclusao();
    });

    // Unindo as informacoes à linha
    linhaTabela.append(tituloTarefa);
    linhaTabela.append(descTarefa);
    linhaTabela.append(dataTarefa);
    linhaTabela.append(situacaoTarefa);

    // Criando celula para os botoes na tabela
    const tdAcoes = document.createElement("td");
    tdAcoes.className = "p-2 flex justify-around flex-wrap h-full";
    tdAcoes.appendChild(btnConcluir);
    tdAcoes.appendChild(btnExcluir);
    linhaTabela.append(tdAcoes);
    linhaTabela.classList.add("border-b", "border-blue-900");

    // Adicionando linha na tabela
    bodyTabela.append(linhaTabela);
  });
}

// Funcoes dos botoes
function funcaoBtnConcluir() {
  const trID = idParaConfirmar;
  let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
  const tarefa = listaTarefas.find((item) => item.id == trID);
  tarefa.situacao = "Concluida";
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  atualizarTabela();
  idParaConfirmar = null;
}

function funcaoBtnExcluir() {
  const trID = idParaExcluir;
  let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
  listaTarefas = listaTarefas.filter((item) => item.id != trID);
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  atualizarTabela();
  idParaExcluir = null;
}

// Funcao Relogio
function ligarRelogio() {
  const relogioId = setInterval(() => {
    const hora = new Date().toLocaleTimeString("pt-br", {
      timeStyle: "medium",
    });
    relogio.textContent = `Hora: ${hora}`;
  }, 1000);
}

// Funcoes Filtro e Funcionamento dos Botoes
btnFiltroPendentes.addEventListener("click", (event) => {
  varFiltro = event.target.innerHTML;
  filtro(varFiltro);
  btnFiltroConcluidas.disabled = false;
  btnFiltroConcluidas.className =
    "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 m-2";
  btnFiltroTodas.disabled = false;
  btnFiltroTodas.className =
    "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 m-2";
  btnFiltroPendentes.disabled = true;
  btnFiltroPendentes.className =
    "bg-gray-600 text-white px-4 py-2 rounded m-2 opacity-50 cursor-not-allowed";
});

btnFiltroConcluidas.addEventListener("click", (event) => {
  varFiltro = event.target.innerHTML;
  filtro(varFiltro);
  btnFiltroConcluidas.disabled = true;
  btnFiltroConcluidas.className =
    "bg-gray-600 text-white px-4 py-2 rounded m-2 opacity-50 cursor-not-allowed";
  btnFiltroConcluidas.className =
    "bg-gray-600 text-white px-4 py-2 rounded m-2 opacity-50 cursor-not-allowed";
  btnFiltroTodas.disabled = false;
  btnFiltroTodas.className =
    "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 m-2";
  btnFiltroPendentes.disabled = false;
  btnFiltroPendentes.className =
    "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 m-2";
});

btnFiltroTodas.addEventListener("click", (event) => {
  varFiltro = event.target.innerHTML;
  filtro(varFiltro);
  btnFiltroConcluidas.disabled = false;
  btnFiltroConcluidas.className =
    "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 m-2";
  btnFiltroTodas.disabled = true;
  btnFiltroTodas.className =
    "bg-gray-600 text-white px-4 py-2 rounded m-2 opacity-50 cursor-not-allowed";
  btnFiltroPendentes.disabled = false;
  btnFiltroPendentes.className =
    "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 m-2";
});

function filtro(varFiltro) {
  if (varFiltro == "Pendente") {
    filtroCheck = true;
    atualizarTabela();
  } else if (varFiltro == "Concluida") {
    filtroCheck = true;
    atualizarTabela();
  } else {
    filtroCheck = false;
    atualizarTabela();
  }
}

// Alteracao de tema
btnTheme.addEventListener("click", (event) => {
  let theme = localStorage.getItem("theme");
  if (theme == "light") {
    console.log("ta escuro");
    theme = "dark";
    localStorage.setItem("theme", theme);
    mudarTema();
  } else {
    console.log("ta claro");
    theme = "light";
    localStorage.setItem("theme", theme);
    mudarTema();
  }
});

function mudarTema() {
  let theme = localStorage.getItem("theme");
  if (theme == "light") {
    // Header e Main
    header.className =
      "flex flex-wrap p-2 justify-between w-full bg-violet-700";
    btnTheme.className = "mr-4 cursor-pointer text-whitez'  ";
    relogio.className = "font-bold text-white";
    topSection.className = "p-4 w-full flex justify-around bg-violet-700";
    main.className = "flex flex-wrap items-center gap-4 mx-auto bg-white";
    body.className = "h-full bg-white";

    // Tabela
    trHead.className = "bg-purple-500 text-black";

    // Modal de tarefa
    formTarefa.className = "flex flex-col gap-4 p-4 bg-gray-300";
    btnAdicionarTarefa.className =
      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";
    cancelarModal.className = "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400";

    // Modal de confirmacao
    divmodalConfirmacao.className =
      "flex flex-col gap-4 p-4 bg-gray-300 rounded-lg text-black";
    btnModalConfirmacao.className =
      "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600";
    btnCancelarModalConfirmacao.className =
      "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black";

    // Modal de exclusao
    divmodalExcluir.className =
      "flex flex-col gap-4 p-4 bg-gray-300 rounded-lg text-black";
    btnModalExcluir.className =
      "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-white";
    btnCancelarModalExcluir.className =
      "bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black";
  } else {
    // Header e Main
    header.className = "flex flex-wrap p-2 justify-between w-full bg-black";
    btnTheme.className = "mr-4 cursor-pointer text-white";
    relogio.className = "font-bold text-white";
    topSection.className = "p-4 w-full flex justify-around bg-black";
    main.className = "flex flex-wrap items-center gap-4 mx-auto bg-neutral-900";
    body.className = "h-full bg-neutral-900";

    // Tabela
    trHead.className = "bg-gray-500 text-white";

    // Modal de tarefa
    formTarefa.className = "flex flex-col gap-4 p-4 bg-gray-900 text-white";
    btnAdicionarTarefa.className =
      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";
    cancelarModal.className =
      "bg-gray-900 px-4 py-2 rounded hover:bg-gray-300 hover:text-black";

    // Modal de confirmacao
    divmodalConfirmacao.className =
      "flex flex-col gap-4 p-4 bg-gray-900 text-white rounded-lg";
    btnModalConfirmacao.className =
      "bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700";
    btnCancelarModalConfirmacao.className =
      "bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 text-white";

    // Modal de exclusao
    divmodalExcluir.className =
      "flex flex-col gap-4 p-4 bg-gray-900 text-white rounded-lg";
    btnModalExcluir.className =
      "bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700";
    btnCancelarModalExcluir.className =
      "bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 text-white";
  }
  atualizarTabela();
}

mudarTema();
ligarRelogio();
atualizarTabela();
