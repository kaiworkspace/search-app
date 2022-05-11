from audioop import reverse
import math
from flask import Flask, jsonify, request
from itsdangerous import json
import numpy

from nameList import nameListArr
from alphabetDict import alphabetDict

app = Flask(__name__)

@app.route('/search')
def search():
    query = request.headers.get('data')
    query = query.lower()
    queryDict = {}
    for alphabets in query:
        if(alphabets in queryDict):
            queryDict[alphabets] += 1
        else:
            queryDict[alphabets] = 1    
    
    # find each no. of alphabets in each name
    result = {}
    for index, names in enumerate(nameListArr):
        namesDict = {}
        for alphabets in names:
            if(alphabets in namesDict):
                namesDict[alphabets] += 1
            else:
                namesDict[alphabets] = 1
        
        # need to check length here
        target={}
        for a in namesDict:
            if(a in queryDict):
                target[a] = queryDict[a]
            else:
                target[a] = 0
        
        for a in queryDict:
            if(a not in namesDict):
                namesDict[a] = 0
                target[a] = queryDict[a]

        
        d1Arr=[]
        for items in target.values():
            d1Arr.append(items)
        
        d2Arr=[]
        for items in namesDict.values():
            d2Arr.append(items)
        
        dotResult = numpy.dot(d1Arr, d2Arr)        
        d1Vector = getVector(d1Arr)
        d2Vector = getVector(d2Arr)
        degree = dotResult/ (d1Vector * d2Vector)
        result[nameListArr[index]] = degree
        # print(result)
    
    target = []
    for _ in range(10):
        top = max(result, key=result.get)
        deg = result[top]
        if(deg>0.75):
            target.append(top)
        result.pop(top)
    
    if(len(target) > 0):
        return jsonify(
            message = "Search Successful",
            data = target,
            status = 200
        )
    else:
        return jsonify(
             message = "Search Successful",
            data = ["No Results"],
            status = 200
        )
        

def getVector(d):
    sum = 0
    for point in d:
        sum += (point * point)
    return math.sqrt(sum)



if __name__ == "__main__":
    app.run(debug=True, port=5000)
