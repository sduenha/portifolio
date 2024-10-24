from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from datetime import date
import json

# Configure application
app = Flask(__name__)

# Adding function to Jinja
app.jinja_env.globals.update(json=json.loads)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///project.db")

@app.route("/")
def index():
    today = date.today()
    day_name = today.strftime("%a")
    curses = db.execute("SELECT * FROM curses WHERE days LIKE ? ORDER BY time", "%" + day_name + "%")
    instructors = db.execute("SELECT id, name FROM instructors ORDER BY id")
    return render_template("index.html", curses=curses, today=today, instructors=instructors)

@app.route("/curses", methods=["GET", "POST"])
def curses():

    if request.method == "POST":
        curse_name = request.form.get("curse-name")
        instructor_name = request.form.get("instructor-name")
        max_students = request.form.get("max-students")
        days = request.form.getlist("day")
        time = request.form.get("time")
        instructor_id = db.execute("SELECT id FROM instructors WHERE name = ?", instructor_name)[0]["id"]

        if not curse_name or not instructor_name or not max_students or not days or not time:
            return render_template("curses.html", curses=curses)

        days = json.dumps(days)

        db.execute("INSERT INTO curses (curse_name, instructor_id, max_students, num_students, students, days, time) VALUES (?, ?, ?, ?, ?, ?, ?)", curse_name, instructor_id, max_students, 0, "", days, time)

    curses_db = db.execute("SELECT * FROM curses ORDER BY time")

    curses_name = set()
    for curse in curses_db:
        curses_name.add(curse["curse_name"])

    instructor_id = set()
    for instructor in curses_db:
        instructor_id.add(curse["instructor_id"])

    instructors_db = db.execute("SELECT * FROM instructors")
    instructors_name = set()
    for instructor in instructors_db:
        instructors_name.add(instructor["name"])

    return render_template("curses.html", curses=curses_db, curses_name=curses_name, instructors_name=instructors_name, instructors=instructors_db)

@app.route("/curse-update", methods=["GET", "POST"])
def curse_update():
    curse_id = request.form.get("info-curse-id")
    curse_name = request.form.get("info-curse-name")
    instructor_name = request.form.get("info-instructor-name")
    max_students = request.form.get("info-max-students")
    days = json.dumps(request.form.getlist("info-day"))
    time = request.form.get("info-time")
    instructor_id = db.execute("SELECT id FROM instructors WHERE name = ?", instructor_name)[0]["id"]

    db.execute("UPDATE curses SET curse_name = ?, instructor_id = ?, max_students = ?, days = ?, time = ? WHERE id = ?", curse_name, instructor_id, max_students, days, time, curse_id)

    return redirect("/curses")

@app.route("/search_students", methods=["GET"])
def search_students():
    q = request.args.get("q")
    q = q.split("-")
    students_curse = q[1]
    if q:
        students_search = db.execute("SELECT * FROM students WHERE name LIKE ? LIMIT 50", "%" + q[0] + "%")
    else:
        students_search = []
    return render_template("search_students.html", students_search=students_search, students_curse=students_curse)

@app.route("/return_students", methods=["GET"])
def return_students():
    q = request.args.get("q")
    if q:
        return_students = db.execute("SELECT students FROM curses WHERE id = ?", q)
        return_students = return_students[0]["students"].split(", ")
    else:
        return_students = []
    return return_students

@app.route("/remove_students", methods=["GET"])
def remove_students():
    q = request.args.get("q")
    if q:
        q = q.split("-")
        students_in_curse = db.execute("SELECT students FROM curses WHERE id = ?", q[1])
        students_in_curse = students_in_curse[0]["students"].split(", ")
        if q[0] in students_in_curse:
            students_in_curse.remove(q[0])
        students_input = ", ".join(students_in_curse)
        num_students = db.execute("SELECT num_students FROM curses WHERE id = ?", q[1])[0]["num_students"];
        db.execute("UPDATE curses SET students = ?, num_students = ? WHERE id = ?", students_input, num_students - 1, q[1])
    return "Sim"

