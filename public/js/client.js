const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#m1')
const messagetwo = document.querySelector('#m2')



weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value

    messageone.textContent = 'Loading....'
    messagetwo.textContent = ''



    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageone.textContent = data.error
        } else {
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast + " " + data.address



            // console.log(data.location)
            // console.log(data.forecast)
            // console.log(data.address)
        }

    })

})
    
})