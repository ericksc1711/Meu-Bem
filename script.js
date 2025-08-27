// Função para calcular dias juntos
function calculateDaysTogether() {
    const startDate = new Date('2025-02-01');
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    return Math.max(0, daysDifference);
}

// Função para atualizar o contador
function updateCounter() {
    const days = calculateDaysTogether();
    const daysElement = document.getElementById('daysCount');
    const messageElement = document.getElementById('specialMessage');
    
    // Animação dos números
    let currentCount = 0;
    const increment = days / 50;
    
    const countAnimation = setInterval(() => {
        currentCount += increment;
        if (currentCount >= days) {
            currentCount = days;
            clearInterval(countAnimation);
        }
        daysElement.textContent = Math.floor(currentCount);
    }, 30);

    // Mensagem especial baseada nos dias
    let specialMessage = "";
    if (days === 0) {
        specialMessage = "Hoje começou nossa história de amor! 💕";
    } else if (days === 1) {
        specialMessage = "Feliz nosso 1º dia juntos! 💖";
    } else if (days < 7) {
        specialMessage = "Feliz nosso " + days + "º dia juntos! 🌟";
    } else if (days < 30) {
        specialMessage = "Feliz nossa " + Math.floor(days/7) + "ª semana de amor! 💝";
    } else if (days < 365) {
        const months = Math.floor(days/30);
        if (months === 1) {
            specialMessage = "Feliz nosso 1º mês de amor! 🎉";
        } else {
            specialMessage = "Feliz nossos " + months + " meses juntos! 🥰";
        }
    } else {
        const years = Math.floor(days/365);
        specialMessage = "Feliz nosso " + years + "º ano de amor! 🎊";
    }
    
    messageElement.textContent = specialMessage;
}

// Função para criar corações flutuantes
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💜';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    // Alternando entre corações roxos e amarelos
    const hearts = ['💜', '💛', '💝'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Função para mostrar/esconder a galeria de fotos
function togglePhotoGallery() {
    const gallery = document.getElementById('photoGallery');
    const btn = document.getElementById('showPhotosBtn');
    
    if (gallery.style.display === 'none' || gallery.style.display === '') {
        // Mostrar galeria
        gallery.style.display = 'block';
        btn.innerHTML = `
            <span class="btn-icon">📸</span>
            Esconder Nossas Memórias
            <span class="btn-heart">💕</span>
        `;
        
        // Scroll suave até a galeria
        setTimeout(() => {
            gallery.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
        
    } else {
        // Esconder galeria
        gallery.style.display = 'none';
        btn.innerHTML = `
            <span class="btn-icon">📸</span>
            Ver Nossas Memórias Especiais
            <span class="btn-heart">💕</span>
        `;
        
        // Scroll suave até o botão
        btn.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Função para adicionar interatividade às fotos
function setupPhotoInteraction() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach((frame, index) => {
        frame.addEventListener('click', function() {
            // Apenas um efeito visual, sem pop-up
            frame.style.transform = 'scale(0.95)';
            setTimeout(() => {
                frame.style.transform = '';
            }, 150);
        });
    });
}

// Função para criar efeito de partículas no clique
function createClickEffect(e) {
    const colors = ['#f4c842', '#f0d55a', '#8e24aa', '#5e35b1'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 120;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => particle.remove();
        
        document.body.appendChild(particle);
    }
}

// Função para adicionar efeito hover no botão
function addButtonEffects() {
    const btn = document.getElementById('showPhotosBtn');
    
    btn.addEventListener('mouseenter', function() {
        // Criar mini corações ao redor do botão
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const miniHeart = document.createElement('div');
                miniHeart.textContent = '💛';
                miniHeart.style.position = 'absolute';
                miniHeart.style.fontSize = '12px';
                miniHeart.style.pointerEvents = 'none';
                miniHeart.style.zIndex = '10';
                
                const rect = btn.getBoundingClientRect();
                miniHeart.style.left = (rect.left + Math.random() * rect.width) + 'px';
                miniHeart.style.top = (rect.top - 20 + Math.random() * 10) + 'px';
                
                document.body.appendChild(miniHeart);
                
                miniHeart.animate([
                    { opacity: 0, transform: 'translateY(0) scale(0)' },
                    { opacity: 1, transform: 'translateY(-20px) scale(1)' },
                    { opacity: 0, transform: 'translateY(-40px) scale(0)' }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = () => miniHeart.remove();
                
            }, i * 100);
        }
    });
}

// Função de inicialização
function initializeApp() {
    // Atualizar contador
    updateCounter();
    
    // Configurar interação das fotos
    setupPhotoInteraction();
    
    // Configurar botão da galeria
    document.getElementById('showPhotosBtn').addEventListener('click', togglePhotoGallery);
    
    // Adicionar efeitos do botão
    addButtonEffects();
    
    // Criar corações flutuantes periodicamente
    setInterval(createFloatingHeart, 2000);
    
    // Atualizar contador a cada minuto
    setInterval(updateCounter, 60000);
    
    // Adicionar efeito de partículas no clique
    document.addEventListener('click', createClickEffect);
    
    console.log('💕 Site do amor inicializado com sucesso!');
}

// Aguardar o carregamento completo da página
document.addEventListener('DOMContentLoaded', initializeApp);