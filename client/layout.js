Template.index.rendered = function () {
  var controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
      offset: 5,
      triggerHook: "onEnter",
      duration: "180%"
    })
    .setTween('header', {
      y: "130%",
      ease: Linear.easeNone,
    })
    .addTo(controller);

  SVGInjector(document.querySelectorAll('img.svg'), {}, function () {
    document.querySelector('h1 .logo').style.display = "block";

    new ScrollMagic.Scene({
        offset: "105%",
        triggerElement: "header .logo",
        duration: 150
      })
      .setTween("header .logo", .5, {
        y: "-25%"
      })
      .addTo(controller);
  });
};