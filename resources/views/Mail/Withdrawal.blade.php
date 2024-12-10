<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Withdrawal Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #4A90E2;
      padding: 15px;
      border-radius: 8px 8px 0 0;
      text-align: center;
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
    }

    .content {
      padding: 20px;
      text-align: left;
      font-size: 16px;
    }

    .content p {
      margin-bottom: 15px;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4A90E2;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      @if ($status == 'rejected')
      Withdrawal Request Rejected
      @else
      Withdrawal Request Successful
      @endif
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>
        Your recent withdrawal request for <strong>₱{{ number_format($amount, 2) }}</strong> has been
        @if ($status == 'rejected')
        <span style="color: #e3342f;">rejected</span>.
        @else
        <span style="color: #38c172;">approved</span>.
        @endif
      </p>
      @if ($status == 'rejected')
      <p>The amount has been reverted to your wallet.</p>
      @else
      <p>The funds will be transferred to your account shortly.</p>
      @endif

    </div>
    <div class="footer">
      &copy; {{ date('Y') }} MadeByHands. All rights reserved.
    </div>
  </div>
</body>

</html>