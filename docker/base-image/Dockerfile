FROM python:3.8

ADD requirements.txt /

RUN mkdir -p /examples
ADD examples/* /examples/

ENV DSTACK_PORT=""

RUN uname -r \
  && cat /etc/os-release \
  && ls -ltr /examples \
  && python3 --version \
  && pip3 --version \
  && apt-get update \
  && apt-get install -y tzdata \
  && dpkg-reconfigure --frontend noninteractive tzdata \
  && apt-get install -y libssl-dev \
  && apt-get install -y libcurl4-openssl-dev \
  && apt-get install -y libxml2-dev \
  && pip3 install pyyaml \
  && pip3 install tqdm \
  && pip3 install requests \
  && pip3 install deprecation \
  && pip3 install -r /requirements.txt \
  && pip3 install --index-url https://test.pypi.org/simple/ --upgrade --no-cache-dir --extra-index-url=https://pypi.org/simple/ dstack==0.6dev18  \
  && dstack server update \
  && nohup bash -c "dstack server start &" \
  && sleep 30 \
  && ps -ef | grep dstack \
  && python3 --version \
  && pip3 --version \
  && cat /root/.dstack/config.yaml \
  && python3 /examples/app1.py \ 
  && python3 /examples/app2.py

ENTRYPOINT dstack server start --port ${DSTACK_PORT:-80}