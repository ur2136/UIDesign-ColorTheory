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

function increaseBlack() {
  var value = parseInt(document.getElementById('blackNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('blackNum').value = value;
  calculateNewColor();
}

function decreaseBlack() {
  var value = parseInt(document.getElementById('blackNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('blackNum').value = value;
  calculateNewColor();
}

function increaseWhite() {
  var value = parseInt(document.getElementById('whiteNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('whiteNum').value = value;
  calculateNewColor();
}

function decreaseWhite() {
  var value = parseInt(document.getElementById('whiteNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('whiteNum').value = value;
  calculateNewColor();
}

function increaseRed() {
  var value = parseInt(document.getElementById('redNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('redNum').value = value;
  calculateNewColor();
}

function decreaseRed() {
  var value = parseInt(document.getElementById('redNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('redNum').value = value;
  calculateNewColor();
}

function increaseOrange() {
  var value = parseInt(document.getElementById('orangeNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('orangeNum').value = value;
  calculateNewColor();
}

function decreaseOrange() {
  var value = parseInt(document.getElementById('orangeNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('orangeNum').value = value;
  calculateNewColor();
}

function increaseYellow() {
  var value = parseInt(document.getElementById('yellowNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('yellowNum').value = value;
  calculateNewColor();
}

function decreaseYellow() {
  var value = parseInt(document.getElementById('yellowNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('yellowNum').value = value;
  calculateNewColor();
}

function increaseGreen() {
  var value = parseInt(document.getElementById('greenNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('greenNum').value = value;
  calculateNewColor();
}

function decreaseGreen() {
  var value = parseInt(document.getElementById('greenNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('greenNum').value = value;
  calculateNewColor();
}

function increaseBlue() {
  var value = parseInt(document.getElementById('blueNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('blueNum').value = value;
  calculateNewColor();
}

function decreaseBlue() {
  var value = parseInt(document.getElementById('blueNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('blueNum').value = value;
  calculateNewColor();
}

function increasePurple() {
  var value = parseInt(document.getElementById('purpleNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('purpleNum').value = value;
  calculateNewColor();
}

function decreasePurple() {
  var value = parseInt(document.getElementById('purpleNum').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('purpleNum').value = value;
  calculateNewColor();
}

function calculateNewColor() {
  var black = parseInt(document.getElementById('blackNum').value, 10);
  var white = parseInt(document.getElementById('whiteNum').value, 10);
  var red = parseInt(document.getElementById('redNum').value, 10);
  var orange = parseInt(document.getElementById('orangeNum').value, 10);
  var yellow = parseInt(document.getElementById('yellowNum').value, 10);
  var green = parseInt(document.getElementById('greenNum').value, 10);
  var blue = parseInt(document.getElementById('blueNum').value, 10);
  var purple = parseInt(document.getElementById('purpleNum').value, 10);

  //hex is # RRGGBB
  //black = - all
  //white = + all
  //orange = + r&y
  //green = + y&b
  //purple = + b&r

  //start with white == #ffffff (black = #000000)
  // hex is 0 1 2 3 4 5 6 7 8 9 a b c d e f(15)
  // 00    0a    5f    ff
  // 00 05 0a 0f 5f af ff

  var r = (red*2 + orange + purple + white - black)*10;
  var g = (green*2 + white - black)*10;
  var b = (blue*2 + purple + green + white - black)*10;

  var color = "#" +  r.toString(16) + g.toString(16) + b.toString(16);
  //hexString = yourNumber.toString(16);
  console.log(color)
  $(".attemptColor").css("background-color", color);
  
}

$(document).ready(function () {
  // set up quiz
  $(".attemptColor").css("background-color", "#ffffff");
  $(".targetColor").css("background-color", data.targetColor);
  $(".result").hide();
  $(".next").hide();
  startTimer(data.id);

  calculateNewColor();
  // TODO: create droplets

  // TODO: when user changes droplet amount, calculate new color
});
