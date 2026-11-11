// Interatividade e Comportamento da Landing Page Achaditos

document.addEventListener('DOMContentLoaded', () => {
  initUrgencyCounters();
  initFaqAccordion();
  initFloatingBar();
  initLucideIcons();
  initLiveConversionToasts();
});

// Inicializar ícones do Lucide
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Simulação realista de urgência (vagas diminuindo)
function initUrgencyCounters() {
  const urgencyBadges = document.querySelectorAll('.vagas-counter');
  let currentSlots = 11;

  function updateSlots() {
    urgencyBadges.forEach(el => {
      el.textContent = currentSlots;
    });
  }
  updateSlots();

  // Diminui suavemente de tempos em tempos para dar sensação de corrida
  const slotInterval = setInterval(() => {
    if (currentSlots > 4) {
      currentSlots -= 1;
      updateSlots();
      
      // Feedback visual rápido
      urgencyBadges.forEach(el => {
        el.classList.add('scale-125', 'text-amber-400');
        setTimeout(() => {
          el.classList.remove('scale-125', 'text-amber-400');
        }, 500);
      });
    } else {
      clearInterval(slotInterval);
    }
  }, 24000); // a cada 24s uma vaga é preenchida
}

// Acordeão de FAQ
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerContent = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answerContent) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answerContent.classList.contains('hidden');

        // Fecha todos os outros
        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAnswer && !otherAnswer.classList.contains('hidden')) {
            otherAnswer.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Alterna o atual
        if (isOpen) {
          answerContent.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          answerContent.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}

// Barra Flutuante Mobile
function initFloatingBar() {
  const floatingBar = document.getElementById('floating-cta-bar');
  const heroSection = document.getElementById('hero');

  if (!floatingBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    // Quando o usuário passar do topo do hero, exibe a barra fixa
    if (heroBottom < 100) {
      floatingBar.classList.remove('translate-y-full', 'opacity-0');
      floatingBar.classList.add('translate-y-0', 'opacity-100');
    } else {
      floatingBar.classList.add('translate-y-full', 'opacity-0');
      floatingBar.classList.remove('translate-y-0', 'opacity-100');
    }
  }, { passive: true });
}

// Toasts de Prova Social ao Vivo (Notificações em tempo real)
function initLiveConversionToasts() {
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.className = 'fixed bottom-20 left-4 z-40 hidden sm:flex flex-col gap-2 pointer-events-none';
  document.body.appendChild(toastContainer);

  const notifications = [
    { name: 'Gabriel S.', city: 'São Paulo - SP', group: 'Grupo Geral', time: 'há 1 min' },
    { name: 'Mariana C.', city: 'Belo Horizonte - MG', group: 'Itens de Casa', time: 'há 2 min' },
    { name: 'Rodrigo T.', city: 'Curitiba - PR', group: 'Eletrônicos & Nerd', time: 'há 4 min' },
    { name: 'Fernanda M.', city: 'Campinas - SP', group: 'Grupo Geral', time: 'há 30 seg' },
    { name: 'Thiago B.', city: 'Rio de Janeiro - RJ', group: 'Eletrônicos & Nerd', time: 'há 3 min' },
  ];

  let index = 0;

  function showNextToast() {
    const data = notifications[index % notifications.length];
    index++;

    const toast = document.createElement('div');
    toast.className = 'glass-card border border-emerald-500/40 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-3 transform -translate-x-full opacity-0 transition-all duration-500 text-xs';
    toast.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-brand-whatsapp/20 border border-brand-whatsapp/50 flex items-center justify-center text-brand-whatsapp shrink-0">
        <i data-lucide="user-check" class="w-4 h-4"></i>
      </div>
      <div>
        <p class="font-bold text-slate-100 leading-tight">${data.name} <span class="text-[10px] text-slate-400 font-normal">(${data.city})</span></p>
        <p class="text-[11px] text-emerald-400">Entrou no <strong class="text-white">${data.group}</strong> • ${data.time}</p>
      </div>
    `;

    toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Fade in
    requestAnimationFrame(() => {
      toast.classList.remove('-translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    });

    // Fade out after 4.5s
    setTimeout(() => {
      toast.classList.add('-translate-x-full', 'opacity-0');
      toast.classList.remove('translate-x-0', 'opacity-100');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4500);
  }

  // Primeiro toast após 4s, depois a cada 16s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 16000);
  }, 4000);
}

// Função para scroll suave até a seleção de grupos
function scrollToGroups() {
  const section = document.getElementById('grupos-vip');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
window.scrollToGroups = scrollToGroups;
