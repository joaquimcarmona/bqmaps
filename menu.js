// Este ficheiro tem de ser colocado em
// https://storage.googleapis.com/bqmaps_public/menu.js
// e ser servido a partir daí
// (i.e., <script src="https://storage.googleapis.com/bqmaps_public/menu.js">)

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content 
depois de empurrar painel de input para a direita*/
function myFunction() {
    if (document.getElementById("menu")) {
        if (document.getElementById("menu").style.marginLeft == "200px") {
            document.getElementById("map").style.marginLeft = "0px";
            document.getElementById("menu").style.marginLeft = "0px";
            document.getElementById("menu").style.opacity = "1";
        } else {
            document.getElementById("map").style.marginLeft = "170px";
            document.getElementById("menu").style.marginLeft = "200px";
            document.getElementById("menu").style.opacity = "0.2";
        };
    }
    if (document.getElementById('Cab').style.zIndex == '' &
        !document.getElementById('menu')) {
        document.getElementById('Cab').style.zIndex = '-1';
    } else {
        document.getElementById('Cab').style.zIndex = '';
    }
    if (lingua == 'pt') {
        document.getElementById("myDropdown").classList.toggle("show");
    } else {
        document.getElementById("myDropdownEn").classList.toggle("show");
    }
}

    
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        document.getElementById("map").style.marginLeft = "0px";
        if (document.getElementById('menu')) {
            document.getElementById("menu").style.marginLeft = "0px";
            document.getElementById("menu").style.opacity = "1";
        }
        if (!document.getElementById('menu')) {
            document.getElementById('Cab').style.zIndex = '-1';
        }
    }
}