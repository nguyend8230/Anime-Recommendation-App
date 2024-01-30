from flask_restful import Resource

class test(Resource):
    def __init__(self, data):
        self.upcoming_animes = data
        pass

    def get(self):
        print(self.upcoming_animes)
        return {"data": self.upcoming_animes}