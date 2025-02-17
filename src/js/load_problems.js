document.addEventListener("DOMContentLoaded", function() {
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

        // Convertir le tableau en JSON pour l'envoyer à Python
        const jsonTestCases = JSON.stringify(this.test_cases);

        // Passer les test_cases à Python via Brython
        window.testCasesFromJS = jsonTestCases;
      }
    }

    function loadProblemList() {
        const url = 'https://raw.githubusercontent.com/0adri3n/pb_sets/refs/heads/main/repo_url.json';

        $.getJSON(url, function(data) {
            const problemUrls = data.problems;
            problemUrls.forEach(problemUrl => {
                loadProblem(problemUrl);
            });
        }).fail(function() {
            console.error('Erreur lors du chargement du fichier JSON principal');
        });
    }

    function loadProblem(problemUrl) {
        $.getJSON(problemUrl, function(problemData) {
            const problemList = document.getElementById("problems");

            const card = document.createElement("div");
            card.classList.add("problem-card");

            const title = document.createElement("h3");
            title.textContent = problemData.title;

            const details = document.createElement("p");
            details.innerHTML = `
                <strong>Author:</strong> ${problemData.author} <br>
                <strong>Date:</strong> ${problemData.date} <br>
                <strong>Difficulty:</strong> ${problemData.difficulty} <br>
                <strong>Objective:</strong> <br> ${problemData.objective}
            `;

            const btn = document.createElement("button");
            btn.textContent = "Select";
            btn.classList.add("problem-btn");
            btn.addEventListener("click", () => loadProblemData(problemData));

            card.appendChild(title);
            card.appendChild(details);
            card.appendChild(btn);
            problemList.appendChild(card);
        });
    }

    function loadProblemData(problemData) {
        document.getElementById("problem-list").style.display = "none";
        document.getElementById("main-container").style.display = "flex";

        const editor = ace.edit("editor");
        editor.setValue(problemData.code_template, -1);
        new MyOutput().setTestCases(problemData.test_cases);

        document.getElementById("output").text = "";

        
        document.getElementById("inedit-details").innerHTML = `
            <strong>Author :</strong> ${problemData.author} <br>
            <strong>Date :</strong> ${problemData.date} <br>
            <strong>Difficulty :</strong> ${problemData.difficulty} <br>
            <strong>Objective :</strong> ${problemData.objective}
        `;
    }

    // document.getElementById("exec").addEventListener("click", function() {
    //     runPython();
    // });

    loadProblemList();
});


function showSuccessPopup() {
    const popup = document.createElement("div");
    popup.id = "success-popup";
    popup.innerHTML = `
            <div class="popup-content">
                <h2>🎉 Congrats ! 🎉</h2>
                <p>You found the right soluion !</p>
                <button id="return-home" href="index.html">Back to BPP</button>
            </div>
        `;
    document.body.appendChild(popup);

    // Gérer le retour à l'accueil
    document.getElementById("return-home").addEventListener("click", () => {
        document.getElementById("problem-list").style.display = "block";
        document.getElementById("main-container").style.display = "none";
        document.body.removeChild(popup); // Supprime le popup
    });
}

window.addEventListener("beforeunload", function (event) {
    if (document.getElementById("main-container").style.display === "flex") {
        event.preventDefault(); // Nécessaire pour certains navigateurs
        event.returnValue =
        "Tu es en train de résoudre un problème. Es-tu sûr de vouloir quitter ?";
        return "Tu es en train de résoudre un problème. Es-tu sûr de vouloir quitter ?";
    }
});
