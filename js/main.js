const localisation = {
    spanish: {
        "navbar.game": "JUEGO",
        "navbar.docs": "DOCS",
        "navbar.wiki": "WIKI",
        "navbar.about": "ACERCA DE",
        "index.description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ullam deleniti inventore, maiores nesciunt, veritatis hic qui magnam totam ad sequi excepturi obcaecati ipsa ea iusto, cumque corrupti autem soluta!Laborum debitis vero recusandae incidunt aspernatur repellat placeat delectus saepe dolorem itaque officia magni exercitationem quam odit rerum, ducimus quaerat quae minima porro earum? Perferendis nulla reiciendis accusantium labore expedita?" ,
        "index.playnow": "Juega en Discord",
        "players.live": "Supervivientes ",
        "players.dead": "Muertos "

    },
    english: {
        "navbar.game": "GAME",
        "navbar.docs": "DOCS",
        "navbar.about": "ABOUT"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sidenavs = document.querySelectorAll('.sidenav')
    M.Sidenav.init(sidenavs)

    let lang = "spanish"
    const langs = Object.keys(localisation)
    if(langs.indexOf(lang) === -1) lang = "spanish"
    const dicolang = localisation[lang]
    const dicolangkeys = Object.keys(dicolang)

    const textfields = document.querySelectorAll("[data-translate]")
    textfields.forEach(element => {
        if(element.dataset && element.dataset.translate) for(i = 0; i < dicolangkeys.length; i++) {
            let field = element.dataset.translate
            if(dicolangkeys.indexOf(field) !== -1) element.innerHTML = dicolang[field]
        }
    })
})
