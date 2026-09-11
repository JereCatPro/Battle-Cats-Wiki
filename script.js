const normalCats = [
    {
        name: "Gato basico",
        image: "imagenes/imagenes%20normales/gato%20basico.png",
        description: "La unidad equilibrada para comenzar una batalla.",
        type: "carne de cañon",
        health: 250,
        attack: 20,
        cost: 75,
        healthGrowth: 50,
        attackGrowth: 4
    },
    {
        name: "Gato muro",
        image: "imagenes/imagenes%20normales/gato%20muro.png",
        description: "Una unidad resistente que ayuda a proteger a las demas tropas.",
        type: "Defensa",
        health: 1000,
        attack: 5,
        cost: 150,
        healthGrowth: 50,
        attackGrowth: 5
    },
    {
        name: "Gato hachero",
        image: "imagenes/imagenes%20normales/gato%20hachero.png",
        description: "Un atacante cuerpo a cuerpo con buen daño inicial.",
        type: "Ataque",
        health: 500,
        attack: 62,
        cost: 300,
        healthGrowth: 30,
        attackGrowth: 18
    },
    {
        name: "Gato lechero",
        image: "imagenes/imagenes%20normales/gato%20lechero.png",
        description: "Una unidad versatil para apoyar el avance del ejercito.",
        type: "Apoyo",
        health: 1250,
        attack: 32,
        cost: 750,
        healthGrowth: 25,
        attackGrowth: 14
    },
    {
        name: "Gato pajaro",
        image: "imagenes/imagenes%20normales/gato%20pajaro.png",
        description: "Un atacante rapido y ligero.",
        type: "Ataque rapido",
        health: 750,
        attack: 350,
        cost: 975,
        healthGrowth: 20,
        attackGrowth: 22
    },
    {
        name: "Gatilargo",
        image: "imagenes/imagenes%20normales/gatilargo.png",
        description: "Ataca desde una distancia segura para cubrir a tus unidades.",
        type: "Alcance",
        health: 1000,
        attack: 250,
        cost: 600,
        healthGrowth: 22,
        attackGrowth: 16
    },
    {
        name: "Piscigato",
        image: "imagenes/imagenes%20normales/piscigato.png",
        description: "Una unidad especializada para completar el equipo.",
        type: "Especialista",
        health: 1750,
        attack: 450,
        cost: 1200,
        healthGrowth: 35,
        attackGrowth: 19
    },
    {
        name: "Gato lagarto",
        image: "imagenes/imagenes%20normales/gato%20lagarto.png",
        description: "Un atacante de largo alcance para apoyar al equipo.",
        type: "Alcance",
        health: 2000,
        attack: 875,
        cost: 1500,
        healthGrowth: 30,
        attackGrowth: 24
    },
    {
        name: "Gato titan",
        image: "imagenes/imagenes%20normales/gato%20titan.png",
        description: "Una unidad poderosa con gran resistencia en combate.",
        type: "Fuerza",
        health: 2500,
        attack: 700,
        cost: 1950,
        healthGrowth: 60,
        attackGrowth: 30
    },
    {
        name: "Superfelino",
        image: "imagenes/imagenes%20normales/superfelino.png",
        description: "Una unidad avanzada que combina ataque y resistencia.",
        type: "Especial",
        health: 1750,
        attack: 1050,
        cost: 2400,
        healthGrowth: 45,
        attackGrowth: 35
    }
];

const catsGrid = document.querySelector("#normal-cats-grid");
const catDetails = document.querySelector("#cat-details");

if (catsGrid && catDetails) {
    const catImage = document.querySelector("#cat-image");
    const catName = document.querySelector("#cat-name");
    const catDescription = document.querySelector("#cat-description");
    const catType = document.querySelector("#cat-type");
    const catLevel = document.querySelector("#cat-level");
    const catLevelRange = document.querySelector("#cat-level-range");
    const catLevelValue = document.querySelector("#cat-level-value");
    const catHealth = document.querySelector("#cat-health");
    const catAttack = document.querySelector("#cat-attack");
    const catCost = document.querySelector("#cat-cost");
    let selectedCat = normalCats[0];

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

        const health = calculateStatByLevel(Number(selectedCat.health), level);
        const attack = calculateStatByLevel(Number(selectedCat.attack), level);

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

        document.querySelectorAll(".normal-cat-card").forEach((item) => {
            item.classList.remove("is-selected");
        });
        card.classList.add("is-selected");
    };

    catLevel.addEventListener("input", updateStats);
    catLevelRange.addEventListener("input", () => {
        catLevel.value = catLevelRange.value;
        updateStats();
    });

    normalCats.forEach((cat, index) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "normal-cat-card";
        card.innerHTML = `<span>${cat.name}</span><img src="${cat.image}" alt="" />`;
        card.addEventListener("click", () => showCat(cat, card));
        catsGrid.appendChild(card);

        if (index === 0) {
            showCat(cat, card);
        }
    });
}