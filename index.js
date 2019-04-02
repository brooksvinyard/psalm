let psalms = window.psalms

let todaysDate = new Date();
todaysDate = todaysDate.getDate();

// If the date is the 31st, we only want to display Psalm 119
// Otherwise, we want to display the 5 Psalms of the day
let psalmsOTD = [
  119
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


///////////////////////////////////
// ESV
const url = 'https://api.esv.org/v3/passage/html/?'
const myHeaders = ({
    'Accept': 'application/json',
    'authorization': 'Token 7da60d7d2f5a81d0d7a463497986c890c72c99ca'
  });

let myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};
let params = "q=Ps" + `${psalmsOTD.join(",")}` +
    "&include-headings=True" + 
    "&include-footnotes=False" + 
    "&include-verse-numbers=True" + 
    "&include-short-copyright=True" + 
    "&include-copyright=False" + 
    "&include-passage-references=True" + 
    "&include-chapter-numbers=False" + 
    "&include-subheadings=True" + 
    "&wrapping-div=True" + 
    "&div-classes=psalm" + 
    "&include-audio-link=false";


fetch(`${url}${params}`, myInit)
  .then(res => res.json())
  .then(json => {
    // console.log(json);
    let passage = json.passages.join("");
    document.getElementById('esv').innerHTML += passage;
  });
// ESV
/////////////////////////////////////////////////////

 
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
  document.getElementById('kjv').innerHTML = renderApp(psalms, psalmsOTD)
