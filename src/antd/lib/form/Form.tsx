import * as React from 'react';
import FormItem from './FormItem';
import create from './create';
interface Props {
    onSubmit:any
}
export default class Form extends React.Component<Props>{
    static Item = FormItem;
    static create = create;
    render(){
        return (
            <form {...this.props}/>
        )
    }
}
