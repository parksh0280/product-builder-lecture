class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            .numbers {
                display: flex;
                justify-content: center;
                gap: 8px;
                flex-wrap: wrap;
            }
            .number {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2rem;
                font-weight: 700;
                color: #212529;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                border: 2px solid #fff;
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
        if (number <= 10) return '#fce38a'; // Yellow
        if (number <= 20) return '#95e1d3'; // Green
        if (number <= 30) return '#aeddef'; // Blue
        if (number <= 40) return '#f38181'; // Red
        return '#b8de6f'; // Purple-ish
    }
}

customElements.define('lotto-numbers', LottoNumbers);

const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const lottoNumbers = document.querySelector('lotto-numbers');
const lottoPlaceholder = document.getElementById('lotto-placeholder');

// Lotto Logic
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
    
    // Show numbers, hide placeholder
    lottoNumbers.classList.remove('hidden');
    lottoPlaceholder.classList.add('hidden');
}

generateBtn.addEventListener('click', updateLottoNumbers);

// Theme Toggle Logic
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButton();

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeButton();
});

function updateThemeButton() {
    themeToggle.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
}
