console.log('Clientside js file attached')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e) => {
  e.preventDefault()
  const address = search.value

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) =>{
    response.json().then((data) =>{
      messageOne.textContent = ''
      messageTwo.textContent = ''
    if(data.error){
      messageOne.textContent = data.error
    }else{
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast}
    })
  })

})