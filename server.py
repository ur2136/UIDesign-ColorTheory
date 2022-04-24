from flask import Flask, request, jsonify,render_template
import json
import random
app = Flask(__name__)

lesson_data = {
    "1":{
        "lesson_id": "1",
        "title": "Shadows",
        "text": "A common mistake beginners make is adding black to the local color to make its shadow. Adding black makes colors grey and muddy. Instead, a shadow should generally be made with the local color's complimentary color and a shade of blue. Click through some of the local colors below to see examples.",
        "colors": ["yellow","orange","red"],
        "images": ["https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/only-a-lemon-nancy-merkle.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_8x0BkegbhIAptLEOL8Wn4xUAfb8hGtk3A&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbhUir575EAqe_2WBtUIdZvPgmsHZ3cZnOxGrXnQBmln1HHsOHKdESnslGHWlyDCK_zl8&usqp=CAU"],
        "next_lesson": "2",
        "sublessons": {
            "1":{
                "completed": "False",
                "sublesson_id": "1",
                "colors": ["#FFED00","#DBD83D","#AA9B39","#AA9B39"],
                "initial_colors": ["#FFED00","#FFED00","#DBD83D","#AA9B39"],
                "numbers": ["1","2","3","4"],
                "add_colors": ["blue","violet"],
                "clicked":["False", "False"],
                "display_text": ["Local Color: Yellow", "All shadows have a blue element", "Add violet, the complement of yellow", "Target Shadow"]
                },
            "2":{
                "completed": "False",
                "sublesson_id": "2",
                "colors": ["#FFA600","#D5961D","#D5961D","#D5961D"],
                "initial_colors": ["#FFA600","#FFA600","#D5961D","#D5961D"],
                "numbers": ["1","2","3","4"],
                "add_colors": ["blue","blue"],
                "clicked":["False", "False"],
                "display_text": ["Local Color: Orange", "All shadows have a blue element", "Add blue, the complement of orange", "Target Shadow"]
                },
            "3":{
                "completed": "False",
                "sublesson_id": "3",
                 "colors": ["#FF0000","#BF122B","#993222","#993222"],
                 "initial_colors": ["#FF0000","#FF0000","#BF122B","#993222"],
                 "numbers": ["1","2","3","4"],
                 "add_colors": ["blue","green"],
                 "clicked":["False", "False"],
                 "display_text": ["Local Color: Red", "All shadows have a blue element", "Add green, the complement of red", "Target Shadow"]
                }
        }
    },
    "2":{
        "lesson_id": "2",
        "title": "Skin Colors",
        "display_image": "https://news.artnet.com/app/news-upload/2018/03/humanae-opener-grid.adapt_.1190.1-1024x970.jpg",
        "text": "A common mistake beginners make is using brown and white to make every skin tone. This strategy leaves skin tones looking flat. Click through the steps on the right to learn how to match natural skin tones.",
        "options": ["1: Make The Base Color", "2: Adjust The Depth", "3: Adjust The Undertone"],
        "next_lesson": "end",
        "previous_lesson": "1",
        "sublessons": {
            "1":{
                "completed": "False",
                "sublesson_id": "1",
                "colors": ["#FF0000"],
                "add_colors_1": ["blue","yellow"],
                "numbers_1": ["1","2"],
                "clicked_1":["False", "False"],
                "add_colors_2": [],
                "numbers_2": ["1","2"],
                "clicked_2":[],
                "result_colors_1": ["#80456", "#AA6739"],
                "result_colors_2": [],
                "display_text": ["Start out by mixing equal amounts of red, blue, and yellow (the primary colors)"]
            },
            "2":{
                "completed": "False",
                "sublesson_id": "2",
                "colors": ["#AA6739","#AA6739"],
                "add_colors_1": ["white","yellow"],
                "numbers_1": ["1","2"],
                "clicked_1":["False", "False"],
                "add_colors_2": ["red","black"],
                "numbers_2": ["1","2"],
                "clicked_2":["False", "False"],
                "result_colors_1": ["#D5B39C", "#EDB78C"],
                "result_colors_2": ["#BF4D2B","#3B180D"],
                "display_text": ["To make a skin tone more fair, add yellow and white", "To make a skin tone deeper, add red and black"]
            },
            "3":{
                "completed": "False",
                "sublesson_id": "3",
                "colors": ["#AA6739","#AA6739"],
                "add_colors_1": ["yellow","red","blue"],
                "numbers_1": ["1","2","3"],
                "clicked_1":["False", "False"],
                "add_colors_2": ["red","white"],
                "numbers_2": ["1","2","3"],
                "clicked_2":["False", "False"],
                "result_colors_1": ["#DBB961", "#FFBD88","#F7BA89"],
                "result_colors_2": ["#CC7155","#DB9986"],
                "display_text": ["To make the skin tone warmer, add yellow and a bit of red for an orange undertone.", "To make the tone “cooler,” add red and a bit of white for a pink undertone"]
            }
        }
    }
}
# ideally we want to randomize the question order
quiz_data = {}

