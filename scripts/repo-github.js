// Fonction pour récupérer les informations du dépôt GitHub
async function fetchRepoData(repoUrl, repoCard) {
    try {
        const response = await fetch(repoUrl);
        const repoData = await response.json();

        // Badge NEW
        const newBadge = document.createElement('div');
        newBadge.className = 'new-badge';
        newBadge.textContent = 'NEW';
        repoCard.appendChild(newBadge);

        // Numéro du repo
        const repoNumber = document.createElement('div');
        repoNumber.className = 'repo-number';
        repoNumber.textContent = `#${repoData.id}`;
        repoCard.appendChild(repoNumber);

        // Image du repo
        const repoImage = document.createElement('img');
        repoImage.className = 'repo-image';
        repoImage.src = repoData.owner.avatar_url;
        repoCard.appendChild(repoImage);

        // Titre du repo
        const repoTitle = document.createElement('h2');
        repoTitle.className = 'repo-title';
        repoTitle.textContent = repoData.name;
        repoCard.appendChild(repoTitle);

        // Description du repo
        const repoDescription = document.createElement('p');
        repoDescription.className = 'repo-description';
        repoDescription.textContent = repoData.description;
        repoCard.appendChild(repoDescription);

        // Section des statistiques (Ingrédients)
        const ingredients = document.createElement('div');
        ingredients.className = 'ingredients';
        ingredients.textContent = 'Statistics';
        repoCard.appendChild(ingredients);

        // Statistiques
        const repoStats = document.createElement('div');
        repoStats.className = 'repo-stats';

        // Stars Stat
        const starsStat = document.createElement('div');
        starsStat.className = 'stat';
        const starsIcon = document.createElement('img');
        starsIcon.src = 'https://img.icons8.com/ios-filled/50/000000/star--v1.png';
        starsStat.appendChild(starsIcon);
        const starsText = document.createElement('span');
        starsText.id = 'repo-stars';
        starsText.textContent = repoData.stargazers_count;
        starsStat.appendChild(starsText);

        // Forks Stat
        const forksStat = document.createElement('div');
        forksStat.className = 'stat';
        const forksIcon = document.createElement('img');
        forksIcon.src = 'https://img.icons8.com/material-rounded/24/000000/fork.png';
        forksStat.appendChild(forksIcon);
        const forksText = document.createElement('span');
        forksText.id = 'repo-forks';
        forksText.textContent = repoData.forks_count;
        forksStat.appendChild(forksText);

        // Ajouter les statistiques à la carte
        repoStats.appendChild(starsStat);
        repoStats.appendChild(forksStat);
        repoCard.appendChild(repoStats);

        // Lien vers le repo
        const repoLink = document.createElement('a');
        repoLink.className = 'repo-link';
        repoLink.href = repoData.html_url;
        repoLink.textContent = 'View Repo';
        repoCard.appendChild(repoLink);

    } catch (error) {
        console.error('Erreur lors de la récupération des données du dépôt :', error);
    }
}

// Fonction pour initialiser plusieurs cartes
document.addEventListener("DOMContentLoaded", () => {
    const repoCards = document.querySelectorAll('.repo-card');

    repoCards.forEach(repoCard => {
        const repoUrl = repoCard.getAttribute('value');
        
        // Passer l'URL de l'API GitHub et la carte correspondante
        fetchRepoData(repoUrl, repoCard);
    });
});
