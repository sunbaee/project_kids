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