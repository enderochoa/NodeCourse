const searchBin = document.querySelector('input')
const searchForm = document.querySelector('form')

searchForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const bin = searchBin.value

  fetch('http://localhost:3000/example?paymentMethod=master').then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
          const binValue = document.querySelector('#bin')
          binValue.textContent = data.bin
      }
    })
  })

})

