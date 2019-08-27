import * as React from 'react';
interface Props {
}
interface XXXX{
    [xxx:string]:any
}
interface State{
    values:XXXX,
    errors:XXXX
}
type  Callback = (error:any,values:any)=>void;
export default function(){
    return function decorate(WrappedComponent:any){
        class ProxyComponent extends React.Component<Props,State>{
            state = {
                values:{},
                //{username:{errors:[{field:'username':message:'用户名不能为空'}]}}
                errors:{}//这里放置着所有的错误信息
            }
            rules:XXXX = {}
            
            handleChange = (event:React.ChangeEvent<HTMLInputElement>,name:string)=>{
                let value = event.target.value;
                this.setState({
                    values:{...this.state.values,[name]:value}
                },()=>this.validateFields([name]));
            }
            validateFields = (fields:Array<string>|Callback,callback?:Array<string>|Callback)=>{
                if(typeof fields === 'function'){
                    callback = fields;
                    fields = Object.keys(this.rules);//{username:[{required:true,message:'用户名不能为空'}]}
                }
                let errors:XXXX = this.state.errors;
                fields.forEach((field:string)=>{
                    let rules = this.rules[field];//[{required:true,message:'用户名不能为空'}]
                    if(rules && rules.length>0){
                        let values:XXXX = this.state.values;
                        let value:any = values[field];
                        let fieldErrors = rules.map((rule:XXXX)=>{
                            if((rule.required && !value)||
                              (rule.min && value&& value.length<rule.min)||
                              (rule.max && value&& value.length>rule.max)
                                ){
                               return {field,message:rule.message};     
                            }
                        }).filter((item:any)=>item);
                        if(fieldErrors.length>0){
                            errors[field]= {errors:fieldErrors};
                        }else{
                            delete errors[field];
                        }
                    }
                });
                let error = Object.keys(errors).length>0?errors:null;
                this.setState({errors},()=>{
                    callback&&(callback as Callback)(error,this.state.values);
                });
            }
            getFieldDecorator = (name:string,options:any)=>{
                //如果说当前元素有rules，我们要缓存到当前组件实例 上
                if(options.rules){
                    this.rules[name]= options.rules;
                }
                return (fieldElement:any)=>{
                    let values:XXXX = this.state.values;
                    let props:XXXX = {
                        value:values[name]||'',
                        onChange:(event:React.ChangeEvent<HTMLInputElement>)=>this.handleChange(event,name)
                    }
                    let errors:XXXX = this.state.errors;//{username:{errors:[{field,message}]}}
                    let fieldErrors = errors[name];
                    let messages = [];
                    if(fieldErrors && fieldErrors.errors.length>0){
                        props.style= {border:'1px solid red'};
                        messages = fieldErrors.errors.map((item:any)=>item.message).map((item:any,index:number)=><p style={{color:'red'}} key={index}>{item}</p>)
                    }
                    let inputElement =  React.cloneElement(fieldElement,props);
                    return <div>{inputElement}{messages.length>0&&messages}</div>
                }
            }
            getFieldsValue = ()=>{
                return this.state.values;
            }
            render(){
                let props = {
                    form:{
                        getFieldDecorator:this.getFieldDecorator,
                        getFieldsValue:this.getFieldsValue,
                        validateFields:this.validateFields
                    }
                }
                return <WrappedComponent {...props}/>
            }
        }
        return ProxyComponent;
    }
}