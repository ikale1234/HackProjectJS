var adding = document.getElementById("diff_add");
var subtracting = document.getElementById("diff_sub");
var multiplying = document.getElementById("diff_mult");
var dividing = document.getElementById("diff_div");
var in_game = document.getElementById("the_game");
var level_index;
var points = 0;
var problems_answered = 0;
var remaining_time = 30;
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function end_game() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = this.responseText;
      data = data.split("\n");
      localStorage.setItem("max_score", data[0]);
      localStorage.setItem("avg_score", data[1]);
    }
  };
  username = localStorage.getItem("name");
  xhttp.open("GET", "score/" + username + "/" + points, true);
  xhttp.send();
  window.location.href = "home_page.html";
}

function tell_time_left(interval, canvas) {
  win = canvas.getContext("2d");
  if (remaining_time === 0) {
    clearTimeout(interval);
  } else {
    remaining_time -= 1;
  }
  win = canvas.getContext("2d");
  win.font = "30px Arial";
  win.clearRect(0, 0, 190, 30);
  win.fillText("Time Left: " + remaining_time, 100, 25);
}

function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return [x, y];
}

function get_level_1() {
  var ans_list = [];
  var a = Math.trunc(Math.random() * 9) + 1;
  var b = Math.trunc(Math.random() * 9) + 1;
  var c = a + b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 17) + 2);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 17) + 2);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " + " + b, c, ans_list];
}

function get_level_2() {
  var ans_list = [];
  var a = Math.trunc(Math.random() * 9) + 1;
  var b = Math.trunc(Math.random() * 79) + 10;
  var c = a + b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " + " + b, c, ans_list];
}

function get_level_3() {
  var ans_list = [];
  var a = Math.trunc(Math.random() * 79) + 10;
  var b = Math.trunc(Math.random() * 79) + 10;
  var c = a + b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " + " + b, c, ans_list];
}

function get_level_4() {
  var ans_list = [];
  var m = Math.trunc(Math.random() * 9) + 1;
  var n = Math.trunc(Math.random() * 9) + 1;
  if (m > n) {
    var a = m;
    var b = n;
  } else {
    var a = n;
    var b = m;
  }

  var c = a - b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 8) + 1);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 8) + 1);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " - " + b, c, ans_list];
}

function get_level_5() {
  var ans_list = [];
  var a = Math.trunc(Math.random() * 90) + 10;
  var b = Math.trunc(Math.random() * 9) + 1;

  var c = a - b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 10) + c - 5);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 10) + c - 5);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " - " + b, c, ans_list];
}

function get_level_6() {
  var ans_list = [];
  var m = Math.trunc(Math.random() * 90) + 10;
  var n = Math.trunc(Math.random() * 90) + 10;
  if (m > n) {
    var a = m;
    var b = n;
  } else {
    var a = n;
    var b = m;
  }
  var c = a - b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 10) + c - 5);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 10) + c - 5);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " - " + b, c, ans_list];
}

function get_level_7() {
  var ans_list = [];
  var poss_b = [0, 1, 10];

  var a = Math.trunc(Math.random() * 90) + 10;
  var b = poss_b[Math.floor(Math.random() * poss_b.length)];

  var c = a * b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 899) + 1);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 899) + 1);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " x " + b, c, ans_list];
}
function get_level_8() {
  var ans_list = [];

  var a = Math.trunc(Math.random() * 12) + 1;
  var b = Math.trunc(Math.random() * 12) + 1;

  var c = a * b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " x " + b, c, ans_list];
}

function get_level_9() {
  var ans_list = [];

  var a = Math.trunc(Math.random() * 90) + 10;
  var b = Math.trunc(Math.random() * 9) + 1;

  var c = a * b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " x " + b, c, ans_list];
}

function get_level_10() {
  var ans_list = [];
  var a = Math.trunc(Math.random() * 99) + 1;
  var poss_b = [1, a];
  var b = poss_b[Math.floor(Math.random() * poss_b.length)];

  var c = a / b;
  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 99) + 1);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 99) + 1);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " / " + b, c, ans_list];
}
function get_level_11() {
  var ans_list = [];
  var b = Math.trunc(Math.random() * 12) + 1;
  var c = Math.trunc(Math.random() * 12) + 1;
  var a = b * c;

  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 12) + 1);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 12) + 1);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " / " + b, c, ans_list];
}
function get_level_12() {
  var ans_list = [];
  var b = Math.trunc(Math.random() * 5) + 5;
  var c = Math.trunc(Math.random() * 80) + 20;
  var a = b * c;

  ans_list.push(c);
  for (i = 0; i < 4; i++) {
    ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
    for (j = 0; j < ans_list.length - 1; j++) {
      while (ans_list[ans_list.length - 1] === ans_list[j]) {
        ans_list.pop();
        ans_list.push(Math.trunc(Math.random() * 20) + c - 10);
      }
    }
  }
  ans_list = shuffle(ans_list);
  return [a + " / " + b, c, ans_list];
}

