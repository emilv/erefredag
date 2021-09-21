document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.addEventListener("mousemove", simplicity, {
            passive: true
        })
    }, 100)
})

let simple = true
let simple_interval = null
let simple_counter = 6;
function simplicity() {
    simple_counter = 6
    if (!simple) {
        return;
    }

    document.querySelectorAll(".sec:not(.active)").forEach(elem => {
        elem.classList.add("active")
    })
    simple = false

    simple_interval = setInterval(() => {
        if (simple_counter > 0) {
            simple_counter--;
        } else {
            clearInterval(simple_interval);
            document.querySelectorAll(".sec.active").forEach(elem => {
                elem.classList.remove("active")
            })
            simple = true;
        }
    }, 1000);
}
