from pymongo import MongoClient

class MongoAPI:
    def __init__(self, db_name , doc_name):
        self.client = MongoClient("mongodb+srv://dprog123:dprog@weather-cluster.t8pf8.mongodb.net")
        self.db = self.client[db_name]
        self.collection = self.db[doc_name]
    
    def fetch_all(self):
        documents = self.collection.find({})
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output


