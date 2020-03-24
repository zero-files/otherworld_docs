const API_URL = "https://www.example.com/"

const sleep = time => new Promise(res => setTimeout(() => res(),time||1000))
/**
 * @returns {Promise<{
 *  method:string
 *  path:string
 *  description:string
 *  tier:number
 *  link:string
 *  parameters: {
 *      name:string
 *      type:string
 *      description:string
 *      isRequired:boolean
 *  }[]
 * }[]>}
 */
function getDocs(){
    return new Promise(async (resolve, reject) =>{
        await sleep(1500)
        const fakedata = [
            {
                method: "GET",
                path: "/test",
                description: "Esta es una ruta de pruebas",
                tier: 0,
                link: "test.js",
                parameters: [
                    {
                        name: "x",
                        type: "string",
                        description: "un parametro x",
                        isRequired: false
                    },
                    {
                        name: "y",
                        type: "string",
                        description: "un parametro y",
                        isRequired: true
                    },
                ]
            },
            {
                method: "GET",
                path: "/wooo",
                description: "Esta es una ruta awesome",
                tier: 0,
                link: "wooo.js",
            }
        ]
        resolve(fakedata)
    })
}

/**
 * 
 * @param {{
 *  method:string
 *  path:string
 *  description:string
 *  tier:number
 *  link:string
 *  parameters: {
 *      name:string
 *      type:string
 *      description:string
 *      isRequired:boolean
 *  }[]
 * }} data
 * @returns {HTMLLIElement}
 */
function autoDoc(data){
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
        <p style="text-align: right; margin: 20px 0 5px 0">En github: <a href="https://github.com/zero-files/otherworld_api/src/controllers/${data.link}">src/controllers/${data.link}</a></p>
    `
    return li
}

document.addEventListener('DOMContentLoaded', async () => {
    const $baseurl = document.getElementById("baseurl")
    if($baseurl) $baseurl.innerHTML = `Base URL: <span style="color: #039be5">${API_URL}</span>`

    const $docs = document.getElementById("docs")
    if($docs){
        let routes = await getDocs()
        let lis = routes.map(route => autoDoc(route))
        lis.forEach(li => $docs.appendChild(li))
    }
    
})
