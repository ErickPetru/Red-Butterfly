Template.destaques.rendered = function () {
  var positions = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    count = 0;

  setInterval(function () {
    var p = positions[count++];

    if (count >= positions.length) {
      positions = shuffle(positions);
      count = 0;
      p = positions[count++];
    }

    p = $(".produto:eq(" + p + ")");
    $(".produto[data-col='" + p.data("col") + "']").css("z-index", 1);
    p.css("z-index", 2);
  }, 1500);

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i),
        temp = array[i];

      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
};