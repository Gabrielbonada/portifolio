// ========================== //
// DADOS DOS PROJETOS         //
// ========================== //

const projectData = {
    "meu-lanche": {
        title: "Meu Lanche Senai",
        desc: "Site completo para lancheria com cardápio online interativo, sistema de pedidos via QR Code e design totalmente responsivo. O projeto inclui integração com WhatsApp para facilitar o contato direto com os clientes.",
        img: "/assets/imagem_pizza.png",
        link: "https://jade-queijadas-9bdaf0.netlify.app/",
        tech: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Responsive Design"]
    },
    "tucanstore": {
        title: "TucanStore",
        desc: "Plataforma completa de e-commerce para vendas com integração de APIs externas e banco de dados. Inclui sistema de busca avançada, filtros por categoria, e painel administrativo para gerenciamento de produtos.",
        img: "/assets/tucan.png",
        link: "#",
        tech: ["JavaScript", "APIs REST", "Database", "Node.js", "Express"]
    },
    "sitesenai": {
        title: "Site Senai",
        desc: "plataforma para a instituição senai. responsiva e totalmente masterizada para a melhor experiencia do usuario",
        img: "/assets/imagem_senai.png",
        link: "https://senaiprojeto11.netlify.app/",
        tech: ["HTML Canvas", "JavaScript", "CSS Animations", "Game Logic"]
    }
};

// ========================== //
// ELEMENTOS DO DOM           //
// ========================== //

const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");
const hamburguerBtn = document.getElementById("hamburguer-btn");
const navbar = document.querySelector(".nav");
const header = document.getElementById("main-header");
const scrollProgress = document.getElementById("scroll-progress");

// ========================== //
// MODAL DE PROJETOS          //
// ========================== //

// Abrir modal ao clicar no projeto
document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.projectId;
        const data = projectData[id];
        if (!data) return;

        const techTags = data.tech.map(tech =>
            `<span class="chip">${tech}</span>`
        ).join('');

        modalBody.innerHTML = `
            <h2 style=" text-align:center; margin-bottom: 20px; font-size: 28px;">${data.title}</h2>
            <img src="${data.img}" alt="${data.title}" style="margin: 0 auto; width:100%; border-radius:12px;  box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
            <p class="muted" style="text-align:justify; font-size: 17px; line-height: 1.8; margin-bottom: 24px; margin:20px 0;;">${data.desc}</p>
            <div style="margin-bottom: 24px;">
                <h3 style=" text-align:center; font-size: 18px; margin-bottom: 20px;">Tecnologias utilizadas:</h3>
                <div class="tags" style= "     justify-content: center; gap: 10px;">
                    ${techTags}
                </div>
            </div>
            ${data.link !== '#' ? `<a href="${data.link}" target="_blank" rel="noopener" class="btn btn-primary" style="display: flex; width: 25%; text-align: center; margin: 0 auto; text-decoration: none; justify-content: center;">
                <span >Ver Projeto</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>` : '<p style="color: var(--muted); font-style: italic;">Projeto em desenvolvimento</p>'}
        `;

        modal.classList.add("show");
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = '';
}

modalClose.addEventListener("click", closeModal);

// Fechar ao clicar no backdrop
modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// ========================== //
// MENU HAMBURGUER            //
// ========================== //

hamburguerBtn.addEventListener("click", () => {
    hamburguerBtn.classList.toggle("active");
    navbar.classList.toggle("active");
    hamburguerBtn.setAttribute('aria-expanded', navbar.classList.contains('active'));

    // Mantém o botão fixo quando o menu estiver ativo
    if (navbar.classList.contains("active")) {
        hamburguerBtn.classList.add("fixed");
        document.body.style.overflow = 'hidden';
    } else {
        hamburguerBtn.classList.remove("fixed");
        document.body.style.overflow = '';
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            hamburguerBtn.classList.remove("active");
            navbar.classList.remove("active");
            hamburguerBtn.classList.remove("fixed");
            hamburguerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// ========================== //
// SCROLL PROGRESS BAR        //
// ========================== //

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================== //
// HEADER SCROLL EFFECT       //
// ========================== //

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================== //
// REVEAL ON SCROLL           //
// ========================== //

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Opcional: parar de observar após revelar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// ========================== //
// SMOOTH SCROLL              //
// ========================== //

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const sectionPosition = section.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// ========================== //
// SCROLL TO TOP              //
// ========================== //

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar/esconder botão de scroll to top
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

// ========================== //
// FORMULÁRIO DE CONTATO      //
// ========================== //

function handleForm(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação básica
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criar link mailto
    const subject = encodeURIComponent('Orçamento - ' + nome);
    const body = encodeURIComponent(
        `Olá Gabriel,\n\n${mensagem}\n\n` +
        `Atenciosamente,\n${nome}\n` +
        `Email: ${email}`
    );

    window.location.href = `mailto:Biel.vaztrindade@email.com?subject=${subject}&body=${body}`;

    // Feedback visual
    showNotification('Abrindo seu cliente de email...');
}

// ========================== //
// WHATSAPP                   //
// ========================== //

function openWhats() {
    const message = encodeURIComponent('Olá! Gostaria de solicitar um orçamento para desenvolvimento de site.');
    window.open(`https://wa.me/5551991648456?text=${message}`, '_blank');
}

// ========================== //
// ABRIR LINKS EXTERNOS       //
// ========================== //

function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ========================== //
// NOTIFICAÇÕES               //
// ========================== //

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        color: #031216;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 24px rgba(124, 92, 255, 0.4);
    `;

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar animações de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================== //
// PERFORMANCE                //
// ========================== //

// Lazy loading para imagens (fallback para navegadores sem suporte nativo)
if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy loading nativo
    console.log('Lazy loading nativo suportado');
} else {
    // Implementar lazy loading manual se necessário
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================== //
// INICIALIZAÇÃO              //
// ========================== //

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio carregado com sucesso! 🚀');

    // Inicializar scroll progress
    updateScrollProgress();

    // Adicionar classe de carregamento completo
    document.body.classList.add('loaded');

    // Revelar elementos visíveis na carga
    setTimeout(() => {
        document.querySelectorAll('[data-reveal]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);
});

// ========================== //
// EASTER EGG                 //
// ========================== //

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎮 Código Konami ativado! Você é um verdadeiro gamer!');
        document.body.style.animation = 'rainbow 2s infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Adicionar animação rainbow
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

