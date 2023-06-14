const { error } = require('console')
const CC = require('currency-converter-lt')
const test = async function(){
    arr=[]
    products=[]
    categories=[]  
    finalArr=[]
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
shortFinalArr=[]

for(let i=finalArr.length-100;i<finalArr.length;i++){
shortFinalArr.push(finalArr[i])
}

// // coverting currency to EGP
shortFinalArr.map((item)=>{
        let currencyConverter = new CC({from:"USD", to:"EGP", amount:item.price, isDecimalComma:true})  
        currencyConverter.convert().then((response) => {
            console.log(`item name : ${item.title} and it's price is before converting is ${item.price} and after converting is ${response}`)
        }).catch((error)=>{
            console.log(error)
        })
    })  
}
test()






















// const test = async function(){

//     const response = await fetch('https://api.escuelajs.co/api/v1/products');
//    const data = await response.json();
//    let entries =Object.entries(data)
//    // console.log(Object.values(dataObject))
//    arr=[]
//    products=[]
//    categories=[]  
//    finalArr=[]
//    entries.map( ([key, val] = entry) => {
//        products.push(val)
//        arr.push(val.category)
//      });
    
//      for(let i =0;i<arr.length;i++){
//        categories.push({id: arr[i].id, name: arr[i].name})
//      }
      
//    categories.map((item)=>{
//        finalArr.push(item)
//        products.map((productItem)=>{
//            if(productItem.category.id==item.id){
//                finalArr.push(productItem)
//            }
//        })
//    })

//       //// testing
//    //   console.log(finalArr[622])
//    //   console.log(finalArr[623])



// }
// test()