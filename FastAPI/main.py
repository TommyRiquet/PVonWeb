from typing import Union
from json import load
from fastapi import FastAPI

app = FastAPI()

@app.get("/organizations/")
def read_item():
	data = load(open('data.json'))
	return data

@app.get("/organizations/{org_id}")
def read_item(org_id: int):
	data = load(open('data.json'))
	# get the organization with the id passed in the url
	for org in data:
		if org["id"] == org_id:
			return org
	return {"error": "Organization not found"}
