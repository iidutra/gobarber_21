import React from 'react';

import {Container} from './styles'

interface TooltipInterfaces {
    title: string;
    className?: string;
}


const Tooltip: React.FC<TooltipInterfaces> = ({title, className = '', children}) => {
    return( 
    <Container className={className}>
        {children}
        <span>{title}</span>
    </Container>
    )}

export default Tooltip