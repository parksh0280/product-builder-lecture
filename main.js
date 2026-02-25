
class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            .numbers {
                display: flex;
                justify-content: center;
                gap: 10px;
            }
            .number {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
        `;
        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers');
        shadow.appendChild(style);
        shadow.appendChild(numbersContainer);
    }

    setNumbers(numbers) {
        const numbersContainer = this.shadowRoot.querySelector('.numbers');
        numbersContainer.innerHTML = '';
        for (const number of numbers) {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            numberElement.style.backgroundColor = this.getBackgroundColor(number);
            numbersContainer.appendChild(numberElement);
        }
    }

    getBackgroundColor(number) {
        if (number <= 10) return '#f9e79f';
        if (number <= 20) return '#a9dfbf';
        if (number <= 30) return '#aed6f1';
        if (number <= 40) return '#f5b7b1';
        return '#d2b4de';
    }
}

customElements.define('lotto-numbers', LottoNumbers);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbers = document.querySelector('lotto-numbers');

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function updateLottoNumbers() {
    const newNumbers = generateLottoNumbers();
    lottoNumbers.setNumbers(newNumbers);
}

generateBtn.addEventListener('click', updateLottoNumbers);

// Initial generation
updateLottoNumbers();
