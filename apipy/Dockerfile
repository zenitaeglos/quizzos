FROM python:latest

# workdir directory
WORKDIR /app/src

# copy requirements
COPY requirements.txt .

# expose a port to the outside
EXPOSE 8000

RUN apt-get update -y && apt-get upgrade -y \
    && pip install --upgrade pip setuptools wheel \
    && pip install -r /app/src/requirements.txt

# copy project
COPY . .
