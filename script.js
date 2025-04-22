let idade = 90
let nome = "João"

console.log( 10 + idade
)

// Carrinho de compras
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const produto = {
        nome: nome,
        preco: preco,
        quantidade: 1
    };
    
    const produtoExistente = carrinho.find(item => item.nome === nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push(produto);
    }
    
    atualizarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const carrinhoIcon = document.querySelector('.header-icons a[href="#carrinho"]');
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    if (totalItens > 0) {
        carrinhoIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> <span class="carrinho-contador">${totalItens}</span>`;
    } else {
        carrinhoIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    }
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Adicionar eventos aos botões de compra
document.addEventListener('DOMContentLoaded', () => {
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', () => {
            const produtoCard = botao.closest('.produto-card');
            const nome = produtoCard.querySelector('h3').textContent;
            const preco = produtoCard.querySelector('.preco').textContent;
            
            adicionarAoCarrinho(nome, preco);
        });
    });
});

// Menu mobile
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

document.querySelector('.header').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Galeria de imagens do produto
const miniaturas = document.querySelectorAll('.produto-miniaturas img');
const imagemPrincipal = document.querySelector('.produto-imagem-principal img');

if (miniaturas && imagemPrincipal) {
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', () => {
            imagemPrincipal.src = miniatura.src;
        });
    });
}

// Seleção de tamanho
const tamanhoBtns = document.querySelectorAll('.tamanho-btn');
tamanhoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tamanhoBtns.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
    });
});

// Seleção de cor
const corBtns = document.querySelectorAll('.cor-btn');
corBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        corBtns.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
    });
});

// Favoritar produto
const btnFavorito = document.querySelector('.btn-favorito');
if (btnFavorito) {
    btnFavorito.addEventListener('click', () => {
        btnFavorito.classList.toggle('ativo');
        const icon = btnFavorito.querySelector('i');
        if (btnFavorito.classList.contains('ativo')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
}

// Adicionar ao carrinho
const btnComprar = document.querySelector('.btn-comprar');
if (btnComprar) {
    btnComprar.addEventListener('click', () => {
        btnComprar.textContent = 'Adicionado ao Carrinho';
        btnComprar.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            btnComprar.textContent = 'Adicionar ao Carrinho';
            btnComprar.style.backgroundColor = '';
        }, 2000);
    });
}

// Animação de scroll
const elementos = document.querySelectorAll('.produto-card, .categoria-card, .colecao-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, {
    threshold: 0.1
});

elementos.forEach(elemento => {
    observer.observe(elemento);
});

// Menu mobile
const menuBtn = document.createElement('button');
menuBtn.className = 'menu-mobile-btn';
menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.header').appendChild(menuBtn);

const navMenu = document.querySelector('.nav-menu');
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('ativo');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('ativo');
    });
});

// Adicionar estilos para notificações
const style = document.createElement('style');
style.textContent = `
    .notificacao {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-color);
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        
        .nav-menu {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .nav-menu ul {
            flex-direction: column;
            gap: 1rem;
        }
    }
    
    .carrinho-contador {
        background-color: var(--primary-color);
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 50%;
        font-size: 0.8rem;
        margin-left: 0.2rem;
    }
`;

document.head.appendChild(style);
