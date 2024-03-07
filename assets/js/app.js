$(document).ready(function () {
    const heroForm = $("#heroForm")
    const heroNumber = $("#heroNumber")
    const heroResult = $("#heroResult")

    heroForm.on("submit", function (event) {
        event.preventDefault()

        heroNumber.removeClass("is-valid is-invalid")

        const heroNumberUser = parseInt(heroNumber.val())

        if (heroNumberUser > 0) {
            heroNumber.addClass("is-valid")
            //console.log("es correcto")
            getHero(heroNumberUser)
        } else {
            heroNumber.addClass("is-invalid")
        }


    })
    //CONSUMIR LA API DE SUPERHERO
    //URL https://www.superheroapi.com/api.php/4905856019427443/100
    const getHero = (heroNumber) => {
        $.ajax({
            url: `https:www.superheroapi.com/api.php/10231403815334635/${heroNumber}`,
            method: "GET",
            success(hero) {



                // console.log(hero)
                // console.log("name: ", hero.name)
                // console.log("height: ", hero.heigth)
                // console.log("image: ", hero.image)
                const myHero = {
                    image: hero.image.url,
                    name: hero.name,
                    connections: hero.connections.relative,
                    occupation: hero.work.occupation,
                    firstappearance: hero.biography.firstappearance,
                    height: hero.appearance.height,
                    weight: hero.appearance.weight,
                    alignment: hero.biography.alignment,




                }

                heroResult.html(`<div class="card">
                <img src="${myHero.image}"
                    alt="" class="card-img-top">
                <div class="card-body">
                    <h5>Nombre: ${myHero.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Conexiones: ${myHero.connections}</li>
                    <li class="list-group-item">Ocupación: ${myHero.occupation}</li>
                    <li class="list-group-item">Primera aparición: ${myHero.firstappearance}</li>
                    <li class="list-group-item">Altura: ${myHero.height}</li>
                    <li class="list-group-item">Peso: ${myHero.weight}</li>
                    <li class="list-group-item">Alianzas: ${myHero.alignment}</li>


                </ul>
                <div>`)


            },



            error(e) {


            }
        })
    }


})