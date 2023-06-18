const { error } = require('console')
const CC = require('currency-converter-lt')
const task2 = async function(){
    arr=[]
    products=[]
    categories=[]  
    finalArr=[]
    shortFinalArr=[]
     const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    let entries =Object.entries(data) 
    entries.map( ([key, val] = entry) => {
        products.push(val)
        categories.push({id: val.category.id, name: val.category.name})
      });
    categories.map((item)=>{
        finalArr.push(item)
        products.map((productItem)=>{
            if(productItem.category.id==item.id){
                finalArr.push(productItem)
            }
        })
    })

for(let i=finalArr.length-100;i<finalArr.length;i++){
shortFinalArr.push(finalArr[i])
}

            // // coverting currency to EGP // task 2 from node 
            // shortFinalArr.map((item)=>{
            //         let currencyConverter = new CC({from:"USD", to:"EGP", amount:item.price, isDecimalComma:true})  
            //         currencyConverter.convert().then((response) => {
            //             console.log(`item name : ${item.title} and it's price is before converting is ${item.price} and after converting is ${response}`)
            //         }).catch((error)=>{
            //             console.log(error)
            //         })
            //     })  
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      
      readline.question(`what is the currency that you want to covert to?`, currncy => {
        shortFinalArr.map((item)=>{
            let currencyConverter = new CC({from:"USD", to:currncy, amount:item.price, isDecimalComma:true})  
            currencyConverter.convert().then((response) => {
               
            }).catch((error)=>{
               
                console.log(error)
            })
        })
        readline.close();
      });

    // task 3
}













