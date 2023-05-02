/* AUDIO */

const correct = document.querySelector('.correct'),
      wrong = document.querySelector('.wrong');

/* BLINKING */

document.addEventListener("click", e => {
    
    if (e.target.classList.contains('button')) {
        const imagesClass = e.target.parentElement.previousElementSibling,
              boxClass = imagesClass.parentElement,
              imagesNumber = imagesClass.querySelectorAll("img").length;

        function blinking(colorVar) {
            boxClass.style = `background-color: var(${colorVar})`;
            setTimeout(() => {
                boxClass.style = `background-color: var(--new-black)`;
            }, 100);
        }

        if (e.target.innerText === imagesNumber.toString()) {
            blinking("--pastel-green");
            correct.play();
        }
        else {
            blinking("--pastel-red");
            wrong.play();
        }
    }
})