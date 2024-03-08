$(document).ready(function () {
    const heroForm = $("#heroForm")
    const heroNumber = $("#heroNumber")
    const heroResult = $("#heroResult")
    const chartContainer = $("#chartContainer")

    heroForm.on("submit", function (event) {
        event.preventDefault()

        heroNumber.removeClass("is-valid is-invalid")

        const heroNumberUser = parseInt(heroNumber.val())

        if (heroNumberUser > 0) {
            heroNumber.addClass("is-valid")

            getHero(heroNumberUser)
        } else {
            heroNumber.addClass("is-invalid")
        }


    })



    const getHero = (heroNumber) => {
        $.ajax({
            url: `https:www.superheroapi.com/api.php/10231403815334635/${heroNumber}`,
            method: "GET",
            success(hero) {




                const myHero = {
                    image: hero.image.url,
                    name: hero.name,
                    connections: hero.connections["group-affiliation"],
                    occupation: hero.work.occupation,
                    firstappearance: hero.biography["first-appearance"],
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


                const arrayPowers = Object.entries(hero.powerstats);
                const powers = arrayPowers.map(power => ({ ...power }))

                const dataPoints = powers.map(object => {
                    const newObject = {
                        y: object[1],
                        label: object[0]
                    };
                    return newObject;
                });

                const options = {
                    title: { text: "Estadisticas del Super Heroe" },
                    animationEnabled: true,
                    data: [
                        {
                            type: "pie",
                            startAngle: 40,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label} - {y}%",
                            dataPoints: dataPoints
                        }
                    ]

                }

                chartContainer.CanvasJSChart(options);


            },
            error(e) {

            }
        })
    }


})