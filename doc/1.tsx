

interface a{

}
interface b{

}
class t implements a,b{

}
/**
 * 一般高阶组件这样写 Hoc ( comp ),
 这里为什么要   create ({name:'表单'}) ( comp)  这么写
 react的父组件用来获取子组件的属性
那子组件获取父组件怎么做 this.props
必须写成 xxx  = ( ) => {  }的形式吗？
Onchange第一个参数，是因为节点是react生成的，才必须这么写嘛
onChange的第二个参数干嘛的？
nterface a extends b{}
 */

 // 高阶组件 组件可以作为函数的参数和返回值 
 //高阶函数 函数可以作为函数的参数和返回值 

 function a():void{
     console.log('hello');
     return null;
     return undefined;
 }
 let na:any = 'd';

 let names:Array<number> = [1,2];;
 let c:any = {
     name:'zf'
 }
 c.age = 19;