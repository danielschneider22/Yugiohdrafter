
export function scrollToggleNavVisibility(ev: Event) {
    const selectHeader = document.getElementById("header")
    const scrollY = (ev.currentTarget as HTMLDivElement).scrollTop
    if (scrollY > 50 && selectHeader) {
        selectHeader.classList.add('header-scrolled')
    } else if (selectHeader) {
        selectHeader.classList.remove('header-scrolled')
    }
    return true
}