FROM ghcr.io/merklebot/hackathon-arm-image:master as build
ARG OPENAI_API_KEY
ARG XI_KEY

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV OPENAI_API_KEY $OPENAI_API_KEY
ENV XI_KEY $XI_KEY
ENV NEUROSITY_DEVICE_ID $NEUROSITY_DEVICE_ID
ENV NEUROSITY_EMAIL $NEUROSITY_EMAIL
ENV NEUROSITY_PASSWORD $NEUROSITY_PASSWORD

ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETOS
ARG TARGETARCH

ARG Version
ARG GitCommit
RUN echo "I am running on $BUILDPLATFORM, building for $TARGETPLATFORM" 

COPY requirements.txt requirements.txt
RUN python3.8 -m pip install -r requirements.txt
COPY . .

CMD ["python3.8", "main.py"]
