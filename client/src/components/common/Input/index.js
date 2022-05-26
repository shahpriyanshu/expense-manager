import React from 'react';
import {Input, ErrorBox} from './style';

export const CustomInput = ({error, ...inputProps}) => {
    return (
        <div>
            <Input {...inputProps}/>
            {error && <ErrorBox>{error.message}</ErrorBox>}
        </div>    
    )
}