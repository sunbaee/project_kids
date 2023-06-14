/* IMAGE GENERATOR */

function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed();
}

function generateImage(imgBox) {
    const images = document.querySelectorAll('.image');
    images.forEach(img => {
        imgBox.removeChild(img);
    })
    const max = random(1, 12);

    for(let i = 0; i < max; i++) {
        const imgElement = document.createElement("img");

        imgElement.classList.add('image');
        const arrayImages = ['./images/dinossauro1.png', './images/dinossauro2.png']
        imgElement.src = arrayImages[random(0, 1)];
        imgElement.alt = `Dinossauro`;
        imgElement.draggable = false;
        imgElement.style = `transform: rotate(${random(-16, 16)}deg)`;

        imgBox.appendChild(imgElement);
    }
}

function generateButtonResponse(imgBox) {
    const answers = imgBox.nextElementSibling,
          buttons = answers.querySelectorAll('.button');
          
    const randomButton = buttons[random(0, 2)],
          correctResponse = imgBox.querySelectorAll(".image").length;

    const arrayAnswers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    arrayAnswers[correctResponse - 1] = 0;
    buttons.forEach(button => {
        let randomNumber = arrayAnswers[random(0, 11)];

        while(randomNumber === 0) {
            randomNumber = arrayAnswers[random(0, 11)];
        }

        button.innerText = randomNumber;
        arrayAnswers[randomNumber - 1] = 0;
    });

    randomButton.innerText = correctResponse;
}

const imgBox = document.querySelector('.images');

generateImage(imgBox);
generateButtonResponse(imgBox);

/* BUTTON RESPONSE */

const correct = document.querySelector('.correct'),
      wrong = document.querySelector('.wrong'),
      pontuacao = document.querySelector('.pontos');

const comboResultado = document.querySelector('.resultadoCombo'),
      comboTexto = document.querySelector('.textoCombo');

let pontos = 0;
let combo = 0;

document.addEventListener("click", e => {
    
    if (e.target.classList.contains('button')) {
        const imagesClass = e.target.parentElement.previousElementSibling,
              boxClass = imagesClass.parentElement,
              imagesNumber = imagesClass.querySelectorAll("img").length;

        function clickResponse(colorVar, sound) {
            boxClass.classList.add(colorVar);
            sound.play();
            setTimeout(() => {
                boxClass.classList.remove(colorVar);
            }, 1200);
        }

        function changeComboText(text) {
            const paragraph = document.querySelector('.fraseCombo');
            paragraph.innerText = text;
        }

        if (e.target.innerText === imagesNumber.toString()) {
            clickResponse("blinkingGreen", correct);
            
            generateImage(imgBox);
            generateButtonResponse(imgBox);

            combo++;

            if (combo >= 5 && combo < 10) {
                changeComboText('Tá melhorando!');
                comboTexto.style.setProperty('--combo-scale', 0);
                pontos += 2;
            } else if (combo >= 10 && combo < 15) {
                changeComboText('Você é bom nisso, hein?');
                pontos += 3;
            } else if (combo >= 15) {
                changeComboText('DEMAIS!');
                pontos += 4;
            } else {
                pontos++;
            }

        } else {
            clickResponse("blinkingRed", wrong);

            changeComboText('');
            comboTexto.style.setProperty('--combo-scale', '-150%');
            
            combo = 0;
            pontos -= 3;
        }

        pontos = pontos < 0 ? 0 : pontos;

        pontuacao.innerText = pontos;
        comboResultado.innerText = combo;
    }
})
