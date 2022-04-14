function startTimer() {
  let timeLeft = 30;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      setResults();
    } else {
      $(".timer").html(timeLeft + " seconds remaining");
      timeLeft--;
    }
  }
}

function calculateResults(attempt, target) {
  // get percentage difference between two colors
  if (!attempt && !target) return;

  let attemptColor = attempt.replace(/[^\d,]/g, "").split(",");
  let targetColor = target.replace(/[^\d,]/g, "").split(",");

  attemptColor = attemptColor.map((rgbVal) => (rgbVal / 255) * 100);
  const attemptSum = attemptColor.reduce((a, b) => a + b, 0);
  const perc1 = Math.round(attemptSum / 3);

  targetColor = targetColor.map((rgbVal) => (rgbVal / 255) * 100);
  const targetSum = targetColor.reduce((a, b) => a + b, 0);
  const perc2 = Math.round(targetSum / 3);

  return Math.abs(perc1 - perc2);
}

function setResults() {
  // disable droplet buttons to prevent further edits

  let attemptColor = $(".attemptColor").css("background-color");
  let targetColor = $(".targetColor").css("background-color");
  const results = calculateResults(attemptColor, targetColor);
  $(".result").html(results + "%");
  $(".result").show();
  $(".next").show();

  // make sure to send this calculation to backend server
}

$(document).ready(function () {
  // set up quiz
  $(".attemptColor").css("background-color", "#ffffff");
  $(".targetColor").css("background-color", data.targetColor);
  $(".result").hide();
  $(".next").hide();
  startTimer();

  // TODO: create droplets

  // TODO: when user changes droplet amount, calculate new color
});
