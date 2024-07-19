// RECUPERATION DU FICHIER JSON
const reponse = await fetch("personnages.json")
const personnages = await reponse.json()

// FONCTION GENERATION DES FICHES PORTRAITS

function genererPortraits (personnages){
    // Boucle pour parcourir tous les id du fichier JSON
    for (let i=0; i < personnages.length; i++) {
        // Ajout de la fiche portrait dans le DOM
        const sectionPortraits = document.querySelector(".portraits")

        // Création d'un article pour la fiche personnage dans le DOM
        const fichePersonnage = document.createElement("article")

        // Création des différentes propriétés pour chaque fiche personnage dans le DOM
        const nomPersonnage = document.createElement("h3")
        nomPersonnage.innerText = personnages[i].nom

        const imgPersonnage = document.createElement("img")
        imgPersonnage.src = personnages[i].photo

        const genrePersonnage = document.createElement("p")
        genrePersonnage.innerText = personnages[i].genre

        const citationPersonnage = document.createElement("p")
        citationPersonnage.innerHTML = (`Citation favorite : <i>${personnages[i].citation}</i>`)

        const intelligencePersonnage = document.createElement("p")
        if (personnages[i].intelligence <= 31 && personnages[i].intelligence >= 20) {
            intelligencePersonnage.innerHTML = `Niveau intellectuel : <b class="intelligent">Plutôt intelligent</b>`
        } else if (personnages[i].intelligence <= 19 && personnages[i].intelligence >= 12) {
            intelligencePersonnage.innerHTML = `Niveau intellectuel : <b class="mi-ours-mi-con">Mi-ours, mi-con</b>`
        } else if (personnages[i].intelligence <= 11 && personnages[i].intelligence > 0) {
            intelligencePersonnage.innerHTML = `Niveau intellectuel : <b class="tres-con">Très con !</b>`
        } else {
            intelligencePersonnage.innerHTML = "Niveau intellectuel : Sans opinion"
        }

        // Ajout de chaque propriété dans la fiche personnage
        sectionPortraits.appendChild(fichePersonnage)
        fichePersonnage.appendChild(nomPersonnage)
        fichePersonnage.appendChild(imgPersonnage)
        fichePersonnage.appendChild(genrePersonnage)
        fichePersonnage.appendChild(citationPersonnage)
        fichePersonnage.appendChild(intelligencePersonnage)
    }
}

// UTILISATION DE LA FONCTION DE GENERATION DES FICHES PERSONNAGES
genererPortraits(personnages)

// GESTION DES BOUTONS
const btnTriPlusIntelligent = document.querySelector(".tri-plus-intelligent") // Sélection du bouton
btnTriPlusIntelligent.addEventListener("click", () => { // Ecoute l'évènement au clic sur le bouton
    const triPlusIntelligent = Array.from(personnages) // Copie du tableau
    triPlusIntelligent.sort(function (a, b){ // Réalisation de la fonction de tri
        return b.intelligence - a.intelligence
    })
    document.querySelector(".portraits").innerHTML = "" // RAZ du sélecteur .portraits
    genererPortraits(triPlusIntelligent) // Génération des fiches
})

const btnTriPlusCon = document.querySelector(".tri-plus-con")
btnTriPlusCon.addEventListener("click", () => {
    const triPlusCon = Array.from(personnages)
    triPlusCon.sort(function (a, b){
        return a.intelligence - b.intelligence
    })
    document.querySelector(".portraits").innerHTML = ""
    genererPortraits(triPlusCon)
})

// const btnTriGenre = document.querySelector(".tri-genre")
// btnTriGenre.addEventListener("click", () => {
//     const triGenre = Array.from(personnages)
//     triGenre.sort(function (a,b){ // Tri par ordre alphabétique pour classer les personnages féminins et masculins
//         if (a.genre < b.genre)
//             return 1
//         if (a.genre > b.genre){
//             return -1
//         }
//         return 0;
//     })

//     document.querySelector(".portraits").innerHTML = ""
//     genererPortraits(triGenre)
// })

const btnTriMasculin = document.querySelector(".tri-masculin")
btnTriMasculin.addEventListener("click", () => {
    const triMasculin = personnages.filter(function (personnage) {
        return personnage.genre === "Masculin"
    })
    
    document.querySelector(".portraits").innerHTML = ""
    genererPortraits(triMasculin)
})

const btnTriFeminin = document.querySelector(".tri-feminin")
btnTriFeminin.addEventListener("click", () => {
    const triFeminin = personnages.filter(function (personnage) {
        return personnage.genre === "Féminin"
    })
    
    document.querySelector(".portraits").innerHTML = ""
    genererPortraits(triFeminin)
})


