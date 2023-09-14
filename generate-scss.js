const fs = require('fs');
const path = require('path')

const base = path.resolve(__dirname, 'scss')
let scss = `
// importing core styling file
@import "./fontawesome.scss";

// import all
`

scss += fs.readdirSync(base)
  .filter(file => !file.startsWith('_'))
  .filter(file => !['all.scss', 'fontawesome.scss'].includes(file))
  .map(file => {
    return `@import "./${file}";`
  }).join('\n')

fs.writeFileSync(path.join(base, 'all.scss'), scss.trim())