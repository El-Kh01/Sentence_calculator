document.getElementById('calc-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let minTerm = parseInt(document.getElementById('min-term').value);
    let maxTerm = parseInt(document.getElementById('max-term').value) * 12; // переводим годы в месяцы

    let isPrep = document.getElementById('prep').checked;
    let isAttempt = document.getElementById('attempt').checked;
    let isRecidiv = document.getElementById('recidiv').checked;
    let isAgreement = document.getElementById('agreement').checked;
    let isJury = document.getElementById('jury').checked;

    // Совокупность преступлений
    let isLightCrimes = document.getElementById('light-crimes').checked;
    let isSeriousCrimes = document.getElementById('serious-crimes').checked;

    let minSentence = minTerm;
    let maxSentence = maxTerm;

    // Учитываем приготовление
    if (isPrep) {
        maxSentence = Math.floor(maxSentence / 2);
    }
    // Учитываем покушение
    if (isAttempt) {
        maxSentence = Math.floor(maxSentence * 3 / 4);
    }
    // Учитываем рецидив
    if (isRecidiv) {
        minSentence = Math.max(minSentence, maxSentence / 3);
    }
    // Учитываем досудебное соглашение
    if (isAgreement) {
        maxSentence = Math.floor(maxSentence * 2 / 3);
    }
    // Учитываем вердикт присяжных
    if (isJury) {
        maxSentence = Math.floor(maxSentence * 2 / 3);
    }

    // Совокупность преступлений
    if (isLightCrimes) {
        // Если все преступления легкие или средней тяжести, то применяется поглощение.
        maxSentence = Math.min(maxSentence, maxSentence / 2);
    }

    if (isSeriousCrimes) {
        // Если есть тяжкие преступления, то сложение наказаний
        maxSentence = Math.floor(maxSentence * 1.5);
        // Ограничиваем наказание не более чем на половину максимального срока наказания за самое тяжкое преступление
        maxSentence = Math.min(maxSentence, Math.floor(maxTerm * 1.5));
    }

    let minYears = Math.floor(minSentence / 12);
    let minMonths = minSentence % 12;
    let maxYears = Math.floor(maxSentence / 12);
    let maxMonths = maxSentence % 12;

    document.getElementById('result').innerText = 
        `Наказание: от ${minYears} лет ${minMonths} месяцев до ${maxYears} лет ${maxMonths} месяцев`;
});
