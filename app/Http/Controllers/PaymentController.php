<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;


class PaymentController extends Controller
{


  public function pay()
  {
    $client = new Client();
    $response  = $client->request('POST', 'https://api.paymongo.com/v1/checkout_sessions', [
      'body' => json_encode([
        'data' => [
          'attributes' => [
            'billing' => [
              'name' => 'Elmer Tirao',
              'email' => 'lejero08@gmail.com',
              'phone' => '09102648125'
            ],
            'statement_descriptor' => 'Region 1 (Ilocos Region)',
            'description' => 'This is my first testing checkout',
            'line_items' => [
              [
                'currency' => 'PHP',
                'amount' => 20000,
                'description' => 'Purchasing samlpe only but the name of product here',
                'name' => 'Chair (product name here)',
                'quantity' => 2,
              ]
            ],
            'reference_number' => strtoupper(uniqid('ORD-')),
            'payment_method_types' => ['gcash', 'paymaya'], //payment method here
            'success_url' => route('pay.success'),
            'cancel_url' => route('pay.error'),
          ]
        ]
      ]),
      'headers' => [
        'Content-Type' => 'application/json',
        'accept' => 'application/json',
        'authorization' => 'Basic ' . base64_encode(env('PAYMONGO_SECRET_KEY')),
      ],
    ]);

    $responseBody = $response->getBody()->getContents();
    $responseData = json_decode($responseBody, true);
    $checkoutUrl = $responseData['data']['attributes']['checkout_url'];
    $checkout_session_id = $responseData['data']['id'];

    return redirect()->to($checkoutUrl);

    // dd($responseData);
  }


  public function success()
  {
    // 
  }

  public function error() {}


  // echo $response->getBody();
}
