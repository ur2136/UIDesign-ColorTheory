const colors = [
  "black",
  "white",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
];

function startTimer(question) {
  let timeLeft = 30;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      $(".submit").hide();
      setResults(question);
    } else {
      $(".timer").html(timeLeft + " seconds remaining");
      timeLeft--;
    }
  }

  $(".submit").click(function (e) {
    clearTimeout(timerId);
    $(".submit").hide();
    setResults(data.id);
  });
}

/**
 * Calculates the percentage difference between two colors
 *
 * @param attempt The user-attempted color
 * @param target The target color that the user must match
 */
function calculateResults(attempt, target) {
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
  $(".increase, .decrease").prop("disabled", true);
  let attemptColor = $(".attemptColor").css("background-color");
  let targetColor = $(".targetColor").css("background-color");
  const result = 100 - calculateResults(attemptColor, targetColor);
  $(".score").html(result + "%");
  $(".score").show();
  $(".next-btn").show();

  sendResults(result, question);

  if (question < 5) {
    $(".next-btn").click(function (event) {
      window.location.href = "/quiz/" + parseInt(question + 1);
    });
  } else {
    $(".endquiz").show();
    $(".endquiz").click(function (event) {
      window.location.href = "/quizEnd";
    });
  }
}

/**
 * Ajax function that sends result to server
 *
 * @param result Percentage result
 * @param question Question id
 */
function sendResults(result, question) {
  $.ajax({
    type: "POST",
    url: "/addScore",
    data: { id: question, result: result },
    success: function () {},
    error: function (error) {
      console.log(error);
    },
  });
}

/**
 * Calculates new color with adjusted weights
 */
function calculateNewColor() {
  let colorVals = colors.map(function (color) {
    return [parseInt($("#" + color + "Num").val())];
  });
  // using external js library chroma for weighted color mixing
  $.getScript("/static/chroma.min.js", function () {
    let newColor = chroma.average(colors, "rgb", colorVals);
    $(".attemptColor").css("background-color", newColor.hex());
  });
}

$(document).ready(function () {
  // Set up quiz
  $(".attemptColor").css("background-color", "#ffffff");
  $(".targetColor").css("background-color", data.targetColor);
  $(".score, .next-btn, .endquiz").hide();

  startTimer(data.id);

  // onClick function when user increases or decreases droplets
  $(".increase, .decrease").click(function () {
    let color = $(this).attr("id");
    let action = $(this).attr("class");
    const input = $("#" + color + "Num");
    let value = parseInt(input.val());
    if (action === "increase") {
      value = isNaN(value) ? 0 : value + 1;
    } else if (action === "decrease") {
      value = isNaN(value) || value === 0 ? 0 : value - 1;
    }
    input.val(value);
    calculateNewColor();
  });
});
