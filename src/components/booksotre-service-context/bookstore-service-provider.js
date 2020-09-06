import React from 'react'

const {
    Provider: BookstoreServiceProvider,
    Consumer: BookstoreServiceConsumer
} = React.createContext(undefined, undefined);

export {BookstoreServiceProvider, BookstoreServiceConsumer}