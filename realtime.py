import requests 
from bs4 import BeautifulSoup 
import time
import datetime
from pymongo import MongoClient
import json
from bson import BSON
from bson import json_util

class real_time:
    def __init__(self):
        self.URL = "https://en.tutiempo.net/toronto.html"
        client = MongoClient("mongodb+srv://dprog123:dprog@weather-cluster.t8pf8.mongodb.net")
        weather_db = client['weather-db']
        self.realtime_collection = weather_db['weather-realtime']

    def real_time_capture(self, capture_flag=False):
        while capture_flag:
            current_data = self.get_current_data()
            print(current_data)
            self.realtime_collection.insert_one(current_data)
            time.sleep(30)

    def get_current_data(self):
        req = requests.get(self.URL)
        soup = BeautifulSoup(req.content, 'lxml')
        table_data = soup.findAll('table', {'id': 'TablaCC'})[0]
        ct_div = table_data.find_all('div', {'class':'temp t'})[0]
        current_temp =ct_div.contents[0][:-1]
        vel_div = table_data.find_all('div', {'class':'vel'})[0]
        wind_speed = vel_div.contents[0]
        current_date = datetime.datetime.now()
        out = {
            'current_time': current_date.strftime('%x %X'),
            'city': 'Toronto',
            'current_temperature': current_temp,
            'current_windspeed': wind_speed
            }
        return out
    
    def print_data(self):
        documents = self.realtime_collection.find({})
        for document in documents:
            final = json.dumps(document, indent=4, default=json_util.default)
            print(final)


rl = real_time()
rl.real_time_capture(True)
rl.print_data()