// survey field contains logic to render single label or text

import React from 'react';


export default ({ input , label , meta : {  error , touched }}) => {
  
    return (
        <div>
            <label>
               {label} 
            </label>
            <input  {...input}  />
            { touched && error }
            
        </div>
    );
};