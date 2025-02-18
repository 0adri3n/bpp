<img src="https://github.com/0adri3n/bpp/blob/master/src/img/logo.PNG?raw=true" width=450></img>

# BPP

BPP (Big Python Problems) is a static website where you can challenge your Python skills with various problems.

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/3b79028f-4951-4265-b39c-c41dff8d151a)

![image](https://github.com/user-attachments/assets/32f41c4e-cb10-4ce9-9151-c23bb0371d68)

![image](https://github.com/user-attachments/assets/78a884f9-bc44-4e8a-8e43-259a99c691d7)


## 🚀 Overview

This project allows you to:

- **Submit your code** directly from the browser using an interactive code editor.
- **View the output** and test the code results in real-time.
- **Browse and select programming problems** to solve, directly from the problem list.

## 🎯 Goal

The goal is to provide an easy and visually appealing platform where users can practice solving coding problems, submit solutions, and view results. It’s a simple, no-installation-needed static web interface that allows users to code and test directly.

## 🔗 Link

👉 **[Project link hosted on Github Page](https://0adri3n.github.io/bpp/)**  

## 🛠️ How to Use?

1. **Browse the list of available problems** and select one.
2. **Write your solution** in the provided code editor.
3. **Execute your code** by clicking the "Run" button to see the output.
4. **View the result** of your code execution in the output section.
5. **Add new problems** by forking the project and editing the `repo_url.json` file (more details below).

## 💡 How to Add Your Own Problem?

1. **Fork the Repository**  
   Click on the **Fork** button at the top-right of this page to make a copy of the project to your own GitHub account.

2. **Create a problem file with `problem_template.json`**  
   This file contains a problem template that you can edit to create yours. You can test it by pressing **Load a problem** button before submitting it.

```json
{
    "title": "Problem Title",
    "author": "Your nickname",
    "date": "DD-MM-YYYY",
    "difficulty": "Easy OR Medium OR Hard OR Impossible",
    "objective": "Please describe carefully what the player needs to achieve to succeed.",
    "code_template": "# Inputs are stored in input_cases variable. Please use them.\n# You can write some base code here to help the player.\nprint(input_cases)",
    "test_cases": [
        {
            "input": [3, 2],
            "expected_output": 1
        },
        {
            "input": [10, 0],
            "expected_output": 10
        },
        {
            "input": [-555, -96],
            "expected_output": -651
        },
        {
            "input": [100, 200],
            "expected_output": -100
        }
    ]
}
```

2. **Add the problem URL to `repo_url.json`**  
   This file contains a list of programming problems and their associated URLs. You can easily add your own problem by adding this URL template to the file :
   
```json
"https://raw.githubusercontent.com/YOUR_USERNAME/bpp/refs/heads/main/PROBLEM_FILE_NAME.json"
```

4. **Push Your Changes**  
   After you modify the `repo_url.json` file, create a commit with a message like "Added a new problem." Push your changes to your GitHub repository.

5. **Create a Pull Request**  
   Once your changes are pushed, go to the **Pull Requests** section of your repository and submit a pull request to the main project. This will allow me to review and potentially merge your changes into the project.

## 💡 Contribute

This project is **open-source**! Feel free to **fork**, test, and improve it.

📌 **Potential improvements:**

- 🎨 Enhance the design with new styles.
- 🐱‍💻 Pentest BPP to reveal some potential issues.
- 🌍 Support multiple languages for international users.
- 🖥️ Expand the set of problems available for users to solve.

## 📜 License

This project is licensed under **MIT**, so feel free to use, modify, and share it!

---

👨‍💻 **Enjoy solving coding problems and testing your solutions in style!**  
