import './style.css'

const game = document.querySelector('.game') as HTMLElement
let numbers: HTMLElement[] = []

const generateGame = () => {
  for(let i = 1; i <= 16; i++){
    const cell = document.createElement('div')
    cell.classList.add('cell')

    game.appendChild(cell)
  }
  randomNumbers(5, 4)
}

const randomNumbers = (qnt: number, max: number) => {
  let possibleNumbers: number[] = []

  possibleNumbers.push(max)

  while(max != 2){
    max = max/2
    possibleNumbers.push(max)
  }

  for(let i = 0; i < qnt; i++){
    const number = document.createElement('div')
    number.classList.add('number')

    const num = possibleNumbers[Math.floor(Math.random() * possibleNumbers.length)]
    number.style.setProperty('--number', num.toString())
    number.innerHTML = num.toString()

    let row = Math.floor(Math.random() * 4)
    let column = Math.floor(Math.random() * 4)
    let index = row * 4 + column + 1
    while(document.querySelector(`[data-index="${index.toString()}"]`)){
      row = Math.floor(Math.random() * 4)
      column = Math.floor(Math.random() * 4)
      index = row * 4 + column + 1
    }
    positionateNumber(number, row, column)

    numbers.push(number)
    game.appendChild(number)
  }
  
  orderNumbers()
}

const positionateNumber = (number: HTMLElement, row: number, column: number) => {
  const index = row * 4 + column + 1
  number.setAttribute('data-index', index.toString())
  number.style.setProperty('--row', row.toString())
  number.style.setProperty('--column', column.toString())
}

const orderNumbers = () => {
  for(let i = 1; i <= 16; i++){
    const num = numbers.find(number => number.getAttribute('data-index')! == i.toString())!
    numbers.push(num)
    numbers.splice(numbers.indexOf(num), 1)
  }
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      moveLeft()
      break;
    case 'ArrowRight':
      moveRight()
      break;
    case 'ArrowUp':
      moveUpwards()
      break;
    case 'ArrowDown':
      moveDownwards()
      break;
    default:
      break;
  }
  
  randomNumbers(1, 8)
})

const moveRight = () => {
  numbers.reverse().forEach(number => {
    let index = parseInt(number.getAttribute('data-index')!)
    let right = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index + 1)
    while(index % 4 != 0 && right === undefined){

      number.setAttribute('data-index', (index+1).toString())
      number.style.setProperty('--column', (index % 4).toString())
      index++
      right = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index + 1)
    }
    if(right !== undefined) {
      overrideCell(number, right)
    }
  })
}

const moveLeft = () => {
  numbers.forEach(number => {
    let index = parseInt(number.getAttribute('data-index')!)
    let left = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index - 1)
    while((index - 1) % 4 != 0 && left === undefined){

      number.setAttribute('data-index', (index - 1).toString())
      number.style.setProperty('--column', ((index - 2) % 4).toString())
      index--
      left = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index - 1)
    }
    if(left !== undefined) {
      overrideCell(number, left)
    }
  })
}

const moveUpwards = () => {
  numbers.forEach(number => {
    let index = parseInt(number.getAttribute('data-index')!)
    let up = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index - 4)
    while(index > 4 && up === undefined){
      number.setAttribute('data-index', (index - 4).toString())
      number.style.setProperty('--row', (Math.ceil(index / 4 - 2)).toString())
      index = index - 4
      up = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index - 4)
    }
    if(up !== undefined) {
      overrideCell(number, up)
    }
  })
}

const moveDownwards = () => {
  numbers.reverse().forEach(number => {
    let index = parseInt(number.getAttribute('data-index')!)
    let down = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index + 4)
    while(index < 13 && down === undefined){
      number.setAttribute('data-index', (index + 4).toString())
      number.style.setProperty('--row', (Math.ceil(index / 4)).toString())
      index = index + 4
      down = numbers.find(number => parseInt(number.getAttribute('data-index')!) == index + 4)
    }
    if(down !== undefined) {
      overrideCell(number, down)
    }
  })
}

const overrideCell = (cell: HTMLElement, parent: HTMLElement) => {
  if(parent.innerHTML === cell.innerHTML){
    numbers.splice(numbers.indexOf(cell), 1)
    game.removeChild(cell)

    const double = parseInt(parent.innerHTML) * 2
    parent.innerHTML = double.toString()
    parent.style.setProperty('--number', double.toString())
  }
}

generateGame()

