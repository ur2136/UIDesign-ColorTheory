function startTimer(question) {
  let timeLeft = 2;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      setResults(question);
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

function setResults(question) {
  // disable droplet buttons to prevent further edits

  let attemptColor = $(".attemptColor").css("background-color");
  let targetColor = $(".targetColor").css("background-color");
  const result = calculateResults(attemptColor, targetColor);
  $(".result").html(result + "%");
  $(".result").show();
  $(".next").show();

  sendResults(result, question);
  $(".next").attr("href", "/quiz/" + parseInt(question + 1));
}

function sendResults(result, question) {
  $.ajax({
    type: "POST",
    url: "/addScore",
    data: { id: question, result: result },
    success: function () {},
    error: function (request, status, error) {
      console.log(error);
    },
  });
}

$(document).ready(function () {
  // set up quiz
  $(".attemptColor").css("background-color", "#ffffff");
  $(".targetColor").css("background-color", data.targetColor);
  $(".result").hide();
  $(".next").hide();
  startTimer(data.id);

  // TODO: create droplets

  // TODO: when user changes droplet amount, calculate new color
});
