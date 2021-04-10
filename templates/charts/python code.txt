import requests
import geocoder
from flask import Flask, render_template


API_KEY = "95c24917f8cc445dad4ea6113a933807"

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/data")
def get_data():
    x, y = geocoder.ip("me").latlng

    exclude = "current,alerts,minutely"
    api_url = f"https://api.openweathermap.org/data/2.5/onecall?lat={x}&lon={y}&exclude={exclude}&appid={API_KEY}&units=metric"

    resp = requests.get(api_url)
    return resp.json()


if __name__ == "__main__":
    app.run(host="0.0.0.0")
