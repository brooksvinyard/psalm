const psalms = window.psalms

let todaysDate = new Date()
todaysDate = todaysDate.getDate()

// If the date is the 31st, we only want to display Psalm 119
// Otherwise, we want to display the 5 Psalms of the day
let psalmsOTD = [
  todaysDate
]
if (todaysDate != 31) {
  psalmsOTD = [
    todaysDate,
    todaysDate + 30,
    todaysDate + 60,
    todaysDate + 90,
    todaysDate + 120
  ]
}


/**
 * @param {Number} chapter - The the psalm's chapter
 * @param {string} verses - The the psalm's verses HTML string, generated from
 *                          renderVerse(...)
 * @returns {string}
 */
function renderPsalm(chapter, verses) {
  return `<div class="psalm">
    <h2>Psalm <span class="${chapter}">${chapter}</span></h2>
    <div>${verses}</div>
  </div>`
}

/**
 * @param {Number} number - The verse number
 * @param {string} verse - The verse itself.
 * @returns {string} returns the HTML of the verse
 */
function renderVerse(number, verse) {
  return `<strong>${number}</strong> ${verse} <br>`
}

/**
 * 
 * @param {JSON} psalms - data from psalms.js
 * @param {Array<Number>} chapters - array of chapters e.g. [3,33,63,93,123]
 * @returns {string} HTML of the app
 */
function renderApp(psalms, chapters) {
  let html = ''

  chapters.forEach(c => {
    let versesHTML = ''
    const chapter = psalms.book[c].chapter

    Object.keys(chapter).map(v => {
      versesHTML += renderVerse(v, chapter[v].verse)
    })

    html += renderPsalm(c, versesHTML)
  })

  return html
}

// Render the app into <div id="psalms"></div>
document.getElementById('psalms').innerHTML = renderApp(psalms, psalmsOTD)
