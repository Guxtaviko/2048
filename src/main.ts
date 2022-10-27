import './style.css'

const game = document.querySelector('.game') as HTMLElement
let cells: Element[] = []

const generateGame = () => {
  for(let i = 1; i <= 16; i++){
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('data-index', i.toString())

    game.appendChild(cell)
    cells.push(cell)
  }
  randomNumbers(7, 64)
}

const randomNumbers = (qnt: number, max: number) => {
  let numbers: number[] = []
  let num = max

  numbers.push(num)

  while(num != 2){
    num = num/2
    numbers.push(num)
  }

  for(let i = 0; i < qnt; i++){
    const emptyCells = cells.filter(cell => cell.innerHTML == '')
    const number = numbers[Math.floor(Math.random() * numbers.length)]
    const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    cell.innerHTML = number.toString()
  }
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      break;
    case 'ArrowRight':
      break;
    case 'ArrowUp':
      break;
    case 'ArrowDown':
      break;
    default:
      break;
  }
})

generateGame()

