let ldetails = document.getElementById('upper')
let perdetails = document.getElementById('lower')
let rdetails = document.getElementById('righter')
let empid = document.getElementById('empid')

let pdet = document.getElementById('pdbtn')
let hiddet = document.getElementById('lower')
let droparrow = document.getElementById('droparrow')


    let toggle = true
    pdet.addEventListener('click', () => {
        if(toggle){
            hiddet.style.display = 'flex'
            droparrow.style.transform = 'rotate(180deg)'
            toggle = false
        }
        else{
            hiddet.style.display = 'none'
            droparrow.style.transform = 'rotate(0deg)'
            toggle = true
        }
    } )

window.addEventListener('load', async () => {
    let resplog = await fetch('/extract', {
        "method": "POST",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify({
            "user": sessionStorage.getItem("user"),
            "pass": sessionStorage.getItem("pass")
        })
    })
    let query = await resplog.json()
    console.log(query)
    empid.innerText += query.empid
    for([key, value] of Object.entries(query.Pdet)){
        let field = document.createElement('span')
        field.innerText = `${key}: ${value}`
        perdetails.appendChild(field)
        console.log(key)
    }
    for([key, value] of Object.entries(query.Odet)){
        let field = document.createElement('span')
        field.innerText = `${key}: ${value}`
        rdetails.appendChild(field)
        console.log(key)
    }
    for([key, value] of Object.entries(query.Gdet)){
        let field = document.createElement('span')
        field.innerText = `${key}: ${value}`
        ldetails.appendChild(field)
        console.log(key)
    }
})





