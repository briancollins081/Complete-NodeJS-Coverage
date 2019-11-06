requestHandler = (req, res) => {
    const url=req.url;
    const method=req.method;

    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<!DOCTYPE html><html><head><title>Assignment Task: Section 3</title></head>');
        res.write('<body>');
        res.write('<h1>Hello ABC User</h1>');
        res.write('<hr/><form action="/create-user" method="post"><input type="text" name="username"><button type="submit">Create User</button></form>');
        res.write('</body></html>');
        return res.end();
    }

    if(url === '/users'){
        res.write('<!DOCTYPE html><html><head><title>Assignment Task: Section 3</title></head>');
        res.write('<body>');
        res.write('<h1>Our User Lists are:</h1><hr/><ol><li>Abc User 1</li><li>Abc User 2</li><li>Abc User 3</li><li>Abc User 4</li><li>Abc User 5</li><li>Abc User 6</li></ol>');
        res.write('</body></html>');
        return res.end();
    }
    if(url === '/create-user' && method=='POST'){
        // data holder
        const data = [];
        //fetch data
        req.on('data', (chunk)=>{
            data.push(chunk);
        });
        //parse data
       req.on('end', (chunk)=>{
            // parse to join the data bus/chunks
            const parsedData = Buffer.concat(data).toString();
            // split data to obtain string part from the user and that from the form
            const dataFetched = parsedData.split('=');
            //lets log the data with its fields
            console.log("Field from form: "+dataFetched[0]+"<br/>Value of the field: "+dataFetched[1]);            
        });
    }
    res.write('<!DOCTYPE html><html><head><title>Assignment Task: Section 3</title></head>');
    res.write('<body>');
    res.write('<h1>Our User Lists are:</h1><hr/><ol><li>Abc User 1</li><li>Abc User 2</li><li>Abc User 3</li><li>Abc User 4</li><li>Abc User 5</li><li>Abc User 6</li></ol>');
    res.write('</body></html>');
    return res.end();
};

exports.handler = requestHandler;