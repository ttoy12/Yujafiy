var voiceOptions = {
    "Barack Obama": "00151ac0-3826-11ee-a861-00163e2ac61b",
    "Donald Trump": "001511b4-3826-11ee-a861-00163e2ac61b",
    "Morgan Freeman": "5cd9f375-3a96-11ee-9fd9-8cec4b691ee9",
    "Mickey Mouse": "5cc7fe5d-3a96-11ee-93c5-8cec4b691ee9",
    "Hatsune Miku": "00152639-3826-11ee-a861-00163e2ac61b"
};

document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById("voicesList");

    for (const [key, value] of Object.entries(voiceOptions)) {
        var ele = document.createElement("option");
        ele.textContent = key;
        ele.value = value;
        select.appendChild(ele);
    }

    // Add event listener for dropdown change
    select.addEventListener('change', function () {
        var selectedVoice = select.options[select.selectedIndex].text;
        console.log("Selected Voice:", selectedVoice);
    });
});