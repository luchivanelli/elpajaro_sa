export const handleModal = (id)=> {
    const serviceInfo = document.getElementById(id)
    serviceInfo.classList.toggle('hidden')
    serviceInfo.classList.toggle('flex')
}

export const getServicios = ()=> {
    fetch('http://localhost:1234/')
    .then(res => res.json())
    .then(data => {
        return data
    })

}