function create_circles(canvas) {
  var win = canvas.getContext("2d");
  var x_list = [];
  var y_list = [];
  var valid;
  var change;
  var x;
  var y;
  console.log("gg");
  for (i = 0; i < 5; i++) {
    valid = false;
    x = Math.trunc(Math.random() * 900) + 50;
    y = Math.trunc(Math.random() * 500) + 100;
    while (!valid) {
      change = false;
      for (j = 0; j < x_list.length; j++) {
        if (Math.abs(x - x_list[j]) < 100 && Math.abs(y - y_list[j]) < 100) {
          change = true;
        }
      }
      if (change) {
        x = Math.trunc(Math.random() * 900) + 50;
        y = Math.trunc(Math.random() * 500) + 100;
      } else {
        valid = true;
        x_list.push(x);
        y_list.push(y);
      }
    }
  }
  console.log(x_list);
  for (k = 0; k < x_list.length; k++) {
    win.fillStyle = "#00f9ff";
    win.beginPath();
    win.arc(x_list[k], y_list[k], 50, 0, 2 * Math.PI);
    win.stroke();
    win.fill();
    console.log(x_list[k]);
    console.log(y_list[k]);
  }
  return [x_list, y_list];
}

function get_values(canvas, level) {
  var coords = create_circles(canvas);
  var x_vals = coords[0];
  var y_vals = coords[1];
  if (level === "1") {
    var values = get_level_1();
    var increment = 1;
  }
  if (level === "2") {
    var values = get_level_2();
    var increment = 3;
  }
  if (level === "3") {
    var values = get_level_3();
    var increment = 5;
  }
  if (level === "4") {
    var values = get_level_4();
    var increment = 1;
  }
  if (level === "5") {
    var values = get_level_5();
    var increment = 3;
  }
  if (level === "6") {
    var values = get_level_6();
    var increment = 6;
  }
  if (level === "7") {
    var values = get_level_7();
    var increment = 1;
  }
  if (level === "8") {
    var values = get_level_8();
    var increment = 3;
  }
  if (level === "9") {
    var values = get_level_9();
    var increment = 7;
  }
  if (level === "10") {
    var values = get_level_10();
    var increment = 1;
  }
  if (level === "11") {
    var values = get_level_11();
    var increment = 4;
  }
  if (level === "12") {
    var values = get_level_12();
    var increment = 12;
  }

  var question = values[0];
  var answer = values[1];
  var answer_choices = values[2];
  win = canvas.getContext("2d");
  win.font = "20px Arial";
  win.textAlign = "center";
  for (i = 0; i < x_vals.length; i++) {
    win.fillStyle = "#000000";
    win.fillText(answer_choices[i], x_vals[i], y_vals[i] + 7);
    if (answer_choices[i] === answer) {
      var correct_index = i;
    }
  }
  win.font = "30px Arial";
  win.fillStyle = "#000000";
  win.fillText(question + "?", canvas.width / 2, 25);
  win.fillText("Score: " + points, canvas.width - 100, 25);
  win.fillText("Time Left: " + remaining_time, 100, 25);
  return [correct_index, x_vals, y_vals, increment];
}

if (adding) {
  document.getElementById("1+1").addEventListener("click", function () {
    localStorage.setItem("level", "1");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("1+2").addEventListener("click", function () {
    localStorage.setItem("level", "2");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("2+2").addEventListener("click", function () {
    localStorage.setItem("level", "3");
    window.location.href = "game_canvas.html";
  });
}
if (subtracting) {
  document.getElementById("1-1").addEventListener("click", function () {
    localStorage.setItem("level", "4");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("2-1").addEventListener("click", function () {
    localStorage.setItem("level", "5");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("2-2").addEventListener("click", function () {
    localStorage.setItem("level", "6");
    window.location.href = "game_canvas.html";
  });
}
if (multiplying) {
  document.getElementById("1x(1,0,10)").addEventListener("click", function () {
    localStorage.setItem("level", "7");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("12x12").addEventListener("click", function () {
    localStorage.setItem("level", "8");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("2x1").addEventListener("click", function () {
    localStorage.setItem("level", "9");
    window.location.href = "game_canvas.html";
  });
}
if (dividing) {
  document.getElementById("#/(1,#)").addEventListener("click", function () {
    localStorage.setItem("level", "10");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("12/12").addEventListener("click", function () {
    localStorage.setItem("level", "11");
    window.location.href = "game_canvas.html";
  });
  document.getElementById("3/1").addEventListener("click", function () {
    localStorage.setItem("level", "12");
    window.location.href = "game_canvas.html";
  });
}
if (in_game) {
  level_index = localStorage.getItem("level");
  console.log(level_index);
  setTimeout(function () {
    end_game();
  }, 30000);
  var tellSeconds = setInterval(function () {
    tell_time_left(tellSeconds, canvas);
  }, 1000);
  var canvas = document.getElementById("game_win");
  var answer_data = get_values(canvas, level_index);
  var correct_index = answer_data[0];
  var x_vals = answer_data[1];
  var y_vals = answer_data[2];
  var increment = answer_data[3];

  canvas.addEventListener("click", function (e) {
    var click_coords = getCursorPosition(canvas, e);
    var x_click = click_coords[0];
    var y_click = click_coords[1];
    var answer_found = false;
    for (i = 0; i < 5; i++) {
      if (
        Math.sqrt(
          Math.abs(x_vals[i] - x_click) ** 2 +
            Math.abs(y_vals[i] - y_click) ** 2
        ) < 50
      ) {
        var chosen_index = i;
        var answer_found = true;
      }
    }
    if (answer_found) {
      console.log(chosen_index);
      console.log(correct_index);
      console.log(points);
      if (chosen_index === correct_index) {
        points += increment;
      }
      problems_answered += 1;
      win = canvas.getContext("2d");
      win.clearRect(0, 0, canvas.width, canvas.height);
      answer_data = get_values(canvas, level_index);
      correct_index = answer_data[0];
      x_vals = answer_data[1];
      y_vals = answer_data[2];
      increment = answer_data[3];
    }
  });
}
