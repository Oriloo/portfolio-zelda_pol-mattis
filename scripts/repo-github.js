// Fonction pour récupérer les informations du dépôt depuis le fichier JSON
async function fetchRepoData(repoId, repoCard) {
    try {
        // Charger le fichier JSON contenant les données des dépôts
        const response = await fetch('donnees/repos.json');

        // Vérifier si la réponse est OK
        if (!response.ok) {
            throw new Error(`Erreur de récupération des données. Statut : ${response.status} (${response.statusText})`);
        }

        const reposData = await response.json();

        // Rechercher le dépôt correspondant à l'ID donné
        const repoData = reposData.find(repo => repo.id === repoId);

        if (!repoData) {
            throw new Error(`Dépôt avec l'ID ${repoId} non trouvé.`);
        }

        // Construire tout le contenu HTML en une seule fois
        const htmlContent = `
            <div class="repo-badge zelda-font font-1-5">REPO<div class="test90"></div></div>
            <div class="repo-number zelda-font font-1">${repoData.id || 'Non Disponible'}</div>
            <h2 class="repo-title bold-font font-2">${repoData.name || 'Nom non disponible'}</h2>
            <img class="repo-image" src="${repoData.avatar_url || 'https://via.placeholder.com/100'}" alt="Avatar du propriétaire" />
            <p class="repo-description light-font font-1">${repoData.description || 'Aucune description fournie.'}</p>
            <div class="statistics light-font font-1">Statistiques</div>
            <div class="repo-stats">
                <div class="stat">
                    <img src="images/stars.png">
                    <span class="light-font font-1" id="repo-stars">${repoData.stargazers_count || '0'}</span>
                </div>
                <div class="stat">
                    <img src="images/forks.webp">
                    <span class="light-font font-1" id="repo-forks">${repoData.forks_count || '0'}</span>
                </div>
            </div>
            <a class="repo-link bold-font font-1" href="${repoData.html_url || ''}" target="_blank">Voir le dépôt</a>
        `;

        // Injecter le contenu HTML dans la carte
        repoCard.innerHTML = htmlContent;

    } catch (error) {
        // Afficher un message d'erreur dans la carte si la récupération des données échoue
        console.error('Erreur lors de la récupération des données du dépôt :', error);
        repoCard.innerHTML = `<p class="error-message">Impossible de charger les informations du dépôt.</p>`;
    }
}

// Fonction pour initialiser plusieurs cartes
document.addEventListener("DOMContentLoaded", async () => {
    const repoCards = document.querySelectorAll('.repo-card');

    repoCards.forEach(repoCard => {
        const repoId = repoCard.getAttribute('data-id');

        // Vérification si l'ID est correct
        if (repoId) {
            // Passer l'ID du dépôt et la carte correspondante
            fetchRepoData(repoId, repoCard);
        } else {
            // Si l'ID est incorrect ou manquant, afficher un message d'erreur
            repoCard.innerHTML = `
                <p class="error-message">ID du dépôt manquant ou invalide.</p>
            `;
        }
    });
});
