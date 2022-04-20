function mapResult(score) {
  let resultMessage;
  switch (true) {
    case score < 65:
      resultMessage = "Oof, you may have to review your color mixing lessons.";
      break;
    case score < 80:
      resultMessage = "Almost there, but not quite.";
      break;
    case score < 90:
      resultMessage = "Good job! Practice makes perfect!";
      break;
    case score <= 100:
      resultMessage = "Well done! You've earned the title of Sir Mix-a-Lot!";
      break;
  }
  $(".resultmessage").html(resultMessage);
}

$(document).ready(function () {
  mapResult(finalScore);
});
