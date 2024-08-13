FROM 730335485377.dkr.ecr.us-east-1.amazonaws.com/app:latest

RUN mkdir -p /usr/app/

WORKDIR /usr/app

ADD . .

RUN yarn install --frozen-lockfile

RUN yarn build

CMD yarn start
