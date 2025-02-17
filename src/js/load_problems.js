document.addEventListener("DOMContentLoaded", function() {
    class MyOutput {
        constructor() {
            this.console = document.getElementById("output");
            this.expected_output = "";
        }

        write(text) {
            this.console.textContent += text;
        }

        flush() {}

        setExpectedOutput(output) {
            this.expected_output = output;
            document.getElementById("expected-output").textContent = output;
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
                <strong>Objective:</strong> ${problemData.objective}
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
        new MyOutput().setExpectedOutput(problemData.expected_output);

        
        document.getElementById("inedit-details").innerHTML = `
            <strong>Author :</strong> ${problemData.author} <br>
            <strong>Date :</strong> ${problemData.date} <br>
            <strong>Difficulty :</strong> ${problemData.difficulty} <br>
            <strong>Objective :</strong> ${problemData.objective}
        `;
    }

    document.getElementById("exec").addEventListener("click", function() {
        runPython();
    });

    loadProblemList();
});
