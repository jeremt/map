var map = new Map(document.querySelector('.map'))

map
  .size(600, 400)
  .type('roadmap')
  .zoom(12)
  .at(48.8656559, 2.3921962)
  .markers({color: 'blue'}, [{lat: 48.8656, lng: 2.3921962}])
  .style({
    feature: 'road',
    element: 'geometry',
    hue: '0xff0022',
    saturation: '60',
    lightness: '-20'
  })
  .generate();