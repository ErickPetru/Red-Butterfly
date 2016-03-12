Template.contato.events({
  "submit .contato": function (event, template) {
    event.preventDefault();

    var resultado = $(template.find(".resultado")),
      loader = $(template.find(".loader")),
      botao = $(template.find("input[type='submit']")),
      nome = event.target.nome,
      email = event.target.email,
      mensagem = event.target.mensagem,
      data = {
        nome: nome.value.trim(),
        email: email.value.trim().toLowerCase(),
        mensagem: mensagem.value.trim()
      };

    data.mensagem = data.mensagem.substring(0, Math.min(2000, data.mensagem.length));

    botao.prop("disabled", true).hide();
    loader.show();
    resultado.empty().removeClass("error").removeClass("success");

    if (!data.nome || !data.email || !data.mensagem) {
      resultado.text("Preencha todos os campos para prosseguir.").addClass("error");
      botao.prop("disabled", false).show();
      loader.hide();

      !data.mensagem && mensagem.focus();
      !data.email && email.focus();
      !data.nome && nome.focus();
      return;
    }

    Meteor.call("sendEmail", data, function (error, result) {
      if (error) {
        if (error.error == "app") {
          resultado.text(error.reason).addClass("error");
          botao.prop("disabled", false).show();

          if (error.reason.indexOf("e-mail") != -1)
            email.focus();
        } else {
          resultado.html("Ocorreu um problema interno. Tente falar conosco diretamente através de nosso <em>Facebook</em>.").addClass("error");
        }
      } else {
        resultado.text("Obrigado pelo contato! Responderemos sua mensagem em breve.").addClass("success");
        event.target.nome.value = event.target.email.value = event.target.mensagem.value = "";
      }

      loader.hide();
    });
  }
});