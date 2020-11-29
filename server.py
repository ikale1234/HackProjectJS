import os
from flask import Flask, send_from_directory
app = Flask(__name__)


lst = {}


@app.route('/')
def home_page():
    app.logger.info(os.getcwd())
    return send_from_directory("HackTable", "home_page.html")


@app.route('/choose_level.html')
def choose_level():
    return send_from_directory("HackTable", "choose_level.html")


@app.route('/addition_diff.html')
def addition_page():
    return send_from_directory("HackTable", "addition_diff.html")


@app.route('/division_diff.html')
def division_page():
    return send_from_directory("HackTable", "division_diff.html")


@app.route('/multiplication_diff.html')
def multiplication_page():
    return send_from_directory("HackTable", "multiplication_diff.html")


@app.route('/subtraction_diff.html')
def subtraction_page():
    return send_from_directory("HackTable", "subtraction_diff.html")


@app.route('/game_canvas.html')
def game_canvas_page():
    return send_from_directory("HackTable", "game_canvas.html")


@app.route('/game.js')
def game_page():
    return send_from_directory("HackTable", "game.js")


@app.route('/login/<user>')
def log(user):
    if user in lst:
        return str(lst[user][0]) + "\n" + str(lst[user][1])
    else:
        lst[user] = [0, 0, [0, 0, 0, 0, 0], 0]
        return str(lst[user][0]) + "\n" + str(lst[user][1])


@app.route('/score/<user>/<score>')
def getScore(user, score):
    print(lst)
    if int(score) > int(lst[user][0]):
        lst[user][0] = score
    lst[user][3] += 1
    lst[user][2].append(int(score))
    lst[user][2].pop(0)
    averageSkill = 0
    for i in lst[user][2]:
        averageSkill += i
    if lst[user][3] > 5:
        averageSkill = averageSkill/5
    else:
        averageSkill = averageSkill/lst[user][3]
        lst[user][1] = averageSkill
    return str(lst[user][0]) + "\n" + str(averageSkill)


if __name__ == '__main__':
    app.run(debug=True)
