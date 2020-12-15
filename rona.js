function addCommas(dataPoint) {
    var i = 0
    var ugly = dataPoint.toString()
    var caseArray = ugly.split("").reverse().join("").match(/.{1,3}/g)
    var nice = ""
    for (i = caseArray.length - 1; i >= 0; i--) {
        nice = nice.concat(caseArray[i].toString().split("").reverse().join(""))
        if (i != 0) {
            nice = nice.concat(',')
        }
    }
    return nice
}

const app = document.getElementById('logoH')

const logo = document.createElement('img')
logo.src = 'rona-64x64.png'

app.appendChild(logo)

const container = document.getElementById('container')

var request = new XMLHttpRequest()

request.open('GET', 'https://api.covidtracking.com/v1/us/current.json', true)

request.onload = function () {
    var myData = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        myData.forEach((dataset) => {
            // Log each movie's title
            console.log(dataset.positive)
        })

        const date = document.createElement('h3')
        var uglyDate = myData[0].date.toString()
        var niceDate = uglyDate.slice(0, 4) + '/' + uglyDate.slice(4, 6) + '/' + uglyDate.slice(6,8)
        date.textContent = `Data last collected: ${niceDate}`

        const totalcases = document.createElement('h2')
        totalcases.textContent = `Total cases: ${addCommas(myData[0].positive)}`
        
        const totaldeaths = document.createElement('h2')
        totaldeaths.textContent = `Total deaths: ${addCommas(myData[0].death)}`
        
        const newcases = document.createElement('h2')
        newcases.textContent = `New cases: ${addCommas(myData[0].positiveIncrease)}`

        const newdeath = document.createElement('h2')
        newdeath.textContent = `New deaths: ${addCommas(myData[0].deathIncrease)}`

        const recovered = document.createElement('h2')
        recovered.textContent = `Total recovered: ${addCommas(myData[0].recovered)}`

        container.append(date)
        container.append(totalcases)
        container.append(totaldeaths)
        container.append(newcases)
        container.append(newdeath)
        container.append(recovered)

    } else {
        console.log('error')
    }
}

request.send()