@app.route("/add_students", methods=["GET"])
def add_students():
    q = request.args.get("q")
    if q:
        q = q.split("-")
        students_in_curse = db.execute("SELECT students FROM curses WHERE id = ?", q[1])
        num_students = db.execute("SELECT num_students FROM curses WHERE id = ?", q[1])[0]["num_students"]
        max_students = db.execute("SELECT max_students FROM curses WHERE id = ?", q[1])[0]["max_students"]
        if (num_students < max_students):
            if (students_in_curse[0]["students"] == ""):
                students_in_curse = [q[0]]
            else:
                students_in_curse = students_in_curse[0]["students"].split(", ")
                students_in_curse.append(q[0])
            students_input = ", ".join(students_in_curse)
            num_students = db.execute("SELECT num_students FROM curses WHERE id = ?", q[1])[0]["num_students"];
            db.execute("UPDATE curses SET students = ?, num_students = ? WHERE id = ?", students_input, num_students + 1,  q[1])
        else:
            return {"code": "Invalid"}
    return {"code": "Valid"}

@app.route("/update_students_in_curse", methods=["GET"])
def update_students_in_curse():
    q = request.args.get("q")
    if q:
        students_in_curse = db.execute("SELECT students FROM curses WHERE id = ?", q)
        students_in_curse = students_in_curse[0]["students"].split(", ")
    else:
        students_in_curse = []
    return render_template("update_students.html", students_in_curse=students_in_curse)

@app.route("/get_num_students_curse", methods=["GET"])
def get_num_students():
    q = request.args.get("q")
    if q:
        num_students = db.execute("SELECT num_students FROM curses WHERE id = ?", q)[0]["num_students"]
    else:
        num_students = 0;
    return jsonify({'valor': num_students})

@app.route("/get_students_in_curse", methods=["GET"])
def get_students_in_curse():
    q = request.args.get("q")
    if q:
        students = db.execute("SELECT students FROM curses WHERE id = ?", q)[0]["students"]
    else:
        students = "";
    return jsonify({'students': students})

@app.route("/instructors", methods=["GET", "POST"])
def instructors():

    if request.method == "POST":
        name = request.form.get("name")
        cpf = request.form.get("cpf")
        phone = request.form.get("phone")
        mail = request.form.get("mail")
        address = request.form.get("address")
        pix = request.form.get("pix")

        if not name or not cpf or not phone or not mail or not address or not pix:
            return render_template("instructor.html", instructors=instructors_db)

        db.execute("INSERT INTO instructors (name, cpf, phone, mail, address, pix) VALUES (?, ?, ?, ?, ?, ?)", name, cpf, phone, mail, address, pix)


    instructors_db = db.execute("SELECT * FROM instructors ORDER BY id")
    return render_template("instructors.html", instructors=instructors_db)

@app.route("/instructors-update", methods=["GET", "POST"])
def instructors_update():
    instructor_id = request.form.get("id")
    name = request.form.get("name")
    cpf = request.form.get("cpf")
    phone = request.form.get("phone")
    mail = request.form.get("mail")
    address = request.form.get("address")
    pix = request.form.get("pix")

    db.execute("UPDATE instructors SET name = ?, cpf = ?, phone = ?, mail = ?, address = ?, pix = ? WHERE id = ?", name, cpf, phone, mail, address, pix, instructor_id)

    return redirect("/instructors")

@app.route("/students", methods=["GET", "POST"])
def students():

    if request.method == "POST":
        name = request.form.get("name")
        cpf = request.form.get("cpf")
        phone = request.form.get("phone")
        mail = request.form.get("mail")
        address = request.form.get("address")
        parent = request.form.get("parent")

        if not name or not cpf or not phone or not mail or not address:
            return render_template("students.html", students=students_db)

        db.execute("INSERT INTO students (name, cpf, phone, mail, address, parent) VALUES (?, ?, ?, ?, ?, ?)", name, cpf, phone, mail, address, parent)


    students_db = db.execute("SELECT * FROM students ORDER BY id")
    return render_template("students.html", students=students_db)

@app.route("/students-update", methods=["GET", "POST"])
def students_update():
    student_id = request.form.get("id")
    name = request.form.get("name")
    cpf = request.form.get("cpf")
    phone = request.form.get("phone")
    mail = request.form.get("mail")
    address = request.form.get("address")
    parent = request.form.get("parent")

    db.execute("UPDATE students SET name = ?, cpf = ?, phone = ?, mail = ?, address = ?, parent = ? WHERE id = ?", name, cpf, phone, mail, address, parent, student_id)

    return redirect("/students")

@app.route("/delete_info", methods=["POST"])
def delete_info():
    name = request.form.get("page-return")
    page = "/" + name
    delete_id = request.form.get("delete-id")
    db.execute("DELETE FROM ? WHERE id = ?", name, delete_id)
    return redirect(page)
