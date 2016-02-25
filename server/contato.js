Meteor.methods({
  sendEmail: function (data) {
    check(data, Object);
    check([data.nome, data.email, data.mensagem], [String]);

    if (!data.nome || !data.email || !data.mensagem)
      throw new Meteor.Error("app", "Preencha todos os campos corretamente.");

    if (!Meteor.call("isEmailValid", data.email))
      throw new Meteor.Error("app", "Utilize um e-mail válido.");

    this.unblock();

    var text = "Nome: " + data.nome + "\n" + "Email: " + data.email + "\n\n" + data.mensagem;

    Email.send({
      to: "joice@redbutterfly.com.br",
      from: "joice@redbutterfly.com.br",
      replyTo: data.nome + "<" + data.email + ">",
      subject: "Contato por RedButterfly.com.br",
      text: text
    });
  },

  isEmailValid: function (address) {
    check(address, String);

    var result = HTTP.get('https://api.mailgun.net/v2/address/validate', {
      params: {
        address: address
      }
    });

    if (result.statusCode === 200)
      return result.data.is_valid;
    else
      return true;
  }
});
