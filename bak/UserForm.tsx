import * as React from 'react'
import Form from 'antd/lib/form';
interface Props{
    form:any
}
class UserForm extends React.Component<Props> {
  handleSubmit = (event:React.FormEvent)=>{
    event.preventDefault();
    //let values = this.props.form.getFieldsValue();
    //console.log(values);
    debugger;
    this.props.form.validateFields((error:any,values:any)=>{
        console.log(error);
        console.log(values);
    });
  }
  render() {
    let {getFieldDecorator} = this.props.form;
    debugger;
    getFieldDecorator('username');
    return (
      <Form onSubmit={this.handleSubmit}>
          <Form.Item label="用户名">
              {
                  
                  getFieldDecorator('username',{
                      rules:[
                          {required:true,message:'用户名不能为空'}
                      ]
                  })(<input/>)
              }
          </Form.Item>
          <Form.Item label="密码">
             {
                  getFieldDecorator('password',{
                    rules:[
                        {required:true,message:'密码不能为空'},
                        {min:6,message:'密码不能少于6位'},
                        {max:8,message:'密码不能大于8位'}
                    ]
                })(<input/>)
              }
          </Form.Item>
          <Form.Item>
              <button>提交</button>
          </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(UserForm);