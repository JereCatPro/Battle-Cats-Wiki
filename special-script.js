const specialCatFiles = [
    "gato ninja.png",
    "gato sumo.png",
    "gato samurai.png",
    "sr.png",
    "gato zombie.png",
    "caja de gatitos.png",
    "gata actriz.png",
    "gata faldera.png",
    "gato braguitas.png",
    "gato buguibugui.png",
    "bondage.png",
    "gato de kungfu.png",
    "duo vaina.png",
    "gato triciclo.png",
    "gato flor.png",
    "domigatriz.png",
    "gato haniwa.png",
    "gactus.png",
    "gato sicario.png",
    "gato supercoche.png",
    "oso caido gatuno.png",
    "minigato.png",
    "minidefensor.png",
    "minihachero.png",
    "minipajaro.png",
    "minigatilargo.png",
    "minipescado.png",
    "minivaca.png",
    "minilagarto.png",
    "minititan.png",
    "moneko.png",
    "moneko demente.png",
    "gata valquiria.png",
    "gato begimo.png",
    "misidios el fantastico.png",
    "gato filiembustero X.png",
    "majado jr.png",
    "lobo ururun.png",
    "mininyandam.png",
    "mina caperucita.png",
    "miyamoku musashi.png",
    "bun bun mecanico.png",
    "idi N.png",
    "gato hermitaño.png",
    "yulala enmascarada.png",
    "maestro uril.png",
    "urs y fenrir.png",
    "chuchomaru.png",
    "mascara doron viejuna.png",
    "bestia naala viejuna.png",
    "lord luza simio.png",
    "maestra de la vida dra nova.png",
    "sorcates mente brillante.png",
    "maestro de la logica newtone.png",
    "sabio de la seleccion darvin.png"
];

const specialCats = specialCatFiles.map((filename, index) => ({
    name: filename.replace(/\.png$/i, ""),
    image: `imagenes/imagenes%20especiales/${encodeURIComponent(filename)}`,
    description: "Una unidad especial con habilidades unicas.",
    type: "Especial",
    health: 500 + (index * 75),
    attack: 50 + (index * 25),
    cost: 300 + (index * 50)
}));

const specialCatsGrid = document.querySelector("#special-cats-grid");
const specialPrevious = document.querySelector("#special-previous");
const specialNext = document.querySelector("#special-next");
const specialDetails = document.querySelector("#special-cat-details");

if (specialCatsGrid && specialPrevious && specialNext && specialDetails) {
    const catImage = document.querySelector("#special-cat-image");
    const catName = document.querySelector("#special-cat-name");
    const catDescription = document.querySelector("#special-cat-description");
    const catType = document.querySelector("#special-cat-type");
    const catLevel = document.querySelector("#special-cat-level");
    const catLevelRange = document.querySelector("#special-cat-level-range");
    const catLevelValue = document.querySelector("#special-cat-level-value");
    const catHealth = document.querySelector("#special-cat-health");
    const catAttack = document.querySelector("#special-cat-attack");
    const catCost = document.querySelector("#special-cat-cost");
    const catsPerPage = 18;
    const pageCount = Math.ceil(specialCats.length / catsPerPage);
    let currentPage = 0;
    let selectedCat = specialCats[0];

    const getLevel = () => Math.min(110, Math.max(1, Number(catLevel.value) || 1));

    const calculateStatByLevel = (baseStat, level) => {
        const levelsAtFifth = Math.min(level - 1, 59);
        const levelsAtTenth = Math.max(level - 60, 0);

        return baseStat
            + (baseStat * (1 / 5) * levelsAtFifth)
            + (baseStat * (1 / 10) * levelsAtTenth);
    };

    const updateStats = () => {
        const level = getLevel();
        const health = calculateStatByLevel(selectedCat.health, level);
        const attack = calculateStatByLevel(selectedCat.attack, level);

        catLevel.value = level;
        catLevelRange.value = level;
        catLevelValue.textContent = level;
        catHealth.textContent = Math.round(health);
        catAttack.textContent = Math.round(attack);
    };

    const showCat = (cat, card) => {
        selectedCat = cat;
        catImage.src = cat.image;
        catImage.alt = cat.name;
        catName.textContent = cat.name;
        catDescription.textContent = cat.description;
        catType.textContent = cat.type;
        catCost.textContent = cat.cost;
        updateStats();

        specialCatsGrid.querySelectorAll(".normal-cat-card").forEach((item) => {
            item.classList.remove("is-selected");
        });
        card.classList.add("is-selected");
    };

    const renderPage = () => {
        const firstCat = currentPage * catsPerPage;
        const visibleCats = specialCats.slice(firstCat, firstCat + catsPerPage);

        specialCatsGrid.replaceChildren();
        visibleCats.forEach((cat, index) => {
            const card = document.createElement("button");
            card.type = "button";
            card.className = "normal-cat-card";
            card.innerHTML = `<span>${cat.name}</span><img src="${cat.image}" alt="" />`;
            card.addEventListener("click", () => showCat(cat, card));
            specialCatsGrid.appendChild(card);

            if (index === 0) {
                showCat(cat, card);
            }
        });

        specialPrevious.hidden = currentPage === 0;
        specialNext.hidden = currentPage === pageCount - 1;
    };

    specialPrevious.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage -= 1;
            renderPage();
        }
    });

    specialNext.addEventListener("click", () => {
        if (currentPage < pageCount - 1) {
            currentPage += 1;
            renderPage();
        }
    });

    catLevel.addEventListener("input", updateStats);
    catLevelRange.addEventListener("input", () => {
        catLevel.value = catLevelRange.value;
        updateStats();
    });

    renderPage();
}
