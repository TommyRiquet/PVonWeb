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
	org = data[org_id]
	if org:
		return org
	return {"error": "Organization not found"}
