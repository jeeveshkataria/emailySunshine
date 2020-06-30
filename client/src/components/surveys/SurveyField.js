// survey field contains logic to render single label or text

import React from 'react';


export default ({ input , label }) => {
  
    return (
        <div>
            <label>
               {label} 
            </label>
            <input  {...input}  />
        </div>
    );
};