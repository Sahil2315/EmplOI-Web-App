let parnt = document.getElementById('adm')

window.addEventListener('load', async () => {
    let respad = await fetch('/admext',{
        "method": "GET"
    })
    let qry = await respad.json()
    let query1 = qry.body
    // for(let i=0; i<query1.length; i++){
    //     let nele = document.createElement('div')
    //     let sno = document.createElement('span')
    //     sno.innerText = i+1
    //     nele.appendChild(sno)
    //     for([key, value] of Object.entries(query1[i])){
    //         let innerele = document.createElement('span')
    //         innerele.innerText = value
    //         innerele.classList.add('admincols')
    //         nele.appendChild(innerele)
    //     }
    //     nele.classList.add('adminrows')
    //     parnt.appendChild(nele)
    // }
    
    for(let i=0; i<query1.length; i++){
        let nele = document.createElement('tr')
        //let sno = document.createElement('td')
        // sno.innerText = i+1
        // sno.classList.add('admincols')
        // nele.appendChild(sno)
        for([key, value] of Object.entries(query1[i])){
            if(key == "dob" || key == "doj"){
                let innerele = document.createElement('td')
                innerele.innerText = value.slice(0, 10)
                innerele.classList.add('admincols')
                nele.appendChild(innerele)
            }
            else{
                let innerele = document.createElement('td')
                innerele.innerText = value
                innerele.classList.add('admincols')
                nele.appendChild(innerele)
            }
            // let innerele = document.createElement('td')
            // innerele.innerText = value
            // innerele.classList.add('admincols')
            // nele.appendChild(innerele)
        }
        nele.classList.add('adminrows')
        parnt.appendChild(nele)

    }
})