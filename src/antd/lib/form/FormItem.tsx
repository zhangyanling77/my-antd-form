import * as React from 'react';
interface Props {
    label?:string
}
interface State{
}
export default class extends React.Component<Props,State>{
  render(){
      let {label,children} = this.props;
      return (
          <div>
              {label&&<label>{label}</label>}
              {children}
          </div>
      )
  }
}