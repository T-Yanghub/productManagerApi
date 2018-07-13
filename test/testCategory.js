require('../DB');
const categorySerrver = require('../server/category');


/*
* 添加方法的测试
*
* */
async function testCreate() {
    let categorys= [


        {
            name: "服装",
        } ,
        {
            name: "装饰",
        }

    ];
    const promise = await categorySerrver.createCategory(categorys);
    console.log(promise);
}

/*
* 更新方法的测试
* update={name:"  "}
*
* */

async function testUpdate() {
    let id= "5b471ae3d8114c3ae4d7a026";
   let update={
       name:"洗衣机"
   }

   const updateCategory =await categorySerrver.updateCategory(id,update);

   console.log(updateCategory);
}


/*
* 删除方法的测试
*
* */

async function testDelete() {
    let id="5b471c8e7a26cd7bc0a4535a";
    const res = await categorySerrver.deleteCategory(id);
    console.log(res);
}


/*
* 查找方法的测试
*
* */
async function testFindByPage() {
    let page=3;
    const newVar = await categorySerrver.findCategoryByPage(page);
    console.log(newVar);
}

testFindByPage();