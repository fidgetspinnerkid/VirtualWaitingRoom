

var formData;
$("#mainForm").submit(function () {
  formData = $('#mainForm').serializeArray();
  conn.send(formData);

  $("#mainForm :submit").attr("disabled", "disabled");

  pauseButton();

  $("#successMessage").html(`<font color="green">Sent successfully!</font>`);
  return false;
});


function pauseButton() {
    setTimeout( function () 
      {
        $("#mainForm :submit").removeAttr("disabled");
        $("#successMessage").html("");
      }, 
      1500
    );
}
