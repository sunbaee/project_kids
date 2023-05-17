/* IMAGE GENERATOR */

function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed();
}

function generateImage(imgBox) {
    const max = random(1, 4);

    for(let i = 0; i < max; i++) {
        const imgElement = document.createElement("img");

        imgElement.classList.add('image');
        imgElement.src = `https://as1.ftcdn.net/v2/jpg/02/45/24/32/1000_F_245243273_1VzsxL9SynYTQfCkJ60S0EB8wMSKsmrk.jpg`
        imgElement.alt = `Dinossauro`

        imgBox.appendChild(imgElement);
    }
}

function generateButtonResponse(imgBox) {
    const answers = imgBox.nextElementSibling,
          buttons = answers.querySelectorAll('.button');
          
    const randomButton = buttons[random(0, 2)],
          correctResponse = imgBox.querySelectorAll(".image").length;

    buttons.forEach(button => {
        const randomNumber = random(1, 9);
        button.innerText = randomNumber;
    });

    randomButton.innerText = correctResponse;
}

const images = document.querySelectorAll('.images');

images.forEach(imgBox => {
    generateImage(imgBox);
    generateButtonResponse(imgBox);
})

/* BUTTON RESPONSE */

const correct = document.querySelector('.correct'),
      wrong = document.querySelector('.wrong');

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

        if (e.target.innerText === imagesNumber.toString()) {
            clickResponse("blinkingGreen", correct);
        }
        else {
            clickResponse("blinkingRed", wrong);
        }
    }
})