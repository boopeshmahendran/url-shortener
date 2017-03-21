$('#url-form').submit(function(event) {
  event.preventDefault();
  $('#loader').show();
  $('#shortened-url').empty();
  $.post({
    url: '/api/shorten',
    data: {
      longUrl: $('#longUrl').val()
    },
    success: function(data) {
      $('#loader').hide();
      var html = '<a href="' + data.shortUrl + '">' + data.shortUrl + '</a>';
      $('#shortened-url').html('Shortened url is ' + html);
    }
  });
});
