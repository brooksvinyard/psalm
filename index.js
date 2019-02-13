const psalms = window.psalms

let todaysDate = new Date()
todaysDate = todaysDate.getDate()

const psalmsOTD = [
  todaysDate,
  todaysDate + 30,
  todaysDate + 60,
  todaysDate + 90,
  todaysDate + 120
]

/**
 * @param {Number} chapter - The the psalm's chapter
 * @param {string} verses - The the psalm's verses HTML string, generated from
 *                          renderVerse(...)
 * @return {string}
 */
function renderPsalm(chapter, verses) {
  return `<div class="psalm">
    <h2>Psalm <span class="${chapter}">${chapter}</span></h2>
    <div>${verses}</div>
  </div>`
}

function renderVerse(number, verse) {
  return `<strong>${number}</strong> ${verse} <br>`
}

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

document.getElementById('psalms').innerHTML = renderApp(psalms, psalmsOTD)
