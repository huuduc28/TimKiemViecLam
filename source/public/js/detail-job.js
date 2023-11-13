const toast = document.getElementById('toast-msg')

//copy url function
function copyURL() {
    let URL = document.querySelector('.share-url').innerText
    navigator.clipboard.writeText(URL).then(() => {
        showToast('Copy đường dẫn thành công')
    })
}

//show message
function showToast(msg) {
    const toast = document.querySelector('.toast')
    const ts = new bootstrap.Toast(toast)
    toast.innerText = msg
    ts.show()
}

document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault()
    //append data into form data to send to server (include files)
    const form = new FormData()
    const desc = document.getElementById('description').value
    const files = document.getElementById('image')
    const title = document.getElementById('title')

    //Because allow upload mutiple files, then loop files and append per files into form data
    for (let i = 0; i < files.files.length; i++) {
        form.append('files', files.files[i])
    }

    form.append('title', title)
    form.append('description', desc)
    console.log(form)

    //Upload report recruitment
    fetch('/report/uploadReport', {
        method: 'POST',
        body: form,
    })
    .then(res => res.json())
    .then(data => {
        if (data.code == 0) {
            document.getElementById('btn-close').click()
            showToast('Báo cáo thành công')
        }
    })
    .catch((err) => {
        console.log(err)
    })
})