import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {/* <link rel="stylesheet" href="devices.min.css" type="text/css" /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/white_logo.png" />
          <title>Chef Online</title>
          {/* <meta
            name="google-site-verification"
            content="fRI-UdR0xUune55VjbwHaMNxR-VCQw5LrsUpdagUjDA"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}`}
          /> */}
        </body>
      </Html>
    );
  }
}
