const btnDel = document.querySelectorAll('.btn-delete')

//Set id into delete button
for (let i = 0; i < btnDel.length; i++) {
    btnDel[i].addEventListener('click', function (e) {
        e.preventDefault()
        let id = e.target.getAttribute('data-id')
        document.getElementById('confirm-del').setAttribute('data-id', id)
    })
}

//User confirm delete: get id from delete confirm and send id to server
document.getElementById('confirm-del').addEventListener('click', function (e) {
    e.preventDefault()
    let id = e.target.getAttribute('data-id')
    console.log(id)
    fetch (`/recruiter/${id}`, {
        method: 'DELETE',
    })
    .then (res => res.json())
    .then(data => {
        console.log(data)
        if (data.code == 0) {
            window.location.reload()
        }
    })
    .catch(err => console.log(err)) 
})