from flask import Flask, render_template, request, json, Response, jsonify
from flask_app.app_lib.mongo_api import MongoAPI
from flask_app.app_lib.process import process_data



# Creating and configuring the application
app = Flask(__name__)




mongo = MongoAPI(db_name='weather-db', doc_name='weather-collection')
lst = mongo.fetch_all()
process = process_data(lst)
temp_mean = process.get_average_temp_data()
event_data = process.get_weather_event_data()

days = list(map(str,range(1,32)))
months = list(map(str,range(1,13)))
years = list(map(str,range(2009,2020)))


@app.route("/")
def index():
	return render_template('index.html', temp_mean= temp_mean, 
    event_data= event_data, days= days, months=months, years=years)

# @app.route('/get_data')
# def get_data():
#     return Response(response=json.dumps(mongo.fetch_all()), status=200, mimetype='application/json')

@app.route('/get_data')
def get_data():
    return render_template('./components/mongo_table.html', data=lst)







