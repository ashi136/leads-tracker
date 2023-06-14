 let myleads = []
 const inputel = document.getElementById("input-el")
 const inputbtn = document.getElementById("input-btn")
 const ulel = document.getElementById("ul-el")
 const deletebtn = document.getElementById("delete-btn")
 const savetab = document.getElementById("save-btn")
 const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))

 if(leadsfromlocalstorage){
   myleads= leadsfromlocalstorage
   render(myleads)
 }

 savetab.addEventListener('click', function(){
   chrome.tabs.query({active : true, currentWindow : true },function(tabs){
      myleads.push(tabs[0].url)
      localStorage.setItem("myleads",JSON.stringify(myleads))
      render(myleads)

   } )
 })

 deletebtn.addEventListener('click', function(){
   localStorage.clear()
   myleads=[]
   render(myleads)
 })

inputbtn.addEventListener('click',function(){
   myleads.push(inputel.value)
   inputel.value = ""
   localStorage.setItem("myleads",JSON.stringify(myleads))
   render(myleads)
  })

function render(leads){
let listitems = ""
for (let i = 0; i < leads.length; i++) {
   listitems += `
   <li>
    <a target='_blank' href='${leads[i]}'> ${leads[i]} 
    </a> </li>
    `
}
ulel.innerHTML = listitems
}