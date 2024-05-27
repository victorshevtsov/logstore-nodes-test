const https = require("http");

const nodes = {
  "au-1": "http://broker-au-1.logstore.usher.so",
  "ca-1": "http://broker-ca-1.logstore.usher.so",
  "eu-1": "http://broker-eu-1.logstore.usher.so",
};

for (const node in nodes) {
  const url = nodes[node];
  console.log(`[${node}] request ${url}`);

  const request = https.get(url, { }, (response) => {
    console.log(`[${node}] response: ${response.statusCode} ${response.statusMessage}`);

    response.on("data", data => {
      console.log(`[${node}] data.length: ${data.length}`);
    });
    response.on("error", err => {
      console.log(`[${node}] response error: ${JSON.stringify(err)}`);
    });
  });

  request.on('error', (err) => {
    console.log(`[${node}] request error: ${JSON.stringify(err)}`);
  })
}
