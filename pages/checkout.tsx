import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';


async function callAPI() {
    let response = await fetch("/api/checkout?dog=cat")
    const data = await response.json()
    console.log("[callAPI]")
    console.log(response)
    console.log(data)
}

async function sendToken(e) {
    let response = await fetch("/api/checkout?token=" + e.token)
    const data = await response.json()
    console.log("[sendToken]")
    console.log(data)
}

const CheckoutPage = () => (
  <Layout title='Checkout.com API'>
    <Head>
        <script src="https://cdn.checkout.com/js/framesv2.min.js"></script>
    </Head>
    
    <h1>Checkout.com API</h1>
    <p>This is the checkout.com API testing page</p>

    <br/>

    <Frames
        config={{
            debug: true,
            publicKey: 'pk_sbox_5cdu3zk4ywwlclah2kcfiq7p2qt',
            localization: {
                cardNumberPlaceholder: 'Card number',
                expiryMonthPlaceholder: 'MM',
                expiryYearPlaceholder: 'YY',
                cvvPlaceholder: 'CVV',
            },
            style: {
                base: {
                    fontSize: '17px',
                },
            },
        }}
        cardTokenized={sendToken}
        ready={() => {}}
        frameActivated={(e) => {}}
        frameFocus={(e) => {}}
        frameBlur={(e) => {}}
        frameValidationChanged={(e) => {}}
        paymentMethodChanged={(e) => {}}
        cardValidationChanged={(e) => {}}
        cardSubmitted={() => {}}
        cardTokenizationFailed={(e) => {}}
        cardBinChanged={(e) => {}}
    >
        
        <CardNumber />
        <ExpiryDate />
        <Cvv />
        <button onClick={() => Frames.submitCard()}>
            Submit Payment
        </button>
    </Frames>

    <p>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default CheckoutPage;
