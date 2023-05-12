const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=searchValue'
const formDom = document.querySelector('.form')
const inputDom = document.querySelector('.form-input')
const resultDom = document.querySelector('.results')

formDom.addEventListener('submit', (e) => {
  e.preventDefault()
//   const value = inputDom.value
  const sentence=inputDom.value;
let doSplit=sentence.split(" ");

for(let i=0;i<doSplit.length;i++){
  doSplit[i]=doSplit[i][0].toUpperCase()+doSplit[i].substr(1);
}
const value=doSplit.join(" ");

  

  if (!value) {
    resultDom.innerHTML = `<div class="error">please enter valid search term</div>`
    return
  }

  fetchPages(value)
})

const fetchPages = async (searchValue) => {
  resultDom.innerHTML = `<div class="loading"></div>`
  try {
    const response = await fetch(`${url}${searchValue}`)
    const data = await response.json()
  
    const result = data.query.search
    if (result.length < 1) {
      resultDom.innerHTML = `<div class="error">no matching result try again.....<div>`
      return
    }
    renderResult(result)
  } catch (error) {
    resultDom.innerHTML = `<div class="error">there was an error</div>`
  }
}

const renderResult = (list) => {
  const cardsList = list
    .map((item) => {
      return `<a href="http://en.wikipedia.org/?curid=${item.pageid}" target="_blank">
        <h3>${item.title}</h3>
        <p>${item.snippet}</p>
        </a>`
    })
    .join('')
  resultDom.innerHTML = `<div class=articles>
  ${cardsList}
  <div>`
}
