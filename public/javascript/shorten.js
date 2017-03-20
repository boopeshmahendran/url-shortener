$('#url-form').submit(function(event) {
  event.preventDefault();
  $.post({
    url: '/api/shorten',
    data: {
      longUrl: $('#longUrl').val()
    },
    success: function(data) {
      var html = '<a href="' + data.shortUrl + '">' + data.shortUrl + '</a>';
      $('#shortened-url').html('Shortened url is ' + html);
    }
  });
});
