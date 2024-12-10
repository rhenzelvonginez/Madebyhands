<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Receipt</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        .item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eaeaea;
        }

        .item:last-child {
            border-bottom: none;
        }

        .total {
            font-size: 1.5em;
            color: #27ae60;
            text-align: right;
            padding-top: 10px;
        }

        footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }

        .currency {
            font-weight: bold;
        }

        .lastBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .order-details {
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>ORDER RECEIPT</h1>

        <div class="order-details">
            {{-- <p>Seller: {{ $seller }}</p> --}}
            <p>Customer: {{ $customer }}</p>
            <p>Payment Method: {{ $payment }}</p>
            <p>Order ID: {{ $orderId }}</p>
            <p>Date: {{ $date }}</p>
        </div>

        <div class="items">
            @php
                $totalAmount = 0;
            @endphp
            @foreach ($items as $item)
                @php
                    $itemTotal = $item['quantity'] * ($item['amount'] / 100); // Convert amount to PHP
                    $totalAmount += $itemTotal;
                @endphp
                <div class="item">
                    <div>
                        <strong>{{ $item['name'] }}</strong><br>
                        <span>Quantity: {{ $item['quantity'] }}</span>
                    </div>
                    <div class="currency">₱{{ number_format($itemTotal, 2) }}</div>
                </div>
            @endforeach
        </div>

        <div class="lastBox">
            <div class="total">
                Total: <span class="currency">₱{{ number_format($totalAmount, 2) }}</span>
            </div>
        </div>
    </div>
</body>

</html>
