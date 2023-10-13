

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
 * {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
        text-decoration: none;
        list-style: none;
        font-family: 'Nunito Sans', sans-serif;
        font-weight: 400;
        font-size: 95%;
        -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
   /* background-color: black; */

    }
 
    body {
        overflow-x: hidden;

   
    }

    a{
        color: black;
        text-decoration: none;
    }



 
`

export default GlobalStyles