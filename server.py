from flask import Flask
from flask import render_template
import json
from flask import Response, request, jsonify
app = Flask(__name__)

lesson_data = {}
# ideally we want to randomize the question order
quiz_data = {
    1: {
        "id": 1,
        "question": "Match the target skin tone below",
        "targetColor": "#d6b394",
        "userResult": None,
    },
    2: {
        "id": 2,
        "question": "Match the target skin tone below",
        "targetColor": "#d6b394",
        "userResult": None,
    },
    3: {
        "id": 3,
        "question": "Match the target skin tone below",
        "targetColor": "#d6b394",
        "userResult": None,
    },
    4: {
        "id": 4,
        "question": "Match the target skin tone below",
        "targetColor": "#d6b394",
        "userResult": None,
    },
    5: {
        "id": 5,
        "question": "Match the target skin tone below",
        "targetColor": "#d6b394",
        "userResult": None,
    }
}

@app.route('/')
def home():
   return render_template('home.html')   


@app.route('/shadows')
def shadow_lesson():
    return render_template('shadows.html') 


@app.route('/skin')
def skin_color_lesson():
    return render_template('skin.html')  

@app.route('/quiz')
def quiz_home():
    return render_template('quiz_home.html')  

@app.route('/quiz/<id>')
def quiz_question(id=None):
    global quiz_data
    question =  quiz_data.get(int(id))
    return render_template('quiz_question.html', data=question)

@app.route('/quizEnd')
def quiz_end():
    # get all scores and average
    sum = 0
    for obj in quiz_data:
        sum += int(quiz_data[obj]["userResult"])
    avg = sum / 5
    return render_template('quiz_end.html', finalScore = avg)  

# AJAX FUNCTIONS

@app.route('/addScore', methods=['POST'])
def add_score():
    id = request.form['id']
    score = request.form['result']
    question = quiz_data.get(int(id))
    question["userResult"] = score
    quiz_data[int(id)] = question
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

if __name__ == '__main__':
   app.run(debug = True)




