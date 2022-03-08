const tools = require('../../helpers/tools')
const svgJSon = require('../../../svgjson')
const colorHandler = require('./color')
const fontfaceHandler = require('./fontface')
const fontFamilyHandler = require('./fontFamily')
const positionHandler = require('./position')

async function styleAssist(fontJson, suffix, weight) {
  let cssFileContent = '';
  const fontface = tools.extractFontface(fontJson)
  cssFileContent += `.rexfontinc {
    ${fontFamilyHandler(fontface)};
    font-style: normal;
    position: relative;
  }`
  Object.entries(svgJSon.extractGlyphSets(fontJson)).forEach((glyphs, i) => {
    glyphs[1].forEach((glyph, j) => {
      let order = parseInt(glyph.attributes.unicodeOrder)
      cssFileContent += `.${glyphs[1][0].attributes["glyph-name"]}:${order ? 'after' : 'before'} {
        content: "${glyph.attributes.unicode}";
        ${positionHandler(glyph)}
        ${colorHandler(glyph)}
      }\n`
    })
  })
  cssFileContent += fontfaceHandler(fontface, suffix, weight);

  return cssFileContent
}

module.exports = styleAssist;