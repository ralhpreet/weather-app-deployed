

const weatherForm = document.querySelector('form')
const searchedLocation = document.querySelector('input')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    p1.textContent = "Loading...";
    p2.textContent = ""
    fetch('/weather?address='+searchedLocation.value).then((response)=>{

response.json().then(data => {
    if(data.error){
        console.log(data.error)
        p1.textContent = data.error;
    } 
    else{
        console.log(data);
        p1.textContent = data.coordinates.location
        p2.textContent = data.data;
    }  
})
})

})