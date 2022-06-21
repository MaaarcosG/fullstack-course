import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
