$(function() {
  $("form[name='formulario']").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      firstname: "Por favor, introduzca su nombre",
      lastname: "Por favor, introduzca su apellido",
      password: {
        required: "Por favor proporcione una contraseña",
        minlength: "Su contraseña debe tener al menos 5 caracteres."
      },
      email: "Por favor, introduce una dirección de correo electrónico válida"
    },

    submitHandler: function(form) {
      var nombre = document.getElementById('firstname').value;
      var apellido = document.getElementById('lastname').value;
      var email = document.getElementById('email').value;
      var contraseña = document.getElementById('password').value;
      var codigo = codRandom();

      var boleta = 'TICKET DEL SORTEO\n'+
        ' Nombre:  ' + nombre + '\n' +
        ' Apellido:  ' + apellido + '\n' +
        ' Email:  ' + email + '\n' +
        ' CÓDIGO DE PARTICIPACIÓN:    ' + codigo;

      alert(boleta);

      var doc = new jsPDF();
      doc.text(40, 20, 'TICKET DEL SORTEO');
      doc.text(10, 40, 'Fecha: 25/04/2023');
      doc.text(10, 60, 'Datos Participante:');
      doc.text(20, 70, 'Nombre: ' + nombre);
      doc.text(20, 80, 'Apellido: ' + apellido);
      doc.text(20, 90, 'Email: ' + email);
      doc.text(10, 110, 'Código de participación:' +codigo);

      doc.save('Ticket_Sorteo.pdf');

      var pdfBlob = pdf.output('blob');

      var downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'Ticket_Sorteo.pdf';
      downloadLink.click();

      URL.revokeObjectURL(pdfBlob);
    }
  });
});

function codRandom(){
    var num = "";
    var letra = ["A","B","C","D","E","F","G","H","I","J"]
    let aCodigo =[]
    for(let i = 0; i < 3; i++){
      num = Math.floor(Math.random()*10)
      aCodigo.push(num)
    }
    for(var i= 3; i < 6; i++){
      num = Math.floor(Math.random()*10)
      aCodigo.push(letra[num])
    }
    var cadena = aCodigo.join("");
    return cadena
}