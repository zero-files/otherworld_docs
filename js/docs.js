const API_URL = "https://otherworld-api.herokuapp.com"

const sleep = time => new Promise(res => setTimeout(() => res(),time||1000))
/**
 * @returns {Promise<{
 *  method:string
 *  path:string
 *  description:string
 *  tier:number
 *  filename:string
 *  parameters: {
 *      name:string
 *      type:string
 *      description:string
 *      isRequired:boolean
 *  }[]
 * }[]>}
 */
const get_docs = async () => await fetch(`${API_URL}/autodocumentation`).then(res => res.json())

/**
 * 
 * @param {{
 *  method:string
 *  path:string
 *  description:string
 *  tier:number
 *  filename:string
 *  parameters: {
 *      name:string
 *      type:string
 *      description:string
 *      isRequired:boolean
 *  }[]
 * }} data
 * @returns {HTMLLIElement}
 */
function auto_doc(data){
    let li = document.createElement("li")

    let parameters = []
    if(data.parameters && data.parameters.length) 
        for(i = 0; i < data.parameters.length; i++){
            let tr = `
                <tr>
                    <td>${data.parameters[i].name} ${data.parameters[i].isRequired ? "*" : ""}</td>
                    <td>${data.parameters[i].type}</td>
                    <td>${data.parameters[i].description}</td>
                </tr>
            `
            parameters.push(tr)
        }

    li.innerHTML = `
        <h4>${data.method.toUpperCase()}<span style="color: rgba(255,255,255,0.25)"> · </span>${data.path}</h4>
        <p>Descripción: ${data.description}</p>
        <p>Tier de autenticación: ${data.tier}</p>
        <h5>Body Parameters</h5>
        <table>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            ${parameters.length ? parameters.join("\n") : "<td></td><td></td><td></td>"}
        </table>
        <p style="text-align: right; margin: 20px 0 5px 0">En github: <a href="https://github.com/zero-files/otherworld_api/src/controllers/${data.filename}">src/controllers/${data.filename}</a></p>
    `
    return li
}

document.addEventListener('DOMContentLoaded', async () => {
    const $baseurl = document.getElementById("baseurl")
    if($baseurl) $baseurl.innerHTML = `Base URL: <span style="color: #039be5">${API_URL}</span>`

    const $docs = document.getElementById("docs")
    if($docs){
        let {data} = await getDocs()
        
        let lis = data.map(route => autoDoc(route))
        lis.forEach(li => $docs.appendChild(li))
    }
    
})
