const fs = require('fs');
const path = require('path')

const base = path.resolve(__dirname, 'scss')
let scss = `
// https://fontawesome.com/docs/web/use-with/scss
// importing core styling file
@import "./fontawesome.scss";

// import all
`
const rgIgnore = /^_(functions|variables|mixins|core|sizing|fixed-width|list|bordered-pulled|animated|rotated-flipped|stacked|icons|screen-reader).scss$/
scss += fs.readdirSync(base)
  //.filter(file => !file.startsWith('_'))
  .filter(file => !['all.scss', 'fontawesome.scss'].includes(file) && !rgIgnore.test(file))
  .map(file => {
    console.log(file, rgIgnore.test(file))
    return `@import "./${file}";`
  }).join('\n')

fs.writeFileSync(path.join(base, 'all.scss'), scss.trim())