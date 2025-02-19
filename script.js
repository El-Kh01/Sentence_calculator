document.getElementById('calc-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let minTerm = parseInt(document.getElementById('min-term').value);
    let maxTerm = parseInt(document.getElementById('max-term').value) * 12; // переводим годы в месяцы

    let isPrep = document.getElementById('prep').checked;
    let isAttempt = document.getElementById('attempt').checked;
    let isRecidiv = document.getElementById('recidiv').checked;
    let isAgreement = document.getElementById('agreement').checked;
    let isJury = document.getElementById('jury').checked;

    let minSentence = minTerm;
    let maxSentence = maxTerm;

    if (isPrep) {
        maxSentence = Math.floor(maxSentence / 2);
    }
    if (isAttempt) {
        maxSentence = Math.floor(maxSentence * 3 / 4);
    }
    if (isRecidiv) {
        minSentence = Math.max(minSentence, maxSentence / 3);
    }
    if (isAgreement) {
        maxSentence = Math.floor(maxSentence * 2 / 3);
    }
    if (isJury) {
        maxSentence = Math.floor(maxSentence * 2 / 3);
    }

    let minYears = Math.floor(minSentence / 12);
    let minMonths = minSentence % 12;
    let maxYears = Math.floor(maxSentence / 12);
    let maxMonths = maxSentence % 12;

    document.getElementById('result').innerText = 
        `Наказание: от ${minYears} лет ${minMonths} месяцев до ${maxYears} лет ${maxMonths} месяцев`;
});
