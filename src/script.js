$(document).ready(function () {
  $('[data-action]').click(function () {
    var data = $(this).data('action')
    gtag('event', data.value, {
      'event_category': data.category,
      'event_label': data.label,
    })
  })

  $('.fotorama').on(//'fotorama:ready ' +           // Fotorama is fully ready
    'fotorama:show ' +            // Start of transition to the new frame
    //'fotorama:showend ' +         // End of the show transition
    //'fotorama:load ' +            // Stage image of some frame is loaded
    'fotorama:error ' +           // Stage image of some frame is broken
    'fotorama:startautoplay ' +   // Slideshow is started
    'fotorama:stopautoplay ' +    // Slideshow is stopped
    'fotorama:fullscreenenter ' + // Fotorama is fullscreened
    'fotorama:fullscreenexit ' +  // Fotorama is unfullscreened
    'fotorama:loadvideo ' +       // Video iframe is loaded
    'fotorama:unloadvideo',       // Video iframe is removed
    function (e, fotorama, extra) {
      gtag('event', fotorama.activeFrame.img, {
        'event_category': 'fotorama',
        'event_label': e.type.split(':')[1],
      })
      //console.log('## ' + e.type)
      //console.log('active frame', fotorama.activeFrame)
      //console.log('additional data', extra)
    }
  )
})

