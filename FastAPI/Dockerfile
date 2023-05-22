FROM python:3
ADD requirements.txt /
RUN pip install -r requirements.txt
ADD main.py /
ADD data.json /
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000" ]
