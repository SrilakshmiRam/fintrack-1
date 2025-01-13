import { createContext } from 'react'; // Make sure to import 'createContext' from React

const Context = createContext({
    transactionData: [],
    editTransaction:()=>{},
});

export default Context;