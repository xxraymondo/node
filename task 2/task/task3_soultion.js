const { Console } = require('console');
const http= require("http");
const url = require('url');
const axios =require('axios')
const _fetch = (url) => fetch(url).then(res => res.json())

const groupWithCategories=(products)=>{
    const categories={}
    products.forEach(element => {
        if(categories[element.category.id]){
            categories[element.category.id].products.push(element)
        }else{
            categories[element.category.id]={
                category:{
                    id:element.category.id,
                    name:element.category.name
                },
                products:[element]
            }
        }
    });
    return Object.values(categories)
}


const categorizedProducts=async()=>{
    const [products, rates]= await Promise.all([
        _fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=50'),
        _fetch('https://api.exchangerate.host/latest?base=usd').then((res)=>{
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
              });
              console.log(res.rates)
              readline.question(`what is the currency that you want to covert to in capital letters like the previous list?`, currncy => {
                // console.log(res.rates[currncy]) 
                let myCurrncy=parseInt(res.rates[currncy])
               let newProducts= products.map(element=>({...element,price:element.price*myCurrncy
                    
                }))
                console.log(newProducts)
                readline.close();
              });
        }
        ).catch((err)=>console.log(err))
    ]) 
    const categorizedProducts= groupWithCategories(products)
    
}
// categorizedProducts()

todos=[]
const requestListener =(req,res)=>{
    const _fetch = (url) => fetch(url).then(res => res.json())
console.log('r')
    const method=req.method
    const route= req.url
    if(method==="GET"&&route==="/"){
    res.setHeader("content-Type","application-json")
    res.writeHead(200)
    res.write(JSON.stringify(todos))
    console.log('r')
    }
    if(method==="POST"&&route==="/"){
        body=[]
        req.on('data',(chunk)=>{
            body.push(chunk)
        }).on('end',()=>{
           console.log(JSON.parse(Buffer.concat(body).toString())) 
           todos.push(JSON.parse(Buffer.concat(body).toString()))
        })
         }
         res.end()
    }


    const server = http.createServer(async (req, res) => {
        const { pathname } = url.parse(req.url, true);
        if (pathname === '/products' && req.method === 'POST') {
            let body = [];
            req.on('data', (chunk) => {
              body.push(chunk);
            });
            req.on('end', async () => {
            const newProduct = JSON.parse(body);
            try {
              // Validate the new product here...   
              const response = await axios.post('https://api.escuelajs.co/api/v1/products/', newProduct);

              const createdProduct = response.data;
              console.log(createdProduct)
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(createdProduct));
            } catch (error) {
              console.error('An error occurred:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'An error occurred' }));
            }
          });
        }else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
      });
          server.listen(3030,"localhost",()=>{
        console.log("server is up and runinng")
    })