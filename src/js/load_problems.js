class MyOutput {
    constructor() {
        this.console = document.getElementById("output");
        this.test_cases = [];
    }

    write(text) {
        this.console.textContent += text;
    }

    flush() {}

    setTestCases(cases) {
        this.test_cases = cases;
        const jsonTestCases = JSON.stringify(this.test_cases);
        window.testCasesFromJS = jsonTestCases;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const difficultyOrder = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
        Impossible: 4,
    };

    function loadProblemList() {
        const url = "https://raw.githubusercontent.com/0adri3n/bpp/refs/heads/master/problems_set/repo_url.json";

        $.getJSON(url, function (data) {
            const problemUrls = data.problems;
            const problemPromises = problemUrls.map((problemUrl) => {
                return $.getJSON(problemUrl)
                    .then((problem) => problem)
                    .catch(() => {
                        console.warn(`Skipping problem: Failed to load ${problemUrl}`);
                        return null; // Ignore failed problems
                    });
            });

            Promise.all(problemPromises)
                .then((problems) => {
                    // Remove failed (null) problems before sorting
                    problems = problems.filter((p) => p !== null);

                    problems.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

                    problems.forEach((problemData) => {
                        loadProblem(problemData);
                    });

                    if (problems.length === 0) {
                        console.error("No problems could be loaded. Please check your JSON URLs.");
                    }
                })
                .catch((error) => {
                    console.error("Error while fetching problems:", error);
                });
        }).fail(function () {
            console.error("Failed to load main JSON file");
        });
    }

    function getCookie(name) {
        let cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }
    
    function loadProblem(problemData) {
        const problemList = document.getElementById("problems");
    
        const card = document.createElement("div");
        card.classList.add("problem-card");
    
        const title = document.createElement("h3");
        title.textContent = problemData.title;
    
        const details = document.createElement("p");
        details.innerHTML = `
            <strong>Author :</strong> ${problemData.author} <br>
            <strong>Date :</strong>${problemData.date} <br>
            <strong>Difficulty :</strong> <span class="${problemData.difficulty}" data-text="${problemData.difficulty}">${problemData.difficulty}</span> <br>
            <strong>Objective :</strong> <br> ${problemData.objective}
        `;
    
        const btn = document.createElement("button");
        btn.textContent = "Select";
        btn.classList.add("problem-btn");
        btn.addEventListener("click", () => loadProblemData(problemData));
    
        if (getCookie(problemData.title) === "completed") {
            const completedBadge = document.createElement("span");
            completedBadge.innerHTML = "<br> Completed ✅";
            completedBadge.classList.add("completed-badge");
            details.appendChild(completedBadge);
        }
    
        card.appendChild(title);
        card.appendChild(details);
        card.appendChild(btn);
        problemList.appendChild(card);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    

    loadProblemList();
});

function showSuccessPopup(pb_title) {
    document.cookie = `${pb_title}=completed; path=/; max-age=31536000`;

    // Chercher la carte du problème correspondant
    const problemCards = document.querySelectorAll(".problem-card h3");
    problemCards.forEach((title) => {
        if (title.textContent === pb_title) {
            const details = title.nextElementSibling; // Le `<p>` contenant les infos du problème

            // Vérifier si le badge existe déjà, sinon l'ajouter
            if (!details.querySelector(".completed-badge")) {
                const completedBadge = document.createElement("span");
                completedBadge.innerHTML = "<br> Completed ✅";
                completedBadge.classList.add("completed-badge");
                details.appendChild(completedBadge);
            }
        }
    });

    // Affichage du popup de succès
    const popup = document.createElement("div");
    popup.id = "success-popup";
    popup.innerHTML = `
        <div class="popup-content">
            <h2>🎉 Congrats ! 🎉</h2>
            <p>You found the right solution!</p>
            <button id="return-home">Back to BPP</button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("return-home").addEventListener("click", () => {
        document.getElementById("problem-list").style.display = "block";
        document.getElementById("main-container").style.display = "none";

        popup.classList.add("hide");
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    });
}


window.addEventListener("beforeunload", function (event) {
    if (document.getElementById("main-container").style.display === "flex") {
        event.preventDefault();
        event.returnValue = "You're solving a problem. Do you really want to leave ?";
        return "You're solving a problem. Do you really want to leave ?";
    }
});

function loadProblemData(problemData) {
    document.getElementById("problem-list").style.display = "none";
    document.getElementById("welcome-message").style.display = "none";
    document.getElementById("main-container").style.display = "flex";

    const editor = ace.edit("editor");
    editor.setValue(problemData.code_template, -1);
    new MyOutput().setTestCases(problemData.test_cases);

    document.getElementById("program-output").textContent = "";
    document.getElementById("test-results").textContent = "";
    document.getElementById("actual-output").textContent = "";

    document.getElementById("inedit-details").innerHTML = `
        <strong>Title :</strong> <span id="pb-title">${problemData.title}</span> <br>
        <strong>Author :</strong> ${problemData.author} <br>
        <strong>Date :</strong> ${problemData.date} <br>
        <strong>Difficulty :</strong> ${problemData.difficulty} <br>
        <strong>Objective :</strong> ${problemData.objective}
    `;
}

document.getElementById("file-input").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const problemData = JSON.parse(e.target.result);
            loadProblemData(problemData);
        } catch (error) {
            alert("Erreur lors du chargement du fichier : format invalide." + error);
        }
    };
    reader.readAsText(file);
});
