Install uvicorn
```python
pip install "uvicorn[standard]"
```
Change the FAKE_API_URL in the .env
```
FAKE_API_URL='http://127.0.0.1:8000'
```

Run the server program
```python
uvicorn main:app --host 0.0.0.0 --port 80
```


