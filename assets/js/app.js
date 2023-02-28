function displayRules() {
    let show = document.getElementById('open-modale')
    show.addEventListener('click', function (){
        document.getElementById('rules').style.display = 'block';
    })
}
function hideRules() {
    let showRules = document.getElementById('close-modale')
    showRules.addEventListener('click', function (){
        document.getElementById('rules').style.display = 'none';
    })
}
// function displayBackground() {
//     let displayBack = document.getElementById('close-background')
//     displayBack.addEventListener('click', function() {
//         document.getElementById('background').style.display = 'none';
//     })
// }