document.addEventListener("DOMContentLoaded", () => {
    const folders = document.querySelectorAll(".folder");
    const composeButton = document.querySelector(".compose");
    const readButton = document.querySelector(".read");
    const deleteButton = document.querySelector(".delete");
    const emailList = document.querySelector(".email-list");
    const emailView = document.querySelector(".email-view");
    const composeEmailSection = document.querySelector(".compose-email");

    let selectedFolder = null; // Derzeit ausgewählter Ordner

    // Beispiel-E-Mails
    const emails = [
        { folder: "inbox", title: "Beispiel 1", content: "Dies ist die erste Beispiel-E-Mail." },
        { folder: "sent", title: "Beispiel 2", content: "Dies ist die zweite Beispiel-E-Mail." },
        // Weitere Beispiel-E-Mails hier einfügen
    ];

    // Funktion zum Anzeigen von E-Mails im ausgewählten Ordner
    function displayEmails(folder) {
        emailList.innerHTML = ""; // Zurücksetzen der E-Mail-Liste

        const folderEmails = emails.filter((email) => folder === "inbox" || email.folder === folder);

        folderEmails.forEach((email, index) => {
            const emailItem = document.createElement("li");
            emailItem.textContent = email.title;

            emailItem.addEventListener("click", () => {
                // Anzeigen der ausgewählten E-Mail im E-Mail-Anzeigebereich
                emailView.innerHTML = `<h2>${email.title}</h2><p>${email.content}</p>`;
            });

            emailList.appendChild(emailItem);
        });
    }

    // Ereignishandler für das Klicken auf einen Ordner
    folders.forEach((folder) => {
        folder.addEventListener("click", () => {
            selectedFolder = folder.classList[1];
            displayEmails(selectedFolder);
        });
    });

    // Ereignishandler für das Klicken auf "Verfassen"
    composeButton.addEventListener("click", () => {
        composeEmailSection.style.display = "block";
        emailView.style.display = "none";
    });

    // Ereignishandler für das Klicken auf "Senden"
    const sendEmailButton = document.querySelector(".send-email");
    sendEmailButton.addEventListener("click", () => {
        const recipient = document.getElementById("recipient").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Hier könntest du die E-Mail senden und in das "sent"-Verzeichnis hinzufügen
        emails.push({ folder: "sent", title: subject, content: message });

        // Zurück zur Ordneransicht "Gesendet"
        selectedFolder = "sent";
        displayEmails("sent");

        // Formular leeren und ausblenden
        document.getElementById("recipient").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
        composeEmailSection.style.display = "none";
    });

    // Ereignishandler für das Klicken auf "Lesen"
    readButton.addEventListener("click", () => {
        if (selectedFolder) {
            displayEmails(selectedFolder);
        } else {
            emailView.innerHTML = "<p>Bitte wählen Sie zuerst einen Ordner aus.</p>";
        }
    });

    // Ereignishandler für das Klicken auf "Löschen"
    deleteButton.addEventListener("click", () => {
        emailView.innerHTML = "<h2>Löschen</h2><p>Hier können Sie E-Mails löschen.</p>";
    });
});
