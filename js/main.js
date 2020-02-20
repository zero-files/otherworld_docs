const localisation = {
    spanish: {
        "navbar.game": "JUEGO",
        "navbar.docs": "DOCS",
        "navbar.about": "ACERCA DE"
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
