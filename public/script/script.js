// Script for dynamically populating a modal
$(".edit").click(function(e) {
  e.preventDefault();
  var editData = $(this).attr("title");
  $.getJSON("/editCustomerModal/" + editData, function(data) {
    $(".hiddenFirstName").val(data.firstName);
    $(".hiddenLastName").val(data.lastName);
    $(".hiddenEmail").val(data.email);
    $(".hidden_Id").val(data._id);
  });
});