@app.route('/')
def home():
   return render_template('home.html')   


@app.route('/learn/<lesson_id>')
def learn(lesson_id):
    lesson = lesson_data[lesson_id]
    return render_template('learn.html',lesson_id=lesson_id,lesson=lesson)

@app.route('/learn/<lesson_id>/<sublesson_id>')
def learn_sublesson(lesson_id, sublesson_id):
    lesson = lesson_data[lesson_id]
    sublesson = lesson['sublessons'][sublesson_id]
    images=[]
    if "images" in lesson:
        images=lesson["images"] 
    
    options=[]
    if "options" in lesson:
        options=lesson["options"] 
    
    completed=[]
    for sub in lesson["sublessons"]: 
        completed.append(lesson["sublessons"][sub]["completed"])


    return render_template('learn_sublesson.html',lesson_id=lesson_id,sublesson=sublesson,images=images, completed=completed, options=options)

# AJAX FUNCTIONS
@app.route('/learn/<lesson_id>/mark_color_complete', methods=["POST"])
def mark_color_complete(lesson_id):
    sublesson_id=request.form["sublesson_id"]
    color_index=request.form["color_index"]

    if lesson_id == "1":
        lesson_data[lesson_id]["sublessons"][sublesson_id]["clicked"][int(color_index)]=True

        if False not in lesson_data[lesson_id]["sublessons"][sublesson_id]["clicked"]:
            lesson_data[lesson_id]["sublessons"][sublesson_id]["completed"] = True
    else:
        add_colors_index=request.form["add_colors_index"]
        if add_colors_index == "1":
            lesson_data[lesson_id]["sublessons"][sublesson_id]["clicked_1"][int(color_index)]=True
        else:
            lesson_data[lesson_id]["sublessons"][sublesson_id]["clicked_2"][int(color_index)]=True


        if False not in lesson_data[lesson_id]["sublessons"][sublesson_id]["clicked_1"] and False not in lesson_data[lesson_id]["sublessons"][sublesson_id]["clicked_2"]:
            lesson_data[lesson_id]["sublessons"][sublesson_id]["completed"] = True

    return redirect(url_for('learn_sublesson',lesson_id=lesson_id,sublesson_id=sublesson_id))

@app.route('/learn/<lesson_id>/get_completed', methods=["GET"])
def get_completed(lesson_id):

    sublesson = request.args.get("sublesson")
    
    if lesson_id == "1":
        clicked = lesson_data[lesson_id]["sublessons"][sublesson]["clicked"]
        completed = []
        for sub in lesson_data[lesson_id]["sublessons"]: 
            completed.append(lesson_data[lesson_id]["sublessons"][sub]["completed"])
        data = {"clicked": clicked, "completed": completed}
    else:
        clicked_1 = lesson_data[lesson_id]["sublessons"][sublesson]["clicked_1"]
        completed = []

        clicked_2 = lesson_data[lesson_id]["sublessons"][sublesson]["clicked_2"]
        for sub in lesson_data[lesson_id]["sublessons"]: 
            completed.append(lesson_data[lesson_id]["sublessons"][sub]["completed"])

        data = {"clicked_1": clicked_1, "clicked_2": clicked_2, "completed": completed}
    return jsonify(data)

@app.route('/quiz')
def quiz_home():
    populate_questions()
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

# HELPER FUNCTIONS
def populate_questions():
    chars = '0123456789ABCDEF'
    colors = ['#'+''.join(random.sample(chars,6)) for i in range(5)]
    global quiz_data
    for i in range(len(colors)):
        quiz_data[i+1] = {
            "id": i+1,
            "question": "Using what you learned about color mixing, match the color below",
            "targetColor": colors[i],
            "userResult": None,
        }
if __name__ == '__main__':
   app.run(debug = True)