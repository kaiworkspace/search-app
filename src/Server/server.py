from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/search')
def search():
    return jsonify(
        message = "Search Successful",
        data = "Some data...",
        status = 200
    )



if __name__ == "__main__":
    app.run(debug=True, port=5000)
