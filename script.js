// Dados dos projetos
const projectData = {
    "meu-lanche": {
        title: "Meu Lanche Senai",
        desc: "Site de lancheria com cardápio online, pedido via QR Code e design responsivo.",
        img: "/Projetos/sitepizza.png",
        link: "https://jade-queijadas-9bdaf0.netlify.app/"
    },
    "automax": {
        title: "AutoMax",
        desc: "Plataforma de vendas de veículos com APIs e banco de dados.",
        img: "/a/photo-1503376780353-7e6692767b70.avif",
        link: "#"
    },
    "hollow-cards": {
        title: "Hollow Cards",
        desc: "Jogo de cartas baseado em Hollow Knight, feito em HTML, CSS e JS.",
        img: "/projetos/projetosilksong.png",
        link: "#"
    }
};

// Elementos do modal
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

// Abrir modal ao clicar no projeto
document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.projectId;
        const data = projectData[id];
        if (!data) return;

        modalBody.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.img}" alt="${data.title}" style="width:100%;border-radius:12px;margin:12px 0;">
            <p class="muted">${data.desc}</p>
            <a href="${data.link}" target="_blank" class="btn btn-primary" style="margin-top:12px;display:inline-block;">Ver Projeto</a>
        `;

        modal.classList.add("show"); // ✅ Use a classe CSS
    });
});

// Fechar modal
modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove("show");
    }
});

const hamburguerBtn = document.getElementById("hamburguer-btn");
const navbar = document.querySelector(".nav");

hamburguerBtn.addEventListener("click", () => {
    hamburguerBtn.classList.toggle("active");
    navbar.classList.toggle("active");

    // 🔥 Mantém o botão fixo quando o menu estiver ativo
    if (navbar.classList.contains("active")) {
        hamburguerBtn.classList.add("fixed");
    } else {
        hamburguerBtn.classList.remove("fixed");
    }
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// Formulário
function handleForm(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    const subject = encodeURIComponent('Orçamento - ' + nome);
    const body = encodeURIComponent(mensagem + '\n\nContato: ' + nome + ' <' + email + '>');
    window.location.href = `mailto:Biel.vaztrindade@email.com?subject=${subject}&body=${body}`;
}

function openWhats() {
    window.open('https://wa.me/5511991648456', '_blank');
}

function openLink(url) {
    window.open(url, '_blank');
}
