/* =========================================
   VERDEJAR
   SCRIPT.JS
========================================= */


/* =========================================
   CARRINHO
========================================= */

let carrinho = [];


/* =========================================
   ELEMENTOS
========================================= */

const listaCarrinho =
    document.getElementById("listaCarrinho");

const totalCarrinho =
    document.getElementById("totalCarrinho");

const contadorCarrinho =
    document.getElementById("contadorCarrinho");


/* =========================================
   ADICIONAR PRODUTO
========================================= */

function adicionarCarrinho(nome, preco) {

    const produtoExistente =
        carrinho.find(item => item.nome === nome);


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: Number(preco),

            quantidade: 1

        });

    }


    atualizarCarrinho();

}


/* =========================================
   REMOVER PRODUTO
========================================= */

function removerItem(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

}


function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";


    /* CARRINHO VAZIO */

    if (carrinho.length === 0) {

        listaCarrinho.innerHTML = `
            <li class="carrinho-vazio">
                Seu carrinho está vazio.
            </li>
        `;

        totalCarrinho.textContent = "0,00";

        contadorCarrinho.textContent = "0 itens";

        return;
    }


    let total = 0;

    let quantidadeTotal = 0;


    /* PRODUTOS */

    carrinho.forEach((item, index) => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        quantidadeTotal += item.quantidade;


        const itemHTML = document.createElement("li");


        itemHTML.innerHTML = `

            <div class="produto-carrinho">

                <span class="nome-produto-carrinho">
                    ${item.nome}
                </span>

                <span class="preco-produto-carrinho">
                    R$ ${subtotal.toFixed(2).replace(".", ",")}
                </span>

            </div>

            <div class="controles-carrinho">

                <button
                    class="botao-quantidade"
                    onclick="diminuirQuantidade(${index})"
                >
                    −
                </button>

                <span>
                    ${item.quantidade}
                </span>

                <button
                    class="botao-quantidade"
                    onclick="aumentarQuantidade(${index})"
                >
                    +
                </button>

                <button
                    class="botao-remover"
                    onclick="removerItem(${index})"
                >
                    Remover
                </button>

            </div>

        `;


        listaCarrinho.appendChild(itemHTML);

    });


    /* TOTAL */

    totalCarrinho.textContent =
        total.toFixed(2).replace(".", ",");


    /* CONTADOR */

    contadorCarrinho.textContent =
        quantidadeTotal === 1
            ? "1 item"
            : `${quantidadeTotal} itens`;

}


/* =========================================
   BOTÕES "ADICIONAR AO CARRINHO"
========================================= */

const botoesCarrinho =
    document.querySelectorAll(".botao-carrinho");


botoesCarrinho.forEach(botao => {

    botao.addEventListener("click", () => {

        const nome =
            botao.dataset.nome;

        const preco =
            Number(botao.dataset.preco);


        adicionarCarrinho(nome, preco);

    });

});


/* =========================================
   BOTÕES COMPRAR
========================================= */

const botoesComprar =
    document.querySelectorAll(".botao-comprar");


botoesComprar.forEach(botao => {

    botao.addEventListener("click", () => {

        /*
            Por enquanto o botão COMPRAR
            apenas adiciona uma mensagem.

            Depois podemos transformar isso
            em checkout/WhatsApp.
        */

        alert(
            "Produto selecionado! Adicione ao carrinho para continuar."
        );

    });

});


/* =========================================
   BUSCA DE PRODUTOS
========================================= */

const campoBusca =
    document.getElementById("campoBusca");


const produtos =
    document.querySelectorAll(".card-produto");


campoBusca.addEventListener("input", () => {

    const termo =
        campoBusca.value
            .toLowerCase()
            .trim();


    produtos.forEach(produto => {

        const nome =
            produto.dataset.nome.toLowerCase();


        if (nome.includes(termo)) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

});


/* =========================================
   FORMULÁRIO DE BUSCA
========================================= */

const formBusca =
    document.getElementById("formBusca");


formBusca.addEventListener("submit", event => {

    event.preventDefault();

});