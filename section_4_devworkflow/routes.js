const fs = require('fs');

requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter a Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end(); //end at this point due to end()
    }
    if (url === '/message' && method === 'POST') {
        //get request data before writing to the file
        const body = [];
        //fetch data chunks
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //work on the data fetched from the post method
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            console.log(parseBody);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }); // blocks until write is done

        });

    }
    if (url === 'message')
        res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First Page: Node</title></head>');
    res.write('<body><h1>Hello there this is ABC </h1></body>');
    res.write('</html>');
    res.end();
};

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';