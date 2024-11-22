$(document).ready(function () {
  let currentHour = moment().format("HH");

  //grabs saved events from localStorage when the page loads
  $(".time-div").each(function () {
    var time = $(this).attr("id").split("-")[1]; //get the hour from the div's id
    var savedData = JSON.parse(localStorage.getItem(time));

    if (savedData) {
      $(this).children(".time-block").val(savedData.event);
      $(this).children(".time-block").addClass("saved"); //option to add a class for saved events
    }
  });

  //edit button click handler
  $(".editBtn").click(function (event) {
    event.preventDefault();
    var timeBlockDiv = $(this).parent(); //get the parent div for this time block
    var textArea = timeBlockDiv.find(".time-block"); //find the textarea inside this div

    //toggle the textarea to be editable and change button visibility
    textArea.prop("readonly", false); //make the textarea editable
    $(this).hide();  //hide the edit button
    timeBlockDiv.find(".saveBtn").show(); //show the save button
  });

  //save button click handler
  $(".saveBtn").click(function (event) {
    event.preventDefault();
    var timeBlockDiv = $(this).parent(); //get the parent div for this time block
    var value = timeBlockDiv.find(".time-block").val(); //get the value from the textarea

    var time = timeBlockDiv.attr("id").split("-")[1]; //get the hour from the div's id

    //save event to localStorage
    localStorage.setItem(time, JSON.stringify({ event: value }));

    //hide save button and show edit button
    $(this).hide(); //hide the save button
    timeBlockDiv.find(".editBtn").show(); //show the edit button

    //make the textarea non-editable again
    timeBlockDiv.find(".time-block").prop("readonly", true); 
  });
});
