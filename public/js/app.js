const weatherForm = document.querySelector('form')
const searchele = document.querySelector('input')
const mssgone = document.querySelector('#mssg-1')
const mssgtwo = document.querySelector('#mssg-2')

weatherForm.addEventListener('submit',(e)=>{
    // stops automatic and refreshing of a page
    e.preventDefault()
    const location  = searchele.value

    mssgone.textContent = 'Loading..'
    mssgtwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            mssgone.textContent = data.error
        }
        else
        {
            mssgone.textContent = data.location
            mssgtwo.textContent = data.forecast  
        }
        
    }
    )
})

})