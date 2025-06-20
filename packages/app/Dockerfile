FROM 730335485377.dkr.ecr.us-east-1.amazonaws.com/app:latest

RUN mkdir -p /usr/app/

WORKDIR /usr/app

ADD . .

RUN npm install -g bun && bun i

RUN bun run build

CMD bun run start
