require('../DB');
const productSever = require("../server/product");


/*
* 测试添加
* */

async function testAdd() {
    let product = [

        {
            name:"沙发",
            price:"2000",
            category:"5b471c8e7a26cd7bc0a45358"
        }

      /*  {
            name: "苹果7",
            price: "5500",
            stock: 200,
            category: "5b471c8e7a26cd7bc0a45356"
        },
        {
            name: "苹果x",
            price: "8500",
             stock:300,
            category: "5b471c8e7a26cd7bc0a45356"
        },
        {
            name: "联想s300",
            price: "4550",
            stock:3000,
            category: "5b471ae3d8114c3ae4d7a029"
        },
        {
            name: "苹果pro",
            price: "9503",
            stock:3200,
            category: "5b471ae3d8114c3ae4d7a029"
        },
        {
            name: "<<罗威森林>>",
            price: "45.02",
            stock:3230,
            category: "5b471c8e7a26cd7bc0a45357"
        },
        {
            name: "<<老人与海>>",
            price: "48.55",
            stock:5600,
            category: "5b471c8e7a26cd7bc0a45357"
        },*/
    ]
    const res = await productSever.addProduct(product);
    console.log(res);


}

/*
* 测试更新
* */
async function testUpdate() {
    let id='5b473c703ded6f49e874e3ff';
    let update={
        stock:"2145"
    }
    const res = await productSever.updateProduct(id,update);
    console.log(res);
}

/*
* 删除
* */
async function tesrDelete() {
    let id = "5b474128fafc9553809745a9";
    const res =await productSever.deleteProduct(id);
    console.log(res);

}
/*
* 测试查找
* */
async function testFind() {
    let page = 3;

  const products = await  productSever.findProductByPage(page);
  console.log(products);
}
testFind()