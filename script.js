// --- CONFIGURAÇÕES DE DATA (MANUALMENTE CONFIGURADAS) ---
// Data Estimada do Parto (EDD): 30 de Março de 2026
const EDD = new Date('2026-03-30T00:00:00'); 
// Data da Última Menstruação (LMP): 23 de Junho de 2025
const LMP = new Date('2025-06-23T00:00:00'); 

// Tamanhos do bebê
const BABY_SIZES = [
    { week: 14, size: 'Limão 🍋' },
    { week: 18, size: 'Pimentão 🫑' }, // 18 semanas
    { week: 24, size: 'Berinjela 🍆' },
    { week: 30, size: 'Repolho 🥬' },
    { week: 36, size: 'Melão 🍈' }
];

// --- FUNÇÕES DE CÁLCULO ---

function calculateDays(date1, date2) {
    const diffTime = date2.getTime() - date1.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function calculateGestationalAge(days) {
    const weeks = Math.floor(days / 7);
    const daysRemainder = days % 7;
    return { weeks, daysRemainder };
}

function getTrimester(weeks) {
    if (weeks >= 1 && weeks <= 13) return "Primeiro Trimestre";
    if (weeks >= 14 && weeks <= 27) return "Segundo Trimestre";
    if (weeks >= 28) return "Terceiro Trimestre";
    return "Jornada Inicial";
}

function getBabySize(currentWeek) {
    const relevantSize = BABY_SIZES.slice().reverse().find(s => s.week <= currentWeek);
    return relevantSize ? relevantSize.size : 'uma sementinha 🌱';
}

// --- ATUALIZAÇÃO DO DASHBOARD (MÉTRICAS) ---

function updateDashboardMetrics() {
    const TODAY = new Date();
    const totalPregnancyDuration = 280; 

    const daysPregnant = calculateDays(LMP, TODAY); 
    const { weeks, daysRemainder } = calculateGestationalAge(daysPregnant);
    
    const daysUntilEDD = calculateDays(TODAY, EDD);
    
    const daysCompleted = daysPregnant;
    const progressPercentage = Math.min(100, Math.floor((daysCompleted / totalPregnancyDuration) * 100));

    // --- Injeção no DOM ---
    
    document.getElementById('weeks-current').textContent = `${weeks}`;
    document.getElementById('days-current').textContent = `${daysRemainder}`;
    document.getElementById('age-text').textContent = `${weeks} semanas e ${daysRemainder} dia(s)`;

    document.getElementById('countdown-days').textContent = `${daysUntilEDD}`;
    document.getElementById('edd-date').textContent = `${EDD.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}`;
    
    document.getElementById('trimester-info').textContent = getTrimester(weeks);

    document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;
    document.getElementById('progress-text').textContent = `${daysCompleted} de ${totalPregnancyDuration} dias completos`;
    document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
    
    document.getElementById('baby-size').textContent = getBabySize(weeks);
}

// --- FUNÇÃO DE NAVEGAÇÃO ---
function setupPageNavigation() {
    // Seleciona todos os links que apontam para uma seção interna (#id)
    const navLinks = document.querySelectorAll('.nav-menu a, .call-to-action a');
    const sections = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-menu li');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 1. Esconde todas as seções e remove a classe ativa
            sections.forEach(section => {
                section.classList.remove('active-page');
            });

            // 2. Mostra a seção alvo
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-page');
                
                // Rola a página para o topo do container (opcional, mas limpa a vista)
                document.querySelector('.container').scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // 3. Atualiza a classe 'active' na navbar (apenas para links que estão na navbar)
            navItems.forEach(item => item.classList.remove('active'));
            const parentLi = this.closest('li');
            if (parentLi) {
                parentLi.classList.add('active');
            }
        });
    });
}


// --- INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa as métricas do Dashboard
    updateDashboardMetrics();
    
    // 2. Configura a navegação entre Home e Dashboard
    setupPageNavigation();
});
