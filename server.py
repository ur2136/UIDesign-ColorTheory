from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

lesson_data = {}
quiz_data = {
    1: {
        "id": "1",
        "question": "Match the target skin tone below",
        "targetColor": "#d6b394",
        "answer": [3, 2, 1, 4, 0, 0, 2, 2], # number of drops in each color
        "userResult": None,
    }
}

@app.route('/')
def home():
   return render_template('home.html')   


@app.route('/shadows')
def shadow_lesson(name=None):
    return render_template('shadows.html', name=name) 


@app.route('/skin')
def skin_color_lesson():
    return render_template('skin.html')  

@app.route('/quiz')
def quiz_home():
    return render_template('quiz_home.html')  

@app.route('/quiz/<id>')
def view_result(id=None):
    global quiz_data
    question =  quiz_data.get(int(id))
    return render_template('quiz_question.html', data=question)


# AJAX FUNCTIONS

if __name__ == '__main__':
   app.run(debug = True)




