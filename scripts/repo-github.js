// Fonction pour récupérer les informations du dépôt GitHub
async function fetchRepoData(repoUrl, repoCard) {
    try {
        const response = await fetch(repoUrl);

        // Vérifier si la réponse est OK
        if (!response.ok) {
            throw new Error(`Erreur de récupération du dépôt. Statut : ${response.status} (${response.statusText})`);
        }

        const repoData = await response.json();

        // Construire tout le contenu HTML en une seule fois
        const htmlContent = `
            <div class="repo-badge">REPO<div class="test90"></div></div>
            <div class="repo-number">${repoData.id || 'Non Disponible'}</div>
            <h2 class="repo-title">${repoData.name || 'Nom non disponible'}</h2>
            <img class="repo-image" src="${repoData.owner.avatar_url || 'https://via.placeholder.com/100'}" alt="Avatar du propriétaire" />
            <p class="repo-description">${repoData.description || 'Aucune description fournie.'}</p>
            <div class="statistics">Statistiques</div>
            <div class="repo-stats">
                <div class="stat">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="icon icon-star">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                    </svg>
                    <span id="repo-stars">${repoData.stargazers_count || '0'}</span>
                </div>
                <div class="stat">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="icon icon-fork">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                    </svg>
                    <span id="repo-forks">${repoData.forks_count || '0'}</span>
                </div>
            </div>
            <a class="repo-link" href="${repoData.html_url || ''}" target="_blank">Voir le dépôt</a>
        `;

        // Injecter le contenu HTML dans la carte
        repoCard.innerHTML = htmlContent;

    } catch (error) {
        // Afficher un message d'erreur dans la carte si l'API échoue
        console.error('Erreur lors de la récupération des données du dépôt :', error);
        repoCard.innerHTML = `<p class="error-message">Impossible de charger les informations du dépôt.</p>`;
    }
}

// Fonction pour initialiser plusieurs cartes
document.addEventListener("DOMContentLoaded", async () => {
    const repoCards = document.querySelectorAll('.repo-card');

    repoCards.forEach(repoCard => {
        const repoUrl = repoCard.getAttribute('data-url');

        // Vérification si l'URL est correcte
        if (repoUrl) {
            // Passer l'URL de l'API GitHub et la carte correspondante
            fetchRepoData(repoUrl, repoCard);
        } else {
            // Si l'URL est incorrecte ou manquante, afficher un message d'erreur
            repoCard.innerHTML = `
                <p class="error-message">URL du dépôt manquante ou invalide.</p>
            `;
        }
    });
});
